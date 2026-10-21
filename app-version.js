const LF_APP_VERSION = "2.4.68";
window.LF_APP_VERSION = LF_APP_VERSION;

// 2.4.67 · Modifica puntuale al 28/10: rende esplicito il casello South Entrance
// senza riscrivere data.js, così non interferiamo con modifiche fatte in altre chat.
(function addGrandCanyonSouthEntrance(){
  try{
    if(typeof PROGRAM_GUIDE === "undefined") return;
    const day = PROGRAM_GUIDE?.page?.find?.(item => item.date === "2026-10-28");
    if(!day || !Array.isArray(day.items)) return;

    const departure = day.items.find(item => item.title === "Partenza dal Paris Las Vegas");
    if(departure){
      departure.mapsQuery = "Grand Canyon South Entrance Station Arizona";
    }

    const alreadyThere = day.items.some(item => item.title === "Grand Canyon South Entrance Station");
    if(alreadyThere) return;

    const entrance = {
      time: "11:30 circa",
      kind: "recommended",
      icon: "🎟️",
      title: "Grand Canyon South Entrance Station",
      note: "Casello d'ingresso al South Rim. Se avete già il pass, mostratelo qui; altrimenti potete acquistare l'ingresso al casello. Poi proseguite verso il Visitor Center, circa 10 minuti più avanti.",
      mapsQuery: "Grand Canyon South Entrance Station Arizona"
    };

    const visitorIndex = day.items.findIndex(item => item.title === "Visitor Center · parcheggio");
    if(visitorIndex >= 0) day.items.splice(visitorIndex, 0, entrance);
    else day.items.splice(1, 0, entrance);
  }catch(err){
    console.error("Grand Canyon South Entrance waypoint:", err);
  }
})();

// 2.4.68 · Correzioni isolate della sezione OGGI.
// 1) La card Home deve mantenere la foto della tappa anche quando il tema generale
//    imposta un background !important sulle .today-card.
// 2) Nella schermata OGGI rende apribile il voucher dell'hotel già caricato,
//    usando lo stesso archivio Biglietti/Documenti senza creare duplicati.
(function installTodayFixes(){
  const styleId = "lf-today-24868-style";
  if(!document.getElementById(styleId)){
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .today-card.today-image-card{
        background-image:var(--today-bg)!important;
        background-color:#253247!important;
        background-size:cover!important;
        background-position:center!important;
        background-repeat:no-repeat!important;
        color:#fff!important;
        border:0!important;
      }
      .today-card.today-image-card .today-preview-shade{
        background:linear-gradient(90deg,rgba(7,15,27,.66),rgba(7,15,27,.16))!important;
      }
      .today-card.today-image-card .today-preview-content,
      .today-card.today-image-card .today-preview-content small,
      .today-card.today-image-card .today-preview-content strong,
      .today-card.today-image-card .today-preview-content em,
      .today-card.today-image-card .today-preview-arrow{
        color:#fff!important;
      }
      .today-card.today-image-card .today-preview-content{
        border-top:0!important;
      }
      .today-hotel-voucher-quick{
        margin:-2px 0 14px;
      }
      .today-hotel-voucher-btn{
        width:100%;display:grid;grid-template-columns:38px 1fr auto;gap:10px;align-items:center;
        padding:11px 13px;border:1px solid rgba(22,35,63,.12);border-radius:15px;
        background:rgba(255,255,255,.88);color:var(--ink);font:inherit;text-align:left;cursor:pointer;
        box-shadow:0 8px 22px -19px rgba(22,35,63,.45);
      }
      .today-hotel-voucher-btn>span{
        width:38px;height:38px;display:grid;place-items:center;border-radius:12px;
        background:var(--paper-alt);font-size:19px;
      }
      .today-hotel-voucher-btn>div{min-width:0}
      .today-hotel-voucher-btn small{
        display:block;font-size:8.5px;font-weight:900;letter-spacing:.08em;color:var(--ink-soft);
      }
      .today-hotel-voucher-btn strong{
        display:block;margin-top:2px;font-size:12.5px;line-height:1.25;color:var(--ink);
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
      }
      .today-hotel-voucher-btn>b{font-size:22px;opacity:.55}
      .today-hotel-voucher-btn:disabled{opacity:.58;cursor:default}
    `;
    document.head.appendChild(style);
  }

  const normalize = value => String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  function voucherLabel(hotelName){
    return `Voucher hotel · ${hotelName || "Alloggio"}`;
  }

  function voucherTargetKey(legId, hotelName){
    const label = voucherLabel(hotelName);
    if(typeof window.ticketKey === "function") return window.ticketKey(legId, label);
    return `${legId}::${normalize(label)}`;
  }

  async function refreshTodayHotelVoucher(){
    const screen = document.getElementById("screen-today");
    if(!screen?.classList.contains("active")) return;

    const existing = screen.querySelector(".today-hotel-voucher-quick");
    if(!window.LFBudget?.isAuthenticated?.()){
      existing?.remove();
      return;
    }

    const legId = screen.dataset.legId || "";
    const leg = typeof TRIP !== "undefined" ? TRIP.legs?.find?.(item => item.id === legId) : null;
    const hotelName = leg?.hotel?.name || "";
    if(!legId || !hotelName){
      existing?.remove();
      return;
    }

    const targetLabel = voucherLabel(hotelName);
    const targetKey = voucherTargetKey(legId, hotelName);
    let records = [];
    try{
      if(typeof window.getTicketsForTarget === "function"){
        records = await window.getTicketsForTarget(targetKey);
      }
    }catch(err){
      console.error("Voucher hotel in Oggi:", err);
    }

    if(!records.length){
      existing?.remove();
      return;
    }

    let host = existing;
    if(!host){
      host = document.createElement("div");
      host.className = "today-hotel-voucher-quick";
      const hero = screen.querySelector(".today-screen-hero");
      if(!hero) return;
      hero.insertAdjacentElement("afterend", host);
    }

    host.innerHTML = `<button type="button" class="today-hotel-voucher-btn"><span>🏨</span><div><small>ALLOGGIO DI OGGI</small><strong>🎟️ Apri voucher · ${hotelName}</strong></div><b>›</b></button>`;
    const button = host.querySelector(".today-hotel-voucher-btn");
    button?.addEventListener("click", async () => {
      if(typeof window.openTicketsForTarget !== "function") return;
      button.disabled = true;
      try{
        await window.openTicketsForTarget(targetKey, targetLabel);
      }catch(err){
        console.error("Apertura voucher hotel da Oggi:", err);
        alert("Non sono riuscito ad aprire il voucher dell'hotel.");
      }finally{
        button.disabled = false;
      }
    });
  }

  function scheduleVoucherRefresh(delay=0){
    setTimeout(() => refreshTodayHotelVoucher().catch(err => console.error("Voucher Oggi:", err)), delay);
  }

  const originalOpenToday = window.openTodayScreen;
  if(typeof originalOpenToday === "function" && !originalOpenToday.__lfVoucherWrapped){
    function wrappedOpenToday(...args){
      const result = originalOpenToday.apply(this, args);
      scheduleVoucherRefresh(0);
      scheduleVoucherRefresh(500);
      return result;
    }
    wrappedOpenToday.__lfVoucherWrapped = true;
    window.openTodayScreen = wrappedOpenToday;
  }

  let ticketsBound = false;
  function bindTicketRefresh(){
    if(ticketsBound || !window.LFBudget || typeof window.LFBudget.onTickets !== "function") return;
    ticketsBound = true;
    window.LFBudget.onTickets(() => scheduleVoucherRefresh(100));
  }

  window.addEventListener("lf-firebase-ready", () => {
    bindTicketRefresh();
    scheduleVoucherRefresh(250);
  });
  window.addEventListener("lf-local-ticket-changed", () => scheduleVoucherRefresh(100));
  window.addEventListener("pageshow", () => scheduleVoucherRefresh(100));
  bindTicketRefresh();
})();

function applyVisibleVersion(){
  document.querySelectorAll(".home-app-version").forEach(el => {
    const expected = `Versione app ${LF_APP_VERSION}`;
    if (el.textContent !== expected) el.textContent = expected;
  });
}

function scheduleVersionUpdate(){
  requestAnimationFrame(() => requestAnimationFrame(applyVisibleVersion));
}

// Il core storico crea ancora la Home con una versione hardcoded.
// Avvolgiamo renderHome una sola volta: così OGNI ridisegno della Home
// (compreso quello provocato dall'arrivo dello stato Firebase) applica
// subito la versione corrente senza MutationObserver e senza loop DOM.
(function wrapRenderHome(){
  const original = window.renderHome;
  if (typeof original !== "function" || original.__lfVersionWrapped) return;

  function wrappedRenderHome(...args){
    const result = original.apply(this, args);
    applyVisibleVersion();
    return result;
  }
  wrappedRenderHome.__lfVersionWrapped = true;
  window.renderHome = wrappedRenderHome;
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", scheduleVersionUpdate, { once:true });
} else {
  scheduleVersionUpdate();
}

document.addEventListener("click", event => {
  if (event.target.closest('nav.tabbar button[data-screen="home"]')) scheduleVersionUpdate();
});
window.addEventListener("popstate", scheduleVersionUpdate);
window.addEventListener("pageshow", scheduleVersionUpdate);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) scheduleVersionUpdate();
});
