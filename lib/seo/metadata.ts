import type { Metadata } from "next";

import { siteConfig } from "@/lib/site.config";

/**
 * Gera Metadata consistente por página (title, description, canonical, OG).
 * `path` deve incluir a barra final (padrão do site).
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  /** Ex.: "/abertura-de-empresa/" */
  path: string;
  image?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  // Usa a imagem da página (banner/capa) ou cai no OG padrão da marca.
  const images = [image ?? "/og.png"];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: siteConfig.name,
      url,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
