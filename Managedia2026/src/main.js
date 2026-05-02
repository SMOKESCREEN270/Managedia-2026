import { init, setupScrollAnimations } from './shared.js';
import { COUNTDOWN_TARGET, HISTORY, SOCIAL, ARCHITECT } from './data.js';

// ─── Countdown ────────────────────────────────────────────────────────────────
function pad(n) { return String(n).padStart(2, '0'); }

function tickCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const diff  = Math.max(0, COUNTDOWN_TARGET - Date.now());
  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);
  el.innerHTML = `
    <span class="seg"><span class="num">${pad(days)}</span><span class="label">Days</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${pad(hours)}</span><span class="label">Hours</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${pad(mins)}</span><span class="label">Mins</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${pad(secs)}</span><span class="label">Secs</span></span>
  `;
}

// ─── History carousel ─────────────────────────────────────────────────────────
function buildHistory() {
  const track = document.getElementById('historyTrack');
  if (!track) return;

  const slides = HISTORY.map((h, i) => `
    <div class="history-slide${i === 0 ? ' active' : ''}" data-idx="${i}">
      <img class="history-bg" src="${h.media}" alt="${h.title} — ${h.year}" loading="lazy" />
      <div class="history-shade"></div>
      <div class="history-slide-content">
        <div class="history-year"><span class="metal">🤘</span> ${h.year}</div>
        <div class="history-title">${h.title}</div>
        <div class="history-desc">${h.desc}</div>
      </div>
    </div>
  `).join('');

  const dots = HISTORY.map((h, i) => `
    <button class="history-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="Show ${h.year} ${h.title}">
      <span class="history-dot-year">${h.year}</span>
    </button>
  `).join('');

  track.innerHTML = `
    <div class="history-stage">
      ${slides}
      <button class="history-nav prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="history-nav next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
      <div class="history-progress"><div class="history-progress-bar"></div></div>
    </div>
    <div class="history-dots">${dots}</div>
  `;

  const total   = HISTORY.length;
  let current   = 0;
  let timer     = null;
  let paused    = false;
  const INTERVAL = 5000;

  const slideEls = track.querySelectorAll('.history-slide');
  const dotEls   = track.querySelectorAll('.history-dot');
  const bar      = track.querySelector('.history-progress-bar');

  function goTo(idx) {
    current = (idx + total) % total;
    slideEls.forEach((el, i) => el.classList.toggle('active', i === current));
    dotEls.forEach((el, i) => el.classList.toggle('active', i === current));
    resetBar();
  }

  function resetBar() {
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '0%';
    bar.offsetWidth; // force reflow
    bar.style.transition = `width ${INTERVAL}ms linear`;
    bar.style.width = paused ? '0%' : '100%';
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(() => { if (!paused) goTo(current + 1); }, INTERVAL);
    resetBar();
  }

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  track.querySelector('.history-nav.next').addEventListener('click', () => { goTo(current + 1); startTimer(); });
  track.querySelector('.history-nav.prev').addEventListener('click', () => { goTo(current - 1); startTimer(); });
  dotEls.forEach(dot => {
    dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.idx, 10)); startTimer(); });
  });

  const stage = track.querySelector('.history-stage');
  stage.addEventListener('mouseenter', () => { paused = true;  if (bar) bar.style.width = getComputedStyle(bar).width; });
  stage.addEventListener('mouseleave', () => { paused = false; resetBar(); });

  startTimer();
}

// ─── Pick-Your-Lane links ─────────────────────────────────────────────────────
function buildPickYourLane() {
  const brochureLink = document.getElementById('brochureLink');
  if (brochureLink) brochureLink.href = SOCIAL.brochure;

  const socialsLink = document.getElementById('socialsLink');
  if (socialsLink) socialsLink.href = SOCIAL.instagram;

  if (ARCHITECT) {
    const card    = document.getElementById('architectCard');
    const name    = document.getElementById('architectName');
    const role    = document.getElementById('architectRole');
    const blurb   = document.getElementById('architectBlurb');
    const cta     = document.getElementById('architectCta');

    if (name)  name.textContent  = ARCHITECT.name;
    if (role)  role.textContent  = ARCHITECT.role;
    if (blurb) blurb.textContent = ARCHITECT.blurb;
    if (card)  card.href         = ARCHITECT.instagram;
    if (cta)   cta.textContent   = 'Say hi on Instagram →';
  }
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
init({ withLoader: true }).then(() => {
  tickCountdown();
  setInterval(tickCountdown, 1000);
  buildHistory();
  buildPickYourLane();
  setupScrollAnimations();
});
