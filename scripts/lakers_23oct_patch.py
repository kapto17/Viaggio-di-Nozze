from pathlib import Path

p=Path('data.js')
t=p.read_text(encoding='utf-8')

# Add booked Lakers activity to LA leg.
old='''      activities: [\n        { priority: "must", lf: true, name: "Universal Studios Hollywood", date: "2026-10-26", time: "Giornata", status: "Prenotato", icon: "🎬", note: "Giornata agli Universal Studios Hollywood · biglietti già prenotati", mapsQuery: "Universal Studios Hollywood, Universal City, CA" }\n      ],'''
new='''      activities: [\n        { priority: "must", lf: true, name: "Los Angeles Lakers vs LA Clippers", date: "2026-10-23", time: "19:00", status: "Prenotato", icon: "🏀", note: "Partita NBA alla Crypto.com Arena · biglietti acquistati", mapsQuery: "Crypto.com Arena 1111 S Figueroa St Los Angeles CA 90015" },\n        { priority: "must", lf: true, name: "Universal Studios Hollywood", date: "2026-10-26", time: "Giornata", status: "Prenotato", icon: "🎬", note: "Giornata agli Universal Studios Hollywood · biglietti già prenotati", mapsQuery: "Universal Studios Hollywood, Universal City, CA" }\n      ],'''
if old not in t: raise SystemExit('LA activities marker missing')
t=t.replace(old,new,1)

# Add ticket metadata to LA leg.
old='''      ], days: [], tickets: []\n    },\n\n    {\n      id: "vegas1"'''
new='''      ], days: [], tickets: [\n        { name: "Lakers vs LA Clippers", note: "23 ottobre 2026 · 19:00 · Crypto.com Arena · biglietti acquistati. Documento/QR da aggiungere quando disponibile.", status: "Prenotato" }\n      ]\n    },\n\n    {\n      id: "vegas1"'''
if old not in t: raise SystemExit('LA tickets marker missing')
t=t.replace(old,new,1)

# Replace the full Oct 23 recommended day, leaving Oct 24+ untouched.
start=t.find('''    {\n      "date": "2026-10-23",\n      "title": "Arrivo e Downtown LA",''')
end=t.find('''    {\n      "date": "2026-10-24",''', start)
if start < 0 or end < 0: raise SystemExit('Oct 23 itinerary markers missing')

day='''    {\n      "date": "2026-10-23",\n      "title": "Arrivo a Los Angeles e Lakers–Clippers",\n      "theme": "Arrivo da San Francisco, ritiro auto e check-in senza corse; poi prima grande serata a Los Angeles con la partita NBA alla Crypto.com Arena.",\n      "items": [\n        {\n          "time": "08:00",\n          "kind": "recommended",\n          "icon": "🚕",\n          "title": "Partenza da Hotel Spero",\n          "note": "Lasciate l'hotel con margine per traffico, bagagli e controlli del volo domestico delle 11:00.",\n          "mapsQuery": "San Francisco International Airport"\n        },\n        {\n          "time": "08:30 circa",\n          "kind": "recommended",\n          "icon": "🛫",\n          "title": "Arrivo a SFO",\n          "note": "Check-in/bag drop se necessario e controlli di sicurezza. Obiettivo: essere al gate con ampio margine."\n        },\n        {\n          "time": "11:00",\n          "kind": "recommended",\n          "icon": "✈️",\n          "title": "Volo SFO → LAX",\n          "note": "Partenza da San Francisco. Durata prevista 1h36."\n        },\n        {\n          "time": "12:36",\n          "kind": "recommended",\n          "icon": "🛬",\n          "title": "Arrivo a Los Angeles · LAX",\n          "note": "Atterraggio previsto alle 12:36. Recuperate i bagagli e seguite le indicazioni Rental Car Shuttles."\n        },\n        {\n          "time": "13:20 circa",\n          "kind": "transfer",\n          "icon": "🚌",\n          "title": "Spostamento · terminal LAX → Rental Car Center",\n          "note": "🚌 Navetta Rental Car · considerate circa 15–25 min tra attesa, percorso e discesa al Rental Car Center.",\n          "mapsQuery": "LAX Rental Car Center 5251 West 98th Street Los Angeles"\n        },\n        {\n          "time": "14:00 circa",\n          "kind": "recommended",\n          "icon": "🚗",\n          "title": "Ritiro auto · Alamo",\n          "note": "Orario realistico dopo bagagli, shuttle e pratica di noleggio. Da qui avete l'auto fino alla riconsegna a Las Vegas.",\n          "mapsQuery": "Alamo Rent A Car LAX Rental Car Center 5251 West 98th Street Los Angeles"\n        },\n        {\n          "time": "14:20 circa",\n          "kind": "transfer",\n          "icon": "🚗",\n          "title": "Spostamento · LAX Rental Car Center → The Commerce Hotel",\n          "note": "🚗 In auto · circa 30 km · 35–60 min a seconda del traffico. Nessun appuntamento rigido prima del check-in.",\n          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"\n        },\n        {\n          "time": "15:30 circa",\n          "kind": "recommended",\n          "icon": "🏨",\n          "title": "Check-in al The Commerce",\n          "note": "Lasciate i bagagli, rinfrescatevi e tenete questa pausa: la sera sarà lunga e non vale la pena comprimere qui il vecchio giro Downtown.",\n          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040",\n          "mapLat": 33.998348,\n          "mapLon": -118.145255\n        },\n        {\n          "time": "16:20",\n          "kind": "transfer",\n          "icon": "🚗",\n          "title": "Spostamento · The Commerce → Crypto.com Arena",\n          "note": "🚗 Circa 17 km · considerate 30–45 min nel traffico del venerdì. Puntate al parcheggio evento di L.A. LIVE / Crypto.com Arena e lasciate l'auto lì fino a dopo cena.",\n          "mapsQuery": "Crypto.com Arena West Garage Los Angeles CA"\n        },\n        {\n          "time": "17:10 circa",\n          "kind": "recommended",\n          "icon": "🏀",\n          "title": "L.A. LIVE e atmosfera pre-partita",\n          "note": "Arrivate con calma, foto fuori dall'arena e giro nell'area L.A. LIVE. Obiettivo: essere davanti agli ingressi verso le 17:30; ricontrollate l'orario porte specifico della partita il giorno prima.",\n          "mapsQuery": "L.A. LIVE 800 W Olympic Blvd Los Angeles CA 90015"\n        },\n        {\n          "time": "19:00",\n          "kind": "booked",\n          "icon": "🎟️",\n          "title": "Los Angeles Lakers vs LA Clippers",\n          "note": "Partita NBA alla Crypto.com Arena · biglietti acquistati. È la seconda gara di regular season dei Lakers 2026–27. Evitate borse: l'arena ammette solo piccoli portafogli/clutch entro i limiti previsti.",\n          "mapsQuery": "Crypto.com Arena 1111 S Figueroa St Los Angeles CA 90015"\n        },\n        {\n          "time": "21:45–22:15 circa",\n          "kind": "recommended",\n          "icon": "🍔",\n          "title": "Cena post-partita · Yard House L.A. LIVE",\n          "note": "Cena senza riprendere l'auto: Yard House è a L.A. LIVE e il venerdì la cucina resta aperta fino all'1:00, quindi non dovete guardare l'orologio se la partita finisce tardi o va all'overtime.",\n          "mapsQuery": "Yard House 800 W Olympic Blvd Los Angeles CA 90015"\n        },\n        {\n          "time": "Dopo cena",\n          "kind": "transfer",\n          "icon": "🚗",\n          "title": "Rientro · L.A. LIVE → The Commerce Hotel",\n          "note": "🚗 Circa 17 km · 20–30 min in tarda serata. Recuperate l'auto dal parcheggio evento e rientrate direttamente in hotel.",\n          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"\n        }\n      ]\n    },\n'''
t=t[:start]+day+t[end:]
p.write_text(t,encoding='utf-8')

# Bump visible version only.
p=Path('app.js')
a=p.read_text(encoding='utf-8')
if 'Versione app 2.4.37' not in a: raise SystemExit('app version marker missing')
p.write_text(a.replace('Versione app 2.4.37','Versione app 2.4.38',1),encoding='utf-8')

# Cache bust data/app and service worker.
p=Path('index.html')
i=p.read_text(encoding='utf-8')
for old,new in [('data.js?v=106','data.js?v=107'),('app.js?v=113','app.js?v=114')]:
    if old not in i: raise SystemExit(f'index marker missing: {old}')
    i=i.replace(old,new,1)
p.write_text(i,encoding='utf-8')

p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v134' not in s: raise SystemExit('sw cache marker missing')
p.write_text(s.replace('viaggio-nozze-v134','viaggio-nozze-v135',1),encoding='utf-8')
