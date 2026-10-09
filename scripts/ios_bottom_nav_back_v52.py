from pathlib import Path

# motion.js: update bottom nav synchronously during history restore, before iOS paints stale pill state.
p = Path('motion.js')
s = p.read_text(encoding='utf-8')
old = '''  function syncTabPill(){\n    const nav = document.querySelector("nav.tabbar");\n    if(!nav) return;\n    nav.classList.add("motion-nav");\n    const active = Array.from(nav.querySelectorAll("button.active"))\n      .find(btn => !btn.hidden && btn.getClientRects().length);\n    if(!active) return;\n    const navRect = nav.getBoundingClientRect();\n    const btnRect = active.getBoundingClientRect();\n    nav.style.setProperty("--motion-pill-left", `${(btnRect.left-navRect.left).toFixed(1)}px`);\n    nav.style.setProperty("--motion-pill-width", `${btnRect.width.toFixed(1)}px`);\n    nav.classList.add("motion-nav-ready");\n  }'''
new = '''  function syncTabPill(){\n    const nav = document.querySelector("nav.tabbar");\n    if(!nav) return;\n    const restoring = document.documentElement.classList.contains("history-restoring");\n    if(restoring) nav.classList.add("motion-nav-restoring");\n    nav.classList.add("motion-nav");\n    const active = Array.from(nav.querySelectorAll("button.active"))\n      .find(btn => !btn.hidden && btn.getClientRects().length);\n    if(!active) return;\n    const navRect = nav.getBoundingClientRect();\n    const btnRect = active.getBoundingClientRect();\n    nav.style.setProperty("--motion-pill-left", `${(btnRect.left-navRect.left).toFixed(1)}px`);\n    nav.style.setProperty("--motion-pill-width", `${btnRect.width.toFixed(1)}px`);\n    nav.classList.add("motion-nav-ready");\n    if(restoring){\n      const token = String((Number(nav.dataset.motionRestoreToken || 0) + 1));\n      nav.dataset.motionRestoreToken = token;\n      requestAnimationFrame(() => requestAnimationFrame(() => {\n        if(nav.dataset.motionRestoreToken === token) nav.classList.remove("motion-nav-restoring");\n      }));\n    }\n  }'''
if old not in s:
    raise SystemExit('syncTabPill marker not found')
s = s.replace(old, new, 1)
old = '    const observer = new MutationObserver(() => requestAnimationFrame(syncTabPill));'
new = '''    const observer = new MutationObserver(() => {\n      // During browser Back, run before the next paint so iOS never renders\n      // the previous active pill/icon state for one frame.\n      if(document.documentElement.classList.contains("history-restoring")) syncTabPill();\n      else requestAnimationFrame(syncTabPill);\n    });'''
if old not in s:
    raise SystemExit('bottom-nav observer marker not found')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

# motion-v3.css: absolutely no nav transitions during the back-state handoff.
p = Path('motion-v3.css')
s = p.read_text(encoding='utf-8')
s += r'''

/* V52 · iOS PWA: nessun frame intermedio della bottom bar durante Indietro. */
nav.tabbar.motion-nav.motion-nav-restoring,
nav.tabbar.motion-nav.motion-nav-restoring *,
nav.tabbar.motion-nav.motion-nav-restoring::before{
  transition:none!important;
  animation:none!important;
}
nav.tabbar.motion-nav.motion-nav-restoring.motion-nav-ready::before{
  opacity:1!important;
}
'''
p.write_text(s, encoding='utf-8')

# visible app version
p = Path('app.js')
s = p.read_text(encoding='utf-8')
if 'Versione app 2.4.51' not in s:
    raise SystemExit('app version marker not found')
s = s.replace('Versione app 2.4.51', 'Versione app 2.4.52', 1)
p.write_text(s, encoding='utf-8')

# cache bust changed assets
p = Path('index.html')
s = p.read_text(encoding='utf-8')
for old, new in [
    ('motion-v3.css?v=3', 'motion-v3.css?v=4'),
    ('app.js?v=126', 'app.js?v=127'),
    ('motion.js?v=4', 'motion.js?v=5'),
]:
    if old not in s:
        raise SystemExit(f'index marker not found: {old}')
    s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

# PWA cache bump
p = Path('sw.js')
s = p.read_text(encoding='utf-8')
if 'viaggio-nozze-v149' not in s:
    raise SystemExit('service worker cache marker not found')
s = s.replace('viaggio-nozze-v149', 'viaggio-nozze-v150', 1)
p.write_text(s, encoding='utf-8')
