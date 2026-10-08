from pathlib import Path

# app.js: simplify ticket heading/copy, prevent reveal flash on history restore, bump version
p=Path('app.js')
s=p.read_text(encoding='utf-8')
s=s.replace('<div class="ticket-import-title">Biglietti L&F</div>','<div class="ticket-import-title">Biglietti</div>',1)
s=s.replace('      <div class="ticket-import-note">Carica una sola volta PDF o immagini: scegli nel wizard a cosa appartengono, di chi sono e come vuoi chiamarli.</div>\n','',1)
old='window.addEventListener("popstate", (event) => renderNavigationState(event.state));'
new='''window.addEventListener("popstate", (event) => {\n  const root = document.documentElement;\n  root.classList.add("history-restoring");\n  try {\n    renderNavigationState(event.state);\n  } finally {\n    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("history-restoring")));\n  }\n});'''
if old not in s: raise SystemExit('main popstate handler not found')
s=s.replace(old,new,1)
if 'Versione app 2.4.48' not in s: raise SystemExit('app version marker not found')
s=s.replace('Versione app 2.4.48','Versione app 2.4.49',1)
p.write_text(s,encoding='utf-8')

# ticket-sync.js: title only, no explanatory copy
p=Path('ticket-sync.js')
s=p.read_text(encoding='utf-8')
if 'setTextIfChanged(title, "Biglietti L&F");' not in s: raise SystemExit('ticket title sync marker not found')
s=s.replace('setTextIfChanged(title, "Biglietti L&F");','setTextIfChanged(title, "Biglietti");',1)
needle='      const note = box.querySelector(".ticket-import-note");\n'
if needle not in s: raise SystemExit('ticket note query not found')
s=s.replace(needle, needle+'      if(note) note.remove();\n',1)
s=s.replace('        setTextIfChanged(note, "Caricalo una sola volta: viene condiviso tra i vostri telefoni e resta disponibile anche offline dopo il download.");\n','',1)
s=s.replace('        setTextIfChanged(note, "I file reali dei biglietti sono privati. Accedi all\'area L&F dal Budget per visualizzarli o caricarli.");\n','',1)
p.write_text(s,encoding='utf-8')

# ticket-meta.css: make Open a full-width primary action and separate secondary actions
p=Path('ticket-meta.css')
s=p.read_text(encoding='utf-8')
s += r'''

/* V49 · Azioni biglietto più sicure su mobile */
.local-ticket-actions{
  display:grid!important;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;
  gap:8px!important;
  align-items:stretch;
}
.local-ticket-actions .local-ticket-open{
  grid-column:1 / -1;
  width:100%;
  min-height:42px;
  padding:10px 14px!important;
  font-size:13px!important;
  font-weight:850!important;
}
.local-ticket-actions .local-ticket-rename,
.local-ticket-actions .local-ticket-delete{
  width:100%;
  min-height:35px;
  padding:7px 10px!important;
}
'''
p.write_text(s,encoding='utf-8')

# motion-v3.css: history restore must not replay reveal animation for one frame
p=Path('motion-v3.css')
s=p.read_text(encoding='utf-8')
s += r'''

/* V49 · Su back/history la schermata ripristinata è già nota: niente reveal da opacity 0. */
html.history-restoring .motion-reveal,
html.history-restoring .motion-reveal.motion-visible{
  opacity:1!important;
  transform:none!important;
  transition:none!important;
  will-change:auto!important;
}
html.history-restoring .program-item.motion-reveal:not(:last-child)::after{
  transform:scaleY(1)!important;
  transition:none!important;
}
html.history-restoring .program-transfer-row.motion-reveal .program-transfer-rail::before{
  transform:translateX(-50%) scaleY(1)!important;
  transition:none!important;
}
'''
p.write_text(s,encoding='utf-8')

# index cache busts
p=Path('index.html')
s=p.read_text(encoding='utf-8')
repls={
  'motion-v3.css?v=2':'motion-v3.css?v=3',
  'ticket-meta.css?v=3':'ticket-meta.css?v=4',
  'app.js?v=123':'app.js?v=124',
  'ticket-sync.js?v=4':'ticket-sync.js?v=5'
}
for old,new in repls.items():
    if old not in s: raise SystemExit(f'index marker not found: {old}')
    s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')

# service worker cache bump
p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v146' not in s: raise SystemExit('service worker cache marker not found')
s=s.replace('viaggio-nozze-v146','viaggio-nozze-v147',1)
p.write_text(s,encoding='utf-8')
