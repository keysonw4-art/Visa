/**
 * Depoimentos reais de clientes (avaliações do Google), extraídos do widget
 * Trustindex do site antigo. Renderizados de forma estática (leve + indexável)
 * e usados no schema Review/AggregateRating.
 */

export type Testimonial = {
  author: string;
  rating: number;
  /** ISO (YYYY-MM-DD). */
  date: string;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    author: "Paty Claro",
    rating: 5,
    date: "2023-07-31",
    text: "Eu e minha família só temos elogios! O João nos atende há anos. Sempre prestativo, atencioso, ágil e (fazendo milagres) para resolver nossas questões! Encontrei a Visa Contabilidade por acaso no Google, e foi uma grata surpresa. Somos clientes fiéis e super indico para quem precisar!",
  },
  {
    author: "Rafael Paranhos",
    rating: 5,
    date: "2024-04-10",
    text: "Ótimo escritório de contabilidade, experiência e competência de todos os colaboradores, principalmente do João.",
  },
  {
    author: "Kelly Cazangi",
    rating: 5,
    date: "2021-12-23",
    text: "A responsabilidade é incrível. Cordiais, pontuais e organizados. Supera totalmente todas as expectativas.",
  },
  {
    author: "Felipe & Syh Pistun",
    rating: 5,
    date: "2024-04-11",
    text: "Ótima equipe, pessoal nota 10, serviços de qualidade, sempre atenciosos com todos os clientes.",
  },
  {
    author: "Elisangela Canelles",
    rating: 5,
    date: "2024-04-10",
    text: "Ótimo atendimento! Profissionais comprometidos! Recomendo!",
  },
  {
    author: "Julio Fioravanti",
    rating: 5,
    date: "2024-04-10",
    text: "Pessoal atencioso e dedicado pra solucionar os problemas, recomendo.",
  },
  {
    author: "Francielle Alipio",
    rating: 5,
    date: "2024-04-10",
    text: "Excelente atendimento, super recomendo!",
  },
  {
    author: "Syh Rampanelli",
    rating: 5,
    date: "2024-04-10",
    text: "Ótimo atendimento, excelentes profissionais.",
  },
  {
    author: "Flavia Fredo",
    rating: 5,
    date: "2024-04-10",
    text: "Ágeis nas soluções.",
  },
];

/** Agregado derivado dos depoimentos exibidos (todos 5 estrelas). */
export const testimonialsAggregate = {
  ratingValue: 5,
  reviewCount: testimonials.length,
  bestRating: 5,
  worstRating: 1,
};
