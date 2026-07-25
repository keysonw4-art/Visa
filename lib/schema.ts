import type {
  AccountingService,
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  WebSite,
  WithContext,
} from "schema-dts";

import { testimonials, testimonialsAggregate } from "@/lib/content/testimonials";
import { siteConfig } from "@/lib/site.config";

const ORG_ID = `${siteConfig.url}/#organization`;

/**
 * Negócio local (AccountingService) — a maior alavanca de SEO local/GEO.
 * NAP + geo + horário + redes. Injetado globalmente no layout.
 */
export function organizationSchema(): WithContext<AccountingService> {
  const { address, contact, hours, social } = siteConfig;
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
    areaServed: "BR",
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
    sameAs: [social.instagram, social.facebook],
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
