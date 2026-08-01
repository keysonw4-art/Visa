"use client";

import Script from "next/script";
import { useCallback, useEffect, useId, useRef } from "react";

import { env } from "@/lib/env";

/**
 * Widget do Cloudflare Turnstile — proteção contra bots sem UX de CAPTCHA.
 *
 * - Modo "managed" pela Cloudflare: 99% invisível para humanos; só desafia se
 *   detectar comportamento suspeito.
 * - Se `NEXT_PUBLIC_TURNSTILE_SITE_KEY` não estiver definida, o widget SIMPLESMENTE
 *   não renderiza (soft-disable) — o form continua funcionando via honeypot +
 *   timing + rate-limit. Ideal para dev e para deploy incremental.
 * - O token gerado é único por sessão; o servidor revalida via /siteverify.
 */

// Global do script Turnstile (injetado pelo <Script src="challenges.cloudflare.com">).
type TurnstileWindow = Window & {
  turnstile?: {
    render: (
      el: string | HTMLElement,
      opts: {
        sitekey: string;
        theme?: "light" | "dark" | "auto";
        size?: "normal" | "flexible" | "compact" | "invisible";
        callback?: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
      },
    ) => string;
    reset: (widgetId?: string) => void;
    remove: (widgetId: string) => void;
  };
};

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export function TurnstileWidget({
  onVerify,
  onExpire,
  onError,
}: {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}) {
  const siteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerId = useId();
  const widgetIdRef = useRef<string | null>(null);
  const mountedRef = useRef(false);

  // useCallback pra passar refs estáveis pro turnstile.render.
  const handleVerify = useCallback((token: string) => onVerify(token), [onVerify]);
  const handleExpire = useCallback(() => {
    onVerify("");
    onExpire?.();
  }, [onVerify, onExpire]);
  const handleError = useCallback(() => {
    onVerify("");
    onError?.();
  }, [onVerify, onError]);

  useEffect(() => {
    if (!siteKey) return;

    const tryRender = () => {
      const w = window as TurnstileWindow;
      if (!w.turnstile) return false;
      if (mountedRef.current) return true;
      const el = document.getElementById(containerId);
      if (!el) return false;

      widgetIdRef.current = w.turnstile.render(el, {
        sitekey: siteKey,
        theme: "light",
        // Managed: Cloudflare decide se desafia ou não; invisível pra humanos.
        callback: handleVerify,
        "error-callback": handleError,
        "expired-callback": handleExpire,
      });
      mountedRef.current = true;
      return true;
    };

    // Se o script já carregou, monta agora; senão, polling curto até 10s.
    if (tryRender()) return;
    const interval = window.setInterval(() => {
      if (tryRender()) window.clearInterval(interval);
    }, 200);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 10_000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      const w = window as TurnstileWindow;
      if (widgetIdRef.current && w.turnstile) {
        try {
          w.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignora: widget pode ter sido removido pela própria Cloudflare.
        }
      }
      widgetIdRef.current = null;
      mountedRef.current = false;
    };
  }, [siteKey, containerId, handleVerify, handleExpire, handleError]);

  if (!siteKey) return null;

  return (
    <>
      <Script src={SCRIPT_URL} strategy="afterInteractive" async defer />
      <div id={containerId} />
    </>
  );
}

/** True quando o widget está ativo (chave configurada) e o form precisa de token. */
export function isTurnstileEnabled(): boolean {
  return !!env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
}
