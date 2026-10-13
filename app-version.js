const LF_APP_VERSION = "2.4.67";
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
