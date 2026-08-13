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


const CITY_LIVE = {
  sf:{lat:37.7749,lon:-122.4194,tz:"America/Los_Angeles",label:"San Francisco"},
  la:{lat:34.0522,lon:-118.2437,tz:"America/Los_Angeles",label:"Los Angeles"},
  vegas:{lat:36.1699,lon:-115.1398,tz:"America/Los_Angeles",label:"Las Vegas"},
  page:{lat:36.9147,lon:-111.4558,tz:"America/Phoenix",label:"Page"},
  chicago:{lat:41.8781,lon:-87.6298,tz:"America/Chicago",label:"Chicago"},
  sd:{lat:18.3690,lon:-68.8385,tz:"America/Santo_Domingo",label:"Bayahibe"}
};
let cityLiveClockTimer = null;

function weatherIcon(code,isDay=true){
  if(code===0)return isDay?"☀️":"🌙";
  if([1,2].includes(code))return isDay?"🌤️":"☁️";
  if(code===3)return "☁️";
  if([45,48].includes(code))return "🌫️";
  if([51,53,55,56,57].includes(code))return "🌦️";
  if([61,63,65,66,67,80,81,82].includes(code))return "🌧️";
  if([71,73,75,77,85,86].includes(code))return "❄️";
  if([95,96,99].includes(code))return "⛈️";
  return "🌡️";
}
function cityWeatherCacheKey(accent){return `lf-weather-${accent}`;}
function setCityWeatherBadge(leg,payload){
  const badge=$("#city-live-weather");
  if(!badge||!payload)return;
  const temp=Math.round(Number(payload.temperature_2m));
  if(!Number.isFinite(temp))return;
  badge.innerHTML=`<span>${weatherIcon(Number(payload.weather_code),Number(payload.is_day)===1)}</span><strong>${temp}°C</strong>`;
  badge.classList.remove("city-live-loading");
  badge.title="Meteo attuale della località";
}
function updateCityLocalClock(leg){
  const info=CITY_LIVE[leg.accent],target=$("#city-live-time");
  if(!info||!target)return;
  try{
    const value=new Intl.DateTimeFormat("it-IT",{timeZone:info.tz,hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date());
    target.innerHTML=`<span>🕒</span><strong>${value}</strong>`;
    target.title=`Ora locale · ${info.label}`;
  }catch(e){}
}
async function refreshCityLiveInfo(leg){
  const info=CITY_LIVE[leg.accent];
  if(!info)return;
  if(cityLiveClockTimer)clearInterval(cityLiveClockTimer);
  updateCityLocalClock(leg);
  cityLiveClockTimer=setInterval(()=>updateCityLocalClock(leg),30000);
  try{
    const cached=JSON.parse(localStorage.getItem(cityWeatherCacheKey(leg.accent))||"null");
    if(cached&&cached.current)setCityWeatherBadge(leg,cached.current);
  }catch(e){}
  try{
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${info.lat}&longitude=${info.lon}&current=temperature_2m,weather_code,is_day&temperature_unit=celsius&timezone=${encodeURIComponent(info.tz)}`;
    const response=await fetch(url,{headers:{"Accept":"application/json"}});
    if(!response.ok)throw new Error("Meteo non disponibile");
    const data=await response.json();
    if(data&&data.current){
      setCityWeatherBadge(leg,data.current);
      localStorage.setItem(cityWeatherCacheKey(leg.accent),JSON.stringify({savedAt:Date.now(),current:data.current}));
    }
  }catch(err){
    const badge=$("#city-live-weather");
    if(badge&&badge.classList.contains("city-live-loading")){
      badge.innerHTML=`<span>🌡️</span><strong>--°</strong>`;
      badge.title="Meteo non disponibile offline";
    }
  }
}
function rememberCityViewState(legId){
  if(!$("#screen-city-detail")?.classList.contains("active"))return;
  const openKeys=$$(".city-accordion[open]",$("#screen-city-detail")).map(el=>el.dataset.accordionKey).filter(Boolean);
  const current=history.state||{screen:"city-detail",legId};
  history.replaceState({...current,screen:"city-detail",legId,cityView:{scrollY:window.scrollY,openKeys}},"","#city-detail");
}
function restoreCityViewState(cityView){
  if(!cityView)return;
  const host=$("#screen-city-detail");
  (cityView.openKeys||[]).forEach(key=>{
    const detail=$(`.city-accordion[data-accordion-key="${CSS.escape(key)}"]`,host);
    if(detail)detail.open=true;
  });
  requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo(0,Number(cityView.scrollY)||0)));
}

const BUDGET_CITY_BY_LEG = {
  sfo: "San Francisco",
  la: "Los Angeles",
  vegas1: "Las Vegas 27-28",
  page: "Page / Grand Canyon",
  vegas2: "Las Vegas 29-30",
  chicago: "Chicago",
  bayahibe: "Bayahibe"
};

let privateAuthState = { authenticated:false, user:null };
let budgetState = { settings:null, expenses:[] };
let editingExpenseId = null;

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


function localISODate(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

const CHECKLIST_HIDE_AT = new Date("2026-10-20T14:00:00Z"); // 20/10/2026 ore 16:00 in Italia (CEST)
const CHECKLIST_EXPIRED_KEY = "lf-checklist-expired-v13";
let checklistCountdownTimer = null;
const CHECKLIST_PROFILES = ["Lorenzo", "Fortuna"];
const CHECKLIST_SECTIONS = [
  { id:"before", icon:"🗓️", title:"Da fare prima di partire", items:[
    "Acquistare e attivare la eSIM", "Controllare passaporto e validità", "Controllare ESTA per gli Stati Uniti", "Controllare assicurazione viaggio", "Avvisare la banca del viaggio se necessario", "Scaricare biglietti e prenotazioni nell’app", "Fare check-in online dei voli quando disponibile", "Preparare carte di pagamento e un po’ di contanti", "Controllare meteo delle tappe pochi giorni prima", "Pesare la valigia prima di uscire di casa"
  ]},
  { id:"docs", icon:"🛂", title:"Documenti e pagamenti", items:[
    "Passaporto", "Carta d’identità", "Patente italiana", "Carte di credito/debito", "Contanti", "Conferme voli e hotel", "Prenotazioni Alcatraz / Universal / Antelope Canyon", "Copia digitale dei documenti importanti"
  ]},
  { id:"clothes", icon:"👕", title:"Abbigliamento", items:[
    "Intimo", "Calze", "T-shirt", "Maglie a maniche lunghe", "Felpa o maglione", "Giacca per le tappe più fredde", "Pantaloni lunghi", "Pantaloni/shorts leggeri", "Pigiama", "Costume da bagno", "Scarpe comode", "Secondo paio di scarpe", "Ciabatte", "Cappello o berretto", "Occhiali da sole", "Ago e filo"
  ]},
  { id:"tech", icon:"🔌", title:"Tecnologia", items:[
    "Smartphone", "Caricatore smartphone", "Power bank", "Cavo USB di riserva", "Adattatore prese USA", "Auricolari/cuffie", "Smartwatch e caricatore", "Fotocamera/accessori se previsti"
  ]},
  { id:"meds", icon:"💊", title:"Farmaci e kit salute", items:[
    "Farmaci personali abituali per tutti i giorni del viaggio", "Ricette o documentazione dei farmaci personali se necessaria", "Antidolorifico / antipiretico abituale", "Antistaminico abituale", "Farmaco per nausea o mal d’auto/aereo se già utilizzato", "Antidiarroico da viaggio", "Sali reidratanti", "Cerotti assortiti e cerotti per vesciche", "Disinfettante in formato viaggio", "Termometro", "Repellente per insetti", "Creme solari"
  ]},
  { id:"care", icon:"🧴", title:"Igiene personale", items:[
    "Spazzolino e dentifricio", "Deodorante", "Prodotti doccia", "Rasoio / prodotti personali", "Burrocacao", "Fazzoletti / salviette", "Gel igienizzante mani", "Pinzetta", "Forbicine", "Limetta", "Salviette umidificate", "Carta igienica umidificata"
  ]},
  { id:"home", icon:"🏠", title:"Ultimi controlli a casa", items:[
    "Chiudere gas e controllare rubinetti", "Controllare finestre e balconi", "Svuotare i rifiuti", "Controllare frigorifero e alimenti deperibili", "Impostare riscaldamento/termostato", "Controllare automazioni e telecamere", "Staccare ciò che non serve", "Chiudere casa e portare le chiavi"
  ]}
];

function checklistVisible(){
  if (localStorage.getItem(CHECKLIST_EXPIRED_KEY) === "1") return false;
  if (Date.now() >= CHECKLIST_HIDE_AT.getTime()){
    localStorage.setItem(CHECKLIST_EXPIRED_KEY, "1");
    return false;
  }
  return true;
}

function checklistCountdownText(){
  const diff = CHECKLIST_HIDE_AT.getTime() - Date.now();
  if (diff <= 0) return "Checklist chiusa";
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}g ${hours}h ${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function updateChecklistCountdown(){
  const el = $("#checklist-countdown-value");
  if (el) el.textContent = checklistCountdownText();

  if (!checklistVisible()) {
    if (checklistCountdownTimer) {
      clearInterval(checklistCountdownTimer);
      checklistCountdownTimer = null;
    }
    if ($("#screen-checklist")?.classList.contains("active")) {
      renderHome();
      history.replaceState({ screen:"home" }, "", "#home");
      showScreen("home");
    } else if ($("#screen-home")?.classList.contains("active")) {
      renderHome();
    }
  }
}

function startChecklistCountdown(){
  if (checklistCountdownTimer) clearInterval(checklistCountdownTimer);
  updateChecklistCountdown();
  if (checklistVisible()) checklistCountdownTimer = setInterval(updateChecklistCountdown, 30000);
}


function checklistStorageKey(profile){
  return `lf-checklist-v17-${profile.toLowerCase()}`;
}

function loadChecklistState(profile){
  try { return JSON.parse(localStorage.getItem(checklistStorageKey(profile)) || "{}"); }
  catch(e){ return {}; }
}

function saveChecklistState(profile, state){
  localStorage.setItem(checklistStorageKey(profile), JSON.stringify(state));
}

function checklistItemsStorageKey(profile){
  return `lf-checklist-items-v19-${profile.toLowerCase()}`;
}

function defaultChecklistSections(){
  return CHECKLIST_SECTIONS.map(section => ({
    ...section,
    items: section.items.map((text, i) => ({ id:`${section.id}-${i}`, text }))
  }));
}

function loadChecklistSections(profile){
  try {
    const saved = JSON.parse(localStorage.getItem(checklistItemsStorageKey(profile)) || "null");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch(e){}
  return defaultChecklistSections();
}

function saveChecklistSections(profile, sections){
  localStorage.setItem(checklistItemsStorageKey(profile), JSON.stringify(sections));
}

function escapeHtml(value){
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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


// ---------- Home dinamica "OGGI" ----------
// La checklist scompare alle 16:00 italiane; la card OGGI entra un minuto dopo.
const TODAY_CARD_START_AT = new Date("2026-10-20T14:01:00Z");
let todayHomeTimer = null;
let lastTodayHomeDate = null;

function dateInTimeZone(zone, now=new Date()){
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone, year:"numeric", month:"2-digit", day:"2-digit"
  }).formatToParts(now);
  const vals = Object.fromEntries(parts.filter(p => p.type !== "literal").map(p => [p.type,p.value]));
  return `${vals.year}-${vals.month}-${vals.day}`;
}

function timeInTimeZone(zone, now=new Date()){
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: zone, hour:"2-digit", minute:"2-digit", hour12:false
  }).format(now);
}

function tripTimeZoneForDateGuess(now=new Date()){
  // Timeline basata sull'itinerario, non sul GPS del dispositivo.
  // 03/11: il passaggio a Santo Domingo avviene all'arrivo reale (16:02 locali = 20:02 UTC).
  const santoDomingoArrival = new Date("2026-11-03T20:02:00Z");
  if (now >= santoDomingoArrival) return "America/Santo_Domingo";

  // 30/10 LAS → ORD: finché l'orario definitivo del volo non è confermato,
  // evitiamo il cambio anticipato causato dalla mezzanotte di Chicago e passiamo
  // a Chicago solo quando è iniziato il 30 ottobre anche a Las Vegas.
  // Quando avremo l'orario LAS→ORD sostituiremo questa soglia con l'arrivo reale a ORD.
  const westDate = dateInTimeZone("America/Los_Angeles", now);
  if (westDate >= "2026-10-30") return "America/Chicago";
  return "America/Los_Angeles";
}

function programForDate(iso){
  if (typeof PROGRAM_GUIDE === "undefined") return null;
  const matches = [];
  TRIP.legs.forEach(leg => {
    const day = (PROGRAM_GUIDE[leg.id] || []).find(d => d.date === iso);
    if (day) matches.push({ legId:leg.id, day, leg });
  });
  if (!matches.length) return null;
  return {
    matches,
    legId: matches[0].legId,
    lastLegId: matches[matches.length-1].legId,
    day: matches[0].day,
    leg: matches[0].leg
  };
}

function todayTripState(now=new Date(), forcedDate=null){
  if (!forcedDate && now < TODAY_CARD_START_AT) return null;
  const zone = forcedDate ? (() => {
    if (forcedDate >= "2026-11-03") return "America/Santo_Domingo";
    if (forcedDate >= "2026-10-30") return "America/Chicago";
    return "America/Los_Angeles";
  })() : tripTimeZoneForDateGuess(now);
  const iso = forcedDate || dateInTimeZone(zone, now);
  if (iso < TRIP.start || iso >= TRIP.end) return null;
  const program = programForDate(iso);
  return { iso, zone, localTime: forcedDate ? "Anteprima" : timeInTimeZone(zone, now), program };
}

function todayCardHtml(forcedDate=null){
  const state = todayTripState(new Date(), forcedDate);
  if (!state || !state.program) return "";
  const { iso, zone, localTime, program } = state;
  const matches = program.matches || [program];
  const isTransfer = matches.length > 1;
  const first = matches[0], last = matches[matches.length-1];
  const title = isTransfer ? `${first.leg.city} → ${last.leg.city}` : first.day.title;
  const theme = isTransfer ? matches.map(m => m.day.title).join(" · ") : (first.day.theme || first.leg.city);
  const items = matches.flatMap(m => (m.day.items || [])).slice(0,6);
  const openLegId = isTransfer ? last.legId : first.legId;
  return `
    <div class="today-card" data-today-leg="${openLegId}" data-today-date="${iso}">
      <div class="today-card-head">
        <div><small>${forcedDate ? "Anteprima" : "Oggi"} · ${fmtDateFull(iso)}</small><strong>${title}</strong><span>${theme}</span></div>
        <div class="today-local-time"><b>${localTime}</b><em>${zone === "America/Chicago" ? "Chicago" : zone === "America/Santo_Domingo" ? "Bayahibe" : "Ovest USA"}</em></div>
      </div>
      <div class="today-mini-timeline">
        ${items.map(item => `<div class="today-mini-item"><span>${item.time || ""}</span><b>${item.icon || "•"}</b><p><strong>${item.title}</strong>${item.note ? `<small>${item.note}</small>` : ""}</p></div>`).join("")}
      </div>
      ${isTransfer ? `<div class="today-transfer-note">La card unisce automaticamente partenza e arrivo della stessa giornata.</div>` : ""}
      <button type="button" class="today-open-program" data-open-today-leg="${openLegId}">Apri il programma di oggi ›</button>
    </div>`;
}

function bindTodayCard(root=document){
  $$('[data-open-today-leg]', root).forEach(btn => btn.addEventListener("click", () => openCity(btn.dataset.openTodayLeg)));
}

function startTodayHomeWatcher(){
  if (todayHomeTimer) clearInterval(todayHomeTimer);
  const tick = () => {
    const state = todayTripState();
    const iso = state?.iso || null;
    const timeEl = $(".today-local-time b");
    if (timeEl && state) timeEl.textContent = state.localTime;
    if (lastTodayHomeDate && iso && lastTodayHomeDate !== iso && $("#screen-home")?.classList.contains("active")) renderHome();
    lastTodayHomeDate = iso;
  };
  tick();
  todayHomeTimer = setInterval(tick, 30000);
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

    ${checklistVisible() ? `
    <button class="pretrip-card" id="open-checklist">
      <img src="./assets/checklist-prepartenza.jpg" alt="Valigia e checklist di viaggio">
      <span class="pretrip-card-overlay"></span>
      <span class="pretrip-card-copy"><small>Prima di partire</small><strong>Checklist pre-partenza</strong><em>Preparativi e valigia, senza dimenticare nulla</em></span>
      <span class="pretrip-card-arrow">›</span>
    </button>` : todayCardHtml()}

    <div class="section-title">Tappe</div>
    ${TRIP.legs.map(leg => cityCardHtml(leg)).join("")}
`;

  renderRouteStrip();
  bindCityCardClicks(el);
  $("#open-checklist")?.addEventListener("click", () => openChecklist());
  bindTodayCard(el);
  startTodayHomeWatcher();
  bindPrivateAreaEntry();
  updatePrivateAreaEntry();
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


// ---------- Checklist pre-partenza ----------
let activeChecklistProfile = localStorage.getItem("lf-checklist-profile") || "Lorenzo";
let checklistEditMode = false;

function checklistProgress(profile){
  const state = loadChecklistState(profile);
  const sections = loadChecklistSections(profile);
  const ids = sections.flatMap(section => section.items.map(item => item.id));
  const done = ids.filter(id => !!state[id]).length;
  const total = ids.length;
  return { done, total, pct: total ? Math.round(done/total*100) : 0 };
}

function currentOpenChecklistSections(el){
  return new Set($$(".checklist-section[open]", el).map(d => d.dataset.sectionId));
}

function updateChecklistProgressDom(el){
  const state = loadChecklistState(activeChecklistProfile);
  const sections = loadChecklistSections(activeChecklistProfile);
  const progress = checklistProgress(activeChecklistProfile);
  const progressText = $(".checklist-progress-wrap strong", el);
  const progressBar = $(".checklist-progress span", el);
  const progressPct = $(".checklist-progress-wrap>b", el);
  if (progressText) progressText.textContent = `${progress.done} / ${progress.total}`;
  if (progressBar) progressBar.style.width = `${progress.pct}%`;
  if (progressPct) progressPct.textContent = `${progress.pct}%`;
  sections.forEach(section => {
    const done = section.items.filter(item => !!state[item.id]).length;
    const count = $(`[data-check-count="${section.id}"]`, el);
    if (count) count.textContent = `${done}/${section.items.length} completate`;
  });
}

function renderChecklist(){
  const el = $("#screen-checklist");
  if (!checklistVisible()){
    renderHome();
    showScreen("home");
    return;
  }
  const openSections = currentOpenChecklistSections(el);
  const firstRender = !el.querySelector(".checklist-section");
  const state = loadChecklistState(activeChecklistProfile);
  const sections = loadChecklistSections(activeChecklistProfile);
  const progress = checklistProgress(activeChecklistProfile);
  el.innerHTML = `
    <button class="back-btn" id="back-checklist">‹ Home</button>
    <div class="checklist-hero" style="background-image:linear-gradient(180deg,rgba(13,25,43,.08),rgba(13,25,43,.78)),url('./assets/checklist-prepartenza.jpg')">
      <div><small>20 ottobre 2026</small><h2>Checklist pre-partenza</h2><p>Preparativi e valigia di ${escapeHtml(activeChecklistProfile)}</p></div>
    </div>
    <div class="checklist-local-note">📱 Voci e spunte sono salvate solo su questo smartphone e non vengono sincronizzate con l'altro telefono.</div>
    <div class="checklist-countdown"><span>⏳ Tempo alla partenza</span><strong id="checklist-countdown-value">${checklistCountdownText()}</strong><small>La checklist si nasconderà il 20 ottobre 2026 alle 16:00.</small></div>
    <div class="checklist-profile-tabs">
      ${CHECKLIST_PROFILES.map(p => `<button class="${p===activeChecklistProfile?'active':''}" data-check-profile="${p}">${p}</button>`).join("")}
    </div>
    <div class="checklist-toolbar">
      <span>${checklistEditMode ? "Modifica, aggiungi o elimina le voci." : "Personalizza la tua checklist direttamente dall’app."}</span>
      <button type="button" id="checklist-edit-toggle">${checklistEditMode ? "✓ Fine" : "✎ Modifica elenco"}</button>
    </div>
    <details class="today-preview-panel">
      <summary><span>👁️ Prova la schermata OGGI prima della partenza</span><span class="accordion-chevron">⌄</span></summary>
      <div class="today-preview-content">
        <label for="today-preview-date">Giorno da simulare</label>
        <select id="today-preview-date">
          ${[...new Map(Object.values(PROGRAM_GUIDE).flat().map(d => [d.date,d])).values()].map(d => `<option value="${d.date}">${fmtDateFull(d.date)} · ${d.title}</option>`).join("")}
        </select>
        <div id="today-preview-card">${todayCardHtml("2026-10-20")}</div>
      </div>
    </details>
    <div class="checklist-progress-wrap">
      <div><strong>${progress.done} / ${progress.total}</strong><span>completate</span></div>
      <div class="checklist-progress"><span style="width:${progress.pct}%"></span></div><b>${progress.pct}%</b>
    </div>
    <div class="checklist-sections">
      ${sections.map(section => {
        const doneCount = section.items.filter(item=>state[item.id]).length;
        const isOpen = checklistEditMode || openSections.has(section.id) || (firstRender && section.id==='before');
        return `<details class="checklist-section" data-section-id="${section.id}" ${isOpen?'open':''}>
          <summary><span class="checklist-section-icon">${section.icon}</span><span><strong>${escapeHtml(section.title)}</strong><small data-check-count="${section.id}">${doneCount}/${section.items.length} completate</small></span><span class="accordion-chevron">⌄</span></summary>
          <div class="checklist-items">
            ${section.items.map(item=>{
              const checked=!!state[item.id];
              if (checklistEditMode) return `<div class="checklist-edit-item" data-edit-id="${item.id}"><input type="text" maxlength="100" value="${escapeHtml(item.text)}" data-edit-text="${item.id}"><button type="button" data-delete-check-item="${item.id}" aria-label="Elimina">×</button></div>`;
              return `<label class="checklist-item ${checked?'checked':''}"><input type="checkbox" data-check-key="${item.id}" ${checked?'checked':''}><span class="custom-check">✓</span><span>${escapeHtml(item.text)}</span></label>`;
            }).join("")}
            ${checklistEditMode ? `<div class="checklist-add-item"><input type="text" maxlength="100" data-add-check-text="${section.id}" placeholder="Nuova voce…"><button type="button" data-add-check-item="${section.id}">＋</button></div>` : ""}
          </div>
        </details>`;
      }).join("")}
    </div>
    <div class="checklist-hide-note">✨ Questa sezione sparirà automaticamente dall'app il 20 ottobre 2026 alle 16:00.</div>`;

  startChecklistCountdown();

  $("#back-checklist").addEventListener("click", () => history.back());
  $$("[data-check-profile]", el).forEach(btn => btn.addEventListener("click", () => {
    activeChecklistProfile = btn.dataset.checkProfile;
    localStorage.setItem("lf-checklist-profile", activeChecklistProfile);
    checklistEditMode = false;
    renderChecklist();
  }));
  $("#checklist-edit-toggle").addEventListener("click", () => {
    checklistEditMode = !checklistEditMode;
    renderChecklist();
  });
  const previewSelect = $("#today-preview-date");
  if (previewSelect){
    previewSelect.value = "2026-10-20";
    previewSelect.addEventListener("change", () => {
      const holder = $("#today-preview-card");
      if (holder){ holder.innerHTML = todayCardHtml(previewSelect.value); bindTodayCard(holder); }
    });
    bindTodayCard($("#today-preview-card"));
  }
  $$("[data-check-key]", el).forEach(input => input.addEventListener("change", () => {
    const next = loadChecklistState(activeChecklistProfile);
    next[input.dataset.checkKey] = input.checked;
    saveChecklistState(activeChecklistProfile, next);
    input.closest(".checklist-item")?.classList.toggle("checked", input.checked);
    updateChecklistProgressDom(el);
  }));
  $$("[data-edit-text]", el).forEach(input => input.addEventListener("change", () => {
    const value = input.value.trim();
    if (!value) { renderChecklist(); return; }
    const sectionsNow = loadChecklistSections(activeChecklistProfile);
    sectionsNow.forEach(section => section.items.forEach(item => { if (item.id === input.dataset.editText) item.text = value; }));
    saveChecklistSections(activeChecklistProfile, sectionsNow);
  }));
  $$("[data-delete-check-item]", el).forEach(btn => btn.addEventListener("click", () => {
    const id = btn.dataset.deleteCheckItem;
    const sectionsNow = loadChecklistSections(activeChecklistProfile);
    sectionsNow.forEach(section => section.items = section.items.filter(item => item.id !== id));
    saveChecklistSections(activeChecklistProfile, sectionsNow);
    const next = loadChecklistState(activeChecklistProfile);
    delete next[id];
    saveChecklistState(activeChecklistProfile, next);
    renderChecklist();
  }));
  function addChecklistItem(sectionId){
    const input = $(`[data-add-check-text="${sectionId}"]`, el);
    const value = input?.value.trim();
    if (!value) return;
    const sectionsNow = loadChecklistSections(activeChecklistProfile);
    const section = sectionsNow.find(s => s.id === sectionId);
    if (!section) return;
    section.items.push({ id:`custom-${Date.now()}-${Math.random().toString(36).slice(2,7)}`, text:value });
    saveChecklistSections(activeChecklistProfile, sectionsNow);
    renderChecklist();
  }
  $$("[data-add-check-item]", el).forEach(btn => btn.addEventListener("click", () => addChecklistItem(btn.dataset.addCheckItem)));
  $$("[data-add-check-text]", el).forEach(input => input.addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); addChecklistItem(input.dataset.addCheckText); }
  }));
}

function openChecklist(pushHistory=true){
  if (!checklistVisible()) return;
  renderChecklist();
  navigateTo("checklist", {}, pushHistory);
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
        <svg class="route-pin" viewBox="0 0 24 24" aria-hidden="true" style="${active?`color:${ACCENT[leg.accent]}`:""}"><path d="M12 22s7-7.1 7-13A7 7 0 1 0 5 9c0 5.9 7 13 7 13Z"></path><circle cx="12" cy="9" r="2.4"></circle></svg>
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
function openCity(legId, pushHistory=true, restoreState=null){
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
        <span>${t.time || "Orario da confermare"}${t.arriveTime ? " → " + t.arriveTime : ""}</span>
        <a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(t.mapsQuery || leg.city)}">Apri Maps</a>
      </div>
      ${t.arriveNote ? `<div style="padding:0 16px 14px;font-size:12px;color:var(--ink-soft)">${t.arriveNote}</div>` : ""}
    </div>
  `).join("");

  const accordion = (title, content, opts={}) => {
    const key=opts.key||title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
    return `
    <details class="city-accordion ${opts.className || ""}" data-accordion-key="${key}" ${opts.open ? "open" : ""}>
      <summary>
        <span>${opts.icon ? `<span class="accordion-icon">${opts.icon}</span>` : ""}${title}</span>
        ${opts.count !== undefined ? `<span class="accordion-count">${opts.count}</span>` : ""}
        <span class="accordion-chevron">⌄</span>
      </summary>
      <div class="accordion-content">${content}</div>
    </details>`;
  };

  const programDays = (typeof PROGRAM_GUIDE !== "undefined" && PROGRAM_GUIDE[leg.id]) || [];
  const programHtml = programDays.length ? `
    ${programDays.map(day => `
      <div class="program-day ${day.special ? "program-day-special" : ""}">
        <div class="program-day-head">
          <div>
            <div class="program-date">${fmtDateFull(day.date)}</div>
            <div class="program-day-title">${day.title}</div>
            <div class="program-theme">${day.theme || ""}</div>
          </div>
          ${day.special ? `<div class="program-special-icon">🎃</div>` : ""}
        </div>
        <div class="program-timeline">
          ${(day.items || []).map(item => `
            <div class="program-item ${item.kind || "recommended"}">
              <div class="program-time">${item.time || ""}</div>
              <div class="program-dot">${item.icon || "•"}</div>
              <div class="program-copy">
                <div class="program-item-title">${item.title}</div>
                <div class="program-note">${item.note || ""}</div>
                ${item.mapsQuery ? `<a class="program-map" target="_blank" rel="noopener" href="${mapsUrl(item.mapsQuery)}">📍 Maps</a>` : ""}
              </div>
            </div>`).join("")}
        </div>
      </div>`).join("")}
  ` : `<div class="empty-note">Programma giornaliero non ancora definito per questa tappa.</div>`;

  const renderPlaceCard = (p) => `
    <div class="ticket lf-ticket place-ticket" data-place-name="${p.name.replace(/&/g, "&amp;").replace(/\"/g, "&quot;")}" tabindex="0" role="button" aria-label="Apri il dettaglio di ${p.name}">
      <div class="stub-top"><div><div class="stitle">${p.name}</div><div class="ssub">${p.note||""}</div></div>${p.lf ? `<span class="lf-badge" title="Scelto da L&F">L&amp;F</span>` : ""}</div>
      <div class="stub-bottom"><span class="place-more">Scopri di più ›</span><a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(p.mapsQuery||p.name)}">Apri Maps</a></div>
    </div>`;

  const renderActivityCard = (a) => `
    <div class="ticket lf-ticket place-ticket activity-place-ticket" data-place-name="${a.name.replace(/&/g, "&amp;").replace(/\"/g, "&quot;")}" tabindex="0" role="button" aria-label="Apri il dettaglio di ${a.name}">
      <div class="stub-top">
        <div>
          <div class="stitle">${a.icon || "✨"} ${a.name}</div>
          <div class="ssub">${a.note || ""}</div>
        </div>
        <div class="activity-badges">${a.status ? `<span class="status-pill ${a.status === "Prenotato" ? "booked" : "planned"}">${a.status}</span>` : ""}${a.lf ? `<span class="lf-badge" title="Scelto da L&F">L&amp;F</span>` : ""}</div>
      </div>
      <div class="stub-bottom"><span class="activity-inline-date">📅 ${fmtDateFull(a.date)}${a.time ? ` · ${a.time}` : ""}</span><a class="mapbtn" target="_blank" rel="noopener" href="${itemMapsUrl(a, a.name)}">Apri Maps</a></div>
    </div>`;

  const mustPlaces = (leg.places||[]).filter(p => p.priority === "must");
  const discoverPlaces = (leg.places||[]).filter(p => p.priority !== "must");
  const mustItemsHtml = [
    ...(leg.activities||[]).map(renderActivityCard),
    ...mustPlaces.map(renderPlaceCard)
  ].join("") || `<div class="empty-note">Nessuna priorità inserita per questa tappa.</div>`;
  const discoverHtml = discoverPlaces.map(renderPlaceCard).join("") || `<div class="empty-note">Nessun luogo secondario inserito per questa tappa.</div>`;
  const renderRestaurantCard = (r) => `
    <div class="ticket lf-ticket restaurant-ticket" data-restaurant-name="${r.name.replace(/&/g, "&amp;").replace(/\"/g, "&quot;")}" tabindex="0" role="button" aria-label="Apri il dettaglio di ${r.name}">
      <div class="stub-top"><div><div class="restaurant-title-line"><div class="stitle">${r.name}</div>${r.price ? `<span class="price-band" title="Fascia di prezzo indicativa">${r.price}</span>` : ""}</div>${r.type ? `<div class="restaurant-type"><span class="restaurant-type-icon">${r.typeIcon || "🍽️"}</span><span>${r.type}</span></div>` : ""}<div class="ssub">${r.note||""}</div></div>${r.lf ? `<span class="lf-badge" title="Scelto da L&F">L&amp;F</span>` : ""}</div>
      <div class="stub-bottom"><span class="restaurant-more">Dettagli e recensioni ›</span><a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(r.mapsQuery||r.name)}">Apri Maps</a></div>
    </div>`;
  const quickRestaurants = (leg.restaurants||[]).filter(r => r.meal === "quick");
  const seriousRestaurants = (leg.restaurants||[]).filter(r => r.meal !== "quick");
  const restaurantSubgroup = (title, subtitle, icon, items, cls) => items.length ? `
    <details class="restaurant-subaccordion ${cls}">
      <summary><span class="restaurant-subicon">${icon}</span><span class="restaurant-subcopy"><strong>${title}</strong><small>${subtitle}</small></span><span class="restaurant-subcount">${items.length}</span><span class="restaurant-subchevron">⌄</span></summary>
      <div class="restaurant-subcontent">${items.map(renderRestaurantCard).join("")}</div>
    </details>` : "";
  const restaurantsHtml = (leg.restaurants||[]).length ? `
    ${restaurantSubgroup("Pasto veloce", "Street food, panini e soste rapide", "⚡", quickRestaurants, "quick")}
    ${restaurantSubgroup("Pasto più serio", "Ristoranti da godersi con più calma, soprattutto a cena", "🍽️", seriousRestaurants, "serious")}
  ` : "";
  const ticketsHtml = `${leg.tickets && leg.tickets.length ? leg.tickets.map(tk => `
      <div class="ticket"><div class="stub-top"><div><div class="stitle">${tk.name}</div><div class="ssub">${tk.note||""}</div></div>${tk.status ? `<span class="pill">${tk.status}</span>` : ""}</div></div>
    `).join("") : ""}
    <div class="ticket-import-box">
      <div class="ticket-import-title">Biglietti offline</div>
      <div class="ticket-import-note">I file restano solo su questo dispositivo e non vengono caricati su GitHub.</div>
      <input id="ticket-file-${leg.id}" class="ticket-file-input" type="file" accept=".pdf,image/*" multiple>
      <button id="ticket-import-${leg.id}" class="ticket-import-btn">📎 Importa biglietto</button>
      <div id="local-tickets-${leg.id}" class="local-tickets-list"></div>
    </div>`;

  el.innerHTML = `
    <button class="back-btn" id="back-to-cities">‹ Tutte le tappe</button>
    <div class="city-header photo-city-header" style="--city-accent:${ACCENT[leg.accent]}; --city-image:url('${leg.image || ""}')">
      <div class="city-live-row">
        <div class="city-live-badge city-live-loading" id="city-live-weather"><span>🌡️</span><strong>--°</strong></div>
        <div class="city-live-badge" id="city-live-time"><span>🕒</span><strong>--:--</strong></div>
      </div>
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
          ${leg.hotel.hotelFee ? `<div class="hotel-fee-note"><span>💳 ${leg.hotel.hotelFee.label}</span><strong>${leg.hotel.hotelFee.note}</strong></div>` : ""}
          <div class="hotel-dates">Check-in ${fmtDate(leg.hotel.checkin)} · Check-out ${fmtDate(leg.hotel.checkout)}</div>
          <a class="mapbtn hotel-map" target="_blank" rel="noopener" href="${leg.hotel.mapsUrl || mapsUrl(leg.hotel.name + ", " + leg.city)}">📍 Apri in Maps</a>
        </div>
      </div>` : `<div class="empty-note">Alloggio ancora da definire.</div>`}

    ${accordion("Trasporti", transportHtml || `<div class="empty-note">Nessun trasporto registrato per questa tappa.</div>`, {icon:"✈️", count:(leg.transport||[]).length})}

    ${accordion("Programma consigliato", programHtml, {icon:"🗓️", count:programDays.length, className:"accordion-program"})}

    ${accordion("Da non perdere", mustItemsHtml, {icon:"★", count:(leg.activities||[]).length + mustPlaces.length, className:"accordion-must"})}

    ${accordion("Da scoprire", discoverHtml, {icon:`<svg class="discover-compass" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"></circle><path d="m15.4 8.6-2 4.8-4.8 2 2-4.8 4.8-2Z"></path></svg>`, count:discoverPlaces.length, className:"accordion-discover"})}

    ${(() => {
      const c = (typeof CLOTHING_GUIDE !== "undefined" && CLOTHING_GUIDE[leg.accent]) || null;
      if (!c) return "";
      return accordion("Come vestirsi", `
        <div class="clothing-card">
          <div class="clothing-weather">🌡️ ${c.range}</div>
          <div class="clothing-row"><span>☀️ Giorno</span><p>${c.day}</p></div>
          <div class="clothing-row"><span>🌙 Sera</span><p>${c.evening}</p></div>
          <div class="clothing-row"><span>🎒 Da portare</span><p>${c.pack}</p></div>
          <div class="clothing-note">Indicazioni stagionali: controllate la previsione aggiornata 3–5 giorni prima della partenza.</div>
        </div>`, {icon:"👕", className:"accordion-clothing"});
    })()}

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

    ${(leg.restaurants||[]).length ? accordion("Dove mangiare", restaurantsHtml, {icon:"🍽️", count:(leg.restaurants||[]).length}) : ""}

    <div class="section-title">Biglietti</div>
    ${ticketsHtml}
  `;
  $("#back-to-cities").addEventListener("click", () => history.back());
  $$(`[data-food-leg="${leg.id}"]`, el).forEach(btn => {
    btn.addEventListener("click", () => { rememberCityViewState(leg.id); openFoodDetail(leg.id, btn.dataset.foodId); });
  });
  $$(".place-ticket", el).forEach(card => {
    const open = (event) => {
      if (event && event.target && event.target.closest("a")) return;
      rememberCityViewState(leg.id);
      openPlaceDetail(leg.id, card.dataset.placeName);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " "){
        event.preventDefault();
        rememberCityViewState(leg.id);
      openPlaceDetail(leg.id, card.dataset.placeName);
      }
    });
  });
  $$(".restaurant-ticket", el).forEach(card => {
    const open = (event) => {
      if (event && event.target && event.target.closest("a")) return;
      rememberCityViewState(leg.id);
      openRestaurantDetail(leg.id, card.dataset.restaurantName);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " "){
        event.preventDefault();
        rememberCityViewState(leg.id);
      openRestaurantDetail(leg.id, card.dataset.restaurantName);
      }
    });
  });
  bindTicketImporter(leg);
  renderLocalTickets(leg.id);
  navigateTo("city-detail", { legId: leg.id }, pushHistory);
  refreshCityLiveInfo(leg);
  if(restoreState?.cityView)restoreCityViewState(restoreState.cityView);
}


// ---------- Area privata L&F + Budget condiviso ----------
function bindPrivateAreaEntry(){
  const btn = $("#private-area-entry");
  if (!btn) return;
  btn.addEventListener("click", () => openBudget());
}

// Accesso segreto L&F: per chi non è autenticato non compare alcun pulsante.
// Un doppio tap/click sul titolo "Viaggio di Nozze" apre la schermata privata.
function bindSecretPrivateAccess(){
  const title = document.querySelector(".honeymoon-topbar h1");
  if (!title || title.dataset.lfSecretBound === "1") return;
  title.dataset.lfSecretBound = "1";

  let lastTap = 0;
  title.addEventListener("pointerup", (event) => {
    const now = Date.now();
    if (now - lastTap > 0 && now - lastTap < 450){
      event.preventDefault();
      lastTap = 0;
      if (privateAuthState.authenticated) openBudget();
      else openPrivateAccess();
      return;
    }
    lastTap = now;
  });

  // Utile anche da PC con un vero doppio click del mouse.
  title.addEventListener("dblclick", (event) => {
    event.preventDefault();
    if (privateAuthState.authenticated) openBudget();
    else openPrivateAccess();
  });
}

function updatePrivateAreaEntry(){
  const btn = $("#private-area-entry");
  if (!btn) return;
  const icon = $(".private-area-icon", btn);
  const title = $("strong", btn);
  const note = $("small", btn);
  if (privateAuthState.authenticated){
    if (icon) icon.textContent = "💰";
    if (title) title.textContent = "Budget L&F";
    if (note) note.textContent = "Privato · sincronizzato tra i vostri telefoni";
    btn.classList.add("unlocked");
  } else {
    if (icon) icon.textContent = "🔒";
    if (title) title.textContent = "Area privata L&F";
    if (note) note.textContent = "Accesso riservato ai vostri dispositivi";
    btn.classList.remove("unlocked");
  }
}

function updatePrivateTabsVisibility(){
  const hidden = !privateAuthState.authenticated;
  const budgetTab = $("#budget-tab");
  const sosTab = $("#sos-tab");
  if (budgetTab) budgetTab.hidden = hidden;
  if (sosTab) sosTab.hidden = hidden;
}

function firebaseReady(){
  return !!window.LFBudget;
}

function friendlyAuthError(err){
  const code = err && err.code || "";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) return "Email o codice L&F non corretti.";
  if (code.includes("too-many-requests")) return "Troppi tentativi. Riprova tra qualche minuto.";
  if (code.includes("network-request-failed")) return "Connessione assente. Il primo accesso richiede Internet.";
  if (code.includes("api-key-not-valid") || code.includes("invalid-api-key")) return "Configurazione Firebase non valida. Aggiorna l’app e riprova.";
  return `Accesso non riuscito${code ? ` (${code})` : ""}.`;
}

function openPrivateAccess(pushHistory=true){
  const el = $("#screen-private-access");
  el.innerHTML = `
    <button class="back-btn" id="back-private">‹ Home</button>
    <div class="private-login-card">
      <div class="private-login-icon">🔐</div>
      <div class="private-login-kicker">Area privata</div>
      <h2>L&F</h2>
      <p>Solo al primo accesso su ciascun telefono. In seguito Firebase ricorderà il dispositivo.</p>
      <form id="lf-login-form" class="private-login-form">
        <label>Email Firebase<input id="lf-email" type="email" autocomplete="username" required placeholder="La tua email"></label>
        <label>Codice L&F<input id="lf-password" type="password" autocomplete="current-password" required placeholder="••••••••"></label>
        <button type="submit" class="primary-action" id="lf-login-btn">Sblocca area privata</button>
        <div class="private-login-error" id="lf-login-error"></div>
      </form>
      <div class="private-login-note">Usate questa funzione solo sui vostri smartphone personali. Il budget non compare agli altri visitatori dell'app.</div>
    </div>`;
  $("#back-private").addEventListener("click", () => history.back());
  $("#lf-login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const errorEl = $("#lf-login-error");
    const button = $("#lf-login-btn");
    if (!firebaseReady()){
      errorEl.textContent = "Firebase non è ancora disponibile. Controlla la connessione e riprova.";
      return;
    }
    button.disabled = true;
    button.textContent = "Accesso…";
    errorEl.textContent = "";
    try {
      await window.LFBudget.login($("#lf-email").value, $("#lf-password").value);
      const requested = sessionStorage.getItem("lf-private-target") || "budget";
      sessionStorage.removeItem("lf-private-target");
      if (requested === "sos") {
        openSOS(false);
        history.replaceState({ screen:"sos" }, "", "#sos");
      } else {
        openBudget(false);
        history.replaceState({ screen:"budget" }, "", "#budget");
      }
    } catch(err){
      console.error(err);
      errorEl.textContent = friendlyAuthError(err);
    } finally {
      button.disabled = false;
      button.textContent = "Sblocca area privata";
    }
  });
  navigateTo("private-access", {}, pushHistory);
}

function money(value, currency="USD"){
  return new Intl.NumberFormat("it-IT", { style:"currency", currency, minimumFractionDigits:2, maximumFractionDigits:2 }).format(Number(value || 0));
}

function currentBudgetData(){
  const settings = budgetState.settings || (window.LFBudget && window.LFBudget.defaults) || (typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS : { totalBudget:2500, currency:"USD", cityBudgets:{} });
  const expenses = Array.isArray(budgetState.expenses) ? budgetState.expenses : [];
  return { settings, expenses };
}

function expenseCityOptions(selected=""){
  const defs = typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS.destinations : [];
  return [`<option value="Generale" ${selected==="Generale"?"selected":""}>Generale</option>`, ...defs.map(d => `<option value="${d.key}" ${selected===d.key?"selected":""}>${d.label}</option>`)].join("");
}

function categoryOptions(selected=""){
  const cats = typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS.categories : ["Cibo","Benzina","Parcheggio","Hotel & tasse","Trasporti","Shopping","Escursioni","Altro"];
  return cats.map(c => `<option value="${c}" ${selected===c?"selected":""}>${c}</option>`).join("");
}

function budgetCityLabel(key){
  const d = typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS.destinations.find(x => x.key === key) : null;
  return d ? d.label : key;
}

function renderBudgetScreen(){
  const el = $("#screen-budget");
  if (!privateAuthState.authenticated){
    openPrivateAccess(false);
    return;
  }
  const { settings, expenses } = currentBudgetData();
  const currency = settings.currency || "USD";
  const total = Number(settings.totalBudget || 0);
  const spent = expenses.reduce((sum,e) => sum + Number(e.amount || 0), 0);
  const remaining = total - spent;
  const pct = total > 0 ? Math.min(100, Math.max(0, spent / total * 100)) : 0;
  const cityBudgets = settings.cityBudgets || {};
  const citySpent = expenses.reduce((acc,e) => { acc[e.city] = (acc[e.city] || 0) + Number(e.amount || 0); return acc; }, {});

  el.innerHTML = `
    <button class="back-btn" id="back-budget">‹ Home</button>
    <div class="budget-hero">
      <div><div class="budget-kicker">Area privata L&F</div><h2>Budget viaggio</h2></div>
    </div>

    <div class="budget-summary-grid">
      <div class="budget-summary-card main"><span>Budget</span><strong>${money(total,currency)}</strong></div>
      <div class="budget-summary-card"><span>Speso</span><strong>${money(spent,currency)}</strong></div>
      <div class="budget-summary-card ${remaining < 0 ? "over" : "remaining"}"><span>Rimanente</span><strong>${money(remaining,currency)}</strong></div>
    </div>
    <div class="budget-progress"><span style="width:${pct}%"></span></div>
    <button class="budget-edit-total" id="budget-edit-total">✎ Modifica budget iniziale</button>

    <div class="currency-converter" id="currency-converter">
      <div class="currency-converter-head"><div><small>Strumento rapido</small><strong>Convertitore valuta</strong></div><span>€ ⇄ $</span></div>
      <div class="currency-row"><input id="currency-amount" type="number" min="0" step="0.01" inputmode="decimal" value="100"><select id="currency-from"><option value="USD">USD $</option><option value="EUR">EUR €</option></select></div>
      <button class="currency-swap" id="currency-swap" type="button" aria-label="Inverti valute">⇅</button>
      <div class="currency-result"><strong id="currency-result-value">—</strong><span id="currency-to-label">EUR €</span></div>
      <button class="currency-convert-btn" id="currency-convert" type="button">Converti</button>
      <div class="currency-meta" id="currency-meta">Cambio indicativo aggiornato online. Il valore effettivo della carta può essere diverso.</div>
    </div>

    <details class="city-accordion budget-city-accordion">
      <summary><span><span class="accordion-icon">📍</span>Budget per tappa</span><span class="accordion-count">${Object.keys(cityBudgets).length}</span><span class="accordion-chevron">⌄</span></summary>
      <div class="accordion-content budget-city-list">
        ${(() => {
          const defaults = typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS.destinations : [];
          const orderedKeys = defaults.map(d => d.key);
          const extraKeys = Object.keys(cityBudgets).filter(key => !orderedKeys.includes(key));
          return [...orderedKeys, ...extraKeys].map(key => {
            const fallback = defaults.find(d => d.key === key)?.amount || 0;
            const max = Number(cityBudgets[key] ?? fallback);
            const s = Number(citySpent[key] || 0), rem = max-s;
            return `<div class="budget-city-row"><div><strong>${budgetCityLabel(key)}</strong><small>${money(s,currency)} spesi</small></div><div class="budget-city-values"><span>${money(max,currency)}</span><em class="${rem<0?"negative":""}">${money(rem,currency)} rim.</em></div></div>`;
          }).join("");
        })()}
      </div>
    </details>

    <details class="city-accordion budget-city-accordion hotel-fees-accordion">
      <summary><span><span class="accordion-icon">🏨</span>Tasse hotel previste</span><span class="accordion-count">${TRIP.legs.filter(l => l.hotel?.hotelFee).length}</span><span class="accordion-chevron">⌄</span></summary>
      <div class="accordion-content hotel-fees-list">
        ${TRIP.legs.filter(l => l.hotel?.hotelFee).map(l => {
          const f=l.hotel.hotelFee;
          return `<div class="hotel-fee-row"><div><strong>${l.hotel.name}</strong><small>${l.city} · ${fmtDate(l.hotel.checkin)}</small></div><div class="hotel-fee-value">${f.perNight > 0 ? money(f.perNight,currency)+"/notte" : "Da verificare"}</div><p>${f.note}</p></div>`;
        }).join("")}
        <div class="hotel-fees-total"><span>Totale fee hotel attualmente previste</span><strong>${money(482.92,currency)}</strong><small>Stima informativa: non viene sottratta automaticamente dal budget finché non registrate la spesa.</small></div>
      </div>
    </details>

    <div class="section-title">${editingExpenseId ? "Modifica spesa" : "Aggiungi spesa"}</div>
    <form id="expense-form" class="expense-form">
      <div class="expense-form-grid">
        <label>Importo ($)<input id="expense-amount" type="number" min="0.01" step="0.01" inputmode="decimal" required placeholder="0,00"></label>
        <label>Data<input id="expense-date" type="date" required value="${todayISO()}"></label>
        <label>Tappa<select id="expense-city">${expenseCityOptions()}</select></label>
        <label>Categoria<select id="expense-category">${categoryOptions("Cibo")}</select></label>
      </div>
      <label>Descrizione<input id="expense-description" type="text" maxlength="80" placeholder="Es. cena, benzina, parcheggio…"></label>
      <div class="expense-form-actions">
        <button type="submit" class="primary-action" id="expense-save">${editingExpenseId ? "Salva modifica" : "+ Aggiungi spesa"}</button>
        ${editingExpenseId ? `<button type="button" class="secondary-action" id="expense-cancel">Annulla</button>` : ""}
      </div>
      <div class="expense-form-status" id="expense-status"></div>
    </form>

    <div class="section-title">Movimenti <span class="movement-count">${expenses.length}</span></div>
    <div class="expense-list">
      ${expenses.length ? expenses.map(e => `
        <div class="expense-item" data-expense-id="${e.id}">
          <div class="expense-icon">${expenseCategoryIcon(e.category)}</div>
          <div class="expense-copy"><strong>${e.description || e.category || "Spesa"}</strong><span>${formatExpenseDate(e.date)} · ${budgetCityLabel(e.city || "Generale")} · ${e.category || "Altro"}</span></div>
          <div class="expense-amount">${money(e.amount,currency)}</div>
          <div class="expense-actions"><button data-edit-expense="${e.id}" title="Modifica">✎</button><button data-delete-expense="${e.id}" title="Elimina">×</button></div>
        </div>`).join("") : `<div class="empty-note">Nessuna spesa registrata. Il primo movimento comparirà qui e si sincronizzerà anche sull'altro telefono.</div>`}
    </div>
    <div class="budget-offline-note">☁️ Le modifiche vengono sincronizzate tra i due telefoni. Se siete offline, Firestore le conserva sul dispositivo e le invia quando torna la connessione.</div>`;

  $("#back-budget").addEventListener("click", () => history.back());
  let converterFrom = "USD";
  const converterAmount = $("#currency-amount");
  const converterFromSelect = $("#currency-from");
  const converterResult = $("#currency-result-value");
  const converterToLabel = $("#currency-to-label");
  const converterMeta = $("#currency-meta");

  async function runCurrencyConversion(){
    const amount = Number(converterAmount.value);
    converterFrom = converterFromSelect.value;
    const to = converterFrom === "USD" ? "EUR" : "USD";
    converterToLabel.textContent = to === "EUR" ? "EUR €" : "USD $";
    if (!Number.isFinite(amount) || amount < 0){ converterResult.textContent = "—"; return; }
    converterMeta.textContent = "Aggiornamento cambio in corso…";
    try{
      const response = await fetch(`https://api.frankfurter.dev/v2/rate/${converterFrom}/${to}`, { headers:{"Accept":"application/json"} });
      if (!response.ok) throw new Error("Cambio non disponibile");
      const data = await response.json();
      const value = amount * Number(data.rate);
      converterResult.textContent = new Intl.NumberFormat("it-IT", { minimumFractionDigits:2, maximumFractionDigits:2 }).format(value);
      const rateText = new Intl.NumberFormat("it-IT", { minimumFractionDigits:4, maximumFractionDigits:4 }).format(Number(data.rate));
      converterMeta.textContent = `1 ${converterFrom} = ${rateText} ${to} · tasso del ${data.date || "giorno disponibile"}. Cambio indicativo: la carta può applicare un valore diverso.`;
    }catch(err){
      converterResult.textContent = "—";
      converterMeta.textContent = "Connessione necessaria per aggiornare il cambio. Riprova quando sei online.";
    }
  }
  $("#currency-convert").addEventListener("click", runCurrencyConversion);
  $("#currency-swap").addEventListener("click", () => {
    converterFromSelect.value = converterFromSelect.value === "USD" ? "EUR" : "USD";
    runCurrencyConversion();
  });
  converterFromSelect.addEventListener("change", runCurrencyConversion);
  converterAmount.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); runCurrencyConversion(); } });
  runCurrencyConversion();

  $("#budget-edit-total").addEventListener("click", async () => {
    const value = prompt("Budget totale del viaggio in dollari:", String(total));
    if (value === null) return;
    const n = Number(String(value).replace(",","."));
    if (!Number.isFinite(n) || n <= 0){ alert("Inserisci un importo valido."); return; }
    await window.LFBudget.saveSettings({ totalBudget:n });
  });

  const form = $("#expense-form");
  if (editingExpenseId){
    const exp = expenses.find(e => e.id === editingExpenseId);
    if (exp){
      $("#expense-amount").value = exp.amount || "";
      $("#expense-date").value = exp.date || todayISO();
      $("#expense-city").innerHTML = expenseCityOptions(exp.city || "Generale");
      $("#expense-category").innerHTML = categoryOptions(exp.category || "Altro");
      $("#expense-description").value = exp.description || "";
    }
    $("#expense-cancel")?.addEventListener("click", () => { editingExpenseId = null; renderBudgetScreen(); });
  }
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const amount = Number($("#expense-amount").value);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const payload = { amount, date:$("#expense-date").value, city:$("#expense-city").value, category:$("#expense-category").value, description:$("#expense-description").value };
    const btn = $("#expense-save"), status=$("#expense-status");
    btn.disabled = true; status.textContent = navigator.onLine ? "Salvataggio…" : "Salvataggio offline…";
    try {
      if (editingExpenseId) await window.LFBudget.editExpense(editingExpenseId, payload);
      else await window.LFBudget.addExpense(payload);
      editingExpenseId = null;
      status.textContent = navigator.onLine ? "Salvato ✓" : "Salvato sul telefono · sincronizzerà appena torna Internet ✓";
      setTimeout(() => renderBudgetScreen(), 350);
    } catch(err){
      console.error(err); status.textContent = "Non sono riuscito a salvare la spesa.";
    } finally { btn.disabled = false; }
  });
  $$('[data-edit-expense]', el).forEach(btn => btn.addEventListener("click", () => { editingExpenseId = btn.dataset.editExpense; renderBudgetScreen(); window.scrollTo(0, Math.max(0, $("#expense-form").offsetTop - 90)); }));
  $$('[data-delete-expense]', el).forEach(btn => btn.addEventListener("click", async () => {
    const exp = expenses.find(e => e.id === btn.dataset.deleteExpense);
    if (!confirm(`Eliminare la spesa "${exp?.description || exp?.category || "selezionata"}"?`)) return;
    await window.LFBudget.removeExpense(btn.dataset.deleteExpense);
  }));
}

function expenseCategoryIcon(cat){
  return ({"Cibo":"🍽️","Benzina":"⛽","Parcheggio":"🅿️","Hotel & tasse":"🏨","Trasporti":"🚕","Shopping":"🛍️","Escursioni":"🎟️","Altro":"💳"})[cat] || "💳";
}

function formatExpenseDate(iso){
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("it-IT", { day:"2-digit", month:"short" });
}

function openBudget(pushHistory=true){
  if (!privateAuthState.authenticated){ openPrivateAccess(pushHistory); return; }
  renderBudgetScreen();
  navigateTo("budget", {}, pushHistory);
}

function connectFirebaseBudget(){
  if (!window.LFBudget || window.__lfBudgetConnected) return;
  window.__lfBudgetConnected = true;
  window.LFBudget.onAuth((state) => {
    privateAuthState = state;
    updatePrivateAreaEntry();
    updatePrivateTabsVisibility();
    if ($("#screen-home")?.classList.contains("active")) renderHome();
    if (!state.authenticated && $("#screen-budget")?.classList.contains("active")) openPrivateAccess(false);
  });
  window.LFBudget.onBudget((state) => {
    budgetState = state || { settings:null, expenses:[] };
    if ($("#screen-budget")?.classList.contains("active")) renderBudgetScreen();
  });
}

window.addEventListener("lf-firebase-ready", connectFirebaseBudget);


// ---------- SOS & informazioni utili ----------
function openSOS(pushHistory=true){
  // SOS condivide lo stesso accesso privato L&F del Budget.
  // Il tasto resta sempre visibile, ma i contenuti si aprono solo dopo l'autenticazione.
  if (!privateAuthState.authenticated){
    sessionStorage.setItem("lf-private-target", "sos");
    openPrivateAccess(pushHistory);
    return;
  }

  const el = $("#screen-sos");
  el.innerHTML = `
    <button class="back-btn" id="back-sos">‹ Indietro</button>
    <div class="sos-hero">
      <div class="sos-hero-icon">🆘</div>
      <div><small>Area privata L&amp;F</small><h2>SOS &amp; info utili</h2><p>Emergenze, assistenza consolare e riferimenti utili del viaggio.</p></div>
    </div>

    <div class="sos-emergency-card">
      <span>Emergenza immediata</span><strong>911</strong><p>Polizia · ambulanza · vigili del fuoco negli Stati Uniti e servizio 9-1-1 nelle aree coperte della Repubblica Dominicana.</p>
      <a href="tel:911">Chiama 911</a>
    </div>

    <div class="section-title">Assistenza italiana · tutti i contatti</div>
    <div class="sos-grid">
      <div class="sos-info-card"><div class="sos-card-icon">🇮🇹</div><div><small>Riferimento generale · emergenze all'estero</small><strong>Unità di Crisi Farnesina</strong><p>+39 06 36225</p></div><a href="tel:+390636225">Chiama</a></div>
      <div class="sos-info-card"><div class="sos-card-icon">🌉</div><div><small>San Francisco · emergenze cittadini italiani</small><strong>Consolato Generale d'Italia a San Francisco</strong><p>+1 415 999 0094</p></div><a href="tel:+14159990094">Chiama</a></div>
      <div class="sos-info-card"><div class="sos-card-icon">🌴</div><div><small>Los Angeles · Nevada · Arizona</small><strong>Consolato Generale d'Italia a Los Angeles</strong><p>+1 310 433 5422</p></div><a href="tel:+13104335422">Chiama</a></div>
      <div class="sos-info-card"><div class="sos-card-icon">🏙️</div><div><small>Chicago · emergenze cittadini italiani</small><strong>Consolato Generale d'Italia a Chicago</strong><p>+1 312 909 0304</p></div><a href="tel:+13129090304">Chiama</a></div>
      <div class="sos-info-card"><div class="sos-card-icon">🇩🇴</div><div><small>Repubblica Dominicana · emergenze consolari</small><strong>Ambasciata d'Italia a Santo Domingo</strong><p>+1 829 342 4942</p></div><a href="tel:+18293424942">Chiama</a></div>
    </div>

    <div class="section-title">Assicurazione viaggio</div>
    <div class="sos-info-card"><div class="sos-card-icon">🛡️</div><div><small>Da completare</small><strong>Copertura assicurativa</strong><p>Inseriremo qui compagnia, numero polizza, assistenza H24 e riferimenti utili appena disponibili.</p></div></div>
  `;
  $("#back-sos")?.addEventListener("click", () => history.back());
  navigateTo("sos", {}, pushHistory);
}

// ---------- Navigazione a schermate / tasto Indietro Android ----------
function showScreen(name){
  $$(".screen").forEach(s => s.classList.remove("active"));
  const target = $("#screen-" + name);
  if (target) target.classList.add("active");
  $$("nav.tabbar button").forEach(b => b.classList.toggle("active", b.dataset.screen === name));

  // La copertina "Viaggio di Nozze" appartiene solo alla Home.
  const topbar = $(".honeymoon-topbar");
  if (topbar) topbar.classList.toggle("home-only-hidden", name !== "home");

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
    openCity(st.legId, false, st);
    return;
  }
  if (st.screen === "food-detail" && st.legId && st.foodId){
    openFoodDetail(st.legId, st.foodId, false);
    return;
  }
  if (st.screen === "place-detail" && st.legId && st.placeName){
    openPlaceDetail(st.legId, st.placeName, false);
    return;
  }
  if (st.screen === "restaurant-detail" && st.legId && st.restaurantName){
    openRestaurantDetail(st.legId, st.restaurantName, false);
    return;
  }
  if (st.screen === "checklist"){
    openChecklist(false);
    return;
  }
  if (st.screen === "private-access"){
    openPrivateAccess(false);
    return;
  }
  if (st.screen === "budget"){
    openBudget(false);
    return;
  }
  if (st.screen === "sos"){
    openSOS(false);
    return;
  }
  if (st.screen === "cities") renderCitiesList();
  if (st.screen === "home") renderHome();
  showScreen(st.screen || "home");
}

async function loadWikipediaPlaceImage(detail, fallbackImage, imgEl, sourceEl){
  if (!detail || !detail.wikiTitle || !imgEl) return;
  const title = detail.wikiTitle;
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=1400&titles=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(apiUrl, { headers: { "Accept": "application/json" } });
    if (!response.ok) throw new Error("Wikipedia image unavailable");
    const data = await response.json();
    const pageData = data.query && data.query.pages ? Object.values(data.query.pages)[0] : null;
    const src = pageData && pageData.thumbnail && pageData.thumbnail.source;
    if (src) imgEl.src = src;
    if (sourceEl){
      const page = `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
      sourceEl.innerHTML = `<a href="${page}" target="_blank" rel="noopener">Immagine da Wikipedia/Wikimedia Commons ↗</a>`;
    }
  } catch(err){
    imgEl.src = fallbackImage || "";
    if (sourceEl) sourceEl.textContent = "Immagine della tappa";
  }
}

function openPlaceDetail(legId, placeName, pushHistory=true){
  const leg = TRIP.legs.find(l => l.id === legId);
  if (!leg) return;
  const place = (leg.places || []).find(p => p.name === placeName) || (leg.activities || []).find(a => a.name === placeName);
  if (!place) return;
  const detail = (typeof PLACE_DETAILS !== "undefined" && PLACE_DETAILS[place.name]) || {};
  const el = $("#screen-place-detail");

  el.innerHTML = `
    <button class="back-btn" id="back-from-place">‹ ${leg.city}</button>
    <div class="place-detail-hero">
      <img id="place-detail-image" src="${leg.image || ""}" alt="${place.name}" loading="eager">
      <div class="place-detail-overlay">
        <div class="place-detail-city">${leg.city}</div>
        <h2>${place.name}</h2>
        ${place.lf ? `<span class="lf-badge place-detail-lf" title="Scelto da L&F">L&amp;F</span>` : ""}
      </div>
    </div>
    <div class="place-detail-body">
      <div class="place-detail-kicker">${place.priority === "must" || (leg.activities || []).includes(place) ? "Da non perdere" : "Da scoprire"}</div>
      <p>${detail.text || place.note || ""}</p>
      ${(leg.activities || []).includes(place) && place.note ? `<div class="place-detail-plan"><strong>Nel vostro itinerario</strong><span>${place.note}</span></div>` : ""}
      <a class="place-detail-mapbtn" target="_blank" rel="noopener" href="${itemMapsUrl(place, place.name)}">📍 Apri in Google Maps</a>
      <div class="place-photo-source" id="place-photo-source">Caricamento immagine…</div>
    </div>
  `;

  $("#back-from-place").addEventListener("click", () => history.back());
  loadWikipediaPlaceImage(detail, leg.image, $("#place-detail-image"), $("#place-photo-source"));
  navigateTo("place-detail", { legId, placeName:place.name }, pushHistory);
  focusDetailHero("place-detail");
}

function googleSearchUrl(query){
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function openRestaurantDetail(legId, restaurantName, pushHistory=true){
  const leg = TRIP.legs.find(l => l.id === legId);
  if (!leg) return;
  const restaurant = (leg.restaurants || []).find(r => r.name === restaurantName);
  if (!restaurant) return;
  const el = $("#screen-restaurant-detail");
  const searchQuery = `${restaurant.name} ${leg.city} recensioni prezzi menu telefono orari`;
  const description = restaurant.description || restaurant.note || `Locale selezionato per la tappa di ${leg.city}.`;

  el.innerHTML = `
    <button class="back-btn" id="back-from-restaurant">‹ ${leg.city}</button>
    <div class="restaurant-detail-hero" style="background-image:linear-gradient(180deg, rgba(6,13,25,.10) 10%, rgba(6,13,25,.82) 100%), url('${leg.image || ""}')">
      <div class="restaurant-detail-overlay">
        <div class="restaurant-detail-city">${leg.city}</div>
        <h2>${restaurant.name}</h2>
        ${restaurant.lf ? `<span class="lf-badge restaurant-detail-lf" title="Scelto da L&F">L&amp;F</span>` : ""}
      </div>
    </div>
    <div class="restaurant-detail-body">
      ${restaurant.type || restaurant.price ? `<div class="restaurant-detail-type"><span>${restaurant.typeIcon || "🍽️"}</span><strong>${restaurant.type || "Ristorante"}</strong>${restaurant.price ? `<b class="price-band restaurant-detail-price">${restaurant.price}</b>` : ""}</div>` : ""}
      <p>${description}</p>
      <div class="restaurant-detail-actions">
        <a class="restaurant-google-btn" target="_blank" rel="noopener" href="${googleSearchUrl(searchQuery)}">🔎 Info, recensioni e prezzi su Google</a>
        <a class="restaurant-maps-btn" target="_blank" rel="noopener" href="${mapsUrl(restaurant.mapsQuery || restaurant.name + " " + leg.city)}">📍 Apri in Google Maps</a>
      </div>
    </div>
  `;

  $("#back-from-restaurant").addEventListener("click", () => history.back());
  navigateTo("restaurant-detail", { legId, restaurantName:restaurant.name }, pushHistory);
  focusDetailHero("restaurant-detail");
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
      ${selected.whereToFind && selected.whereToFind.length ? `
        <div class="food-where">
          <div class="food-where-title">📍 Dove provarlo</div>
          ${selected.whereToFind.map(place => `
            <div class="food-where-card">
              <div class="food-where-copy">
                <div class="food-where-name">${place.name}${place.price ? `<span class="price-band">${place.price}</span>` : ""}</div>
                <div class="food-where-note">${place.note || ""}</div>
              </div>
              <a class="mapbtn" target="_blank" rel="noopener" href="${mapsUrl(place.mapsQuery || place.name + " " + leg.city)}">Apri Maps</a>
            </div>`).join("")}
        </div>` : ""}
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
  focusDetailHero("food-detail");
}


function focusDetailHero(screenName){
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const screen = $("#screen-" + screenName);
    if (!screen || !screen.classList.contains("active")) return;
    const hero = screen.querySelector(".food-detail-hero, .place-detail-hero, .restaurant-detail-hero");
    if (hero) hero.scrollIntoView({ block:"start", inline:"nearest", behavior:"instant" });
  }));
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
  startChecklistCountdown();
  bindSecretPrivateAccess();
  updatePrivateTabsVisibility();

  // La prima voce della history è la Home: da una tappa il tasto Indietro
  // del Galaxy torna davvero alla schermata precedente anziché chiudere la PWA.
  history.replaceState({ screen:"home" }, "", "#home");
  showScreen("home");

  $$("nav.tabbar button").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.screen;
      if (target === "budget"){
        openBudget(true);
        return;
      }
      if (target === "sos"){
        openSOS(true);
        return;
      }
      if (target === "home") renderHome();
      if (target === "cities") renderCitiesList();
      navigateTo(target, {}, true);
    });
  });

  window.addEventListener("popstate", (event) => renderNavigationState(event.state));
  window.addEventListener("online", updateOnlineBadge);
  window.addEventListener("offline", updateOnlineBadge);
  updateOnlineBadge();
  connectFirebaseBudget();

  if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js", { scope: "./", updateViaCache: "none" }).catch((err)=>console.error("Service Worker registration failed:", err));
  }
}

document.addEventListener("DOMContentLoaded", init);


// ---------- Temi locali ----------
const APP_THEMES = {
  classic: { themeColor:"#F6F1E8" },
  green:   { themeColor:"#27362D" },
  blue:    { themeColor:"#EAF5FF" }
};

function applyAppTheme(themeName, persist=true){
  // "rose" era il vecchio tema Elegante Rosa: dalla v2.2.2 viene migrato a Blu Chicago.
  if (themeName === "rose") themeName = "blue";
  const theme = APP_THEMES[themeName] ? themeName : "classic";
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", APP_THEMES[theme].themeColor);
  $$(".theme-choice").forEach(btn => btn.classList.toggle("selected", btn.dataset.themeChoice === theme));
  if (persist) localStorage.setItem("lf-app-theme", theme);
}

function openThemePanel(){
  const panel = $("#theme-panel");
  const backdrop = $("#theme-panel-backdrop");
  const btn = $("#theme-menu-btn");
  if (!panel || !backdrop) return;
  backdrop.hidden = false;
  requestAnimationFrame(() => {
    backdrop.classList.add("open");
    panel.classList.add("open");
    panel.setAttribute("aria-hidden","false");
    btn?.setAttribute("aria-expanded","true");
  });
}

function closeThemePanel(){
  const panel = $("#theme-panel");
  const backdrop = $("#theme-panel-backdrop");
  const btn = $("#theme-menu-btn");
  if (!panel || !backdrop) return;
  panel.classList.remove("open");
  backdrop.classList.remove("open");
  panel.setAttribute("aria-hidden","true");
  btn?.setAttribute("aria-expanded","false");
  setTimeout(() => { if (!backdrop.classList.contains("open")) backdrop.hidden = true; }, 220);
}

function initThemePicker(){
  applyAppTheme(localStorage.getItem("lf-app-theme") || "classic", false);
  $("#theme-menu-btn")?.addEventListener("click", openThemePanel);
  $("#theme-panel-close")?.addEventListener("click", closeThemePanel);
  $("#theme-panel-backdrop")?.addEventListener("click", closeThemePanel);
  $$(".theme-choice").forEach(btn => btn.addEventListener("click", () => {
    applyAppTheme(btn.dataset.themeChoice, true);
    setTimeout(closeThemePanel, 120);
  }));
  document.addEventListener("keydown", ev => {
    if (ev.key === "Escape") closeThemePanel();
  });
}
initThemePicker();
