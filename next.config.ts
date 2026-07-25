import type { NextConfig } from "next";

import { redirects as legacyRedirects } from "./lib/redirects";

/**
 * Content-Security-Policy.
 *
 * Diretivas restritivas onde controlamos tudo (default/base-uri/object/form/frame-
 * ancestors) e liberações mínimas onde há terceiros (GTM, Google Analytics/Ads).
 * As fontes são self-hosted (next/font), então NÃO precisa liberar Google Fonts.
 *
 * `script-src` inclui 'unsafe-inline'/'unsafe-eval' porque o GTM injeta scripts
 * inline e alguns tags/preview usam eval — sem isso o rastreamento do cliente
 * quebra. Mesmo assim, as demais diretivas (object-src none, form-action self,
 * frame-ancestors none, connect-src restrito) mantêm proteção real contra
 * exfiltração, clickjacking, sequestro de <base> e injeção de plugins.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://*.trustindex.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://pagead2.googlesyndication.com https://*.trustindex.io",
  "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://*.trustindex.io",
  "manifest-src 'self'",
  "media-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

/** Cabeçalhos de segurança aplicados a todas as rotas. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Força HTTPS por 2 anos, incluindo subdomínios (HSTS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Impede o browser de "adivinhar" o content-type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Não vaza a URL completa como referer para outros sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Reforça o frame-ancestors da CSP (clickjacking) em browsers antigos.
  { key: "X-Frame-Options", value: "DENY" },
  // Desliga APIs sensíveis que o site não usa.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // WordPress servia URLs com barra final; preservamos para não gerar 301 e não perder SEO.
  trailingSlash: true,

  // Não expõe que o site roda em Next.js.
  poweredByHeader: false,

  reactStrictMode: true,

  images: {
    // Mídia migrada vive localmente em /public; formatos modernos para o objetivo "leve".
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // 301 herdados do WordPress antigo (preservação de SEO das URLs antigas).
  // statusCode 301 (e não 308) para replicar fielmente o WP e máxima compatibilidade.
  async redirects() {
    return legacyRedirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      statusCode: 301 as const,
    }));
  },
};

export default nextConfig;
