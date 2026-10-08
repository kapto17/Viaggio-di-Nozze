from pathlib import Path

# index.html
p=Path('index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('ticket-meta.css?v=1','ticket-meta.css?v=2')
s=s.replace('firebase-budget.js?v=35','firebase-budget.js?v=36')
s=s.replace('app.js?v=117','app.js?v=118')
s=s.replace('ticket-meta.js?v=1','ticket-meta.js?v=2')
if 'ticket-sync.js?v=1' not in s:
    marker='<script src="ticket-meta.js?v=2"></script>'
    if marker not in s: raise SystemExit('ticket meta script marker missing')
    s=s.replace(marker, marker+'\n<script src="ticket-sync.js?v=1"></script>',1)
p.write_text(s,encoding='utf-8')

# app version + copy
p=Path('app.js')
s=p.read_text(encoding='utf-8')
if 'Versione app 2.4.41' not in s: raise SystemExit('app version marker missing')
s=s.replace('Versione app 2.4.41','Versione app 2.4.42',1)
s=s.replace('<div class="ticket-import-title">Biglietti offline</div>','<div class="ticket-import-title">Biglietti L&F</div>',1)
s=s.replace('I file restano solo su questo dispositivo e non vengono caricati su GitHub. Scegli prima a quale prenotazione appartengono.','Accedi all\'area L&F per caricare e vedere i file condivisi. Scegli prima a quale prenotazione appartengono.',1)
p.write_text(s,encoding='utf-8')

# service worker
p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v138' not in s: raise SystemExit('cache marker missing')
s=s.replace('viaggio-nozze-v138','viaggio-nozze-v139',1)
if '"./ticket-sync.js",' not in s:
    marker='  "./ticket-meta.js",\n'
    if marker not in s: raise SystemExit('ticket meta asset marker missing')
    s=s.replace(marker,marker+'  "./ticket-sync.js",\n',1)
old='"/ticket-meta.js", "/ticket-meta.css", "/manifest.json"'
new='"/ticket-meta.js", "/ticket-meta.css", "/ticket-sync.js", "/manifest.json"'
if old not in s: raise SystemExit('core marker missing')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')
