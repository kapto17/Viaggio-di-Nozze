from pathlib import Path

# app.js: add secret access gesture to the classic illustrated home map
p=Path('app.js')
s=p.read_text(encoding='utf-8')
needle='\nfunction updatePrivateAreaEntry(){'
if needle not in s:
    raise SystemExit('updatePrivateAreaEntry marker not found')
helper=r'''

// Tema classico: la mappa sostituisce il titolo, quindi eredita lo stesso accesso segreto L&F.
function bindClassicPrivateAccess(){
  const hero = document.querySelector(".honeymoon-topbar");
  if(!hero || hero.dataset.lfClassicSecretBound === "1") return;
  hero.dataset.lfClassicSecretBound = "1";

  const isClassicTarget = (event) => {
    if(document.documentElement.dataset.theme !== "classic") return false;
    if(event.target.closest?.(".theme-menu-btn")) return false;
    return true;
  };
  const openPrivateDestination = () => {
    if(privateAuthState.authenticated) openBudget();
    else openPrivateAccess();
  };

  let lastMapTap = 0;
  hero.addEventListener("pointerup", (event) => {
    if(!isClassicTarget(event)) return;
    const now = Date.now();
    if(now - lastMapTap > 0 && now - lastMapTap < 450){
      event.preventDefault();
      lastMapTap = 0;
      openPrivateDestination();
      return;
    }
    lastMapTap = now;
  });

  hero.addEventListener("dblclick", (event) => {
    if(!isClassicTarget(event)) return;
    event.preventDefault();
    openPrivateDestination();
  });
}
'''
s=s.replace(needle, helper+needle, 1)
old='''  bindSecretPrivateAccess();\n  updatePrivateTabsVisibility();'''
new='''  bindSecretPrivateAccess();\n  bindClassicPrivateAccess();\n  updatePrivateTabsVisibility();'''
if old not in s:
    raise SystemExit('init secret access marker not found')
s=s.replace(old,new,1)
s=s.replace('Versione app 2.4.46','Versione app 2.4.47',1)
p.write_text(s,encoding='utf-8')

# index cache bust for app.js
p=Path('index.html')
s=p.read_text(encoding='utf-8')
if 'app.js?v=121' not in s:
    raise SystemExit('app cache bust not found')
s=s.replace('app.js?v=121','app.js?v=122',1)
p.write_text(s,encoding='utf-8')

# service worker cache version
p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v144' not in s:
    raise SystemExit('cache version not found')
s=s.replace('viaggio-nozze-v144','viaggio-nozze-v145',1)
p.write_text(s,encoding='utf-8')
