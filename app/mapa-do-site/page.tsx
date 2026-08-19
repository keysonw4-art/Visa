import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { getCategoriesWithCounts } from "@/lib/blog";
import { glossaryTerms } from "@/lib/content/glossary";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo/metadata";
import { siteConfig, type NavItem } from "@/lib/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Mapa do Site",
  description:
    "Mapa do site da Visa Contabilidade: acesse rapidamente todas as páginas — serviços, especialidades, blog, glossário de contabilidade e canais de contato.",
  path: "/mapa-do-site/",
});

type LinkItem = { label: string; href: string };
type MapSection = { title: string; links: LinkItem[] };

/** Extrai os filhos de um item de navegação pelo rótulo (ex.: "Serviços"). */
function navChildren(label: string): LinkItem[] {
  const item = siteConfig.nav.find((i: NavItem) => i.label === label);
  return (item?.children ?? []).map((c) => ({ label: c.label, href: c.href }));
}

export default function MapaDoSitePage() {
  const blogCategories = getCategoriesWithCounts();

  const sections: MapSection[] = [
    {
      title: "Principal",
      links: [
        { label: "Home", href: "/" },
        { label: "Conheça a Visa", href: "/escritorio-de-contabilidade/" },
        { label: "Contato", href: "/escritorio-contabil/" },
      ],
    },
    {
      title: "Serviços",
      links: navChildren("Serviços"),
    },
    {
      title: "Especialidades",
      links: navChildren("Especialidades"),
    },
    {
      title: "Blog — Notícias Contábeis",
      links: [
        { label: "Todas as notícias", href: "/noticias-contabeis/" },
        ...blogCategories.map((c) => ({
          label: c.name,
          href: `/noticias-contabeis/categoria/${c.slug}/`,
        })),
      ],
    },
    {
      title: "Glossário de Contabilidade",
      links: [
        { label: "Índice do glossário", href: "/glossario/" },
        ...glossaryTerms
          .slice()
          .sort((a, b) => a.term.localeCompare(b.term, "pt-BR"))
          .map((t) => ({ label: t.term, href: `/glossario/${t.slug}/` })),
      ],
    },
    {
      title: "Institucional",
      links: [
        { label: "Política de Privacidade", href: "/politica-de-privacidade/" },
        { label: "Mapa do Site", href: "/mapa-do-site/" },
      ],
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Mapa do Site", path: "/mapa-do-site/" },
        ])}
      />

      <PageHero eyebrow="Navegação" title="Mapa do Site" breadcrumb="Mapa do Site" />

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-600">
            Todas as páginas da Visa Contabilidade em um só lugar. Clique em qualquer item para ir
            direto ao conteúdo que você procura.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-ink-100 bg-brand-50/30 p-6"
              >
                <h2 className="text-sm font-bold uppercase tracking-widest text-brand-500">
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {section.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-ink-700 transition-colors hover:bg-white hover:text-brand-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
