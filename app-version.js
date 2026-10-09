const LF_APP_VERSION = "2.4.53";
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

// Nessun MutationObserver: la 2.4.52 poteva creare un ciclo di mutazioni
// riscrivendo continuamente il testo della versione e bloccare la UI.
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
