const roles = [
  {
    date: 'JUN 2026 — AUG 2026', company: 'DIRECTV', location: 'Los Angeles, CA', title: 'Product Content Intern',
    tags: ['pm','ba'], summary: 'Product research, metadata, data migration, and workflow automation for a content management system.',
    bullets: [
      'Analyzed and visualized metadata from 500+ contract summaries to support content management system implementation, data migration, workflow automation, and metadata validation.',
      'Conducted competitive analysis across 15+ streaming, FAST, social video, and SVOD platforms, translating business and technical findings into product recommendations for DIRECTV’s third-party app content strategy.'
    ], skills: ['SQL','Product Research','Data Migration','Competitive Analysis']
  },
  {
    date: 'FEB 2026 — MAY 2026', company: 'ESQUIRE SOLUTIONS', location: 'Durham, NC', title: 'Software Engineer Intern',
    tags: ['swe','ba'], summary: 'Built internal sales enablement tools while working directly from stakeholder requirements.',
    bullets: [
      'Analyzed business requirements and developed an internal sales enablement dashboard integrating external legal case data with CRM systems to deliver actionable insights for sales and management teams.',
      'Led weekly stakeholder discovery sessions to gather and document requirements, identify operational challenges, and translate business needs into product enhancements.',
      'Drove NCP dashboard enhancements by incorporating stakeholder feedback and refining case prioritization for sales teams.'
    ], skills: ['CRM','Dashboards','Stakeholder Discovery','Product Enhancements']
  },
  {
    date: 'AUG 2025 — MAY 2026', company: 'DUKE CHRISTENSEN FAMILY CENTER FOR INNOVATION', location: 'Durham, NC', title: 'Product Manager',
    tags: ['pm','ai'], summary: 'Owned product strategy for a custom AI platform supporting researchers developing biomedical technologies.',
    bullets: [
      'Led product strategy and operational planning, defining product vision, roadmap, and MVP scope for a custom AI platform.',
      'Conducted market research and customer discovery through 35+ stakeholder interviews and literature reviews, translating workflow gaps in digital pathology into product requirements and feature sets.',
      'Created product documentation and cross-functional reports to align development priorities and deployment goals.'
    ], skills: ['Roadmapping','Customer Discovery','AI','Market Research']
  },
  {
    date: 'JUL 2025 — AUG 2025', company: 'HONGHUANG TECHNOLOGY', location: 'Tianjin, China', title: 'AI and Software Engineer Intern',
    tags: ['swe','ai'], summary: 'Built generative-AI product features for DB-GPT using RAG, Text-to-SQL, APIs, and visualization.',
    bullets: [
      'Collaborated on DB-GPT, a cloud-based generative AI platform designed to improve access to operational data across vehicle-parts production workflows.',
      'Designed user-facing tools using Retrieval-Augmented Generation (RAG), Text-to-SQL, and ECharts, converting natural-language queries into scalable backend APIs and real-time visualizations.',
      'Deployed multiple models via Hugging Face within DB-GPT, accelerating experimentation and deployment cycles by 50%.'
    ], skills: ['RAG','Text-to-SQL','ECharts','Hugging Face','APIs']
  },
  {
    date: 'MAY 2025 — JUL 2025', company: 'DUKE UNDERGRADUATE ADMISSIONS', location: 'Durham, NC', title: 'Product Management Intern (AI/ML)',
    tags: ['pm','ai','ba'], summary: 'Connected ML modeling with stakeholder workflows to support admissions yield strategy.',
    bullets: [
      'Partnered with Duke Undergraduate Admissions to identify decision-making and workflow gaps in yield strategy and translate them into product requirements for an AI-based admissions prediction tool.',
      'Developed and trained logistic regression and random forest models on 9,000+ student records across a 3-year dataset, achieving 80% accuracy in predicting undergraduate matriculation.',
      'Built interactive Tableau dashboards and Streamlit-based scenario analysis tools enabling real-time “what-if” simulations and subgroup-level analysis.',
      'Designed scalable data pipelines for feature engineering and data standardization, improving model performance and interpretability by 25%, and presented outcomes to 100+ attendees including the Duke admissions committee.'
    ], skills: ['Python','scikit-learn','Tableau','Streamlit','ETL']
  }
];

const navItems = [...document.querySelectorAll('[data-route]')];
const pages = [...document.querySelectorAll('.page')];

function routeTo(route) {
  const target = document.getElementById(route) || document.getElementById('home');
  pages.forEach(p => p.classList.toggle('active-page', p === target));
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.route === target.id));
  if (route === 'home') history.replaceState(null, '', '#home'); else history.replaceState(null, '', '#' + target.id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach(item => item.addEventListener('click', () => routeTo(item.dataset.route)));

function renderRoles(filter = 'all') {
  const list = document.getElementById('experience-list');
  list.innerHTML = roles.map((role, idx) => {
    const visible = filter === 'all' || role.tags.includes(filter);
    return `
      <article class="role-card ${visible ? '' : 'hidden'} ${role.incoming ? 'incoming' : ''}" data-role-index="${idx}">
        <div class="role-date">${role.date}</div>
        <div class="role-main">
          <h3>${role.title}${role.incoming ? '<span class="incoming-badge">INCOMING</span>' : ''}</h3>
          <div class="role-company">${role.company} · ${role.location}</div>
          <p class="role-summary">${role.summary}</p>
          <div class="role-details">
            <ul>${role.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
            <div class="role-tags">${role.skills.map(s => `<span>${s}</span>`).join('')}</div>
          </div>
        </div>
        <button class="role-toggle" aria-label="Expand role">+</button>
      </article>`;
  }).join('');
}

renderRoles();

document.getElementById('experience-list').addEventListener('click', e => {
  const btn = e.target.closest('.role-toggle');
  if (!btn) return;
  const card = btn.closest('.role-card');
  card.classList.toggle('open');
  btn.textContent = card.classList.contains('open') ? '−' : '+';
});

document.querySelectorAll('[data-exp-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-exp-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderRoles(btn.dataset.expFilter);
  });
});

function focusLane(lane) {
  document.querySelectorAll('.orbit-tags button').forEach(b => b.classList.toggle('selected', b.dataset.filter === lane));
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.expFilter === lane));
  renderRoles(lane);
  routeTo('experience');
}

document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => focusLane(btn.dataset.filter)));

document.querySelectorAll('a[href="#contact"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); routeTo('about'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth', block:'center'}), 50); }));



// Playful custom cursor + magnetic hover + card tilt + click sparks
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
const cursorLabel = document.createElement('div');
cursorLabel.className = 'cursor-label';
cursorLabel.textContent = 'MOVE';
document.body.append(cursorDot, cursorRing, cursorLabel);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;
let labelX = mouseX;
let labelY = mouseY;
let lastSparkAt = 0;

const cursorText = (el) => {
  if (!el) return 'MOVE';
  if (el.matches('a')) return 'OPEN';
  if (el.matches('button')) return 'CLICK';
  if (el.matches('.project-card')) return 'VIEW';
  if (el.matches('.role-card')) return 'EXPAND';
  if (el.matches('.campus-card')) return 'EXPLORE';
  return 'MOVE';
};

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  cursorLabel.style.transform = `translate(${mouseX + 18}px, ${mouseY + 18}px)`;

  const now = performance.now();
  if (now - lastSparkAt > 90) {
    lastSparkAt = now;
    const spark = document.createElement('span');
    spark.className = 'cursor-spark';
    spark.style.left = `${mouseX}px`;
    spark.style.top = `${mouseY}px`;
    spark.style.opacity = '0.45';
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 560);
  }
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  labelX += (mouseX - labelX) * 0.32;
  labelY += (mouseY - labelY) * 0.32;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  cursorLabel.style.left = `${labelX}px`;
  cursorLabel.style.top = `${labelY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

function interactiveElement(target) {
  return target.closest('a, button, .project-card, .role-card, .campus-card');
}

document.addEventListener('mouseover', (e) => {
  const el = interactiveElement(e.target);
  if (el) {
    document.body.classList.add('cursor-hover');
    cursorLabel.textContent = cursorText(el);
  }
});

document.addEventListener('mouseout', (e) => {
  const el = interactiveElement(e.target);
  if (el && !el.contains(e.relatedTarget)) {
    document.body.classList.remove('cursor-hover');
    cursorLabel.textContent = 'MOVE';
    el.style.transform = '';
  }
});

document.addEventListener('mousemove', (e) => {
  const el = interactiveElement(e.target);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const dx = (e.clientX - (rect.left + rect.width / 2));
  const dy = (e.clientY - (rect.top + rect.height / 2));

  if (el.matches('a, button')) {
    el.style.transform = `translate(${dx * 0.045}px, ${dy * 0.045}px)`;
  } else if (el.matches('.project-card')) {
    const rotateY = Math.max(-4, Math.min(4, dx / rect.width * 8));
    const rotateX = Math.max(-4, Math.min(4, -(dy / rect.height * 8)));
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.add('cursor-click');
  const burst = document.createElement('span');
  burst.className = 'cursor-spark';
  burst.style.left = `${mouseX}px`;
  burst.style.top = `${mouseY}px`;
  burst.style.width = '18px';
  burst.style.height = '18px';
  burst.style.opacity = '0.9';
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 560);
});
document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

const initial = location.hash.replace('#','');
if (initial && document.getElementById(initial)) routeTo(initial); else routeTo('home');


// Project cards: click/Enter to open a playful detail panel.
const projectInfo = {
  regen: {
    kicker: '01 · ReGen', title: 'ReGen',
    copy: 'A gamified sustainable investing concept built around a real product question: how do you make ESG choices feel understandable, motivating, and worth returning to?',
    role: 'Product strategy, prototype, monetization model', tools: 'AI · ESG APIs · Product design'
  },
  amazon: {
    kicker: '02 · Mini-Amazon', title: 'Mini-Amazon',
    copy: 'A full-stack e-commerce application where the fun part was making the underlying system behave correctly: inventory, balances, multi-seller orders, and complex SQL all had to work together.',
    role: 'Database design, APIs, checkout logic', tools: 'Python · Flask · PostgreSQL'
  },
  'research-ai': {
    kicker: '03 · Research AI Platform', title: 'Research AI Platform',
    copy: 'A product + AI project focused on helping researchers synthesize customer discovery insights and move emerging biomedical technologies toward commercialization.',
    role: 'Customer discovery, roadmap, AI workflows', tools: 'Python · RAG · Supabase · LLMs'
  }
};
const modal = document.getElementById('project-modal');
const openProject = (key) => {
  const data = projectInfo[key];
  if (!data || !modal) return;
  document.getElementById('project-modal-kicker').textContent = data.kicker;
  document.getElementById('project-modal-title').textContent = data.title;
  document.getElementById('project-modal-copy').textContent = data.copy;
  document.getElementById('project-modal-role').textContent = data.role;
  document.getElementById('project-modal-tools').textContent = data.tools;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelector('.project-modal-close')?.focus();
};
const closeProject = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(card.dataset.project); } });
});
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeProject));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

// Theme switcher: every fresh page load starts in light mode.
const themeToggle = document.getElementById('theme-toggle');
const themeText = themeToggle?.querySelector('.theme-text');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const applyTheme = (theme, animate = false) => {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    const light = theme === 'light';
    themeText.textContent = light ? 'Dark' : 'Light';
    themeIcon.textContent = light ? '☾' : '☀';
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  }
  if (animate) {
    const flash = document.createElement('div');
    flash.className = 'theme-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
  }
};
applyTheme('light');
themeToggle?.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true));

// Scroll progress + a little extra motion as you move around the page.
const progress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
});

// Let the hero stickers drift subtly toward the pointer.
const heroVisual = document.querySelector('.hero-visual');
heroVisual?.addEventListener('mousemove', (e) => {
  const rect = heroVisual.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  heroVisual.querySelectorAll('.sticky-note').forEach((note, i) => {
    const factor = (i + 1) * 4;
    note.style.translate = `${x * factor}px ${y * factor}px`;
  });
});
heroVisual?.addEventListener('mouseleave', () => {
  heroVisual.querySelectorAll('.sticky-note').forEach(note => note.style.translate = '0 0');
});

// Tiny keyboard easter egg: press T to toggle the theme.
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 't' && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) {
    themeToggle?.click();
  }
});
