const ACCENT = {
  sf: "var(--acc-sf)",
  la: "var(--acc-la)",
  vegas: "var(--acc-vegas)",
  page: "var(--acc-page)",
  chicago: "var(--acc-chicago)",
  sd: "var(--acc-sd)"
};
const CITY_LABEL = { sf: "SF", la: "LA", vegas: "LV", page: "PGA", chicago: "CHI", sd: "SD" };

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function fmtDate(iso){
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("it-IT", { day:"numeric", month:"short" });
}
function fmtDateFull(iso){
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("it-IT", { weekday:"long", day:"numeric", month:"long" });
}
function mapsUrl(query){
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

function todayISO(){
  const d = new Date();
  return d.toISOString().slice(0,10);
}

// ---------- Trova la tappa/evento corrente e il prossimo ----------
function getAllTransportEvents(){
  const events = [];
  TRIP.legs.forEach(leg => {
    (leg.transport||[]).forEach(t => events.push({ ...t, legId: leg.id, legCity: leg.city, accent: leg.accent }));
  });
  return events.sort((a,b) => (a.date+  (a.time||"")).localeCompare(b.date + (b.time||"")));
}

function getCurrentLeg(){
  const t = todayISO();
  return TRIP.legs.find(l => t >= l.dateFrom && t < l.dateTo) || null;
}

function getNextHappening(){
  const t = todayISO();
  const events = getAllTransportEvents();
  const upcoming = events.find(e => e.date >= t);
  if (upcoming) return { kind:"transport", data: upcoming };
  const currentLeg = getCurrentLeg();
  if (currentLeg) return { kind:"stay", data: currentLeg };
  // viaggio non ancora iniziato o già finito -> prossima tappa futura o nessuna
  const nextLeg = TRIP.legs.find(l => l.dateFrom >= t);
  if (nextLeg) return { kind:"stay", data: nextLeg };
  return null;
}

function daysUntil(iso){
  const t = new Date(todayISO()+"T00:00:00");
  const d = new Date(iso+"T00:00:00");
  return Math.round((d - t) / 86400000);
}

// ---------- Rendering: Home ----------
function renderHome(){
  const el = $("#screen-home");
  const next = getNextHappening();
  let nextHtml = "";
  if (next){
    if (next.kind === "transport"){
      const n = daysUntil(next.data.date);
      const when = n === 0 ? "Oggi" : n === 1 ? "Domani" : n > 1 ? `Tra ${n} giorni` : "";
      nextHtml = `
        <div class="next-card">
          <div class="tag">Prossimo evento</div>
          <h2>${next.data.title}</h2>
          <div class="meta">${fmtDateFull(next.data.date)} · ${next.data.time}</div>
          <div class="meta">${next.data.subtitle||""}</div>
          <div class="countdown">${when}</div>
        </div>`;
    } else {
      const n = daysUntil(next.data.dateFrom);
      const started = todayISO() >= next.data.dateFrom;
      const when = started ? "In corso ora" : n === 0 ? "Oggi" : n === 1 ? "Domani" : `Tra ${n} giorni`;
      nextHtml = `
        <div class="next-card">
          <div class="tag">${started ? "Ora sei a" : "Prossima tappa"}</div>
          <h2>${next.data.city}</h2>
          <div class="meta">${fmtDate(next.data.dateFrom)} – ${fmtDate(next.data.dateTo)}</div>
          <div class="meta">${next.data.hotel?.name || ""}</div>
          <div class="countdown">${when}</div>
        </div>`;
    }
  } else {
    nextHtml = `<div class="empty-note">Nessun evento in programma trovato.</div>`;
  }

  el.innerHTML = `
    <div class="section-title">Il tuo viaggio</div>
    ${nextHtml}
    <div class="section-title">Tappe</div>
    ${TRIP.legs.map(leg => cityCardHtml(leg)).join("")}
  `;
  bindCityCardClicks(el);
}

function cityCardHtml(leg){
  const active = getCurrentLeg() && getCurrentLeg().id === leg.id;
  const done = leg.dateTo <= todayISO();
  return `
    <div class="city-card" data-leg="${leg.id}">
      <div class="swatch" style="background:${ACCENT[leg.accent]}"></div>
      <div class="ccontent">
        <div class="cname">${leg.city} ${active ? "· ora" : ""}</div>
        <div class="cdates">${fmtDate(leg.dateFrom)} – ${fmtDate(leg.dateTo)}</div>
        <div class="chotel">${leg.hotel?.name || ""}</div>
      </div>
      <div class="chev">›</div>
    </div>`;
}

function bindCityCardClicks(root){
  $$(".city-card", root).forEach(card => {
    card.addEventListener("click", () => openCity(card.dataset.leg));
  });
}

// ---------- Rendering: Route strip ----------
function renderRouteStrip(){
  const el = $("#route-strip");
  const t = todayISO();
  el.innerHTML = TRIP.legs.map((leg, i) => {
    const active = t >= leg.dateFrom && t < leg.dateTo;
    const done = leg.dateTo <= t;
    const track = i < TRIP.legs.length - 1 ? `<div class="route-track"></div>` : "";
    return `
      <button class="route-stop ${active?"active":""} ${done?"done":""}" data-leg="${leg.id}">
        <div class="dot" style="${active?`background:${ACCENT[leg.accent]};border-color:${ACCENT[leg.accent]}`:""}"></div>
        <div class="rs-label">${CITY_LABEL[leg.accent]}</div>
        <div class="rs-date">${fmtDate(leg.dateFrom)}</div>
      </button>
      ${track}
    `;
  }).join("");
  $$(".route-stop", el).forEach(btn => btn.addEventListener("click", () => openCity(btn.dataset.leg)));
}

// ---------- Rendering: Città (elenco) ----------
function renderCitiesList(){
  const el = $("#screen-cities");
  el.innerHTML = `
    <div class="section-title">Tutte le tappe</div>
    ${TRIP.legs.map(leg => cityCardHtml(leg)).join("")}
  `;
  bindCityCardClicks(el);
}

// ---------- Rendering: dettaglio città ----------
function openCity(legId){
  const leg = TRIP.legs.find(l => l.id === legId);
  if (!leg) return;
  const el = $("#screen-city-detail");

  const transportHtml = (leg.transport||[]).map(t => `
    <div class="ticket">
      <div class="accent-bar" style="background:${ACCENT[leg.accent]}"></div>
      <div class="stub-top">
        <div>
          <div class="stitle">${t.title}</div>
          <div class="ssub">${t.subtitle||""}</div>
        </div>
        <span class="pill">${fmtDate(t.date)}</span>
      </div>
      <div class="stub-bottom">
        <span>${t.time}${t.arriveTime ? " → " + t.arriveTime : ""}</span>
        <a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(t.mapsQuery || leg.city)}">Apri Maps</a>
      </div>
      ${t.arriveNote ? `<div style="padding:0 16px 14px;font-size:12px;color:var(--ink-soft)">${t.arriveNote}</div>` : ""}
    </div>
  `).join("");

  const sectionBlock = (title, items, emptyText, renderItem) => `
    <div class="section-title">${title}</div>
    ${items && items.length ? items.map(renderItem).join("") : `<div class="empty-note">${emptyText}</div>`}
  `;

  el.innerHTML = `
    <button class="back-btn" id="back-to-cities">‹ Tutte le tappe</button>
    <div class="city-header" style="background:${ACCENT[leg.accent]}">
      <h2>${leg.city}</h2>
      <div class="cd-dates">${fmtDate(leg.dateFrom)} – ${fmtDate(leg.dateTo)}</div>
      <div class="cd-hotel">🏨 ${leg.hotel?.name || "Hotel da definire"}</div>
    </div>

    <div class="section-title">Trasporti</div>
    ${transportHtml || `<div class="empty-note">Nessun trasporto registrato per questa tappa.</div>`}

    ${sectionBlock("Cose da fare", leg.activities, "Aggiungeremo qui attività ed esperienze a " + leg.city + ".", a => `
      <div class="activity-card">
        <div class="activity-icon">${a.icon || "✨"}</div>
        <div class="activity-content">
          <div class="activity-topline">
            <div class="activity-title">${a.name}</div>
            ${a.status ? `<span class="status-pill ${a.status === "Prenotato" ? "booked" : "planned"}">${a.status}</span>` : ""}
          </div>
          <div class="activity-datetime">📅 ${fmtDateFull(a.date)}${a.time ? ` · 🕒 ${a.time}` : ""}</div>
          <div class="activity-note">${a.note || ""}</div>
          <a class="mapbtn activity-map" target="_blank" rel="noopener" href="${mapsUrl(a.mapsQuery || a.name)}">📍 Apri in Maps</a>
        </div>
      </div>
    `)}

    ${sectionBlock("Da vedere", leg.places, "Aggiungeremo qui i luoghi da visitare a " + leg.city + ".", p => `
      <div class="ticket"><div class="stub-top"><div><div class="stitle">${p.name}</div><div class="ssub">${p.note||""}</div></div></div>
      <div class="stub-bottom"><span></span><a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(p.mapsQuery||p.name)}">Apri Maps</a></div></div>
    `)}

    ${sectionBlock("Dove mangiare", leg.restaurants, "Aggiungeremo qui i ristoranti selezionati a " + leg.city + ".", r => `
      <div class="ticket"><div class="stub-top"><div><div class="stitle">${r.name}</div><div class="ssub">${r.note||""}</div></div></div>
      <div class="stub-bottom"><span></span><a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(r.mapsQuery||r.name)}">Apri Maps</a></div></div>
    `)}

    ${sectionBlock("Biglietti", leg.tickets, "Nessun biglietto caricato per questa tappa.", tk => `
      <div class="ticket"><div class="stub-top"><div><div class="stitle">${tk.name}</div><div class="ssub">${tk.note||""}</div></div>${tk.status ? `<span class="pill">${tk.status}</span>` : ""}</div></div>
    `)}
  `;
  $("#back-to-cities").addEventListener("click", () => showScreen("cities"));
  showScreen("city-detail");
}

// ---------- Navigazione a schermate ----------
function showScreen(name){
  $$(".screen").forEach(s => s.classList.remove("active"));
  $("#screen-" + name).classList.add("active");
  $$("nav.tabbar button").forEach(b => b.classList.toggle("active", b.dataset.screen === name));
  window.scrollTo(0,0);
}

// ---------- Stato offline ----------
function updateOnlineBadge(){
  const badge = $("#offline-badge");
  if (navigator.onLine){ badge.classList.remove("show"); }
  else { badge.classList.add("show"); }
}

// ---------- Init ----------
function init(){
  $("#trip-title").textContent = TRIP.title;
  $("#trip-sub").textContent = TRIP.subtitle;

  renderRouteStrip();
  renderHome();
  renderCitiesList();

  $$("nav.tabbar button").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.screen;
      if (target === "home") renderHome();
      if (target === "cities") renderCitiesList();
      showScreen(target);
    });
  });

  window.addEventListener("online", updateOnlineBadge);
  window.addEventListener("offline", updateOnlineBadge);
  updateOnlineBadge();

  if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  }
}

document.addEventListener("DOMContentLoaded", init);
