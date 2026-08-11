const ACCENT = {
  sf: "var(--acc-sf)",
  la: "var(--acc-la)",
  vegas: "var(--acc-vegas)",
  page: "var(--acc-page)",
  chicago: "var(--acc-chicago)",
  sd: "var(--acc-sd)"
};
const CITY_LABEL = {
  sf: "San Francisco",
  la: "Los Angeles",
  vegas: "Las Vegas",
  page: "Page",
  chicago: "Chicago",
  sd: "Bayahibe"
};

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
function itemMapsUrl(item, fallbackQuery){
  return item && item.mapsUrl ? item.mapsUrl : mapsUrl((item && item.mapsQuery) || fallbackQuery);
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


// ---------- Orologi Home ----------
const HOME_CLOCKS = [
  { label: "Italia", zone: "Europe/Rome", flag: "🇮🇹" },
  { label: "California", zone: "America/Los_Angeles", flag: "🇺🇸" },
  { label: "Chicago", zone: "America/Chicago", flag: "🇺🇸" },
  { label: "Bayahibe", zone: "America/Santo_Domingo", flag: "🇩🇴" }
];

function clockTime(zone){
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

function clockDate(zone){
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: zone,
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(new Date());
}

function clocksHtml(){
  return `
    <div class="world-clock-grid">
      ${HOME_CLOCKS.map((c, i) => `
        <div class="world-clock-card" data-clock-index="${i}">
          <div class="world-clock-place"><span>${c.flag}</span>${c.label}</div>
          <div class="world-clock-time">--:--:--</div>
          <div class="world-clock-date">---</div>
        </div>`).join("")}
    </div>`;
}

function updateHomeClocks(){
  $$(".world-clock-card").forEach(card => {
    const c = HOME_CLOCKS[Number(card.dataset.clockIndex)];
    if (!c) return;
    const timeEl = $(".world-clock-time", card);
    const dateEl = $(".world-clock-date", card);
    if (timeEl) timeEl.textContent = clockTime(c.zone);
    if (dateEl) dateEl.textContent = clockDate(c.zone);
  });
}

let homeClockTimer = null;
function startHomeClocks(){
  updateHomeClocks();
  if (!homeClockTimer){
    homeClockTimer = setInterval(updateHomeClocks, 1000);
  }
}

function daysUntil(iso){
  const t = new Date(todayISO()+"T00:00:00");
  const d = new Date(iso+"T00:00:00");
  return Math.round((d - t) / 86400000);
}

// ---------- Rendering: Home ----------
function renderHome(){
  const el = $("#screen-home");

  el.innerHTML = `
    <div class="timezone-box">
      <div class="timezone-box-title">Fusi Orari</div>
      ${clocksHtml()}
    </div>

    <div class="route-strip home-route-strip" id="route-strip"></div>

    <div class="section-title">Tappe</div>
    ${TRIP.legs.map(leg => cityCardHtml(leg)).join("")}
  `;

  renderRouteStrip();
  bindCityCardClicks(el);
  startHomeClocks();
}

function cityCardHtml(leg){
  const active = getCurrentLeg() && getCurrentLeg().id === leg.id;
  const done = leg.dateTo <= todayISO();
  return `
    <div class="city-card photo-city-card" data-leg="${leg.id}" style="background-image:linear-gradient(180deg, rgba(10,18,32,.05) 18%, rgba(10,18,32,.82) 100%), url('${leg.image || ""}')">
      <div class="city-card-content">
        <div class="city-card-kicker">${active ? "Tappa attuale" : "Tappa"}</div>
        <div class="cname">${leg.city}</div>
        <div class="cdates">${fmtDate(leg.dateFrom)} – ${fmtDate(leg.dateTo)}</div>
      </div>
      <div class="city-card-arrow">›</div>
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


// ---------- Biglietti locali (IndexedDB) ----------
const TICKET_DB_NAME = "viaggio-nozze-local";
const TICKET_DB_VERSION = 1;
const TICKET_STORE = "tickets";

function openTicketDb(){
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(TICKET_DB_NAME, TICKET_DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(TICKET_STORE)){
        const store = db.createObjectStore(TICKET_STORE, { keyPath: "id", autoIncrement: true });
        store.createIndex("legId", "legId", { unique:false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveLocalTicket(legId, file, label=""){
  const db = await openTicketDb();
  const rec = {
    legId,
    label: label || file.name,
    fileName: file.name,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    createdAt: Date.now(),
    blob: file
  };
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TICKET_STORE, "readwrite");
    const req = tx.objectStore(TICKET_STORE).add(rec);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getLocalTickets(legId){
  const db = await openTicketDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TICKET_STORE, "readonly");
    const idx = tx.objectStore(TICKET_STORE).index("legId");
    const req = idx.getAll(legId);
    req.onsuccess = () => resolve((req.result || []).sort((a,b)=>a.createdAt-b.createdAt));
    req.onerror = () => reject(req.error);
  });
}

async function getLocalTicket(id){
  const db = await openTicketDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TICKET_STORE, "readonly");
    const req = tx.objectStore(TICKET_STORE).get(Number(id));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function deleteLocalTicket(id){
  const db = await openTicketDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TICKET_STORE, "readwrite");
    const req = tx.objectStore(TICKET_STORE).delete(Number(id));
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function formatFileSize(bytes){
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + " KB";
  return (bytes/(1024*1024)).toFixed(1) + " MB";
}

async function renderLocalTickets(legId){
  const host = $("#local-tickets-" + legId);
  if (!host) return;
  try {
    const tickets = await getLocalTickets(legId);
    if (!tickets.length){
      host.innerHTML = `<div class="local-ticket-empty">Nessun file salvato sul telefono.</div>`;
      return;
    }
    host.innerHTML = tickets.map(t => `
      <div class="local-ticket-card">
        <div class="local-ticket-icon">${t.mimeType.includes("pdf") ? "📄" : "🎟️"}</div>
        <div class="local-ticket-info">
          <div class="local-ticket-name">${t.label || t.fileName}</div>
          <div class="local-ticket-meta">${t.fileName} · ${formatFileSize(t.size)}</div>
          <div class="local-ticket-actions">
            <button class="local-ticket-open" data-ticket-open="${t.id}">Apri</button>
            <button class="local-ticket-delete" data-ticket-delete="${t.id}">Elimina</button>
          </div>
        </div>
      </div>`).join("");

    $$("[data-ticket-open]", host).forEach(btn => {
      btn.addEventListener("click", async () => {
        const rec = await getLocalTicket(btn.dataset.ticketOpen);
        if (!rec) return;
        const url = URL.createObjectURL(rec.blob);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      });
    });

    $$("[data-ticket-delete]", host).forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("Eliminare questo biglietto dal telefono?")) return;
        await deleteLocalTicket(btn.dataset.ticketDelete);
        renderLocalTickets(legId);
      });
    });
  } catch(err){
    console.error(err);
    host.innerHTML = `<div class="local-ticket-empty">Impossibile leggere i biglietti locali.</div>`;
  }
}

function bindTicketImporter(leg){
  const input = $("#ticket-file-" + leg.id);
  const button = $("#ticket-import-" + leg.id);
  if (!input || !button) return;

  button.addEventListener("click", () => input.click());
  input.addEventListener("change", async () => {
    const files = Array.from(input.files || []);
    if (!files.length) return;
    button.disabled = true;
    button.textContent = "Salvataggio…";
    try {
      for (const file of files){
        await saveLocalTicket(leg.id, file, file.name.replace(/\.[^.]+$/, ""));
      }
      input.value = "";
      await renderLocalTickets(leg.id);
    } catch(err){
      console.error(err);
      alert("Non sono riuscito a salvare il file sul telefono.");
    } finally {
      button.disabled = false;
      button.textContent = "📎 Importa biglietto";
    }
  });
}

// ---------- Rendering: dettaglio città ----------
function openCity(legId, pushHistory=true){
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
    <div class="city-header photo-city-header" style="--city-accent:${ACCENT[leg.accent]}; background-image:linear-gradient(180deg, rgba(6,13,25,.08) 12%, rgba(6,13,25,.78) 100%), url('${leg.image || ""}')">
      <div class="city-header-content">
        <h2>${leg.city}</h2>
        <div class="cd-dates">${fmtDate(leg.dateFrom)} – ${fmtDate(leg.dateTo)}</div>
      </div>
    </div>

    <div class="section-title">Alloggio</div>
    ${leg.hotel && leg.hotel.name && !leg.hotel.name.toLowerCase().includes("da definire") ? `
      <div class="hotel-card">
        <div class="hotel-icon">🏨</div>
        <div class="hotel-content">
          <div class="hotel-name">${leg.hotel.name}</div>
          ${leg.hotel.address ? `<div class="hotel-address">${leg.hotel.address}</div>` : ""}
          <div class="hotel-dates">Check-in ${fmtDate(leg.hotel.checkin)} · Check-out ${fmtDate(leg.hotel.checkout)}</div>
          <a class="mapbtn hotel-map" target="_blank" rel="noopener" href="${leg.hotel.mapsUrl || mapsUrl(leg.hotel.name + ", " + leg.city)}">📍 Apri in Maps</a>
        </div>
      </div>` : `<div class="empty-note">Alloggio ancora da definire.</div>`}

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
          <a class="mapbtn activity-map" target="_blank" rel="noopener" href="${itemMapsUrl(a, a.name)}">📍 Apri in Maps</a>
        </div>
      </div>
    `)}

    ${sectionBlock("Da vedere", leg.places, "Aggiungeremo qui i luoghi da visitare a " + leg.city + ".", p => `
      <div class="ticket lf-ticket"><div class="stub-top"><div><div class="stitle">${p.name}</div><div class="ssub">${p.note||""}</div></div>${p.lf ? `<span class="lf-badge" title="Scelto da L&F">L&amp;F</span>` : ""}</div>
      <div class="stub-bottom"><span></span><a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(p.mapsQuery||p.name)}">Apri Maps</a></div></div>
    `)}

    <div class="section-title">Piatti tipici da assaggiare</div>
    ${leg.foods && leg.foods.length ? `
      <button class="food-section-link" data-food-leg="${leg.id}" data-food-id="${leg.foods[0].id}">
        <div class="food-section-icon">🍴</div>
        <div class="food-section-copy">
          <div class="food-section-title">Scopri le specialità locali</div>
          <div class="food-section-note">${leg.foods.map(f => f.name).join(" · ")}</div>
        </div>
        <div class="food-section-arrow">›</div>
      </button>` : `<div class="empty-note">Aggiungeremo qui le specialità locali.</div>`}

    ${sectionBlock("Dove mangiare", leg.restaurants, "Aggiungeremo qui i ristoranti selezionati a " + leg.city + ".", r => `
      <div class="ticket lf-ticket"><div class="stub-top"><div><div class="stitle">${r.name}</div><div class="ssub">${r.note||""}</div></div>${r.lf ? `<span class="lf-badge" title="Scelto da L&F">L&amp;F</span>` : ""}</div>
      <div class="stub-bottom"><span></span><a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(r.mapsQuery||r.name)}">Apri Maps</a></div></div>
    `)}

    <div class="section-title">Biglietti</div>
    ${leg.tickets && leg.tickets.length ? leg.tickets.map(tk => `
      <div class="ticket"><div class="stub-top"><div><div class="stitle">${tk.name}</div><div class="ssub">${tk.note||""}</div></div>${tk.status ? `<span class="pill">${tk.status}</span>` : ""}</div></div>
    `).join("") : `<div class="empty-note">Puoi salvare qui PDF, immagini e QR direttamente sul telefono.</div>`}

    <div class="ticket-import-box">
      <div class="ticket-import-title">Biglietti offline</div>
      <div class="ticket-import-note">I file restano solo su questo dispositivo e non vengono caricati su GitHub.</div>
      <input id="ticket-file-${leg.id}" class="ticket-file-input" type="file" accept=".pdf,image/*" multiple>
      <button id="ticket-import-${leg.id}" class="ticket-import-btn">📎 Importa biglietto</button>
      <div id="local-tickets-${leg.id}" class="local-tickets-list"></div>
    </div>
  `;
  $("#back-to-cities").addEventListener("click", () => history.back());
  $$(`[data-food-leg="${leg.id}"]`, el).forEach(btn => {
    btn.addEventListener("click", () => openFoodDetail(leg.id, btn.dataset.foodId));
  });
  bindTicketImporter(leg);
  renderLocalTickets(leg.id);
  navigateTo("city-detail", { legId: leg.id }, pushHistory);
}

// ---------- Navigazione a schermate / tasto Indietro Android ----------
function showScreen(name){
  $$(".screen").forEach(s => s.classList.remove("active"));
  const target = $("#screen-" + name);
  if (target) target.classList.add("active");
  $$("nav.tabbar button").forEach(b => b.classList.toggle("active", b.dataset.screen === name));
  window.scrollTo(0,0);
}

function navigateTo(screen, payload={}, push=true){
  const state = { screen, ...payload };
  if (push) history.pushState(state, "", "#" + screen);
  showScreen(screen);
}

function renderNavigationState(state){
  const st = state || { screen:"home" };
  if (st.screen === "city-detail" && st.legId){
    openCity(st.legId, false);
    return;
  }
  if (st.screen === "food-detail" && st.legId && st.foodId){
    openFoodDetail(st.legId, st.foodId, false);
    return;
  }
  if (st.screen === "cities") renderCitiesList();
  if (st.screen === "home") renderHome();
  showScreen(st.screen || "home");
}

function openFoodDetail(legId, foodId, pushHistory=true){
  const leg = TRIP.legs.find(l => l.id === legId);
  if (!leg || !leg.foods || !leg.foods.length) return;
  const selected = leg.foods.find(f => f.id === foodId) || leg.foods[0];
  const el = $("#screen-food-detail");

  el.innerHTML = `
    <button class="back-btn" id="back-from-food">‹ ${leg.city}</button>
    <div class="food-detail-hero">
      <img src="${selected.image || leg.image}" alt="${selected.name}" loading="eager">
      <div class="food-detail-overlay">
        <div class="food-detail-city">${leg.city}</div>
        <h2>${selected.name}</h2>
      </div>
    </div>
    <div class="food-detail-body">
      <p>${selected.description || selected.short || ""}</p>
      ${selected.photoCredit ? `<div class="photo-credit">Foto: ${selected.photoCredit}</div>` : ""}
    </div>
    ${leg.foods.length > 1 ? `
      <div class="section-title">Altre specialità da provare</div>
      <div class="food-list">
        ${leg.foods.map(food => `
          <button class="food-card ${food.id === selected.id ? "selected" : ""}" data-food-switch="${food.id}">
            <img src="${food.image || leg.image}" alt="${food.name}" loading="lazy">
            <div class="food-card-copy">
              <div class="food-card-name">${food.name}</div>
              <div class="food-card-short">${food.short || ""}</div>
            </div>
            <div class="food-card-arrow">›</div>
          </button>
        `).join("")}
      </div>` : ""}
  `;

  $("#back-from-food").addEventListener("click", () => history.back());
  $$('[data-food-switch]', el).forEach(btn => {
    btn.addEventListener("click", () => {
      const nextId = btn.dataset.foodSwitch;
      if (nextId === selected.id) return;
      history.replaceState({ screen:"food-detail", legId, foodId:nextId }, "", "#food-detail");
      openFoodDetail(legId, nextId, false);
    });
  });
  navigateTo("food-detail", { legId, foodId:selected.id }, pushHistory);
}

// ---------- Stato offline ----------
function updateOnlineBadge(){
  const badge = $("#offline-badge");
  if (navigator.onLine){ badge.classList.remove("show"); }
  else { badge.classList.add("show"); }
}

// ---------- Init ----------
function init(){
  renderHome();
  renderCitiesList();

  // La prima voce della history è la Home: da una tappa il tasto Indietro
  // del Galaxy torna davvero alla schermata precedente anziché chiudere la PWA.
  history.replaceState({ screen:"home" }, "", "#home");
  showScreen("home");

  $$("nav.tabbar button").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.screen;
      if (target === "home") renderHome();
      if (target === "cities") renderCitiesList();
      navigateTo(target, {}, true);
    });
  });

  window.addEventListener("popstate", (event) => renderNavigationState(event.state));
  window.addEventListener("online", updateOnlineBadge);
  window.addEventListener("offline", updateOnlineBadge);
  updateOnlineBadge();

  if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js", { scope: "./", updateViaCache: "none" }).catch((err)=>console.error("Service Worker registration failed:", err));
  }
}

document.addEventListener("DOMContentLoaded", init);
