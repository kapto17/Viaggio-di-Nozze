const TRIP = {
  title: "Viaggio di nozze",
  subtitle: "20 ottobre – 10 novembre",
  start: "2026-10-20",
  end: "2026-11-10",

  legs: [
    {
      id: "sfo", city: "San Francisco", accent: "sf", image: "./assets/san-francisco.jpg",
      dateFrom: "2026-10-20", dateTo: "2026-10-23",
      hotel: { name: "Hotel Spero", address: "405 Taylor St, San Francisco, CA 94102", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Spero+405+Taylor+St+San+Francisco+CA+94102", checkin: "2026-10-20", checkout: "2026-10-23", hotelFee: { perNight: 35.31, label: "Guest Amenities Fee", note: "$35,31 a notte · totale previsto per 3 notti: $105,93" } },
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
        { priority: "discover", name: "Ocean Beach", note: "Lunga spiaggia sul Pacifico sul lato occidentale di San Francisco, ideale per una passeggiata e per il tramonto.", mapsQuery: "Ocean Beach San Francisco" },
        { priority: "discover", name: "Gray Whale Cove State Beach", lf: true, note: "Baia scenografica tra scogliere sulla costa a sud di San Francisco; è fuori città e richiede una deviazione dedicata.", mapsQuery: "Gray Whale Cove State Beach California" },
        { priority: "discover", name: "Santa Cruz", lf: true, note: "Città costiera a sud di San Francisco. Inserita dalla lista di Fortuna: da valutare come escursione dedicata perché non è sul vostro trasferimento in aereo verso Los Angeles.", mapsQuery: "Santa Cruz California" }
      ],
      foods: [
        { id: "sf-clam", name: "Clam Chowder nel pane", short: "Zuppa cremosa di vongole servita nella pagnotta di sourdough.", description: "Una delle specialità più associate al waterfront di San Francisco: clam chowder cremosa con patate e vongole, spesso servita dentro una pagnotta di pane sourdough.", whereToFind: [{ name: "Boudin Bakery · Fisherman's Wharf", image: "./assets/restaurants/boudin.webp", note: "Iconico per clam chowder servita nel sourdough bread bowl.", price: "$$", mapsQuery: "Boudin Bakery 160 Jefferson St San Francisco" }, { name: "Scoma's Restaurant", image: "https://images.berqwp.com/?domain=scomas.com&mw=1920&q=70&url=https%3A%2F%2Fscomas.com%2Fwp-content%2Fuploads%2F2026%2F02%2FScomas-credit-Rich-Johnson-e1781155482447.png&w=300", note: "Versione più da ristorante, sul Fisherman's Wharf.", price: "$$$", mapsQuery: "Scoma's Restaurant San Francisco" }], image: "./assets/food/sf-clam-chowder.jpg", photoCredit: "Prayitno / Wikimedia Commons · CC BY 2.0" },
        { id: "sf-burrito", name: "Mission Burrito", short: "Burrito grande e ricco nato nel Mission District.", description: "Burrito in stile Mission: tortilla di farina molto farcita con riso, fagioli, carne e condimenti. È uno dei cibi simbolo della cultura gastronomica di San Francisco.", whereToFind: [{ name: "La Taqueria", image: "./assets/restaurants/la-taqueria.webp", note: "Una delle taquerias simbolo del Mission District.", price: "$", mapsQuery: "La Taqueria 2889 Mission St San Francisco" }], image: "./assets/food/sf-mission-burrito.jpg", photoCredit: "Ryan Michael / Wikimedia Commons · CC BY-SA 2.0" }
      ],
      restaurants: [
        { name: "Uncle Vito's Pizzeria", image: "https://images.squarespace-cdn.com/content/v1/62fd437b8b8c3c7c47b4caa7/1723914560701-CJWU2TVTTFRSR1CIP5WS/unsplash-image-22Vt7JIf7ZI.jpg", meal: "quick", price: "$$", type: "Pizza · italiano", typeIcon: "🍕", note: "Scelta semplice per la prima sera: pizza e cucina italiana in zona Union Square, comoda da Hotel Spero.", mapsQuery: "Uncle Vito's Pizzeria San Francisco" },
        { name: "Wipeout Bar & Grill", image: "https://images.unsplash.com/photo-1627824944500-a984c0c01f51?fm=jpg&ixlib=rb-4.1.0&q=80&w=1600", meal: "quick", price: "$$", type: "Americano · burger · tacos", typeIcon: "🍔", note: "Al Pier 39, comodo dopo il rientro da Alcatraz per una cena informale senza deviazioni.", mapsQuery: "Wipeout Bar & Grill Pier 39 San Francisco" },
        
        { name: "Boudin Bakery · Fisherman's Wharf", image: "https://res.cloudinary.com/the-infatuation/image/upload/c_fill%2Cw_3840%2Car_4%3A3%2Cg_center%2Cf_auto/Drone_ydve3c", meal: "quick", price: "$$", type: "Sourdough · clam chowder", typeIcon: "🥣", note: "Classico facile sul waterfront: perfetto per provare clam chowder nella pagnotta di sourdough.", mapsQuery: "Boudin Bakery 160 Jefferson St San Francisco" },
        { name: "La Taqueria", image: "./assets/food/sf-mission-burrito.jpg", meal: "quick", price: "$", type: "Mission burrito · tacos", typeIcon: "🌯", note: "Storica taqueria del Mission District: scelta pratica per provare il lato più street di San Francisco.", mapsQuery: "La Taqueria 2889 Mission St San Francisco" },
        { name: "The Cheesecake Factory", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cheesecake%20Factory%2C%20SF%20interior%201.JPG", meal: "quick", price: "$$", lf: true, type: "Dolci · cucina americana", typeIcon: "🍰", note: "Segnato da Fortuna · Union Square, all'ultimo piano di Macy's. Buono anche per cheesecake + vista.", mapsQuery: "The Cheesecake Factory 251 Geary St San Francisco" },
        { name: "Scoma's Restaurant", image: "https://images.berqwp.com/?domain=scomas.com&mw=1920&q=70&url=https%3A%2F%2Fscomas.com%2Fwp-content%2Fuploads%2F2026%2F02%2FScomas-credit-Rich-Johnson-e1781155482447.png&w=300", meal: "serious", price: "$$$", lf: true, type: "Pesce", typeIcon: "🐟", note: "Segnato da Fortuna · storico ristorante di pesce a Fisherman's Wharf. Ottimo candidato per cioppino e chowder.", mapsQuery: "Scoma's Restaurant San Francisco" },
        { name: "Fog Harbor Fish House", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$", lf: true, type: "Pesce", typeIcon: "🐟", note: "Segnato da Fortuna · Pier 39, pesce e vista sulla baia.", mapsQuery: "Fog Harbor Fish House Pier 39 San Francisco" },
        { name: "Beach Chalet Brewery & Restaurant", image: "https://images.squarespace-cdn.com/content/v1/696931a1c482a73528bb95fd/322439ee-f35a-4275-a7e4-f141e8918a99/Beach-Park-Aerial-with%2Bblackoverlay.png", meal: "serious", price: "$$", lf: true, type: "Cucina americana · birreria", typeIcon: "🍺", note: "Segnato da Fortuna · sul lato oceanico del Golden Gate Park, con vista sul Pacifico.", mapsQuery: "Beach Chalet Brewery & Restaurant San Francisco" },
        { name: "The Crow's Nest", image: "https://cdn.spotapps.co/spothopper/image/fetch/f_auto%2Cq_auto%3Abest%2Cc_fit%2Ch_1200/http%3A//static.spotapps.co/spots/06/82a53021204824a9cefa2206dc7520/%3Aoriginal", meal: "serious", price: "$$", lf: true, type: "Pesce · cucina americana", typeIcon: "🐟", note: "Segnato da Fortuna · Santa Cruz Harbor. Solo se decidete di fare l'escursione a Santa Cruz.", mapsQuery: "The Crow's Nest Santa Cruz California" }
      ], days: [],
      tickets: [{ name: "Alcatraz Night Tour", note: "22 ottobre 2026 · 17:55 · prenotazione confermata. Documento/QR da aggiungere quando disponibile.", status: "Prenotato" }]
    },

    {
      id: "la", city: "Los Angeles", accent: "la", image: "./assets/los-angeles.jpg",
      dateFrom: "2026-10-23", dateTo: "2026-10-27",
      hotel: { name: "The Commerce Casino & Hotel", address: "6121 E Telegraph Rd, Commerce, CA 90040", mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Commerce+Casino+%26+Hotel+6121+E+Telegraph+Rd+Commerce+CA+90040", checkin: "2026-10-23", checkout: "2026-10-27", hotelFee: { perNight: 30.00, label: "Resort fee", note: "$30,00 a notte · totale previsto per 4 notti: $120,00" } },
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
        { priority: "discover", name: "LACMA · Urban Light", lf: true, note: "La celebre installazione di lampioni davanti al Los Angeles County Museum of Art, bellissima anche la sera.", mapsQuery: "Urban Light LACMA 5905 Wilshire Blvd Los Angeles" },
        { priority: "discover", name: "Santa Barbara", lf: true, note: "Città costiera a nord-ovest di Los Angeles, inserita dalla lista di Fortuna. Richiede una mezza/giornata dedicata e va valutata rispetto ai 4 giorni disponibili.", mapsQuery: "Santa Barbara California" },
        { priority: "discover", name: "Manhattan Beach", note: "Elegante località costiera del South Bay con lungo molo, spiaggia ampia e atmosfera rilassata.", mapsQuery: "Manhattan Beach Pier California" },
        { priority: "discover", name: "Redondo Beach Pier · The O.C.", note: "Molo del South Bay affacciato sul Pacifico; diverse location della serie The O.C. furono girate nell’area di Redondo Beach.", mapsQuery: "Redondo Beach Pier California" }
      ],
      foods: [
        { id: "la-tacos", name: "Tacos al pastor", short: "Street food messicano, parte essenziale della scena gastronomica di LA.", description: "Tortillas con carne al pastor arrostita sul trompo, cipolla, coriandolo, salsa e spesso ananas. A Los Angeles i taco truck e le taquerias sono una parte fondamentale della cucina cittadina.", whereToFind: [{ name: "Guelaguetza", image: "./assets/restaurants/guelaguetza.webp", note: "Per una tappa messicana più strutturata e molto legata alla cultura gastronomica di LA.", price: "$$", mapsQuery: "Guelaguetza Los Angeles" }], image: "./assets/food/la-tacos-al-pastor.jpg", photoCredit: "T.Tseng / Wikimedia Commons · CC BY 2.0" },
        { id: "la-frenchdip", name: "French Dip Sandwich", short: "Panino con roast beef servito con il suo jus.", description: "Panino caldo ripieno di carne arrosto, tradizionalmente accompagnato da un jus in cui intingerlo. Los Angeles rivendica la nascita di questo sandwich all'inizio del Novecento.", whereToFind: [{ name: "Philippe The Original", image: "./assets/restaurants/philippe.webp", note: "Dal 1908; rivendica la nascita del French Dip ed è ancora il posto storico dove provarlo.", price: "$", mapsQuery: "Philippe The Original Los Angeles" }], image: "./assets/food/la-french-dip.jpg", photoCredit: "Jpatokal / Wikimedia Commons · CC BY-SA" }
      ],
      restaurants: [
        { name: "Water Grill · Downtown", image: "./assets/restaurants/water-grill-downtown.webp", meal: "serious", price: "$$$$", type: "Pesce · seafood", typeIcon: "🐟", note: "Sede Downtown al 544 S Grand Ave: scelta comoda per la sera del 23 ottobre senza spostarsi verso Santa Monica.", mapsQuery: "Water Grill 544 S Grand Ave Los Angeles CA 90071" },
        { name: "Sea Level Restaurant & Lounge", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$", type: "Californiano · seafood · waterfront", typeIcon: "🐟", note: "Sul porto di Redondo Beach: scelta comoda per chiudere la giornata South Bay direttamente sull’acqua.", mapsQuery: "Sea Level Restaurant and Lounge 655 N Harbor Dr Redondo Beach CA" },
        { name: "Philippe The Original", image: "https://res.cloudinary.com/the-infatuation/image/upload/v1720197943/LA_PhilippeTheOriginal_Exterior_JessieClapp-2_kdalmq.jpg", meal: "quick", price: "$", type: "French Dip · panini", typeIcon: "🥪", note: "Dal 1908. È uno dei due locali storicamente legati alla nascita del French Dip; oggi è la scelta storica più semplice da provare.", mapsQuery: "Philippe The Original 1001 N Alameda St Los Angeles" },
        { name: "In-N-Out Burger · Hollywood", image: "https://images.unsplash.com/photo-1627824944500-a984c0c01f51?fm=jpg&ixlib=rb-4.1.0&q=80&w=1600", meal: "quick", price: "$", type: "Burger californiano", typeIcon: "🍔", note: "Un classico della California per un pasto rapido ed economico tra una visita e l'altra.", mapsQuery: "In-N-Out Burger 7009 Sunset Blvd Los Angeles" },
        { name: "Guelaguetza", image: "./assets/food/la-tacos-al-pastor.jpg", meal: "quick", price: "$$", type: "Oaxacan · messicano", typeIcon: "🌮", note: "Uno dei nomi più noti per la cucina di Oaxaca a Los Angeles: mole, tlayudas e sapori messicani.", mapsQuery: "Guelaguetza 3014 W Olympic Blvd Los Angeles" },
        { name: "Water Grill Santa Monica", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$", lf: true, type: "Pesce", typeIcon: "🐟", note: "Segnato da Fortuna · Ocean Avenue, vicino al Santa Monica Pier. Cena di pesce più completa.", mapsQuery: "Water Grill Santa Monica 1401 Ocean Ave" },
        { name: "The Little Door", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$$", lf: true, type: "Mediterraneo · cena", typeIcon: "🍷", note: "Segnato da Fortuna · atmosfera romantica, più adatto a una cena con calma.", mapsQuery: "The Little Door 8164 W 3rd St Los Angeles" },
        { name: "Musso & Frank Grill", image: "./assets/restaurants/musso-frank.webp", meal: "serious", price: "$$$$", type: "Old Hollywood · steakhouse", typeIcon: "🥩", note: "Istituzione di Hollywood dal fascino storico: da scegliere se volete una vera cena Old Hollywood.", mapsQuery: "Musso & Frank Grill 6667 Hollywood Blvd Los Angeles" },
        { name: "République", image: "https://i.pinimg.com/736x/e7/e6/8d/e7e68d15d9d6cf32b82a108800b18e7c.jpg", meal: "serious", price: "$$$", lf: true, type: "Francese · bakery · brunch", typeIcon: "🥐", note: "Segnato da Fortuna · storico edificio su La Brea, molto apprezzato per bakery, brunch e cucina francese contemporanea.", mapsQuery: "Republique 624 S La Brea Ave Los Angeles CA 90036" }
      ], days: [], tickets: []
    },

    {
      id: "vegas1", city: "Las Vegas", accent: "vegas", image: "./assets/las-vegas.jpg",
      dateFrom: "2026-10-27", dateTo: "2026-10-28",
      hotel: { name: "Paris Las Vegas", address: "3655 Las Vegas Blvd S, Las Vegas, NV 89109", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Las+Vegas+3655+Las+Vegas+Blvd+S+Las+Vegas+NV+89109", checkin: "2026-10-27", checkout: "2026-10-28", hotelFee: { perNight: 62.30, label: "Resort fee + tasse", note: "circa $62,30 a notte ($54,95 + tasse) · totale previsto: circa $62,30" } },
      transport: [{ date: "2026-10-27", time: "Da definire", type: "car", title: "Los Angeles → Las Vegas", subtitle: "In auto", mapsQuery: "Las Vegas, NV" }],
      places: [
        { priority: "must", name: "Las Vegas Strip", note: "Passeggiata serale tra i resort più iconici: Bellagio, Caesars Palace, Venetian e dintorni.", mapsQuery: "Las Vegas Strip" },
        { priority: "must", name: "Fontane del Bellagio", note: "Uno degli spettacoli più riconoscibili della Strip.", mapsQuery: "Bellagio Fountains" },
        { priority: "must", name: "Welcome to Fabulous Las Vegas Sign", note: "La foto simbolo della città.", mapsQuery: "Welcome to Fabulous Las Vegas Sign" }
      ],
      foods: [
        { id: "vegas-shrimp", name: "Shrimp Cocktail", short: "Un grande classico della vecchia Las Vegas.", description: "Cocktail di gamberi freddi con salsa cocktail: semplice, rétro e storicamente legato ai casinò e alla vecchia cultura dei menu di Las Vegas.", whereToFind: [{ name: "Golden Gate Hotel & Casino", note: "Il shrimp cocktail è legato alla vecchia Las Vegas; Golden Gate è uno dei nomi storici associati a questa tradizione.", price: "$", mapsQuery: "Golden Gate Hotel Casino Las Vegas" }], image: "./assets/food/vegas-shrimp-cocktail.jpg", photoCredit: "Didriks / Wikimedia Commons · CC BY 2.0" },
        { id: "vegas-primerib", name: "Prime Rib", short: "Arrosto di manzo spesso associato alle steakhouse e ai casinò classici.", description: "Taglio di manzo arrostito lentamente, servito spesso al sangue o media cottura. È uno dei piatti più rappresentativi della tradizione da steakhouse di Las Vegas.", whereToFind: [{ name: "Golden Steer Steakhouse", image: "./assets/restaurants/golden-steer.webp", note: "Steakhouse old-school: scelta perfetta per vivere il lato classico della prime rib e della carne a Las Vegas.", price: "$$$$", mapsQuery: "Golden Steer Steakhouse Las Vegas" }], image: "./assets/food/vegas-prime-rib.jpg", photoCredit: "Steven Miller / Wikimedia Commons · CC BY 2.0" }
      ],
      activities: [], restaurants: [
        { name: "Tacos El Gordo", image: "./assets/restaurants/tacos-el-gordo.webp", meal: "quick", price: "$", type: "Tacos · street food", typeIcon: "🌮", note: "Uno dei nomi più popolari della Strip per tacos in stile Tijuana: veloce, informale e relativamente economico.", mapsQuery: "Tacos El Gordo 3041 S Las Vegas Blvd" },
        { name: "Secret Pizza", image: "./assets/restaurants/deep-dish.webp", meal: "quick", price: "$", type: "Pizza al taglio", typeIcon: "🍕", note: "Pizzeria nascosta al Cosmopolitan: perfetta per una fetta veloce anche tardi.", mapsQuery: "Secret Pizza Cosmopolitan Las Vegas" },
        { name: "Hash House A Go Go · LINQ", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1600&q=80", meal: "quick", price: "$$", type: "Americano · porzioni enormi", typeIcon: "🍳", note: "Piatti americani esagerati e porzioni gigantesche: più esperienza Vegas che cena elegante.", mapsQuery: "Hash House A Go Go LINQ Las Vegas" },
        { name: "Mon Ami Gabi · Paris Las Vegas", image: "./assets/restaurants/mon-ami-gabi.webp", meal: "serious", price: "$$$", type: "Bistrot francese", typeIcon: "🍷", note: "Comodissimo perché è nel vostro hotel. Patio sulla Strip con vista verso le fontane del Bellagio.", mapsQuery: "Mon Ami Gabi Paris Las Vegas" },
        { name: "Golden Steer Steakhouse", image: "https://goldensteer.com/cdn/shop/files/history.jpg?v=1699049745&width=638", meal: "serious", price: "$$$$", type: "Steakhouse storica", typeIcon: "🥩", note: "Una delle steakhouse classiche più iconiche di Las Vegas: atmosfera old-school e conto importante.", mapsQuery: "Golden Steer Steakhouse Las Vegas" },
        { name: "Yardbird", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$", type: "Southern · pollo", typeIcon: "🍗", note: "Al Venetian: cucina del Sud USA, fried chicken e piatti sostanziosi. Più rilassato di una steakhouse di lusso.", mapsQuery: "Yardbird Venetian Las Vegas" },
        { name: "Eiffel Tower Restaurant", image: "./assets/restaurants/eiffel-tower.webp", meal: "serious", price: "$$$$", type: "Francese · vista", typeIcon: "🍷", note: "Nel Paris Las Vegas: cena panoramica e romantica, da considerare solo se volete concedervi una serata costosa.", mapsQuery: "Eiffel Tower Restaurant Paris Las Vegas" }
      ], days: [], tickets: []
    },

    {
      id: "page", city: "Page (Lake Powell)", accent: "page", image: "./assets/page.jpg",
      dateFrom: "2026-10-28", dateTo: "2026-10-29",
      hotel: { name: "Lake Powell Resort", address: "Wahweap Marina, Page, AZ 86040", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lake+Powell+Resort+Wahweap+Marina+Page+AZ", checkin: "2026-10-28", checkout: "2026-10-29", hotelFee: { perNight: 14.99, label: "Resort fee", note: "$14,99 per la notte · possibili piccole utility/infrastructure fee da verificare al check-in" } },
      transport: [{ date: "2026-10-28", time: "07:00 circa", type: "car", title: "Las Vegas → Grand Canyon → Page", subtitle: "Road trip con visita al South Rim lungo il tragitto", mapsQuery: "Grand Canyon South Rim" }],
      activities: [
        { priority: "must", lf: true, name: "Grand Canyon South Rim", date: "2026-10-28", time: "Durante il trasferimento", status: "In programma", icon: "🏜️", note: "Ingresso dal South Rim, punti panoramici e uscita verso Desert View prima di proseguire per Page.", mapsQuery: "Grand Canyon South Rim Visitor Center" },
        { priority: "must", lf: true, name: "Antelope Canyon", date: "2026-10-29", time: "12:00", status: "Prenotato", icon: "✨", note: "Lower Antelope Canyon · tour guidato già prenotato alle 12:00.", mapsQuery: "Antelope Canyon Page Arizona" }
      ],
      places: [
        { priority: "must", name: "Mather Point", note: "Primo grande panorama del South Rim, vicino al Visitor Center.", mapsQuery: "Mather Point Grand Canyon" },
        { priority: "must", name: "Desert View Drive", note: "Strada panoramica del South Rim percorribile in auto privata, perfetta per proseguire verso Page.", mapsQuery: "Desert View Drive Grand Canyon" },
        { priority: "must", name: "Pipe Creek Vista", note: "Primo pullout panoramico procedendo verso est sulla Desert View Drive; sosta breve e immediata.", mapsQuery: "Pipe Creek Vista Grand Canyon" },
        { priority: "must", name: "Grandview Point", note: "Viewpoint molto panoramico con visuale da est a ovest e scorci del Colorado River.", mapsQuery: "Grandview Point Grand Canyon" },
        { priority: "must", name: "Moran Point", note: "Belvedere noto per i colori e per la lettura molto chiara dei diversi strati geologici del canyon.", mapsQuery: "Moran Point Grand Canyon" },
        { priority: "must", name: "Navajo Point", note: "Il viewpoint più alto del South Rim, con vista sulla Watchtower e sul Colorado verso nord.", mapsQuery: "Navajo Point Grand Canyon" },
        { priority: "must", name: "Desert View Watchtower", note: "Ultima grande tappa panoramica prima di uscire dal Grand Canyon verso est e proseguire per Page.", mapsQuery: "Desert View Watchtower" },
        { priority: "must", name: "Horseshoe Bend", note: "Belvedere spettacolare sul Colorado, a pochi minuti da Page.", mapsQuery: "Horseshoe Bend Page Arizona" }
      ],
      foods: [
        { id: "page-navajotaco", name: "Navajo Taco", short: "Frybread con fagioli, carne e condimenti.", description: "Una preparazione regionale basata sul frybread, normalmente coperto con fagioli, carne, lattuga, pomodoro, formaggio e altri condimenti. È molto diffuso nel Southwest e nelle comunità native.", whereToFind: [{ name: "Cameron Trading Post", note: "Storico stop Navajo sulla US-89, famoso per il Navajo Taco; utile soprattutto lungo il road trip.", price: "$$", mapsQuery: "Cameron Trading Post Arizona" }], image: "./assets/food/page-frybread.jpg", photoCredit: "Wikimedia Commons · Frybread / Navajo cuisine" },
        { id: "page-frybread", name: "Frybread", short: "Pane fritto morbido e croccante, dolce o salato.", description: "Impasto semplice fritto fino a diventare dorato e gonfio. Può essere mangiato da solo, con miele o zucchero, oppure diventare la base del Navajo taco.", whereToFind: [{ name: "Cameron Trading Post", note: "Uno dei posti più classici della zona per provare frybread e Navajo Taco.", price: "$$", mapsQuery: "Cameron Trading Post Arizona" }], image: "./assets/food/page-frybread.jpg", photoCredit: "Wikimedia Commons" }
      ],
      restaurants: [
        { name: "BirdHouse", image: "./assets/restaurants/birdhouse.webp", meal: "quick", price: "$", type: "Fried chicken", typeIcon: "🍗", note: "Molto apprezzato a Page, semplice e veloce: ideale dopo una giornata tra canyon e strada.", mapsQuery: "BirdHouse 707 N Navajo Dr Page AZ" },
        { name: "Big John's Texas BBQ", image: "./assets/restaurants/big-johns.webp", meal: "quick", price: "$$", type: "Barbecue", typeIcon: "🥩", note: "BBQ informale con brisket, ribs e porzioni abbondanti. Uno dei nomi più citati a Page.", mapsQuery: "Big John's Texas BBQ Page Arizona" },
        { name: "El Tapatio", image: "https://cdn.res-menu.net/el-tapatio-page/albums-1.jpg", meal: "quick", price: "$$", type: "Messicano", typeIcon: "🌮", note: "Messicano molto frequentato: carne asada e piatti sostanziosi, comodo senza perdere troppo tempo.", mapsQuery: "El Tapatio Page Arizona" },
        { name: "Sunset 89", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$", type: "Americano · island fusion", typeIcon: "🍽️", note: "Una scelta più tranquilla per sedersi a cena a Page, con menu più ampio rispetto ai fast casual.", mapsQuery: "Sunset 89 Page Arizona" }
      ], days: [], tickets: []
    },

    {
      id: "vegas2", city: "Las Vegas", accent: "vegas", image: "./assets/las-vegas-2.jpg",
      dateFrom: "2026-10-29", dateTo: "2026-10-30",
      hotel: { name: "Paris Las Vegas", address: "3655 Las Vegas Blvd S, Las Vegas, NV 89109", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Las+Vegas+3655+Las+Vegas+Blvd+S+Las+Vegas+NV+89109", checkin: "2026-10-29", checkout: "2026-10-30", hotelFee: { perNight: 62.30, label: "Resort fee + tasse", note: "circa $62,30 a notte ($54,95 + tasse) · totale previsto: circa $62,30" } },
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
        { id: "vegas2-shrimp", name: "Shrimp Cocktail", short: "Un grande classico della vecchia Las Vegas.", description: "Cocktail di gamberi freddi con salsa cocktail: semplice, rétro e storicamente legato ai casinò e alla vecchia cultura dei menu di Las Vegas.", whereToFind: [{ name: "Golden Gate Hotel & Casino", note: "Il shrimp cocktail è legato alla vecchia Las Vegas; Golden Gate è uno dei nomi storici associati a questa tradizione.", price: "$", mapsQuery: "Golden Gate Hotel Casino Las Vegas" }], image: "./assets/food/vegas-shrimp-cocktail.jpg", photoCredit: "Didriks / Wikimedia Commons · CC BY 2.0" },
        { id: "vegas2-primerib", name: "Prime Rib", short: "Arrosto di manzo da steakhouse classica.", description: "Taglio di manzo arrostito lentamente, uno dei piatti più rappresentativi delle steakhouse della città.", whereToFind: [{ name: "Golden Steer Steakhouse", image: "https://goldensteer.com/cdn/shop/files/history.jpg?v=1699049745&width=638", note: "Steakhouse old-school: scelta perfetta per vivere il lato classico della prime rib e della carne a Las Vegas.", price: "$$$$", mapsQuery: "Golden Steer Steakhouse Las Vegas" }], image: "./assets/food/vegas-prime-rib.jpg", photoCredit: "Steven Miller / Wikimedia Commons · CC BY 2.0" }
      ],
      activities: [], restaurants: [
        { name: "Tacos El Gordo", image: "./assets/food/la-tacos-al-pastor.jpg", meal: "quick", price: "$", type: "Tacos · street food", typeIcon: "🌮", note: "Uno dei nomi più popolari della Strip per tacos in stile Tijuana: veloce, informale e relativamente economico.", mapsQuery: "Tacos El Gordo 3041 S Las Vegas Blvd" },
        { name: "Secret Pizza", image: "https://images.squarespace-cdn.com/content/v1/62fd437b8b8c3c7c47b4caa7/1723914560701-CJWU2TVTTFRSR1CIP5WS/unsplash-image-22Vt7JIf7ZI.jpg", meal: "quick", price: "$", type: "Pizza al taglio", typeIcon: "🍕", note: "Pizzeria nascosta al Cosmopolitan: perfetta per una fetta veloce anche tardi.", mapsQuery: "Secret Pizza Cosmopolitan Las Vegas" },
        { name: "Hash House A Go Go · LINQ", image: "https://images.openai.com/static-rsc-1/J5YhaRLltxLe2b429Py9SC7KA_-zNfvPmTE3x5YQa70quOXwCXJYhVPF35wKRRWOvGBlv_bFM6tWBq_49a141gZ6flQDiLQ6desNsMzWsBl4i_GaC-HiNxi-4sCISzbM", meal: "quick", price: "$$", type: "Americano · porzioni enormi", typeIcon: "🍳", note: "Piatti americani esagerati e porzioni gigantesche: più esperienza Vegas che cena elegante.", mapsQuery: "Hash House A Go Go LINQ Las Vegas" },
        { name: "Mon Ami Gabi · Paris Las Vegas", image: "https://storage.googleapis.com/monamigabi2023_bucket/wp-content/uploads/98eeaff6-mag-lv_exterior-patio_dscf3000-1.jpg", meal: "serious", price: "$$$", type: "Bistrot francese", typeIcon: "🍷", note: "Comodissimo perché è nel vostro hotel. Patio sulla Strip con vista verso le fontane del Bellagio.", mapsQuery: "Mon Ami Gabi Paris Las Vegas" },
        { name: "Golden Steer Steakhouse", image: "https://goldensteer.com/cdn/shop/files/history.jpg?v=1699049745&width=638", meal: "serious", price: "$$$$", type: "Steakhouse storica", typeIcon: "🥩", note: "Una delle steakhouse classiche più iconiche di Las Vegas: atmosfera old-school e conto importante.", mapsQuery: "Golden Steer Steakhouse Las Vegas" },
        { name: "Yardbird", image: "./assets/food/vegas-prime-rib.jpg", meal: "serious", price: "$$$", type: "Southern · pollo", typeIcon: "🍗", note: "Al Venetian: cucina del Sud USA, fried chicken e piatti sostanziosi. Più rilassato di una steakhouse di lusso.", mapsQuery: "Yardbird Venetian Las Vegas" },
        { name: "Eiffel Tower Restaurant", image: "./assets/food/vegas-prime-rib.jpg", meal: "serious", price: "$$$$", type: "Francese · vista", typeIcon: "🍷", note: "Nel Paris Las Vegas: cena panoramica e romantica, da considerare solo se volete concedervi una serata costosa.", mapsQuery: "Eiffel Tower Restaurant Paris Las Vegas" }
      ], days: [], tickets: []
    },

    {
      id: "chicago", city: "Chicago", accent: "chicago", image: "./assets/chicago.jpg",
      dateFrom: "2026-10-30", dateTo: "2026-11-03",
      hotel: { name: "Warwick Allerton - Chicago", address: "701 N Michigan Ave, Chicago, IL 60611", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Warwick+Allerton+Chicago+701+N+Michigan+Ave+Chicago+IL+60611", checkin: "2026-10-30", checkout: "2026-11-03", hotelFee: { perNight: 29.35, label: "Resort fee", note: "$29,35 a notte · totale previsto per 4 notti: $117,40 · deposito cauzionale escluso dal budget" } },
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
        { id: "chi-deepdish", name: "Deep-Dish Pizza", short: "La pizza alta e ricchissima simbolo di Chicago.", description: "Pizza cotta in una teglia profonda, con bordo alto, abbondante formaggio e salsa di pomodoro. È probabilmente il piatto più famoso associato alla città.", whereToFind: [{ name: "Lou Malnati's · River North", image: "./assets/restaurants/lou-malnatis.webp", note: "Una delle istituzioni cittadine per la deep-dish, comoda rispetto al vostro hotel.", price: "$$", mapsQuery: "Lou Malnati's 439 N Wells St Chicago" }, { name: "Giordano's", note: "Versione stuffed, ancora più ricca e piena di formaggio.", price: "$$", mapsQuery: "Giordano's 130 E Randolph St Chicago" }], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Deep_Dish_Pizza.jpg/960px-Deep_Dish_Pizza.jpg", photoCredit: "Victorgrigas / Wikimedia Commons · CC BY-SA 3.0" },
        { id: "chi-hotdog", name: "Chicago-Style Hot Dog", short: "Hot dog 'dragged through the garden' e niente ketchup.", description: "Salsiccia di manzo in bun al papavero con senape gialla, cipolla, relish, pomodoro, pickle, peperoncini sport peppers e sale al sedano. La versione tradizionale non prevede ketchup.", whereToFind: [{ name: "Portillo's · River North", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chicago-style_hot_dog.jpg", note: "Chicago-style hot dog classico e molto comodo dalla Magnificent Mile.", price: "$", mapsQuery: "Portillo's 100 W Ontario St Chicago" }], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Chicago-style_hot_dog.jpg/960px-Chicago-style_hot_dog.jpg", photoCredit: "Meg Marco / Wikimedia Commons · CC BY-SA 3.0" },
        { id: "chi-beef", name: "Italian Beef", short: "Panino di manzo affettato sottile con jus e giardiniera.", description: "Panino con manzo cotto e affettato sottilissimo, bagnato nel suo jus e spesso completato con giardiniera piccante o peperoni dolci.", whereToFind: [{ name: "Al's #1 Italian Beef", note: "Tra i nomi storici dell'Italian beef; il marchio fa risalire la ricetta agli anni Trenta.", price: "$", mapsQuery: "Al's #1 Italian Beef 548 N Wells St Chicago" }, { name: "Portillo's · River North", image: "./assets/food/chicago-italian-beef.jpg", note: "Alternativa comodissima per provarlo insieme al Chicago dog.", price: "$", mapsQuery: "Portillo's 100 W Ontario St Chicago" }], image: "./assets/food/chicago-italian-beef.jpg", photoCredit: "Krista / Wikimedia Commons · CC BY 2.0" }
      ],
      activities: [
        { priority: "must", lf: true, name: "Haunted Halsted Halloween Parade", date: "2026-10-31", time: "18:30–22:00", status: "Confermato 2026", icon: "🎃", note: "Halloween a Chicago: 29ª edizione della parata di Northalsted, gratuita per gli spettatori. Partenza zona Halsted & Aldine.", mapsQuery: "3300 N Halsted St Chicago" }
      ], restaurants: [
        { name: "Portillo's · River North", image: "./assets/food/chicago-italian-beef.jpg", meal: "quick", price: "$", type: "Chicago hot dog · Italian beef", typeIcon: "🌭", note: "Comodissimo dal vostro hotel e perfetto per assaggiare due simboli di Chicago senza perdere tempo.", mapsQuery: "Portillo's 100 W Ontario St Chicago" },
        { name: "Al's #1 Italian Beef · Wells St", image: "https://static.wixstatic.com/media/bef3c2_39bd36c463fa4d9c88999910045e9426~mv2.jpeg/v1/fill/w_490%2Ch_368%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/bef3c2_39bd36c463fa4d9c88999910045e9426~mv2.jpeg", meal: "quick", price: "$", type: "Italian beef", typeIcon: "🥪", note: "Versione storica dell'Italian beef: panino bagnato nel jus, con giardiniera se vi piace piccante.", mapsQuery: "Al's #1 Italian Beef 548 N Wells St Chicago" },
        { name: "Lou Malnati's · River North", image: "./assets/food/chicago-italian-beef.jpg", meal: "quick", price: "$$", type: "Deep-dish pizza", typeIcon: "🍕", note: "Una delle scelte classiche per la deep-dish. Considerate i tempi di cottura: non è proprio una pizza 'al volo'.", mapsQuery: "Lou Malnati's 439 N Wells St Chicago" },
        { name: "Giordano's · Millennium Park", image: "./assets/restaurants/giordanos.webp", meal: "quick", price: "$$", type: "Stuffed deep-dish", typeIcon: "🍕", note: "Altra istituzione cittadina, utile se volete confrontare lo stile stuffed con la deep-dish classica.", mapsQuery: "Giordano's 130 E Randolph St Chicago" },
        { name: "The Purple Pig", image: "https://thepurplepigrestaurantgroup.com/wp-content/uploads/2026/07/PP-Chi-Dining-Room-full-shot.jpg", meal: "serious", price: "$$$", type: "Mediterraneo · piccoli piatti", typeIcon: "🍷", note: "Su Michigan Avenue, quindi molto comodo dal Warwick Allerton. Ottimo per una cena più curata senza formalità eccessiva.", mapsQuery: "The Purple Pig 444 N Michigan Ave Chicago" },
        { name: "Girl & The Goat", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$", type: "Americano moderno", typeIcon: "🍽️", note: "Uno dei ristoranti più noti di West Loop: cena da prenotare se volete dedicare una serata al cibo.", mapsQuery: "Girl & The Goat 809 W Randolph St Chicago" }
      ], days: [], tickets: []
    },

    {
      id: "bayahibe", city: "Bayahibe", accent: "sd", image: "./assets/bayahibe.jpg",
      dateFrom: "2026-11-03", dateTo: "2026-11-09",
      hotel: { name: "Viva Dominicus Palace by Wyndham", address: "Dominicus, Bayahibe, La Romana, Repubblica Dominicana", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Viva+Dominicus+Palace+by+Wyndham+Bayahibe+Dominican+Republic", checkin: "2026-11-03", checkout: "2026-11-09", hotelFee: { perNight: 0, label: "Fee hotel", note: "Nessuna resort fee separata verificata al momento per il vostro pacchetto all-inclusive" } },
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


// Programma giornaliero consigliato: una traccia flessibile, non una tabella rigida.
// "booked" = orario/prenotazione da rispettare; "recommended" = percorso consigliato;
// "optional" = bonus da fare solo se resta tempo/energia.
const PROGRAM_GUIDE = {
  sfo: [
    { date:"2026-10-20", title:"Arrivo a San Francisco", theme:"Atterraggio e recupero energie", items:[
      { time:"19:25", kind:"recommended", icon:"🛬", title:"Arrivo a SFO", note:"Atterraggio a San Francisco. Dopo lo sbarco: controlli d’ingresso, ritiro bagagli e uscita dal terminal.", mapsQuery:"San Francisco International Airport" },
      { time:"Dopo i controlli", kind:"recommended", icon:"🚕", title:"Uber / Lyft verso Hotel Spero", note:"Una volta fuori dal terminal, chiamate Uber o Lyft direttamente verso Hotel Spero · 405 Taylor St. È il trasferimento più comodo dopo il volo.", mapsQuery:"Hotel Spero 405 Taylor St San Francisco", uberDestination:"Hotel Spero 405 Taylor St San Francisco CA 94102", lyftDestination:"Hotel Spero 405 Taylor St San Francisco CA 94102" },
      { time:"All’arrivo", kind:"recommended", icon:"🏨", title:"Check-in Hotel Spero", note:"Check-in e sistemazione in camera. Nessun’altra visita programmata per la serata.", mapsQuery:"Hotel Spero 405 Taylor St San Francisco" },
      { time:"Dopo il check-in", kind:"recommended", icon:"🍕", title:"Uncle Vito's Pizzeria", note:"Pizza semplice e senza troppi pensieri per la prima sera, in zona Union Square e comoda da Hotel Spero.", mapsQuery:"Uncle Vito's Pizzeria 700 Bush St San Francisco CA 94108", mapLat:37.79062, mapLon:-122.40917 }
    ]},
    { date:"2026-10-21", title:"Golden Gate, Sausalito e costa", theme:"Prima giornata alla scoperta di San Francisco, tra i suoi luoghi più iconici e l’atmosfera della baia.", items:[
      { time:"08:20", kind:"recommended", icon:"🚕", title:"Partenza da Hotel Spero", note:"Partenza verso il Golden Gate Bridge. Considerate circa 30–40 minuti in base al traffico; arrivo previsto intorno alle 09:00.", mapsQuery:"Golden Gate Bridge San Francisco" },
{ time:"09:00", kind:"recommended", icon:"🌉", title:"Golden Gate Bridge", note:"Belvedere, foto e passeggiata sul ponte.", mapsQuery:"Golden Gate Bridge San Francisco" },
      { time:"11:30", kind:"recommended", icon:"⛵", title:"Sausalito", note:"Passeggiata sul waterfront e pranzo leggero.", mapsQuery:"Sausalito California" },
      { time:"14:30", kind:"recommended", icon:"🌳", title:"Golden Gate Park · Panhandle", note:"Rientro verso San Francisco e passeggiata nel verde.", mapsQuery:"Panhandle San Francisco" },
      { time:"17:00", kind:"recommended", icon:"🌊", title:"Ocean Beach", note:"Tramonto e relax sul Pacifico.", mapsQuery:"Ocean Beach San Francisco" },
      { time:"19:00", kind:"recommended", icon:"🍺", title:"Beach Chalet Brewery & Restaurant", note:"È già in zona: perfetto per chiudere la giornata senza spostamenti inutili.", mapsQuery:"Beach Chalet Brewery & Restaurant San Francisco" }
    ]},
    { date:"2026-10-22", title:"Waterfront e Alcatraz", theme:"Giornata costruita intorno al Night Tour già prenotato", items:[
      { time:"08:55", kind:"recommended", icon:"🚕", title:"Partenza da Hotel Spero", note:"Partenza verso Ferry Building ed Embarcadero con un margine tranquillo per arrivare intorno alle 09:30.", mapsQuery:"Ferry Building San Francisco" },
{ time:"09:30", kind:"recommended", icon:"🏙️", title:"Ferry Building e Embarcadero", note:"Passeggiata verso nord lungo la baia.", mapsQuery:"Ferry Building San Francisco" },
      { time:"11:30", kind:"recommended", icon:"🦭", title:"Pier 39 e Fisherman's Wharf", note:"Leoni marini, waterfront e atmosfera tipica.", mapsQuery:"Pier 39 San Francisco" },
      { time:"13:00", kind:"recommended", icon:"🐟", title:"Pranzo: Fog Harbor oppure Scoma's", note:"Sceglietene uno: sono entrambi nella zona, senza fare deviazioni." },
      { time:"16:50", kind:"booked", icon:"🚢", title:"Arrivo a Pier 33", note:"Meglio arrivare con largo anticipo per il tour serale.", mapsQuery:"Alcatraz City Cruises Pier 33" },
      { time:"17:55", kind:"booked", icon:"🌙", title:"Alcatraz Night Tour", note:"Prenotato. Partenza da Pier 33 e rientro sullo stesso waterfront.", mapsQuery:"Alcatraz Island San Francisco" },
      { time:"Dopo il tour", kind:"recommended", icon:"🍔", title:"Wipeout Bar & Grill · Pier 39", note:"Cena informale sul waterfront dopo Alcatraz: burger, tacos e piatti semplici senza allontanarsi dalla zona.", mapsQuery:"Wipeout Bar & Grill Pier 39 San Francisco" }
    ]}
  ],
  la: [
    { date:"2026-10-23", title:"Arrivo e Downtown LA", theme:"Dalla baia alla California del Sud: arrivo a Los Angeles e primo assaggio della città.", items:[
      { time:"08:00", kind:"recommended", icon:"🚕", title:"Partenza da Hotel Spero", note:"Lasciate l'hotel con margine per traffico, bagagli e controlli del volo domestico delle 11:00.", mapsQuery:"San Francisco International Airport" },
      { time:"08:30 circa", kind:"recommended", icon:"🛫", title:"Arrivo a SFO", note:"Check-in/bag drop se necessario e controlli di sicurezza. Obiettivo: essere al gate con ampio margine." },
      { time:"11:00", kind:"recommended", icon:"✈️", title:"Volo SFO → LAX", note:"Partenza da San Francisco. Durata prevista 1h36." },
      { time:"12:36", kind:"recommended", icon:"🛬", title:"Arrivo a Los Angeles · LAX", note:"Atterraggio previsto alle 12:36. Recuperate i bagagli e seguite le indicazioni Rental Car Shuttles." },
      { time:"13:15 circa", kind:"recommended", icon:"🚌", title:"Navetta per LAX Rental Car Center", note:"Dal livello Arrivi/Lower Level, seguite i cartelli viola Rental Car Shuttles. Alamo opera nel Rental Car Center.", mapsQuery:"LAX Rental Car Center 5251 West 98th Street Los Angeles" },
      { time:"13:30 circa", kind:"recommended", icon:"🚗", title:"Ritiro auto · Alamo", note:"Alamo · LAX Rental Car Center, 5251 W 98th St, Los Angeles, CA 90045. Dopo il ritiro inizia il viaggio in auto.", mapsQuery:"Alamo Rent A Car LAX Rental Car Center 5251 West 98th Street Los Angeles" },
      { time:"15:00 circa", kind:"recommended", icon:"🏨", title:"Check-in al The Commerce", note:"Lasciate i bagagli e ripartite senza fretta.", mapsQuery:"The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040", mapLat:33.998348, mapLon:-118.145255 },
      { time:"16:30", kind:"recommended", icon:"🏙️", title:"Downtown Los Angeles", note:"Grand Central Market / Walt Disney Concert Hall / centro, scegliendo in base all'energia.", mapsQuery:"Grand Central Market Los Angeles" },
      { time:"19:30", kind:"recommended", icon:"🐟", title:"Water Grill · Downtown", note:"Cena di pesce in Downtown, senza tornare verso Santa Monica. È la sede di 544 S Grand Ave.", mapsQuery:"Water Grill 544 S Grand Ave Los Angeles CA 90071", detailRestaurant:"Water Grill · Downtown" }]},
    { date:"2026-10-24", title:"Hollywood, Beverly Hills e Griffith", theme:"Una giornata tra i grandi simboli di Los Angeles, da Hollywood ai luoghi più iconici della città.", items:[
      { time:"08:30", kind:"recommended", icon:"🚗", title:"Partenza da The Commerce Hotel", note:"Partenza con calma verso Hollywood Boulevard. Considerate circa 30–45 minuti in base al traffico del momento.", mapsQuery:"Hollywood Walk of Fame Hollywood Boulevard Los Angeles" },
      { time:"09:00", kind:"recommended", icon:"⭐", title:"Hollywood Boulevard", note:"Walk of Fame, TCL Chinese Theatre e Dolby Theatre. 2 ore circa sono sufficienti.", mapsQuery:"TCL Chinese Theatre Los Angeles", detailPlace:"Hollywood Walk of Fame" },
      { time:"11:45", kind:"recommended", icon:"🛍️", title:"Beverly Hills & Rodeo Drive", note:"Passeggiata e pranzo in zona.", mapsQuery:"Rodeo Drive Beverly Hills" },
      { time:"15:00", kind:"optional", icon:"💡", title:"LACMA · Urban Light", note:"Solo se vi va: è una deviazione breve prima del Griffith.", mapsQuery:"Urban Light LACMA 5905 Wilshire Blvd Los Angeles", mapLat:34.062822, mapLon:-118.357929 },
      { time:"17:00", kind:"recommended", icon:"🌇", title:"Griffith Observatory", note:"Arrivate con la luce e restate fino al tramonto/sera.", mapsQuery:"Griffith Observatory", detailPlace:"Griffith Observatory & Hollywood Sign" },
      { time:"20:00", kind:"optional", icon:"🍷", title:"The Little Door", note:"Cena più romantica e costosa: tenetela come opzione speciale, non obbligatoria.", mapsQuery:"The Little Door Los Angeles" }
    ]},
    { date:"2026-10-25", title:"Costa e location di The O.C.", theme:"Santa Monica → Venice → South Bay: una sola direzione", items:[
      { time:"08:10", kind:"recommended", icon:"🚗", title:"Partenza da The Commerce Hotel", note:"Partenza verso Santa Monica. Considerate circa 45–50 minuti: il traffico di Los Angeles può allungare il tragitto.", mapsQuery:"Santa Monica Pier" },
{ time:"09:00", kind:"recommended", icon:"🎡", title:"Santa Monica Pier", note:"Molo, Route 66, spiaggia e Third Street Promenade.", mapsQuery:"Santa Monica Pier" },
      { time:"11:30", kind:"recommended", icon:"🏖️", title:"Venice Beach", note:"Boardwalk, Muscle Beach e Venice Canals.", mapsQuery:"Venice Beach Los Angeles" },
      { time:"14:30", kind:"optional", icon:"🌴", title:"Manhattan Beach", note:"Sosta breve lungo la strada, solo se avete tempo.", mapsQuery:"Manhattan Beach Pier" },
      { time:"16:00", kind:"recommended", icon:"📺", title:"Redondo Beach Pier · The O.C.", note:"Molte scene della serie ambientate a Newport sono state girate qui: è la scelta più efficiente per vedere location riconoscibili.", mapsQuery:"Redondo Beach Pier" },
      { time:"19:00", kind:"recommended", icon:"🍽️", title:"Sea Level Restaurant & Lounge", note:"Cena sul waterfront a Redondo Beach: chiude la giornata sulla costa senza tornare indietro verso il centro di Los Angeles.", mapsQuery:"Sea Level Restaurant and Lounge 655 N Harbor Dr Redondo Beach CA 90277", mapLat:33.85174, mapLon:-118.39569 }
    ]},
    { date:"2026-10-26", title:"Universal Studios Hollywood", theme:"Giornata intera già prenotata", items:[
      { time:"07:45", kind:"recommended", icon:"🚗", title:"Partenza da The Commerce Hotel", note:"Partenza verso Universal Studios. Orario prudente da adeguare all’apertura ufficiale del 26 ottobre; conviene arrivare prima dei cancelli.", mapsQuery:"Universal Studios Hollywood" },
{ time:"Apertura", kind:"booked", icon:"🎬", title:"Universal Studios Hollywood", note:"Arrivate poco prima dell'apertura e dedicate il giorno al parco.", mapsQuery:"Universal Studios Hollywood" },
      { time:"Sera", kind:"optional", icon:"🎃", title:"Bonus Halloween: case decorate a Burbank", note:"Se avete ancora energia, Burbank organizza ogni anno un Halloween Outdoor Decorating Contest con una destination guide delle case partecipanti. È vicino a Universal: controlliamo la guida 2026 poco prima del viaggio.", mapsQuery:"Burbank California" },
      { time:"20:00 circa", kind:"recommended", icon:"🥩", title:"Musso & Frank Grill", note:"Cena Old Hollywood dopo gli Universal. Storico ristorante su Hollywood Boulevard: una chiusura di giornata più rilassata rispetto a un altro evento serale.", mapsQuery:"Musso & Frank Grill 6667 Hollywood Blvd Los Angeles", mapLat:34.101763, mapLon:-118.335026 }
    ]}
  ],
  vegas1: [
    { date:"2026-10-27", title:"Los Angeles → Las Vegas", theme:"Trasferimento e prima serata sulla Strip", items:[
      { time:"08:00", kind:"recommended", icon:"🚗", title:"Partenza da The Commerce Hotel", note:"Check-out e partenza direttamente dall’hotel verso Las Vegas. Con una pausa, considerate circa 4½–5 ore.", mapsQuery:"Paris Las Vegas" },
      { time:"13:30 circa", kind:"recommended", icon:"🏨", title:"Arrivo e check-in al Paris Las Vegas", note:"Lasciate l'auto e muovetevi soprattutto a piedi sulla Strip." },
      { time:"16:00", kind:"recommended", icon:"🎰", title:"Las Vegas Strip", note:"Bellagio, Caesars Palace, Venetian e dintorni.", mapsQuery:"Las Vegas Strip" },
      { time:"Sera", kind:"recommended", icon:"⛲", title:"Fontane del Bellagio e Strip illuminata", note:"Vegas rende soprattutto dopo il tramonto.", mapsQuery:"Bellagio Fountains" },
      { time:"20:30 circa", kind:"recommended", icon:"🍷", title:"Mon Ami Gabi · Paris Las Vegas", note:"Cena comoda direttamente al Paris: bistrot francese con patio sulla Strip e vista verso le fontane del Bellagio.", mapsQuery:"Mon Ami Gabi 3655 S Las Vegas Blvd Las Vegas NV 89109", mapLat:36.112855, mapLon:-115.172414, detailRestaurant:"Mon Ami Gabi · Paris Las Vegas" },
      { time:"Sera", kind:"optional", icon:"🎃", title:"Bonus Halloween: atmosfera horror", note:"Se vi avanza tempo durante uno dei due passaggi a Vegas, Universal Horror Unleashed ad AREA15 è un'esperienza horror permanente; non la inserisco nel percorso base.", mapsQuery:"Universal Horror Unleashed Las Vegas" }
    ]}
  ],
  page: [
    { date:"2026-10-28", title:"Las Vegas → Grand Canyon → Page", theme:"La giornata più impegnativa: partenza presto e percorso lineare verso est", items:[
      { time:"07:00", kind:"recommended", icon:"🚗", title:"Partenza dal Paris Las Vegas", note:"Check-out e partenza verso il Grand Canyon South Rim. È la giornata più lunga del road trip.", mapsQuery:"Grand Canyon Visitor Center South Rim" },
      { time:"11:30 circa", kind:"recommended", icon:"🅿️", title:"Visitor Center · parcheggio", note:"Lasciate l'auto nei parcheggi 1–4 del Visitor Center. Da qui Mather Point è a circa 5 minuti a piedi.", mapsQuery:"Grand Canyon Visitor Center" },
      { time:"11:45", kind:"recommended", icon:"🏜️", title:"Mather Point", note:"Primo grande impatto con il canyon. Panorama amplissimo e sosta fotografica senza trekking impegnativo.", mapsQuery:"Mather Point Grand Canyon", mapLat:36.0619, mapLon:-112.1078, detailPlace:"Mather Point" },
      { time:"12:30", kind:"recommended", icon:"🥪", title:"Pausa pranzo veloce", note:"Pausa breve nell'area Visitor Center prima di riprendere l'auto: il pomeriggio è dedicato alla Desert View Drive." },
      { time:"13:15", kind:"recommended", icon:"🚗", title:"Inizio Desert View Drive", note:"Da qui si procede sempre verso est, nella stessa direzione di Page. La strada panoramica è percorribile con la vostra auto.", mapsQuery:"Desert View Drive Grand Canyon", detailPlace:"Desert View Drive", mapSkip:true },
      { time:"13:35", kind:"recommended", icon:"📍", title:"Pipe Creek Vista", note:"Prima sosta breve lungo la Desert View Drive. Bel colpo d'occhio sul canyon; 10–15 minuti sono sufficienti.", mapsQuery:"Pipe Creek Vista Grand Canyon", mapLat:36.0588, mapLon:-112.0932, detailPlace:"Pipe Creek Vista" },
      { time:"14:05", kind:"recommended", icon:"📍", title:"Grandview Point", note:"Uno dei viewpoint più panoramici della strada, con vista ampia da est a ovest e scorci del Colorado River.", mapsQuery:"Grandview Point Grand Canyon", mapLat:35.9988, mapLon:-111.9877, detailPlace:"Grandview Point" },
      { time:"14:45", kind:"recommended", icon:"📍", title:"Moran Point", note:"Sosta da 15–20 minuti: qui sono particolarmente evidenti colori e strati geologici differenti del canyon.", mapsQuery:"Moran Point Grand Canyon", mapLat:36.0134, mapLon:-111.8455, detailPlace:"Moran Point" },
      { time:"15:20", kind:"recommended", icon:"📍", title:"Navajo Point", note:"È il viewpoint più alto del South Rim e offre già una splendida vista della Desert View Watchtower.", mapsQuery:"Navajo Point Grand Canyon", mapLat:36.0407, mapLon:-111.8262, detailPlace:"Navajo Point" },
      { time:"15:45", kind:"recommended", icon:"🗼", title:"Desert View Watchtower", note:"Ultima grande tappa del Grand Canyon: breve passeggiata dal parcheggio, vista sul grande gomito del Colorado e sulla Watchtower.", mapsQuery:"Desert View Watchtower", mapLat:36.0440, mapLon:-111.8260, detailPlace:"Desert View Watchtower" },
      { time:"16:30 circa", kind:"recommended", icon:"🚗", title:"Partenza per Page", note:"Uscita dall'East Entrance e proseguimento verso Page. Lipan Point non è inserito: il NPS ne prevede la chiusura fino al 23 dicembre 2026.", mapsQuery:"Lake Powell Resort Page Arizona" },
      { time:"19:00 circa", kind:"recommended", icon:"🏨", title:"Arrivo a Page", note:"Ingresso nell'area Glen Canyon/Lake Powell, check-in al Lake Powell Resort, cena e riposo.", mapsQuery:"Lake Powell Resort Page Arizona" }
    ]},
    { date:"2026-10-29", title:"Horseshoe Bend e Antelope Canyon", theme:"Mattina a Page, poi ritorno verso Las Vegas", items:[
      { time:"08:15", kind:"recommended", icon:"🚗", title:"Partenza da Lake Powell Resort", note:"Partenza verso Horseshoe Bend. È vicino a Page, quindi non serve anticipare inutilmente la sveglia.", mapsQuery:"Horseshoe Bend Page Arizona" },
{ time:"08:30", kind:"recommended", icon:"🐎", title:"Horseshoe Bend", note:"Circa 1½ ore complessive tra parcheggio, passeggiata e foto.", mapsQuery:"Horseshoe Bend Page Arizona" },
      { time:"11:15", kind:"booked", icon:"📍", title:"Arrivo da Ken's Tours", note:"Parcheggio e margine prima del check-in.", mapsQuery:"Ken's Tours Lower Antelope Canyon" },
      { time:"11:30", kind:"booked", icon:"✅", title:"Check-in Lower Antelope Canyon", note:"Meglio essere già in fila almeno 30 minuti prima." },
      { time:"12:00", kind:"booked", icon:"✨", title:"Lower Antelope Canyon", note:"Tour prenotato.", mapsQuery:"Ken's Tours Lower Antelope Canyon" },
      { time:"13:30", kind:"recommended", icon:"🥪", title:"Pranzo veloce e partenza", note:"Poi Page → Las Vegas." },
      { time:"18:30 circa", kind:"recommended", icon:"🎰", title:"Arrivo a Las Vegas", note:"Seconda serata in città." }
    ]}
  ],
  vegas2: [
    { date:"2026-10-29", title:"Seconda serata a Las Vegas", theme:"Completate ciò che non avete visto il 27", items:[
      { time:"19:00 circa", kind:"recommended", icon:"🌃", title:"Strip oppure Fremont Street", note:"Scegliete in base a ciò che vi manca e alla stanchezza dopo Page.", mapsQuery:"Fremont Street Experience" }
    ]},
    { date:"2026-10-30", title:"Las Vegas → Chicago", theme:"Giornata volutamente flessibile finché il volo non sarà cambiato/confermato", items:[
      { time:"Da definire", kind:"recommended", icon:"🚗", title:"Partenza dal Paris Las Vegas", note:"L’orario verrà calcolato appena l’agenzia conferma il nuovo volo LAS → ORD. La giornata partirà comunque dall’hotel.", mapsQuery:"Harry Reid International Airport Las Vegas" },
{ time:"Da definire", kind:"booked", icon:"✈️", title:"Volo LAS → ORD", note:"Orario lasciato vuoto finché l'agenzia non conferma il nuovo volo." },
      { time:"Se resta tempo", kind:"optional", icon:"🎰", title:"Ultime ore a Las Vegas", note:"Solo attività vicine all'hotel/aeroporto: niente programmi che rischino il volo." }
    ]}
  ],
  chicago: [
    { date:"2026-10-30", title:"Arrivo a Chicago", theme:"Dipende dal nuovo volo da Las Vegas", items:[
      { time:"Da definire", kind:"booked", icon:"✈️", title:"Arrivo a ORD", note:"Quando l'agenzia conferma l'orario, rifiniamo questa serata." },
      { time:"Sera", kind:"recommended", icon:"🏨", title:"Warwick Allerton", note:"Check-in e prima passeggiata su Michigan Avenue solo se l'orario lo consente." }
    ]},
    { date:"2026-10-31", title:"Halloween a Chicago 🎃", theme:"Turismo leggero di giorno, Haunted Halsted come evento principale", special:true, items:[
      { time:"09:20", kind:"recommended", icon:"🚶", title:"Partenza dal Warwick Allerton", note:"Uscite dall’hotel direttamente sulla Magnificent Mile: la prima tappa è praticamente nella stessa zona.", mapsQuery:"Magnificent Mile Chicago" },
{ time:"09:30", kind:"recommended", icon:"🏙️", title:"Magnificent Mile", note:"Partite direttamente dalla zona dell'hotel.", mapsQuery:"Magnificent Mile Chicago" },
      { time:"11:00", kind:"recommended", icon:"🌉", title:"Chicago Riverwalk", note:"Passeggiata senza fretta lungo il fiume.", mapsQuery:"Chicago Riverwalk" },
      { time:"13:00", kind:"recommended", icon:"🌭", title:"Pranzo tipico", note:"Italian beef oppure Chicago-style hot dog: veloce e perfetto per questa giornata." },
      { time:"14:00", kind:"recommended", icon:"☁️", title:"Millennium Park & Loop", note:"Cloud Gate e centro, senza riempire troppo il pomeriggio.", mapsQuery:"Cloud Gate Chicago" },
      { time:"16:30", kind:"recommended", icon:"🏨", title:"Rientro in hotel", note:"Riposo, cambio e magari un piccolo accessorio/trucco Halloween." },
      { time:"17:45", kind:"recommended", icon:"🚇", title:"Partenza per Northalsted", note:"CTA o rideshare: lasciate margine perché sarà sabato sera e Halloween." },
      { time:"18:30", kind:"booked", icon:"🎃", title:"Haunted Halsted Halloween Parade", note:"29ª edizione, 31 ottobre 2026, 18:30–22:00. Spettatori gratis. Partenza zona Halsted & Aldine.", mapsQuery:"3300 N Halsted St Chicago" },
      { time:"22:00+", kind:"optional", icon:"🍸", title:"Drink / locale in Northalsted", note:"Solo se avete ancora energia: la zona resta molto viva dopo la parata." }
    ]},
    { date:"2026-11-01", title:"Architettura e centro", theme:"La crociera passa qui per non sovraccaricare Halloween", items:[
      { time:"09:55", kind:"recommended", icon:"🚶", title:"Partenza dal Warwick Allerton", note:"Partenza verso l’imbarco della Architecture River Cruise con un buon margine prima della crociera.", mapsQuery:"Chicago Architecture Center River Cruise" },
{ time:"10:30 circa", kind:"recommended", icon:"🚢", title:"Architecture River Cruise", note:"90 minuti circa. Quando prenotiamo sceglierei tarda mattinata, con luce.", mapsQuery:"Chicago Architecture Center River Cruise" },
      { time:"12:30", kind:"recommended", icon:"🌆", title:"Riverwalk / Loop", note:"Completate con calma ciò che non avete visto il giorno prima." },
      { time:"15:00", kind:"recommended", icon:"🌳", title:"Grant Park / centro", note:"Passeggiata e tempo libero." },
      { time:"Durante il giorno", kind:"recommended", icon:"🍿", title:"Garrett Popcorn / snack tipico", note:"Facile da inserire mentre siete su Michigan Avenue." }
    ]},
    { date:"2026-11-02", title:"Museo, panorama e deep dish", theme:"Ultima giornata piena, con parecchia libertà", items:[
      { time:"09:20", kind:"recommended", icon:"🚕", title:"Partenza dal Warwick Allerton", note:"Partenza verso l’Art Institute con margine tranquillo per l’ingresso delle 10:00.", mapsQuery:"Art Institute of Chicago" },
{ time:"10:00", kind:"recommended", icon:"🎨", title:"Art Institute of Chicago", note:"La mia prima scelta se volete fare un grande museo.", mapsQuery:"Art Institute of Chicago" },
      { time:"15:00", kind:"optional", icon:"🔭", title:"360 Chicago oppure Skydeck", note:"Uno solo dei due. 360 Chicago è comodissimo rispetto al Warwick.", mapsQuery:"360 Chicago Observation Deck" },
      { time:"19:30", kind:"recommended", icon:"🍕", title:"Deep-dish pizza", note:"Cena perfetta per salutare Chicago." }
    ]},
    { date:"2026-11-03", title:"Partenza per Punta Cana", theme:"Niente visite: aeroporto", items:[
      { time:"Mattina presto", kind:"recommended", icon:"🧳", title:"Check-out e trasferimento a ORD", note:"Lasciate margine per traffico e controlli." },
      { time:"09:30", kind:"booked", icon:"✈️", title:"Volo ORD → PUJ", note:"Arrivo a Punta Cana alle 16:02." }
    ]}
  ],
  bayahibe: [
    { date:"2026-11-03", title:"Arrivo a Bayahibe", theme:"Transfer, resort e decompressione", items:[
      { time:"16:02", kind:"booked", icon:"✈️", title:"Arrivo a Punta Cana", note:"Transfer per Bayahibe incluso." },
      { time:"Sera", kind:"recommended", icon:"🌴", title:"Resort e cena", note:"Niente programmi: avete appena attraversato mezzo continente." }
    ]},
    { date:"2026-11-04", title:"Resort", theme:"Giornata volutamente vuota", items:[
      { time:"Tutto il giorno", kind:"recommended", icon:"🏖️", title:"Mare, piscina e relax", note:"Questa non è una giornata sprecata: è parte del viaggio." }
    ]},
    { date:"2026-11-05", title:"Isola Saona", theme:"L'escursione principale del soggiorno caraibico", items:[
      { time:"Mattina", kind:"recommended", icon:"🚤", title:"Escursione a Isola Saona", note:"Giornata in barca tra spiagge e piscine naturali. Da prenotare quando scegliamo l'operatore.", mapsQuery:"Saona Island Dominican Republic" }
    ]},
    { date:"2026-11-06", title:"Resort", theme:"Relax senza agenda", items:[
      { time:"Tutto il giorno", kind:"recommended", icon:"🍹", title:"Spiaggia e all inclusive", note:"Nessun obbligo." }
    ]},
    { date:"2026-11-07", title:"Giornata facoltativa", theme:"Solo se avete voglia di muovervi", items:[
      { time:"Da decidere", kind:"optional", icon:"🌿", title:"Cotubanamá / Bayahibe village", note:"Escursione naturalistica o passeggiata nel borgo; altrimenti restate al resort.", mapsQuery:"Cotubanama National Park Dominican Republic" }
    ]},
    { date:"2026-11-08", title:"Ultimo giorno pieno", theme:"Niente escursioni lunghe", items:[
      { time:"Tutto il giorno", kind:"recommended", icon:"❤️", title:"Resort, mare e valigie", note:"Ultima giornata tranquilla prima del rientro." }
    ]},
    { date:"2026-11-09", title:"Rientro", theme:"Punta Cana → Washington → Roma", items:[
      { time:"12:56", kind:"booked", icon:"✈️", title:"PUJ → IAD", note:"Arrivo 15:55." },
      { time:"17:40", kind:"booked", icon:"✈️", title:"IAD → FCO", note:"Arrivo a Roma il 10 novembre alle 08:30." }
    ]}
  ]
};

// Approfondimenti sintetici per la schermata "Da vedere".
// Le immagini vengono recuperate da Wikipedia/Wikimedia quando c'è connessione;
// l'immagine della città resta come fallback e la risposta viene poi conservata dalla cache della PWA.
const PLACE_DETAILS = {
  "Pipe Creek Vista": { text: "Primo belvedere sviluppato sulla Desert View Drive procedendo verso est. È una sosta breve, comoda direttamente in auto, con il canyon incorniciato tra Mather Point e Yaki Point. Può essere più affollato degli overlook successivi perché è il primo pullout panoramico dopo il bivio." },
  "Grandview Point": { text: "Uno dei viewpoint più ampi del South Rim: la vista si apre da est a ovest e permette di intravedere diverse anse del Colorado River. Per il vostro programma è una sosta panoramica, non l'inizio del ripido Grandview Trail." },
  "Moran Point": { text: "Viewpoint dedicato al pittore Thomas Moran. Qui i diversi gruppi di rocce e le variazioni di colore del canyon sono particolarmente leggibili; è una tappa ideale da 15–20 minuti lungo il percorso verso est." },
  "Navajo Point": { text: "È il viewpoint più alto del South Rim, a 7.461 piedi. Guarda verso la Desert View Watchtower e offre una vista molto ampia verso ovest e a nord lungo il Colorado River. È l'ultima sosta panoramica prima della Watchtower." },

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
  "Manhattan Beach": {
    wikiTitle: "Manhattan Beach, California",
    text: "Manhattan Beach è una delle località più piacevoli del South Bay di Los Angeles. Il suo molo si allunga nel Pacifico alla fine di Manhattan Beach Boulevard ed è circondato da una grande spiaggia, piste pedonali e un centro compatto pieno di locali. È una sosta ideale lungo la costa senza trasformarla in una visita troppo lunga."
  },
  "Redondo Beach Pier · The O.C.": {
    wikiTitle: "Redondo Beach Pier",
    text: "Redondo Beach Pier è uno dei moli storici del South Bay. Oltre al lungomare e alla vista sul Pacifico, la zona è interessante per voi perché diverse scene usate per rappresentare Newport Beach nella serie The O.C. furono girate a Redondo Beach e nei dintorni."
  },
  "LACMA · Urban Light": {
    image: "https://www-images.lacma.org/s3fs-public/styles/max_1300x1300/public/2021-08/SF2485_3.jpg?itok=OOmFd0O0",
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
  categories: ["Cibo", "Benzina", "Parcheggio", "Hotel & tasse", "Trasporti", "Shopping", "Escursioni", "Altro"]
};
