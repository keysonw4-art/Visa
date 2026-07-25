/**
 * Catálogo de serviços e especialidades (conteúdo do site atual).
 * Usado na Home, nas páginas de serviço/especialidade e no menu.
 */

export type ServiceItem = {
  title: string;
  href: string;
  /** Texto curto para cards. */
  excerpt: string;
  /** Imagem de card (em /public/images). */
  image: string;
};

export const services: ServiceItem[] = [
  {
    title: "Abertura de empresa",
    href: "/abertura-de-empresa/",
    excerpt:
      "Tire sua ideia do papel — cuidamos de cada detalhe, da documentação inicial ao planejamento fiscal, garantindo uma estrutura sólida para o seu sucesso.",
    image: "/images/abertura-de-empresa-img-1.webp",
  },
  {
    title: "Análise tributária",
    href: "/analise-tributaria-para-empresas/",
    excerpt:
      "Com uma abordagem precisa e detalhada, identificamos oportunidades para reduzir impostos de forma legal e estratégica. Seu lucro precisa ficar na sua empresa.",
    image: "/images/analise-tributaria-img-1.webp",
  },
  {
    title: "Planejamento sucessório",
    href: "/planejamento-sucessorio/",
    excerpt:
      "Proteja seu patrimônio e garanta a continuidade do seu legado empresarial, com segurança e tranquilidade para todas as partes envolvidas.",
    image: "/images/planejamento-sucessorio-img-1.webp",
  },
  {
    title: "Troca de contabilidade",
    href: "/troca-de-contabilidade/",
    excerpt:
      "Migre sua empresa com segurança e sem complicações. Proporcionamos um atendimento focado nas suas necessidades.",
    image: "/images/troca-de-contabilidade-img-1.webp",
  },
];
