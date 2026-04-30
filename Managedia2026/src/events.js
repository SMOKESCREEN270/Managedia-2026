import { initShell } from "./shared.js";
import { EVENTS, DOMAINS, getDomain } from "./data.js";

let currentFilter = "all";
let currentDay = "11 May";

const FEST_DAYS = ["11 May", "12 May", "13 May", "14 May", "15 May"];

// ----- Filters / Events grid -----
function renderFilters() {
  const filters = document.getElementById("eventsFilters");
  if (!filters) return;
  const chips = [{ id: "all", name: "All" }, ...DOMAINS];
  filters.innerHTML = chips.map((c) => {
    const color = c.id === "all" ? "var(--accent-red)" : c.color;
    return `
      <button class="filter-chip${c.id === currentFilter ? " active" : ""}" data-filter="${c.id}" style="--chip-color: ${color};">
        ${c.name}
      </button>
    `;
  }).join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    renderFilters();
    renderGrid();
  }, { once: false });
}

function renderGrid() {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;
  const list = currentFilter === "all" ? EVENTS : EVENTS.filter((e) => e.domain === currentFilter);
  grid.innerHTML = list.map((e) => {
    const d = getDomain(e.domain);
    return `
      <div class="event-tile" data-slug="${e.slug}" style="--accent-color: ${d.color};">
        <div class="event-tile-domain"><i class="fa-solid ${d.icon}" aria-hidden="true"></i> ${d.name}</div>
        <div class="event-tile-name">${e.name}</div>
        <div class="event-tile-meta">
          <span><i class="fa-regular fa-calendar"></i> ${e.date}</span>
          <span><i class="fa-regular fa-clock"></i> ${e.time}</span>
        </div>
        <div class="event-tile-actions">
          <button class="event-tile-btn primary" data-action="register" data-slug="${e.slug}">
            <i class="fa-solid fa-flag-checkered"></i> Register
          </button>
          <button class="event-tile-btn ghost" data-action="rules" data-slug="${e.slug}">
            <i class="fa-solid fa-circle-info"></i> Details
          </button>
        </div>
      </div>
    `;
  }).join("");
  grid.querySelectorAll(".event-tile").forEach((tile) => {
    tile.addEventListener("click", (ev) => {
      if (ev.target.closest(".event-tile-btn")) return;
      openModal(tile.dataset.slug);
    });
  });
  grid.querySelectorAll(".event-tile-btn").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const slug = btn.dataset.slug;
      const action = btn.dataset.action;
      const evObj = EVENTS.find((e) => e.slug === slug);
      if (!evObj) return;
      if (action === "register") {
        window.open(evObj.formUrl, "_blank", "noopener");
      } else {
        openModal(slug);
      }
    });
  });
}

// ----- Day Split: square day cards + hour-by-hour timetable -----
function renderDayCards() {
  const tabs = document.getElementById("dayTabs");
  if (!tabs) return;
  tabs.innerHTML = FEST_DAYS.map((day, idx) => {
    const dayNum = day.split(" ")[0];
    const count = EVENTS.filter((e) => e.date === day).length;
    return `
      <button class="day-card${day === currentDay ? " active" : ""}" data-day="${day}" aria-label="Day ${idx + 1}, ${day}, ${count} events">
        <span class="day-card-label">DAY</span>
        <span class="day-card-num">${idx + 1}</span>
        <span class="day-card-date">${dayNum} MAY</span>
        <span class="day-card-count">${count} events</span>
      </button>
    `;
  }).join("");
  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".day-card");
    if (!btn) return;
    currentDay = btn.dataset.day;
    renderDayCards();
    renderTimetable();
  });
}

function parseTime(t) {
  if (!t) return { mins: -1, label: "", isAllDay: false };
  if (/all day/i.test(t)) return { mins: -1, label: "All Day", isAllDay: true };
  const match = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return { mins: -1, label: t, isAllDay: false };
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const ampm = (match[3] || "").toUpperCase();
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return { mins: h * 60 + m, label: t, isAllDay: false, hour: h };
}

function hourLabel(h) {
  const ampm = h >= 12 ? "PM" : "AM";
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:00 ${ampm}`;
}

function renderTimetable() {
  const grid = document.getElementById("daySplitGrid");
  if (!grid) return;
  const dayEvents = EVENTS.filter((e) => e.date === currentDay);
  if (dayEvents.length === 0) {
    grid.innerHTML = `<div class="day-empty">No events scheduled for this day.</div>`;
    return;
  }

  const allDay = [];
  const buckets = new Map();
  dayEvents.forEach((e) => {
    const t = parseTime(e.time);
    if (t.isAllDay) {
      allDay.push(e);
    } else {
      if (!buckets.has(t.hour)) buckets.set(t.hour, []);
      buckets.get(t.hour).push({ ev: e, t });
    }
  });

  const hours = [...buckets.keys()].sort((a, b) => a - b);

  let html = `
    <div class="timetable">
      <div class="timetable-head">
        <i class="fa-regular fa-clock"></i>
        <span>Timetable · ${currentDay}</span>
      </div>
  `;

  if (allDay.length > 0) {
    html += `
      <div class="tt-block tt-block-allday">
        <div class="tt-time">
          <span class="tt-time-main">All</span>
          <span class="tt-time-sub">Day</span>
        </div>
        <div class="tt-events">
          ${allDay.map(eventChip).join("")}
        </div>
      </div>
    `;
  }

  hours.forEach((h) => {
    const items = buckets.get(h).sort((a, b) => a.t.mins - b.t.mins);
    const label = hourLabel(h);
    const [mainLabel, subLabel] = label.split(" ");
    html += `
      <div class="tt-block">
        <div class="tt-time">
          <span class="tt-time-main">${mainLabel}</span>
          <span class="tt-time-sub">${subLabel}</span>
        </div>
        <div class="tt-events">
          ${items.map(({ ev, t }) => eventChip(ev, t.label)).join("")}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  grid.innerHTML = html;

  grid.querySelectorAll(".tt-event").forEach((row) => {
    row.addEventListener("click", () => openModal(row.dataset.slug));
  });
}

function eventChip(ev, exactTime) {
  const d = getDomain(ev.domain);
  return `
    <button class="tt-event" data-slug="${ev.slug}" style="--accent-color: ${d.color};">
      <span class="tt-event-domain">
        <i class="fa-solid ${d.icon}"></i>
        <span>${d.name}</span>
      </span>
      <span class="tt-event-name">${ev.name}</span>
      <span class="tt-event-meta">
        ${exactTime ? `<span><i class="fa-regular fa-clock"></i> ${exactTime}</span>` : ""}
        <span><i class="fa-solid fa-location-dot"></i> ${ev.venue}</span>
      </span>
    </button>
  `;
}

// ----- Modal -----
function openModal(slug) {
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return;
  const d = getDomain(event.domain);
  const modal = document.getElementById("eventModal");
  const content = document.getElementById("eventModalContent");
  content.style.setProperty("--accent-color", d.color);
  content.innerHTML = `
    <button class="modal-close" aria-label="Close">&times;</button>
    <div class="modal-domain">${d.name}</div>
    <h2 class="modal-title">${event.name}</h2>
    <p class="modal-desc">${event.desc}</p>
    <div class="modal-meta">
      <div class="modal-meta-item">
        <div class="modal-meta-label">Date</div>
        <div class="modal-meta-value">${event.date}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Time</div>
        <div class="modal-meta-value">${event.time}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Venue</div>
        <div class="modal-meta-value">${event.venue}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Team Size</div>
        <div class="modal-meta-value">${event.teamSize}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Entry Fee</div>
        <div class="modal-meta-value">&#8377;${event.fee}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Status</div>
        <div class="modal-meta-value" style="color: var(--accent-gold);">Open</div>
      </div>
    </div>
    <div class="modal-actions">
      <a class="btn btn-primary" href="${event.formUrl}" target="_blank" rel="noopener">
        <i class="fa-solid fa-flag-checkered"></i> Register Now
      </a>
      <a class="btn btn-ghost" href="${event.rulesUrl}" target="_blank" rel="noopener">
        <i class="fa-solid fa-book"></i> Rules &amp; R.
      </a>
      <button class="btn btn-ghost" data-close>Close</button>
    </div>
  `;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.querySelector("[data-close]").addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.getElementById("eventModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function setupModalDismiss() {
  const modal = document.getElementById("eventModal");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}

initShell({ withLoader: false }).then(() => {
  renderDayCards();
  renderTimetable();
  renderFilters();
  renderGrid();
  setupModalDismiss();
});
