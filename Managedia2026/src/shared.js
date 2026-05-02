import './style.css';
import { SOCIAL, ARCHITECT, NAV_LINKS } from './data.js';

// ─── FontAwesome (injected once) ─────────────────────────────────────────────
function injectFontAwesome() {
  if (document.getElementById('fa-cdn')) return;
  const link = document.createElement('link');
  link.id = 'fa-cdn';
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
  document.head.appendChild(link);
}

// ─── Nav helpers ─────────────────────────────────────────────────────────────
function isActiveLink(navLink) {
  const path = window.location.pathname;
  return navLink.match.some(m => m === path);
}

function createNavbar() {
  const header = document.createElement('header');
  header.className = 'navbar shown';
  header.innerHTML = `
    <a href="/" class="nav-logo" aria-label="TAKEOVER 2026 Home">
      <img src="/logo.png" alt="TAKEOVER 2026" />
    </a>
    <button class="nav-toggle" aria-label="Toggle menu" id="navToggle">
      <i class="fa-solid fa-bars"></i>
    </button>
    <nav class="nav-links" id="navLinks">
      ${NAV_LINKS.map(l => `
        <a href="${l.href}" class="nav-link${isActiveLink(l) ? ' active' : ''}">${l.label}</a>
      `).join('')}
      <button class="sound-toggle" id="soundToggle" aria-label="Toggle music">
        <i class="fa-solid fa-volume-xmark"></i>
      </button>
    </nav>
  `;
  return header;
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="/logo.png" alt="TAKEOVER 2026" />
          <p>Where the stage isn't given. It's claimed. The annual fest of iLEAD — Institute of Leadership, Entrepreneurship and Development.</p>
          <div class="footer-socials">
            <a href="${SOCIAL.instagram}" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="${SOCIAL.youtube}" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="mailto:${SOCIAL.email}" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="mailto:${SOCIAL.email}">${SOCIAL.email}</a></li>
            <li><a href="${SOCIAL.instagram}">@takeover.ilead</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="${SOCIAL.brochure}" download>Brochure</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-huge-text">
        <svg viewBox="0 0 1050 180" width="100%" preserveAspectRatio="xMidYMid meet" style="height:auto">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.42)" />
            </pattern>
          </defs>
          <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
                font-family="Orbitron, sans-serif" font-weight="900" font-size="160"
                letter-spacing="15" fill="url(#dotPattern)">TAKEOVER</text>
        </svg>
      </div>
      <div class="footer-bottom">
        &copy; 2026 Institute of Leadership, Entrepreneurship and Development. All rights reserved.
      </div>
    </div>
  `;
  return footer;
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────
function setupMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  toggle?.addEventListener('click', () => links?.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!toggle?.contains(e.target) && !links?.contains(e.target)) {
      links?.classList.remove('open');
    }
  });
}

// ─── Scroll animations ───────────────────────────────────────────────────────
export function setupScrollAnimations(selector = '.fade-in') {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ─── Music ───────────────────────────────────────────────────────────────────
function setupMusic(playNow) {
  let audio = document.getElementById('siteAudio');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'siteAudio';
    audio.loop = true;
    audio.preload = 'none';
    audio.innerHTML = '<source src="/welcome-to-the-party.mp3" type="audio/mpeg" />';
    document.body.appendChild(audio);
  }
  audio.volume = 0.4;

  const soundBtn = document.getElementById('soundToggle');
  const setIcon = playing => {
    if (soundBtn) soundBtn.querySelector('i').className = `fa-solid ${playing ? 'fa-volume-high' : 'fa-volume-xmark'}`;
  };

  audio.addEventListener('play',  () => sessionStorage.setItem('musicPlaying', '1'));
  audio.addEventListener('pause', () => sessionStorage.setItem('musicPlaying', '0'));

  if (playNow || sessionStorage.getItem('musicPlaying') === '1') {
    audio.play().then(() => setIcon(true)).catch(() => {
      sessionStorage.setItem('musicPlaying', '0');
      setIcon(false);
    });
  } else {
    setIcon(false);
  }

  soundBtn?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => setIcon(true)).catch(() => setIcon(false));
    } else {
      audio.pause();
      setIcon(false);
    }
  });
}

// ─── Loader ──────────────────────────────────────────────────────────────────
function createLoader() {
  if (
    sessionStorage.getItem('takeoverLoaderShown') === '1' ||
    new URLSearchParams(window.location.search).has('noloader')
  ) return null;

  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.id = 'siteLoader';

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const src = isMobile ? '/mobile_loader_new.mp4' : '/Desktop_Loadervideo.mp4';

  loader.innerHTML = `
    <video class="loader-video" playsinline preload="auto" id="loaderVideo" style="pointer-events:none;"></video>
    <div class="loader-overlay"></div>
    <div class="loader-content">
      <div class="sound-options hidden" id="loaderSoundOptions">
        <button class="btn" data-sound="on"><i class="fa-solid fa-volume-high"></i> Continue with Music</button>
        <button class="btn" data-sound="off"><i class="fa-solid fa-volume-xmark"></i> Continue without Music</button>
      </div>
    </div>
  `;
  loader._loaderSrc = src;
  return loader;
}

// ─── init ────────────────────────────────────────────────────────────────────
/**
 * Bootstrap shared UI (navbar, footer, music, optional loader).
 * Returns a promise that resolves when the page is ready to render.
 * @param {{ withLoader?: boolean }} options
 * @returns {Promise<boolean>} resolves with whether music is playing
 */
export function init({ withLoader = false } = {}) {
  injectFontAwesome();
  document.body.prepend(createNavbar());
  document.body.appendChild(createFooter());
  setupMobileMenu();

  let resolve;
  const ready = new Promise(r => { resolve = r; });

  if (withLoader) {
    const loader = createLoader();
    if (loader) {
      document.body.appendChild(loader);
      document.body.style.overflow = 'hidden';

      const video    = loader.querySelector('#loaderVideo');
      const options  = loader.querySelector('#loaderSoundOptions');
      options?.classList.add('hidden');

      const showOptions = () => {
        options?.classList.remove('hidden');
        if (video) {
          try {
            video.pause();
            if (video.duration && isFinite(video.duration)) {
              video.currentTime = Math.max(0, video.duration - 0.05);
            }
          } catch (_) { /* ignore */ }
        }
      };

      if (video) {
        let triggered = false;
        const trigger = () => { if (!triggered) { triggered = true; showOptions(); } };
        const t = setTimeout(trigger, 30000);
        video.addEventListener('ended', () => { clearTimeout(t); trigger(); }, { once: true });
        video.addEventListener('error', () => { clearTimeout(t); trigger(); }, { once: true });
        video.src = loader._loaderSrc;
        video.load();
        video.muted = false;
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => { clearTimeout(t); trigger(); });
        });
      } else {
        showOptions();
      }

      loader.querySelectorAll('[data-sound]').forEach(btn => {
        btn.addEventListener('click', () => {
          const withMusic = btn.dataset.sound === 'on';
          loader.classList.add('hidden');
          setTimeout(() => {
            loader.remove();
            document.body.style.overflow = '';
            sessionStorage.setItem('takeoverLoaderShown', '1');
            setupMusic(withMusic);
            resolve(withMusic);
          }, 800);
        });
      });
    } else {
      setupMusic(false);
      resolve(false);
    }
  } else {
    setupMusic(false);
    resolve(false);
  }

  setupScrollAnimations();
  return ready;
}
