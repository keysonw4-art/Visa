/**
 * Glossário de termos contábeis — conteúdo de cauda-longa + citação por IA.
 *
 * Cada termo vira uma página própria (/glossario/[slug]/) com DefinedTerm schema,
 * atacando buscas do tipo "o que é Simples Nacional" (baixa concorrência, alta
 * intenção) e servindo de fonte extraível para respostas de IA (GEO/AISO).
 *
 * Conteúdo revisado para precisão; valores sujeitos a atualização legal trazem
 * ressalva explícita (ex.: limites de faturamento).
 */

export type GlossaryTerm = {
  slug: string;
  term: string;
  /** Sigla/forma estendida, quando houver. */
  aka?: string;
  /** Definição de uma linha — usada no schema `description` e nos cards do índice. */
  short: string;
  /** Explicação completa em parágrafos. */
  body: string[];
  /** Slugs de termos relacionados (links internos + navegação temática). */
  related?: string[];
  category: GlossaryCategory;
};

export type GlossaryCategory =
  | "Regimes tributários"
  | "Tributos e impostos"
  | "Obrigações e documentos"
  | "Conceitos contábeis";

export const glossaryCategories: GlossaryCategory[] = [
  "Regimes tributários",
  "Tributos e impostos",
  "Obrigações e documentos",
  "Conceitos contábeis",
];

export const glossaryTerms: GlossaryTerm[] = [
  // ── Regimes tributários ────────────────────────────────────────────────────
  {
    slug: "regime-tributario",
    term: "Regime Tributário",
    short:
      "Conjunto de regras que determina como uma empresa calcula e paga seus tributos. No Brasil, as três opções principais são Simples Nacional, Lucro Presumido e Lucro Real.",
    body: [
      "O regime tributário é a base de todo o planejamento fiscal de uma empresa. Ele define quais impostos incidem, sobre qual base de cálculo e com quais alíquotas — impactando diretamente quanto o negócio paga ao governo.",
      "No Brasil existem três regimes principais: o Simples Nacional (simplificado, para micro e pequenas empresas), o Lucro Presumido (baseado em margens de lucro presumidas por lei) e o Lucro Real (calculado sobre o lucro contábil efetivo).",
      "A escolha do regime é feita, em regra, no início de cada ano e vale para todo o exercício. Uma opção equivocada pode significar pagar muito mais imposto do que o necessário — por isso a análise de um contador é essencial.",
    ],
    related: ["simples-nacional", "lucro-presumido", "lucro-real"],
    category: "Regimes tributários",
  },
  {
    slug: "simples-nacional",
    term: "Simples Nacional",
    short:
      "Regime tributário simplificado para microempresas e empresas de pequeno porte que unifica vários tributos em uma única guia mensal (DAS).",
    body: [
      "O Simples Nacional foi criado para desburocratizar a vida das micro e pequenas empresas. Em vez de calcular e recolher vários tributos separadamente, a empresa paga tudo em uma guia única, o DAS, com alíquota que varia conforme o faturamento e a atividade.",
      "Podem optar empresas com faturamento anual de até R$ 4,8 milhões, respeitadas algumas restrições de atividade. As alíquotas e a divisão dos tributos seguem tabelas (anexos) específicas para comércio, indústria e serviços.",
      "Apesar do nome, nem sempre o Simples é a opção mais econômica — dependendo da margem de lucro e da folha de pagamento, outros regimes podem sair mais baratos. É aí que entra a análise tributária.",
    ],
    related: ["regime-tributario", "das", "fator-r"],
    category: "Regimes tributários",
  },
  {
    slug: "lucro-presumido",
    term: "Lucro Presumido",
    short:
      "Regime em que o IRPJ e a CSLL são calculados sobre uma margem de lucro presumida por lei, e não sobre o lucro efetivo da empresa.",
    body: [
      "No Lucro Presumido, a Receita Federal assume que a empresa teve um determinado percentual de lucro sobre o faturamento (a presunção varia por atividade — por exemplo, 8% para comércio e 32% para a maioria dos serviços). O imposto incide sobre essa base presumida.",
      "É uma opção comum para empresas com faturamento anual de até R$ 78 milhões e margens de lucro reais superiores à presunção, já que nesse caso se paga imposto sobre uma base menor do que o lucro efetivo.",
      "Além do IRPJ e da CSLL, incidem PIS, COFINS e os tributos sobre a atividade (ISS ou ICMS). A escrituração é mais simples que a do Lucro Real, mas exige controle fiscal rigoroso.",
    ],
    related: ["regime-tributario", "lucro-real", "irpj"],
    category: "Regimes tributários",
  },
  {
    slug: "lucro-real",
    term: "Lucro Real",
    short:
      "Regime em que o IRPJ e a CSLL incidem sobre o lucro contábil efetivo da empresa, após os ajustes previstos em lei.",
    body: [
      "No Lucro Real, o imposto é calculado sobre o lucro que a empresa realmente teve, apurado pela contabilidade e ajustado por adições e exclusões legais. É o regime mais preciso — e o único permitido para empresas com faturamento acima de R$ 78 milhões e para alguns setores (como instituições financeiras).",
      "É vantajoso para negócios com margens de lucro baixas ou prejuízo, pois nesses casos se paga pouco ou nenhum IRPJ/CSLL. Também permite aproveitar créditos de PIS e COFINS no regime não cumulativo.",
      "Em contrapartida, exige a contabilidade mais completa e rigorosa dos três regimes, com escrituração fiscal e contábil detalhada.",
    ],
    related: ["regime-tributario", "lucro-presumido", "escrituracao-contabil"],
    category: "Regimes tributários",
  },

  // ── Tributos e impostos ────────────────────────────────────────────────────
  {
    slug: "irpj",
    term: "IRPJ",
    aka: "Imposto de Renda da Pessoa Jurídica",
    short:
      "Tributo federal que incide sobre o lucro das empresas. A forma de cálculo depende do regime tributário adotado.",
    body: [
      "O IRPJ é o imposto federal cobrado sobre o lucro das empresas. A forma de cálculo depende do regime tributário: no Lucro Presumido incide sobre uma margem presumida; no Lucro Real, sobre o lucro contábil ajustado; no Simples Nacional, já está embutido na guia única (DAS).",
      "A alíquota básica é de 15% sobre a base de cálculo, com adicional de 10% sobre a parcela do lucro que exceder o limite mensal definido em lei. Costuma vir acompanhado da CSLL (Contribuição Social sobre o Lucro Líquido).",
    ],
    related: ["regime-tributario", "lucro-presumido", "lucro-real"],
    category: "Tributos e impostos",
  },
  {
    slug: "iss",
    term: "ISS",
    aka: "Imposto Sobre Serviços",
    short:
      "Tributo municipal que incide sobre a prestação de serviços, com alíquota que varia de 2% a 5% conforme o município e a atividade.",
    body: [
      "O ISS (ou ISSQN) é um imposto de competência dos municípios, cobrado sobre a prestação de serviços. A alíquota varia de 2% a 5% conforme o município e o tipo de serviço.",
      "Em regra, o ISS é devido no município onde está o estabelecimento prestador, mas há exceções previstas em lei (como construção civil) em que ele é recolhido no local da prestação. Prestadores de serviço precisam de atenção para não recolher no município errado.",
    ],
    related: ["nf-e", "fator-r", "regime-tributario"],
    category: "Tributos e impostos",
  },
  {
    slug: "icms",
    term: "ICMS",
    aka: "Imposto sobre Circulação de Mercadorias e Serviços",
    short:
      "Principal tributo estadual, incide sobre a circulação de mercadorias e sobre serviços de transporte e comunicação.",
    body: [
      "O ICMS é um imposto estadual que incide sobre a circulação de mercadorias e sobre serviços de transporte interestadual e intermunicipal e de comunicação. É um dos tributos mais relevantes para o comércio e a indústria.",
      "É um imposto não cumulativo: a empresa se credita do ICMS pago nas compras e debita o ICMS das vendas, recolhendo a diferença. As alíquotas variam por estado e por produto, o que torna o planejamento essencial para quem vende entre estados.",
    ],
    related: ["nf-e", "regime-tributario"],
    category: "Tributos e impostos",
  },
  {
    slug: "das",
    term: "DAS",
    aka: "Documento de Arrecadação do Simples Nacional",
    short:
      "Guia única mensal que reúne todos os tributos das empresas optantes pelo Simples Nacional e dos MEIs.",
    body: [
      "O DAS é o boleto mensal por meio do qual as empresas do Simples Nacional (e os MEIs) pagam, de uma só vez, todos os tributos devidos — federais, estaduais e municipais que estejam abrangidos pelo regime.",
      "O valor é calculado com base no faturamento dos últimos 12 meses e na tabela (anexo) correspondente à atividade. O pagamento em atraso gera juros e multa, e a inadimplência pode levar à exclusão do Simples.",
    ],
    related: ["simples-nacional", "mei"],
    category: "Obrigações e documentos",
  },

  // ── Obrigações e documentos ────────────────────────────────────────────────
  {
    slug: "mei",
    term: "MEI",
    aka: "Microempreendedor Individual",
    short:
      "Figura jurídica simplificada para formalizar pequenos negócios, com tributos fixos mensais e limite de faturamento definido em lei.",
    body: [
      "O MEI é a forma mais simples e barata de formalizar um negócio no Brasil. O empreendedor obtém um CNPJ, pode emitir notas fiscais e tem acesso a benefícios previdenciários, pagando um valor fixo mensal por meio do DAS — independentemente do faturamento dentro do limite.",
      "O limite de faturamento anual é estabelecido em lei (na referência mais usada, R$ 81 mil por ano) e pode ser atualizado periodicamente. O MEI pode ter no máximo um empregado e não pode ser sócio de outra empresa.",
      "Ao ultrapassar o limite ou exercer atividade não permitida, o empreendedor precisa migrar para outro enquadramento, como microempresa no Simples Nacional.",
    ],
    related: ["cnpj", "das", "simples-nacional"],
    category: "Obrigações e documentos",
  },
  {
    slug: "cnpj",
    term: "CNPJ",
    aka: "Cadastro Nacional da Pessoa Jurídica",
    short:
      "Número de identificação de uma empresa perante a Receita Federal — equivalente ao CPF das pessoas físicas.",
    body: [
      "O CNPJ é o registro que identifica uma pessoa jurídica junto à Receita Federal, equivalente ao CPF das pessoas físicas. É obrigatório para emitir notas fiscais, abrir conta bancária empresarial e contratar funcionários.",
      "O cartão CNPJ traz informações públicas como razão social, nome fantasia, endereço, atividades econômicas (CNAE), data de abertura e situação cadastral.",
    ],
    related: ["mei", "nf-e"],
    category: "Obrigações e documentos",
  },
  {
    slug: "nf-e",
    term: "NF-e",
    aka: "Nota Fiscal Eletrônica",
    short:
      "Documento fiscal digital que registra operações com mercadorias, com validade jurídica garantida por assinatura digital.",
    body: [
      "A NF-e substituiu a nota fiscal em papel nas operações com mercadorias. É emitida e armazenada eletronicamente, com validade jurídica assegurada por assinatura digital e autorização prévia da Secretaria da Fazenda (SEFAZ).",
      "Para serviços, o documento equivalente é a NFS-e (Nota Fiscal de Serviços Eletrônica), de competência municipal. A emissão correta é essencial para a apuração de tributos como ICMS e ISS.",
    ],
    related: ["icms", "iss", "cnpj"],
    category: "Obrigações e documentos",
  },

  // ── Conceitos contábeis ────────────────────────────────────────────────────
  {
    slug: "pro-labore",
    term: "Pró-labore",
    short:
      "Remuneração paga aos sócios que trabalham na empresa, sobre a qual incidem INSS e Imposto de Renda.",
    body: [
      "O pró-labore é a remuneração dos sócios que atuam na gestão ou operação da empresa — equivale ao 'salário' do sócio. Diferente da distribuição de lucros, sobre o pró-labore incidem a contribuição previdenciária (INSS) e o Imposto de Renda Retido na Fonte.",
      "Definir corretamente o valor do pró-labore é parte do planejamento tributário: um valor muito alto aumenta a carga de INSS e IR, enquanto a ausência de pró-labore para sócios que trabalham pode ser questionada pela Receita.",
    ],
    related: ["dre", "fator-r"],
    category: "Conceitos contábeis",
  },
  {
    slug: "dre",
    term: "DRE",
    aka: "Demonstração do Resultado do Exercício",
    short:
      "Relatório contábil que mostra receitas, custos, despesas e o lucro ou prejuízo de um período.",
    body: [
      "A DRE é um dos principais relatórios contábeis. Ela organiza, de forma estruturada, tudo o que a empresa faturou e gastou em um período, chegando ao resultado final: lucro ou prejuízo.",
      "Mais do que uma obrigação, a DRE é uma ferramenta de gestão: permite identificar se o negócio é lucrativo, onde estão os maiores custos e como melhorar as margens. É fundamental para decisões estratégicas e para apresentar a empresa a bancos e investidores.",
    ],
    related: ["escrituracao-contabil", "pro-labore"],
    category: "Conceitos contábeis",
  },
  {
    slug: "fator-r",
    term: "Fator R",
    short:
      "Cálculo que compara a folha de pagamento com a receita bruta e define em qual anexo do Simples Nacional uma empresa de serviços é tributada.",
    body: [
      "O Fator R é a razão entre a folha de pagamento (incluindo pró-labore) dos últimos 12 meses e a receita bruta do mesmo período. Ele determina se certas empresas de serviços são tributadas pelo Anexo III (alíquotas menores) ou pelo Anexo V (alíquotas maiores) do Simples Nacional.",
      "Quando o Fator R é igual ou superior a 28%, a empresa é enquadrada no Anexo III, mais vantajoso. Por isso, ajustar a folha e o pró-labore de forma planejada pode reduzir significativamente a carga tributária de prestadores de serviço.",
    ],
    related: ["simples-nacional", "pro-labore", "iss"],
    category: "Conceitos contábeis",
  },
  {
    slug: "escrituracao-contabil",
    term: "Escrituração Contábil",
    short:
      "Registro organizado e sistemático de todas as operações financeiras e patrimoniais de uma empresa, exigido por lei.",
    body: [
      "A escrituração contábil é o registro completo e ordenado de todos os fatos que afetam o patrimônio da empresa — receitas, despesas, compras, vendas, bens e obrigações. É a matéria-prima dos relatórios contábeis, como o balanço patrimonial e a DRE.",
      "Além de obrigatória para a maioria das empresas, uma escrituração bem feita dá segurança jurídica, facilita a obtenção de crédito, comprova a saúde financeira do negócio e é indispensável em regimes como o Lucro Real.",
    ],
    related: ["dre", "lucro-real"],
    category: "Conceitos contábeis",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const bySlug = new Map(glossaryTerms.map((t) => [t.slug, t]));

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return bySlug.get(slug);
}

/** Termos agrupados por categoria, na ordem de `glossaryCategories`. */
export function glossaryByCategory(): { category: GlossaryCategory; terms: GlossaryTerm[] }[] {
  return glossaryCategories.map((category) => ({
    category,
    terms: glossaryTerms
      .filter((t) => t.category === category)
      .sort((a, b) => a.term.localeCompare(b.term, "pt-BR")),
  }));
}

/** Resolve slugs relacionados para objetos (ignora slugs inexistentes). */
export function relatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  return (term.related ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((t): t is GlossaryTerm => Boolean(t));
}
