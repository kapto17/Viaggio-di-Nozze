from pathlib import Path

p=Path('index.html')
s=p.read_text(encoding='utf-8')
if 'today-weather.css?v=1' not in s:
    marker='<link rel="stylesheet" href="lakers-guide.css?v=1">'
    if marker not in s: raise SystemExit('index css marker missing')
    s=s.replace(marker, marker+'\n<link rel="stylesheet" href="today-weather.css?v=1">',1)
if 'today-weather.js?v=1' not in s:
    marker='<script src="lakers-guide.js?v=1"></script>'
    if marker not in s: raise SystemExit('index js marker missing')
    s=s.replace(marker, marker+'\n<script src="today-weather.js?v=1"></script>',1)
s=s.replace('app.js?v=115','app.js?v=116',1)
p.write_text(s,encoding='utf-8')

p=Path('app.js')
s=p.read_text(encoding='utf-8')
if 'Versione app 2.4.39' not in s: raise SystemExit('app version marker missing')
s=s.replace('Versione app 2.4.39','Versione app 2.4.40',1)
p.write_text(s,encoding='utf-8')

p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v136' not in s: raise SystemExit('sw cache marker missing')
s=s.replace('viaggio-nozze-v136','viaggio-nozze-v137',1)
if '"./today-weather.css",' not in s:
    marker='  "./lakers-guide.css",\n'
    if marker not in s: raise SystemExit('sw css marker missing')
    s=s.replace(marker,marker+'  "./today-weather.css",\n',1)
if '"./today-weather.js",' not in s:
    marker='  "./lakers-guide.js",\n'
    if marker not in s: raise SystemExit('sw js marker missing')
    s=s.replace(marker,marker+'  "./today-weather.js",\n',1)
core_old='"/lakers-guide.js", "/lakers-guide.css", "/manifest.json"'
core_new='"/lakers-guide.js", "/lakers-guide.css", "/today-weather.js", "/today-weather.css", "/manifest.json"'
if core_old in s:
    s=s.replace(core_old,core_new,1)
p.write_text(s,encoding='utf-8')
