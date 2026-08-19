import type { MetadataRoute } from "next";

import { getCategoriesWithCounts, getPublishedPosts } from "@/lib/blog";
import { glossaryTerms } from "@/lib/content/glossary";
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
  "/glossario/",
  "/mapa-do-site/",
  "/politica-de-privacidade/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/" || path === "/noticias-contabeis/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const categories: MetadataRoute.Sitemap = getCategoriesWithCounts().map((c) => ({
    url: `${base}/noticias-contabeis/categoria/${c.slug}/`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const posts: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${base}${post.url}`,
    lastModified: post.updated ?? post.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const glossary: MetadataRoute.Sitemap = glossaryTerms.map((t) => ({
    url: `${base}/glossario/${t.slug}/`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...categories, ...posts, ...glossary];
}
