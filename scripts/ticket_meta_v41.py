from pathlib import Path

p=Path('index.html')
s=p.read_text(encoding='utf-8')
if 'ticket-meta.css?v=1' not in s:
    marker='<link rel="stylesheet" href="today-weather.css?v=1">'
    if marker not in s: raise SystemExit('index css marker missing')
    s=s.replace(marker, marker+'\n<link rel="stylesheet" href="ticket-meta.css?v=1">',1)
if 'ticket-meta.js?v=1' not in s:
    marker='<script src="today-weather.js?v=1"></script>'
    if marker not in s: raise SystemExit('index js marker missing')
    s=s.replace(marker, marker+'\n<script src="ticket-meta.js?v=1"></script>',1)
s=s.replace('app.js?v=116','app.js?v=117',1)
p.write_text(s,encoding='utf-8')

p=Path('app.js')
s=p.read_text(encoding='utf-8')
if 'Versione app 2.4.40' not in s: raise SystemExit('app version marker missing')
s=s.replace('Versione app 2.4.40','Versione app 2.4.41',1)
p.write_text(s,encoding='utf-8')

p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v137' not in s: raise SystemExit('sw cache marker missing')
s=s.replace('viaggio-nozze-v137','viaggio-nozze-v138',1)
if '"./ticket-meta.css",' not in s:
    marker='  "./today-weather.css",\n'
    if marker not in s: raise SystemExit('sw css marker missing')
    s=s.replace(marker, marker+'  "./ticket-meta.css",\n',1)
if '"./ticket-meta.js",' not in s:
    marker='  "./today-weather.js",\n'
    if marker not in s: raise SystemExit('sw js marker missing')
    s=s.replace(marker, marker+'  "./ticket-meta.js",\n',1)
old='"/today-weather.js", "/today-weather.css", "/manifest.json"'
new='"/today-weather.js", "/today-weather.css", "/ticket-meta.js", "/ticket-meta.css", "/manifest.json"'
if old not in s: raise SystemExit('sw core marker missing')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')
