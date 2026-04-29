/* Sidra AI Use-Case Studio — interactive layer */

const ACCENTS = {
  'cpg-agent': '#008578',
  'patient-voice-bot': '#00A395',
  'itsm-agent': '#FF8674',
  'ai-landing-zone': '#005C55',
  'patient-admin-assistant': '#3CDBC0',
  'or-scheduling': '#FF8674',
  'critical-lab-results': '#E25C4D',
  'occupational-health': '#00A395',
  'revenue-cycle': '#005C55'
};

const ICONS = {
  scope: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>',
  requirements: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  integrations: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  architecture: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  flow: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>',
  delivery: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  card: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};

const TAB_LABELS = {
  scope: 'Scope & users',
  requirements: 'Requirements',
  integrations: 'Integrations & data',
  architecture: 'Architecture',
  flow: 'End-to-end flow',
  delivery: 'Risks & phasing'
};

const SECTION_GROUPS = {
  scope: ['Business goals', 'Primary users and personas', 'Sidra-specific considerations'],
  requirements: ['Functional requirements', 'Non-functional requirements', 'Success metrics'],
  integrations: ['Integration systems', 'Data sources and data products'],
  delivery: ['Key risks and mitigations', 'Phasing']
};

let useCases = [];
let activeId = null;
let activeFilter = 'big-five'; // default view: the Big Five for clinicians + ops
let searchTerm = '';

initMermaid('light');

async function load() {
  const res = await fetch('usecases.json', { cache: 'no-cache' });
  useCases = await res.json();
  renderFilters();
  renderCards();
  renderSideNav();
  setupTheme();
  setupSearch();
  animateCounters();
  if (useCases.length) {
    const firstBig = useCases.find(u => u.phase === 1) || useCases[0];
    selectUseCase(firstBig.id);
  }
}

function initMermaid(theme) {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    themeVariables: theme === 'dark' ? {
      primaryColor: '#18292A',
      primaryTextColor: '#ECF6F4',
      primaryBorderColor: '#3CDBC0',
      lineColor: '#3CDBC0',
      secondaryColor: '#0F2322',
      tertiaryColor: '#122020',
      background: '#122020',
      fontFamily: 'Cabin, sans-serif',
      fontSize: '14px',
      mainBkg: '#18292A',
      noteBkgColor: '#0F2322',
      noteTextColor: '#ECF6F4',
      noteBorderColor: '#3CDBC0',
      actorBkg: '#0F2322',
      actorBorder: '#3CDBC0',
      actorTextColor: '#ECF6F4',
      actorLineColor: '#3CDBC0',
      signalColor: '#ECF6F4',
      signalTextColor: '#ECF6F4',
      labelBoxBkgColor: '#18292A',
      labelBoxBorderColor: '#3CDBC0',
      labelTextColor: '#ECF6F4',
      loopTextColor: '#ECF6F4',
      activationBorderColor: '#3CDBC0',
      activationBkgColor: '#1F3A38',
      sequenceNumberColor: '#003733'
    } : {
      primaryColor: '#FBFBF3',
      primaryTextColor: '#1F2A2E',
      primaryBorderColor: '#008578',
      lineColor: '#008578',
      secondaryColor: '#F4F2E6',
      tertiaryColor: '#FFFFFF',
      fontFamily: 'Cabin, sans-serif',
      fontSize: '14px',
      noteBkgColor: '#FBFBF3',
      noteTextColor: '#1F2A2E',
      actorBkg: '#FBFBF3',
      actorTextColor: '#1F2A2E',
      signalColor: '#008578',
      signalTextColor: '#1F2A2E',
      labelTextColor: '#1F2A2E'
    }
  });
}

function renderFilters() {
  const cats = Array.from(new Set(useCases.map(u => u.category)));
  const root = document.getElementById('filters');
  const big = useCases.filter(u => u.phase === 1).length;
  const phase2 = useCases.filter(u => u.phase === 2).length;
  const total = useCases.length;
  const head = [
    `<button class="filter-chip ${activeFilter === 'big-five' ? 'active' : ''}" data-cat="big-five">The Big Five · ${big}</button>`,
    `<button class="filter-chip ${activeFilter === 'phase-2' ? 'active' : ''}" data-cat="phase-2">Phase 2 · Foundation &amp; Back-office · ${phase2}</button>`,
    `<button class="filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-cat="all">All · ${total}</button>`,
  ].join('');
  const chips = cats.map(c => {
    const n = useCases.filter(u => u.category === c).length;
    return `<button class="filter-chip filter-chip-cat" data-cat="${c}">${c} · ${n}</button>`;
  }).join('');
  root.innerHTML = head + chips;
  root.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.cat;
      root.querySelectorAll('.filter-chip').forEach(b => b.classList.toggle('active', b === btn));
      renderCards();
    });
  });
}

function renderCards() {
  const root = document.getElementById('cards');
  root.innerHTML = '';
  const filtered = useCases.filter(uc => {
    if (activeFilter === 'big-five' && uc.phase !== 1) return false;
    if (activeFilter === 'phase-2' && uc.phase !== 2) return false;
    if (activeFilter !== 'all' && activeFilter !== 'big-five' && activeFilter !== 'phase-2'
        && uc.category !== activeFilter) return false;
    if (!searchTerm) return true;
    const blob = (uc.name + ' ' + uc.category + ' ' + (uc.sections['Overview'] || '')).toLowerCase();
    return blob.includes(searchTerm);
  });
  filtered.forEach((uc, i) => {
    const accent = ACCENTS[uc.id] || '#006C72';
    const overview = (uc.sections['Overview'] || '').replace(/\n/g, ' ').slice(0, 150);
    const tags = extractTags(uc);
    const card = document.createElement('div');
    card.className = 'card' + (uc.phase === 1 ? ' card-big-five' : ' card-phase-2');
    card.style.setProperty('--accent', accent);
    card.dataset.id = uc.id;
    const phaseBadge = uc.phase === 1
      ? `<span class="phase-badge phase-badge-1">Big Five</span>`
      : `<span class="phase-badge phase-badge-2">Phase 2</span>`;
    const hookLine = uc.hook
      ? `<div class="card-hook">${uc.hook}</div>`
      : '';
    card.innerHTML = `
      <div class="card-top">
        <div class="cat">${uc.category}</div>
        ${phaseBadge}
      </div>
      <h4>${uc.name}</h4>
      ${hookLine}
      <p>${overview}${overview.length === 150 ? '…' : ''}</p>
      <div class="card-tags">${tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>
      <div class="card-cta">Open use case ${ICONS.card}</div>
    `;
    card.addEventListener('click', () => {
      selectUseCase(uc.id);
      document.getElementById('detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    root.appendChild(card);
    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, i * 40);
  });
  if (!filtered.length) {
    root.innerHTML = `<div class="muted" style="grid-column:1/-1;text-align:center;padding:40px">No use cases match that filter.</div>`;
  }
}

function extractTags(uc) {
  const tags = [];
  const integrations = uc.sections['Integration systems'] || '';
  const lines = integrations.split('\n').filter(l => l.trim().startsWith('-'));
  if (lines.length) tags.push(`${lines.length} integrations`);
  const fr = uc.sections['Functional requirements'] || '';
  const frLines = fr.split('\n').filter(l => /^\d+\./.test(l.trim()) || l.trim().startsWith('-'));
  if (frLines.length) tags.push(`${frLines.length} requirements`);
  if ((uc.sections['Non-functional requirements'] || '').match(/Arabic/i)) tags.push('AR + EN');
  if ((uc.sections['Sidra-specific considerations'] || '').match(/JCI/i)) tags.push('JCI-aligned');
  return tags.slice(0, 4);
}

function renderSideNav() {
  const list = document.getElementById('side-list');
  list.innerHTML = '';
  const big = useCases.filter(u => u.phase === 1);
  const p2  = useCases.filter(u => u.phase === 2);
  document.getElementById('side-count').textContent = `${big.length} + ${p2.length}`;
  const renderGroup = (label, group) => {
    if (!group.length) return;
    const head = document.createElement('li');
    head.className = 'side-nav-group';
    head.textContent = label;
    list.appendChild(head);
    group.forEach(uc => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.dataset.id = uc.id;
      btn.textContent = uc.name;
      btn.addEventListener('click', () => {
        selectUseCase(uc.id);
        document.getElementById('detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  };
  renderGroup('The Big Five', big);
  renderGroup('Phase 2 · Foundation & Back-office', p2);
}

function selectUseCase(id) {
  activeId = id;
  document.querySelectorAll('.card').forEach(el => el.classList.toggle('active', el.dataset.id === id));
  document.querySelectorAll('.side-nav button').forEach(el => el.classList.toggle('active', el.dataset.id === id));
  const uc = useCases.find(u => u.id === id);
  if (!uc) return;
  const accent = ACCENTS[id] || '#006C72';
  const pane = document.getElementById('detail-pane');
  pane.style.setProperty('--accent', accent);

  const idx = useCases.findIndex(u => u.id === id) + 1;
  const overviewHtml = marked.parse(uc.sections['Overview'] || '');
  const archSummary = uc.sections['Architecture summary'] || '';
  const flowSteps = marked.parse(uc.sections['End-to-end flow'] || '');

  pane.innerHTML = `
    <div class="uc-meta">
      <span class="pill">${uc.category}</span>
      <span class="id">${uc.id}</span>
      <span class="num-big">Use case ${String(idx).padStart(2, '0')} / ${String(useCases.length).padStart(2, '0')}</span>
    </div>
    <div class="uc-header">
      <h2>${uc.name}</h2>
    </div>
    <div class="uc-overview">${overviewHtml}</div>
    <div class="tabs" role="tablist">
      ${Object.keys(TAB_LABELS).map((k, i) => `<button class="tab-btn ${i === 0 ? 'active' : ''}" data-tab="${k}">${ICONS[k]}${TAB_LABELS[k]}</button>`).join('')}
    </div>
    <div class="tab-content active" data-tab="scope">${renderSectionGroup(uc, SECTION_GROUPS.scope)}</div>
    <div class="tab-content" data-tab="requirements">${renderSectionGroup(uc, SECTION_GROUPS.requirements)}</div>
    <div class="tab-content" data-tab="integrations">${renderSectionGroup(uc, SECTION_GROUPS.integrations)}</div>
    <div class="tab-content" data-tab="architecture">
      <div class="diagram-block">
        <div class="head">
          <h4>${ICONS.architecture} Azure architecture · logical view</h4>
          <a class="diagram-link" href="${uc.architecture_image}" target="_blank" rel="noopener">Open full size →</a>
        </div>
        <div class="azure-arch">
          <a href="${uc.architecture_image}" target="_blank" rel="noopener">
            <img src="${uc.architecture_image}" alt="Azure architecture for ${uc.name}" loading="lazy" />
          </a>
        </div>
        <p class="caption">${stripMarkdown(archSummary)}</p>
        <details class="diagram-source">
          <summary>View Mermaid logical sketch</summary>
          <div class="mermaid" id="mermaid-arch">${escapeHtml(uc.architecture_diagram)}</div>
        </details>
      </div>
    </div>
    <div class="tab-content" data-tab="flow">
      <div class="diagram-block">
        <div class="head"><h4>${ICONS.flow} End-to-end flow</h4></div>
        <div class="mermaid" id="mermaid-flow">${escapeHtml(uc.flow_diagram)}</div>
        <div class="flow-steps">${flowSteps}</div>
      </div>
    </div>
    <div class="tab-content" data-tab="delivery">${renderSectionGroup(uc, SECTION_GROUPS.delivery)}</div>
  `;

  pane.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      pane.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
      pane.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.dataset.tab === tab));
      if (tab === 'architecture' || tab === 'flow') renderMermaid();
    });
  });

  renderMermaid();
}

function renderSectionGroup(uc, headings) {
  const cards = headings.map(h => {
    const raw = uc.sections[h];
    if (!raw) return '';
    return `<div class="section-card"><h4>${ICONS.scope} ${h}</h4>${marked.parse(raw)}</div>`;
  }).join('');
  return `<div class="section-grid">${cards}</div>`;
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function stripMarkdown(text) {
  return text.replace(/[#*_`>]/g, '').replace(/\s+/g, ' ').trim();
}

async function renderMermaid() {
  const nodes = document.querySelectorAll('.mermaid');
  for (const node of nodes) {
    if (node.dataset.rendered === '1') continue;
    const def = node.textContent;
    node.removeAttribute('data-processed');
    try {
      const id = 'm-' + Math.random().toString(36).slice(2);
      const { svg } = await mermaid.render(id, def);
      node.innerHTML = svg;
      node.dataset.rendered = '1';
    } catch (err) {
      node.innerHTML = '<pre style="color:#9A2E59;font-size:12px;white-space:pre-wrap">' + escapeHtml(String(err)) + '</pre>';
    }
  }
}

function setupTheme() {
  const saved = localStorage.getItem('sidra-theme');
  if (saved) document.body.dataset.theme = saved;
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const cur = document.body.dataset.theme || 'light';
    const next = cur === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = next;
    localStorage.setItem('sidra-theme', next);
    initMermaid(next);
    // Force re-render of mermaid in current tab
    document.querySelectorAll('.mermaid').forEach(n => n.dataset.rendered = '');
    renderMermaid();
  });
}

function setupSearch() {
  const input = document.getElementById('search');
  input.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderCards();
  });
}

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1100;
    const start = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

load();
