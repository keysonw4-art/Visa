import type { Feature } from "@/components/sections/FeatureGrid";
import type { Faq } from "@/lib/content/home";

/** Dados de uma página de serviço/especialidade (conteúdo fiel ao site atual). */
export type ServicePageData = {
  slug: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; breadcrumb: string; image?: string };
  intro: { eyebrow?: string; title: string; paragraphs: string[]; image?: string; ctaLabel?: string };
  features: { eyebrow?: string; title: string; items: Feature[]; ctaLabel?: string };
  showSteps?: boolean;
  faqs: Faq[];
  finalCta: { eyebrow: string; title: string; text: string; buttonLabel: string };
};

export const servicePages: Record<string, ServicePageData> = {
  "abertura-de-empresa": {
    slug: "abertura-de-empresa",
    seo: {
      title: "Abertura de Empresa em Cascavel-PR",
      description:
        "Abra sua empresa em Cascavel com a Visa Contabilidade: análise de viabilidade, contrato social, registro nos órgãos, regime tributário e alvarás. Estrutura sólida desde o primeiro passo.",
    },
    hero: {
      eyebrow: "Abertura de empresa",
      title: "Comece sua empresa com a Visa Contabilidade: estrutura sólida desde o primeiro passo",
      breadcrumb: "Abertura de empresa",
      image: "/images/abertura-de-empresa-banner.webp",
    },
    intro: {
      eyebrow: "Abertura de empresa",
      title: "Transforme sua ideia em realidade com quem entende de negócios",
      paragraphs: [
        "Na Visa Contabilidade, cuidamos de todo o processo para que você possa começar o seu negócio com o pé direito.",
        "Da documentação inicial ao planejamento fiscal, garantimos que cada detalhe esteja em conformidade e alinhado ao sucesso da sua empresa.",
      ],
      image: "/images/abertura-de-empresa-img-1.webp",
    },
    features: {
      eyebrow: "O que a Visa Contabilidade pode fazer por você",
      title: "Soluções completas para cada etapa da abertura do seu negócio",
      ctaLabel: "Contrate agora e deixe a burocracia com a gente",
      items: [
        {
          title: "Análise de viabilidade",
          text: "Identificamos o melhor formato jurídico e tributário para o seu negócio, garantindo economia e eficiência desde o início.",
        },
        {
          title: "Elaboração de contratos sociais",
          text: "Criamos os documentos legais personalizados para formalizar sua empresa, com total segurança jurídica.",
        },
        {
          title: "Registro em órgãos competentes",
          text: "Cuidamos de toda a burocracia para registro na Junta Comercial, Receita Federal, Prefeitura e outros órgãos necessários.",
        },
        {
          title: "Planejamento tributário inicial",
          text: "Definimos o regime tributário ideal para sua empresa, reduzindo custos e evitando problemas fiscais.",
        },
        {
          title: "Alvarás e licenças",
          text: "Providenciamos as autorizações específicas para que sua empresa funcione sem preocupações.",
        },
        {
          title: "Assessoria contábil contínua",
          text: "Após a abertura, oferecemos suporte para manter sua empresa em conformidade e focada no crescimento.",
        },
      ],
    },
    showSteps: true,
    faqs: [
      {
        q: "Quais documentos são necessários para abrir uma empresa?",
        a: "Os principais documentos são RG, CPF, comprovante de residência, contrato social, entre outros específicos do seu negócio.",
      },
      {
        q: "Quanto tempo leva para abrir uma empresa?",
        a: "O prazo pode variar, mas geralmente concluímos o processo em até 15 dias úteis, dependendo dos órgãos envolvidos.",
      },
      {
        q: "Quais tipos de empresa vocês abrem?",
        a: "Atendemos todos os tipos de empresas, como MEI, EI, Ltda, SLU, entre outras.",
      },
      {
        q: "Vocês ajudam a escolher o regime tributário?",
        a: "Sim, analisamos o seu modelo de negócio e indicamos o regime mais vantajoso para você economizar com impostos.",
      },
      {
        q: "Preciso de um contador para abrir minha empresa?",
        a: "Sim, o contador é essencial para garantir que todo o processo esteja em conformidade com as leis e normas fiscais.",
      },
      {
        q: "A Visa Contabilidade oferece suporte após a abertura?",
        a: "Sim, após a abertura, oferecemos assessoria completa para ajudar sua empresa a crescer com segurança.",
      },
    ],
    finalCta: {
      eyebrow: "Dê o primeiro passo para o sucesso do seu negócio",
      title: "Abra sua empresa com a Visa Contabilidade e conte com segurança e expertise em cada etapa",
      text: "Não perca tempo com burocracias. Deixe que a Visa Contabilidade cuide de tudo para você, desde o planejamento até a regularização completa. O sucesso do seu negócio começa aqui.",
      buttonLabel: "Solicite a abertura da sua empresa",
    },
  },

  "analise-tributaria-para-empresas": {
    slug: "analise-tributaria-para-empresas",
    seo: {
      title: "Análise Tributária para Empresas em Cascavel-PR",
      description:
        "Reduza custos com a análise tributária da Visa Contabilidade: diagnóstico fiscal, planejamento personalizado, incentivos fiscais e prevenção de passivos. Otimize sua carga tributária dentro da lei.",
    },
    hero: {
      eyebrow: "Análise tributária",
      title: "Análise Tributária que maximiza seus resultados e reduz custos com inteligência",
      breadcrumb: "Análise Tributária",
      image: "/images/analise-tributaria-banner.webp",
    },
    intro: {
      eyebrow: "Análise tributária",
      title: "Otimize sua carga tributária e potencialize o lucro da sua empresa",
      paragraphs: [
        "Na Visa Contabilidade, identificamos as melhores oportunidades fiscais para reduzir custos e aumentar sua competitividade, sempre dentro da legalidade.",
        "Nossa análise detalhada permite que sua empresa aproveite benefícios fiscais, evite erros e esteja preparada para crescer de forma sustentável.",
      ],
      image: "/images/analise-tributaria-img-1.webp",
      ctaLabel: "Agende uma análise tributária",
    },
    features: {
      eyebrow: "Soluções completas em análise tributária",
      title: "Descubra como nossa análise tributária pode transformar o seu negócio",
      ctaLabel: "Transforme sua gestão tributária com a Visa Contabilidade",
      items: [
        { title: "Diagnóstico fiscal completo", text: "Revisamos a situação fiscal da sua empresa para identificar erros ou oportunidades de melhoria." },
        { title: "Planejamento tributário personalizado", text: "Criamos estratégias sob medida para otimizar o pagamento de impostos e reduzir custos." },
        { title: "Aproveitamento de incentivos fiscais", text: "Orientamos sua empresa sobre como acessar e aproveitar benefícios fiscais disponíveis no mercado." },
        { title: "Simulações de regimes tributários", text: "Analisamos cenários e ajudamos a escolher o regime tributário mais vantajoso para o seu negócio." },
        { title: "Gestão de obrigações acessórias", text: "Garantimos que todos os documentos fiscais e contábeis estejam atualizados e em conformidade." },
        { title: "Prevenção de passivos fiscais", text: "Avaliamos os riscos tributários e implementamos medidas para proteger sua empresa de multas e autuações." },
      ],
    },
    showSteps: true,
    faqs: [
      { q: "Por que minha empresa precisa de análise tributária?", a: "A análise tributária ajuda a identificar formas de reduzir impostos, aproveitar benefícios fiscais e evitar penalidades, maximizando seus lucros." },
      { q: "A análise tributária é válida para empresas de qualquer porte?", a: "Sim, empresas de todos os tamanhos podem se beneficiar de uma análise tributária, de MEIs até grandes corporações." },
      { q: "A análise tributária é um serviço legalizado?", a: "Sim! Nossas estratégias são totalmente legais e seguem as normas fiscais vigentes." },
      { q: "Quanto tempo leva para obter resultados com a análise tributária?", a: "Os primeiros resultados podem ser vistos em pouco tempo, mas o impacto maior acontece ao longo de uma gestão contínua." },
      { q: "Minha empresa tem pendências fiscais. Posso fazer a análise tributária mesmo assim?", a: "Sim! Identificamos e resolvemos as pendências enquanto implementamos melhorias na sua gestão tributária." },
      { q: "A análise tributária inclui mudanças no regime fiscal?", a: "Sim, se identificarmos que uma mudança no regime tributário trará benefícios, fazemos a simulação e orientamos a transição." },
    ],
    finalCta: {
      eyebrow: "Comece agora",
      title: "Conte com a Visa Contabilidade para uma gestão tributária inteligente e estratégica",
      text: "Transforme seus desafios fiscais em oportunidades de crescimento. Com a Visa Contabilidade, sua empresa terá o suporte necessário para estar sempre um passo à frente.",
      buttonLabel: "Agende uma análise tributária",
    },
  },

  "planejamento-sucessorio": {
    slug: "planejamento-sucessorio",
    seo: {
      title: "Planejamento Sucessório Empresarial em Cascavel-PR",
      description:
        "Proteja seu patrimônio com o planejamento sucessório da Visa Contabilidade: diagnóstico patrimonial, holdings familiares, revisão tributária e segurança jurídica para a continuidade do seu negócio.",
    },
    hero: {
      eyebrow: "Planejamento sucessório",
      title: "Planejamento Sucessório: proteja seu patrimônio e garanta o futuro do seu negócio",
      breadcrumb: "Planejamento Sucessório",
      image: "/images/planejamento-sucessorio-banner.webp",
    },
    intro: {
      eyebrow: "Planejamento sucessório",
      title: "O futuro da sua empresa começa com um planejamento seguro e estratégico",
      paragraphs: [
        "Na Visa Contabilidade, ajudamos você a organizar a transição do seu patrimônio ou da liderança da sua empresa de forma eficiente.",
        "Com um planejamento sucessório bem estruturado, você garante a continuidade do seu negócio e protege os interesses de todas as partes envolvidas.",
      ],
      image: "/images/planejamento-sucessorio-img-1.webp",
      ctaLabel: "Agende uma conversa",
    },
    features: {
      eyebrow: "Nossas soluções",
      title: "Garanta a proteção do seu legado com um planejamento sucessório estratégico",
      ctaLabel: "Inicie seu planejamento sucessório hoje mesmo",
      items: [
        { title: "Diagnóstico patrimonial", text: "Mapeamos os bens e ativos do empresário ou da empresa para identificar as melhores estratégias de sucessão." },
        { title: "Definição de herdeiros e sucessores", text: "Apoiamos na estruturação de planos que atendam aos interesses de todas as partes, evitando conflitos futuros." },
        { title: "Criação de holdings familiares", text: "Organizamos o patrimônio empresarial em uma holding para facilitar a sucessão e garantir benefícios fiscais." },
        { title: "Revisão tributária e fiscal", text: "Analisamos o impacto fiscal da sucessão e propomos soluções que reduzam custos e evitem surpresas financeiras." },
        { title: "Formalização de documentos", text: "Preparamos testamentos, contratos e demais documentos legais para garantir a segurança jurídica do planejamento." },
        { title: "Acompanhamento contínuo", text: "Monitoramos o plano sucessório e realizamos ajustes conforme mudanças no mercado ou no cenário familiar." },
      ],
    },
    showSteps: true,
    faqs: [
      { q: "Por que minha empresa precisa de um planejamento sucessório?", a: "O planejamento sucessório garante a continuidade do negócio, evita conflitos familiares e protege o patrimônio de possíveis impactos fiscais ou legais." },
      { q: "Quando é o momento ideal para iniciar o planejamento sucessório?", a: "O ideal é iniciar o planejamento enquanto a gestão ainda está consolidada, garantindo tempo para decisões estratégicas e estruturadas." },
      { q: "O que é uma holding familiar e como ela ajuda na sucessão?", a: "Uma holding familiar é uma estrutura empresarial que organiza e protege o patrimônio, facilitando a sucessão e reduzindo custos tributários." },
      { q: "O planejamento sucessório é válido para pequenas empresas?", a: "Sim, empresas de todos os portes podem se beneficiar, garantindo a continuidade do negócio e protegendo os bens envolvidos." },
      { q: "Minha empresa já está em processo de sucessão. Ainda posso contratar o serviço?", a: "Sim! Podemos ajudar a revisar e ajustar o plano existente, garantindo que ele seja eficiente e seguro." },
      { q: "Quais documentos são necessários para iniciar o planejamento sucessório?", a: "Documentos como relação de bens, contratos sociais, documentos pessoais dos envolvidos e informações fiscais são os mais comuns." },
    ],
    finalCta: {
      eyebrow: "Planeje-se e garanta o futuro",
      title: "Garanta a continuidade do seu legado com a Visa Contabilidade",
      text: "Com o planejamento sucessório da Visa Contabilidade, você protege o que construiu com tanto esforço e garante que sua empresa continue crescendo por gerações.",
      buttonLabel: "Iniciar atendimento",
    },
  },

  "troca-de-contabilidade": {
    slug: "troca-de-contabilidade",
    seo: {
      title: "Troca de Contabilidade e Contador em Cascavel-PR",
      description:
        "Trocar de contador em Cascavel sem complicação: análise do histórico, regularização de pendências, atualização cadastral e migração de dados. Transição tranquila e segura com a Visa Contabilidade.",
    },
    hero: {
      eyebrow: "Troca de contabilidade",
      title: "Trocar de contador nunca foi tão fácil: deixe a Visa Contabilidade cuidar de tudo por você!",
      breadcrumb: "Troca de Contabilidade",
      image: "/images/troca-de-contabilidade-banner.webp",
    },
    intro: {
      eyebrow: "Troca de contabilidade",
      title: "Garanta uma gestão contábil eficiente com quem entende o seu negócio",
      paragraphs: [
        "Na Visa Contabilidade, entendemos que mudar de contador pode parecer um processo difícil. É por isso que cuidamos de todos os detalhes para que sua transição seja tranquila, eficiente e alinhada às necessidades da sua empresa.",
        "Com nossa expertise, você terá a confiança de que suas finanças estarão sempre em boas mãos.",
      ],
      image: "/images/troca-de-contabilidade-img-1.webp",
      ctaLabel: "Troque para a Visa Contabilidade hoje mesmo",
    },
    features: {
      eyebrow: "O que oferecemos durante a transição",
      title: "Conte com soluções completas durante o processo de troca de contabilidade",
      ctaLabel: "Faça a troca com total segurança",
      items: [
        { title: "Análise do histórico contábil", text: "Revisamos os dados e documentos contábeis da sua empresa para garantir uma transição sem erros." },
        { title: "Regularização de pendências", text: "Identificamos e resolvemos possíveis problemas fiscais e contábeis acumulados pela gestão anterior." },
        { title: "Atualização cadastral", text: "Garantimos que os registros da sua empresa estejam atualizados nos órgãos competentes." },
        { title: "Planejamento fiscal estratégico", text: "Reavaliamos seu regime tributário e implementamos estratégias para reduzir custos e aumentar sua eficiência." },
        { title: "Integração com nossos sistemas", text: "Migramos seus dados para nossos sistemas digitais, facilitando o acesso a relatórios e acompanhamentos." },
        { title: "Acompanhamento personalizado", text: "Nossa equipe estará ao seu lado em cada etapa, garantindo que sua transição seja simples e segura." },
      ],
    },
    showSteps: true,
    faqs: [
      { q: "Preciso informar minha contabilidade atual sobre a troca?", a: "Sim, mas não se preocupe! Nós auxiliamos no processo de comunicação com sua contabilidade atual." },
      { q: "Quanto tempo leva o processo de troca de contabilidade?", a: "Em média, o processo é concluído entre 7 e 15 dias úteis, dependendo da disponibilidade dos documentos." },
      { q: "Posso trocar de contabilidade a qualquer momento?", a: "Sim! A legislação permite que você troque de contador quando desejar." },
      { q: "Minha empresa possui pendências fiscais. Posso trocar de contabilidade mesmo assim?", a: "Sim. Durante a transição, identificamos e regularizamos quaisquer pendências para garantir sua conformidade." },
      { q: "A troca de contabilidade vai interromper a gestão do meu negócio?", a: "Não. Planejamos a transição de forma que não afete as operações da sua empresa." },
      { q: "A Visa Contabilidade oferece suporte após a troca?", a: "Sim, oferecemos atendimento contínuo e personalizado para acompanhar o crescimento do seu negócio." },
    ],
    finalCta: {
      eyebrow: "Pronto para transformar sua contabilidade?",
      title: "Troque para a Visa Contabilidade e experimente um novo padrão de excelência",
      text: "Deixe as burocracias para a gente e foque no que realmente importa: fazer sua empresa crescer. Com a Visa Contabilidade, você tem suporte especializado e segurança em cada etapa.",
      buttonLabel: "Faça a troca agora",
    },
  },

  "contabilidade-para-comercio": {
    slug: "contabilidade-para-comercio",
    seo: {
      title: "Contabilidade para Comércio em Cascavel-PR",
      description:
        "Contabilidade especializada para comércio em Cascavel: planejamento tributário, gestão de fluxo de caixa, regularização e redução de custos. Desde 1985 ajudando comerciantes a crescer.",
    },
    hero: {
      eyebrow: "Especialidades",
      title: "Simplifique a gestão do seu comércio e maximize seus resultados!",
      breadcrumb: "Contabilidade para Comércio",
      image: "/images/contabilidade-para-comercio-banner.webp",
    },
    intro: {
      eyebrow: "Contabilidade para comércio",
      title: "Soluções contábeis sob medida para seu negócio",
      paragraphs: [
        "Conhecemos os desafios enfrentados por comerciantes, desde a carga tributária até a gestão de fluxo de caixa.",
        "Nossa equipe é especializada em oferecer serviços que simplificam sua rotina e potencializam seus resultados.",
      ],
      image: "/images/contabilidade-para-comercio-img-1.webp",
      ctaLabel: "Consulte propostas",
    },
    features: {
      eyebrow: "Soluções completas para o seu comércio",
      title: "Tudo o que seu comércio precisa para crescer sem preocupações",
      ctaLabel: "Transforme sua contabilidade em uma aliada estratégica",
      items: [
        { title: "Planejamento Tributário Inteligente", text: "Identificamos o regime tributário ideal para o seu negócio, reduzindo a carga de impostos de forma segura e eficiente." },
        { title: "Gestão de Fluxo de Caixa", text: "Fornecemos relatórios detalhados que ajudam a monitorar entradas e saídas de recursos, garantindo controle total sobre a saúde financeira do seu comércio." },
        { title: "Consultoria Contábil Personalizada", text: "Desenvolvemos estratégias que atendem às suas necessidades específicas, da redução de custos ao planejamento de crescimento sustentável." },
        { title: "Regularização de Documentação", text: "Organizamos toda a documentação fiscal e contábil do seu comércio, evitando problemas com órgãos fiscalizadores." },
        { title: "Análise de Custos e Despesas", text: "Identificamos gastos desnecessários e oportunidades de economia, aumentando a lucratividade do seu negócio." },
        { title: "Cumprimento de Obrigações Fiscais", text: "Enviamos declarações, guias e outros documentos obrigatórios dentro dos prazos. Você nunca mais precisará se preocupar com multas ou atrasos." },
      ],
    },
    showSteps: true,
    faqs: [
      { q: "O que é necessário para contratar os serviços?", a: "Basta entrar em contato conosco! Vamos analisar suas necessidades e criar uma proposta personalizada." },
      { q: "Vocês atendem apenas comércios de Cascavel?", a: "Embora nossa base seja em Cascavel, atendemos comerciantes de diversas localidades." },
      { q: "Como vocês ajudam a reduzir custos?", a: "Por meio de planejamento tributário, análise de despesas e controle financeiro estratégico." },
      { q: "Preciso mudar meu contador atual para contratar vocês?", a: "Sim, mas não se preocupe: cuidamos de toda a transição de forma simples e rápida." },
      { q: "Qual o prazo para ver resultados na gestão contábil?", a: "Os prazos variam, mas nossos clientes costumam perceber melhorias já nos primeiros meses." },
      { q: "Vocês atendem negócios de pequeno porte?", a: "Sim, oferecemos soluções para empresas de todos os tamanhos, incluindo pequenos comerciantes e MEIs." },
    ],
    finalCta: {
      eyebrow: "Pronto para dar o próximo passo?",
      title: "Deixe a burocracia conosco e foque no crescimento do seu comércio",
      text: "Com nossa expertise e atendimento personalizado, sua contabilidade estará em boas mãos. Não adie mais sua decisão!",
      buttonLabel: "Solicite sua proposta agora",
    },
  },

  "contabilidade-para-industria": {
    slug: "contabilidade-para-industria",
    seo: {
      title: "Contabilidade para Indústria em Cascavel-PR",
      description:
        "Contabilidade especializada para indústria em Cascavel: planejamento tributário, gestão de custos industriais, controle de estoques, incentivos fiscais e análise de rentabilidade.",
    },
    hero: {
      eyebrow: "Especialidades",
      title: "Controle e eficiência para a indústria: soluções contábeis especializadas",
      breadcrumb: "Contabilidade para Indústria",
      image: "/images/contabilidade-para-industria-banner.webp",
    },
    intro: {
      eyebrow: "Contabilidade para indústria",
      title: "Há mais de 40 anos, impulsionando o setor industrial para o sucesso",
      paragraphs: [
        "Desde 1985, a Visa Contabilidade oferece soluções sob medida para indústrias de todos os portes, transformando desafios fiscais em oportunidades de crescimento.",
        "Nosso objetivo é garantir que sua indústria opere com eficiência, esteja em dia com as obrigações fiscais e alcance novos patamares de rentabilidade e competitividade.",
      ],
      image: "/images/contabilidade-para-industria-img-1.webp",
      ctaLabel: "Consulte propostas",
    },
    features: {
      eyebrow: "Conte com a Visa Contabilidade",
      title: "Soluções estratégicas que transformam a gestão contábil da sua indústria",
      ctaLabel: "Traga soluções para o seu negócio",
      items: [
        { title: "Planejamento Tributário", text: "Identificamos incentivos fiscais e oportunidades de economia, reduzindo impostos de maneira legal e estratégica para sua indústria." },
        { title: "Gestão de Custos Industriais", text: "Monitoramos seus custos de produção para evitar desperdícios, melhorar a margem de lucro e aumentar a eficiência operacional." },
        { title: "Controle de Estoques e Insumos", text: "Implantamos um sistema de controle que organiza e otimiza os estoques, garantindo precisão e reduzindo perdas no processo produtivo." },
        { title: "Regularização Fiscal e Trabalhista", text: "Garantimos que sua indústria esteja em conformidade com todas as exigências legais, evitando multas e complicações jurídicas." },
        { title: "Consultoria em Auditorias", text: "Oferecemos suporte especializado para auditorias fiscais e trabalhistas, assegurando total transparência e segurança na operação." },
        { title: "Análise de Rentabilidade", text: "Criamos relatórios detalhados que mostram os setores mais lucrativos do seu negócio, ajudando você a planejar estratégias de crescimento." },
      ],
    },
    showSteps: true,
    faqs: [
      { q: "Vocês atendem indústrias de pequeno porte?", a: "Sim, nossas soluções são adaptáveis para empresas de todos os portes, garantindo eficiência e resultados." },
      { q: "Como funciona o planejamento tributário para indústrias?", a: "Analisamos seu modelo de negócios para identificar benefícios fiscais e otimizar a carga tributária da sua operação." },
      { q: "Vocês ajudam no controle de estoques?", a: "Sim, oferecemos ferramentas e estratégias para organizar e otimizar seus estoques, reduzindo perdas." },
      { q: "Quanto tempo leva para regularizar minha empresa?", a: "O prazo depende do caso, mas nossa equipe trabalha com agilidade para resolver todas as pendências rapidamente." },
      { q: "Vocês atendem indústrias de outros estados?", a: "Sim, nossa atuação é nacional e adaptada às necessidades regionais de cada cliente." },
      { q: "Como posso acompanhar os resultados?", a: "Enviamos relatórios detalhados e periódicos para que você tenha total controle sobre o desempenho financeiro da sua indústria." },
    ],
    finalCta: {
      eyebrow: "Comece agora",
      title: "Na Visa Contabilidade, sua indústria recebe o suporte que merece!",
      text: "Deixe as burocracias com a gente e foque no que você faz de melhor: produzir e crescer. Entre em contato hoje mesmo e descubra como podemos transformar sua gestão contábil.",
      buttonLabel: "Solicite sua proposta agora",
    },
  },

  "contabilidade-para-prestadores-de-servico": {
    slug: "contabilidade-para-prestadores-de-servico",
    seo: {
      title: "Contabilidade para Prestadores de Serviço em Cascavel-PR",
      description:
        "Contabilidade especializada para prestadores de serviço em Cascavel: planejamento tributário, Fator R, emissão de notas, ISS e gestão financeira. Pague menos impostos dentro da lei.",
    },
    hero: {
      eyebrow: "Especialidades",
      title: "Gestão especializada para o setor de serviços: proteja seu faturamento e cresça com segurança",
      breadcrumb: "Contabilidade para Prestadores de Serviço",
      image: "/images/contabilidade-para-prestadores-de-servicos-banner.webp",
    },
    intro: {
      eyebrow: "Contabilidade para prestadores de serviços",
      title: "Transformamos desafios fiscais em oportunidades de crescimento",
      paragraphs: [
        "Gerenciar uma agenda cheia já é desafiador, mas quando somamos impostos retidos, ISS e a regularidade fiscal, tudo fica ainda mais complexo.",
        "É aí que entramos: com soluções contábeis ágeis e personalizadas, cuidamos desses detalhes para que você tenha mais tempo, tranquilidade e foco no que realmente importa – fazer seu negócio crescer.",
      ],
      image: "/images/contabilidade-para-prestadores-de-servicos-img-1.webp",
      ctaLabel: "Fale com um consultor",
    },
    features: {
      eyebrow: "Soluções completas",
      title: "Oferecemos serviços estratégicos para garantir o sucesso do seu negócio",
      ctaLabel: "Invista na gestão contábil do seu negócio",
      items: [
        { title: "Planejamento Tributário", text: "Descubra como pagar menos impostos, de forma legal, com um planejamento que entende as particularidades do setor de serviços." },
        { title: "Gestão Financeira Integrada", text: "Organize suas finanças com relatórios claros, que permitem acompanhar receitas, despesas e projetar crescimento." },
        { title: "Emissão de Notas Fiscais e Regularização", text: "Facilitamos a emissão de notas fiscais e mantemos sua empresa sempre regularizada, evitando multas e complicações." },
        { title: "Consultoria Contábil Personalizada", text: "Receba orientação sob medida para tomar decisões estratégicas que impactam diretamente os lucros do seu negócio." },
        { title: "Cumprimento de Obrigações Fiscais", text: "Garantimos o envio de declarações e pagamento de guias, deixando você tranquilo quanto às exigências legais." },
        { title: "Controle de Despesas Operacionais", text: "Analisamos seus custos operacionais para identificar economias e aumentar a rentabilidade do seu negócio." },
      ],
    },
    showSteps: true,
    faqs: [
      { q: "Qual o melhor regime tributário para prestadores de serviços?", a: "Depende do seu faturamento e da natureza dos serviços prestados. Nossa equipe pode ajudá-lo a escolher entre Simples Nacional, Lucro Presumido ou Real." },
      { q: "Preciso emitir nota fiscal para todos os clientes?", a: "Sim, a emissão de notas fiscais é obrigatória para a maioria dos prestadores de serviços. Podemos orientá-lo nesse processo." },
      { q: "Vocês atendem profissionais autônomos?", a: "Sim, oferecemos soluções específicas para autônomos, incluindo planejamento tributário e emissão de guias de recolhimento." },
      { q: "É possível reduzir custos operacionais com a contabilidade?", a: "Sim, analisamos seus custos para identificar oportunidades de economia e otimização." },
      { q: "Vocês atendem empresas de serviços em outras cidades?", a: "Sim, atendemos clientes em todo o Brasil, com soluções adaptadas às necessidades regionais." },
      { q: "Como funciona o suporte após a contratação?", a: "Oferecemos acompanhamento contínuo, relatórios detalhados e atendimento personalizado para esclarecer dúvidas e otimizar resultados." },
    ],
    finalCta: {
      eyebrow: "Invista na gestão do seu negócio",
      title: "Deixe a burocracia conosco e foque no crescimento do seu negócio",
      text: "Com mais de 40 anos de experiência e soluções personalizadas, cuidamos de tudo para que você possa se concentrar no que realmente importa: atender seus clientes e expandir seus serviços.",
      buttonLabel: "Solicite uma proposta agora mesmo",
    },
  },
};
