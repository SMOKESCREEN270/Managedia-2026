import{i as c,E as r,g as v}from"./shared-BF3-9v1s.js";function u(){return new URLSearchParams(window.location.search).get("slug")}function m(e){return!e||e.includes("REPLACE_")}function f(e){const t=v(e.domain);document.title=`Register · ${e.name} — TAKEOVER 2026`;const l=document.getElementById("eventHeader");l&&(l.style.borderBottom=`2px solid ${t.color}`);const i=document.getElementById("eventDomain");i&&(i.textContent=t.name,i.style.color=t.color);const s=document.getElementById("eventName");s&&(s.textContent=e.name);const n=document.getElementById("eventInfo");n&&(n.innerHTML=`
      <div class="modal-meta" style="margin-bottom: 30px;">
        <div class="modal-meta-item"><div class="modal-meta-label">Date</div><div class="modal-meta-value">${e.date}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Time</div><div class="modal-meta-value">${e.time}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Venue</div><div class="modal-meta-value">${e.venue}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Team Size</div><div class="modal-meta-value">${e.teamSize}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Entry Fee</div><div class="modal-meta-value" style="color: ${t.color};">₹${e.fee}</div></div>
        <div class="modal-meta-item"><div class="modal-meta-label">Description</div><div class="modal-meta-value" style="font-size: 13px; line-height: 1.5;">${e.desc}</div></div>
      </div>
    `);const a=document.getElementById("rulesBtn"),d=document.getElementById("registerBtn");a&&(a.href=e.rulesUrl,m(e.rulesUrl)&&(a.classList.add("placeholder"),a.addEventListener("click",o=>{o.preventDefault(),alert(`Rules & Regulations link not configured yet for this event.

Add it in src/data.js → EVENT_LINKS:
  "${e.slug}": { rulesUrl: "https://docs.google.com/document/d/.../view" }`)}))),d&&(d.href=e.formUrl,m(e.formUrl)&&(d.classList.add("placeholder"),d.addEventListener("click",o=>{o.preventDefault(),alert(`Registration form not configured yet for this event.

Add it in src/data.js → EVENT_LINKS:
  "${e.slug}": { formUrl: "https://docs.google.com/forms/d/e/.../viewform" }`)})))}c({withLoader:!1}).then(()=>{const e=u(),t=r.find(l=>l.slug===e);if(!t){document.getElementById("eventName").textContent="Event not found",document.getElementById("eventDomain").textContent="",document.getElementById("eventActions").style.display="none";return}f(t)});
