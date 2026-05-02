import { init } from './shared.js';
import { EVENTS, getDomain } from './data.js';

function getSlug() {
  return new URLSearchParams(window.location.search).get('slug');
}

function isPlaceholderUrl(url) {
  return !url || url.includes('REPLACE_');
}

function populatePage(ev) {
  const domain = getDomain(ev.domain);

  document.title = `Register · ${ev.name} — TAKEOVER 2026`;

  const header = document.getElementById('eventHeader');
  if (header) header.style.borderBottom = `2px solid ${domain.color}`;

  const domainEl = document.getElementById('eventDomain');
  if (domainEl) { domainEl.textContent = domain.name; domainEl.style.color = domain.color; }

  const nameEl = document.getElementById('eventName');
  if (nameEl) nameEl.textContent = ev.name;

  const infoEl = document.getElementById('eventInfo');
  if (infoEl) {
    infoEl.innerHTML = `
      <div class="modal-meta" style="margin-bottom: 30px;">
        <div class="modal-meta-item">
          <div class="modal-meta-label">Date</div>
          <div class="modal-meta-value">${ev.date}</div>
        </div>
        <div class="modal-meta-item">
          <div class="modal-meta-label">Time</div>
          <div class="modal-meta-value">${ev.time}</div>
        </div>
        <div class="modal-meta-item">
          <div class="modal-meta-label">Venue</div>
          <div class="modal-meta-value">${ev.venue}</div>
        </div>
        <div class="modal-meta-item">
          <div class="modal-meta-label">Team Size</div>
          <div class="modal-meta-value">${ev.teamSize}</div>
        </div>
        <div class="modal-meta-item">
          <div class="modal-meta-label">Entry Fee</div>
          <div class="modal-meta-value" style="color: ${domain.color};">&#8377;${ev.fee}</div>
        </div>
        <div class="modal-meta-item">
          <div class="modal-meta-label">Description</div>
          <div class="modal-meta-value" style="font-size:13px; line-height:1.5;">${ev.desc}</div>
        </div>
      </div>
    `;
  }

  const rulesBtn    = document.getElementById('rulesBtn');
  const registerBtn = document.getElementById('registerBtn');

  if (rulesBtn) {
    rulesBtn.href = ev.rulesUrl;
    if (isPlaceholderUrl(ev.rulesUrl)) {
      rulesBtn.classList.add('placeholder');
      rulesBtn.addEventListener('click', e => {
        e.preventDefault();
        alert(`Rules & Regulations link not configured yet for this event.\n\nAdd it in src/data.js → EVENT_LINKS:\n  "${ev.slug}": { rulesUrl: "https://docs.google.com/document/d/.../view" }`);
      });
    }
  }

  if (registerBtn) {
    registerBtn.href = ev.formUrl;
    if (isPlaceholderUrl(ev.formUrl)) {
      registerBtn.classList.add('placeholder');
      registerBtn.addEventListener('click', e => {
        e.preventDefault();
        alert(`Registration form not configured yet for this event.\n\nAdd it in src/data.js → EVENT_LINKS:\n  "${ev.slug}": { formUrl: "https://docs.google.com/forms/d/e/.../viewform" }`);
      });
    }
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
init({ withLoader: false }).then(() => {
  const slug = getSlug();
  const ev   = EVENTS.find(e => e.slug === slug);

  if (!ev) {
    const nameEl   = document.getElementById('eventName');
    const domainEl = document.getElementById('eventDomain');
    const actions  = document.getElementById('eventActions');
    if (nameEl)   nameEl.textContent   = 'Event not found';
    if (domainEl) domainEl.textContent = '';
    if (actions)  actions.style.display = 'none';
    return;
  }

  populatePage(ev);
});
