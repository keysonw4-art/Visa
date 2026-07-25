import { NextResponse } from "next/server";

import { getEmailProvider } from "@/lib/email";
import { contactRateLimiter, clientIp } from "@/lib/security/rate-limit";
import {
  hasHeaderInjection,
  isSameOrigin,
  looksLikeBot,
} from "@/lib/security/request-guards";
import { contactSchema } from "@/lib/validation/contact";

/** Endpoint dos formulários. Roda no runtime Node (provider de e-mail server-only). */
export const runtime = "nodejs";

const GENERIC_ERROR = "Não foi possível enviar sua mensagem. Tente novamente.";

export async function POST(request: Request): Promise<Response> {
  // 1. Método/Content-Type já garantidos pela assinatura + parse abaixo.

  // 2. CSRF: só aceita requisições do próprio site.
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  // 3. Rate limit por IP (best-effort, ver lib/security/rate-limit).
  const ip = clientIp(request.headers);
  const rl = contactRateLimiter.check(`contato:${ip}`);
  if (!rl.success) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  // 4. Parse com teto de tamanho (evita payload gigante).
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 20_000) {
      return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // 5. Validação autoritativa no servidor.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }
  const data = parsed.data;

  // 6. Anti-spam: honeypot + timing. Bot recebe "sucesso" falso (não vaza a regra).
  if (looksLikeBot({ honeypot: data.company, renderedAt: data.renderedAt })) {
    return NextResponse.json({ ok: true, id: "ignored" }, { status: 200 });
  }

  // 7. Proteção contra injeção de header de e-mail.
  if (hasHeaderInjection(data.name, data.email, data.phone)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  // 8. Envio via provider selecionado (mock por padrão).
  try {
    const provider = getEmailProvider();
    const result = await provider.sendLead({
      source: "Contato",
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    // Erro genérico — nunca vaza stack/secret.
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 500 });
  }
}

/** Só POST é permitido. */
export function GET(): Response {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
