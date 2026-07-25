"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { CONSENT_EVENT, readConsent, setConsent } from "@/components/analytics/consent";

/** Lê o consentimento como "external store" — sem setState em effect. */
function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * Banner de cookies próprio (substitui o AdOpt), leve e integrado ao Consent
 * Mode. Só aparece se o usuário ainda não decidiu. Aceitar/recusar atualiza o
 * consentimento do GTM.
 */
export function CookieBanner() {
  // null = usuário ainda não decidiu → mostra o banner.
  const consent = useSyncExternalStore(
    subscribe,
    () => readConsent(),
    () => null,
  );

  if (consent !== null) return null;

  function decide(value: "granted" | "denied") {
    setConsent(value); // dispara CONSENT_EVENT → o store re-renderiza e some.
  }

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-ink-200 bg-white p-5 shadow-xl sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-600">
          Usamos cookies para melhorar sua experiência e analisar o tráfego. Você pode aceitar ou
          recusar os cookies de análise e marketing. Saiba mais na{" "}
          <Link href="/politica-de-privacidade/" className="font-semibold text-brand-600 underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="outline" size="md" onClick={() => decide("denied")}>
            Recusar
          </Button>
          <Button variant="primary" size="md" onClick={() => decide("granted")}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
