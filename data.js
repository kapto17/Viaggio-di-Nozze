const TRIP = {
  title: "Viaggio di nozze",
  subtitle: "20 ottobre – 10 novembre",
  start: "2026-10-20",
  end: "2026-11-10",

  legs: [
    {
      id: "sfo", city: "San Francisco", accent: "sf", image: "./assets/san-francisco.jpg",
      dateFrom: "2026-10-20", dateTo: "2026-10-23",
      hotel: { name: "Hotel Spero", address: "405 Taylor St, San Francisco, CA 94102", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Spero+405+Taylor+St+San+Francisco+CA+94102", checkin: "2026-10-20", checkout: "2026-10-23" },
      transport: [
        { date: "2026-10-20", time: "15:40", type: "flight", title: "Volo FCO → SFO", subtitle: "Partenza da Roma Fiumicino", arriveTime: "19:25", arriveNote: "Arrivo a San Francisco (20/10, ora locale)", mapsQuery: "San Francisco International Airport" }
      ],
      activities: [
        { name: "Alcatraz Night Tour", date: "2026-10-22", time: "17:55", status: "Prenotato", icon: "🌙", note: "Tour serale di Alcatraz · biglietti già prenotati", mapsUrl: "https://www.google.com/maps/place/Alcatraz+City+Cruises/@37.806501,-122.4089044,16z/data=!4m9!1m2!2m1!1sPier+33,+San+Francisco,+CA+94133,+USA!3m5!1s0x80858140454ee651:0x99729118cdbdd53!8m2!3d37.8065008!4d-122.4045268!16s%2Fg%2F11hdz9s32p?entry=ttu" }
      ],
      places: [
        { name: "Golden Gate Bridge", note: "Il simbolo della città: belvedere e passeggiata sul ponte.", mapsQuery: "Golden Gate Bridge San Francisco" },
        { name: "Fisherman's Wharf & Pier 39", note: "Molo, leoni marini e atmosfera sul waterfront.", mapsQuery: "Pier 39 San Francisco" },
        { name: "Lombard Street", note: "La celebre strada a tornanti, perfetta da abbinare a Russian Hill.", mapsQuery: "Lombard Street San Francisco" },
        { name: "Chinatown", note: "Passeggiata tra Grant Avenue, lanterne, negozi e locali storici.", mapsQuery: "Chinatown San Francisco" },
        { name: "Painted Ladies", note: "Le case vittoriane più fotografate di Alamo Square.", mapsQuery: "Painted Ladies San Francisco" }
      ],
      foods: [
        { id: "sf-clam", name: "Clam Chowder nel pane", short: "Zuppa cremosa di vongole servita nella pagnotta di sourdough.", description: "Una delle specialità più associate al waterfront di San Francisco: clam chowder cremosa con patate e vongole, spesso servita dentro una pagnotta di pane sourdough.", image: "./assets/food/sf-clam-chowder.jpg", photoCredit: "Prayitno / Wikimedia Commons · CC BY 2.0" },
        { id: "sf-burrito", name: "Mission Burrito", short: "Burrito grande e ricco nato nel Mission District.", description: "Burrito in stile Mission: tortilla di farina molto farcita con riso, fagioli, carne e condimenti. È uno dei cibi simbolo della cultura gastronomica di San Francisco.", image: "./assets/food/sf-mission-burrito.jpg", photoCredit: "Ryan Michael / Wikimedia Commons · CC BY-SA 2.0" }
      ],
      restaurants: [], days: [],
      tickets: [{ name: "Alcatraz Night Tour", note: "22 ottobre 2026 · 17:55 · prenotazione confermata. Documento/QR da aggiungere quando disponibile.", status: "Prenotato" }]
    },

    {
      id: "la", city: "Los Angeles", accent: "la", image: "./assets/los-angeles.jpg",
      dateFrom: "2026-10-23", dateTo: "2026-10-27",
      hotel: { name: "The Commerce Casino & Hotel", address: "6121 E Telegraph Rd, Commerce, CA 90040", mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Commerce+Casino+%26+Hotel+6121+E+Telegraph+Rd+Commerce+CA+90040", checkin: "2026-10-23", checkout: "2026-10-27" },
      transport: [
        { date: "2026-10-23", time: "11:00", type: "flight", title: "Volo SFO → LAX", subtitle: "SFO Terminal 1 → LAX Terminal 6 · Durata 1 h 36 min · bagaglio da stiva incluso", arriveTime: "12:36", arriveNote: "Arrivo a Los Angeles il 23/10 (ora locale)", mapsQuery: "Los Angeles International Airport" },
        { date: "2026-10-23", time: "", type: "car", title: "Ritiro SUV a noleggio", subtitle: "Ritiro a LAX · noleggio dal 23/10 al 30/10 · riconsegna a LAS", mapsQuery: "Los Angeles International Airport car rental" }
      ],
      activities: [
        { name: "Universal Studios Hollywood", date: "2026-10-26", time: "Giornata", status: "In programma", icon: "🎬", note: "Giornata agli Universal Studios Hollywood", mapsQuery: "Universal Studios Hollywood, Universal City, CA" }
      ],
      places: [
        { name: "Griffith Observatory & Hollywood Sign", note: "Panorama sulla città e uno dei punti migliori per vedere la scritta Hollywood.", mapsQuery: "Griffith Observatory Los Angeles" },
        { name: "Hollywood Walk of Fame", note: "Passeggiata sul tratto più iconico di Hollywood Boulevard.", mapsQuery: "Hollywood Walk of Fame" },
        { name: "Santa Monica Pier", note: "Molo sull'oceano, Route 66 e tramonto sulla Pacific Coast.", mapsQuery: "Santa Monica Pier" },
        { name: "Venice Beach", note: "Boardwalk, spiaggia, palme e atmosfera tipicamente californiana.", mapsQuery: "Venice Beach Los Angeles" },
        { name: "Beverly Hills & Rodeo Drive", note: "Quartiere elegante e passeggiata nella zona più famosa dello shopping di lusso.", mapsQuery: "Rodeo Drive Beverly Hills" }
      ],
      foods: [
        { id: "la-tacos", name: "Tacos al pastor", short: "Street food messicano, parte essenziale della scena gastronomica di LA.", description: "Tortillas con carne al pastor arrostita sul trompo, cipolla, coriandolo, salsa e spesso ananas. A Los Angeles i taco truck e le taquerias sono una parte fondamentale della cucina cittadina.", image: "./assets/food/la-tacos-al-pastor.jpg", photoCredit: "T.Tseng / Wikimedia Commons · CC BY 2.0" },
        { id: "la-frenchdip", name: "French Dip Sandwich", short: "Panino con roast beef servito con il suo jus.", description: "Panino caldo ripieno di carne arrosto, tradizionalmente accompagnato da un jus in cui intingerlo. Los Angeles rivendica la nascita di questo sandwich all'inizio del Novecento.", image: "./assets/food/la-french-dip.jpg", photoCredit: "Jpatokal / Wikimedia Commons · CC BY-SA" }
      ],
      restaurants: [], days: [], tickets: []
    },

    {
      id: "vegas1", city: "Las Vegas", accent: "vegas", image: "./assets/las-vegas.jpg",
      dateFrom: "2026-10-27", dateTo: "2026-10-28",
      hotel: { name: "Paris Las Vegas", address: "3655 Las Vegas Blvd S, Las Vegas, NV 89109", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Las+Vegas+3655+Las+Vegas+Blvd+S+Las+Vegas+NV+89109", checkin: "2026-10-27", checkout: "2026-10-28" },
      transport: [{ date: "2026-10-27", time: "Da definire", type: "car", title: "Los Angeles → Las Vegas", subtitle: "In auto", mapsQuery: "Las Vegas, NV" }],
      places: [
        { name: "Las Vegas Strip", note: "Passeggiata serale tra i resort più iconici: Bellagio, Caesars Palace, Venetian e dintorni.", mapsQuery: "Las Vegas Strip" },
        { name: "Fontane del Bellagio", note: "Uno degli spettacoli più riconoscibili della Strip.", mapsQuery: "Bellagio Fountains" },
        { name: "Welcome to Fabulous Las Vegas Sign", note: "La foto simbolo della città.", mapsQuery: "Welcome to Fabulous Las Vegas Sign" }
      ],
      foods: [
        { id: "vegas-shrimp", name: "Shrimp Cocktail", short: "Un grande classico della vecchia Las Vegas.", description: "Cocktail di gamberi freddi con salsa cocktail: semplice, rétro e storicamente legato ai casinò e alla vecchia cultura dei menu di Las Vegas.", image: "./assets/food/vegas-shrimp-cocktail.jpg", photoCredit: "Didriks / Wikimedia Commons · CC BY 2.0" },
        { id: "vegas-primerib", name: "Prime Rib", short: "Arrosto di manzo spesso associato alle steakhouse e ai casinò classici.", description: "Taglio di manzo arrostito lentamente, servito spesso al sangue o media cottura. È uno dei piatti più rappresentativi della tradizione da steakhouse di Las Vegas.", image: "./assets/food/vegas-prime-rib.jpg", photoCredit: "Steven Miller / Wikimedia Commons · CC BY 2.0" }
      ],
      activities: [], restaurants: [], days: [], tickets: []
    },

    {
      id: "page", city: "Page (Lake Powell)", accent: "page", image: "./assets/page.jpg",
      dateFrom: "2026-10-28", dateTo: "2026-10-29",
      hotel: { name: "Lake Powell Resort", address: "Wahweap Marina, Page, AZ 86040", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lake+Powell+Resort+Wahweap+Marina+Page+AZ", checkin: "2026-10-28", checkout: "2026-10-29" },
      transport: [{ date: "2026-10-28", time: "07:00 circa", type: "car", title: "Las Vegas → Grand Canyon → Page", subtitle: "Road trip con visita al South Rim lungo il tragitto", mapsQuery: "Grand Canyon South Rim" }],
      activities: [
        { name: "Grand Canyon South Rim", date: "2026-10-28", time: "Durante il trasferimento", status: "In programma", icon: "🏜️", note: "Ingresso dal South Rim, punti panoramici e uscita verso Desert View prima di proseguire per Page.", mapsQuery: "Grand Canyon South Rim Visitor Center" },
        { name: "Antelope Canyon", date: "2026-10-29", time: "Da prenotare", status: "In programma", icon: "✨", note: "Tour guidato da scegliere/prenotare. L'accesso ai canyon è consentito solo con guida autorizzata.", mapsQuery: "Antelope Canyon Page Arizona" }
      ],
      places: [
        { name: "Mather Point", note: "Primo grande panorama del South Rim, vicino al Visitor Center.", mapsQuery: "Mather Point Grand Canyon" },
        { name: "Desert View Drive", note: "Strada panoramica del South Rim percorribile in auto privata, perfetta per proseguire verso Page.", mapsQuery: "Desert View Drive Grand Canyon" },
        { name: "Desert View Watchtower", note: "Ultima tappa panoramica ideale prima di uscire dal Grand Canyon verso est.", mapsQuery: "Desert View Watchtower" },
        { name: "Horseshoe Bend", note: "Belvedere spettacolare sul Colorado, a pochi minuti da Page.", mapsQuery: "Horseshoe Bend Page Arizona" }
      ],
      foods: [
        { id: "page-navajotaco", name: "Navajo Taco", short: "Frybread con fagioli, carne e condimenti.", description: "Una preparazione regionale basata sul frybread, normalmente coperto con fagioli, carne, lattuga, pomodoro, formaggio e altri condimenti. È molto diffuso nel Southwest e nelle comunità native.", image: "./assets/food/page-frybread.jpg", photoCredit: "Wikimedia Commons · Frybread / Navajo cuisine" },
        { id: "page-frybread", name: "Frybread", short: "Pane fritto morbido e croccante, dolce o salato.", description: "Impasto semplice fritto fino a diventare dorato e gonfio. Può essere mangiato da solo, con miele o zucchero, oppure diventare la base del Navajo taco.", image: "./assets/food/page-frybread.jpg", photoCredit: "Wikimedia Commons" }
      ],
      restaurants: [], days: [], tickets: []
    },

    {
      id: "vegas2", city: "Las Vegas", accent: "vegas", image: "./assets/las-vegas.jpg",
      dateFrom: "2026-10-29", dateTo: "2026-10-30",
      hotel: { name: "Paris Las Vegas", address: "3655 Las Vegas Blvd S, Las Vegas, NV 89109", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Las+Vegas+3655+Las+Vegas+Blvd+S+Las+Vegas+NV+89109", checkin: "2026-10-29", checkout: "2026-10-30" },
      transport: [
        { date: "2026-10-29", time: "Da definire", type: "car", title: "Page → Las Vegas", subtitle: "In auto, ritorno", mapsQuery: "Las Vegas, NV" },
        { date: "2026-10-30", time: "", type: "car", title: "Riconsegna SUV a noleggio", subtitle: "Riconsegna all'aeroporto di Las Vegas (LAS)", mapsQuery: "Harry Reid International Airport car rental return" }
      ],
      places: [
        { name: "Fremont Street Experience", note: "Per vedere anche il lato Old Vegas, diverso dalla Strip.", mapsQuery: "Fremont Street Experience" },
        { name: "Bellagio Conservatory", note: "Giardino scenografico interno al Bellagio, facile da inserire durante una passeggiata sulla Strip.", mapsQuery: "Bellagio Conservatory & Botanical Gardens" },
        { name: "The Venetian & Grand Canal", note: "Interni e canali tra i più scenografici della Strip.", mapsQuery: "The Venetian Las Vegas" }
      ],
      foods: [
        { id: "vegas2-shrimp", name: "Shrimp Cocktail", short: "Un grande classico della vecchia Las Vegas.", description: "Cocktail di gamberi freddi con salsa cocktail: semplice, rétro e storicamente legato ai casinò e alla vecchia cultura dei menu di Las Vegas.", image: "./assets/food/vegas-shrimp-cocktail.jpg", photoCredit: "Didriks / Wikimedia Commons · CC BY 2.0" },
        { id: "vegas2-primerib", name: "Prime Rib", short: "Arrosto di manzo da steakhouse classica.", description: "Taglio di manzo arrostito lentamente, uno dei piatti più rappresentativi delle steakhouse della città.", image: "./assets/food/vegas-prime-rib.jpg", photoCredit: "Steven Miller / Wikimedia Commons · CC BY 2.0" }
      ],
      activities: [], restaurants: [], days: [], tickets: []
    },

    {
      id: "chicago", city: "Chicago", accent: "chicago", image: "./assets/chicago.jpg",
      dateFrom: "2026-10-30", dateTo: "2026-11-03",
      hotel: { name: "Warwick Allerton - Chicago", address: "701 N Michigan Ave, Chicago, IL 60611", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Warwick+Allerton+Chicago+701+N+Michigan+Ave+Chicago+IL+60611", checkin: "2026-10-30", checkout: "2026-11-03" },
      transport: [{ date: "2026-10-30", time: "", type: "flight", title: "Volo LAS → ORD", subtitle: "Orario in attesa di conferma/cambio con l'agenzia", mapsQuery: "Chicago O'Hare International Airport" }],
      places: [
        { name: "Millennium Park & Cloud Gate", note: "Il Bean e il cuore più riconoscibile del centro città.", mapsQuery: "Cloud Gate Chicago" },
        { name: "Chicago Riverwalk", note: "Passeggiata lungo il fiume tra i grattacieli.", mapsQuery: "Chicago Riverwalk" },
        { name: "Architecture River Cruise", note: "Una delle esperienze più caratteristiche per vedere l'architettura di Chicago dal fiume.", mapsQuery: "Chicago Architecture Center River Cruise" },
        { name: "Magnificent Mile", note: "Michigan Avenue: siete già praticamente lì con il vostro hotel.", mapsQuery: "Magnificent Mile Chicago" },
        { name: "Navy Pier", note: "Molo sul lago Michigan, piacevole soprattutto verso il tramonto e la sera.", mapsQuery: "Navy Pier Chicago" },
        { name: "Skydeck o 360 Chicago", note: "Sceglierei uno dei due osservatori per una vista dall'alto sulla città.", mapsQuery: "360 Chicago Observation Deck" }
      ],
      foods: [
        { id: "chi-deepdish", name: "Deep-Dish Pizza", short: "La pizza alta e ricchissima simbolo di Chicago.", description: "Pizza cotta in una teglia profonda, con bordo alto, abbondante formaggio e salsa di pomodoro. È probabilmente il piatto più famoso associato alla città.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Deep_Dish_Pizza.jpg/960px-Deep_Dish_Pizza.jpg", photoCredit: "Victorgrigas / Wikimedia Commons · CC BY-SA 3.0" },
        { id: "chi-hotdog", name: "Chicago-Style Hot Dog", short: "Hot dog 'dragged through the garden' e niente ketchup.", description: "Salsiccia di manzo in bun al papavero con senape gialla, cipolla, relish, pomodoro, pickle, peperoncini sport peppers e sale al sedano. La versione tradizionale non prevede ketchup.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Chicago-style_hot_dog.jpg/960px-Chicago-style_hot_dog.jpg", photoCredit: "Meg Marco / Wikimedia Commons · CC BY-SA 3.0" },
        { id: "chi-beef", name: "Italian Beef", short: "Panino di manzo affettato sottile con jus e giardiniera.", description: "Panino con manzo cotto e affettato sottilissimo, bagnato nel suo jus e spesso completato con giardiniera piccante o peperoni dolci.", image: "./assets/food/chicago-italian-beef.jpg", photoCredit: "Krista / Wikimedia Commons · CC BY 2.0" }
      ],
      activities: [], restaurants: [], days: [], tickets: []
    },

    {
      id: "bayahibe", city: "Bayahibe", accent: "sd", image: "./assets/bayahibe.jpg",
      dateFrom: "2026-11-03", dateTo: "2026-11-09",
      hotel: { name: "Viva Dominicus Palace by Wyndham", address: "Dominicus, Bayahibe, La Romana, Repubblica Dominicana", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Viva+Dominicus+Palace+by+Wyndham+Bayahibe+Dominican+Republic", checkin: "2026-11-03", checkout: "2026-11-09" },
      transport: [
        { date: "2026-11-03", time: "09:30", type: "flight", title: "Volo ORD → PUJ", subtitle: "Chicago O'Hare → Punta Cana · Durata 4 h 32 min", arriveTime: "16:02", arriveNote: "Arrivo a Punta Cana (PUJ) il 03/11 · transfer per Bayahibe incluso nel pacchetto", mapsQuery: "Punta Cana International Airport" },
        { date: "2026-11-09", time: "12:56", type: "flight", title: "Volo PUJ → IAD", subtitle: "Punta Cana → Washington Dulles · Durata 3 h 59 min", arriveTime: "15:55", arriveNote: "Scalo a Washington: 1 h 45 min", mapsQuery: "Washington Dulles International Airport" },
        { date: "2026-11-09", time: "17:40", type: "flight", title: "Volo IAD → FCO", subtitle: "Washington Dulles → Roma Fiumicino · Durata 8 h 50 min", arriveTime: "08:30", arriveNote: "Arrivo a Roma martedì 10/11/2026", mapsQuery: "Leonardo da Vinci–Fiumicino Airport" }
      ],
      places: [
        { name: "Isola Saona", note: "L'escursione più iconica della zona: spiagge caraibiche, catamarano/motoscafo e piscine naturali.", mapsQuery: "Saona Island Dominican Republic" },
        { name: "Bayahibe village", note: "Passeggiata nel piccolo borgo di pescatori e sul waterfront.", mapsQuery: "Bayahibe Dominican Republic" },
        { name: "Playa Dominicus", note: "Spiaggia davanti alla zona dei resort, perfetta per giornate più rilassate.", mapsQuery: "Playa Dominicus Bayahibe" },
        { name: "Parque Nacional Cotubanamá", note: "Natura, grotte, sentieri e costa protetta; da valutare se volete una giornata più attiva.", mapsQuery: "Cotubanama National Park Dominican Republic" }
      ],
      foods: [
        { id: "bay-mangu", name: "Mangú", short: "Purè di platano verde, classico della cucina dominicana.", description: "Platani verdi bolliti e schiacciati fino a ottenere una purea morbida, spesso servita a colazione con cipolla, formaggio fritto, uova e salame dominicano.", image: "./assets/food/bayahibe-mangu.jpg", photoCredit: "Ll1324 / Wikimedia Commons · CC0" },
        { id: "bay-pescado", name: "Pescado frito", short: "Pesce fritto, perfetto sulla costa con tostones.", description: "Pesce intero o a tranci fritto fino a diventare croccante, spesso accompagnato da tostones, limone e insalata. Sulla costa è una delle cose più naturali da cercare.", image: "./assets/food/bayahibe-pescado-frito.jpg", photoCredit: "Arlene Campusano / Wikimedia Commons · CC BY-SA 4.0" },
        { id: "bay-tostones", name: "Tostones con camarones", short: "Platano verde fritto con gamberi.", description: "Tostones croccanti di platano verde serviti con gamberi o ripieni di gamberi: un abbinamento molto caraibico da provare durante il soggiorno.", image: "./assets/food/bayahibe-tostones-camarones.jpg", photoCredit: "Arlene Campusano / Wikimedia Commons · CC BY-SA 4.0" }
      ],
      activities: [], restaurants: [], days: [], tickets: []
    }
  ]
};
