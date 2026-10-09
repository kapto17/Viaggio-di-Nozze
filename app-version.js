const LF_APP_VERSION = "2.4.52";
window.LF_APP_VERSION = LF_APP_VERSION;

function applyVisibleVersion(){
  document.querySelectorAll(".home-app-version").forEach(el => {
    el.textContent = `Versione app ${LF_APP_VERSION}`;
  });
}

const versionObserver = new MutationObserver(applyVisibleVersion);

function startVersionSync(){
  applyVisibleVersion();
  const home = document.querySelector("#screen-home");
  if (home) versionObserver.observe(home, { childList:true, subtree:true });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startVersionSync, { once:true });
else startVersionSync();
