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
  /** Registro no Conselho Regional de Contabilidade — sinal de autoridade (E-E-A-T). */
  crc: { label: "CRC-PR 074.539-O/4", value: "074.539-O/4" },
  /** Descrição curta padrão (fallback de metadata e schema). */
  description:
    "Escritório de contabilidade e contador em Cascavel-PR desde 1985. Planejamento tributário, abertura de empresa e gestão contábil estratégica para a sua empresa.",
  /** URL canônica de produção (sem barra final). */
  url: "https://contabilidadevisa.com.br",
  locale: "pt-BR",
  foundingYear: 1985,

  /**
   * SEO — termos, regiões e tópicos de expertise (fonte única).
   *
   * `keywords`: a meta tag `keywords` é IGNORADA pelo Google desde 2009; serve
   * apenas como sinal fraco no Bing e como referência interna. O peso real de
   * SEO vem do conteúdo, dos títulos e do Schema (`expertise` → knowsAbout).
   * `areaServed` e `expertise` alimentam o JSON-LD (sinais de autoridade local
   * e temática, que Google e IAs realmente leem).
   */
  seo: {
    keywords: [
      "contabilidade em Cascavel",
      "contador em Cascavel",
      "escritório de contabilidade Cascavel",
      "contabilidade Cascavel PR",
      "abertura de empresa Cascavel",
      "planejamento tributário",
      "análise tributária",
      "assessoria contábil",
      "troca de contabilidade",
      "contabilidade para empresas",
      "planejamento sucessório",
      "consultoria tributária",
    ],
    areaServed: ["Cascavel", "Região Oeste do Paraná", "Paraná", "Brasil"],
    expertise: [
      "Planejamento tributário",
      "Abertura de empresa",
      "Análise tributária",
      "Planejamento sucessório",
      "Contabilidade empresarial",
      "Escrituração fiscal e contábil",
      "Departamento pessoal e folha de pagamento",
      "Simples Nacional",
      "Lucro Presumido",
      "Lucro Real",
      "Imposto de Renda Pessoa Jurídica (IRPJ)",
      "Regularização de empresas",
    ],
  },

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
    // Coordenadas exatas da fachada da Visa (extraídas do Google Maps embed).
    latitude: -24.956347,
    longitude: -53.465154,
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
    // Perfil do Google Business (CID extraído do embed oficial do Maps).
    // Entra no sameAs do Schema para o Google confirmar que é a mesma entidade.
    googleBusiness: "https://www.google.com/maps?cid=8714472993688010706",
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
    { label: "Glossário", href: "/glossario/" },
    { label: "Contato", href: "/escritorio-contabil/" },
  ] satisfies NavItem[],
} as const;

export type SiteConfig = typeof siteConfig;

/** Monta o link do WhatsApp com a mensagem padrão pré-preenchida. */
export function whatsappLink(message: string = siteConfig.contact.whatsapp.defaultMessage) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp.number}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
