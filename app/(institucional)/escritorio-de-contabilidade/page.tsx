import type { Metadata } from "next";

import { Counters } from "@/components/sections/Counters";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { IntroSplit } from "@/components/sections/IntroSplit";
import { MissionVisionValues } from "@/components/sections/MissionVisionValues";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StepsProcess } from "@/components/sections/StepsProcess";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Faq } from "@/lib/content/home";
import { services } from "@/lib/content/services";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Conheça a Visa Contabilidade — Escritório de Contabilidade em Cascavel",
  description:
    "Desde 1985, a Visa Contabilidade é referência em soluções contábeis estratégicas em Cascavel-PR. Conheça nossa missão, visão, valores e a equipe que ajuda empresas a crescerem com segurança.",
  path: "/escritorio-de-contabilidade/",
  image: "/images/sobre-banner.webp",
});

const faqs: Faq[] = [
  { q: "O que preciso para abrir uma empresa?", a: "Você só precisa trazer sua ideia! Cuidamos de toda a documentação e do planejamento necessário para o início das suas operações." },
  { q: "Posso mudar de contador a qualquer momento?", a: "Sim, você pode trocar de contador quando sentir necessidade. Nossa equipe facilita esse processo para que seja simples e sem complicações." },
  { q: "Vocês atendem empresas de qualquer porte?", a: "Sim, atendemos desde microempreendedores individuais até grandes empresas, oferecendo soluções personalizadas." },
  { q: "Como funciona o planejamento tributário?", a: "Analisamos seu modelo de negócios e identificamos oportunidades para economizar impostos de forma legal e eficiente." },
  { q: "Preciso de suporte constante. Vocês oferecem esse serviço?", a: "Sim, a Visa Contabilidade disponibiliza atendimento personalizado e relatórios periódicos para acompanhar seus resultados." },
  { q: "Posso contar com vocês para regularizar minha empresa?", a: "Claro! A Visa Contabilidade oferece suporte completo para regularização de empresas, cuidando de todos os detalhes burocráticos." },
];

export default function SobrePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sobre", path: "/escritorio-de-contabilidade/" },
        ])}
      />
      <PageHero
        eyebrow="Conheça a Visa Contabilidade"
        title="Mais de quatro décadas de excelência contábil, impulsionando negócios para o sucesso"
        breadcrumb="Sobre"
        image="/images/sobre-banner.webp"
      />
      <IntroSplit
        eyebrow="Conheça a Visa Contabilidade"
        title="Referência em soluções contábeis estratégicas desde 1985"
        paragraphs={[
          "Desde 1985, a Visa Contabilidade tem sido uma referência em soluções contábeis estratégicas.",
          "Com uma equipe de profissionais altamente qualificados, atendemos nossos clientes com expertise, proximidade e excelência.",
          "Nosso foco é auxiliar empresas a crescerem de forma sustentável e segura.",
        ]}
        image="/images/sobre-img-1.webp"
        ctaLabel="Conheça nossa trajetória de perto"
      />
      <MissionVisionValues />
      <Counters />
      <ServicesGrid
        title="Oferecemos serviços estratégicos para cada etapa da jornada do seu negócio"
        items={services}
      />
      <StepsProcess />
      <FaqAccordion items={faqs} background="brand-50" />
      <CtaBand
        eyebrow="Comece agora"
        title="Na Visa Contabilidade, sua empresa recebe o suporte merecido!"
        text="Deixe as burocracias com a gente e foque no que realmente importa: o crescimento do seu negócio. Entre em contato hoje mesmo e descubra como a Visa Contabilidade pode ajudar."
        buttonLabel="Solicite sua proposta agora"
      />
    </>
  );
}
