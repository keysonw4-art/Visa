/**
 * FONTE ÚNICA DE VERDADE dos dados globais do site.
 *
 * Todo dado institucional (NAP, redes, IDs de tracking, navegação) mora aqui.
 * Header, Footer, WhatsAppFloat, schema JSON-LD e metadata leem deste objeto —
 * trocar um telefone/endereço é alteração em UM lugar só.
 *
 * Nada aqui é secreto: são identificadores públicos (aparecem no HTML de qualquer
 * jeito). Segredos (ex: RESEND_API_KEY) ficam em lib/env.ts, nunca aqui.
 */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const siteConfig = {
  name: "Visa Contabilidade",
  legalName: "Visa Contabilidade",
  /** Descrição curta padrão (fallback de metadata e schema). */
  description:
    "Contabilidade especializada em Cascavel-PR há mais de 20 anos. Planejamento tributário, abertura de empresa, análise tributária e gestão contábil estratégica para o seu negócio.",
  /** URL canônica de produção (sem barra final). */
  url: "https://contabilidadevisa.com.br",
  locale: "pt-BR",
  foundingYear: 2003,

  contact: {
    phone: "+55 45 3037-1551",
    phoneRaw: "+554530371551",
    email: "atendimento@contabilidadevisa.com.br",
    whatsapp: {
      number: "5545998221232",
      display: "+55 (45) 99822-1232",
      defaultMessage:
        "Olá! Encontrei seu site e estou interessado(a) em saber mais sobre seus serviços. Poderia me fornecer mais informações, por favor?",
    },
  },

  address: {
    street: "R. Rio Grande do Sul, 1282",
    district: "Centro",
    city: "Cascavel",
    state: "PR",
    zip: "85801-010",
    country: "BR",
    // Coordenadas do centro de Cascavel — refinar com o ponto exato para o schema geo.
    latitude: -24.9555,
    longitude: -53.4552,
  },

  /** Horário de atendimento (usado no footer e no schema openingHours). */
  hours: {
    label: "Segunda a sexta-feira: 8h às 12h | 13h30 às 18h",
    /** Formato schema.org (OpeningHoursSpecification). */
    spec: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "12:00" },
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "13:30", closes: "18:00" },
    ],
  },

  social: {
    instagram: "https://www.instagram.com/Contabilidadevisa",
    facebook: "https://www.facebook.com/contabilidadevisa",
  },

  /**
   * Tracking a preservar da migração (identificadores públicos).
   * A conversão do Google Ads e o GA4 são disparados de dentro do próprio GTM.
   */
  tracking: {
    gtmIds: ["GTM-WPVSD2QZ"],
  },

  /** Navegação principal — reflete os slugs exatos do WordPress (preservação de URL). */
  nav: [
    { label: "Home", href: "/" },
    { label: "Conheça a Visa", href: "/escritorio-de-contabilidade/" },
    {
      label: "Serviços",
      href: "#",
      children: [
        { label: "Abertura de empresa", href: "/abertura-de-empresa/" },
        { label: "Análise Tributária", href: "/analise-tributaria-para-empresas/" },
        { label: "Planejamento Sucessório", href: "/planejamento-sucessorio/" },
        { label: "Troca de Contabilidade", href: "/troca-de-contabilidade/" },
      ],
    },
    {
      label: "Especialidades",
      href: "#",
      children: [
        { label: "Contabilidade para Comércio", href: "/contabilidade-para-comercio/" },
        { label: "Contabilidade para Indústria", href: "/contabilidade-para-industria/" },
        {
          label: "Contabilidade para Prestadores de Serviço",
          href: "/contabilidade-para-prestadores-de-servico/",
        },
      ],
    },
    { label: "Blog", href: "/noticias-contabeis/" },
    { label: "Contato", href: "/escritorio-contabil/" },
  ] satisfies NavItem[],
} as const;

export type SiteConfig = typeof siteConfig;

/** Monta o link do WhatsApp com a mensagem padrão pré-preenchida. */
export function whatsappLink(message: string = siteConfig.contact.whatsapp.defaultMessage) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp.number}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
