/**
 * Consolidação das categorias do blog.
 *
 * O WordPress antigo tinha ~79 categorias (a maioria com 1 post só). Aqui elas
 * são agrupadas em ~9 categorias fortes e pesquisáveis. Abordagem NÃO-destrutiva:
 * o frontmatter dos posts fica intacto; este arquivo mapeia cada categoria
 * original para uma consolidada. Editar a taxonomia = editar só este arquivo.
 */

export type BlogCategory = { name: string; slug: string; description: string };

/** Categorias consolidadas (ordem = prioridade de exibição). */
export const blogCategories: BlogCategory[] = [
  {
    name: "Planejamento Tributário",
    slug: "planejamento-tributario",
    description:
      "Estratégias legais para reduzir impostos, escolher o regime ideal e aproveitar créditos e incentivos fiscais.",
  },
  {
    name: "Reforma Tributária",
    slug: "reforma-tributaria",
    description: "Tudo sobre a Reforma Tributária e como preparar sua empresa para as novas regras.",
  },
  {
    name: "Simples Nacional e MEI",
    slug: "simples-nacional-e-mei",
    description: "Simples Nacional, Fator R, MEI e o enquadramento tributário ideal para o seu negócio.",
  },
  {
    name: "Abertura e Regularização",
    slug: "abertura-e-regularizacao",
    description: "Abertura de empresa, CNPJ, contrato social, tipos de sociedade e regularização.",
  },
  {
    name: "Gestão Empresarial",
    slug: "gestao-empresarial",
    description: "Gestão de custos, estoque, precificação e boas práticas para a empresa crescer com eficiência.",
  },
  {
    name: "Gestão Financeira",
    slug: "gestao-financeira",
    description: "Fluxo de caixa, BPO financeiro, crédito e planejamento financeiro para a saúde do negócio.",
  },
  {
    name: "Contabilidade Especializada",
    slug: "contabilidade-especializada",
    description: "Contabilidade para comércio, indústria e prestadores de serviço, e troca de contador.",
  },
  {
    name: "Obrigações Fiscais e Trabalhistas",
    slug: "obrigacoes-fiscais-e-trabalhistas",
    description: "eSocial, notas fiscais, INSS, Receita Federal e obrigações do dia a dia da empresa.",
  },
  {
    name: "Contabilidade na Crise",
    slug: "contabilidade-na-crise",
    description: "Como manter a empresa saudável em cenários de crise e retomada econômica.",
  },
];

const bySlug = new Map(blogCategories.map((c) => [c.slug, c]));

/** categoria original (lowercase) → slug consolidado. */
const originalToSlug: Record<string, string> = {};
function assign(slug: string, ...originals: string[]) {
  for (const o of originals) originalToSlug[o.toLowerCase()] = slug;
}

assign(
  "planejamento-tributario",
  "Planejamento Tributário",
  "Impostos",
  "Gestão Fiscal",
  "Gestão tributária",
  "Avaliação de regime tributário",
  "Pagar menos impostos",
  "Pagar menos impostos na indústria",
  "Incentivos fiscais",
  "Crédito de IPI",
  "Crédito de ICMS (CIAP)",
  "Redução de ICMS",
  "ICMS",
  "ISS",
  "DAS",
  "Lucro Real ou Presumido",
  "Planejamento tributário industrial",
  "Distribuição de lucros",
);
assign("reforma-tributaria", "Reforma tributária 2026", "Reforma Tributária");
assign("simples-nacional-e-mei", "Simples Nacional", "Simples Nacional e Fator R", "MEI", "Fator R");
assign(
  "abertura-e-regularizacao",
  "Abertura de empresa",
  "Abrir empresa",
  "CNPJ",
  "Regularização de CNPJ em Cascavel",
  "Contrato Social",
  "Sociedade empresarial",
  "Sociedade uniprofissional (SUP)",
  "Empreendedorismo",
  "Empreeendedorismo",
  "Empreendedor",
  "Contratação",
);
assign(
  "gestao-empresarial",
  "Gestão Empresarial",
  "Gestão de negócio",
  "Gestão de negócios",
  "Custos operacionais",
  "Custo do Produto Vendido (CPV)",
  "Controle de estoque",
  "Gestão de estoque",
  "Redução de custos",
  "Precificação",
  "Cultura Organizacional",
  "Compliance contábil",
  "Planejamento orçamentário",
  "Noticias",
);
assign(
  "gestao-financeira",
  "Gestão financeira",
  "Planejamento financeiro",
  "BPO Financeiro",
  "Empréstimo",
  "Substituir Empréstimos",
  "Linha de crédito",
  "Microcrédito",
  "Pronampe",
  "BNDES",
  "Pix",
);
assign(
  "contabilidade-especializada",
  "Contabilidade para comércio",
  "Contabilidade para Indústria",
  "Prestadores de Serviços",
  "contabilidade especializada em Cascavel",
  "Escritório de contabilidade",
  "Escritório de contabilidade em PR",
  "Contador em Cascavel",
  "Troca de Contador",
);
assign(
  "obrigacoes-fiscais-e-trabalhistas",
  "eSocial",
  "INSS",
  "Nota fiscal",
  "Nota Fiscal Fácil",
  "Receita Federal",
  "Medida Provisória",
  "Acidente de trabalho",
  "Home Office",
  "Volta ao trabalho",
  "Salário mínimo",
  "Dívidas trabalhistas",
);
assign("contabilidade-na-crise", "Contabilidade na crise", "Crise", "Coronavírus");

/** Categoria consolidada padrão para originais não mapeadas. */
const DEFAULT_SLUG = "gestao-empresarial";

export function categoryBySlug(slug: string): BlogCategory | undefined {
  return bySlug.get(slug);
}

/** Mapeia UMA categoria original para a consolidada. */
function mapOne(original: string): BlogCategory {
  const slug = originalToSlug[original.toLowerCase()] ?? DEFAULT_SLUG;
  return bySlug.get(slug)!;
}

/** Categorias consolidadas (únicas) de um post, na ordem de prioridade. */
export function consolidatedCategories(originals: string[]): BlogCategory[] {
  const slugs = new Set(originals.map((o) => mapOne(o).slug));
  return blogCategories.filter((c) => slugs.has(c.slug));
}

/** Categoria principal de um post (a primeira consolidada). */
export function primaryCategory(originals: string[]): BlogCategory {
  return consolidatedCategories(originals)[0] ?? bySlug.get(DEFAULT_SLUG)!;
}
