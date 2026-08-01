import "server-only";

/**
 * Validação server-side do token do Cloudflare Turnstile.
 *
 * - Se `TURNSTILE_SECRET_KEY` não estiver configurado, retorna `{ ok: true, skipped: true }`
 *   (soft-disable: dev / deploy incremental sem quebrar o formulário).
 * - Se configurado, chama /siteverify e exige success=true da Cloudflare.
 * - Timeout curto (5s) pra não travar a rota se a Cloudflare demorar.
 */

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 5_000;

export type TurnstileResult =
  | { ok: true; skipped: boolean }
  | { ok: false; reason: "missing_token" | "invalid_token" | "network_error" };

export async function verifyTurnstileToken(
  token: string | undefined,
  clientIp?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };

  if (!token) return { ok: false, reason: "missing_token" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const form = new URLSearchParams();
    form.set("secret", secret);
    form.set("response", token);
    if (clientIp && clientIp !== "unknown") form.set("remoteip", clientIp);

    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      signal: controller.signal,
    });

    if (!res.ok) return { ok: false, reason: "network_error" };
    const data = (await res.json()) as { success?: boolean };
    if (!data.success) return { ok: false, reason: "invalid_token" };
    return { ok: true, skipped: false };
  } catch {
    return { ok: false, reason: "network_error" };
  } finally {
    clearTimeout(timer);
  }
}
