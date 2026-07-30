import type { NextConfig } from "next";

import { redirects as legacyRedirects } from "./lib/redirects";

/**
 * Content-Security-Policy — versão "ampla mas segura".
 *
 * As diretivas realmente críticas continuam TRAVADAS:
 *   • default-src 'self'  → recursos desconhecidos não carregam
 *   • object-src 'none'   → sem plugins Flash/PDF embutidos
 *   • base-uri 'self'     → impede sequestro de <base>
 *   • form-action 'self'  → formulários só submetem pro próprio site
 *   • frame-ancestors 'none' → sem clickjacking
 *
 * `script-src`/`connect-src` liberam os principais players de analytics/ads
 * (Google, Microsoft, Meta, LinkedIn, Hotjar) — assim o cliente pode adicionar
 * qualquer combinação dessas ferramentas via GTM sem precisar editar a CSP.
 *
 * `unsafe-inline`/`unsafe-eval` em script-src é necessário para o GTM
 * (injeção inline + preview mode). Fontes são self-hosted (next/font) → sem
 * Google Fonts na CSP.
 */
const GOOGLE_ANALYTICS = [
  // GA4 / Universal Analytics
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://analytics.google.com",
];
const GOOGLE_TAG_MANAGER = [
  "https://www.googletagmanager.com",
  "https://*.googletagmanager.com",
];
const GOOGLE_ADS = [
  // Ads/Doubleclick — collect, conversion, remarketing
  "https://www.google.com", // /ccm/collect, /pagead/conversion, /pagead/1p-conversion, /rmkt/collect
  "https://googleads.g.doubleclick.net",
  "https://*.g.doubleclick.net",
  "https://*.doubleclick.net",
  "https://www.googleadservices.com",
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://td.doubleclick.net",
  "https://stats.g.doubleclick.net",
];
const MICROSOFT_CLARITY = [
  "https://www.clarity.ms",
  "https://*.clarity.ms",
  "https://c.bing.com", // Bing/Clarity events
];
const META_PIXEL = [
  "https://connect.facebook.net",
  "https://*.facebook.com",
  "https://*.facebook.net",
];
const LINKEDIN_INSIGHT = [
  "https://snap.licdn.com",
  "https://px.ads.linkedin.com",
  "https://*.linkedin.com",
];
const HOTJAR = [
  "https://static.hotjar.com",
  "https://script.hotjar.com",
  "https://*.hotjar.com",
  "https://*.hotjar.io",
];

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    ...GOOGLE_TAG_MANAGER,
    ...GOOGLE_ANALYTICS,
    ...GOOGLE_ADS,
    ...MICROSOFT_CLARITY,
    ...META_PIXEL,
    ...LINKEDIN_INSIGHT,
    ...HOTJAR,
  ].join(" "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    ...GOOGLE_TAG_MANAGER,
    ...GOOGLE_ANALYTICS,
    ...GOOGLE_ADS,
    ...MICROSOFT_CLARITY,
    ...META_PIXEL,
    ...LINKEDIN_INSIGHT,
    ...HOTJAR,
  ].join(" "),
  [
    "frame-src 'self'",
    ...GOOGLE_TAG_MANAGER,
    "https://td.doubleclick.net",
    "https://bid.g.doubleclick.net",
    ...META_PIXEL,
  ].join(" "),
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
