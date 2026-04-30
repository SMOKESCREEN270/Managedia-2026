import { initShell } from "./shared.js";
import { EVENTS, getDomain } from "./data.js";

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

function isPlaceholder(url) {
  return !url || url.includes("REPLACE_");
}

function renderEvent(event) {
  const d = getDomain(event.domain);
  document.title = `Register · ${event.name} — TAKEOVER 2026`;

  const header = document.getElementById("eventHeader");
  if (header) header.style.borderBottom = `2px solid ${d.color}`;

  const domainEl = document.getElementById("eventDomain");
  if (domainEl) {
    domainEl.textContent = d.name;
    domainEl.style.color = d.color;
  }
  const nameEl = document.getElementById("eventName");
  if (nameEl) nameEl.textContent = event.name;

  const info = document.getElementById("eventInfo");
  if (info) {
    info.innerHTML = `
      <div class="modal-meta" style="margin-bottom: 30px;">
        <div class="modal-meta-item"><div class="modal-meta-label">Date</div><div class="modal-meta-value">${event.date}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Time</div><div class="modal-meta-value">${event.time}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Venue</div><div class="modal-meta-value">${event.venue}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Team Size</div><div class="modal-meta-value">${event.teamSize}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Entry Fee</div><div class="modal-meta-value" style="color: ${d.color};">₹${event.fee}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Description</div><div class="modal-meta-value" style="font-size: 13px; line-height: 1.5;">${event.desc}</div></div>
      </div>
    `;
  }

  // Rules & Form CTA buttons
  const rulesBtn = document.getElementById("rulesBtn");
  const registerBtn = document.getElementById("registerBtn");

  if (rulesBtn) {
    rulesBtn.href = event.rulesUrl;
    if (isPlaceholder(event.rulesUrl)) {
      rulesBtn.classList.add("placeholder");
      rulesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert(
          "Rules & Regulations link not configured yet for this event.\n\n" +
          "Add it in src/data.js → EVENT_LINKS:\n" +
          `  "${event.slug}": { rulesUrl: "https://docs.google.com/document/d/.../view" }`
        );
      });
    }
  }

  if (registerBtn) {
    registerBtn.href = event.formUrl;
    if (isPlaceholder(event.formUrl)) {
      registerBtn.classList.add("placeholder");
      registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert(
          "Registration form not configured yet for this event.\n\n" +
          "Add it in src/data.js → EVENT_LINKS:\n" +
          `  "${event.slug}": { formUrl: "https://docs.google.com/forms/d/e/.../viewform" }`
        );
      });
    }
  }
}

initShell({ withLoader: false }).then(() => {
  const slug = getSlug();
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) {
    document.getElementById("eventName").textContent = "Event not found";
    document.getElementById("eventDomain").textContent = "";
    document.getElementById("eventActions").style.display = "none";
    return;
  }
  renderEvent(event);
});
