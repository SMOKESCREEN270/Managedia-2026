// ============================================================
//  Shared UI: navbar, footer, music, helpers
// ============================================================
import { CONTACTS } from "./data.js";

const PAGES = [
  { href: "/",            label: "Takeover",   match: ["/", "/index.html"] },
  { href: "/events.html", label: "Events",     match: ["/events", "/events.html", "/event", "/event.html"] },
  { href: "/campus-reps.html", label: "Campus Reps", match: ["/campus-reps", "/campus-reps.html"] },
  { href: "/sponsors.html",label: "Sponsors",  match: ["/sponsors", "/sponsors.html"] },
];

function isActive(page) {
  const path = window.location.pathname;
  return page.match.some((m) => m === path);
}

function buildNavbar() {
  const header = document.createElement("header");
  header.className = "navbar shown";
  header.innerHTML = `
    <a href="/" class="nav-logo" aria-label="TAKEOVER 2026 Home">
      <img src="/logo.png" alt="TAKEOVER 2026" />
    </a>
    <button class="nav-toggle" aria-label="Toggle menu" id="navToggle">
      <i class="fa-solid fa-bars"></i>
    </button>
    <nav class="nav-links" id="navLinks">
      ${PAGES.map((p) => `
        <a href="${p.href}" class="nav-link${isActive(p) ? " active" : ""}">${p.label}</a>
      `).join("")}
      <button class="sound-toggle" id="soundToggle" aria-label="Toggle music">
        <i class="fa-solid fa-volume-xmark"></i>
      </button>
    </nav>
  `;
  return header;
}

function buildFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="/logo.png" alt="TAKEOVER 2026" />
          <p>Where the stage isn't given. It's claimed. The annual fest of iLEAD — Institute of Leadership, Entrepreneurship and Development.</p>
          <div class="footer-socials">
            <a href="${CONTACTS.instagram}" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="${CONTACTS.youtube}" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="${CONTACTS.whatsappLink}" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="mailto:${CONTACTS.email}" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events.html">Events</a></li>
            <li><a href="/campus-reps.html">Campus Rep</a></li>
            <li><a href="/sponsors.html">Sponsors</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="mailto:${CONTACTS.email}">${CONTACTS.email}</a></li>
            <li><a href="${CONTACTS.whatsappLink}">${CONTACTS.whatsapp}</a></li>
            <li><a href="${CONTACTS.instagram}">@takeover.ilead</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="${CONTACTS.brochure}" download>Brochure</a></li>
            <li><a href="#">Code of Conduct</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 Institute of Leadership, Entrepreneurship and Development. All rights reserved.
      </div>
    </div>
  `;
  return footer;
}

function buildLoader() {
  if (sessionStorage.getItem("takeoverLoaderShown") === "1") return null;
  // Dev convenience — skip the entry overlay with ?noloader=1 (used for screenshots / QA).
  if (new URLSearchParams(window.location.search).has("noloader")) return null;
  const div = document.createElement("div");
  div.className = "loader";
  div.id = "siteLoader";
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const loaderSrc = isMobile ? "/takeover_loader_mobile.mp4" : "/takeover_loader.mp4";
  div.innerHTML = `
    <video class="loader-video" playsinline preload="auto" id="loaderVideo">
      <source src="${loaderSrc}" type="video/mp4" />
    </video>
    <div class="loader-overlay"></div>
    <div class="loader-content">
      <div class="sound-options" id="loaderSoundOptions">
        <button class="btn" data-sound="on"><i class="fa-solid fa-volume-high"></i> Continue with Music</button>
        <button class="btn" data-sound="off"><i class="fa-solid fa-volume-xmark"></i> Continue without Music</button>
      </div>
    </div>
  `;
  return div;
}

function setupAudio(playOnLoad) {
  let audio = document.getElementById("siteAudio");
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "siteAudio";
    audio.loop = true;
    audio.preload = "none";
    audio.innerHTML = `<source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />`;
    document.body.appendChild(audio);
  }
  audio.volume = 0.4;
  const btn = document.getElementById("soundToggle");
  const setIcon = (playing) => {
    if (!btn) return;
    btn.querySelector("i").className = `fa-solid ${playing ? "fa-volume-high" : "fa-volume-xmark"}`;
  };
  if (playOnLoad) {
    audio.play().then(() => setIcon(true)).catch(() => setIcon(false));
  }
  btn?.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => setIcon(true)).catch(() => setIcon(false));
    } else {
      audio.pause();
      setIcon(false);
    }
  });
}

function setupNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle?.addEventListener("click", () => links?.classList.toggle("open"));
  document.addEventListener("click", (e) => {
    if (!toggle?.contains(e.target) && !links?.contains(e.target)) {
      links?.classList.remove("open");
    }
  });
}

export function showToast({ title = "Notice", message = "", duration = 5000 } = {}) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid fa-circle-check"></i></div>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

export function setupFadeIns(selector = ".fade-in") {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => obs.observe(el));
}

export function initShell({ withLoader = false } = {}) {
  // Inject font awesome (kept here so each page only links one stylesheet)
  if (!document.getElementById("fa-cdn")) {
    const link = document.createElement("link");
    link.id = "fa-cdn";
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
    document.head.appendChild(link);
  }

  document.body.prepend(buildNavbar());
  document.body.appendChild(buildFooter());
  setupNavToggle();

  let resolveLoader;
  const loaderDone = new Promise((res) => { resolveLoader = res; });

  if (withLoader) {
    const loader = buildLoader();
    if (loader) {
      document.body.appendChild(loader);
      document.body.style.overflow = "hidden";

      // Hide buttons until the loader video finishes playing (no looping).
      const video = loader.querySelector("#loaderVideo");
      const opts  = loader.querySelector("#loaderSoundOptions");
      if (opts) opts.classList.add("hidden");
      const revealOptions = () => {
        if (opts) opts.classList.remove("hidden");
        // Hold last frame instead of black after `ended`.
        if (video) {
          try {
            video.pause();
            if (video.duration && isFinite(video.duration)) {
              video.currentTime = Math.max(0, video.duration - 0.05);
            }
          } catch (e) { /* noop */ }
        }
      };
      if (video) {
        video.addEventListener("ended", revealOptions, { once: true });
        // Safety fallback in case the video errors / can't play.
        video.addEventListener("error", revealOptions, { once: true });
        // If the video metadata never loads, reveal after 20s anyway.
        setTimeout(() => { if (opts && opts.classList.contains("hidden")) revealOptions(); }, 20000);

        // Try to autoplay UNMUTED. Browsers may block this without prior user
        // interaction — in that case, fall back to muted autoplay so the
        // animation still plays through to its `ended` event.
        video.muted = false;
        const tryPlay = () => video.play();
        tryPlay().catch(() => {
          video.muted = true;
          video.play().catch(() => { /* ignore — `error` handler reveals options */ });
        });
      } else {
        revealOptions();
      }

      loader.querySelectorAll("[data-sound]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const sound = btn.dataset.sound === "on";
          loader.classList.add("hidden");
          setTimeout(() => {
            loader.remove();
            document.body.style.overflow = "";
            sessionStorage.setItem("takeoverLoaderShown", "1");
            setupAudio(sound);
            resolveLoader(sound);
          }, 800);
        });
      });
    } else {
      setupAudio(false);
      resolveLoader(false);
    }
  } else {
    setupAudio(false);
    resolveLoader(false);
  }

  setupFadeIns();
  return loaderDone;
}

// --- Google Form submission helper -------------------------------
// Submits text-only fields to Google Forms via no-cors POST.
// Files cannot be submitted to Google Forms from a custom HTML form
// without sign-in; we send a "payment reference" string instead.
export async function submitToGoogleForm(formId, fieldMap, values) {
  if (!formId || formId.startsWith("REPLACE_WITH")) {
    // No real form hooked up yet — pretend success so UI flow works in dev.
    console.warn("[GoogleForm] No formId configured. Submission skipped.", values);
    return { ok: true, simulated: true };
  }
  const url = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
  const formData = new FormData();
  Object.entries(values).forEach(([key, val]) => {
    const entryId = fieldMap[key];
    if (entryId && val != null && val !== "") {
      formData.append(entryId, String(val));
    }
  });
  try {
    await fetch(url, { method: "POST", mode: "no-cors", body: formData });
    return { ok: true };
  } catch (err) {
    console.error("[GoogleForm] submission failed", err);
    return { ok: false, error: err };
  }
}
