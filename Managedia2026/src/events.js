import { init } from './shared.js';
import { EVENTS, DOMAINS, getDomain } from './data.js';

const DAYS = ['11 May', '12 May', '13 May', '14 May', '15 May'];
let activeFilter = 'all';
let activeDay = '11 May';

// ─── Domain filter chips ──────────────────────────────────────────────────────
function buildFilters() {
  const container = document.getElementById('eventsFilters');
  if (!container) return;

  const chips = [{ id: 'all', name: 'All', color: 'var(--accent-red)' }, ...DOMAINS];

  container.innerHTML = chips.map(d => `
    <button class="filter-chip${d.id === activeFilter ? ' active' : ''}"
            data-filter="${d.id}"
            style="--chip-color: ${d.color || 'var(--accent-red)'};">
      ${d.name}
    </button>
  `).join('');

  container.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    activeFilter = chip.dataset.filter;
    buildFilters();
    buildEventsGrid();
  });
}

// ─── Events grid ─────────────────────────────────────────────────────────────
function buildEventsGrid() {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  const filtered = activeFilter === 'all' ? EVENTS : EVENTS.filter(e => e.domain === activeFilter);

  grid.innerHTML = filtered.map(ev => {
    const domain = getDomain(ev.domain);
    return `
      <div class="event-tile" data-slug="${ev.slug}" style="--accent-color: ${domain.color};">
        <div class="event-tile-domain"><i class="fa-solid ${domain.icon}" aria-hidden="true"></i> ${domain.name}</div>
        <div class="event-tile-name">${ev.name}</div>
        <div class="event-tile-meta">
          <span><i class="fa-regular fa-calendar"></i> ${ev.date}</span>
          <span><i class="fa-regular fa-clock"></i> ${ev.time}</span>
        </div>
        <div class="event-tile-actions">
          <button class="event-tile-btn primary" data-action="register" data-slug="${ev.slug}">
            <i class="fa-solid fa-flag-checkered"></i> Register
          </button>
          <button class="event-tile-btn ghost" data-action="rules" data-slug="${ev.slug}">
            <i class="fa-solid fa-circle-info"></i> Details
          </button>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.event-tile').forEach(tile => {
    tile.addEventListener('click', e => {
      if (!e.target.closest('.event-tile-btn')) openModal(tile.dataset.slug);
    });
  });

  grid.querySelectorAll('.event-tile-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const { slug, action } = btn.dataset;
      const ev = EVENTS.find(x => x.slug === slug);
      if (!ev) return;
      if (action === 'register') window.open(ev.formUrl, '_blank', 'noopener');
      else openModal(slug);
    });
  });
}

// ─── Day tabs ─────────────────────────────────────────────────────────────────
function renderDayTabs() {
  const tabs = document.getElementById('dayTabs');
  if (!tabs) return;

  tabs.innerHTML = DAYS.map((day, i) => {
    const [d] = day.split(' ');
    const count = EVENTS.filter(e => e.date === day).length;
    return `
      <button class="day-card${day === activeDay ? ' active' : ''}" data-day="${day}"
              aria-label="Day ${i + 1}, ${day}, ${count} events">
        <span class="day-card-label">DAY</span>
        <span class="day-card-num">${i + 1}</span>
        <span class="day-card-date">${d} MAY</span>
        <span class="day-card-count">${count} events</span>
      </button>
    `;
  }).join('');
}

function buildDayTabs() {
  renderDayTabs();
  const tabs = document.getElementById('dayTabs');
  if (!tabs) return;

  // Attach listener only once via a flag on the element
  if (tabs._listenerAttached) return;
  tabs._listenerAttached = true;

  tabs.addEventListener('click', e => {
    const card = e.target.closest('.day-card');
    if (!card) return;
    activeDay = card.dataset.day;
    renderDayTabs();      // only re-renders HTML, does NOT re-attach listener
    buildTimetable();
  });
}

// ─── Timetable ────────────────────────────────────────────────────────────────
function parseTime(str) {
  if (!str) return { mins: -1, label: '', isAllDay: true };
  if (/all day/i.test(str)) return { mins: -1, label: 'All Day', isAllDay: true };
  const m = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!m) return { mins: -1, label: str, isAllDay: true }; // unrecognised → treat as all-day
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ampm = (m[3] || '').toUpperCase();
  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return { mins: h * 60 + min, label: str, isAllDay: false, hour: h };
}

function formatHour(h) {
  const ampm = h >= 12 ? 'PM' : 'AM';
  let disp = h % 12;
  if (disp === 0) disp = 12;
  return `${disp}:00 ${ampm}`;
}

function eventTileHtml(ev, timeLabel) {
  const domain = getDomain(ev.domain);
  return `
    <button class="tt-event" data-slug="${ev.slug}" style="--accent-color: ${domain.color};">
      <span class="tt-event-domain">
        <i class="fa-solid ${domain.icon}"></i>
        <span>${domain.name}</span>
      </span>
      <span class="tt-event-name">${ev.name}</span>
      <span class="tt-event-meta">
        ${timeLabel ? `<span><i class="fa-regular fa-clock"></i> ${timeLabel}</span>` : ''}
        <span><i class="fa-solid fa-location-dot"></i> ${ev.venue}</span>
      </span>
      ${domain.pocs && domain.pocs.length > 0 ? `
      <span class="tt-event-pocs" style="display:flex; flex-direction: column; gap: 3px; margin-top: 4px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.06); width: 100%;">
        ${domain.pocs.map(poc => `
          <span style="font-size: 0.65rem; color: rgba(255,255,255,0.6); text-align: left; font-family: var(--font-body); letter-spacing: 0.02em;"><i class="fa-solid fa-phone" style="font-size: 0.8em; margin-right: 4px; color: var(--accent-color);"></i> ${poc.name}: ${poc.phone}</span>
        `).join('')}
      </span>
      ` : ''}
    </button>
  `;
}

function buildTimetable() {
  const grid = document.getElementById('daySplitGrid');
  if (!grid) return;

  const dayEvents = EVENTS.filter(e => e.date === activeDay);
  if (!dayEvents.length) {
    grid.innerHTML = '<div class="day-empty">No events scheduled for this day.</div>';
    return;
  }

  const allDay = [];
  const byHour = new Map();

  dayEvents.forEach(ev => {
    const t = parseTime(ev.time);
    if (t.isAllDay) { allDay.push(ev); return; }
    if (!byHour.has(t.hour)) byHour.set(t.hour, []);
    byHour.get(t.hour).push({ ev, t });
  });

  const hours = [...byHour.keys()].sort((a, b) => a - b);

  let html = `
    <div class="timetable">
      <div class="timetable-head">
        <i class="fa-regular fa-clock"></i>
        <span>Timetable · ${activeDay}</span>
      </div>
  `;

  if (allDay.length) {
    html += `
      <div class="tt-block tt-block-allday">
        <div class="tt-time"><span class="tt-time-main">All</span><span class="tt-time-sub">Day</span></div>
        <div class="tt-events">${allDay.map(ev => eventTileHtml(ev, '')).join('')}</div>
      </div>
    `;
  }

  hours.forEach(h => {
    const entries = byHour.get(h).sort((a, b) => a.t.mins - b.t.mins);
    const label = formatHour(h);
    const [main, sub] = label.split(' ');
    html += `
      <div class="tt-block">
        <div class="tt-time"><span class="tt-time-main">${main}</span><span class="tt-time-sub">${sub}</span></div>
        <div class="tt-events">${entries.map(({ ev, t }) => eventTileHtml(ev, t.label)).join('')}</div>
      </div>
    `;
  });

  html += '</div>';
  grid.innerHTML = html;

  grid.querySelectorAll('.tt-event').forEach(tile => {
    tile.addEventListener('click', () => openModal(tile.dataset.slug));
  });
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function openModal(slug) {
  const ev = EVENTS.find(e => e.slug === slug);
  if (!ev) return;
  const domain = getDomain(ev.domain);
  const backdrop = document.getElementById('eventModal');
  const content = document.getElementById('eventModalContent');

  content.style.setProperty('--accent-color', domain.color);
  content.innerHTML = `
    <button class="modal-close" aria-label="Close">&times;</button>
    <div class="modal-domain">${domain.name}</div>
    <h2 class="modal-title">${ev.name}</h2>
    <p class="modal-desc">${ev.desc}</p>
    <div class="modal-meta">
      <div class="modal-meta-item"><div class="modal-meta-label">Date</div><div class="modal-meta-value">${ev.date}</div></div>
      <div class="modal-meta-item"><div class="modal-meta-label">Time</div><div class="modal-meta-value">${ev.time}</div></div>
      <div class="modal-meta-item"><div class="modal-meta-label">Venue</div><div class="modal-meta-value">${ev.venue}</div></div>
      <div class="modal-meta-item"><div class="modal-meta-label">Team Size</div><div class="modal-meta-value">${ev.teamSize}</div></div>
      <div class="modal-meta-item"><div class="modal-meta-label">Entry Fee</div><div class="modal-meta-value">&#8377;${ev.fee}</div></div>
      <div class="modal-meta-item"><div class="modal-meta-label">Status</div><div class="modal-meta-value" style="color:var(--accent-gold);">Open</div></div>
    </div>
    ${domain.pocs && domain.pocs.length > 0 ? `
    <div class="modal-pocs" style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
      <div style="font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 1px;">Point of Contact</div>
      ${domain.pocs.map((poc, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${index === domain.pocs.length - 1 ? '0' : '0.5rem'};">
          <span style="color: #fff; font-weight: 500;">${poc.name}</span>
          <a href="tel:${poc.phone}" style="color: var(--accent-color); text-decoration: none; font-variant-numeric: tabular-nums;">
            <i class="fa-solid fa-phone" style="margin-right: 4px; font-size: 0.8em;"></i> ${poc.phone}
          </a>
        </div>
      `).join('')}
    </div>
    ` : ''}
    <div class="modal-actions">
      <a class="btn btn-primary" href="${ev.formUrl}" target="_blank" rel="noopener">
        <i class="fa-solid fa-flag-checkered"></i> Register Now
      </a>
      <a class="btn btn-ghost" href="${ev.rulesUrl}" target="_blank" rel="noopener">
        <i class="fa-solid fa-book"></i> Rules &amp; R.
      </a>
      <button class="btn btn-ghost" data-close>Close</button>
    </div>
  `;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
  content.querySelector('.modal-close').addEventListener('click', closeModal);
  content.querySelector('[data-close]').addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('eventModal').classList.remove('active');
  document.body.style.overflow = '';
}

function setupModal() {
  const backdrop = document.getElementById('eventModal');
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) closeModal();
  });
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
init({ withLoader: false }).then(() => {
  buildDayTabs();
  buildTimetable();
  buildFilters();
  buildEventsGrid();
  setupModal();
});
