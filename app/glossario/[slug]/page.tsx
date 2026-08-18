import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import {
  getGlossaryTerm,
  glossaryTerms,
  relatedTerms,
} from "@/lib/content/glossary";
import { breadcrumbSchema, definedTermSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo/metadata";

/** Gera as rotas estáticas de cada verbete no build. */
export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};

  const label = term.aka ? `${term.term} (${term.aka})` : term.term;
  return pageMetadata({
    title: `O que é ${label}? — Glossário de Contabilidade`,
    description: term.short,
    path: `/glossario/${term.slug}/`,
    keywords: [`o que é ${term.term}`, term.term, ...(term.aka ? [term.aka] : [])],
  });
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const related = relatedTerms(term);

  return (
    <>
      <JsonLd
        data={definedTermSchema({ name: term.term, description: term.short, slug: term.slug })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Glossário", path: "/glossario/" },
          { name: term.term, path: `/glossario/${term.slug}/` },
        ])}
      />

      <PageHero
        eyebrow={term.category}
        title={term.aka ? `${term.term} — ${term.aka}` : term.term}
        breadcrumb={term.term}
      />

      <section className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          {/* Resumo em destaque — o trecho que IAs e o Google tendem a extrair. */}
          <p className="border-l-4 border-brand-400 bg-brand-50/50 py-4 pl-5 pr-4 text-lg font-medium leading-relaxed text-ink-800">
            {term.short}
          </p>

          <div className="mt-8 space-y-5 text-ink-600">
            {term.body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {related.length > 0 && (
            <div className="mt-12 border-t border-ink-100 pt-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-500">
                Termos relacionados
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/glossario/${r.slug}/`}
                    className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600"
                  >
                    {r.term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="mt-10 text-sm text-ink-500">
            <Link href="/glossario/" className="font-semibold text-brand-600 hover:underline">
              ← Voltar ao glossário
            </Link>
          </p>
        </Container>
      </section>

      <CtaBand
        eyebrow="Precisa de ajuda com isso na prática?"
        title={`Fale com um contador sobre ${term.term}`}
        text="A Visa Contabilidade cuida da parte técnica para você focar no seu negócio. Tire suas dúvidas e receba uma orientação sob medida para a sua empresa."
        buttonLabel="Falar com um contador"
      />
    </>
  );
}
