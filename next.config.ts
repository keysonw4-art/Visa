import type { NextConfig } from "next";

/**
 * Cabeçalhos de segurança aplicados a todas as rotas.
 * A CSP entra depois, junto da integração do GTM/consent, para poder ser
 * testada sem quebrar scripts de terceiros (GTM, Trustindex, Google Ads).
 */
const securityHeaders = [
  // Força HTTPS por 2 anos, incluindo subdomínios (HSTS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Impede o browser de "adivinhar" o content-type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Não vaza a URL completa como referer para outros sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Bloqueia o site de ser embutido em iframes (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
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
};

export default nextConfig;
