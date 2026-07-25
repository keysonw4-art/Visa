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
      images: image ? [{ url: image }] : undefined,
    },
  };
}
