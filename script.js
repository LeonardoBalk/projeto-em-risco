const CONFIG = {
  maxMetric: 100,
  warnThreshold: 60,
  critThreshold: 30,
  toastHideDelay: 1400,
};

const DIFFICULTIES = {
  easy:   { label: 'Fácil',   startMetric: 100, penaltyMult: 1.0, cardCount: 10, goldThreshold: 70, silverThreshold: 40 },
  medium: { label: 'Médio',   startMetric: 80,  penaltyMult: 1.4, cardCount: 10, goldThreshold: 60, silverThreshold: 35 },
  hard:   { label: 'Difícil', startMetric: 65,  penaltyMult: 1.6, cardCount: 12, goldThreshold: 50, silverThreshold: 30 },
};

const cards = [
  {
    event: "O desenvolvedor principal pediu demissão no meio do sprint.",
    tag: "alto impacto",
    options: [
      { text: "Contratar substituto externo",  effects: { prazo: -2,  custo: -10, qualidade: 0   } },
      { text: "Redistribuir tarefas no time",  effects: { prazo: -7,  custo: 0,   qualidade: -5  } },
      { text: "Ignorar e torcer",              effects: { prazo: 0,   custo: -2,  qualidade: -12 } },
    ],
    best: 0, worst: 2,
    tip: "Contratar um substituto mitiga o atraso e preserva a qualidade do projeto, mesmo aumentando o custo temporariamente."
  },
  {
    event: "O cliente mudou o escopo completamente na metade do projeto.",
    tag: "alto impacto",
    options: [
      { text: "Aceitar tudo e replanejar",  effects: { prazo: -12, custo: -7, qualidade: 0   } },
      { text: "Negociar escopo reduzido",   effects: { prazo: -5,  custo: -2, qualidade: 0   } },
      { text: "Recusar as mudanças",        effects: { prazo: 0,   custo: 0,  qualidade: -10 } },
    ],
    best: 1, worst: 0,
    tip: "Negociar o escopo permite alinhar as expectativas do cliente à realidade de prazo e custo do projeto."
  },
  {
    event: "Servidor de produção caiu 2 dias antes da entrega.",
    tag: "alto impacto",
    options: [
      { text: "Contratar cloud emergencial", effects: { prazo: 0,   custo: -12, qualidade: 0  } },
      { text: "Trabalhar em overtime",       effects: { prazo: -5,  custo: 0,   qualidade: -7 } },
      { text: "Atrasar a entrega",           effects: { prazo: -15, custo: 0,   qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Investir em infraestrutura emergencial protege a entrega final e a qualidade percebida pelo cliente."
  },
  {
    event: "Bug crítico encontrado em produção pelo cliente.",
    tag: "alto impacto",
    options: [
      { text: "Hotfix imediato",                     effects: { prazo: -7, custo: -5, qualidade: 0   } },
      { text: "Patch na próxima versão",             effects: { prazo: 0,  custo: 0,  qualidade: -12 } },
      { text: "Comunicar e corrigir com o cliente",  effects: { prazo: -5, custo: -5, qualidade: 5   } },
    ],
    best: 2, worst: 1,
    tip: "Transparência na comunicação aliada à resolução conjunta fortalece a confiança do cliente no projeto."
  },
  {
    event: "Fornecedor atrasou entrega de licenças essenciais.",
    tag: "médio impacto",
    options: [
      { text: "Buscar fornecedor alternativo", effects: { prazo: 0,   custo: -10, qualidade: 0  } },
      { text: "Usar alternativa open source",  effects: { prazo: -5,  custo: 0,   qualidade: -7 } },
      { text: "Aguardar o fornecedor",         effects: { prazo: -12, custo: 0,   qualidade: 0  } },
    ],
    best: 0, worst: 2,
    tip: "Diversificar fornecedores de forma ágil evita gargalos no cronograma e mantém o projeto em andamento."
  },
  {
    event: "Dois membros sênior da equipe entraram em conflito sério.",
    tag: "médio impacto",
    options: [
      { text: "Mediar o conflito",   effects: { prazo: -5, custo: 0,   qualidade: 0   } },
      { text: "Demitir um deles",    effects: { prazo: -7, custo: -10, qualidade: 0   } },
      { text: "Ignorar o conflito",  effects: { prazo: -5, custo: 0,   qualidade: -10 } },
    ],
    best: 0, worst: 2,
    tip: "Mediar conflitos restabelece a harmonia e produtividade do time sem a perda de talentos valiosos."
  },
  {
    event: "Requisitos mal documentados geraram retrabalho significativo.",
    tag: "médio impacto",
    options: [
      { text: "Parar e redocumentar tudo",           effects: { prazo: -10, custo: -5, qualidade: 0   } },
      { text: "Continuar com o que tem",             effects: { prazo: 0,   custo: 0,  qualidade: -12 } },
      { text: "Reunião de alinhamento com cliente",  effects: { prazo: -5,  custo: -2, qualidade: 5   } },
    ],
    best: 2, worst: 1,
    tip: "Realinhamentos frequentes corrigem desvios de entendimento e reduzem desperdício de esforço."
  },
  {
    event: "Investidor exigiu relatório de progresso urgente.",
    tag: "baixo impacto",
    options: [
      { text: "Preparar relatório completo",    effects: { prazo: -5, custo: 0, qualidade: 0   } },
      { text: "Entregar relatório superficial", effects: { prazo: 0,  custo: 0, qualidade: -10 } },
      { text: "Delegar para o time",            effects: { prazo: -3, custo: 0, qualidade: -3  } },
    ],
    best: 0, worst: 1,
    tip: "Manter investidores e stakeholders bem informados garante a governança e o suporte contínuo ao projeto."
  },
  {
    event: "Ferramenta principal do projeto ficou fora do ar por 1 dia.",
    tag: "baixo impacto",
    options: [
      { text: "Migrar para outra ferramenta", effects: { prazo: -5, custo: -10, qualidade: 0  } },
      { text: "Trabalhar offline",            effects: { prazo: 0,  custo: 0,   qualidade: -3 } },
      { text: "Aguardar restauração",         effects: { prazo: -5, custo: 0,   qualidade: 0  } },
    ],
    best: 1, worst: 0,
    tip: "Garantir a continuidade do trabalho offline minimiza atrasos causados por indisponibilidades técnicas temporárias."
  },
  {
    event: "Cliente solicitou reunião de revisão surpresa para amanhã.",
    tag: "baixo impacto",
    options: [
      { text: "Aceitar e preparar apresentação", effects: { prazo: -5, custo: 0, qualidade: 0   } },
      { text: "Aceitar sem preparação",          effects: { prazo: 0,  custo: 0, qualidade: -10 } },
      { text: "Remarcar a reunião",              effects: { prazo: -3, custo: 0, qualidade: -5  } },
    ],
    best: 0, worst: 1,
    tip: "Estar preparado para revisões demonstra profissionalismo e ajuda a manter a confiança do cliente."
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
  const opps  = shuffle(cards.filter(c => c.type === 'opportunity'));
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

  const streakWasActive = state.streak > 0;
  if (quality === 'best')  state.streak++;
  if (quality === 'worst') state.streak = 0;

  if (quality === 'best')   flashStreak(state.streak);
  else if (streakWasActive) flashStreakBreak();

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
