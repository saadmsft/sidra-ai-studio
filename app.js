/* Sidra AI Use-Case Studio — interactive layer */

// ---------- Big Five animated visuals (inline SVG + CSS) ----------
// Each function returns a compact SVG keyed to its use case.
// Animations use SMIL <animate> + CSS — no external libs.
const BIG_FIVE_ANIM = {
  // CPG Agent — book → AI brain → pill capsule travels into clinician's tap
  'cpg-agent': (size = 'sm') => `
    <svg class="bf-anim" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid meet" data-size="${size}">
      <defs>
        <linearGradient id="cpgG" x1="0" x2="1"><stop offset="0" stop-color="#008578"/><stop offset="1" stop-color="#3CDBC0"/></linearGradient>
      </defs>
      <!-- guideline book -->
      <g transform="translate(14,28)">
        <rect x="0" y="0" width="28" height="22" rx="2" fill="url(#cpgG)" opacity="0.18"/>
        <rect x="0" y="0" width="28" height="22" rx="2" fill="none" stroke="url(#cpgG)" stroke-width="1.4"/>
        <line x1="5" y1="6" x2="23" y2="6" stroke="url(#cpgG)" stroke-width="1.2"/>
        <line x1="5" y1="11" x2="20" y2="11" stroke="url(#cpgG)" stroke-width="1.2"/>
        <line x1="5" y1="16" x2="22" y2="16" stroke="url(#cpgG)" stroke-width="1.2"/>
      </g>
      <!-- AI brain hub -->
      <g transform="translate(95,40)">
        <circle r="13" fill="url(#cpgG)" opacity="0.16"/>
        <circle r="13" fill="none" stroke="url(#cpgG)" stroke-width="1.6">
          <animate attributeName="r" values="13;15;13" dur="2.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.6;1" dur="2.6s" repeatCount="indefinite"/>
        </circle>
        <text y="4" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" font-weight="700" fill="#008578">AI</text>
      </g>
      <!-- clinician hand (tap target) -->
      <g transform="translate(168,32)">
        <rect x="0" y="0" width="22" height="18" rx="3" fill="#FFF" stroke="#008578" stroke-width="1.4"/>
        <path d="M5 9 L9 13 L17 5" stroke="#008578" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- pill traveling left → AI → clinician -->
      <g>
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="#FF8674">
          <animate attributeName="cx" values="42;95;168" dur="3.2s" repeatCount="indefinite"/>
          <animate attributeName="cy" values="39;40;41" dur="3.2s" repeatCount="indefinite"/>
        </ellipse>
      </g>
      <!-- connector lines -->
      <line x1="42" y1="39" x2="82" y2="40" stroke="#008578" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>
      <line x1="108" y1="40" x2="168" y2="41" stroke="#008578" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>
    </svg>`,

  // Critical Labs — alert pulses, escalation channels light up sequentially
  'critical-lab-results': (size = 'sm') => `
    <svg class="bf-anim" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid meet" data-size="${size}">
      <defs>
        <radialGradient id="alertG"><stop offset="0" stop-color="#FF8674"/><stop offset="1" stop-color="#E25C4D"/></radialGradient>
      </defs>
      <!-- lab tube -->
      <g transform="translate(16,18)">
        <rect x="0" y="0" width="14" height="46" rx="3" fill="none" stroke="#E25C4D" stroke-width="1.6"/>
        <rect x="2" y="22" width="10" height="22" rx="2" fill="#E25C4D" opacity="0.55">
          <animate attributeName="y" values="22;14;22" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="height" values="22;30;22" dur="2.4s" repeatCount="indefinite"/>
        </rect>
        <text x="7" y="58" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="7" fill="#E25C4D">K+</text>
      </g>
      <!-- alert ring -->
      <g transform="translate(70,40)">
        <circle r="8" fill="url(#alertG)"/>
        <circle r="8" fill="none" stroke="#E25C4D" stroke-width="1.6">
          <animate attributeName="r" values="8;20;8" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <text y="3" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" font-weight="700" fill="#FFF">!</text>
      </g>
      <!-- escalation channels -->
      <g font-family="JetBrains Mono,monospace" font-size="8" font-weight="600">
        <g transform="translate(110,18)">
          <rect width="76" height="14" rx="3" fill="#008578" opacity="0.15"/>
          <text x="6" y="10" fill="#008578">▸ Teams</text>
          <circle cx="68" cy="7" r="3" fill="#008578">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.4;1" dur="3.6s" repeatCount="indefinite"/>
          </circle>
        </g>
        <g transform="translate(110,34)">
          <rect width="76" height="14" rx="3" fill="#FF8674" opacity="0.15"/>
          <text x="6" y="10" fill="#E25C4D">▸ SMS</text>
          <circle cx="68" cy="7" r="3" fill="#E25C4D">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.7;1" dur="3.6s" repeatCount="indefinite"/>
          </circle>
        </g>
        <g transform="translate(110,50)">
          <rect width="76" height="14" rx="3" fill="#E8B74D" opacity="0.20"/>
          <text x="6" y="10" fill="#A07820">▸ On-call ack</text>
          <path d="M62 7 L66 11 L72 4" stroke="#0B5A3E" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <animate attributeName="opacity" values="0;0;0;1;1" keyTimes="0;0.5;0.7;0.85;1" dur="3.6s" repeatCount="indefinite"/>
          </path>
        </g>
      </g>
    </svg>`,

  // Voice Bot — phone ring waves, AR/EN bubbles alternate
  'patient-voice-bot': (size = 'sm') => `
    <svg class="bf-anim" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid meet" data-size="${size}">
      <defs>
        <linearGradient id="voiceG" x1="0" x2="1"><stop offset="0" stop-color="#00A395"/><stop offset="1" stop-color="#3CDBC0"/></linearGradient>
      </defs>
      <!-- phone -->
      <g transform="translate(20,22)">
        <rect width="26" height="40" rx="5" fill="url(#voiceG)" opacity="0.18"/>
        <rect width="26" height="40" rx="5" fill="none" stroke="url(#voiceG)" stroke-width="1.6"/>
        <circle cx="13" cy="34" r="2" fill="#00A395"/>
        <rect x="9" y="6" width="8" height="2" rx="1" fill="#00A395" opacity="0.6"/>
        <!-- ring shake -->
        <animateTransform attributeName="transform" type="rotate" values="0 33 42;-3 33 42;3 33 42;0 33 42" dur="1.2s" repeatCount="indefinite"/>
      </g>
      <!-- waves -->
      <g transform="translate(60,42)" stroke="#00A395" stroke-width="1.6" fill="none" stroke-linecap="round">
        <path d="M0 0 q5 -8 10 0 t10 0">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
        </path>
        <path d="M0 0 q7 -14 14 0 t14 0" opacity="0.6">
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur="1.2s" begin="0.3s" repeatCount="indefinite"/>
        </path>
      </g>
      <!-- AR / EN bubbles -->
      <g font-family="JetBrains Mono,monospace" font-size="9" font-weight="700">
        <g transform="translate(120,22)">
          <rect width="60" height="20" rx="10" fill="#00A395"/>
          <text x="30" y="13" text-anchor="middle" fill="#FFF" direction="rtl">مرحبا</text>
          <animate attributeName="opacity" values="1;0.2;0.2;1" keyTimes="0;0.4;0.6;1" dur="3.4s" repeatCount="indefinite"/>
        </g>
        <g transform="translate(120,46)">
          <rect width="60" height="20" rx="10" fill="#FBFBF3" stroke="#00A395" stroke-width="1.6"/>
          <text x="30" y="13" text-anchor="middle" fill="#00857B">Hello</text>
          <animate attributeName="opacity" values="0.2;0.2;1;0.2" keyTimes="0;0.4;0.7;1" dur="3.4s" repeatCount="indefinite"/>
        </g>
      </g>
    </svg>`,

  // OR Scheduling — clock spins fast, OR rooms tick on
  'or-scheduling': (size = 'sm') => `
    <svg class="bf-anim" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid meet" data-size="${size}">
      <defs>
        <linearGradient id="orG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FF8674"/><stop offset="1" stop-color="#E25C4D"/></linearGradient>
      </defs>
      <!-- clock -->
      <g transform="translate(34,40)">
        <circle r="22" fill="#FFF" stroke="url(#orG)" stroke-width="1.8"/>
        <circle r="22" fill="none" stroke="url(#orG)" stroke-width="1.8" stroke-dasharray="2 3" opacity="0.4"/>
        <line x1="0" y1="0" x2="0" y2="-14" stroke="#1F2A2E" stroke-width="2" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite"/>
        </line>
        <line x1="0" y1="0" x2="9" y2="0" stroke="#FF8674" stroke-width="2.4" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>
        </line>
        <circle r="2" fill="#1F2A2E"/>
      </g>
      <!-- OR rooms grid -->
      <g transform="translate(80,18)" font-family="JetBrains Mono,monospace" font-size="8" font-weight="700">
        ${[0,1,2,3,4,5].map(i => {
          const x = (i % 3) * 36;
          const y = Math.floor(i / 3) * 22;
          const delay = i * 0.4;
          return `
            <g transform="translate(${x},${y})">
              <rect width="32" height="18" rx="3" fill="#E25C4D" opacity="0.15"/>
              <rect width="32" height="18" rx="3" fill="#E25C4D">
                <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.3;0.7;1" dur="4.8s" begin="${delay}s" repeatCount="indefinite"/>
              </rect>
              <text x="16" y="12" text-anchor="middle" fill="#FFF">OR${i+1}</text>
            </g>`;
        }).join('')}
      </g>
    </svg>`,

  // ITSM — locked screen → password → unlocked → ticket resolved
  'itsm-agent': (size = 'sm') => `
    <svg class="bf-anim" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid meet" data-size="${size}">
      <defs>
        <linearGradient id="itsG" x1="0" x2="1"><stop offset="0" stop-color="#005C55"/><stop offset="1" stop-color="#3CDBC0"/></linearGradient>
      </defs>
      <!-- locked → unlocked -->
      <g transform="translate(28,24)">
        <!-- shackle -->
        <path d="M6 10 q0 -10 10 -10 q10 0 10 10 v6" fill="none" stroke="url(#itsG)" stroke-width="2.2" stroke-linecap="round">
          <animate attributeName="d"
            values="M6 10 q0 -10 10 -10 q10 0 10 10 v6;
                    M6 10 q0 -10 10 -10 q10 0 10 10 v6;
                    M6 6 q0 -10 10 -10 q10 0 10 10 v10;
                    M6 6 q0 -10 10 -10 q10 0 10 10 v10"
            keyTimes="0;0.4;0.6;1" dur="3s" repeatCount="indefinite"/>
        </path>
        <rect x="2" y="14" width="28" height="22" rx="3" fill="url(#itsG)" opacity="0.85"/>
        <circle cx="16" cy="24" r="3" fill="#FFF"/>
        <rect x="14.5" y="24" width="3" height="6" fill="#FFF"/>
      </g>
      <!-- agent chat bubble -->
      <g transform="translate(78,12)">
        <rect width="108" height="22" rx="11" fill="#FBFBF3" stroke="#008578" stroke-width="1.4"/>
        <text x="10" y="14" font-family="JetBrains Mono,monospace" font-size="9" font-weight="600" fill="#008578">▸ /reset password</text>
      </g>
      <g transform="translate(78,38)">
        <rect width="108" height="22" rx="11" fill="#008578"/>
        <text x="10" y="14" font-family="JetBrains Mono,monospace" font-size="9" font-weight="600" fill="#FFF">✓ unlocked · 60s</text>
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.4;0.6;1" dur="3s" repeatCount="indefinite"/>
      </g>
      <!-- ticket counter -->
      <g transform="translate(78,64)" font-family="JetBrains Mono,monospace" font-size="8" font-weight="700" fill="#1F2A2E">
        <text>tickets resolved</text>
        <g transform="translate(82,0)" font-size="11" fill="#008578">
          <text opacity="0">1<animate attributeName="opacity" values="1;0;0;0;0;0" dur="3s" repeatCount="indefinite"/></text>
          <text opacity="0">7<animate attributeName="opacity" values="0;1;0;0;0;0" dur="3s" repeatCount="indefinite"/></text>
          <text opacity="0">14<animate attributeName="opacity" values="0;0;1;0;0;0" dur="3s" repeatCount="indefinite"/></text>
          <text opacity="0">26<animate attributeName="opacity" values="0;0;0;1;0;0" dur="3s" repeatCount="indefinite"/></text>
          <text opacity="0">38<animate attributeName="opacity" values="0;0;0;0;1;0" dur="3s" repeatCount="indefinite"/></text>
          <text opacity="0">52<animate attributeName="opacity" values="0;0;0;0;0;1" dur="3s" repeatCount="indefinite"/></text>
        </g>
      </g>
    </svg>`,
};

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
    const animSvg = (uc.phase === 1 && BIG_FIVE_ANIM[uc.id])
      ? `<div class="card-anim">${BIG_FIVE_ANIM[uc.id]('sm')}</div>`
      : '';
    card.innerHTML = `
      <div class="card-top">
        <div class="cat">${uc.category}</div>
        ${phaseBadge}
      </div>
      <h4>${uc.name}</h4>
      ${hookLine}
      ${animSvg}
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
  const banner = (uc.phase === 1 && BIG_FIVE_ANIM[uc.id])
    ? `<div class="uc-banner">${BIG_FIVE_ANIM[uc.id]('lg')}<div class="uc-banner-hook">${uc.hook || ''}</div></div>`
    : '';

  pane.innerHTML = `
    <div class="uc-meta">
      <span class="pill">${uc.category}</span>
      <span class="id">${uc.id}</span>
      <span class="num-big">Use case ${String(idx).padStart(2, '0')} / ${String(useCases.length).padStart(2, '0')}</span>
    </div>
    <div class="uc-header">
      <h2>${uc.name}</h2>
    </div>
    ${banner}
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
