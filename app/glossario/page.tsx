import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { glossaryByCategory, glossaryTerms } from "@/lib/content/glossary";
import { breadcrumbSchema, definedTermSetSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Glossário de Contabilidade — Termos Explicados de Forma Simples",
  description:
    "Entenda os principais termos de contabilidade e tributação: Simples Nacional, Lucro Presumido, MEI, Fator R, DAS, ISS e mais. Glossário da Visa Contabilidade, em Cascavel-PR.",
  path: "/glossario/",
  keywords: ["glossário de contabilidade", "termos contábeis", "o que é simples nacional"],
});

export default function GlossarioPage() {
  const groups = glossaryByCategory();

  return (
    <>
      <JsonLd
        data={definedTermSetSchema(
          glossaryTerms.map((t) => ({ name: t.term, description: t.short, slug: t.slug })),
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Glossário", path: "/glossario/" },
        ])}
      />

      <PageHero
        eyebrow="Glossário"
        title="Glossário de Contabilidade"
        breadcrumb="Glossário"
      />

      <section className="bg-white py-16 lg:py-20">
        <Container className="max-w-4xl">
          <p className="max-w-2xl text-lg leading-relaxed text-ink-600">
            Contabilidade não precisa ser complicada. Reunimos os termos que mais aparecem no dia a
            dia da sua empresa e explicamos cada um de forma clara e direta. Clique em um termo para
            entender melhor.
          </p>

          <div className="mt-12 space-y-14">
            {groups.map((group) => (
              <div key={group.category}>
                <h2 className="text-sm font-bold uppercase tracking-widest text-brand-500">
                  {group.category}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {group.terms.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossario/${term.slug}/`}
                      className="group rounded-2xl border border-ink-100 bg-brand-50/40 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50"
                    >
                      <h3 className="font-bold text-ink-900 group-hover:text-brand-600">
                        {term.term}
                        {term.aka && (
                          <span className="ml-1 font-normal text-ink-400">({term.aka})</span>
                        )}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-600">
                        {term.short}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Ficou com dúvida?"
        title="Fale com quem entende de contabilidade há mais de 40 anos"
        text="A Visa Contabilidade traduz a burocracia contábil para a linguagem do seu negócio. Tire suas dúvidas com nossa equipe e descubra como podemos ajudar sua empresa a crescer."
        buttonLabel="Falar com um contador"
      />
    </>
  );
}
