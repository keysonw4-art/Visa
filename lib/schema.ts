import type {
  AccountingService,
  BlogPosting,
  BreadcrumbList,
  DefinedTerm,
  DefinedTermSet,
  FAQPage,
  Service,
  WebSite,
  WithContext,
} from "schema-dts";

import { testimonials, testimonialsAggregate } from "@/lib/content/testimonials";
import { siteConfig } from "@/lib/site.config";

const ORG_ID = `${siteConfig.url}/#organization`;

/**
 * Negócio local (AccountingService) — a maior alavanca de SEO local/GEO.
 * NAP + geo + horário + redes + hasMap. Injetado globalmente no layout.
 */
export function organizationSchema(): WithContext<AccountingService> {
  const { address, contact, hours, social } = siteConfig;
  // URL de busca no Google Maps a partir do endereço formatado. Permite ao
  // Google (e a outras IAs) resolver o "onde é a Visa" sem depender só das
  // coordenadas — dobra a chance de aparecer em resultados "perto de mim".
  const mapQuery = encodeURIComponent(
    `${siteConfig.name}, ${address.street}, ${address.district}, ${address.city} - ${address.state}, ${address.zip}`,
  );
  const hasMap = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": ORG_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contact.phone,
    email: contact.email,
    image: `${siteConfig.url}/images/logo.webp`,
    logo: `${siteConfig.url}/images/logo.webp`,
    priceRange: "$$",
    foundingDate: String(siteConfig.foundingYear),
    // Registro no CRC-PR — credencial profissional verificável (E-E-A-T / YMYL).
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CRC-PR",
      name: "Conselho Regional de Contabilidade do Paraná",
      value: siteConfig.crc.value,
    },
    // Regiões atendidas — sinal de alcance local/regional.
    areaServed: [...siteConfig.seo.areaServed],
    // Tópicos de expertise — autoridade temática (E-E-A-T) lida por Google e IAs.
    knowsAbout: [...siteConfig.seo.expertise],
    knowsLanguage: ["pt-BR"],
    slogan: "Contabilidade estratégica em Cascavel-PR desde 1985.",
    currenciesAccepted: "BRL",
    paymentAccepted: "Pix, Boleto, Transferência bancária, Cartão",
    hasMap,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.latitude,
      longitude: address.longitude,
    },
    openingHoursSpecification: hours.spec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days.map((d) => `https://schema.org/${d}` as const),
      opens: s.opens,
      closes: s.closes,
    })),
    sameAs: [social.instagram, social.facebook, social.googleBusiness],
  };
}

/**
 * Avaliações do Google (AggregateRating + Review) anexadas ao MESMO @id do
 * negócio — o Google faz o merge. Injetado só onde os depoimentos aparecem
 * (home), como manda a política de review markup.
 */
export function reviewsSchema(): WithContext<AccountingService> {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": ORG_ID,
    name: siteConfig.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(testimonialsAggregate.ratingValue),
      reviewCount: testimonialsAggregate.reviewCount,
      bestRating: testimonialsAggregate.bestRating,
      worstRating: testimonialsAggregate.worstRating,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.author },
      datePublished: t.date,
      reviewBody: t.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };
}

/** WebSite (identidade do site para os buscadores). */
export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "pt-BR",
    publisher: { "@id": ORG_ID },
  };
}

/** FAQPage — alimenta rich results e extração por IA (GEO). */
export function faqSchema(items: { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** BreadcrumbList das páginas internas. */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

/**
 * Service — cada página de serviço/especialidade vira uma ENTIDADE indexável,
 * ligada ao negócio (provider → @id da Visa) e às regiões atendidas. Reforça
 * buscas do tipo "abertura de empresa Cascavel" e a compreensão por IAs.
 */
export function serviceSchema(input: {
  /** Nome/serviço (ex.: "Abertura de empresa"). */
  name: string;
  description: string;
  /** Slug da página (ex.: "abertura-de-empresa"). */
  slug: string;
  image?: string;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url: new URL(`/${input.slug}/`, siteConfig.url).toString(),
    provider: { "@id": ORG_ID },
    areaServed: [...siteConfig.seo.areaServed],
    ...(input.image
      ? { image: new URL(input.image, siteConfig.url).toString() }
      : {}),
  };
}

const GLOSSARY_SET_ID = `${siteConfig.url}/glossario/#glossario`;

/**
 * DefinedTerm — um verbete do glossário como entidade. Formato altamente
 * extraível por IAs (definição factual + fonte) e elegível a rich results.
 */
export function definedTermSchema(term: {
  name: string;
  description: string;
  slug: string;
}): WithContext<DefinedTerm> {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.name,
    description: term.description,
    url: new URL(`/glossario/${term.slug}/`, siteConfig.url).toString(),
    inDefinedTermSet: GLOSSARY_SET_ID,
  };
}

/** DefinedTermSet — o glossário inteiro como coleção (página índice). */
export function definedTermSetSchema(
  terms: { name: string; description: string; slug: string }[],
): WithContext<DefinedTermSet> {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": GLOSSARY_SET_ID,
    name: "Glossário de Contabilidade — Visa Contabilidade",
    description:
      "Termos de contabilidade e tributação explicados de forma simples pela Visa Contabilidade, escritório contábil em Cascavel-PR.",
    url: `${siteConfig.url}/glossario/`,
    inLanguage: "pt-BR",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.name,
      description: t.description,
      url: new URL(`/glossario/${t.slug}/`, siteConfig.url).toString(),
    })),
  };
}

/** BlogPosting (artigos do blog). */
export function articleSchema(post: {
  title: string;
  excerpt?: string;
  url: string;
  date: string;
  updated?: string;
  cover?: string;
}): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: new URL(post.url, siteConfig.url).toString(),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: post.cover ? new URL(post.cover, siteConfig.url).toString() : undefined,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "pt-BR",
  };
}
