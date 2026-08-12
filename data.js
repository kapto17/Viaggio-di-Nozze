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
        { priority: "must", lf: true, name: "Alcatraz Night Tour", date: "2026-10-22", time: "17:55", status: "Prenotato", icon: "🌙", note: "Tour serale di Alcatraz · biglietti già prenotati", mapsUrl: "https://www.google.com/maps/place/Alcatraz+City+Cruises/@37.806501,-122.4089044,16z/data=!4m9!1m2!2m1!1sPier+33,+San+Francisco,+CA+94133,+USA!3m5!1s0x80858140454ee651:0x99729118cdbdd53!8m2!3d37.8065008!4d-122.4045268!16s%2Fg%2F11hdz9s32p?entry=ttu" }
      ],
      places: [
        { priority: "must", name: "Golden Gate Bridge", lf: true, note: "Il simbolo della città: belvedere e passeggiata sul ponte.", mapsQuery: "Golden Gate Bridge San Francisco" },
        { priority: "must", name: "Fisherman's Wharf & Pier 39", note: "Molo, leoni marini e atmosfera sul waterfront.", mapsQuery: "Pier 39 San Francisco" },
        { priority: "must", name: "Lombard Street", note: "La celebre strada a tornanti, perfetta da abbinare a Russian Hill.", mapsQuery: "Lombard Street San Francisco" },
        { priority: "must", name: "Chinatown", note: "Passeggiata tra Grant Avenue, lanterne, negozi e locali storici.", mapsQuery: "Chinatown San Francisco" },
        { priority: "discover", name: "Painted Ladies", note: "Le case vittoriane più fotografate di Alamo Square.", mapsQuery: "Painted Ladies San Francisco" },
        { priority: "must", name: "Sausalito", lf: true, note: "Passeggiata sul waterfront dall’altra parte del Golden Gate, con vista sulla baia e su San Francisco.", mapsQuery: "Sausalito California" },
        { priority: "discover", name: "Golden Gate Park · Panhandle", lf: true, note: "Il lungo corridoio verde che introduce al Golden Gate Park, ideale per una passeggiata.", mapsQuery: "Panhandle San Francisco" },
        { priority: "discover", name: "Gray Whale Cove State Beach", lf: true, note: "Baia scenografica tra scogliere sulla costa a sud di San Francisco; è fuori città e richiede una deviazione dedicata.", mapsQuery: "Gray Whale Cove State Beach California" },
        { priority: "discover", name: "Santa Cruz", lf: true, note: "Città costiera a sud di San Francisco. Inserita dalla lista di Fortuna: da valutare come escursione dedicata perché non è sul vostro trasferimento in aereo verso Los Angeles.", mapsQuery: "Santa Cruz California" }
      ],
      foods: [
        { id: "sf-clam", name: "Clam Chowder nel pane", short: "Zuppa cremosa di vongole servita nella pagnotta di sourdough.", description: "Una delle specialità più associate al waterfront di San Francisco: clam chowder cremosa con patate e vongole, spesso servita dentro una pagnotta di pane sourdough.", image: "./assets/food/sf-clam-chowder.jpg", photoCredit: "Prayitno / Wikimedia Commons · CC BY 2.0" },
        { id: "sf-burrito", name: "Mission Burrito", short: "Burrito grande e ricco nato nel Mission District.", description: "Burrito in stile Mission: tortilla di farina molto farcita con riso, fagioli, carne e condimenti. È uno dei cibi simbolo della cultura gastronomica di San Francisco.", image: "./assets/food/sf-mission-burrito.jpg", photoCredit: "Ryan Michael / Wikimedia Commons · CC BY-SA 2.0" }
      ],
      restaurants: [
        { name: "The Cheesecake Factory", lf: true, type: "Dolci · cucina americana", typeIcon: "🍰", note: "Segnato da Fortuna · Union Square, 251 Geary St.", mapsQuery: "The Cheesecake Factory 251 Geary St San Francisco" },
        { name: "Scoma's Restaurant", lf: true, type: "Pesce", typeIcon: "🐟", note: "Segnato da Fortuna · ristorante di pesce a Fisherman's Wharf.", mapsQuery: "Scoma's Restaurant San Francisco" },
        { name: "Fog Harbor Fish House", lf: true, type: "Pesce", typeIcon: "🐟", note: "Segnato da Fortuna · ristorante di pesce al Pier 39.", mapsQuery: "Fog Harbor Fish House Pier 39 San Francisco" },
        { name: "Beach Chalet Brewery & Restaurant", lf: true, type: "Cucina americana · birreria", typeIcon: "🍺", note: "Segnato da Fortuna · sul lato oceanico del Golden Gate Park, con vista sul Pacifico.", mapsQuery: "Beach Chalet Brewery & Restaurant San Francisco" },
        { name: "The Crow's Nest", lf: true, type: "Pesce · cucina americana", typeIcon: "🐟", note: "Segnato da Fortuna · Santa Cruz Harbor. Fuori San Francisco: da abbinare solo se decidete di fare l'escursione a Santa Cruz.", mapsQuery: "The Crow's Nest Santa Cruz California" }
      ], days: [],
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
        { priority: "must", lf: true, name: "Universal Studios Hollywood", date: "2026-10-26", time: "Giornata", status: "Prenotato", icon: "🎬", note: "Giornata agli Universal Studios Hollywood · biglietti già prenotati", mapsQuery: "Universal Studios Hollywood, Universal City, CA" }
      ],
      places: [
        { priority: "must", name: "Griffith Observatory & Hollywood Sign", lf: true, note: "Panorama sulla città e uno dei punti migliori per vedere la scritta Hollywood.", mapsQuery: "Griffith Observatory Los Angeles" },
        { priority: "must", name: "Hollywood Walk of Fame", note: "Passeggiata sul tratto più iconico di Hollywood Boulevard.", mapsQuery: "Hollywood Walk of Fame" },
        { priority: "must", name: "Santa Monica Pier", lf: true, note: "Molo sull'oceano, Route 66 e tramonto sulla Pacific Coast.", mapsQuery: "Santa Monica Pier" },
        { priority: "must", name: "Venice Beach", lf: true, note: "Boardwalk, spiaggia, palme e atmosfera tipicamente californiana.", mapsQuery: "Venice Beach Los Angeles" },
        { priority: "discover", name: "Beverly Hills & Rodeo Drive", note: "Quartiere elegante e passeggiata nella zona più famosa dello shopping di lusso.", mapsQuery: "Rodeo Drive Beverly Hills" },
        { priority: "discover", name: "LACMA · Urban Light", lf: true, note: "La celebre installazione di lampioni davanti al Los Angeles County Museum of Art, bellissima anche la sera.", mapsQuery: "Urban Light LACMA Los Angeles" },
        { priority: "discover", name: "Santa Barbara", lf: true, note: "Città costiera a nord-ovest di Los Angeles, inserita dalla lista di Fortuna. Richiede una mezza/giornata dedicata e va valutata rispetto ai 4 giorni disponibili.", mapsQuery: "Santa Barbara California" }
      ],
      foods: [
        { id: "la-tacos", name: "Tacos al pastor", short: "Street food messicano, parte essenziale della scena gastronomica di LA.", description: "Tortillas con carne al pastor arrostita sul trompo, cipolla, coriandolo, salsa e spesso ananas. A Los Angeles i taco truck e le taquerias sono una parte fondamentale della cucina cittadina.", image: "./assets/food/la-tacos-al-pastor.jpg", photoCredit: "T.Tseng / Wikimedia Commons · CC BY 2.0" },
        { id: "la-frenchdip", name: "French Dip Sandwich", short: "Panino con roast beef servito con il suo jus.", description: "Panino caldo ripieno di carne arrosto, tradizionalmente accompagnato da un jus in cui intingerlo. Los Angeles rivendica la nascita di questo sandwich all'inizio del Novecento.", image: "./assets/food/la-french-dip.jpg", photoCredit: "Jpatokal / Wikimedia Commons · CC BY-SA" }
      ],
      restaurants: [
        { name: "Water Grill Santa Monica", lf: true, type: "Pesce", typeIcon: "🐟", note: "Segnato da Fortuna · ristorante di pesce su Ocean Avenue, vicino al Santa Monica Pier.", mapsQuery: "Water Grill Santa Monica 1401 Ocean Ave" },
        { name: "The Little Door", lf: true, type: "Mediterraneo · cena", typeIcon: "🍷", note: "Segnato da Fortuna · ristorante su W 3rd Street a Los Angeles.", mapsQuery: "The Little Door 8164 W 3rd St Los Angeles" }
      ], days: [], tickets: []
    },

    {
      id: "vegas1", city: "Las Vegas", accent: "vegas", image: "./assets/las-vegas.jpg",
      dateFrom: "2026-10-27", dateTo: "2026-10-28",
      hotel: { name: "Paris Las Vegas", address: "3655 Las Vegas Blvd S, Las Vegas, NV 89109", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Las+Vegas+3655+Las+Vegas+Blvd+S+Las+Vegas+NV+89109", checkin: "2026-10-27", checkout: "2026-10-28" },
      transport: [{ date: "2026-10-27", time: "Da definire", type: "car", title: "Los Angeles → Las Vegas", subtitle: "In auto", mapsQuery: "Las Vegas, NV" }],
      places: [
        { priority: "must", name: "Las Vegas Strip", note: "Passeggiata serale tra i resort più iconici: Bellagio, Caesars Palace, Venetian e dintorni.", mapsQuery: "Las Vegas Strip" },
        { priority: "must", name: "Fontane del Bellagio", note: "Uno degli spettacoli più riconoscibili della Strip.", mapsQuery: "Bellagio Fountains" },
        { priority: "must", name: "Welcome to Fabulous Las Vegas Sign", note: "La foto simbolo della città.", mapsQuery: "Welcome to Fabulous Las Vegas Sign" }
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
        { priority: "must", lf: true, name: "Grand Canyon South Rim", date: "2026-10-28", time: "Durante il trasferimento", status: "In programma", icon: "🏜️", note: "Ingresso dal South Rim, punti panoramici e uscita verso Desert View prima di proseguire per Page.", mapsQuery: "Grand Canyon South Rim Visitor Center" },
        { priority: "must", lf: true, name: "Antelope Canyon", date: "2026-10-29", time: "12:00", status: "Prenotato", icon: "✨", note: "Lower Antelope Canyon · tour guidato già prenotato alle 12:00.", mapsQuery: "Antelope Canyon Page Arizona" }
      ],
      places: [
        { priority: "must", name: "Mather Point", note: "Primo grande panorama del South Rim, vicino al Visitor Center.", mapsQuery: "Mather Point Grand Canyon" },
        { priority: "must", name: "Desert View Drive", note: "Strada panoramica del South Rim percorribile in auto privata, perfetta per proseguire verso Page.", mapsQuery: "Desert View Drive Grand Canyon" },
        { priority: "must", name: "Desert View Watchtower", note: "Ultima tappa panoramica ideale prima di uscire dal Grand Canyon verso est.", mapsQuery: "Desert View Watchtower" },
        { priority: "must", name: "Horseshoe Bend", note: "Belvedere spettacolare sul Colorado, a pochi minuti da Page.", mapsQuery: "Horseshoe Bend Page Arizona" }
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
        { priority: "must", name: "Fremont Street Experience", note: "Per vedere anche il lato Old Vegas, diverso dalla Strip.", mapsQuery: "Fremont Street Experience" },
        { priority: "discover", name: "Bellagio Conservatory", note: "Giardino scenografico interno al Bellagio, facile da inserire durante una passeggiata sulla Strip.", mapsQuery: "Bellagio Conservatory & Botanical Gardens" },
        { priority: "discover", name: "The Venetian & Grand Canal", note: "Interni e canali tra i più scenografici della Strip.", mapsQuery: "The Venetian Las Vegas" }
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
        { priority: "must", name: "Millennium Park & Cloud Gate", note: "Il Bean e il cuore più riconoscibile del centro città.", mapsQuery: "Cloud Gate Chicago" },
        { priority: "must", name: "Chicago Riverwalk", note: "Passeggiata lungo il fiume tra i grattacieli.", mapsQuery: "Chicago Riverwalk" },
        { priority: "must", name: "Architecture River Cruise", note: "Una delle esperienze più caratteristiche per vedere l'architettura di Chicago dal fiume.", mapsQuery: "Chicago Architecture Center River Cruise" },
        { priority: "must", name: "Magnificent Mile", note: "Michigan Avenue: siete già praticamente lì con il vostro hotel.", mapsQuery: "Magnificent Mile Chicago" },
        { priority: "discover", name: "Navy Pier", note: "Molo sul lago Michigan, piacevole soprattutto verso il tramonto e la sera.", mapsQuery: "Navy Pier Chicago" },
        { priority: "discover", name: "Skydeck o 360 Chicago", note: "Sceglierei uno dei due osservatori per una vista dall'alto sulla città.", mapsQuery: "360 Chicago Observation Deck" }
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
        { priority: "must", name: "Isola Saona", note: "L'escursione più iconica della zona: spiagge caraibiche, catamarano/motoscafo e piscine naturali.", mapsQuery: "Saona Island Dominican Republic" },
        { priority: "must", name: "Bayahibe village", note: "Passeggiata nel piccolo borgo di pescatori e sul waterfront.", mapsQuery: "Bayahibe Dominican Republic" },
        { priority: "must", name: "Playa Dominicus", note: "Spiaggia davanti alla zona dei resort, perfetta per giornate più rilassate.", mapsQuery: "Playa Dominicus Bayahibe" },
        { priority: "discover", name: "Parque Nacional Cotubanamá", note: "Natura, grotte, sentieri e costa protetta; da valutare se volete una giornata più attiva.", mapsQuery: "Cotubanama National Park Dominican Republic" }
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

// Approfondimenti sintetici per la schermata "Da vedere".
// Le immagini vengono recuperate da Wikipedia/Wikimedia quando c'è connessione;
// l'immagine della città resta come fallback e la risposta viene poi conservata dalla cache della PWA.
const PLACE_DETAILS = {
  "Alcatraz Night Tour": {
    wikiTitle: "Alcatraz Island",
    text: "Alcatraz è una piccola isola nella baia di San Francisco, celebre soprattutto per il penitenziario federale che ospitò detenuti come Al Capone. Il carcere rimase attivo dal 1934 al 1963 e oggi si visita attraversando celle, corridoi e spazi di servizio. Il tour serale aggiunge un'atmosfera particolare grazie alla luce sulla baia e agli accessi più tranquilli ad alcune aree."
  },
  "Universal Studios Hollywood": {
    wikiTitle: "Universal Studios Hollywood",
    text: "Universal Studios Hollywood unisce parco a tema e storia del cinema: nacque attorno agli studi cinematografici Universal e continua ancora oggi a convivere con set e produzioni reali. Oltre alle attrazioni dedicate a film e serie, lo Studio Tour permette di entrare nel cuore del backlot. È una giornata intera e una delle esperienze principali del vostro soggiorno a Los Angeles."
  },
  "Grand Canyon South Rim": {
    wikiTitle: "Grand Canyon",
    text: "Il South Rim è il versante più visitato del Grand Canyon e offre alcuni dei panorami più spettacolari sul canyon scavato dal Colorado. Le rocce visibili raccontano quasi due miliardi di anni di storia geologica. Nel vostro itinerario è perfetto come grande tappa panoramica tra Las Vegas e Page, entrando dal South Rim e proseguendo poi verso Desert View."
  },
  "Antelope Canyon": {
    wikiTitle: "Antelope Canyon",
    text: "Antelope Canyon è uno slot canyon modellato dall'acqua e dal vento nella arenaria Navajo. Le pareti ondulate e i fasci di luce che penetrano dall'alto lo hanno reso uno dei luoghi più fotografati dell'Arizona. Si trova nella Navajo Nation vicino a Page e l'accesso avviene esclusivamente con tour guidato autorizzato."
  },
  "Golden Gate Bridge": {
    wikiTitle: "Golden Gate Bridge",
    text: "Inaugurato nel 1937, il Golden Gate Bridge collega San Francisco alla contea di Marin attraversando l'omonimo stretto. Il suo colore International Orange e le torri Art Déco lo hanno trasformato in uno dei simboli più riconoscibili della California. Vale la pena fermarsi ai belvedere e, se il tempo lo permette, percorrerne almeno un tratto a piedi."
  },
  "Fisherman's Wharf & Pier 39": {
    wikiTitle: "Fisherman's Wharf, San Francisco",
    text: "Fisherman's Wharf nasce dalla tradizione dei pescatori italiani arrivati a San Francisco tra Ottocento e Novecento. Oggi è uno dei quartieri più visitati del waterfront; Pier 39 aggiunge negozi, ristoranti e la celebre colonia di leoni marini. È una zona molto turistica, ma perfetta per respirare l'atmosfera della baia."
  },
  "Lombard Street": {
    wikiTitle: "Lombard Street (San Francisco)",
    text: "Il tratto più famoso di Lombard Street, tra Hyde e Leavenworth Street, è noto per gli otto tornanti strettissimi che scendono lungo Russian Hill. La soluzione fu realizzata negli anni Venti per rendere affrontabile una pendenza molto ripida. Oggi è una delle immagini classiche di San Francisco, soprattutto vista dal basso."
  },
  "Chinatown": {
    wikiTitle: "Chinatown, San Francisco",
    text: "La Chinatown di San Francisco è la più antica del Nord America e una delle comunità cinesi storicamente più importanti fuori dall'Asia. Si sviluppò a partire dalla metà dell'Ottocento e conserva templi, mercati, ristoranti e vicoli pieni di storia. Grant Avenue è la via più scenografica, mentre Stockton Street mostra un lato più quotidiano del quartiere."
  },
  "Painted Ladies": {
    wikiTitle: "Painted ladies",
    text: "Le Painted Ladies di Alamo Square sono una fila di case vittoriane ed edoardiane dai colori pastello, costruite tra la fine dell'Ottocento e l'inizio del Novecento. Sono diventate una delle cartoline più famose di San Francisco grazie al contrasto con lo skyline moderno sullo sfondo. Il punto classico per fotografarle è dal prato di Alamo Square Park."
  },
  "Sausalito": {
    wikiTitle: "Sausalito, California",
    text: "Sausalito è una piccola cittadina sul lato nord del Golden Gate, nata come centro marittimo e cantieristico e poi diventata una località elegante affacciata sulla baia. Il waterfront, le case sulle colline e la vista verso San Francisco le danno un'atmosfera molto diversa dalla città. È una piacevole deviazione da abbinare al Golden Gate Bridge."
  },
  "Golden Gate Park · Panhandle": {
    wikiTitle: "Panhandle (San Francisco)",
    text: "Il Panhandle è la lunga fascia verde che precede il Golden Gate Park e ne costituisce una sorta di ingresso naturale verso est. Il parco nacque nella seconda metà dell'Ottocento trasformando un'area di dune sabbiose in uno dei grandi spazi verdi urbani della città. È ideale per una passeggiata tranquilla tra quartieri residenziali e grandi alberi."
  },
  "Gray Whale Cove State Beach": {
    wikiTitle: "Gray Whale Cove State Beach",
    text: "Gray Whale Cove è una piccola spiaggia protetta lungo la Highway 1, incastonata tra alte scogliere a sud di San Francisco. Si raggiunge scendendo una lunga scalinata dalla zona di parcheggio e regala un paesaggio molto più selvaggio rispetto alle spiagge cittadine. Il nome richiama le balene grigie che migrano lungo questa costa."
  },
  "Santa Cruz": {
    wikiTitle: "Santa Cruz, California",
    text: "Santa Cruz è una storica città balneare della costa californiana, conosciuta per il lungomare, il surf e il Santa Cruz Beach Boardwalk. La cultura del surf è profondamente legata alla città e alla vicina Monterey Bay. È una vera escursione fuori San Francisco, quindi va considerata solo se volete dedicarle parecchie ore."
  },
  "Griffith Observatory & Hollywood Sign": {
    wikiTitle: "Griffith Observatory",
    text: "Il Griffith Observatory domina Los Angeles dal versante meridionale del Mount Hollywood ed è aperto al pubblico dal 1935. Unisce astronomia, architettura Art Déco e alcuni dei panorami più celebri sulla città; dai dintorni si vede molto bene anche l'Hollywood Sign. È uno dei luoghi migliori per arrivare nel tardo pomeriggio e restare fino alle luci della sera."
  },
  "Hollywood Walk of Fame": {
    wikiTitle: "Hollywood Walk of Fame",
    text: "La Hollywood Walk of Fame fu inaugurata nel 1960 e oggi raccoglie migliaia di stelle dedicate a personalità del cinema, della televisione, della musica, della radio e del teatro. Il tratto più famoso corre lungo Hollywood Boulevard, vicino al TCL Chinese Theatre. Più che un singolo monumento è una passeggiata dentro la storia dell'industria dello spettacolo."
  },
  "Santa Monica Pier": {
    wikiTitle: "Santa Monica Pier",
    text: "Il Santa Monica Pier fu aperto nel 1909 ed è diventato uno dei simboli della costa di Los Angeles. Ospita il Pacific Park con la sua ruota panoramica e segna simbolicamente il termine occidentale della storica Route 66. Al tramonto è uno dei punti più suggestivi della zona per vedere il Pacifico."
  },
  "Venice Beach": {
    wikiTitle: "Venice, Los Angeles",
    text: "Venice nacque all'inizio del Novecento come località balneare ispirata alla città italiana, completa di canali e attrazioni. Oggi il suo Boardwalk è famoso per artisti di strada, skateboard, palestre all'aperto e un'atmosfera volutamente eccentrica. È uno dei posti in cui si percepisce meglio la cultura da spiaggia di Los Angeles."
  },
  "Beverly Hills & Rodeo Drive": {
    wikiTitle: "Rodeo Drive",
    text: "Beverly Hills si sviluppò rapidamente all'inizio del Novecento e divenne presto sinonimo della Los Angeles più elegante. Rodeo Drive, in particolare, è conosciuta a livello internazionale per boutique di alta moda, hotel e architetture curate. Anche senza fare shopping, vale una passeggiata per vedere uno dei volti più cinematografici della città."
  },
  "LACMA · Urban Light": {
    wikiTitle: "Urban Light",
    text: "Urban Light è l'installazione di Chris Burden collocata davanti al LACMA nel 2008. È composta da oltre duecento lampioni stradali storici restaurati, raccolti principalmente nell'area di Los Angeles. Di sera, quando tutte le luci sono accese, diventa uno dei set fotografici più riconoscibili della città."
  },
  "Santa Barbara": {
    wikiTitle: "Santa Barbara, California",
    text: "Santa Barbara è una città costiera a nord-ovest di Los Angeles, nota per l'architettura in stile coloniale spagnolo, le montagne alle spalle e il lungomare sul Pacifico. La sua identità attuale fu fortemente influenzata dalla ricostruzione successiva al terremoto del 1925. È bellissima, ma dal vostro itinerario richiede una deviazione importante e va trattata come escursione dedicata."
  },
  "Las Vegas Strip": {
    wikiTitle: "Las Vegas Strip",
    text: "La Strip è il tratto di Las Vegas Boulevard dove si concentra la maggior parte dei resort e casinò più famosi della città. La sua crescita esplose nel secondo dopoguerra e ha prodotto una sequenza unica di hotel-tema, insegne luminose e spettacoli. Il modo migliore per capirla è percorrerne una parte a piedi dopo il tramonto."
  },
  "Fontane del Bellagio": {
    wikiTitle: "Fountains of Bellagio",
    text: "Le Fountains of Bellagio sono un enorme spettacolo di acqua, musica e luci davanti al Bellagio, inaugurato insieme al resort nel 1998. Centinaia di getti sono coreografati su brani musicali diversi e possono raggiungere altezze impressionanti. Sono uno dei simboli gratuiti più famosi della Strip."
  },
  "Welcome to Fabulous Las Vegas Sign": {
    wikiTitle: "Welcome to Fabulous Las Vegas sign",
    text: "Il cartello 'Welcome to Fabulous Las Vegas' fu progettato da Betty Willis e installato nel 1959 all'estremità meridionale della Strip. Il suo stile grafico è diventato parte dell'immaginario di Las Vegas ed è stato riprodotto in infinite varianti. È probabilmente la foto-ricordo più classica del viaggio in città."
  },
  "Mather Point": {
    wikiTitle: "Mather Point",
    text: "Mather Point è uno dei primi grandi belvedere che si incontrano entrando al South Rim del Grand Canyon dalla South Entrance. La posizione, vicina al Visitor Center, offre un panorama amplissimo sulle gole e sulle formazioni rocciose. È un ottimo primo impatto con il canyon prima di proseguire lungo il vostro itinerario verso est."
  },
  "Desert View Drive": {
    wikiTitle: "Desert View Drive",
    text: "Desert View Drive è la strada panoramica che segue il bordo orientale del South Rim per circa 37 chilometri tra Grand Canyon Village e l'East Entrance. Lungo il percorso si incontrano numerosi punti panoramici, aree di sosta e scorci diversi sul canyon. Per voi è particolarmente comoda perché conduce naturalmente verso l'uscita in direzione Page."
  },
  "Desert View Watchtower": {
    wikiTitle: "Desert View Watchtower",
    text: "La Desert View Watchtower fu progettata dall'architetta Mary Colter e completata nel 1932, ispirandosi alle torri ancestrali del Southwest. Sorge vicino all'East Entrance e offre una prospettiva molto ampia sul Grand Canyon e sul Colorado River. È una delle architetture più caratteristiche del South Rim."
  },
  "Horseshoe Bend": {
    wikiTitle: "Horseshoe Bend (Arizona)",
    text: "Horseshoe Bend è una grande ansa del Colorado River scavata nella roccia poco a sud di Page. Dal belvedere il fiume compie una curva quasi completa attorno a uno sperone di arenaria, creando la forma a ferro di cavallo da cui prende il nome. La vista si raggiunge con una breve passeggiata dal parcheggio."
  },
  "Fremont Street Experience": {
    wikiTitle: "Fremont Street Experience",
    text: "Fremont Street è il cuore della vecchia Downtown Las Vegas, dove aprirono alcuni dei casinò storici della città. Negli anni Novanta una parte della strada fu trasformata nella Fremont Street Experience, una grande area pedonale coperta da uno schermo luminoso. È molto diversa dalla Strip: più compatta, rumorosa e volutamente retrò."
  },
  "Bellagio Conservatory": {
    wikiTitle: "Bellagio (resort)",
    text: "Il Conservatory & Botanical Gardens del Bellagio è uno spazio interno che viene completamente ridisegnato più volte l'anno con fiori, piante e grandi installazioni scenografiche. Ogni allestimento segue un tema stagionale e trasforma l'ambiente in una vera scenografia. È una visita breve, gratuita e facile da abbinare alle fontane."
  },
  "The Venetian & Grand Canal": {
    wikiTitle: "The Venetian Las Vegas",
    text: "The Venetian ricrea in scala spettacolare alcuni elementi di Venezia, con facciate, ponti, piazze e un Grand Canal interno percorso dalle gondole. Il resort aprì nel 1999 e portò all'estremo l'idea dei grandi hotel tematici di Las Vegas. Anche senza salire in gondola, vale la pena attraversarne gli spazi interni."
  },
  "Millennium Park & Cloud Gate": {
    wikiTitle: "Cloud Gate",
    text: "Millennium Park fu inaugurato nel 2004 e trasformò una vasta area del centro di Chicago in uno dei suoi spazi pubblici più frequentati. Cloud Gate, la scultura in acciaio di Anish Kapoor soprannominata 'The Bean', riflette e deforma lo skyline creando prospettive sempre diverse. È diventata rapidamente il simbolo contemporaneo della città."
  },
  "Chicago Riverwalk": {
    wikiTitle: "Chicago Riverwalk",
    text: "Il Chicago Riverwalk corre lungo la sponda meridionale del Chicago River, attraversando il cuore dei grattacieli del Loop. Il lungofiume è stato ampliato e riqualificato in più fasi per trasformare il fiume in uno spazio pubblico pedonale. È un ottimo modo per osservare da vicino ponti, torri storiche e architettura moderna."
  },
  "Architecture River Cruise": {
    wikiTitle: "Architecture of Chicago",
    text: "Chicago è considerata una delle capitali mondiali dell'architettura moderna, soprattutto per il ruolo avuto nello sviluppo dei primi grattacieli dopo il grande incendio del 1871. Una crociera sul fiume permette di leggere questa evoluzione direttamente dalle facciate degli edifici. È una delle esperienze più efficaci per capire la città, non soltanto per fotografarla."
  },
  "Magnificent Mile": {
    wikiTitle: "Magnificent Mile",
    text: "The Magnificent Mile è il celebre tratto di North Michigan Avenue compreso tra il Chicago River e Oak Street. È conosciuto per negozi, hotel e alcuni edifici storici come la Tribune Tower e il Wrigley Building. Nel vostro caso è particolarmente semplice da esplorare perché il Warwick Allerton si trova proprio su Michigan Avenue."
  },
  "Navy Pier": {
    wikiTitle: "Navy Pier",
    text: "Navy Pier si protende per più di un chilometro nel Lake Michigan e fu inaugurato nel 1916 come Municipal Pier. Nel corso del tempo ha avuto funzioni commerciali, militari e ricreative; oggi è uno dei principali luoghi di svago sul lago. È piacevole soprattutto nel tardo pomeriggio, quando lo skyline si illumina alle spalle."
  },
  "Skydeck o 360 Chicago": {
    wikiTitle: "Willis Tower",
    text: "Chicago offre due grandi osservatori: Skydeck, nella Willis Tower, e 360 CHICAGO, nell'ex John Hancock Center. Il primo è famoso per The Ledge, balconi di vetro sospesi oltre la facciata; il secondo guarda il lago da Michigan Avenue. Ne sceglierei uno solo, così avrete l'esperienza panoramica senza duplicarla."
  },
  "Isola Saona": {
    wikiTitle: "Saona Island",
    text: "Saona è un'isola protetta al largo della costa sud-orientale della Repubblica Dominicana e fa parte del Parque Nacional Cotubanamá. È famosa per spiagge bianche, palme, acque turchesi e le escursioni in catamarano o motoscafo da Bayahibe. È la gita più iconica del vostro soggiorno caraibico."
  },
  "Bayahibe village": {
    wikiTitle: "Bayahibe",
    text: "Bayahibe nacque come piccolo villaggio di pescatori sulla costa caraibica e conserva ancora un nucleo affacciato sul mare con barche, locali e case basse. Oggi è soprattutto la porta d'accesso alle escursioni verso Saona e Cotubanamá. Una passeggiata nel paese permette di vedere un lato più locale rispetto alla zona dei resort di Dominicus."
  },
  "Playa Dominicus": {
    wikiTitle: "Bayahibe",
    text: "Playa Dominicus è la spiaggia della zona turistica a sud-est del villaggio di Bayahibe, dove si trovano molti resort. Sabbia chiara e mare generalmente calmo la rendono perfetta per le giornate in cui non volete programmare nulla. È anche il vostro scenario quotidiano durante il soggiorno al Viva Dominicus Palace."
  },
  "Parque Nacional Cotubanamá": {
    wikiTitle: "Cotubanamá National Park",
    text: "Il Parque Nacional Cotubanamá protegge una vasta area di foresta tropicale, costa, grotte e ambienti marini nel sud-est della Repubblica Dominicana. Comprende anche l'Isola Saona e conserva importanti testimonianze della cultura indigena Taína. È l'alternativa più naturalistica se vorrete dedicare una giornata a qualcosa di diverso dalla spiaggia del resort."
  }
};

// V17 — Abbigliamento consigliato per le date reali del viaggio.
// Le temperature sono fasce stagionali indicative: prima di partire va sempre controllata la previsione aggiornata.
const CLOTHING_GUIDE = {
  "sf": {
    range: "Fine ottobre · circa 12–20 °C, spesso più fresco con vento e nebbia vicino alla baia.",
    day: "T-shirt o camicia leggera + felpa/maglione sottile. Pantaloni lunghi e scarpe comode per salite e camminate.",
    evening: "Giacca antivento o giacca leggera più calda; foulard/sciarpa sottile utile sul waterfront e ad Alcatraz.",
    pack: "Piccolo ombrello o guscio impermeabile leggero, soprattutto se la previsione segnala pioggia."
  },
  "la": {
    range: "Fine ottobre · in genere mite, circa 15–26 °C, con serate più fresche sulla costa.",
    day: "T-shirt, pantaloni leggeri o jeans e sneakers. Occhiali da sole indispensabili nelle giornate limpide.",
    evening: "Felpa o giacca leggera per Santa Monica, Venice e Griffith dopo il tramonto.",
    pack: "Uno strato leggero nello zaino: tra interno, costa e colline la temperatura può cambiare parecchio."
  },
  "vegas": {
    range: "Fine ottobre · giornate spesso piacevoli e asciutte, circa 12–25 °C, con forte escursione tra giorno e notte.",
    day: "Abbigliamento leggero a strati, scarpe comode: sulla Strip si cammina molto più di quanto sembri.",
    evening: "Giacca leggera o felpa; per una cena o un locale basta un outfit casual curato, senza necessità di abiti formali.",
    pack: "Occhiali da sole e balsamo labbra: l'aria del deserto è secca."
  },
  "page": {
    range: "28–29 ottobre · deserto d'alta quota. Page può essere mite di giorno, ma al Grand Canyon South Rim si può scendere vicino o sotto 0 °C al mattino/sera.",
    day: "Vestirsi a cipolla: maglia, felpa o pile e giacca antivento. Pantaloni lunghi e scarpe chiuse con buona suola.",
    evening: "Giacca più calda consigliata. Al South Rim il vento può far percepire temperature decisamente inferiori.",
    pack: "Berretto leggero, acqua, crema solare e uno strato caldo sempre in auto. Possibili cambi meteo rapidi e perfino neve precoce."
  },
  "chicago": {
    range: "Fine ottobre / inizio novembre · clima fresco e ventoso, indicativamente 4–14 °C, con possibilità di pioggia.",
    day: "Maglia + felpa/maglione, pantaloni lunghi e scarpe chiuse comode. Meglio avere uno strato antivento.",
    evening: "Giacca calda di mezza stagione; sciarpa leggera molto utile lungo il lago e sul Riverwalk.",
    pack: "Impermeabile compatto o ombrello. Se la previsione scende molto, aggiungere un pile più pesante."
  },
  "sd": {
    range: "Inizio novembre · tropicale, circa 24–30 °C, caldo umido con possibili rovesci brevi.",
    day: "Costume, t-shirt, shorts, abiti leggeri e sandali. Cappello e occhiali da sole per spiaggia ed escursioni.",
    evening: "Camicia/polo o vestito leggero; nei locali con aria condizionata può essere utile una felpa sottilissima.",
    pack: "K-way leggero, repellente per insetti e almeno due costumi per alternarli."
  }
};

const BUDGET_DEFAULTS = {
  totalBudget: 2500,
  currency: "USD",
  destinations: [
    { key:"San Francisco", label:"San Francisco", amount:450 },
    { key:"Los Angeles", label:"Los Angeles", amount:650 },
    { key:"Las Vegas 27-28", label:"Las Vegas · 27–28 ott", amount:170 },
    { key:"Page / Grand Canyon", label:"Page + Grand Canyon", amount:300 },
    { key:"Las Vegas 29-30", label:"Las Vegas · 29–30 ott", amount:180 },
    { key:"Chicago", label:"Chicago", amount:550 },
    { key:"Bayahibe", label:"Bayahibe", amount:200 }
  ],
  categories: ["Cibo", "Benzina", "Parcheggio", "Trasporti", "Shopping", "Escursioni", "Altro"]
};
