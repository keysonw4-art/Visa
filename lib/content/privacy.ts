/** Conteúdo da Política de Privacidade (fiel ao site atual, revisado em 01/06/2022). */

export type PrivacyBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export const privacyUpdatedAt = "Revisada em 01/06/2022.";

export const privacyBlocks: PrivacyBlock[] = [
  { type: "p", text: "Esta Política de Privacidade da Empresa cobre a coleta, uso e divulgação de informações pessoais que podem ser coletadas pela Empresa a qualquer momento que você interagir com a Empresa, como visitar nosso site, adquirir produtos ou serviços, ou entrar em contato com a Empresa. A sua privacidade é uma prioridade da Empresa e não medimos esforços para a proteger." },
  { type: "p", text: "Você reconhece que esta Política de Privacidade faz parte dos nossos Termos de Serviço e, ao acessar ou usar nosso site ou comprar qualquer uma das ofertas associadas, você concorda em obedecer a todos os seus termos e condições. Leia atentamente o seguinte para saber como coletamos informações, incluindo que tipo de informações são coletadas, como essas informações são usadas, a quem divulgamos as informações e como protegemos suas informações pessoais. Se você não concorda com estes termos, por favor, não acesse ou use este site." },
  { type: "p", text: "Nós nos reservamos o direito de alterar esta Política de Privacidade a qualquer momento. Quaisquer alterações, modificações, acréscimos ou exclusões entrarão em vigor imediatamente. Você reconhece e concorda que é sua responsabilidade revisar este site e esta Política periodicamente e estar ciente de quaisquer modificações." },

  { type: "h2", text: "Tipos de informações coletadas" },
  { type: "p", text: "A fim de melhor lhe fornecer nossos diversos serviços, coletamos dois tipos de informações sobre nossos usuários: Informações de identificação pessoal e Informações de identificação não pessoal. Nosso principal objetivo ao coletar informações sobre você é fornecer uma experiência tranquila, eficiente e personalizada." },
  { type: "p", text: "Informação pessoalmente identificável: refere-se a informações que nos permitem saber quem você é, como nome e sobrenome, endereço para correspondência (incluindo código postal), endereço de e-mail e outras informações de identificação pessoal, fornecidas ao preencher e enviar um formulário online. É totalmente opcional se envolver nessas atividades." },
  { type: "p", text: "Informações não pessoalmente identificáveis: refere-se a informações que não identificam por si só um indivíduo específico. Podem incluir a URL do site de onde você chegou, qual URL você acessa em seguida, qual navegador está usando e seu endereço de IP, utilizados de forma agregada." },

  { type: "h2", text: "Método de coleta e uso de informações" },
  { type: "p", text: "Não coletamos nenhuma informação de identificação pessoal sobre você, a menos que você a forneça voluntariamente — por exemplo, ao registrar seu e-mail, enviar mensagens, formulários ou transmitir informações por telefone ou meios eletrônicos." },
  { type: "p", text: "Usaremos principalmente suas informações de identificação pessoal para fornecer nossos serviços, aprimorar a operação do site, melhorar nossos esforços de marketing, analisar estatisticamente o uso do site e personalizar conteúdo e serviços. Implementamos padrões geralmente aceitos de tecnologia e segurança operacional para proteger essas informações contra perda, uso indevido, alteração ou destruição." },

  { type: "h2", text: "Liberação da informação" },
  { type: "p", text: "A Empresa pode divulgar suas Informações de Identificação Pessoal a prestadores de serviços e fornecedores terceirizados para realizar transações que você tenha solicitado ou concluir obrigações contratuais. A Empresa proíbe contratualmente a venda ou transferência dessas informações por tais fornecedores." },
  { type: "p", text: "Ocasionalmente, podemos ser solicitados por autoridades policiais ou judiciais a fornecer informações às autoridades governamentais apropriadas, mediante ordem judicial, intimação ou para cooperar com investigação policial." },
  { type: "p", text: "Os dados pessoais armazenados podem ou não ser transferidos a terceiros que facilitem estratégias de marketing digital, na medida do necessário para a prestação dos serviços. Cada fornecedor terceirizado possui sua própria política de privacidade, cuja leitura recomendamos." },
  { type: "h3", text: "Em caso de transferência de dados para outros países" },
  { type: "p", text: "Fornecedores de serviços podem estar localizados em países diferentes, sujeitando os dados às leis dessas jurisdições. Ao acessar nossos serviços e prover suas informações, você consente com o processamento, transferência e armazenamento dessas informações em outros países." },

  { type: "h2", text: "Segurança da informação" },
  { type: "p", text: "Suas informações de identificação pessoal são protegidas de acordo com os padrões atuais da indústria e residem em servidor seguro ao qual apenas funcionários selecionados e contratados têm acesso por meio de senha." },
  { type: "p", text: "Infelizmente, nenhuma transmissão de dados pela Internet pode ser garantida como 100% segura. Enquanto nos esforçamos para proteger suas informações, você reconhece que existem limitações de segurança e privacidade da Internet que estão além do nosso controle." },

  { type: "h2", text: "Cookies" },
  { type: "p", text: "Quando você usa nosso site, armazenamos cookies em seu computador para facilitar e personalizar sua experiência. Um cookie é um pequeno arquivo de texto que o site armazena no seu dispositivo (se o navegador permitir). Você está sempre livre para recusar nossos cookies, mas algumas partes do site podem não funcionar corretamente nesse caso." },

  { type: "h2", text: "Políticas de privacidade de sites de terceiros" },
  { type: "p", text: "Este documento trata apenas do uso e divulgação de informações que coletamos de você. Outros sites acessíveis através do nosso site têm suas próprias políticas de privacidade. Não somos responsáveis pelas políticas ou práticas de terceiros." },

  { type: "h2", text: "Conformidade com a Lei Geral de Proteção de Dados (LGPD)" },
  { type: "p", text: "Temos o compromisso de proteger seus dados, conforme descrito nesta Política de Privacidade. A LGPD estipula protocolos e práticas rígidas quanto à forma como a coleta de dados e o consentimento dos indivíduos são gerenciados, capacitando você com o controle de como suas informações e consentimento são coletados, registrados e usados." },

  { type: "h2", text: "Atendendo aos princípios da LGPD" },
  { type: "p", text: "A LGPD-BR é sustentada por dez princípios importantes. Esses princípios afirmam que os dados pessoais devem:" },
  {
    type: "ul",
    items: [
      "Ter finalidade específica e informada explicitamente ao titular;",
      "Adequação à finalidade previamente acordada e divulgada;",
      "Necessidade do tratamento, limitado ao uso de dados essenciais para alcançar a finalidade;",
      "Acesso livre, fácil e gratuito das pessoas à forma como seus dados serão tratados;",
      "Qualidade dos dados, deixando-os exatos e atualizados, segundo a real necessidade;",
      "Transparência, com informações claras e acessíveis sobre o tratamento e seus responsáveis;",
      "Segurança para coibir situações acidentais ou ilícitas como invasão, destruição, perda, difusão;",
      "Proteção contra danos ao titular e a demais envolvidos;",
      "Não discriminação, ou seja, não permitir atos ilícitos ou abusivos; e",
      "Responsabilização do agente, obrigado a demonstrar a eficácia das medidas adotadas.",
    ],
  },

  { type: "h2", text: "Por que esta política existe" },
  { type: "p", text: "Esta política de proteção de dados garante que a Empresa:" },
  {
    type: "ul",
    items: [
      "Cumpre as leis de proteção de dados e segue as boas práticas;",
      "Protege os direitos de clientes, funcionários, afiliados e parceiros;",
      "É aberta sobre como armazena e processa dados de indivíduos; e",
      "Protege-se do risco de violação de dados.",
    ],
  },

  { type: "h2", text: "Direitos do titular dos dados" },
  { type: "p", text: "A Empresa promulgou políticas para proteger os direitos dos usuários. Permitimos que nossos clientes optem por não receber notificações e sempre responderemos a solicitações de acesso a dados. A base legal para processamento é o consentimento dos usuários, que pode ser retirado a qualquer momento mediante solicitação formal." },

  { type: "h2", text: "Exclusão de dados" },
  { type: "p", text: "Ao final do seu compromisso com a Empresa, você pode solicitar a exclusão de todos os dados enviados para verificação. Sempre atendemos a essas solicitações." },

  { type: "h2", text: "Notificações de violação de dados" },
  { type: "p", text: "Fazemos o nosso melhor para proteger seus dados. Temos o compromisso de sempre ser totalmente transparentes e notificar a autoridade supervisora e todas as partes afetadas de acordo com os requisitos da LGPD." },
];
