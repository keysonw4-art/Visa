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
    /**
     * Secret do Cloudflare Turnstile (bot protection). Server-only.
     * Se ausente, a validação Turnstile é PULADA (soft-disable) — útil pra dev
     * e pra deploy incremental. Em produção, defina para ativar.
     */
    TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
    /**
     * Upstash Redis REST — usado pelo rate-limiter DURÁVEL do formulário.
     * Se ambas ausentes, o rate-limiter cai no fallback in-memory (ver
     * lib/security/rate-limit). Compatível com Vercel KV via Marketplace.
     */
    UPSTASH_REDIS_REST_URL: z.url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  },
  client: {
    /** URL pública do site (canonical, sitemap, OG). */
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
    /**
     * Site key pública do Cloudflare Turnstile. Se ausente, o widget não
     * renderiza (soft-disable). Pareia com TURNSTILE_SECRET_KEY do lado server.
     */
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: {
    EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
  /** Trata "" como undefined, evitando envs vazias passarem na validação. */
  emptyStringAsUndefined: true,
});
