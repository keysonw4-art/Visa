import { z } from "zod";

import { isValidPhoneBR } from "@/lib/utils/phone";

/**
 * Schema compartilhado entre cliente (React Hook Form) e servidor (route handler).
 * O servidor revalida sempre — nunca confia no que veio do cliente.
 * Cada campo valida seu TIPO e FORMATO: nome/e-mail/WhatsApp são obrigatórios;
 * consentimento é boolean que precisa ser true.
 */

export const contactSchema = z.object({
  name: z
    .string({ error: "Informe seu nome." })
    .trim()
    .min(2, "Informe seu nome completo.")
    .max(120, "Nome muito longo."),
  email: z
    .string({ error: "Informe seu e-mail." })
    .trim()
    .min(1, "Informe seu e-mail.")
    .max(160, "E-mail muito longo.")
    .pipe(z.email("E-mail inválido. Ex.: nome@empresa.com.br")),
  phone: z
    .string({ error: "Informe seu WhatsApp." })
    .trim()
    .min(1, "Informe seu WhatsApp.")
    .refine(isValidPhoneBR, "WhatsApp inválido. Use o formato (11) 99999-9999."),
  message: z.string().trim().max(3000, "Mensagem muito longa.").optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "É necessário aceitar a Política de Privacidade."),

  // Campos anti-spam (não exibidos ao usuário / técnicos).
  /** Honeypot: humanos deixam vazio; se vier preenchido é bot (checado no servidor). */
  company: z.string().max(200).optional(),
  /** Timestamp de quando o form foi renderizado (timing anti-bot). */
  renderedAt: z.number().optional(),
  /** Token do Cloudflare Turnstile (validado no servidor via siteverify). */
  turnstileToken: z.string().max(4096).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
