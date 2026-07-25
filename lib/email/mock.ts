import "server-only";

import type { EmailProvider, LeadEmail, SendResult } from "./provider";

/**
 * Provider MOCK — ATIVO por padrão.
 *
 * Não envia nada de verdade: valida o fluxo de ponta a ponta, loga o lead no
 * servidor (sem PII sensível em produção) e devolve sucesso. Permite construir e
 * testar todo o formulário antes de decidir hospedagem/credenciais do Resend.
 */
export class MockEmailProvider implements EmailProvider {
  readonly name = "mock";

  async sendLead(lead: LeadEmail): Promise<SendResult> {
    const id = `mock_${Date.now().toString(36)}`;
    // Log só em desenvolvimento para não vazar PII nos logs de produção.
    if (process.env.NODE_ENV !== "production") {
      console.info("[email:mock] lead recebido:", {
        id,
        source: lead.source,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        hasMessage: Boolean(lead.message),
      });
    }
    return { ok: true, id };
  }
}
