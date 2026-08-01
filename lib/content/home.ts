/** Conteúdo específico da Home (selos, diferenciais, soluções, FAQ). */

export const trustBadges = [
  { value: "Desde 1985", label: "no mercado contábil" },
  { value: "+200 clientes satisfeitos", label: "em todo o Brasil" },
  { value: "Equipe especializada", label: "e multidisciplinar" },
  { value: "Foco em resultados", label: "para o seu negócio" },
] as const;

export const solutions = [
  {
    title: "Planejamento Tributário Estratégico",
    text: "Identifique oportunidades de economia e mantenha sua empresa em conformidade fiscal.",
  },
  {
    title: "Gestão Financeira Personalizada",
    text: "Relatórios claros e estratégicos para acompanhar seus resultados com precisão.",
  },
  {
    title: "Abertura e Regularização de Empresas",
    text: "Simplifique a burocracia e comece seu negócio com o pé direito.",
  },
  {
    title: "Consultoria para Crescimento Sustentável",
    text: "Soluções estratégicas para impulsionar a expansão do seu negócio.",
  },
] as const;

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "Vocês atendem empresas de pequeno e grande porte?",
    a: "Sim, nossas soluções são adaptáveis para empresas de todos os tamanhos.",
  },
  {
    q: "Como funciona o planejamento tributário?",
    a: "Analisamos seu modelo de negócios para identificar regimes fiscais mais vantajosos e oportunidades de economia legal.",
  },
  {
    q: "Vocês atendem empresas fora de Cascavel?",
    a: "Sim, atendemos clientes de todo o Brasil, oferecendo suporte remoto e adaptado às necessidades regionais.",
  },
  {
    q: "É possível economizar com a contabilidade?",
    a: "Com certeza! Planejamos estratégias para reduzir custos e melhorar a gestão financeira do seu negócio.",
  },
  {
    q: "Como acompanho os serviços contratados?",
    a: "Oferecemos relatórios periódicos e suporte contínuo para que você tenha total controle sobre os resultados.",
  },
  {
    q: "Vocês ajudam na transição para a Visa Contabilidade?",
    a: "Sim, cuidamos de todo o processo para garantir uma migração simples e tranquila.",
  },
];
