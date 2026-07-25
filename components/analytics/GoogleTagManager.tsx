import Script from "next/script";

import { siteConfig } from "@/lib/site.config";

/**
 * Carrega os containers GTM preservados da migração, com Google Consent Mode v2.
 *
 * Ordem garantida:
 * 1. `consent default` = denied (roda ANTES do GTM) → nenhuma tag de marketing/
 *    analytics dispara sem consentimento (LGPD). O CookieBanner faz o `update`.
 * 2. Containers GTM carregam e passam a respeitar o estado de consentimento.
 *
 * A conversão do Google Ads (AW-...) é disparada de dentro do próprio GTM.
 */
export function GoogleTagManager() {
  // GTM só carrega em produção — mantém o dev limpo/rápido e evita disparar tags reais.
  if (process.env.NODE_ENV !== "production") return null;

  const ids = siteConfig.tracking.gtmIds;

  return (
    <>
      {/* Conecta cedo ao GTM para reduzir latência do carregamento das tags. */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* 1. Consent Mode default — script inline no <head>, roda na ordem do
             documento (antes do GTM), garantindo o consentimento padrão negado. */}
      <script
        id="consent-default"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500
            });
            try {
              var c = localStorage.getItem('visa-consent');
              if (c === 'granted') {
                gtag('consent', 'update', {
                  ad_storage: 'granted',
                  analytics_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted'
                });
              }
            } catch (e) {}
          `,
        }}
      />

      {/* 2. Containers GTM. */}
      {ids.map((id) => (
        <Script key={id} id={`gtm-${id}`} strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${id}');`}
        </Script>
      ))}
    </>
  );
}

/** <noscript> dos containers GTM (vai logo após a abertura do <body>). */
export function GoogleTagManagerNoScript() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {siteConfig.tracking.gtmIds.map((id) => (
        <noscript key={id}>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${id}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      ))}
    </>
  );
}
