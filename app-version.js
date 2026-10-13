const LF_APP_VERSION = "2.4.66";
window.LF_APP_VERSION = LF_APP_VERSION;

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
