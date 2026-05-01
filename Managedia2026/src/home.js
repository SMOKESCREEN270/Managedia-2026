import { initShell, setupFadeIns } from "./shared.js";
import {
  TARGET_DATE, HISTORY, CONTACTS, ARCHITECT,
} from "./data.js";

// ---- Countdown ----
function pad(n) { return String(n).padStart(2, "0"); }
function tickCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;
  const distance = Math.max(0, TARGET_DATE - Date.now());
  const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60))    / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60))         / 1000);
  el.innerHTML = `
    <span class="seg"><span class="num">${pad(days)}</span><span class="label">Days</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${pad(hours)}</span><span class="label">Hours</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${pad(minutes)}</span><span class="label">Mins</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${pad(seconds)}</span><span class="label">Secs</span></span>
  `;
}

// ---- History (auto-scrolling slideshow) ----
function renderHistory() {
  const root = document.getElementById("historyTrack");
  if (!root) return;

  const slides = HISTORY.map((h, idx) => `
    <div class="history-slide${idx === 0 ? " active" : ""}" data-idx="${idx}">
      <img class="history-bg" src="${h.media}" alt="${h.title} — ${h.year}" loading="lazy" />
      <div class="history-shade"></div>
      <div class="history-slide-content">
        <div class="history-year"><span class="metal">🤘</span> ${h.year}</div>
        <div class="history-title">${h.title}</div>
        <div class="history-desc">${h.desc}</div>
      </div>
    </div>
  `).join("");

  const dots = HISTORY.map((h, idx) => `
    <button class="history-dot${idx === 0 ? " active" : ""}" data-idx="${idx}" aria-label="Show ${h.year} ${h.title}">
      <span class="history-dot-year">${h.year}</span>
    </button>
  `).join("");

  root.innerHTML = `
    <div class="history-stage">
      ${slides}
      <button class="history-nav prev" aria-label="Previous">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="history-nav next" aria-label="Next">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <div class="history-progress"><div class="history-progress-bar"></div></div>
    </div>
    <div class="history-dots">${dots}</div>
  `;

  const total = HISTORY.length;
  let current = 0;
  let timer = null;
  let paused = false;
  const INTERVAL_MS = 5000;

  const slideEls = root.querySelectorAll(".history-slide");
  const dotEls = root.querySelectorAll(".history-dot");
  const progressBar = root.querySelector(".history-progress-bar");

  function show(i) {
    current = (i + total) % total;
    slideEls.forEach((el, k) => el.classList.toggle("active", k === current));
    dotEls.forEach((el, k) => el.classList.toggle("active", k === current));
    restartProgress();
  }
  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function restartProgress() {
    if (!progressBar) return;
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    // force reflow
    void progressBar.offsetWidth;
    progressBar.style.transition = `width ${INTERVAL_MS}ms linear`;
    progressBar.style.width = paused ? "0%" : "100%";
  }

  function start() {
    stop();
    timer = setInterval(() => { if (!paused) next(); }, INTERVAL_MS);
    restartProgress();
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  root.querySelector(".history-nav.next").addEventListener("click", () => { next(); start(); });
  root.querySelector(".history-nav.prev").addEventListener("click", () => { prev(); start(); });
  dotEls.forEach((dot) => {
    dot.addEventListener("click", () => { show(parseInt(dot.dataset.idx, 10)); start(); });
  });

  const stage = root.querySelector(".history-stage");
  stage.addEventListener("mouseenter", () => { paused = true; if (progressBar) progressBar.style.width = getComputedStyle(progressBar).width; });
  stage.addEventListener("mouseleave", () => { paused = false; restartProgress(); });

  start();
}

// ---- Pick Your Lane links ----
function setupGridLinks() {
  const broch = document.getElementById("brochureLink");
  if (broch) broch.href = CONTACTS.brochure;
  const socials = document.getElementById("socialsLink");
  if (socials) socials.href = CONTACTS.instagram;

  // Architect card — populated from data.js
  const card    = document.getElementById("architectCard");
  const nameEl  = document.getElementById("architectName");
  const roleEl  = document.getElementById("architectRole");
  const blurbEl = document.getElementById("architectBlurb");
  const ctaEl   = document.getElementById("architectCta");
  if (ARCHITECT) {
    if (nameEl)  nameEl.textContent  = ARCHITECT.name;
    if (roleEl)  roleEl.textContent  = ARCHITECT.role;
    if (blurbEl) blurbEl.textContent = ARCHITECT.blurb;
    const link = ARCHITECT.instagram || ARCHITECT.github || ARCHITECT.whatsapp || "#";
    if (card)    card.href           = link;
    if (ctaEl)   ctaEl.textContent   = ARCHITECT.instagram ? "Say hi on Instagram →" : "Say hi →";
  }
}

// ---- Boot ----
initShell({ withLoader: true }).then(() => {
  tickCountdown();
  setInterval(tickCountdown, 1000);
  renderHistory();
  setupGridLinks();
  setupFadeIns();
});
