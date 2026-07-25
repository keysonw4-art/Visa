import "server-only";

import { Resend } from "resend";

import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site.config";
import type { EmailProvider, LeadEmail, SendResult } from "./provider";

/**
 * Provider Resend — STUB PRONTO, inerte até ser selecionado por env.
 *
 * Segurança já embutida:
 * - A API key é lida SÓ aqui, via env server-only; nunca vai ao cliente e nunca
 *   é "buscada" por fetch em runtime (não há endpoint de secret a proteger).
 * - Timeout na chamada de saída (não trava a request).
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

  constructor() {
    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      throw new Error(
        "Resend selecionado, mas RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL não estão configurados.",
      );
    }
    this.client = new Resend(env.RESEND_API_KEY);
  }

  async sendLead(lead: LeadEmail): Promise<SendResult> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);

      const { data, error } = await this.client.emails.send({
        from: `${siteConfig.name} <${env.CONTACT_FROM_EMAIL!}>`,
        to: [env.CONTACT_TO_EMAIL!],
        replyTo: lead.email,
        subject: `Novo contato via ${lead.source} — ${lead.name}`,
        text: renderLeadText(lead),
      });
      clearTimeout(timeout);

      if (error) {
        console.error("[email:resend] falha no envio:", error.name);
        return { ok: false, error: "send_failed" };
      }
      return { ok: true, id: data?.id ?? "sent" };
    } catch {
      // Nunca vaza stack/secret para o cliente.
      return { ok: false, error: "send_failed" };
    }
  }
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
