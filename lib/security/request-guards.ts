import "server-only";

import { siteConfig } from "@/lib/site.config";

/**
 * Verificações de segurança para requisições dos formulários (route handler).
 * Independentes do provider de e-mail — rodam igual no mock e no Resend.
 */

/**
 * CSRF básico: só aceita requisições cuja Origin/Referer bate com o próprio site.
 * Bloqueia POST forjado a partir de outro domínio.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const allowed = new Set<string>([siteConfig.url]);
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) allowed.add(envUrl.replace(/\/$/, ""));
  // Em dev, aceita localhost.
  if (process.env.NODE_ENV !== "production") {
    allowed.add("http://localhost:3000");
    allowed.add("http://127.0.0.1:3000");
  }

  const candidate = origin ?? (referer ? safeOrigin(referer) : null);
  if (!candidate) return false;
  return allowed.has(candidate.replace(/\/$/, ""));
}

function safeOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

/**
 * Anti-spam sem terceiros:
 * - honeypot: campo invisível que só bot preenche.
 * - timing: formulário enviado rápido demais (< limiar) = bot.
 */
export function looksLikeBot(input: {
  honeypot?: unknown;
  renderedAt?: unknown;
  minMs?: number;
}): boolean {
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") return true;

  const minMs = input.minMs ?? 2500;
  const renderedAt = Number(input.renderedAt);
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    if (Date.now() - renderedAt < minMs) return true;
  }
  return false;
}

/**
 * Impede injeção de cabeçalho de e-mail via campos do formulário:
 * rejeita CR/LF que permitiriam forjar headers (Bcc:, etc.).
 */
export function hasHeaderInjection(...values: string[]): boolean {
  return values.some((v) => /[\r\n]/.test(v));
}
