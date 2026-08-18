import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";
import { ConsoleSignature } from "@/components/analytics/ConsoleSignature";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleTagManager";
import { PhoneTracker } from "@/components/analytics/PhoneTracker";
import { WhatsAppTracker } from "@/components/analytics/WhatsAppTracker";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site.config";

// Fonte real do tema, self-hosted via next/font (sem request externo, melhor p/ LGPD).
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Contador e Contabilidade em Cascavel-PR`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Contabilidade",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  // Diretivas ampliadas: permite ao Google exibir snippet/preview de imagem grande
  // (mais chance de rich result) e nunca truncar o texto do snippet.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Evita o iOS auto-estilizar telefones/e-mails no corpo do texto.
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { capable: true, statusBarStyle: "default", title: siteConfig.name },
  // Geo tags — sinais de localização para buscadores locais (Bing Places, etc.).
  other: {
    "geo.region": `${siteConfig.address.country}-${siteConfig.address.state}`,
    "geo.placename": siteConfig.address.city,
    "geo.position": `${siteConfig.address.latitude};${siteConfig.address.longitude}`,
    ICBM: `${siteConfig.address.latitude}, ${siteConfig.address.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#0077bb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} h-full`}>
      <head>
        <GoogleTagManager />
        <ConsoleSignature />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <GoogleTagManagerNoScript />
        <WhatsAppTracker />
        <PhoneTracker />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieBanner />
        <ScrollProgress />
      </body>
    </html>
  );
}
