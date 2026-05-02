import{i as L,E as o,D,g as p}from"./shared-BF3-9v1s.js";let c="all",r="11 May";const A=["11 May","12 May","13 May","14 May","15 May"];function y(){const t=document.getElementById("eventsFilters");if(!t)return;const a=[{id:"all",name:"All"},...D];t.innerHTML=a.map(e=>{const s=e.id==="all"?"var(--accent-red)":e.color;return`
      <button class="filter-chip${e.id===c?" active":""}" data-filter="${e.id}" style="--chip-color: ${s};">
        ${e.name}
      </button>
    `}).join(""),t.addEventListener("click",e=>{const s=e.target.closest(".filter-chip");s&&(c=s.dataset.filter,y(),g())},{once:!1})}function g(){const t=document.getElementById("eventsGrid");if(!t)return;const a=c==="all"?o:o.filter(e=>e.domain===c);t.innerHTML=a.map(e=>{const s=p(e.domain);return`
      <div class="event-tile" data-slug="${e.slug}" style="--accent-color: ${s.color};">
        <div class="event-tile-domain"><i class="fa-solid ${s.icon}" aria-hidden="true"></i> ${s.name}</div>
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
    `}).join(""),t.querySelectorAll(".event-tile").forEach(e=>{e.addEventListener("click",s=>{s.target.closest(".event-tile-btn")||f(e.dataset.slug)})}),t.querySelectorAll(".event-tile-btn").forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const n=e.dataset.slug,d=e.dataset.action,l=o.find(i=>i.slug===n);l&&(d==="register"?window.open(l.formUrl,"_blank","noopener"):f(n))})})}function $(){const t=document.getElementById("dayTabs");t&&(t.innerHTML=A.map((a,e)=>{const s=a.split(" ")[0],n=o.filter(d=>d.date===a).length;return`
      <button class="day-card${a===r?" active":""}" data-day="${a}" aria-label="Day ${e+1}, ${a}, ${n} events">
        <span class="day-card-label">DAY</span>
        <span class="day-card-num">${e+1}</span>
        <span class="day-card-date">${s} MAY</span>
        <span class="day-card-count">${n} events</span>
      </button>
    `}).join(""),t.addEventListener("click",a=>{const e=a.target.closest(".day-card");e&&(r=e.dataset.day,$(),h())}))}function S(t){if(!t)return{mins:-1,label:"",isAllDay:!1};if(/all day/i.test(t))return{mins:-1,label:"All Day",isAllDay:!0};const a=t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);if(!a)return{mins:-1,label:t,isAllDay:!1};let e=parseInt(a[1],10);const s=parseInt(a[2],10),n=(a[3]||"").toUpperCase();return n==="PM"&&e<12&&(e+=12),n==="AM"&&e===12&&(e=0),{mins:e*60+s,label:t,isAllDay:!1,hour:e}}function T(t){const a=t>=12?"PM":"AM";let e=t%12;return e===0&&(e=12),`${e}:00 ${a}`}function h(){const t=document.getElementById("daySplitGrid");if(!t)return;const a=o.filter(l=>l.date===r);if(a.length===0){t.innerHTML='<div class="day-empty">No events scheduled for this day.</div>';return}const e=[],s=new Map;a.forEach(l=>{const i=S(l.time);i.isAllDay?e.push(l):(s.has(i.hour)||s.set(i.hour,[]),s.get(i.hour).push({ev:l,t:i}))});const n=[...s.keys()].sort((l,i)=>l-i);let d=`
    <div class="timetable">
      <div class="timetable-head">
        <i class="fa-regular fa-clock"></i>
        <span>Timetable · ${r}</span>
      </div>
  `;e.length>0&&(d+=`
      <div class="tt-block tt-block-allday">
        <div class="tt-time">
          <span class="tt-time-main">All</span>
          <span class="tt-time-sub">Day</span>
        </div>
        <div class="tt-events">
          ${e.map(b).join("")}
        </div>
      </div>
    `),n.forEach(l=>{const i=s.get(l).sort((v,u)=>v.t.mins-u.t.mins),E=T(l),[M,k]=E.split(" ");d+=`
      <div class="tt-block">
        <div class="tt-time">
          <span class="tt-time-main">${M}</span>
          <span class="tt-time-sub">${k}</span>
        </div>
        <div class="tt-events">
          ${i.map(({ev:v,t:u})=>b(v,u.label)).join("")}
        </div>
      </div>
    `}),d+="</div>",t.innerHTML=d,t.querySelectorAll(".tt-event").forEach(l=>{l.addEventListener("click",()=>f(l.dataset.slug))})}function b(t,a){const e=p(t.domain);return`
    <button class="tt-event" data-slug="${t.slug}" style="--accent-color: ${e.color};">
      <span class="tt-event-domain">
        <i class="fa-solid ${e.icon}"></i>
        <span>${e.name}</span>
      </span>
      <span class="tt-event-name">${t.name}</span>
      <span class="tt-event-meta">
        ${a?`<span><i class="fa-regular fa-clock"></i> ${a}</span>`:""}
        <span><i class="fa-solid fa-location-dot"></i> ${t.venue}</span>
      </span>
    </button>
  `}function f(t){const a=o.find(d=>d.slug===t);if(!a)return;const e=p(a.domain),s=document.getElementById("eventModal"),n=document.getElementById("eventModalContent");n.style.setProperty("--accent-color",e.color),n.innerHTML=`
    <button class="modal-close" aria-label="Close">&times;</button>
    <div class="modal-domain">${e.name}</div>
    <h2 class="modal-title">${a.name}</h2>
    <p class="modal-desc">${a.desc}</p>
    <div class="modal-meta">
      <div class="modal-meta-item">
        <div class="modal-meta-label">Date</div>
        <div class="modal-meta-value">${a.date}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Time</div>
        <div class="modal-meta-value">${a.time}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Venue</div>
        <div class="modal-meta-value">${a.venue}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Team Size</div>
        <div class="modal-meta-value">${a.teamSize}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Entry Fee</div>
        <div class="modal-meta-value">&#8377;${a.fee}</div>
      </div>
      <div class="modal-meta-item">
        <div class="modal-meta-label">Status</div>
        <div class="modal-meta-value" style="color: var(--accent-gold);">Open</div>
      </div>
    </div>
    <div class="modal-actions">
      <a class="btn btn-primary" href="${a.formUrl}" target="_blank" rel="noopener">
        <i class="fa-solid fa-flag-checkered"></i> Register Now
      </a>
      <a class="btn btn-ghost" href="${a.rulesUrl}" target="_blank" rel="noopener">
        <i class="fa-solid fa-book"></i> Rules &amp; R.
      </a>
      <button class="btn btn-ghost" data-close>Close</button>
    </div>
  `,s.classList.add("active"),document.body.style.overflow="hidden",s.querySelector(".modal-close").addEventListener("click",m),s.querySelector("[data-close]").addEventListener("click",m)}function m(){document.getElementById("eventModal").classList.remove("active"),document.body.style.overflow=""}function I(){const t=document.getElementById("eventModal");t.addEventListener("click",a=>{a.target===t&&m()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&t.classList.contains("active")&&m()})}L({withLoader:!1}).then(()=>{$(),h(),y(),g(),I()});
