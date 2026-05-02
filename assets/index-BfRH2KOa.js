import{i as T,s as w,H as m,C as $,A as d,T as B}from"./shared-BF3-9v1s.js";function h(t){return String(t).padStart(2,"0")}function I(){const t=document.getElementById("countdown");if(!t)return;const n=Math.max(0,B-Date.now()),c=Math.floor(n/(1e3*60*60*24)),r=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),e=Math.floor(n%(1e3*60*60)/(1e3*60)),a=Math.floor(n%(1e3*60)/1e3);t.innerHTML=`
    <span class="seg"><span class="num">${h(c)}</span><span class="label">Days</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${h(r)}</span><span class="label">Hours</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${h(e)}</span><span class="label">Mins</span></span>
    <span class="colon">:</span>
    <span class="seg"><span class="num">${h(a)}</span><span class="label">Secs</span></span>
  `}function x(){const t=document.getElementById("historyTrack");if(!t)return;const n=m.map((s,i)=>`
    <div class="history-slide${i===0?" active":""}" data-idx="${i}">
      <img class="history-bg" src="${s.media}" alt="${s.title} — ${s.year}" loading="lazy" />
      <div class="history-shade"></div>
      <div class="history-slide-content">
        <div class="history-year"><span class="metal">🤘</span> ${s.year}</div>
        <div class="history-title">${s.title}</div>
        <div class="history-desc">${s.desc}</div>
      </div>
    </div>
  `).join(""),c=m.map((s,i)=>`
    <button class="history-dot${i===0?" active":""}" data-idx="${i}" aria-label="Show ${s.year} ${s.title}">
      <span class="history-dot-year">${s.year}</span>
    </button>
  `).join("");t.innerHTML=`
    <div class="history-stage">
      ${n}
      <button class="history-nav prev" aria-label="Previous">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="history-nav next" aria-label="Next">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <div class="history-progress"><div class="history-progress-bar"></div></div>
    </div>
    <div class="history-dots">${c}</div>
  `;const r=m.length;let e=0,a=null,l=!1;const u=5e3,S=t.querySelectorAll(".history-slide"),g=t.querySelectorAll(".history-dot"),o=t.querySelector(".history-progress-bar");function p(s){e=(s+r)%r,S.forEach((i,v)=>i.classList.toggle("active",v===e)),g.forEach((i,v)=>i.classList.toggle("active",v===e)),f()}function E(){p(e+1)}function L(){p(e-1)}function f(){o&&(o.style.transition="none",o.style.width="0%",o.offsetWidth,o.style.transition=`width ${u}ms linear`,o.style.width=l?"0%":"100%")}function y(){C(),a=setInterval(()=>{l||E()},u),f()}function C(){a&&(clearInterval(a),a=null)}t.querySelector(".history-nav.next").addEventListener("click",()=>{E(),y()}),t.querySelector(".history-nav.prev").addEventListener("click",()=>{L(),y()}),g.forEach(s=>{s.addEventListener("click",()=>{p(parseInt(s.dataset.idx,10)),y()})});const b=t.querySelector(".history-stage");b.addEventListener("mouseenter",()=>{l=!0,o&&(o.style.width=getComputedStyle(o).width)}),b.addEventListener("mouseleave",()=>{l=!1,f()}),y()}function k(){const t=document.getElementById("brochureLink");t&&(t.href=$.brochure);const n=document.getElementById("socialsLink");n&&(n.href=$.instagram);const c=document.getElementById("architectCard"),r=document.getElementById("architectName"),e=document.getElementById("architectRole"),a=document.getElementById("architectBlurb"),l=document.getElementById("architectCta");if(d){r&&(r.textContent=d.name),e&&(e.textContent=d.role),a&&(a.textContent=d.blurb);const u=d.instagram;c&&(c.href=u),l&&(l.textContent="Say hi on Instagram →")}}T({withLoader:!0}).then(()=>{I(),setInterval(I,1e3),x(),k(),w()});
