import "server-only";

/**
 * Contrato do provider de e-mail. O formulário fala com esta interface, nunca
 * com o Resend diretamente — trocar mock ↔ resend não toca no resto do sistema.
 */

export type LeadEmail = {
  /** Origem do lead (ex.: "Contato" ou "Blog"). */
  source: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export interface EmailProvider {
  readonly name: string;
  sendLead(lead: LeadEmail): Promise<SendResult>;
}
