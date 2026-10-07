from pathlib import Path

# ---------- data.js ----------
p=Path('data.js')
t=p.read_text(encoding='utf-8')

place_marker='const PLACE_DETAILS = {\n'
place_detail='''const PLACE_DETAILS = {\n  "Los Angeles Lakers vs LA Clippers": {\n    image: "./assets/crypto-arena-lakers.jpg",\n    text: "Venerdì 23 ottobre alle 19:00: Lakers–Clippers alla Crypto.com Arena. Biglietti già acquistati; questa scheda raccoglie il piano pratico per arrivare, entrare, cenare dopo la partita e rientrare senza usare l'auto a noleggio.",\n    officialUrl: "https://www.nba.com/lakers/game/0022600102-clippers-vs-lakers-los-angeles-ca-10-23-2026",\n    officialLabel: "🏀 Dettagli partita Lakers",\n    photoCredit: "Troutfarm27 / Wikimedia Commons · CC BY-SA 4.0"\n  },\n'''
if '"Los Angeles Lakers vs LA Clippers": {' not in t:
    if place_marker not in t: raise SystemExit('PLACE_DETAILS marker missing')
    t=t.replace(place_marker,place_detail,1)

start=t.find('''    {\n      "date": "2026-10-23",\n      "title": "Arrivo a Los Angeles e Lakers–Clippers",''')
end=t.find('''    {\n      "date": "2026-10-24",''', start)
if start < 0 or end < 0: raise SystemExit('Oct 23 itinerary markers missing')

day='''    {\n      "date": "2026-10-23",\n      "title": "Arrivo a Los Angeles e Lakers–Clippers",\n      "theme": "Arrivo da San Francisco, ritiro auto e check-in con pausa; poi Uber/Lyft diretto alla Crypto.com Arena, partita e cena a piedi in Downtown prima del rientro.",\n      "items": [\n        {\n          "time": "08:00",\n          "kind": "recommended",\n          "icon": "🚕",\n          "title": "Partenza da Hotel Spero",\n          "note": "Lasciate l'hotel con margine per traffico, bagagli e controlli del volo domestico delle 11:00.",\n          "mapsQuery": "San Francisco International Airport"\n        },\n        {\n          "time": "08:30 circa",\n          "kind": "recommended",\n          "icon": "🛫",\n          "title": "Arrivo a SFO",\n          "note": "Check-in/bag drop se necessario e controlli di sicurezza. Obiettivo: essere al gate con ampio margine."\n        },\n        {\n          "time": "11:00",\n          "kind": "recommended",\n          "icon": "✈️",\n          "title": "Volo SFO → LAX",\n          "note": "Partenza da San Francisco. Durata prevista 1h36."\n        },\n        {\n          "time": "12:36",\n          "kind": "recommended",\n          "icon": "🛬",\n          "title": "Arrivo a Los Angeles · LAX",\n          "note": "Atterraggio previsto alle 12:36. Recuperate i bagagli e seguite le indicazioni Rental Car Shuttles."\n        },\n        {\n          "time": "13:20 circa",\n          "kind": "transfer",\n          "icon": "🚌",\n          "title": "Spostamento · terminal LAX → Rental Car Center",\n          "note": "🚌 Navetta Rental Car · considerate circa 15–25 min tra attesa, percorso e discesa al Rental Car Center.",\n          "mapsQuery": "LAX Rental Car Center 5251 West 98th Street Los Angeles"\n        },\n        {\n          "time": "14:00 circa",\n          "kind": "recommended",\n          "icon": "🚗",\n          "title": "Ritiro auto · Alamo",\n          "note": "Orario realistico dopo bagagli, shuttle e pratica di noleggio. Da qui avete il SUV fino alla riconsegna a Las Vegas.",\n          "mapsQuery": "Alamo Rent A Car LAX Rental Car Center 5251 West 98th Street Los Angeles"\n        },\n        {\n          "time": "14:20 circa",\n          "kind": "transfer",\n          "icon": "🚗",\n          "title": "Spostamento · LAX Rental Car Center → The Commerce Hotel",\n          "note": "🚗 In auto · circa 30 km · 35–60 min a seconda del traffico. Nessun appuntamento rigido prima del check-in.",\n          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"\n        },\n        {\n          "time": "15:30 circa",\n          "kind": "recommended",\n          "icon": "🏨",\n          "title": "Check-in al The Commerce",\n          "note": "Lasciate i bagagli, rinfrescatevi e riposate un po'. Il SUV resta parcheggiato in hotel per tutta la serata.",\n          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040",\n          "mapLat": 33.998348,\n          "mapLon": -118.145255\n        },\n        {\n          "time": "16:50–17:00",\n          "kind": "transfer",\n          "icon": "🚕",\n          "title": "Uber/Lyft · The Commerce → Crypto.com Arena",\n          "note": "🚕 Corsa diretta · circa 17 km. Nel traffico del venerdì tenete un margine largo: obiettivo arrivo tra 17:35 e 17:50. Lasciamo l'auto a noleggio in hotel ed evitiamo parcheggio e uscita post-partita.",\n          "mapsQuery": "Crypto.com Arena 1111 S Figueroa St Los Angeles CA 90015"\n        },\n        {\n          "time": "17:35–17:50 circa",\n          "kind": "recommended",\n          "icon": "🏀",\n          "title": "Arrivo · Crypto.com Arena / Star Plaza",\n          "note": "Foto all'esterno e atmosfera pre-partita. Non serve fissare un ingresso ora: Kobe Bryant Entrance, Star Plaza Entrance e Figueroa Entrance sono i tre accessi principali per i normali biglietti; scegliete quello con meno coda.",\n          "mapsQuery": "Crypto.com Arena Star Plaza Los Angeles CA"\n        },\n        {\n          "time": "18:00 circa",\n          "kind": "recommended",\n          "icon": "🎟️",\n          "title": "Ingresso e controlli",\n          "note": "Biglietto mobile già aperto nell'app autorizzata: screenshot/QR stampati non sono accettati. Evitate borse; è ammesso solo un piccolo wallet/clutch entro i limiti dell'arena. Dentro l'arena i pagamenti sono cashless."\n        },\n        {\n          "time": "19:00",\n          "kind": "booked",\n          "icon": "🎟️",\n          "title": "Los Angeles Lakers vs LA Clippers",\n          "note": "Partita NBA alla Crypto.com Arena · biglietti acquistati. Tutti i consigli pratici della serata sono nella scheda dedicata: tocca questa voce.",\n          "mapsQuery": "Crypto.com Arena 1111 S Figueroa St Los Angeles CA 90015",\n          "detailPlace": "Los Angeles Lakers vs LA Clippers"\n        },\n        {\n          "time": "21:30–22:00 circa",\n          "kind": "transfer",\n          "icon": "🚶",\n          "title": "A piedi · Crypto.com Arena → JOEY DTLA",\n          "note": "🚶 Circa 1,1 km · 16 min. Ci allontaniamo dalla folla dello stadio invece di chiamare subito Uber nel picco di domanda. Se siete stanchi o non vi convince la passeggiata quella sera, nella scheda partita trovate alternative più vicine.",\n          "mapsQuery": "JOEY DTLA 700 W 7th St Los Angeles CA 90017"\n        },\n        {\n          "time": "22:00 circa",\n          "kind": "recommended",\n          "icon": "🍽️",\n          "title": "Cena post-partita · JOEY DTLA",\n          "note": "Cena vera fuori dalla zona immediata dell'arena. Il venerdì resta aperto fino all'1:00: nessuna fretta se la partita finisce tardi o va all'overtime.",\n          "mapsQuery": "JOEY DTLA 700 W 7th St Los Angeles CA 90017"\n        },\n        {\n          "time": "23:15–00:00 circa",\n          "kind": "transfer",\n          "icon": "🚕",\n          "title": "Rientro · JOEY DTLA → The Commerce Hotel",\n          "note": "🚕 Dopo cena confrontate Uber, Lyft e Curb e scegliete il prezzo migliore. Curb usa taxi regolari con tariffa anticipata; dopo aver lasciato passare il picco post-partita il rideshare dovrebbe essere più gestibile.",\n          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"\n        }\n      ]\n    },\n'''
t=t[:start]+day+t[end:]
p.write_text(t,encoding='utf-8')

# ---------- app.js ----------
p=Path('app.js')
a=p.read_text(encoding='utf-8')
if 'Versione app 2.4.38' not in a: raise SystemExit('app version marker missing')
a=a.replace('Versione app 2.4.38','Versione app 2.4.39',1)
p.write_text(a,encoding='utf-8')

# ---------- index.html ----------
p=Path('index.html')
i=p.read_text(encoding='utf-8')
for old,new in [('data.js?v=107','data.js?v=108'),('app.js?v=114','app.js?v=115')]:
    if old not in i: raise SystemExit(f'index marker missing: {old}')
    i=i.replace(old,new,1)
css_marker='<link rel="stylesheet" href="budget-summary.css?v=1">'
if 'lakers-guide.css?v=1' not in i:
    if css_marker not in i: raise SystemExit('index css marker missing')
    i=i.replace(css_marker,css_marker+'\n<link rel="stylesheet" href="lakers-guide.css?v=1">',1)
js_marker='<script src="budget-summary.js?v=1"></script>'
if 'lakers-guide.js?v=1' not in i:
    if js_marker not in i: raise SystemExit('index js marker missing')
    i=i.replace(js_marker,js_marker+'\n<script src="lakers-guide.js?v=1"></script>',1)
p.write_text(i,encoding='utf-8')

# ---------- sw.js ----------
p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v135' not in s: raise SystemExit('sw cache marker missing')
s=s.replace('viaggio-nozze-v135','viaggio-nozze-v136',1)
if '"./lakers-guide.css",' not in s:
    marker='  "./budget-summary.css",\n'
    if marker not in s: raise SystemExit('sw css marker missing')
    s=s.replace(marker,marker+'  "./lakers-guide.css",\n',1)
if '"./lakers-guide.js",' not in s:
    marker='  "./budget-summary.js",\n'
    if marker not in s: raise SystemExit('sw js marker missing')
    s=s.replace(marker,marker+'  "./lakers-guide.js",\n',1)
if '"./assets/crypto-arena-lakers.jpg",' not in s:
    marker='  "./assets/los-angeles.jpg",\n'
    if marker not in s: raise SystemExit('sw asset marker missing')
    s=s.replace(marker,marker+'  "./assets/crypto-arena-lakers.jpg",\n',1)
old='"/budget-summary.js", "/manifest.json"'
new='"/budget-summary.js", "/lakers-guide.js", "/lakers-guide.css", "/manifest.json"'
if old not in s: raise SystemExit('sw core marker missing')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')

# ---------- PHOTO-CREDITS.md ----------
p=Path('PHOTO-CREDITS.md')
c=p.read_text(encoding='utf-8')
credit='''\n## Crypto.com Arena · Lakers–Clippers\n- File: `assets/crypto-arena-lakers.jpg`\n- Foto: Troutfarm27 / Wikimedia Commons\n- Licenza: CC BY-SA 4.0\n- Fonte: https://commons.wikimedia.org/wiki/File:Crypto.com_Arena_-_Star_Plaza_entrance.jpg\n'''
if 'assets/crypto-arena-lakers.jpg' not in c:
    c=c.rstrip()+"\n"+credit
p.write_text(c,encoding='utf-8')
