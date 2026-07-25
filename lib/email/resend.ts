import "server-only";

import { Resend } from "resend";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site.config";
import type { EmailProvider, LeadEmail, SendResult } from "./provider";

const SEND_TIMEOUT_MS = 10_000;

/**
 * Provider Resend — PRONTO, inerte até ser selecionado por env (EMAIL_PROVIDER=resend).
 *
 * Segurança já embutida:
 * - A API key é lida SÓ aqui, via env server-only; nunca vai ao cliente e nunca
 *   é "buscada" por fetch em runtime (não há endpoint de secret a proteger).
 * - Timeout real na chamada de saída (Promise.race) — não trava a request.
 * - O SDK fala HTTPS com api.resend.com; a validação de certificado do Node NÃO
 *   é desabilitada em nenhum ponto (nada de NODE_TLS_REJECT_UNAUTHORIZED=0).
 * - Erros retornam mensagem genérica; a key nunca é logada.
 *
 * Para ativar em produção: definir EMAIL_PROVIDER=resend + RESEND_API_KEY +
 * CONTACT_TO_EMAIL + CONTACT_FROM_EMAIL nas envs (Sensitive na Vercel).
 */
export class ResendEmailProvider implements EmailProvider {
  readonly name = "resend";
  private readonly client: Resend;
  private readonly to: string;
  private readonly from: string;

  constructor() {
    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      throw new Error(
        "Resend selecionado, mas RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL não estão configurados.",
      );
    }
    this.client = new Resend(RESEND_API_KEY);
    this.to = CONTACT_TO_EMAIL;
    this.from = `${siteConfig.name} <${CONTACT_FROM_EMAIL}>`;
  }

  async sendLead(lead: LeadEmail): Promise<SendResult> {
    try {
      const { data, error } = await withTimeout(
        this.client.emails.send({
          from: this.from,
          to: [this.to],
          replyTo: lead.email,
          subject: `Novo contato via ${lead.source} — ${lead.name}`,
          text: renderLeadText(lead),
        }),
        SEND_TIMEOUT_MS,
      );

      if (error) {
        console.error("[email:resend] falha no envio:", error.name);
        return { ok: false, error: "send_failed" };
      }
      return { ok: true, id: data?.id ?? "sent" };
    } catch {
      // Timeout ou erro inesperado — nunca vaza stack/secret para o cliente.
      return { ok: false, error: "send_failed" };
    }
  }
}

/** Rejeita se a promise não resolver dentro de `ms`. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("email_timeout")), ms)),
  ]);
}

function renderLeadText(lead: LeadEmail): string {
  return [
    `Origem: ${lead.source}`,
    `Nome: ${lead.name}`,
    `E-mail: ${lead.email}`,
    lead.phone ? `Telefone/WhatsApp: ${lead.phone}` : null,
    "",
    lead.message ? `Mensagem:\n${lead.message}` : "(sem mensagem)",
  ]
    .filter((l) => l !== null)
    .join("\n");
}
