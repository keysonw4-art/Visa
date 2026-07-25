import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Validação e separação server/client das variáveis de ambiente.
 *
 * - Variáveis SEM prefixo NEXT_PUBLIC_ nunca chegam ao bundle do cliente e só
 *   podem ser lidas em código de servidor. Tentar ler no cliente = erro de tipo.
 * - O app falha rápido no boot se algo obrigatório estiver ausente/ inválido,
 *   em vez de vazar erro numa requisição.
 * - `RESEND_API_KEY` é opcional AGORA porque o provider padrão é o mock; quando
 *   trocar para o Resend em produção, a env passa a ser exigida (ver lib/email).
 */
export const env = createEnv({
  server: {
    /** Seleciona o provider de e-mail. Default: mock (não envia nada de verdade). */
    EMAIL_PROVIDER: z.enum(["mock", "resend"]).default("mock"),
    /** Secret do Resend — server-only, marcada como Sensitive na Vercel. */
    RESEND_API_KEY: z.string().min(1).optional(),
    /** Destinatário dos leads dos formulários. */
    CONTACT_TO_EMAIL: z.email().optional(),
    /** Remetente verificado no Resend. */
    CONTACT_FROM_EMAIL: z.email().optional(),
  },
  client: {
    /** URL pública do site (canonical, sitemap, OG). */
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
  },
  runtimeEnv: {
    EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  /** Trata "" como undefined, evitando envs vazias passarem na validação. */
  emptyStringAsUndefined: true,
});
