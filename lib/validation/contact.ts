import { z } from "zod";

/**
 * Schema compartilhado entre cliente (React Hook Form) e servidor (route handler).
 * O servidor revalida sempre — nunca confia no que veio do cliente.
 */

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(120, "Nome muito longo."),
  email: z.email("E-mail inválido.").max(160),
  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone/WhatsApp válido.")
    .max(40),
  message: z.string().trim().max(3000).optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "É necessário aceitar a Política de Privacidade."),

  // Campos anti-spam (não exibidos ao usuário / técnicos).
  /** Honeypot: humanos deixam vazio; se vier preenchido é bot (checado no servidor). */
  company: z.string().max(200).optional(),
  /** Timestamp de quando o form foi renderizado (timing anti-bot). */
  renderedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Variante enxuta para o formulário curto da sidebar do blog. */
export const blogLeadSchema = contactSchema.pick({
  name: true,
  email: true,
  consent: true,
  company: true,
  renderedAt: true,
});

export type BlogLeadInput = z.infer<typeof blogLeadSchema>;
