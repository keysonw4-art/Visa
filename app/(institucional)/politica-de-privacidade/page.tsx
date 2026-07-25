import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { privacyBlocks, privacyUpdatedAt } from "@/lib/content/privacy";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Visa Contabilidade: como coletamos, usamos, protegemos e tratamos seus dados pessoais em conformidade com a LGPD.",
  path: "/politica-de-privacidade/",
});

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <PageHero title="Política de Privacidade" breadcrumb="Política de Privacidade" />
      <section className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          <div className="space-y-5 text-ink-600">
            {privacyBlocks.map((block, i) => {
              if (block.type === "h2")
                return (
                  <h2 key={i} className="pt-6 text-2xl font-bold text-ink-900">
                    {block.text}
                  </h2>
                );
              if (block.type === "h3")
                return (
                  <h3 key={i} className="pt-2 text-lg font-bold text-ink-800">
                    {block.text}
                  </h3>
                );
              if (block.type === "ul")
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6">
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              return (
                <p key={i} className="leading-relaxed">
                  {block.text}
                </p>
              );
            })}
            <p className="pt-6 text-sm font-medium text-ink-500">{privacyUpdatedAt}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
