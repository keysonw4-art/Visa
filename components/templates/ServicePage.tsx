import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { IntroSplit } from "@/components/sections/IntroSplit";
import { PageHero } from "@/components/sections/PageHero";
import { StepsProcess } from "@/components/sections/StepsProcess";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ServicePageData } from "@/lib/content/service-pages";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

/** Template das páginas de serviço/especialidade, guiado por dados. */
export function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: data.hero.breadcrumb,
          description: data.seo.description,
          slug: data.slug,
          image: data.hero.image,
        })}
      />
      <JsonLd data={faqSchema(data.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: data.hero.breadcrumb, path: `/${data.slug}/` },
        ])}
      />
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        breadcrumb={data.hero.breadcrumb}
        image={data.hero.image}
      />
      <IntroSplit
        eyebrow={data.intro.eyebrow}
        title={data.intro.title}
        paragraphs={data.intro.paragraphs}
        image={data.intro.image}
        ctaLabel={data.intro.ctaLabel}
      />
      <FeatureGrid
        eyebrow={data.features.eyebrow}
        title={data.features.title}
        features={data.features.items}
        ctaLabel={data.features.ctaLabel}
      />
      {data.showSteps && <StepsProcess />}
      <FaqAccordion items={data.faqs} background="white" />
      <CtaBand
        eyebrow={data.finalCta.eyebrow}
        title={data.finalCta.title}
        text={data.finalCta.text}
        buttonLabel={data.finalCta.buttonLabel}
      />
    </>
  );
}
