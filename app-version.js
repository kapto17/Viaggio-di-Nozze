const LF_APP_VERSION = "2.4.71";
window.LF_APP_VERSION = LF_APP_VERSION;

// 2.4.71 · Safari/iPhone effettua auto-zoom quando un input ha font < 16px.
// Il wizard spese usa 13px nei campi finali: portiamo solo quei controlli a 16px
// senza disabilitare lo zoom manuale dell'app.
(function installExpenseWizardIosZoomFix(){
  const styleId = "lf-expense-ios-zoom-fix";
  if(document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @supports (-webkit-touch-callout: none) {
      .expense-wizard .wizard-field input,
      .expense-wizard .wizard-field select {
        font-size:16px!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

// 2.4.67 · Modifica puntuale al 28/10: rende esplicito il casello South Entrance
// senza riscrivere data.js, così non interferiamo con modifiche fatte in altre chat.
(function addGrandCanyonSouthEntrance(){
  try{
    if(typeof PROGRAM_GUIDE === "undefined") return;
    const day = PROGRAM_GUIDE?.page?.find?.(item => item.date === "2026-10-28");
    if(!day || !Array.isArray(day.items)) return;

    const departure = day.items.find(item => item.title === "Partenza dal Paris Las Vegas");
    if(departure) departure.mapsQuery = "Grand Canyon South Entrance Station Arizona";

    if(day.items.some(item => item.title === "Grand Canyon South Entrance Station")) return;
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

function applyVisibleVersion(){
  const home = document.querySelector("#screen-home");
  if(!home) return;

  // Dal 20/10 il vecchio core non crea più questo elemento: da 2.4.69
  // lo gestiamo qui direttamente, così il contatore resta sempre visibile.
  let el = home.querySelector(".home-app-version");
  if(!el){
    el = document.createElement("div");
    el.className = "home-app-version";
    home.appendChild(el);
  }
  el.textContent = `Versione app ${LF_APP_VERSION}`;
}

function scheduleVersionUpdate(){
  requestAnimationFrame(() => requestAnimationFrame(applyVisibleVersion));
}

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

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleVersionUpdate, { once:true });
else scheduleVersionUpdate();

document.addEventListener("click", event => {
  if (event.target.closest('nav.tabbar button[data-screen="home"]')) scheduleVersionUpdate();
});
window.addEventListener("popstate", scheduleVersionUpdate);
window.addEventListener("pageshow", scheduleVersionUpdate);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) scheduleVersionUpdate();
});
