import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site.config";

/** URLs estáticas do site (com barra final, padrão preservado do WordPress). */
const staticPaths = [
  "/",
  "/escritorio-de-contabilidade/",
  "/escritorio-contabil/",
  "/abertura-de-empresa/",
  "/analise-tributaria-para-empresas/",
  "/planejamento-sucessorio/",
  "/troca-de-contabilidade/",
  "/contabilidade-para-comercio/",
  "/contabilidade-para-industria/",
  "/contabilidade-para-prestadores-de-servico/",
  "/noticias-contabeis/",
  "/politica-de-privacidade/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" || path === "/noticias-contabeis/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const posts: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${base}${post.url}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
