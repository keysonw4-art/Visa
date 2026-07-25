import "server-only";

import { env } from "@/lib/env";
import { MockEmailProvider } from "./mock";
import { ResendEmailProvider } from "./resend";
import type { EmailProvider } from "./provider";

export type { EmailProvider, LeadEmail, SendResult } from "./provider";

/**
 * Factory do provider de e-mail. Selecionado por env (EMAIL_PROVIDER):
 * "mock" (padrão) ou "resend". Este é o ÚNICO ponto de troca — o resto do
 * sistema só conhece a interface EmailProvider.
 */
let cached: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  if (cached) return cached;
  cached = env.EMAIL_PROVIDER === "resend" ? new ResendEmailProvider() : new MockEmailProvider();
  return cached;
}
