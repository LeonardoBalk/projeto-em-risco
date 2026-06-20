const CONFIG = {
  maxMetric: 100,
  warnThreshold: 60,
  critThreshold: 30,
  toastHideDelay: 1400,
};

const DIFFICULTIES = {
  easy:   { label: 'Fácil',   startMetric: 100, penaltyMult: 1.0,  cardCount: 10, goldThreshold: 75, silverThreshold: 50, maxOpps: 3 },
  medium: { label: 'Médio',   startMetric: 85,  penaltyMult: 1.1,  cardCount: 10, goldThreshold: 58, silverThreshold: 38, maxOpps: 2 },
  hard:   { label: 'Difícil', startMetric: 80,  penaltyMult: 1.15, cardCount: 12, goldThreshold: 48, silverThreshold: 30, maxOpps: 1 },
};

const cards = [
  {
    event: "O desenvolvedor principal pediu demissão no meio do sprint.",
    tag: "alto impacto",
    options: [
      { text: "Contratar substituto externo",  effects: { prazo: -2,  custo: -5,  qualidade: 0   } },
      { text: "Redistribuir tarefas no time",  effects: { prazo: -7,  custo: 0,   qualidade: -5  } },
      { text: "Ignorar e torcer",              effects: { prazo: 0,   custo: -2,  qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "Contratar um substituto mitiga o atraso e preserva a qualidade do projeto. O PMBOK recomenda ter um plano de substituição de recursos previsto antes que a situação aconteça."
  },
  {
    event: "O cliente mudou o escopo completamente na metade do projeto.",
    tag: "alto impacto",
    options: [
      { text: "Aceitar tudo e replanejar",  effects: { prazo: -12, custo: -7, qualidade: 0   } },
      { text: "Negociar escopo reduzido",   effects: { prazo: -2,  custo: -2, qualidade: 0   } },
      { text: "Recusar as mudanças",        effects: { prazo: 0,   custo: 0,  qualidade: -10 } },
    ],
    best: 1, worst: 0,
    tip: "Negociar o escopo alinha as expectativas do cliente à realidade do projeto. O PMBOK orienta que toda mudança de escopo deve passar por um processo formal de controle antes de ser aceita."
  },
  {
    event: "Servidor de produção caiu 2 dias antes da entrega.",
    tag: "alto impacto",
    options: [
      { text: "Contratar cloud emergencial", effects: { prazo: 0,   custo: -6,  qualidade: 0  } },
      { text: "Trabalhar em overtime",       effects: { prazo: -5,  custo: 0,   qualidade: -7 } },
      { text: "Atrasar a entrega",           effects: { prazo: -15, custo: 0,   qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Investir em infraestrutura emergencial protege a entrega e a qualidade percebida pelo cliente. Riscos de infraestrutura devem constar no registro de riscos com resposta planejada."
  },
  {
    event: "Bug crítico encontrado em produção pelo cliente.",
    tag: "alto impacto",
    options: [
      { text: "Hotfix imediato",                     effects: { prazo: -7,  custo: -5, qualidade: 0  } },
      { text: "Patch na próxima versão",             effects: { prazo: 0,   custo: 0,  qualidade: -12} },
      { text: "Comunicar e corrigir com o cliente",  effects: { prazo: -2,  custo: -2, qualidade: 5  } },
    ],
    best: 2, worst: 1,
    tip: "Comunicar o problema e resolver junto com o cliente fortalece a confiança e preserva a qualidade. O PMBOK destaca a gestão de stakeholders como pilar para resolver crises sem desgastar o relacionamento."
  },
  {
    event: "Fornecedor atrasou entrega de licenças essenciais.",
    tag: "médio impacto",
    options: [
      { text: "Buscar fornecedor alternativo", effects: { prazo: 0,   custo: -5,  qualidade: 0  } },
      { text: "Usar alternativa open source",  effects: { prazo: -5,  custo: 0,   qualidade: -7 } },
      { text: "Aguardar o fornecedor",         effects: { prazo: -12, custo: 0,   qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Buscar alternativas rapidamente evita gargalos no cronograma. O PMBOK recomenda incluir fornecedores críticos no plano de riscos e ter substitutos identificados previamente."
  },
  {
    event: "Dois membros sênior da equipe entraram em conflito sério.",
    tag: "médio impacto",
    options: [
      { text: "Mediar o conflito",   effects: { prazo: -2,  custo: 0,   qualidade: 0   } },
      { text: "Demitir um deles",    effects: { prazo: -7,  custo: -10, qualidade: 0   } },
      { text: "Ignorar o conflito",  effects: { prazo: -5,  custo: 0,   qualidade: -10 } },
    ],
    best: 0, worst: 2,
    tip: "Mediar conflitos restabelece a harmonia do time sem perda de talentos. O PMBOK lista a resolução por confronto direto como a técnica mais eficaz para conflitos em equipes de projeto."
  },
  {
    event: "Requisitos mal documentados geraram retrabalho significativo.",
    tag: "médio impacto",
    options: [
      { text: "Parar e redocumentar tudo",           effects: { prazo: -10, custo: -5, qualidade: 0  } },
      { text: "Continuar com o que tem",             effects: { prazo: 0,   custo: 0,  qualidade: -12} },
      { text: "Reunião de alinhamento com cliente",  effects: { prazo: -2,  custo: -2, qualidade: 5  } },
    ],
    best: 2, worst: 1,
    tip: "Alinhar expectativas com o cliente corrige desvios sem desperdiçar esforço com redocumentação total. O PMBOK recomenda validação contínua de requisitos ao longo de todo o projeto."
  },
  {
    event: "Investidor exigiu relatório de progresso urgente.",
    tag: "baixo impacto",
    options: [
      { text: "Preparar relatório completo",    effects: { prazo: -2,  custo: 0, qualidade: 0  } },
      { text: "Entregar relatório superficial", effects: { prazo: 0,   custo: 0, qualidade: -10} },
      { text: "Delegar para o time",            effects: { prazo: -3,  custo: 0, qualidade: -3 } },
    ],
    best: 0, worst: 1,
    tip: "Manter stakeholders bem informados é responsabilidade do gerente. O PMBOK define o plano de comunicações como um dos documentos centrais do projeto, justamente para evitar situações de relatório urgente."
  },
  {
    event: "Cliente solicitou reunião de revisão surpresa para amanhã.",
    tag: "baixo impacto",
    options: [
      { text: "Aceitar e preparar apresentação", effects: { prazo: -2,  custo: 0, qualidade: 0   } },
      { text: "Aceitar sem preparação",          effects: { prazo: 0,   custo: 0, qualidade: -10 } },
      { text: "Remarcar a reunião",              effects: { prazo: -3,  custo: 0, qualidade: -5  } },
    ],
    best: 0, worst: 1,
    tip: "Estar preparado para revisões demonstra profissionalismo e preserva a confiança do cliente. Reuniões de revisão fazem parte do processo de monitoramento e controle do projeto."
  },
  {
    event: "O patrocinador cortou 20% do orçamento faltando 3 semanas para a entrega.",
    tag: "alto impacto",
    options: [
      { text: "Renegociar o escopo formalmente com o cliente",    effects: { prazo: -2,  custo: 0,   qualidade: 0   } },
      { text: "Cortar funcionalidades sem avisar o cliente",      effects: { prazo: 0,   custo: 0,   qualidade: -10 } },
      { text: "Manter o plano e absorver o corte internamente",   effects: { prazo: -5,  custo: -8,  qualidade: -5  } },
    ],
    best: 0, worst: 2,
    tip: "Corte de orçamento exige rebaseline formal do plano de projeto. O PMBOK orienta que qualquer redução de escopo ou budget deve ser negociada e aprovada pelo patrocinador antes de ser implementada."
  },
  {
    event: "A equipe está em horas extras há 3 semanas seguidas e a qualidade das entregas caiu visivelmente.",
    tag: "médio impacto",
    options: [
      { text: "Reduzir a carga e replanejar as entregas",    effects: { prazo: -3,  custo: 0,   qualidade: 0   } },
      { text: "Contratar temporários para cobrir a demanda", effects: { prazo: 0,   custo: -8,  qualidade: -3  } },
      { text: "Ignorar os sinais e manter o ritmo",          effects: { prazo: 0,   custo: 0,   qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "Times sobrecarregados geram mais defeitos e aumentam o risco de turnover. O PMBOK ressalta que o gerente é responsável pelo bem-estar da equipe e que ritmo sustentável é parte da gestão de recursos."
  },
  {
    event: "O cliente quer a entrega final em 2 semanas. A estimativa da equipe é de 5 semanas.",
    tag: "alto impacto",
    options: [
      { text: "Apresentar a estimativa real e negociar o prazo", effects: { prazo: -2,  custo: 0,  qualidade: 0   } },
      { text: "Fazer fast-tracking e cortar escopo sem aviso",   effects: { prazo: 0,   custo: 0,  qualidade: -12 } },
      { text: "Aceitar o prazo e forçar o time",                 effects: { prazo: 0,   custo: 0,  qualidade: -15 } },
    ],
    best: 0, worst: 2,
    tip: "Comprometer prazos inviáveis é uma das principais causas de falha em projetos. O PMBOK orienta comunicar riscos de cronograma com base em dados e negociar antes de qualquer compromisso formal."
  },
  {
    event: "O único desenvolvedor que conhece o módulo de pagamentos vai entrar de férias obrigatórias na semana que vem.",
    tag: "médio impacto",
    options: [
      { text: "Organizar transferência de conhecimento antes das férias", effects: { prazo: -3,  custo: 0,  qualidade: 0   } },
      { text: "Adiar o módulo de pagamentos até o retorno",              effects: { prazo: -8,  custo: 0,  qualidade: 0   } },
      { text: "Deixar sem substituto e continuar normalmente",           effects: { prazo: 0,   custo: 0,  qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "Dependência de pessoas-chave é um risco crítico em projetos. O PMBOK recomenda documentação contínua e knowledge transfer para eliminar gargalos de conhecimento antes que virem problema."
  },
  {
    event: "A equipe entregou uma funcionalidade diferente do que o cliente esperava por falta de alinhamento.",
    tag: "médio impacto",
    options: [
      { text: "Reunião imediata com o cliente para realinhar e replanejar", effects: { prazo: -3,  custo: -3,  qualidade: 0   } },
      { text: "Corrigir silenciosamente sem informar o cliente",            effects: { prazo: -5,  custo: 0,   qualidade: -5  } },
      { text: "Tentar convencer o cliente de que a entrega está correta",   effects: { prazo: 0,   custo: 0,   qualidade: -15 } },
    ],
    best: 0, worst: 2,
    tip: "Falhas de comunicação devem ser tratadas com transparência. O PMBOK enfatiza a gestão proativa de expectativas e a documentação formal de requisitos como principal forma de prevenção desse tipo de problema."
  },
  {
    event: "Uma auditoria interna identificou que os critérios de aceitação não estão documentados para 60% das entregas.",
    tag: "médio impacto",
    options: [
      { text: "Pausar novas entregas e documentar os critérios pendentes",  effects: { prazo: -3,  custo: 0,  qualidade: 0   } },
      { text: "Documentar apenas as próximas entregas e ignorar o passado", effects: { prazo: 0,   custo: 0,  qualidade: -5  } },
      { text: "Ignorar a auditoria e manter o ritmo atual",                 effects: { prazo: 0,   custo: 0,  qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "Critérios de aceitação documentados são essenciais para o controle de qualidade. O PMBOK orienta que todos os entregáveis tenham critérios claros definidos antes do início da execução, não depois."
  },
  {
    event: "A equipe começou a implementar uma mudança solicitada pelo cliente sem abrir uma solicitação formal de mudança.",
    tag: "médio impacto",
    options: [
      { text: "Paralisar e abrir a solicitação formal de mudança",  effects: { prazo: -2, custo: 0, qualidade: 0   } },
      { text: "Deixar continuar e registrar depois",                effects: { prazo: 0,  custo: 0, qualidade: -5  } },
      { text: "Deixar continuar sem registrar nada",               effects: { prazo: 0,  custo: 0, qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "O controle integrado de mudanças exige que toda alteração seja avaliada e aprovada antes de implementada. O PMBOK define esse processo como central para manter a integridade do plano de projeto."
  },
  {
    event: "O cliente pede uma estimativa de esforço para o projeto em 24 horas, mas a equipe precisa de uma semana para levantar os requisitos corretamente.",
    tag: "médio impacto",
    options: [
      { text: "Pedir o prazo necessário e fazer uma estimativa fundamentada", effects: { prazo: -2, custo: 0,  qualidade: 0  } },
      { text: "Entregar uma estimativa preliminar com ressalvas claras",      effects: { prazo: 0,  custo: 0,  qualidade: -5 } },
      { text: "Dar um número rápido sem análise para não perder o cliente",   effects: { prazo: -8, custo: -8, qualidade: -5 } },
    ],
    best: 0, worst: 2,
    tip: "Estimativas precipitadas comprometem todo o planejamento do projeto. O PMBOK recomenda técnicas estruturadas como analogia, parametrização ou bottom-up, sempre com tempo adequado para análise dos requisitos."
  },
  {
    event: "Um desenvolvedor está adicionando funcionalidades extras não solicitadas pelo cliente, achando que vai surpreendê-lo positivamente.",
    tag: "médio impacto",
    options: [
      { text: "Conversar com o dev e redirecionar o esforço para o escopo acordado", effects: { prazo: -2, custo: 0,  qualidade: 0   } },
      { text: "Deixar concluir mas não incluir nas próximas entregas",               effects: { prazo: 0,  custo: 0,  qualidade: -5  } },
      { text: "Incluir tudo e apresentar ao cliente como bônus",                     effects: { prazo: -5, custo: -5, qualidade: -5  } },
    ],
    best: 0, worst: 2,
    tip: "Adicionar funcionalidades não solicitadas, mesmo com boa intenção, é chamado de gold plating e é uma má prática segundo o PMBOK. Aumenta custo e prazo sem aprovação formal do cliente."
  },
  {
    event: "Pequenas mudanças foram aceitas informalmente ao longo do projeto e o escopo está 40% maior do que o planejado.",
    tag: "alto impacto",
    options: [
      { text: "Fazer uma reunião formal para revisar e rebaseline o escopo com o cliente", effects: { prazo: -3, custo: 0,  qualidade: 0   } },
      { text: "Continuar absorvendo as mudanças e compensar com horas extras",            effects: { prazo: 0,  custo: 0,  qualidade: -8  } },
      { text: "Ignorar o crescimento e entregar o que der",                               effects: { prazo: -5, custo: 0,  qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "Scope creep é um dos principais vilões de projetos. O PMBOK recomenda controle rigoroso de mudanças e rebaseline formal sempre que o escopo for alterado de forma significativa."
  },
  {
    event: "Uma tarefa no caminho crítico do projeto atrasou 3 dias por um problema técnico inesperado.",
    tag: "alto impacto",
    options: [
      { text: "Aplicar fast-tracking ou crashing nas tarefas seguintes para recuperar", effects: { prazo: -2, custo: -5, qualidade: 0  } },
      { text: "Replanejar o cronograma aceitando o atraso",                             effects: { prazo: -5, custo: 0,  qualidade: 0  } },
      { text: "Ignorar e esperar que as próximas tarefas compensem",                    effects: { prazo: -8, custo: 0,  qualidade: -5 } },
    ],
    best: 0, worst: 2,
    tip: "Qualquer atraso no caminho crítico afeta diretamente a data de entrega. O PMBOK recomenda fast-tracking e crashing como técnicas de compressão de cronograma, cada uma com seus trade-offs de custo e risco."
  },
  {
    event: "Os riscos materializados ao longo do projeto já consumiram toda a reserva de contingência do orçamento.",
    tag: "alto impacto",
    options: [
      { text: "Solicitar reserva de gerenciamento ao patrocinador com justificativa formal", effects: { prazo: -2, custo: 0,   qualidade: 0  } },
      { text: "Cortar custos em áreas não críticas para compensar",                         effects: { prazo: 0,  custo: 0,   qualidade: -8 } },
      { text: "Continuar gastando e lidar com o estouro depois",                            effects: { prazo: 0,  custo: -10, qualidade: -5 } },
    ],
    best: 0, worst: 2,
    tip: "Reservas de contingência existem para riscos materializados. Quando se esgotam, o correto é acionar a reserva de gerenciamento com aprovação do patrocinador, não cortar qualidade silenciosamente."
  },
  {
    event: "Para cumprir o prazo, a equipe pulou os testes unitários nas últimas sprints e regressões começaram a aparecer.",
    tag: "médio impacto",
    options: [
      { text: "Pausar novas entregas e cobrir os casos de teste pendentes", effects: { prazo: -3, custo: 0, qualidade: 0   } },
      { text: "Testar apenas as funcionalidades mais críticas",             effects: { prazo: -2, custo: 0, qualidade: -5  } },
      { text: "Continuar sem testar e corrigir os bugs em produção",        effects: { prazo: 0,  custo: 0, qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "Comprometer testes para ganhar prazo cria dívida de qualidade que se paga com juros. O PMBOK define critérios de qualidade como não negociáveis e recomenda que sejam planejados desde o início do projeto."
  },
  {
    event: "O código acumulou tanta dívida técnica que qualquer nova funcionalidade quebra partes que já funcionavam.",
    tag: "médio impacto",
    options: [
      { text: "Reservar uma sprint para refatoração antes de continuar",   effects: { prazo: -5, custo: 0, qualidade: 0   } },
      { text: "Continuar adicionando funcionalidades com mais cuidado",    effects: { prazo: 0,  custo: 0, qualidade: -7  } },
      { text: "Ignorar e entregar o que foi pedido",                       effects: { prazo: 0,  custo: 0, qualidade: -15 } },
    ],
    best: 0, worst: 2,
    tip: "Dívida técnica não gerenciada compromete a qualidade e a manutenibilidade do produto. O PMBOK recomenda incluir qualidade técnica nos critérios de aceitação desde o início para evitar esse acúmulo."
  },
  {
    event: "Uma parte interessada importante parou de responder e-mails há 2 semanas e há decisões pendentes que dependem dela.",
    tag: "médio impacto",
    options: [
      { text: "Escalar para o patrocinador e buscar um canal alternativo de contato", effects: { prazo: -2,  custo: 0, qualidade: 0  } },
      { text: "Tomar as decisões pendentes por conta e informar depois",               effects: { prazo: 0,   custo: 0, qualidade: -8 } },
      { text: "Aguardar indefinidamente sem tomar nenhuma ação",                       effects: { prazo: -10, custo: 0, qualidade: -5 } },
    ],
    best: 0, worst: 2,
    tip: "Stakeholders inacessíveis são um risco de comunicação. O PMBOK recomenda definir planos de engajamento com canais alternativos e prazos de resposta antes que o problema aconteça."
  },
  {
    event: "Dois patrocinadores do projeto têm visões opostas sobre a direção do produto e estão pedindo mudanças contraditórias.",
    tag: "alto impacto",
    options: [
      { text: "Convocar uma reunião entre os dois para alinhar e definir uma direção única", effects: { prazo: -3, custo: 0,  qualidade: 0   } },
      { text: "Implementar a visão do patrocinador hierarquicamente superior",              effects: { prazo: 0,  custo: 0,  qualidade: -7  } },
      { text: "Tentar implementar as duas visões ao mesmo tempo",                           effects: { prazo: -5, custo: -5, qualidade: -10 } },
    ],
    best: 0, worst: 2,
    tip: "Conflitos entre stakeholders devem ser mediados pelo gerente antes de impactar a equipe. O PMBOK define o engajamento ativo de partes interessadas como responsabilidade direta do gerente de projetos."
  },
  {
    event: "O contrato com o fornecedor principal tem cláusulas ambíguas que cada lado está interpretando de forma diferente.",
    tag: "médio impacto",
    options: [
      { text: "Negociar um aditivo contratual que esclareça as cláusulas antes que o problema escale", effects: { prazo: -2, custo: -3, qualidade: 0  } },
      { text: "Seguir a interpretação mais favorável ao projeto e documentar a decisão",               effects: { prazo: 0,  custo: 0,  qualidade: -7 } },
      { text: "Ignorar a ambiguidade e continuar",                                                     effects: { prazo: -5, custo: -8, qualidade: -5 } },
    ],
    best: 0, worst: 2,
    tip: "Ambiguidade contratual é um risco de aquisições que o PMBOK recomenda tratar na fase de planejamento. Quando identificada tarde, a solução é um aditivo formal antes que vire litígio."
  },
  {
    event: "Um novo desenvolvedor entrou no projeto mas não há documentação de arquitetura nem processo de onboarding definido.",
    tag: "baixo impacto",
    options: [
      { text: "Pausar o novo membro por 2 dias para criar uma documentação mínima",     effects: { prazo: -2, custo: 0, qualidade: 0   } },
      { text: "Designar um sênior para acompanhar o novo membro em par",                effects: { prazo: -3, custo: 0, qualidade: -3  } },
      { text: "Jogar o novo membro direto nas tarefas sem suporte",                     effects: { prazo: 0,  custo: 0, qualidade: -10 } },
    ],
    best: 0, worst: 2,
    tip: "A falta de documentação compromete a integração de novos membros e gera erros. O PMBOK recomenda manter processos de onboarding e documentação contínua como parte do plano de gerenciamento de recursos."
  },
  {
    event: "A equipe descobriu que o plano de projeto não reflete mais o estado atual do trabalho. Está 3 semanas desatualizado.",
    tag: "baixo impacto",
    options: [
      { text: "Atualizar o plano imediatamente e comunicar os stakeholders",      effects: { prazo: -2, custo: 0, qualidade: 0   } },
      { text: "Atualizar só as partes críticas e deixar o resto para depois",     effects: { prazo: 0,  custo: 0, qualidade: -5  } },
      { text: "Continuar trabalhando sem atualizar o plano",                      effects: { prazo: 0,  custo: 0, qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "O plano de projeto é um documento vivo. O PMBOK define o monitoramento e controle contínuo como responsabilidade central do gerente, incluindo manter o plano atualizado com o estado real do projeto."
  },
  {
    event: "Um problema grave que não estava no registro de riscos acaba de acontecer e a equipe não tem plano de resposta pronto.",
    tag: "alto impacto",
    options: [
      { text: "Acionar um workaround e atualizar o registro de riscos imediatamente", effects: { prazo: -3, custo: -3, qualidade: 0  } },
      { text: "Improvisar uma solução e registrar o ocorrido depois",                 effects: { prazo: -5, custo: 0,  qualidade: -5 } },
      { text: "Resolver pontualmente sem documentar nada",                            effects: { prazo: 0,  custo: 0,  qualidade: -12} },
    ],
    best: 0, worst: 2,
    tip: "Nenhum registro de riscos consegue prever tudo. O PMBOK prevê reservas de contingência e workarounds para riscos residuais. Documentar após o ocorrido é obrigatório para o aprendizado organizacional."
  },
  {
    event: "Uma entrega crítica depende de aprovação de outro departamento da empresa que não respondeu em 5 dias úteis.",
    tag: "médio impacto",
    options: [
      { text: "Escalar para o patrocinador e estabelecer um prazo formal de resposta",    effects: { prazo: -2,  custo: 0, qualidade: 0  } },
      { text: "Começar o trabalho seguinte em paralelo assumindo que a aprovação virá",   effects: { prazo: 0,   custo: 0, qualidade: -7 } },
      { text: "Aguardar sem pressionar",                                                  effects: { prazo: -10, custo: 0, qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Dependências externas devem ser mapeadas no cronograma com pontos de escalada definidos. O PMBOK recomenda identificar e comunicar dependências críticas desde o planejamento para evitar gargalos."
  },
  {
    type: 'opportunity',
    event: "Um desenvolvedor freelancer experiente se ofereceu para ajudar o projeto por um valor abaixo do mercado.",
    tag: "oportunidade",
    options: [
      { text: "Contratar imediatamente", effects: { prazo: 0,  custo: -5, qualidade: 20 } },
      { text: "Negociar o valor antes",  effects: { prazo: -2, custo: -2, qualidade: 15 } },
      { text: "Ignorar a oferta",        effects: { prazo: 0,  custo: 0,  qualidade: 0  } },
    ],
    best: 1, worst: 2,
    tip: "Negociar termos e taxas antes da contratação assegura o controle de custos sem comprometer a qualidade esperada."
  },
  {
    type: 'opportunity',
    event: "A empresa recebeu um crédito inesperado de um fornecedor parceiro.",
    tag: "oportunidade",
    options: [
      { text: "Investir em qualidade técnica",   effects: { prazo: 0, custo: 15, qualidade: 10 } },
      { text: "Guardar como reserva financeira", effects: { prazo: 0, custo: 20, qualidade: 0  } },
      { text: "Ignorar e manter o plano atual",  effects: { prazo: 0, custo: 0,  qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Reinvestir recursos extras na qualidade técnica reduz o endividamento técnico e custos futuros de manutenção."
  },
  {
    type: 'opportunity',
    event: "A equipe terminou uma entrega importante antes do prazo previsto.",
    tag: "oportunidade",
    options: [
      { text: "Usar o tempo extra para revisar qualidade", effects: { prazo: 15, custo: 0, qualidade: 20 } },
      { text: "Antecipar a próxima entrega",              effects: { prazo: 20, custo: 0, qualidade: 0  } },
      { text: "Deixar o time descansar",                  effects: { prazo: 5,  custo: 0, qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Aproveitar folgas de cronograma para refinar o produto eleva o valor entregue e previne falhas futuras."
  },
  {
    type: 'opportunity',
    event: "A equipe descobriu uma ferramenta gratuita que pode automatizar boa parte dos testes manuais.",
    tag: "oportunidade",
    options: [
      { text: "Avaliar e adotar com um período de adaptação planejado", effects: { prazo: 5,  custo: 5,  qualidade: 10 } },
      { text: "Adotar imediatamente sem treinamento",                   effects: { prazo: 10, custo: 5,  qualidade: 0  } },
      { text: "Ignorar e continuar com o processo atual",               effects: { prazo: 0,  custo: 0,  qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Novas ferramentas trazem benefícios reais mas exigem tempo de adaptação. O PMBOK orienta que mudanças de processo sejam planejadas para não impactar entregas em andamento."
  },
  {
    type: 'opportunity',
    event: "O cliente aprovou o protótipo uma semana antes do prazo e quer avançar para a próxima fase.",
    tag: "oportunidade",
    options: [
      { text: "Usar a semana para revisar qualidade e refinar a documentação", effects: { prazo: 10, custo: 0,  qualidade: 15 } },
      { text: "Avançar imediatamente para a próxima fase",                     effects: { prazo: 15, custo: 0,  qualidade: 0  } },
      { text: "Usar o tempo para adicionar funcionalidades não planejadas",     effects: { prazo: 0,  custo: -5, qualidade: -5 } },
    ],
    best: 0, worst: 2,
    tip: "Aprovação antecipada é uma oportunidade de ganhar tempo de qualidade. O PMBOK orienta usar folgas de cronograma para agregar valor, nunca para introduzir escopo não aprovado."
  },
  {
    type: 'opportunity',
    event: "O cliente ofereceu custear um treinamento técnico para a equipe em uma tecnologia crítica do projeto.",
    tag: "oportunidade",
    options: [
      { text: "Aceitar e planejar o treinamento nos momentos de menor carga", effects: { prazo: 5,  custo: 10, qualidade: 10 } },
      { text: "Aceitar mas fazer imediatamente, interrompendo tarefas",        effects: { prazo: -3, custo: 10, qualidade: 5  } },
      { text: "Recusar para não perder tempo",                                 effects: { prazo: 0,  custo: 0,  qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Capacitar a equipe durante o projeto reduz retrabalho e eleva a qualidade das entregas. O PMBOK inclui o desenvolvimento da equipe como parte essencial da gestão de recursos."
  },
  {
    type: 'opportunity',
    event: "Uma empresa parceira se ofereceu para dividir o custo de desenvolvimento de um módulo comum aos dois projetos.",
    tag: "oportunidade",
    options: [
      { text: "Aceitar com um contrato formal definindo responsabilidades e entregas", effects: { prazo: 5,  custo: 15, qualidade: 5  } },
      { text: "Aceitar sem formalizar para agilizar",                                  effects: { prazo: 10, custo: 15, qualidade: -5 } },
      { text: "Recusar para não depender de terceiros",                                effects: { prazo: 0,  custo: 0,  qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Parcerias estratégicas podem reduzir custos significativamente, mas exigem contratos claros. O PMBOK destaca que acordos informais em aquisições são fonte frequente de conflitos futuros."
  },
  {
    type: 'opportunity',
    event: "Uma revisão de código identificou que um módulo complexo pode ser simplificado, reduzindo esforço de manutenção.",
    tag: "oportunidade",
    options: [
      { text: "Refatorar o módulo enquanto ainda há tempo no sprint", effects: { prazo: 5, custo: 0, qualidade: 20 } },
      { text: "Documentar e deixar a refatoração para depois",        effects: { prazo: 0, custo: 0, qualidade: 5  } },
      { text: "Ignorar e seguir com o código atual",                  effects: { prazo: 0, custo: 0, qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Aproveitar oportunidades de melhoria técnica reduz dívida técnica e custos futuros. O PMBOK orienta incorporar melhorias de qualidade sempre que não comprometam o cronograma planejado."
  },
];

let pendingTimeout = null;

function loadDifficulty() {
  return localStorage.getItem('difficulty') || 'easy';
}

function saveDifficulty(diff) {
  localStorage.setItem('difficulty', diff);
  updateMenuDiffChip();
  updateDiffScreen();
}

function updateMenuDiffChip() {
  const diff = loadDifficulty();
  const labels = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  document.getElementById('diff-chip-dot').className = `diff-chip-dot ${diff}`;
  document.getElementById('diff-chip-label').textContent = labels[diff];
}

function updateDiffScreen() {
  const diff = loadDifficulty();
  document.querySelectorAll('.diff-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.diff === diff);
  });
}

function buildDeck(difficulty) {
  const diff = DIFFICULTIES[difficulty];
  const risks = shuffle(cards.filter(c => c.type !== 'opportunity'));
  const opps  = shuffle(cards.filter(c => c.type === 'opportunity')).slice(0, diff.maxOpps);
  const rest  = shuffle([...risks.slice(2), ...opps]);
  return [...risks.slice(0, 2), ...rest].slice(0, diff.cardCount);
}

let state = {
  metrics: { prazo: 100, custo: 100, qualidade: 100 },
  currentCardIndex: 0,
  deck: [],
  streak: 0,
  difficulty: 'easy',
  decisions: [],
};

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
  document.querySelector('.app-container').scrollTop = 0;
  window.scrollTo(0, 0);
}

function getMetricColorClass(value) {
  if (value < CONFIG.critThreshold)  return 'fill-low';
  if (value <= CONFIG.warnThreshold) return 'fill-mid';
  return 'fill-high';
}

function getMetricColor(colorClass) {
  if (colorClass === 'fill-low') return 'var(--red)';
  if (colorClass === 'fill-mid') return 'var(--amber)';
  return 'var(--purple-light)';
}

function renderMetricEl(el, value) {
  const colorClass = getMetricColorClass(value);
  el.querySelector('.metric-value').textContent = value;
  el.querySelector('.metric-value').style.color = getMetricColor(colorClass);
  const fill = el.querySelector('.progress-bar-fill');
  fill.className = `progress-bar-fill ${colorClass}`;
  fill.style.width = `${value}%`;
}

function updateHeaderMetrics() {
  ['prazo', 'custo', 'qualidade'].forEach(m => {
    renderMetricEl(document.getElementById(`game-metric-${m}`), state.metrics[m]);
  });
}

function renderMetricBar(container, name, value) {
  const colorClass = getMetricColorClass(value);
  container.insertAdjacentHTML('beforeend', `
    <div class="metric-item">
      <div class="metric-meta">
        <span class="label-text">${name}</span>
        <span class="metric-value" style="color:${getMetricColor(colorClass)};font-size:14px">${value}</span>
      </div>
      <div class="progress-bar-track" style="height:6px">
        <div class="progress-bar-fill ${colorClass}" style="width:${value}%"></div>
      </div>
    </div>
  `);
}

function formatEffects(effects) {
  const parts = [];
  for (const [metric, val] of Object.entries(effects)) {
    if (val !== 0) {
      const name = metric.charAt(0).toUpperCase() + metric.slice(1);
      parts.push(`${name} ${val > 0 ? '+' : '−'}${Math.abs(val)}`);
    }
  }
  return parts.length > 0 ? parts.join(', ') : 'Sem consequências';
}

function startNewGame(difficulty = loadDifficulty()) {
  if (pendingTimeout) { clearTimeout(pendingTimeout); pendingTimeout = null; }
  const diff = DIFFICULTIES[difficulty];
  state.difficulty = difficulty;
  state.metrics = { prazo: diff.startMetric, custo: diff.startMetric, qualidade: diff.startMetric };
  state.currentCardIndex = 0;
  state.deck = buildDeck(difficulty);
  state.streak = 0;
  state.decisions = [];
  updateHeaderMetrics();
  renderCurrentCard();
  showScreen('screen-game');
}

function renderCurrentCard() {
  const card = state.deck[state.currentCardIndex];
  if (!card) return;

  document.getElementById('streak-pill').classList.add('hidden');

  const tipEl = document.getElementById('educational-tip');
  if (tipEl) tipEl.classList.remove('show');
  const btnContinue = document.getElementById('btn-continue');
  if (btnContinue) {
    btnContinue.classList.add('hidden');
    btnContinue.classList.remove('show');
    btnContinue.onclick = null;
  }

  document.getElementById('event-counter').textContent = `Evento ${state.currentCardIndex + 1}/${state.deck.length}`;

  const eventCard = document.querySelector('.event-card');
  eventCard.classList.toggle('card-opportunity', card.type === 'opportunity');

  const tagEl = document.getElementById('event-tag');
  tagEl.textContent = card.tag;
  tagEl.className = 'badge-impact';
  if (card.tag.includes('alto'))               tagEl.classList.add('alto');
  else if (card.tag.includes('médio'))         tagEl.classList.add('medio');
  else if (card.tag.includes('oportunidade'))  tagEl.classList.add('oportunidade');
  else                                         tagEl.classList.add('baixo');

  const eventTitleEl = document.getElementById('event-title');
  eventTitleEl.textContent = card.type === 'opportunity' ? `💡 ${card.event}` : card.event;
  if (card.type === 'opportunity') parseEmojis(eventTitleEl);

  document.querySelectorAll('.option-btn').forEach((btn, idx) => {
    btn.disabled = false;
    btn.className = 'option-btn';
    btn.querySelector('.option-text').textContent = card.options[idx].text;
    const effectsEl = btn.querySelector('.option-effects');
    effectsEl.textContent = formatEffects(card.options[idx].effects);
    effectsEl.style.display = 'none';
  });
}

function flashStreak(count) {
  const pill = document.getElementById('streak-pill');
  pill.classList.add('hidden');
  pill.classList.remove('leaving');
  void pill.offsetWidth;
  document.getElementById('streak-count').textContent = `🔥 ×${count}`;
  document.getElementById('streak-count').style.color = '';
  document.getElementById('streak-label').style.color = '';
  document.getElementById('streak-label').textContent = 'em sequência!';
  pill.style.borderBottom = '';
  pill.style.backgroundColor = '';
  pill.classList.remove('hidden');
  parseEmojis(pill);
  sounds.streak();
  setTimeout(() => {
    pill.classList.add('leaving');
    setTimeout(() => { pill.classList.add('hidden'); pill.classList.remove('leaving'); }, 350);
  }, 1200);
}

function flashStreakBreak() {
  const pill = document.getElementById('streak-pill');
  pill.classList.add('hidden');
  pill.classList.remove('leaving');
  void pill.offsetWidth;
  document.getElementById('streak-count').textContent = '💔';
  document.getElementById('streak-count').style.color = 'var(--red)';
  document.getElementById('streak-label').style.color = 'var(--red)';
  document.getElementById('streak-label').textContent = 'sequência perdida';
  pill.style.backgroundColor = '#FFDFE0';
  pill.style.borderBottom = '4px solid var(--red-glow)';
  pill.classList.remove('hidden');
  parseEmojis(pill);
  sounds.streakBreak();
  setTimeout(() => {
    pill.classList.add('leaving');
    setTimeout(() => { pill.classList.add('hidden'); pill.classList.remove('leaving'); }, 350);
  }, 1200);
}

function selectOption(chosenIndex) {
  const card = state.deck[state.currentCardIndex];
  const diff = DIFFICULTIES[state.difficulty];

  document.querySelectorAll('.option-btn').forEach((btn, idx) => {
    btn.disabled = true;
    btn.classList.add(idx === chosenIndex ? 'selected' : 'dimmed');
    btn.querySelector('.option-effects').style.display = 'block';
  });

  const chosenOption = card.options[chosenIndex];

  for (const [metric, value] of Object.entries(chosenOption.effects)) {
    const adjusted = value < 0 ? Math.round(value * diff.penaltyMult) : value;
    state.metrics[metric] = Math.max(0, Math.min(CONFIG.maxMetric, state.metrics[metric] + adjusted));
  }

  updateHeaderMetrics();

  let quality = 'mid';
  if (chosenIndex === card.best)  quality = 'best';
  if (chosenIndex === card.worst) quality = 'worst';

  if (card.type === 'opportunity') {
    if (quality === 'best')        sounds.oppBest();
    else if (quality === 'mid')    sounds.oppMid();
    else                           sounds.oppNone();
  } else {
    if (quality === 'best')        sounds.best();
    else if (quality === 'mid')    sounds.mid();
    else                           sounds.worst();
  }

  const streakWasActive = state.streak > 0;
  if (quality === 'best') state.streak++;
  else                    state.streak = 0;

  if (quality === 'best')        flashStreak(state.streak);
  else if (streakWasActive)      flashStreakBreak();

  const tipEl = document.getElementById('educational-tip');
  if (tipEl) {
    document.getElementById('tip-text').textContent = card.tip;
    tipEl.classList.add('show');
  }

  state.decisions.push({ card, chosenOption, quality });
  showToast(quality, card.type === 'opportunity');

  pendingTimeout = setTimeout(() => {
    pendingTimeout = null;
    hideToast();
    const btnContinue = document.getElementById('btn-continue');
    btnContinue.classList.remove('hidden');
    btnContinue.classList.add('show');
    btnContinue.onclick = () => {
      prepareTransitionScreen(chosenOption.effects);
      showScreen('screen-transition');
    };
  }, CONFIG.toastHideDelay);
}

function showToast(quality, isOpportunity) {
  const toast = document.getElementById('toast');
  toast.className = 'toast show';

  if (isOpportunity) {
    if (quality === 'best')     { toast.classList.add('toast-opp-best');  toast.textContent = '💡 Boa oportunidade aproveitada!'; }
    else if (quality === 'mid') { toast.classList.add('toast-opp-mid');   toast.textContent = '~ Aproveitou pela metade'; }
    else                        { toast.classList.add('toast-opp-none');  toast.textContent = '○ Oportunidade ignorada'; }
  } else {
    if (quality === 'best')     { toast.classList.add('toast-best');   toast.textContent = '✓ Boa escolha!'; }
    else if (quality === 'mid') { toast.classList.add('toast-mid');    toast.textContent = '~ Pode melhorar'; }
    else                        { toast.classList.add('toast-worst');  toast.textContent = '✗ Cuidado!'; }
  }

  parseEmojis(toast);
}

function hideToast() {
  document.getElementById('toast').classList.remove('show');
}

function prepareTransitionScreen(effects) {
  document.getElementById('transition-round-indicator').textContent =
    `Rodada ${state.currentCardIndex + 1} de ${state.deck.length}`;

  const container = document.getElementById('impact-lines-container');
  container.innerHTML = '';

  const labels = { prazo: 'Prazo', custo: 'Custo', qualidade: 'Qualidade' };
  for (const [key, val] of Object.entries(effects)) {
    const classType = val < 0 ? 'negative' : val > 0 ? 'positive' : 'zero';
    const valText   = val < 0 ? `−${Math.abs(val)}` : val > 0 ? `+${val}` : 'sem impacto';
    container.insertAdjacentHTML('beforeend', `
      <div class="impact-line ${classType}">
        <span>${labels[key]}</span>
        <span>${valText}</span>
      </div>
    `);
  }

  ['prazo', 'custo', 'qualidade'].forEach(m => {
    renderMetricEl(document.getElementById(`transition-metric-${m}`), state.metrics[m]);
  });
}

function handleNextCard() {
  const { prazo, custo, qualidade } = state.metrics;
  if (prazo <= 0 || custo <= 0 || qualidade <= 0) {
    showGameOver();
  } else if (state.currentCardIndex >= state.deck.length - 1) {
    showResults();
  } else {
    state.currentCardIndex++;
    renderCurrentCard();
    showScreen('screen-game');
  }
}

function showGameOver() {
  sounds.gameOver();
  const { prazo, custo } = state.metrics;
  document.getElementById('gameover-subtitle').textContent = prazo <= 0
    ? 'O prazo chegou a zero. O cliente abandonou o projeto.'
    : custo <= 0
    ? 'O orçamento acabou. A empresa cancelou o contrato.'
    : 'A qualidade colapsou. O produto foi rejeitado.';

  const last = state.decisions[state.decisions.length - 1];
  if (last) {
    document.getElementById('gameover-event-title').textContent   = last.card.event;
    document.getElementById('gameover-chosen-option').textContent = last.chosenOption.text;
  }

  const container = document.querySelector('#screen-gameover .final-metrics-container');
  container.innerHTML = '';
  renderMetricBar(container, 'Prazo',     state.metrics.prazo);
  renderMetricBar(container, 'Custo',     state.metrics.custo);
  renderMetricBar(container, 'Qualidade', state.metrics.qualidade);

  showScreen('screen-gameover');
}

function showResults() {
  const values = [state.metrics.prazo, state.metrics.custo, state.metrics.qualidade];
  const diff = DIFFICULTIES[state.difficulty];

  let emoji = '🥉', grade = 'Bronze', gradeClass = 'grade-bronze';
  let feedback = 'O projeto sobreviveu, mas por pouco. Reveja suas estratégias de resposta a riscos.';

  if (values.every(v => v >= diff.goldThreshold)) {
    emoji = '🥇'; grade = 'Ouro'; gradeClass = 'grade-ouro';
    feedback = 'Excelente gerência! O projeto foi entregue dentro do prazo, orçamento e com alta qualidade.';
  } else if (values.every(v => v >= diff.silverThreshold)) {
    emoji = '🥈'; grade = 'Prata'; gradeClass = 'grade-prata';
    feedback = 'Boa gerência, mas algumas decisões comprometeram o projeto. Há espaço para melhorar.';
  }

  if (gradeClass === 'grade-ouro')        sounds.gold();
  else if (gradeClass === 'grade-prata')  sounds.silver();
  else                                    sounds.bronze();

  const gradeEmojiEl = document.getElementById('results-grade-emoji');
  gradeEmojiEl.textContent = emoji;
  parseEmojis(gradeEmojiEl);

  const gradeEl = document.getElementById('results-grade-name');
  gradeEl.textContent = grade;
  gradeEl.className = `grade-name ${gradeClass}`;

  document.getElementById('results-feedback').textContent = feedback;

  const containerMetrics = document.querySelector('#screen-results .final-metrics-container');
  containerMetrics.innerHTML = '';
  renderMetricBar(containerMetrics, 'Prazo',     state.metrics.prazo);
  renderMetricBar(containerMetrics, 'Custo',     state.metrics.custo);
  renderMetricBar(containerMetrics, 'Qualidade', state.metrics.qualidade);

  const countBest  = state.decisions.filter(d => d.quality === 'best').length;
  const countMid   = state.decisions.filter(d => d.quality === 'mid').length;
  const countWorst = state.decisions.filter(d => d.quality === 'worst').length;

  document.getElementById('stat-best-count').textContent  = `✓ ${countBest}`;
  document.getElementById('stat-mid-count').textContent   = `~ ${countMid}`;
  document.getElementById('stat-worst-count').textContent = `✗ ${countWorst}`;
  document.getElementById('stat-opp-count').textContent   =
    state.decisions.filter(d => d.card.type === 'opportunity' && d.quality !== 'worst').length;

  let worstDecision = null, worstSum = 0;
  state.decisions.forEach(d => {
    const neg = Object.values(d.chosenOption.effects).filter(v => v < 0).reduce((a, b) => a + b, 0);
    if (worstDecision === null || neg < worstSum) { worstSum = neg; worstDecision = d; }
  });

  const worstCard = document.getElementById('results-worst-card');
  if (worstDecision && worstSum < 0) {
    worstCard.style.display = 'block';
    document.getElementById('results-worst-title').textContent  = worstDecision.card.event;
    document.getElementById('results-worst-impact').textContent = `−${Math.abs(worstSum)} pontos totais`;
  } else {
    worstCard.style.display = 'none';
  }

  showScreen('screen-results');
}

document.getElementById('btn-menu-start').addEventListener('click',      () => startNewGame());
document.getElementById('btn-menu-difficulty').addEventListener('click', () => showScreen('screen-difficulty'));
document.getElementById('btn-menu-tutorial').addEventListener('click',   () => showScreen('screen-tutorial'));

document.getElementById('btn-diff-back').addEventListener('click', () => showScreen('screen-menu'));
document.querySelectorAll('.diff-option').forEach(btn => {
  btn.addEventListener('click', () => { saveDifficulty(btn.dataset.diff); });
});

document.getElementById('btn-tutorial-back').addEventListener('click',  () => showScreen('screen-menu'));
document.getElementById('btn-tutorial-start').addEventListener('click', () => startNewGame());

document.getElementById('btn-quit').addEventListener('click', () => {
  document.getElementById('quit-modal').classList.add('active');
});
document.getElementById('btn-modal-cancel').addEventListener('click', () => {
  document.getElementById('quit-modal').classList.remove('active');
});
document.getElementById('btn-modal-confirm').addEventListener('click', () => {
  if (pendingTimeout) { clearTimeout(pendingTimeout); pendingTimeout = null; }
  hideToast();
  const diff = DIFFICULTIES[loadDifficulty()];
  state.metrics = { prazo: diff.startMetric, custo: diff.startMetric, qualidade: diff.startMetric };
  state.currentCardIndex = 0;
  state.deck = [];
  state.streak = 0;
  state.decisions = [];
  document.getElementById('quit-modal').classList.remove('active');
  showScreen('screen-menu');
});

document.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', () => selectOption(parseInt(btn.dataset.index)));
});

document.getElementById('btn-next-card').addEventListener('click', handleNextCard);

document.getElementById('btn-gameover-retry').addEventListener('click', () => startNewGame());
document.getElementById('btn-gameover-menu').addEventListener('click',  () => showScreen('screen-menu'));
document.getElementById('btn-results-retry').addEventListener('click',  () => startNewGame());
document.getElementById('btn-results-menu').addEventListener('click',   () => showScreen('screen-menu'));

window.addEventListener('pageshow', (e) => {
  if (e.persisted) showScreen('screen-menu');
});

updateMenuDiffChip();
updateDiffScreen();

function parseEmojis(el) {
  twemoji.parse(el || document.body, { folder: 'svg', ext: '.svg' });
}
parseEmojis();
