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
        
        { name: "Boudin Bakery · Fisherman's Wharf", image: "./assets/restaurants/boudin.webp", meal: "quick", price: "$$", type: "Sourdough · clam chowder", typeIcon: "🥣", note: "Classico facile sul waterfront: perfetto per provare clam chowder nella pagnotta di sourdough.", mapsQuery: "Boudin Bakery 160 Jefferson St San Francisco" },
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
        { priority: "discover", name: "Redondo Beach Pier · The O.C.", note: "Molo del South Bay affacciato sul Pacifico; diverse location della serie The O.C. furono girate nell’area di Redondo Beach.", mapsQuery: "Redondo Beach Pier California" },
        { priority: "discover", name: "Getty Center", note: "Uno dei grandi classici di Los Angeles: arte, architettura, giardini e panorama. Non è inserito nel programma principale perché richiede almeno 2–3 ore più parcheggio e tram; con i vostri giorni significherebbe sacrificare Griffith o parte della costa.", mapsQuery: "Getty Center 1200 Getty Center Dr Los Angeles CA 90049" }
      ],
      foods: [
        { id: "la-tacos", name: "Tacos al pastor", short: "Street food messicano, parte essenziale della scena gastronomica di LA.", description: "Tortillas con carne al pastor arrostita sul trompo, cipolla, coriandolo, salsa e spesso ananas. A Los Angeles i taco truck e le taquerias sono una parte fondamentale della cucina cittadina.", whereToFind: [{ name: "Guelaguetza", image: "./assets/restaurants/guelaguetza.webp", note: "Per una tappa messicana più strutturata e molto legata alla cultura gastronomica di LA.", price: "$$", mapsQuery: "Guelaguetza Los Angeles" }], image: "./assets/food/la-tacos-al-pastor.jpg", photoCredit: "T.Tseng / Wikimedia Commons · CC BY 2.0" },
        { id: "la-frenchdip", name: "French Dip Sandwich", short: "Panino con roast beef servito con il suo jus.", description: "Panino caldo ripieno di carne arrosto, tradizionalmente accompagnato da un jus in cui intingerlo. Los Angeles rivendica la nascita di questo sandwich all'inizio del Novecento.", whereToFind: [{ name: "Philippe The Original", image: "./assets/restaurants/philippe.webp", note: "Dal 1908; rivendica la nascita del French Dip ed è ancora il posto storico dove provarlo.", price: "$", mapsQuery: "Philippe The Original Los Angeles" }], image: "./assets/food/la-french-dip.jpg", photoCredit: "Jpatokal / Wikimedia Commons · CC BY-SA" }
      ],
      restaurants: [
        { name: "Water Grill · Downtown", image: "./assets/restaurants/water-grill-downtown.webp", meal: "serious", price: "$$$$", type: "Pesce · seafood", typeIcon: "🐟", note: "Sede Downtown al 544 S Grand Ave: scelta comoda per la sera del 23 ottobre senza spostarsi verso Santa Monica.", mapsQuery: "Water Grill 544 S Grand Ave Los Angeles CA 90071" },
        { name: "Sea Level Restaurant & Lounge", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$", type: "Californiano · seafood · waterfront", typeIcon: "🐟", note: "Sul porto di Redondo Beach. La domenica il ristorante chiude alle 21:00: meglio come aperitivo o cena anticipata, non come cena principale per i vostri orari.", mapsQuery: "Sea Level Restaurant and Lounge 655 N Harbor Dr Redondo Beach CA" },
        { name: "Tony's On The Pier", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$", type: "Seafood · storico pier", typeIcon: "🐟", note: "Storico ristorante direttamente sul Redondo Beach Pier. La domenica la sala chiude alle 22:00 e il cocktail lounge resta aperto almeno fino a mezzanotte: molto più compatibile con una cena dalle 20:30.", mapsQuery: "Tony's On The Pier 210 Fisherman's Wharf Redondo Beach CA 90277" },
        { name: "Philippe The Original", image: "./assets/restaurants/philippe.webp", meal: "quick", price: "$", type: "French Dip · panini", typeIcon: "🥪", note: "Dal 1908. È uno dei due locali storicamente legati alla nascita del French Dip; oggi è la scelta storica più semplice da provare.", mapsQuery: "Philippe The Original 1001 N Alameda St Los Angeles" },
        { name: "In-N-Out Burger · Hollywood", image: "https://images.unsplash.com/photo-1627824944500-a984c0c01f51?fm=jpg&ixlib=rb-4.1.0&q=80&w=1600", meal: "quick", price: "$", type: "Burger californiano", typeIcon: "🍔", note: "Un classico della California per un pasto rapido ed economico tra una visita e l'altra.", mapsQuery: "In-N-Out Burger 7009 Sunset Blvd Los Angeles" },
        { name: "Guelaguetza", image: "./assets/food/la-tacos-al-pastor.jpg", meal: "quick", price: "$$", type: "Oaxacan · messicano", typeIcon: "🌮", note: "Uno dei nomi più noti per la cucina di Oaxaca a Los Angeles: mole, tlayudas e sapori messicani.", mapsQuery: "Guelaguetza 3014 W Olympic Blvd Los Angeles" },
        { name: "Water Grill Santa Monica", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$", lf: true, type: "Pesce", typeIcon: "🐟", note: "Segnato da Fortuna · Ocean Avenue, vicino al Santa Monica Pier. Cena di pesce più completa.", mapsQuery: "Water Grill Santa Monica 1401 Ocean Ave" },
        { name: "The Little Door", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$$", lf: true, type: "Mediterraneo · cena", typeIcon: "🍷", note: "Segnato da Fortuna · atmosfera romantica, più adatto a una cena con calma.", mapsQuery: "The Little Door 8164 W 3rd St Los Angeles" },
        { name: "Musso & Frank Grill", image: "./assets/restaurants/musso-frank.webp", meal: "serious", price: "$$$$", type: "Old Hollywood · steakhouse", typeIcon: "🥩", note: "Istituzione di Hollywood dal fascino storico: da scegliere se volete una vera cena Old Hollywood.", mapsQuery: "Musso & Frank Grill 6667 Hollywood Blvd Los Angeles" },
        { name: "République", image: "https://i.pinimg.com/736x/e7/e6/8d/e7e68d15d9d6cf32b82a108800b18e7c.jpg", meal: "serious", price: "$$", lf: true, type: "Francese · bakery · brunch", typeIcon: "🥐", note: "Segnato da Fortuna · storico edificio su La Brea, molto apprezzato per bakery, brunch e cucina francese contemporanea.", mapsQuery: "Republique 624 S La Brea Ave Los Angeles CA 90036" },
        { name: "Du-par's Restaurant & Bakery", image: "https://dupars.net/Store/wp-content/uploads/2015/11/DU-PARS.jpg", meal: "quick", price: "$", lf: true, type: "Diner · colazione · pancake", typeIcon: "🥞", note: "Segnato da Fortuna · storico diner dell'Original Farmers Market, famoso per i suoi buttermilk hot cakes. Da provare per i pancake.", description: "Du-par's è un classico di Los Angeles aperto all'Original Farmers Market dal 1938. Il locale è celebre soprattutto per i buttermilk hot cakes, serviti in short stack o full stack con burro fuso e sciroppo d'acero o boysenberry. Una tappa perfetta se volete fare una vera colazione americana o una pausa dolce durante la giornata.", mapsQuery: "Du-par's Restaurant & Bakery 6333 W 3rd St Los Angeles CA 90036" }
      ], days: [], tickets: []
    },

    {
      id: "vegas1", city: "Las Vegas", accent: "vegas", image: "./assets/las-vegas.jpg",
      dateFrom: "2026-10-27", dateTo: "2026-10-28",
      hotel: { name: "Paris Las Vegas", address: "3655 Las Vegas Blvd S, Las Vegas, NV 89109", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Las+Vegas+3655+Las+Vegas+Blvd+S+Las+Vegas+NV+89109", checkin: "2026-10-27", checkout: "2026-10-28", hotelFee: { perNight: 62.30, label: "Resort fee + tasse", note: "circa $62,30 a notte ($54,95 + tasse) · totale previsto: circa $62,30" } },
      transport: [{ date: "2026-10-27", time: "Da definire", type: "car", title: "Los Angeles → Las Vegas", subtitle: "In auto", mapsQuery: "Las Vegas, NV" }],
      places: [
        { priority: "must", name: "Las Vegas Strip", note: "Passeggiata serale tra i resort più iconici: Bellagio, Caesars Palace, Venetian e dintorni.", mapsQuery: "Las Vegas Strip" },
        { priority: "must", name: "Caesars Palace & Forum Shops", note: "Uno dei resort simbolo della Strip, con scenografie ispirate all’antica Roma e i grandi Forum Shops.", mapsQuery: "Caesars Palace Las Vegas" },
        { priority: "must", name: "Fontane del Bellagio", note: "Uno degli spettacoli più riconoscibili della Strip.", mapsQuery: "Bellagio Fountains" },
        { priority: "must", name: "Welcome to Fabulous Las Vegas Sign", note: "La foto simbolo della città.", mapsQuery: "Welcome to Fabulous Las Vegas Sign" },
        { priority: "discover", name: "Bellagio Conservatory", note: "Giardino scenografico interno al Bellagio, gratuito e facile da inserire durante la passeggiata sulla Strip.", mapsQuery: "Bellagio Conservatory & Botanical Gardens" },
        { priority: "discover", name: "Sphere", note: "L'enorme venue sferica rivestita di LED: nel vostro programma la vedete dall'esterno al calare del buio, senza spettacolo a pagamento.", mapsQuery: "Sphere Las Vegas" }
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
        { name: "Golden Steer Steakhouse", image: "./assets/restaurants/golden-steer.webp", meal: "serious", price: "$$$$", type: "Steakhouse storica", typeIcon: "🥩", note: "Una delle steakhouse classiche più iconiche di Las Vegas: atmosfera old-school e conto importante.", mapsQuery: "Golden Steer Steakhouse Las Vegas" },
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
        { name: "Rainbow Room", image: "./assets/restaurants/rainbow-room.webp", meal: "serious", price: "$$$", type: "Americano · vista Lake Powell", typeIcon: "🌅", note: "Ristorante del Lake Powell Resort con grandi vetrate su Wahweap Bay. La scelta più comoda per la sera del 28 ottobre: niente altra guida dopo il Grand Canyon. Cena 17:00–21:00; prenotazione consigliata.", mapsQuery: "Rainbow Room 100 Lakeshore Dr Page AZ 86040" },
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
        { date: "2026-10-30", time: "06:30 circa", type: "car", title: "Riconsegna SUV a noleggio", subtitle: "Riconsegna all'aeroporto di Las Vegas (LAS) prima del volo delle 09:58", mapsQuery: "Harry Reid International Airport car rental return" },
        { date: "2026-10-30", time: "09:58", type: "flight", title: "Volo LAS → ORD", subtitle: "Las Vegas → Chicago O’Hare · arrivo 15:53 ora locale", mapsQuery: "Chicago O'Hare International Airport" }
      ],
      places: [
        { priority: "must", name: "Fremont Street Experience", note: "Per vedere anche il lato Old Vegas, diverso dalla Strip.", mapsQuery: "Fremont Street Experience" },
        { priority: "must", lf: true, name: "High Roller", note: "Ruota panoramica del LINQ: giro di circa 30 minuti con vista a 360° sulla Strip illuminata. Inserita la sera del 29 ottobre.", mapsQuery: "High Roller Las Vegas" },
        { priority: "discover", name: "Bellagio Conservatory", note: "Giardino scenografico interno al Bellagio, facile da inserire durante una passeggiata sulla Strip.", mapsQuery: "Bellagio Conservatory & Botanical Gardens" },
        { priority: "discover", name: "The Venetian & Grand Canal", note: "Interni e canali tra i più scenografici della Strip.", mapsQuery: "The Venetian Las Vegas" }
      ],
      foods: [
        { id: "vegas2-shrimp", name: "Shrimp Cocktail", short: "Un grande classico della vecchia Las Vegas.", description: "Cocktail di gamberi freddi con salsa cocktail: semplice, rétro e storicamente legato ai casinò e alla vecchia cultura dei menu di Las Vegas.", whereToFind: [{ name: "Golden Gate Hotel & Casino", note: "Il shrimp cocktail è legato alla vecchia Las Vegas; Golden Gate è uno dei nomi storici associati a questa tradizione.", price: "$", mapsQuery: "Golden Gate Hotel Casino Las Vegas" }], image: "./assets/food/vegas-shrimp-cocktail.jpg", photoCredit: "Didriks / Wikimedia Commons · CC BY 2.0" },
        { id: "vegas2-primerib", name: "Prime Rib", short: "Arrosto di manzo da steakhouse classica.", description: "Taglio di manzo arrostito lentamente, uno dei piatti più rappresentativi delle steakhouse della città.", whereToFind: [{ name: "Golden Steer Steakhouse", image: "./assets/restaurants/golden-steer.webp", note: "Steakhouse old-school: scelta perfetta per vivere il lato classico della prime rib e della carne a Las Vegas.", price: "$$$$", mapsQuery: "Golden Steer Steakhouse Las Vegas" }], image: "./assets/food/vegas-prime-rib.jpg", photoCredit: "Steven Miller / Wikimedia Commons · CC BY 2.0" }
      ],
      activities: [], restaurants: [
        { name: "Tacos El Gordo", image: "./assets/food/la-tacos-al-pastor.jpg", meal: "quick", price: "$", type: "Tacos · street food", typeIcon: "🌮", note: "Uno dei nomi più popolari della Strip per tacos in stile Tijuana: veloce, informale e relativamente economico.", mapsQuery: "Tacos El Gordo 3041 S Las Vegas Blvd" },
        { name: "Secret Pizza", image: "https://images.squarespace-cdn.com/content/v1/62fd437b8b8c3c7c47b4caa7/1723914560701-CJWU2TVTTFRSR1CIP5WS/unsplash-image-22Vt7JIf7ZI.jpg", meal: "quick", price: "$", type: "Pizza al taglio", typeIcon: "🍕", note: "Pizzeria nascosta al Cosmopolitan: perfetta per una fetta veloce anche tardi.", mapsQuery: "Secret Pizza Cosmopolitan Las Vegas" },
        { name: "Hash House A Go Go · LINQ", image: "https://images.openai.com/static-rsc-1/J5YhaRLltxLe2b429Py9SC7KA_-zNfvPmTE3x5YQa70quOXwCXJYhVPF35wKRRWOvGBlv_bFM6tWBq_49a141gZ6flQDiLQ6desNsMzWsBl4i_GaC-HiNxi-4sCISzbM", meal: "quick", price: "$$", type: "Americano · porzioni enormi", typeIcon: "🍳", note: "Piatti americani esagerati e porzioni gigantesche: più esperienza Vegas che cena elegante.", mapsQuery: "Hash House A Go Go LINQ Las Vegas" },
        { name: "Mon Ami Gabi · Paris Las Vegas", image: "./assets/restaurants/mon-ami-gabi.webp", meal: "serious", price: "$$$", type: "Bistrot francese", typeIcon: "🍷", note: "Comodissimo perché è nel vostro hotel. Patio sulla Strip con vista verso le fontane del Bellagio.", mapsQuery: "Mon Ami Gabi Paris Las Vegas" },
        { name: "Golden Steer Steakhouse", image: "./assets/restaurants/golden-steer.webp", meal: "serious", price: "$$$$", type: "Steakhouse storica", typeIcon: "🥩", note: "Una delle steakhouse classiche più iconiche di Las Vegas: atmosfera old-school e conto importante.", mapsQuery: "Golden Steer Steakhouse Las Vegas" },
        { name: "Yardbird", image: "./assets/food/vegas-prime-rib.jpg", meal: "serious", price: "$$$", type: "Southern · pollo", typeIcon: "🍗", note: "Al Venetian: cucina del Sud USA, fried chicken e piatti sostanziosi. Più rilassato di una steakhouse di lusso.", mapsQuery: "Yardbird Venetian Las Vegas" },
        { name: "Eiffel Tower Restaurant", image: "./assets/food/vegas-prime-rib.jpg", meal: "serious", price: "$$$$", type: "Francese · vista", typeIcon: "🍷", note: "Nel Paris Las Vegas: cena panoramica e romantica, da considerare solo se volete concedervi una serata costosa.", mapsQuery: "Eiffel Tower Restaurant Paris Las Vegas" }
      ], days: [], tickets: []
    },

    {
      id: "chicago", city: "Chicago", accent: "chicago", image: "./assets/chicago.jpg",
      dateFrom: "2026-10-30", dateTo: "2026-11-03",
      hotel: { name: "Warwick Allerton - Chicago", address: "701 N Michigan Ave, Chicago, IL 60611", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Warwick+Allerton+Chicago+701+N+Michigan+Ave+Chicago+IL+60611", checkin: "2026-10-30", checkout: "2026-11-03", hotelFee: { perNight: 29.35, label: "Resort fee", note: "$29,35 a notte · totale previsto per 4 notti: $117,40 · deposito cauzionale escluso dal budget" } },
      transport: [{ date: "2026-10-30", time: "09:58", type: "flight", title: "Volo LAS → ORD", subtitle: "Las Vegas → Chicago O’Hare · arrivo 15:53 ora locale", mapsQuery: "Chicago O'Hare International Airport" }],
      places: [
        { priority: "must", name: "Millennium Park", note: "Il grande parco urbano del Loop: Pritzker Pavilion, Crown Fountain, giardini e architettura contemporanea.", mapsQuery: "Millennium Park Chicago" },
        { priority: "must", name: "Cloud Gate · The Bean", note: "La scultura-specchio simbolo di Chicago, nel cuore di Millennium Park.", mapsQuery: "Cloud Gate Chicago" },
        { priority: "must", name: "Chicago Riverwalk", note: "Passeggiata lungo il fiume tra i grattacieli.", mapsQuery: "Chicago Riverwalk" },
        { priority: "must", name: "Architecture River Cruise", note: "Una delle esperienze più caratteristiche per vedere l'architettura di Chicago dal fiume.", mapsQuery: "Chicago Architecture Center River Cruise" },
        { priority: "must", name: "Art Institute of Chicago", note: "Uno dei grandi musei d’arte degli Stati Uniti, direttamente accanto a Millennium Park.", mapsQuery: "Art Institute of Chicago" },
        { priority: "must", name: "Magnificent Mile", note: "Michigan Avenue: siete già praticamente lì con il vostro hotel.", mapsQuery: "Magnificent Mile Chicago" },
        { priority: "discover", name: "Wrigley Building & Tribune Tower", note: "Due icone architettoniche affacciate su Michigan Avenue e sul Chicago River, perfette da vedere lungo il percorso tra Magnificent Mile e Riverwalk.", mapsQuery: "Wrigley Building Chicago" },
        { priority: "discover", name: "Chicago Water Tower", note: "Storico edificio in pietra calcarea sulla Magnificent Mile, tra i pochi edifici pubblici dell'area sopravvissuti al Grande Incendio del 1871.", mapsQuery: "Chicago Water Tower" },
        { priority: "discover", name: "Starbucks Reserve Roastery", note: "La grande Roastery di Chicago su Michigan Avenue: cinque piani dedicati a caffè, torrefazione, food e cocktail.", mapsQuery: "Starbucks Reserve Roastery Chicago 646 N Michigan Ave" },
        { priority: "discover", name: "Navy Pier", note: "Molo sul lago Michigan, piacevole soprattutto nel pomeriggio e verso il tramonto.", mapsQuery: "Navy Pier Chicago" },
        { priority: "discover", name: "Grant Park & Buckingham Fountain", note: "Il grande parco sul lago a sud di Millennium Park. Durante il vostro soggiorno la Buckingham Fountain sarà già fuori stagione dal 1° novembre: resta visibile come monumento, ma senza getti d’acqua.", mapsQuery: "Buckingham Fountain Chicago" },
        { priority: "discover", name: "360 Chicago", note: "Osservatorio al 875 N Michigan: è vicinissimo al Warwick Allerton e quindi comodissimo da inserire.", mapsQuery: "360 Chicago Observation Deck" }
      ],
      foods: [
        { id: "chi-deepdish", name: "Deep-Dish Pizza", short: "La pizza alta e ricchissima simbolo di Chicago.", description: "Pizza cotta in una teglia profonda, con bordo alto, abbondante formaggio e salsa di pomodoro. È probabilmente il piatto più famoso associato alla città.", whereToFind: [{ name: "Lou Malnati's · River North", image: "./assets/restaurants/lou-malnatis.webp", note: "Una delle istituzioni cittadine per la deep-dish, comoda rispetto al vostro hotel.", price: "$$", mapsQuery: "Lou Malnati's 439 N Wells St Chicago" }, { name: "Giordano's", note: "Versione stuffed, ancora più ricca e piena di formaggio.", price: "$$", mapsQuery: "Giordano's 130 E Randolph St Chicago" }], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Deep_Dish_Pizza.jpg/960px-Deep_Dish_Pizza.jpg", photoCredit: "Victorgrigas / Wikimedia Commons · CC BY-SA 3.0" },
        { id: "chi-hotdog", name: "Chicago-Style Hot Dog", short: "Hot dog 'dragged through the garden' e niente ketchup.", description: "Salsiccia di manzo in bun al papavero con senape gialla, cipolla, relish, pomodoro, pickle, peperoncini sport peppers e sale al sedano. La versione tradizionale non prevede ketchup.", whereToFind: [{ name: "Portillo's · River North", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chicago-style_hot_dog.jpg", note: "Chicago-style hot dog classico e molto comodo dalla Magnificent Mile.", price: "$", mapsQuery: "Portillo's 100 W Ontario St Chicago" }], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Chicago-style_hot_dog.jpg/960px-Chicago-style_hot_dog.jpg", photoCredit: "Meg Marco / Wikimedia Commons · CC BY-SA 3.0" },
        { id: "chi-beef", name: "Italian Beef", short: "Panino di manzo affettato sottile con jus e giardiniera.", description: "Panino con manzo cotto e affettato sottilissimo, bagnato nel suo jus e spesso completato con giardiniera piccante o peperoni dolci.", whereToFind: [{ name: "Al's #1 Italian Beef", note: "Tra i nomi storici dell'Italian beef; il marchio fa risalire la ricetta agli anni Trenta.", price: "$", mapsQuery: "Al's #1 Italian Beef 548 N Wells St Chicago" }, { name: "Portillo's · River North", image: "./assets/food/chicago-italian-beef.jpg", note: "Alternativa comodissima per provarlo insieme al Chicago dog.", price: "$", mapsQuery: "Portillo's 100 W Ontario St Chicago" }], image: "./assets/food/chicago-italian-beef.jpg", photoCredit: "Krista / Wikimedia Commons · CC BY 2.0" }
      ],
      activities: [
        { priority: "must", lf: true, name: "Haunted Halsted Halloween Parade", date: "2026-10-31", time: "19:00–20:00", status: "Confermato 2026", icon: "🎃", note: "Halloween a Chicago: 30ª edizione. Parade 19:00–20:00 da Halsted & Belmont verso Brompton; festa diurna 11:00–18:00 e costume contest/post-party 20:00–22:00. Gratuita per gli spettatori.", mapsQuery: "Halsted St and Belmont Ave Chicago" }
      ], restaurants: [
        { name: "Portillo's · River North", image: "./assets/food/chicago-italian-beef.jpg", meal: "quick", price: "$", type: "Chicago hot dog · Italian beef", typeIcon: "🌭", note: "Comodissimo dal vostro hotel e perfetto per assaggiare due simboli di Chicago senza perdere tempo.", mapsQuery: "Portillo's 100 W Ontario St Chicago" },
        { name: "Al's #1 Italian Beef · Wells St", image: "https://static.wixstatic.com/media/bef3c2_39bd36c463fa4d9c88999910045e9426~mv2.jpeg/v1/fill/w_490%2Ch_368%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/bef3c2_39bd36c463fa4d9c88999910045e9426~mv2.jpeg", meal: "quick", price: "$", type: "Italian beef", typeIcon: "🥪", note: "Versione storica dell'Italian beef: panino bagnato nel jus, con giardiniera se vi piace piccante.", mapsQuery: "Al's #1 Italian Beef 548 N Wells St Chicago" },
        { name: "Lou Malnati's · River North", image: "./assets/restaurants/lou-malnatis.webp", meal: "quick", price: "$$", type: "Deep-dish pizza", typeIcon: "🍕", note: "Una delle scelte classiche per la deep-dish. Considerate i tempi di cottura: non è proprio una pizza 'al volo'.", mapsQuery: "Lou Malnati's 439 N Wells St Chicago" },
        { name: "Giordano's · Millennium Park", image: "./assets/restaurants/giordanos.webp", meal: "quick", price: "$$", type: "Stuffed deep-dish", typeIcon: "🍕", note: "Altra istituzione cittadina, utile se volete confrontare lo stile stuffed con la deep-dish classica.", mapsQuery: "Giordano's 130 E Randolph St Chicago" },
        { name: "The Purple Pig", image: "./assets/restaurants/purple-pig.jpg", meal: "serious", price: "$$$", type: "Mediterraneo · piccoli piatti", typeIcon: "🍷", note: "444 N Michigan Ave, Upper Level. Cucina mediterranea e piatti da condividere; il venerdì è aperto fino alle 22:00. Lo teniamo pronto per la prima cena a Chicago, dopo Riverwalk, senza dover cercare un locale da stanchi.", mapsQuery: "The Purple Pig 444 N Michigan Ave Chicago" },
        { name: "The Gage", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$", type: "Gastropub · americano moderno", typeIcon: "🍽️", note: "24 S Michigan Ave, praticamente di fronte a Millennium Park e a pochi passi dall’Art Institute. Il lunedì la cucina è aperta 11:00–23:00: perfetto per il pranzo del 2 novembre senza deviazioni.", mapsQuery: "The Gage 24 S Michigan Ave Chicago" },
        { name: "Wildberry Pancakes and Cafe · Water Tower", image: "./assets/restaurants/wildberry-water-tower.webp", meal: "quick", price: "$$", type: "Colazione · pancakes · brunch", typeIcon: "🥞", note: "196 E Pearson St, a pochi minuti dal Warwick. Colazione americana con specialty pancakes, French toast, Benedict, omelette e skillet; il sabato apre alle 07:00.", mapsQuery: "Wildberry Pancakes and Cafe 196 E Pearson St Chicago" },
        { name: "Girl & The Goat", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80", meal: "serious", price: "$$$", type: "Americano moderno", typeIcon: "🍽️", note: "Uno dei ristoranti più noti di West Loop: cena da prenotare se volete dedicare una serata al cibo.", mapsQuery: "Girl & The Goat 809 W Randolph St Chicago" },
        { name: "Drew's on Halsted", image: "./assets/restaurants/drews-on-halsted.webp", meal: "serious", price: "$$", type: "Americano · grill", typeIcon: "🍔", note: "Praticamente all'inizio della Haunted Halsted Parade, all'angolo Halsted/Belmont. Perfetto per cenare prima della parata senza altri spostamenti.", mapsQuery: "Drew's on Halsted 3201 N Halsted St Chicago" },
        { name: "Quartino Ristorante", image: "./assets/restaurants/quartino.webp", meal: "serious", price: "$$", type: "Italiano · pizza · piccoli piatti", typeIcon: "🍝", note: "River North, vicino all'hotel: pasta, pizza napoletana e piccoli piatti da condividere. Comodo per una cena senza complicare la giornata.", mapsQuery: "Quartino Ristorante 626 N State St Chicago" }
      ], days: [], tickets: []
    },

    {
      id: "bayahibe", city: "Bayahibe", accent: "sd", image: "./assets/bayahibe.jpg",
      dateFrom: "2026-11-03", dateTo: "2026-11-09",
      hotel: { name: "Viva Dominicus Palace by Wyndham", address: "Dominicus, Bayahibe, La Romana, Repubblica Dominicana", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Viva+Dominicus+Palace+by+Wyndham+Bayahibe+Dominican+Republic", checkin: "2026-11-03", checkout: "2026-11-09", hotelFee: { perNight: 0, label: "Fee hotel", note: "Nessuna resort fee separata verificata al momento per il vostro pacchetto all-inclusive" } },
      transport: [
        { date: "2026-11-03", time: "09:17", type: "flight", title: "Volo ORD → PUJ", subtitle: "Chicago O'Hare → Punta Cana · Durata 4 h 32 min", arriveTime: "15:57", arriveNote: "Arrivo a Punta Cana (PUJ) il 03/11 · transfer per Bayahibe incluso nel pacchetto", mapsQuery: "Punta Cana International Airport" },
        { date: "2026-11-09", time: "12:56", type: "flight", title: "Volo PUJ → IAD", subtitle: "Punta Cana → Washington Dulles · Durata 3 h 59 min", arriveTime: "15:55", arriveNote: "Scalo a Washington: 2 h 05 min", mapsQuery: "Washington Dulles International Airport" },
        { date: "2026-11-09", time: "18:00", type: "flight", title: "Volo IAD → FCO", subtitle: "Washington Dulles → Roma Fiumicino · Durata 8 h 50 min", arriveTime: "08:30", arriveNote: "Arrivo a Roma martedì 10/11/2026", mapsQuery: "Leonardo da Vinci–Fiumicino Airport" }
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
  "sfo": [
    {
      "date": "2026-10-20",
      "title": "Arrivo a San Francisco",
      "theme": "Atterraggio, hotel e prima cena senza forzare i tempi dell'immigrazione.",
      "items": [
        {
          "time": "19:25",
          "kind": "recommended",
          "icon": "🛬",
          "title": "Arrivo a SFO",
          "note": "Atterraggio a San Francisco. Dopo lo sbarco: controlli d’ingresso, ritiro bagagli e uscita dal terminal.",
          "mapsQuery": "San Francisco International Airport"
        },
        {
          "time": "Dopo i controlli",
          "kind": "transfer",
          "icon": "🚕",
          "title": "Spostamento · SFO → Hotel Spero",
          "note": "🚕 Uber/Lyft consigliato · circa 22 km · normalmente 25–35 min dopo essere usciti dal terminal. Con traffico serale può servire più tempo.",
          "mapsQuery": "Hotel Spero 405 Taylor St San Francisco",
          "uberDestination": "Hotel Spero 405 Taylor St San Francisco CA 94102",
          "lyftDestination": "Hotel Spero 405 Taylor St San Francisco CA 94102"
        },
        {
          "time": "All’arrivo",
          "kind": "recommended",
          "icon": "🏨",
          "title": "Check-in Hotel Spero",
          "note": "Check-in e sistemazione in camera. Nessun’altra visita programmata per la serata.",
          "mapsQuery": "Hotel Spero 405 Taylor St San Francisco"
        },
        {
          "time": "21:30 circa",
          "kind": "recommended",
          "icon": "🍕",
          "title": "Uncle Vito's Pizzeria",
          "note": "Prima cena solo se siete usciti dall'hotel in tempo. 🚶 Circa 700 m · 10 min a piedi dall'Hotel Spero. Il martedì chiude alle 22:00: se l'immigrazione vi rallenta, non correte e scegliete qualcosa di aperto più tardi vicino all'hotel.",
          "mapsQuery": "Uncle Vito's Pizzeria 700 Bush St San Francisco CA 94108",
          "mapLat": 37.79062,
          "mapLon": -122.40917,
          "detailRestaurant": "Uncle Vito's Pizzeria"
        }
      ]
    },
    {
      "date": "2026-10-21",
      "title": "Icone di San Francisco e tramonto al Golden Gate",
      "theme": "Painted Ladies e Panhandle al mattino, Golden Gate e Sausalito, poi tramonto fotografico da Battery Spencer.",
      "items": [
        {
          "time": "08:30",
          "kind": "transfer",
          "icon": "🚕",
          "title": "Spostamento · Hotel Spero → Painted Ladies",
          "note": "🚕 Uber/Lyft consigliato · circa 4 km · 10–15 min. Con i mezzi pubblici considerate circa 25–30 min.",
          "mapsQuery": "Painted Ladies San Francisco"
        },
        {
          "time": "09:00",
          "kind": "recommended",
          "icon": "🏘️",
          "title": "Painted Ladies",
          "note": "Foto da Alamo Square e breve passeggiata. Per questa tappa bastano circa 30 minuti.",
          "mapsQuery": "Painted Ladies San Francisco",
          "detailPlace": "Painted Ladies"
        },
        {
          "time": "09:35",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Painted Ladies → Panhandle",
          "note": "🚶 A piedi consigliato · circa 1,3 km · 18–20 min. È un tratto semplice che evita di prendere un mezzo per pochi minuti.",
          "mapsQuery": "Panhandle San Francisco"
        },
        {
          "time": "10:00",
          "kind": "recommended",
          "icon": "🌳",
          "title": "Golden Gate Park · Panhandle",
          "note": "Passeggiata di circa 40 minuti nel corridoio verde che introduce al Golden Gate Park.",
          "mapsQuery": "Panhandle San Francisco",
          "detailPlace": "Golden Gate Park · Panhandle"
        },
        {
          "time": "10:45",
          "kind": "transfer",
          "icon": "🚕",
          "title": "Spostamento · Panhandle → Golden Gate Bridge",
          "note": "🚕 Uber/Lyft consigliato · circa 5 km · 12–18 min. È più rapido dei mezzi e vi porta direttamente al Welcome Center / Toll Plaza.",
          "mapsQuery": "Golden Gate Bridge Welcome Center San Francisco"
        },
        {
          "time": "11:10",
          "kind": "recommended",
          "icon": "🌉",
          "title": "Golden Gate Bridge",
          "note": "Belvedere, foto, Welcome Center e passeggiata sul ponte. Tenete circa 1 ora / 1 ora e 15 minuti.",
          "mapsQuery": "Golden Gate Bridge Welcome Center San Francisco",
          "detailPlace": "Golden Gate Bridge"
        },
        {
          "time": "12:25",
          "kind": "transfer",
          "icon": "🚌",
          "title": "Spostamento · Golden Gate Bridge → Sausalito",
          "note": "🚌 Golden Gate Transit 120 consigliato · circa 7 km · 13 min di bus, più l'attesa. Alternativa 🚕 Uber/Lyft: circa 7–10 min. A piedi sarebbero circa 7,2 km / 1h25: non conviene.",
          "mapsQuery": "Sausalito California"
        },
        {
          "time": "13:00",
          "kind": "recommended",
          "icon": "⛵",
          "title": "Sausalito",
          "note": "Waterfront, passeggiata e pranzo con calma. Avete circa 3 ore prima di tornare verso il Golden Gate per il tramonto.",
          "mapsQuery": "Sausalito California",
          "detailPlace": "Sausalito"
        },
        {
          "time": "16:15",
          "kind": "transfer",
          "icon": "🚕",
          "title": "Spostamento · Sausalito → Battery Spencer",
          "note": "🚕 Uber/Lyft consigliato · circa 6 km · 10–15 min. È il modo più semplice per arrivare al punto panoramico senza perdere la golden hour.",
          "mapsQuery": "Battery Spencer California"
        },
        {
          "time": "16:35",
          "kind": "recommended",
          "icon": "📸",
          "title": "Battery Spencer · Golden Gate al tramonto",
          "note": "Momento fotografico della giornata. Arrivate con largo anticipo per golden hour, foto del ponte e skyline. 🌅 Tramonto previsto alle 18:23; restate qualche minuto anche dopo per le luci del ponte.",
          "mapsQuery": "Battery Spencer California"
        },
        {
          "time": "18:35",
          "kind": "transfer",
          "icon": "🚕",
          "title": "Spostamento · Battery Spencer → Beach Chalet",
          "note": "🚕 Uber/Lyft consigliato · circa 11 km · 25–35 min attraversando di nuovo il Golden Gate. Il traffico sul ponte può allungare il tragitto.",
          "mapsQuery": "Beach Chalet Brewery & Restaurant San Francisco"
        },
        {
          "time": "19:10 circa",
          "kind": "recommended",
          "icon": "🍺",
          "title": "Beach Chalet Brewery & Restaurant",
          "note": "Locale L&F. Usatelo come birra/aperitivo dopo il tramonto, non come cena anticipata. ⚠️ Il mercoledì chiude alle 21:00. Se arrivate tardi, fate solo una breve sosta.",
          "mapsQuery": "Beach Chalet Brewery & Restaurant San Francisco",
          "detailRestaurant": "Beach Chalet Brewery & Restaurant"
        },
        {
          "time": "20:00",
          "kind": "transfer",
          "icon": "🚕",
          "title": "Spostamento · Beach Chalet → Union Square",
          "note": "🚕 Uber/Lyft consigliato · circa 8 km · 20–30 min. Destinazione: Macy's Union Square per la cena.",
          "mapsQuery": "The Cheesecake Factory 251 Geary St San Francisco"
        },
        {
          "time": "20:40",
          "kind": "recommended",
          "icon": "🍰",
          "title": "The Cheesecake Factory · Union Square",
          "note": "Cena L&F all'8° piano di Macy's, vicino all'hotel. Dal lunedì al giovedì chiude alle 22:00: arrivando intorno alle 20:40 avete tempo per cenare senza anticipare troppo.",
          "mapsQuery": "The Cheesecake Factory 251 Geary St San Francisco",
          "detailRestaurant": "The Cheesecake Factory"
        }
      ]
    },
    {
      "date": "2026-10-22",
      "title": "Lombard Street, Chinatown, waterfront e Alcatraz",
      "theme": "Cable car e foto classica a Lombard al mattino, poi discesa naturale verso Chinatown, waterfront e Night Tour.",
      "items": [
        {
          "time": "08:25",
          "kind": "transfer",
          "icon": "🚋",
          "title": "Spostamento · Hotel Spero → Lombard Street",
          "note": "🚶 Circa 650 m · 8–10 min fino a Powell & Geary, poi 🚋 Powell–Hyde cable car fino a Hyde & Lombard: circa 16 min di corsa più l'attesa. È il modo più bello per arrivare in cima alla crooked street.",
          "mapsQuery": "Hyde St & Lombard St San Francisco"
        },
        {
          "time": "09:05",
          "kind": "recommended",
          "icon": "📸",
          "title": "Lombard Street",
          "note": "Partite dalla cima a Hyde Street per la vista sulla baia, poi scendete lungo le scalinate laterali. 📸 La foto più iconica si fa dal basso, a Leavenworth Street, guardando verso l'alto: è lì che i tornanti si leggono meglio tutti insieme. Tenete 35–40 minuti.",
          "mapsQuery": "Lombard St & Leavenworth St San Francisco",
          "detailPlace": "Lombard Street"
        },
        {
          "time": "09:45",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Lombard Street → Chinatown",
          "note": "🚶 A piedi consigliato · circa 1,1 km · 16 min dal fondo di Lombard verso Chinatown. Alternativa bus 30: circa 6 min di corsa più attesa.",
          "mapsQuery": "Dragon Gate Chinatown San Francisco"
        },
        {
          "time": "10:05",
          "kind": "recommended",
          "icon": "🏮",
          "title": "Chinatown",
          "note": "Grant Avenue, Dragon Gate e qualche vicolo del quartiere. Tenete circa 1 ora.",
          "mapsQuery": "Chinatown San Francisco",
          "detailPlace": "Chinatown"
        },
        {
          "time": "11:10",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Chinatown → Ferry Building",
          "note": "🚶 A piedi · circa 1,3 km · 15–20 min in discesa verso l'Embarcadero. Alternativa bus 1: circa 10 min.",
          "mapsQuery": "Ferry Building San Francisco"
        },
        {
          "time": "11:30",
          "kind": "recommended",
          "icon": "🏙️",
          "title": "Ferry Building",
          "note": "Mercato, architettura e waterfront. Circa 40–45 minuti.",
          "mapsQuery": "Ferry Building San Francisco"
        },
        {
          "time": "12:15",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Ferry Building → Pier 39",
          "note": "🚶 A piedi consigliato lungo l'Embarcadero · circa 1,9 km · 23–25 min. È già parte della visita, con vista continua sulla baia.",
          "mapsQuery": "Pier 39 San Francisco"
        },
        {
          "time": "12:45",
          "kind": "recommended",
          "icon": "🦭",
          "title": "Pier 39 e Fisherman's Wharf",
          "note": "Leoni marini, molo e waterfront. Dedicate circa 1 ora / 1 ora e un quarto.",
          "mapsQuery": "Pier 39 San Francisco",
          "detailPlace": "Fisherman's Wharf & Pier 39"
        },
        {
          "time": "14:00",
          "kind": "recommended",
          "icon": "🐟",
          "title": "Pranzo L&F · Fog Harbor oppure Scoma's",
          "note": "Entrambi restano perché sono L&F. Fog Harbor è direttamente a Pier 39 e chiude alle 21:00; Scoma's è circa 1 km più avanti verso Pier 47 e chiude alle 21:30. A pranzo gli orari di chiusura non sono un problema."
        },
        {
          "time": "15:20",
          "kind": "recommended",
          "icon": "🌊",
          "title": "Fisherman's Wharf · tempo libero",
          "note": "Passeggiata, negozi, foto e Ghirardelli se vi va. Questo margine vi lascia respirare prima dell'imbarco.",
          "mapsQuery": "Fisherman's Wharf San Francisco"
        },
        {
          "time": "16:40",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Fisherman's Wharf → Pier 33",
          "note": "🚶 A piedi · circa 1,3 km · 15–20 min lungo il waterfront. Alternativa F-Market: circa 10–15 min complessivi.",
          "mapsQuery": "Alcatraz City Cruises Pier 33 San Francisco"
        },
        {
          "time": "17:00",
          "kind": "recommended",
          "icon": "☕",
          "title": "Margine sul waterfront",
          "note": "Siete già in zona Pier 33. Usate questi minuti per bagno, acqua/caffè e per presentarvi senza fretta all'imbarco."
        },
        {
          "time": "17:25",
          "kind": "booked",
          "icon": "🚢",
          "title": "Arrivo a Pier 33 · imbarco",
          "note": "Alcatraz City Cruises raccomanda di essere presenti almeno 30 minuti prima della partenza delle 17:55.",
          "mapsQuery": "Alcatraz City Cruises Pier 33"
        },
        {
          "time": "17:55",
          "kind": "booked",
          "icon": "🌙",
          "title": "Alcatraz Night Tour",
          "note": "Prenotato. Durata indicativa 2–3 ore. 📸 Il 22 ottobre il tramonto è alle 18:22: durante il Night Tour avrete la possibilità di fotografare la baia e il Golden Gate nella luce del tramonto. Portate giacca antivento.",
          "mapsQuery": "Alcatraz Island San Francisco",
          "detailPlace": "Alcatraz Night Tour"
        },
        {
          "time": "Al rientro",
          "kind": "transfer",
          "icon": "🚕",
          "title": "Spostamento · Pier 33 → Union Square / Hotel Spero",
          "note": "🚕 Uber/Lyft: circa 3 km · 5–10 min. Alternativa F-Market + tratto a piedi: circa 25–30 min. Dopo il tour non conto su Wipeout: il giovedì chiude alle 21:00.",
          "mapsQuery": "Hotel Spero 405 Taylor St San Francisco"
        },
        {
          "time": "21:15 circa",
          "kind": "recommended",
          "icon": "🍜",
          "title": "Cena tardi · zona Union Square",
          "note": "Cena senza fretta vicino all'hotel. Una scelta affidabile è HINODEYA Ramen & Bar, 219 O'Farrell St: il giovedì è aperto fino all'1:30.",
          "mapsQuery": "HINODEYA Ramen & Bar 219 O'Farrell St San Francisco CA 94102"
        },
        {
          "time": "06:45 · domani",
          "kind": "recommended",
          "icon": "⏰",
          "title": "Sveglia consigliata per il 23 ottobre",
          "note": "Domani lasciamo Hotel Spero alle 08:00 per il volo SFO → LAX delle 11:00. Sveglia alle 06:45: circa 1h15 per prepararci; colazione per strada o in aeroporto."
        }
      ]
    }
  ],
  "la": [
    {
      "date": "2026-10-23",
      "title": "Arrivo e Downtown LA",
      "theme": "Auto a noleggio, check-in e un piccolo circuito a piedi tra i classici di Downtown prima di cena.",
      "items": [
        {
          "time": "08:00",
          "kind": "recommended",
          "icon": "🚕",
          "title": "Partenza da Hotel Spero",
          "note": "Lasciate l'hotel con margine per traffico, bagagli e controlli del volo domestico delle 11:00.",
          "mapsQuery": "San Francisco International Airport"
        },
        {
          "time": "08:30 circa",
          "kind": "recommended",
          "icon": "🛫",
          "title": "Arrivo a SFO",
          "note": "Check-in/bag drop se necessario e controlli di sicurezza. Obiettivo: essere al gate con ampio margine."
        },
        {
          "time": "11:00",
          "kind": "recommended",
          "icon": "✈️",
          "title": "Volo SFO → LAX",
          "note": "Partenza da San Francisco. Durata prevista 1h36."
        },
        {
          "time": "12:36",
          "kind": "recommended",
          "icon": "🛬",
          "title": "Arrivo a Los Angeles · LAX",
          "note": "Atterraggio previsto alle 12:36. Recuperate i bagagli e seguite le indicazioni Rental Car Shuttles."
        },
        {
          "time": "13:20 circa",
          "kind": "transfer",
          "icon": "🚌",
          "title": "Spostamento · terminal LAX → Rental Car Center",
          "note": "🚌 Navetta Rental Car · considerate circa 15–25 min tra attesa, percorso e discesa al Rental Car Center.",
          "mapsQuery": "LAX Rental Car Center 5251 West 98th Street Los Angeles"
        },
        {
          "time": "14:00 circa",
          "kind": "recommended",
          "icon": "🚗",
          "title": "Ritiro auto · Alamo",
          "note": "Orario realistico dopo bagagli, shuttle e pratica di noleggio. Da qui avete l'auto fino alla riconsegna a Las Vegas.",
          "mapsQuery": "Alamo Rent A Car LAX Rental Car Center 5251 West 98th Street Los Angeles"
        },
        {
          "time": "14:20 circa",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · LAX Rental Car Center → The Commerce Hotel",
          "note": "🚗 In auto · circa 30 km · 35–60 min a seconda del traffico. Non programmate nulla di rigido prima del check-in.",
          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"
        },
        {
          "time": "15:30 circa",
          "kind": "recommended",
          "icon": "🏨",
          "title": "Check-in al The Commerce",
          "note": "Lasciate i bagagli e ripartite solo se i tempi di aeroporto e noleggio sono andati bene.",
          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040",
          "mapLat": 33.998348,
          "mapLon": -118.145255
        },
        {
          "time": "16:10",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · The Commerce → Downtown LA",
          "note": "🚗 In auto · circa 16 km · 20–35 min. Parcheggiate nell'area Grand Central Market / Broadway e poi lasciate l'auto ferma per il piccolo circuito a piedi.",
          "mapsQuery": "Grand Central Market Parking 308 S Hill St Los Angeles CA 90013"
        },
        {
          "time": "16:45",
          "kind": "recommended",
          "icon": "🏛️",
          "title": "Bradbury Building",
          "note": "È praticamente di fronte al Grand Central Market. Il venerdì le visite terminano alle 17:00: se arrivate in tempo entrate per vedere l'atrio; se il volo vi ha rallentato, limitatevi all'esterno.",
          "mapsQuery": "Bradbury Building 304 S Broadway Los Angeles CA 90013"
        },
        {
          "time": "17:05",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Bradbury Building → Grand Central Market",
          "note": "🚶 A piedi · circa 100 m · 2 min: basta attraversare Broadway.",
          "mapsQuery": "Grand Central Market 317 S Broadway Los Angeles CA 90013"
        },
        {
          "time": "17:10",
          "kind": "recommended",
          "icon": "🌮",
          "title": "Grand Central Market",
          "note": "Giro nel mercato storico aperto dal 1917. Tenete 30–35 minuti: il mercato resta aperto fino alle 21:00.",
          "mapsQuery": "Grand Central Market 317 S Broadway Los Angeles CA 90013"
        },
        {
          "time": "17:45",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Grand Central Market → Angels Flight",
          "note": "🚶 A piedi · circa 150 m · 2–3 min verso l'ingresso inferiore di Angels Flight su Hill Street.",
          "mapsQuery": "Angels Flight Railway 351 S Hill St Los Angeles CA 90013"
        },
        {
          "time": "17:50",
          "kind": "recommended",
          "icon": "🚋",
          "title": "Angels Flight",
          "note": "Salite con la storica funicolare. Il tragitto è brevissimo, ma è uno dei simboli di Downtown e funziona bene come collegamento verso Bunker Hill.",
          "mapsQuery": "Angels Flight Railway Los Angeles"
        },
        {
          "time": "18:10",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Angels Flight → Walt Disney Concert Hall",
          "note": "🚶 A piedi · circa 750 m · 10 min da California Plaza verso Grand Avenue.",
          "mapsQuery": "Walt Disney Concert Hall 111 S Grand Ave Los Angeles CA 90012"
        },
        {
          "time": "18:20",
          "kind": "recommended",
          "icon": "🎼",
          "title": "Walt Disney Concert Hall & Grand Park",
          "note": "Esterni del Walt Disney Concert Hall e breve passeggiata nell'area di Grand Avenue / Grand Park. Circa 45–50 minuti.",
          "mapsQuery": "Walt Disney Concert Hall Los Angeles"
        },
        {
          "time": "19:15",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · recupero auto → Water Grill",
          "note": "🚶 Tornate verso il parcheggio di Grand Central Market, poi 🚗 circa 1,5 km / 5–10 min fino al Water Grill. Il ristorante offre valet.",
          "mapsQuery": "Water Grill 544 S Grand Ave Los Angeles CA 90071"
        },
        {
          "time": "20:30",
          "kind": "recommended",
          "icon": "🐟",
          "title": "Water Grill · Downtown",
          "note": "Cena di pesce in Downtown. Il venerdì chiude alle 23:00, quindi l'orario delle 20:30 è comodo.",
          "mapsQuery": "Water Grill 544 S Grand Ave Los Angeles CA 90071",
          "detailRestaurant": "Water Grill · Downtown"
        },
        {
          "time": "Dopo cena",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Rientro · Water Grill → The Commerce Hotel",
          "note": "🚗 In auto · circa 16 km · 20–30 min in condizioni normali serali.",
          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"
        }
      ]
    },
    {
      "date": "2026-10-24",
      "title": "Hollywood, Beverly Hills e Griffith",
      "theme": "Pancake da Du-par's, Hollywood, Sunset Strip, Beverly Hills e Griffith al tramonto, sempre con l'auto.",
      "items": [
        {
          "time": "07:30",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · The Commerce → Du-par's",
          "note": "🚗 In auto · circa 25 km · 30–45 min. Parcheggiate nell'area Original Farmers Market / The Grove.",
          "mapsQuery": "Du-par's Restaurant & Bakery 6333 W 3rd St Los Angeles CA 90036"
        },
        {
          "time": "08:10",
          "kind": "recommended",
          "icon": "🥞",
          "title": "Colazione da Du-par's Restaurant & Bakery",
          "note": "Colazione scelta da Fortuna: circa 1 ora per provare con calma i celebri buttermilk hot cakes. Siete già dentro l'Original Farmers Market.",
          "mapsQuery": "Du-par's Restaurant & Bakery 6333 W 3rd St Los Angeles CA 90036",
          "mapLat": 34.071635,
          "mapLon": -118.360402,
          "detailRestaurant": "Du-par's Restaurant & Bakery"
        },
        {
          "time": "09:15",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Du-par's → Hollywood Boulevard",
          "note": "🚗 In auto · circa 5 km · 15–25 min. Parcheggio consigliato: Ovation Hollywood, direttamente su Hollywood & Highland.",
          "mapsQuery": "Ovation Hollywood Parking 1736 Orange Dr Los Angeles CA 90028"
        },
        {
          "time": "09:45",
          "kind": "recommended",
          "icon": "⭐",
          "title": "Hollywood Boulevard",
          "note": "Walk of Fame, TCL Chinese Theatre e Dolby Theatre. Circa 2 ore, con l'auto lasciata nel garage di Ovation Hollywood.",
          "mapsQuery": "TCL Chinese Theatre Los Angeles",
          "detailPlace": "Hollywood Walk of Fame"
        },
        {
          "time": "11:50",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Hollywood → Beverly Hills via Sunset Strip",
          "note": "🚗 Circa 9 km · 20–30 min. Fate apposta il tratto su Sunset Boulevard / Sunset Strip: così vedete anche questo pezzo iconico di LA senza aggiungere una visita separata.",
          "mapsQuery": "Rodeo Drive Beverly Hills CA"
        },
        {
          "time": "12:20",
          "kind": "recommended",
          "icon": "🛍️",
          "title": "Beverly Hills & Rodeo Drive",
          "note": "Passeggiata, foto al Beverly Hills Sign e pranzo in zona. Tenete circa 2 ore / 2 ore e mezza.",
          "mapsQuery": "Rodeo Drive Beverly Hills",
          "detailPlace": "Beverly Hills & Rodeo Drive"
        },
        {
          "time": "14:20",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Beverly Hills → LACMA · Urban Light",
          "note": "🚗 Circa 5 km · 10–15 min. Calcolate qualche minuto extra per trovare parcheggio in zona Museum Row.",
          "mapsQuery": "Urban Light LACMA 5905 Wilshire Blvd Los Angeles CA 90036"
        },
        {
          "time": "14:40",
          "kind": "recommended",
          "icon": "💡",
          "title": "LACMA · Urban Light",
          "note": "Sosta fotografica da 35–40 minuti davanti all'installazione di Chris Burden.",
          "mapsQuery": "Urban Light LACMA 5905 Wilshire Blvd Los Angeles",
          "mapLat": 34.062822,
          "mapLon": -118.357929,
          "detailPlace": "LACMA · Urban Light"
        },
        {
          "time": "15:20",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · LACMA → Griffith Observatory",
          "note": "🚗 Circa 13,5 km · 25–40 min; il sabato aggiungete margine per la salita e soprattutto per il parcheggio vicino all'Osservatorio.",
          "mapsQuery": "Griffith Observatory Los Angeles"
        },
        {
          "time": "16:15",
          "kind": "recommended",
          "icon": "🌇",
          "title": "Griffith Observatory & Hollywood Sign",
          "note": "Arrivate prima della golden hour. Panorama, Hollywood Sign e tramonto previsto intorno alle 18:08; restate anche dopo il tramonto per vedere accendersi la città.",
          "mapsQuery": "Griffith Observatory",
          "detailPlace": "Griffith Observatory & Hollywood Sign"
        },
        {
          "time": "19:20",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Griffith Observatory → Musso & Frank",
          "note": "🚗 Circa 7 km · 20–30 min con il traffico di Hollywood. Musso & Frank dispone di parcheggio convalidato sul retro.",
          "mapsQuery": "Musso & Frank Grill 6667 Hollywood Blvd Los Angeles CA 90028"
        },
        {
          "time": "20:30",
          "kind": "recommended",
          "icon": "🥩",
          "title": "Musso & Frank Grill",
          "note": "Cena Old Hollywood con calma. Il sabato è aperto fino alle 23:00.",
          "mapsQuery": "Musso & Frank Grill 6667 Hollywood Blvd Los Angeles",
          "mapLat": 34.101763,
          "mapLon": -118.335026,
          "detailRestaurant": "Musso & Frank Grill"
        },
        {
          "time": "Dopo cena",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Rientro · Musso & Frank → The Commerce Hotel",
          "note": "🚗 In auto · circa 20 km · 25–35 min in serata.",
          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"
        }
      ]
    },
    {
      "date": "2026-10-25",
      "title": "Costa e location di The O.C.",
      "theme": "Santa Monica → Venice → Manhattan Beach → Redondo, sempre verso sud senza tornare indietro.",
      "items": [
        {
          "time": "08:10",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · The Commerce → Santa Monica",
          "note": "🚗 Circa 35 km · 35–50 min la domenica. ⚠️ Durante il vostro viaggio le rampe Moomat Ahiko Way del Pier sono chiuse per lavori: puntate a un parcheggio Downtown, ad esempio Structure 8 · 1571 2nd St, e seguite le deviazioni.",
          "mapsQuery": "Parking Structure 8 1571 2nd St Santa Monica CA 90401"
        },
        {
          "time": "09:00",
          "kind": "recommended",
          "icon": "🎡",
          "title": "Santa Monica Pier",
          "note": "Molo, Route 66, spiaggia e Third Street Promenade. Tenete circa 2 ore.",
          "mapsQuery": "Santa Monica Pier",
          "detailPlace": "Santa Monica Pier"
        },
        {
          "time": "11:15",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Santa Monica → Venice Beach",
          "note": "🚗 Circa 4 km · 10–15 min, più il tempo per parcheggiare. Non conviene lasciare l'auto a Santa Monica perché poi dovete proseguire verso South Bay.",
          "mapsQuery": "Venice Beach Parking Los Angeles CA"
        },
        {
          "time": "11:40",
          "kind": "recommended",
          "icon": "🏖️",
          "title": "Venice Beach",
          "note": "Boardwalk, Muscle Beach e Venice Canals. Circa 2 ore / 2 ore e mezza, includendo una pausa pranzo leggera.",
          "mapsQuery": "Venice Beach Los Angeles",
          "detailPlace": "Venice Beach"
        },
        {
          "time": "14:05",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Venice Beach → Manhattan Beach",
          "note": "🚗 Circa 16 km · 20–30 min. La tratta base è veloce, ma considerate semafori e ricerca parcheggio vicino al pier.",
          "mapsQuery": "Manhattan Beach Pier California"
        },
        {
          "time": "14:35",
          "kind": "optional",
          "icon": "🌴",
          "title": "Manhattan Beach",
          "note": "Sosta di circa 1 ora sul molo e sul lungomare.",
          "mapsQuery": "Manhattan Beach Pier",
          "detailPlace": "Manhattan Beach"
        },
        {
          "time": "15:40",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Manhattan Beach → Redondo Beach Pier",
          "note": "🚗 Circa 6 km · 10–15 min. Parcheggiate direttamente nella Pier & Plaza Parking Structure.",
          "mapsQuery": "Redondo Beach Pier Parking 100 W Torrance Blvd Redondo Beach CA 90277"
        },
        {
          "time": "16:00",
          "kind": "recommended",
          "icon": "📺",
          "title": "Redondo Beach Pier · The O.C.",
          "note": "Passeggiata sul pier e nelle location legate a The O.C.; restate per il tramonto intorno alle 18:07 e fate aperitivo con calma sul waterfront.",
          "mapsQuery": "Redondo Beach Pier",
          "detailPlace": "Redondo Beach Pier · The O.C."
        },
        {
          "time": "18:30",
          "kind": "optional",
          "icon": "🍸",
          "title": "Aperitivo sul waterfront",
          "note": "Sea Level resta tra i ristoranti della città ma la domenica la cucina chiude alle 21:00. Se vi piace, questo è il momento giusto per usarlo come aperitivo senza anticipare la cena.",
          "mapsQuery": "Sea Level Restaurant and Lounge 655 N Harbor Dr Redondo Beach CA 90277",
          "detailRestaurant": "Sea Level Restaurant & Lounge"
        },
        {
          "time": "20:30",
          "kind": "recommended",
          "icon": "🐟",
          "title": "Tony's On The Pier",
          "note": "Cena sul pier senza dover anticipare i vostri orari: la domenica la sala ristorante chiude alle 22:00 e il cocktail lounge resta aperto almeno fino a mezzanotte.",
          "mapsQuery": "Tony's On The Pier 210 Fisherman's Wharf Redondo Beach CA 90277",
          "detailRestaurant": "Tony's On The Pier"
        },
        {
          "time": "Dopo cena",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Rientro · Redondo Beach → The Commerce Hotel",
          "note": "🚗 Circa 40 km · 35–50 min, a seconda del traffico sulla 110/105.",
          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"
        }
      ]
    },
    {
      "date": "2026-10-26",
      "title": "Universal Studios Hollywood",
      "theme": "Giornata prenotata agli Universal; gli orari esatti del parco vanno verificati sul calendario ufficiale poco prima.",
      "items": [
        {
          "time": "08:15",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · The Commerce → Universal Studios Hollywood",
          "note": "🚗 Circa 27 km · 35–50 min il lunedì mattina. Puntate direttamente al parcheggio di Universal CityWalk e aggiungete tempo per raggiungere i cancelli.",
          "mapsQuery": "Universal Studios Hollywood Parking 100 Universal City Plaza Universal City CA"
        },
        {
          "time": "Giornata",
          "kind": "booked",
          "icon": "🎬",
          "title": "Universal Studios Hollywood",
          "note": "Biglietti già prenotati. Gli orari di apertura cambiano per giorno e stagione e Universal li pubblica normalmente circa 4 settimane prima: controlliamo il calendario ufficiale prima della partenza invece di fissare oggi un 10:00–18:00 non garantito.",
          "mapsQuery": "Universal Studios Hollywood",
          "detailPlace": "Universal Studios Hollywood"
        },
        {
          "time": "Dopo il parco",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Universal → Burbank (solo se compatibile)",
          "note": "🚗 Circa 8 km · 15–20 min. Fatelo solo se il parco chiude abbastanza presto e avete ancora energia; altrimenti saltate direttamente alla cena.",
          "mapsQuery": "Burbank California"
        },
        {
          "time": "Sera",
          "kind": "optional",
          "icon": "🎃",
          "title": "Bonus Halloween · case decorate a Burbank",
          "note": "Solo se compatibile con l'orario reale di chiusura degli Universal. Poco prima del viaggio controlliamo la destination guide 2026 delle case partecipanti.",
          "mapsQuery": "Burbank California"
        },
        {
          "time": "19:45 circa",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Universal/Burbank → The Little Door",
          "note": "🚗 Da Universal considerate circa 13 km · 25–40 min; da Burbank circa 16 km · 25–40 min. Se siete in ritardo, eliminate Burbank e andate direttamente al ristorante.",
          "mapsQuery": "The Little Door 8164 W 3rd St West Hollywood CA 90048"
        },
        {
          "time": "20:30",
          "kind": "recommended",
          "icon": "🍷",
          "title": "The Little Door",
          "note": "Cena L&F romantica. Il lunedì è aperto 18:00–22:00 e la prenotazione è richiesta: 20:30 è compatibile, ma non arriverei più tardi.",
          "mapsQuery": "The Little Door 8164 W 3rd St West Hollywood CA 90048",
          "detailRestaurant": "The Little Door"
        },
        {
          "time": "Dopo cena",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Rientro · The Little Door → The Commerce Hotel",
          "note": "🚗 Circa 20 km · 30–40 min in serata.",
          "mapsQuery": "The Commerce Casino & Hotel 6121 E Telegraph Rd Commerce CA 90040"
        },
        {
          "time": "06:45 · domani",
          "kind": "recommended",
          "icon": "⏰",
          "title": "Sveglia consigliata per il 27 ottobre",
          "note": "Domani partenza dal The Commerce alle 08:00 verso Las Vegas. Sveglia alle 06:45: circa 1h15 per prepararci e caricare l’auto; colazione lungo la strada."
        }
      ]
    }
  ],
  "vegas1": [
    {
      "date": "2026-10-27",
      "title": "Los Angeles → Las Vegas",
      "theme": "Las Vegas essenziale: Strip quasi tutta a piedi, poi auto solo per Old Vegas.",
      "items": [
        {
          "time": "08:00",
          "kind": "recommended",
          "icon": "🚗",
          "title": "Partenza da The Commerce Hotel",
          "note": "Check-out e partenza direttamente dall’hotel verso Las Vegas. Con una pausa, considerate circa 4½–5 ore.",
          "mapsQuery": "Welcome to Fabulous Las Vegas Sign"
        },
        {
          "time": "13:00 circa",
          "kind": "recommended",
          "icon": "📸",
          "title": "Welcome to Fabulous Las Vegas Sign",
          "note": "Prima tappa entrando a Las Vegas da sud: foto al cartello prima di raggiungere l’hotel.",
          "mapsQuery": "Welcome to Fabulous Las Vegas Sign",
          "detailPlace": "Welcome to Fabulous Las Vegas Sign"
        },
        {
          "time": "13:20",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Welcome Sign → Paris Las Vegas",
          "note": "🚗 In auto · circa 3–4 km · 10–15 min considerando traffico sulla Strip e ingresso al parcheggio del Paris.",
          "mapsQuery": "Paris Las Vegas 3655 Las Vegas Blvd S Las Vegas NV 89109"
        },
        {
          "time": "13:40–14:00",
          "kind": "recommended",
          "icon": "🏨",
          "title": "Paris Las Vegas · check-in",
          "note": "Parcheggio, bagagli e check-in se la camera è disponibile. Da questo momento lasciate l’auto ferma: il centro della Strip si gira meglio a piedi.",
          "mapsQuery": "Paris Las Vegas"
        },
        {
          "time": "14:40",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Paris → Bellagio",
          "note": "🚶 A piedi consigliato · circa 0,8–1 km · 10–15 min usando i passaggi pedonali della Strip. Non conviene spostare l’auto per una tratta così breve.",
          "mapsQuery": "Bellagio Conservatory & Botanical Gardens"
        },
        {
          "time": "15:00",
          "kind": "recommended",
          "icon": "🌿",
          "title": "Bellagio Conservatory",
          "note": "Ingresso gratuito. Dedicate circa 40–45 minuti al Conservatory & Botanical Gardens e a un breve giro nel Bellagio.",
          "mapsQuery": "Bellagio Conservatory & Botanical Gardens",
          "detailPlace": "Bellagio Conservatory"
        },
        {
          "time": "15:45",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Bellagio → Caesars Palace",
          "note": "🚶 A piedi · circa 650 m · 10–15 min. Si attraversa Flamingo Road con il ponte pedonale sopraelevato.",
          "mapsQuery": "Caesars Palace Forum Shops Las Vegas"
        },
        {
          "time": "16:00",
          "kind": "recommended",
          "icon": "🏛️",
          "title": "Caesars Palace & Forum Shops",
          "note": "Passeggiata tra gli interni del Caesars Palace e una parte dei Forum Shops. Circa 45–50 minuti sono sufficienti per vedere l’essenziale senza perdersi nei negozi.",
          "mapsQuery": "Caesars Palace Forum Shops",
          "detailPlace": "Caesars Palace & Forum Shops"
        },
        {
          "time": "16:55",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Caesars Palace → The Venetian",
          "note": "🚶 A piedi consigliato · circa 1 km · 12–18 min. Meglio il lato est della Strip, passando da LINQ e Harrah’s: evita la zona dei lavori dell’ex Mirage.",
          "mapsQuery": "The Venetian Las Vegas"
        },
        {
          "time": "17:15",
          "kind": "recommended",
          "icon": "🛶",
          "title": "The Venetian & Grand Canal",
          "note": "Interni, canali e Grand Canal Shoppes. Tenete circa 45–50 minuti: basta per vedere la parte scenografica senza fare il giro in gondola.",
          "mapsQuery": "The Venetian Las Vegas",
          "detailPlace": "The Venetian & Grand Canal"
        },
        {
          "time": "18:05",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Venetian → Sphere",
          "note": "🚶 A piedi · circa 0,9–1 km · 12–17 min. Seguite le indicazioni interne/esterne del Venetian verso Sphere: è troppo vicina per usare l’auto.",
          "mapsQuery": "Sphere Las Vegas"
        },
        {
          "time": "18:25",
          "kind": "recommended",
          "icon": "🌐",
          "title": "Sphere · esterno",
          "note": "Sosta fotografica quando è ormai buio: Exosphere illuminata, foto e video. Circa 25–30 minuti; nessuno spettacolo a pagamento previsto.",
          "mapsQuery": "Sphere Las Vegas",
          "detailPlace": "Sphere"
        },
        {
          "time": "18:55",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Sphere → Bellagio",
          "note": "🚶 A piedi consigliato se avete ancora gambe · circa 2,4 km · 25–30 min passando nuovamente verso Venetian/LINQ. Alternativa 🚕 taxi/Uber: circa 5–10 min più l’eventuale attesa.",
          "mapsQuery": "Bellagio Fountains Las Vegas"
        },
        {
          "time": "19:30",
          "kind": "recommended",
          "icon": "⛲",
          "title": "Fontane del Bellagio + Strip illuminata",
          "note": "Guardate uno spettacolo delle fontane e godetevi la Strip completamente illuminata. In questa fascia serale gli spettacoli sono molto frequenti, quindi non serve inseguire un singolo minuto preciso.",
          "mapsQuery": "Bellagio Fountains",
          "detailPlace": "Fontane del Bellagio"
        },
        {
          "time": "20:00",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Bellagio → Paris Las Vegas",
          "note": "🚶 A piedi · circa 0,8 km · 10–12 min attraversando Las Vegas Boulevard con i passaggi pedonali. Siete già diretti al ristorante del vostro hotel.",
          "mapsQuery": "Mon Ami Gabi Paris Las Vegas"
        },
        {
          "time": "20:30",
          "kind": "recommended",
          "icon": "🍷",
          "title": "Mon Ami Gabi · Paris Las Vegas",
          "note": "Cena al vostro orario abituale, direttamente al Paris: bistrot francese con patio sulla Strip e vista verso il Bellagio.",
          "mapsQuery": "Mon Ami Gabi 3655 S Las Vegas Blvd Las Vegas NV 89109",
          "mapLat": 36.112855,
          "mapLon": -115.172414,
          "detailRestaurant": "Mon Ami Gabi · Paris Las Vegas"
        },
        {
          "time": "21:45 circa",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Spostamento · Paris → Fremont Street",
          "note": "🚗 Riprendete l’auto · circa 11 km · 15–20 min. Parcheggio consigliato: Fremont Street Experience Garage, 111 S 4th St. L’ingresso è da 4th Street tra Carson e Fremont.",
          "mapsQuery": "Fremont Street Experience Parking Garage 111 S 4th St Las Vegas NV 89101"
        },
        {
          "time": "22:10–23:15",
          "kind": "recommended",
          "icon": "🎰",
          "title": "Fremont Street Experience",
          "note": "Old Vegas, casinò storici, neon e Canopy. I contenuti principali del Viva Vision partono all’inizio di ogni ora: arrivando intorno alle 22:10 avete tempo di passeggiare e vedere quello delle 23:00.",
          "mapsQuery": "Fremont Street Experience",
          "detailPlace": "Fremont Street Experience"
        },
        {
          "time": "23:15 circa",
          "kind": "transfer",
          "icon": "🚗",
          "title": "Rientro · Fremont Street → Paris Las Vegas",
          "note": "🚗 In auto · circa 11 km · 15–20 min. Rientro diretto: domani la partenza per il Grand Canyon è alle 07:00.",
          "mapsQuery": "Paris Las Vegas"
        },
        {
          "time": "05:45 · domani",
          "kind": "recommended",
          "icon": "⏰",
          "title": "Sveglia consigliata per il 28 ottobre",
          "note": "Domani partenza dal Paris alle 07:00 verso il Grand Canyon. Sveglia alle 05:45: circa 1h15 per prepararci, recuperare l’auto e partire; colazione lungo il tragitto."
        }
      ]
    }
  ],
  "page": [
    {
      "date": "2026-10-28",
      "title": "Las Vegas → Grand Canyon → Page",
      "theme": "La giornata più impegnativa: partenza presto e percorso lineare verso est",
      "items": [
        {
          "time": "07:00",
          "kind": "recommended",
          "icon": "🚗",
          "title": "Partenza dal Paris Las Vegas",
          "note": "Check-out e partenza verso il Grand Canyon South Rim. È la giornata più lunga del road trip.",
          "mapsQuery": "Grand Canyon Visitor Center South Rim"
        },
        {
          "time": "11:45–12:00",
          "kind": "recommended",
          "icon": "🅿️",
          "title": "Visitor Center · parcheggio",
          "note": "Lasciate l'auto nei parcheggi 1–4 del Visitor Center. Da qui Mather Point è a circa 5 minuti a piedi.",
          "mapsQuery": "Grand Canyon Visitor Center"
        },
        {
          "time": "12:05",
          "kind": "recommended",
          "icon": "🏜️",
          "title": "Mather Point",
          "note": "Primo grande impatto con il canyon. Panorama amplissimo e sosta fotografica senza trekking impegnativo.",
          "mapsQuery": "Mather Point Grand Canyon",
          "mapLat": 36.0619,
          "mapLon": -112.1078,
          "detailPlace": "Mather Point"
        },
        {
          "time": "12:40",
          "kind": "recommended",
          "icon": "🥪",
          "title": "Pausa pranzo veloce",
          "note": "Pausa breve nell'area Visitor Center prima di riprendere l'auto: il pomeriggio è dedicato alla Desert View Drive."
        },
        {
          "time": "13:20",
          "kind": "recommended",
          "icon": "🚗",
          "title": "Inizio Desert View Drive",
          "note": "Da qui si procede sempre verso est, nella stessa direzione di Page. La strada panoramica è percorribile con la vostra auto.",
          "mapsQuery": "Desert View Drive Grand Canyon",
          "detailPlace": "Desert View Drive",
          "mapSkip": true
        },
        {
          "time": "⚠️ Nota guida",
          "kind": "recommended",
          "icon": "⚠️",
          "title": "Strade consentite con l’auto",
          "note": "Seguite Desert View Drive (SR-64). Non imboccate Hermit Road o Yaki Point Road con l’auto privata; all’interno del parco seguite sempre la segnaletica NPS anche se il navigatore suggerisse diversamente."
        },
        {
          "time": "13:30",
          "kind": "recommended",
          "icon": "📍",
          "title": "Pipe Creek Vista",
          "note": "Prima sosta breve lungo la Desert View Drive. Bel colpo d'occhio sul canyon; 10–15 minuti sono sufficienti.",
          "mapsQuery": "Pipe Creek Vista Grand Canyon",
          "mapLat": 36.0588,
          "mapLon": -112.0932,
          "detailPlace": "Pipe Creek Vista"
        },
        {
          "time": "14:00",
          "kind": "recommended",
          "icon": "📍",
          "title": "Grandview Point",
          "note": "Uno dei viewpoint più panoramici della strada, con vista ampia da est a ovest e scorci del Colorado River.",
          "mapsQuery": "Grandview Point Grand Canyon",
          "mapLat": 35.9988,
          "mapLon": -111.9877,
          "detailPlace": "Grandview Point"
        },
        {
          "time": "14:40",
          "kind": "recommended",
          "icon": "📍",
          "title": "Moran Point",
          "note": "Sosta da 15–20 minuti: qui sono particolarmente evidenti colori e strati geologici differenti del canyon.",
          "mapsQuery": "Moran Point Grand Canyon",
          "mapLat": 36.0134,
          "mapLon": -111.8455,
          "detailPlace": "Moran Point"
        },
        {
          "time": "15:15",
          "kind": "recommended",
          "icon": "📍",
          "title": "Navajo Point",
          "note": "È il viewpoint più alto del South Rim e offre già una splendida vista della Desert View Watchtower.",
          "mapsQuery": "Navajo Point Grand Canyon",
          "mapLat": 36.0407,
          "mapLon": -111.8262,
          "detailPlace": "Navajo Point"
        },
        {
          "time": "15:40",
          "kind": "recommended",
          "icon": "🗼",
          "title": "Desert View Watchtower",
          "note": "Ultima grande tappa del Grand Canyon: breve passeggiata dal parcheggio, vista sul grande gomito del Colorado e sulla Watchtower.",
          "mapsQuery": "Desert View Watchtower",
          "mapLat": 36.044,
          "mapLon": -111.826,
          "detailPlace": "Desert View Watchtower"
        },
        {
          "time": "16:30 circa",
          "kind": "recommended",
          "icon": "🚗",
          "title": "Partenza per Page",
          "note": "Uscita dall'East Entrance e proseguimento verso Page. Lipan Point non è inserito: il NPS ne prevede la chiusura fino al 23 dicembre 2026.",
          "mapsQuery": "Lake Powell Resort Page Arizona"
        },
        {
          "time": "19:00 circa",
          "kind": "recommended",
          "icon": "🏨",
          "title": "Arrivo al Lake Powell Resort",
          "note": "Check-in e qualche minuto per sistemarsi dopo la lunga giornata di guida e viewpoint.",
          "mapsQuery": "Lake Powell Resort 100 Lakeshore Dr Page AZ"
        },
        {
          "time": "20:00",
          "kind": "recommended",
          "icon": "🍽️",
          "title": "Rainbow Room · Lake Powell Resort",
          "note": "Cena direttamente nel resort, senza riprendere l'auto. È la scelta più comoda dopo il Grand Canyon, con grandi vetrate affacciate su Wahweap Bay.",
          "mapsQuery": "Rainbow Room 100 Lakeshore Dr Page AZ 86040",
          "mapLat": 37.0066,
          "mapLon": -111.4864,
          "detailRestaurant": "Rainbow Room"
        },
        {
          "time": "07:00 · domani",
          "kind": "recommended",
          "icon": "⏰",
          "title": "Sveglia consigliata per il 29 ottobre",
          "note": "Domani partenza dal Lake Powell Resort alle 08:15 per Horseshoe Bend e Lower Antelope Canyon. Sveglia alle 07:00: circa 1h15 per prepararci; colazione rapida lungo il percorso."
        }
      ]
    },
    {
      "date": "2026-10-29",
      "title": "Horseshoe Bend e Antelope Canyon",
      "theme": "Mattina a Page, poi ritorno verso Las Vegas",
      "items": [
        {
          "time": "08:15",
          "kind": "recommended",
          "icon": "🚗",
          "title": "Partenza dal Lake Powell Resort",
          "note": "Partenza con calma verso Horseshoe Bend: dal resort considerate circa 25 minuti di auto.",
          "mapsQuery": "Horseshoe Bend Parking Lot Page Arizona"
        },
        {
          "time": "08:40",
          "kind": "recommended",
          "icon": "🅿️",
          "title": "Parcheggio Horseshoe Bend",
          "note": "Parcheggio, poi sentiero di circa 1,2 km per raggiungere il viewpoint.",
          "mapsQuery": "Horseshoe Bend Parking Lot Page Arizona",
          "mapLat": 36.8762,
          "mapLon": -111.5027,
          "mapSkip": true
        },
        {
          "time": "08:50–10:25",
          "kind": "recommended",
          "icon": "🐎",
          "title": "Horseshoe Bend",
          "note": "Tempo comodo per andata e ritorno a piedi, panorama e foto senza correre.",
          "mapsQuery": "Horseshoe Bend Page Arizona",
          "mapLat": 36.8792,
          "mapLon": -111.5104,
          "detailPlace": "Horseshoe Bend"
        },
        {
          "time": "10:35",
          "kind": "recommended",
          "icon": "🚗",
          "title": "Partenza per Ken's Tours",
          "note": "Da Horseshoe Bend a Ken's Tours il trasferimento è breve; teniamo comunque un buon margine prima del check-in.",
          "mapsQuery": "Ken's Tours Lower Antelope Canyon",
          "mapSkip": true
        },
        {
          "time": "10:55 circa",
          "kind": "booked",
          "icon": "🅿️",
          "title": "Parcheggio Ken's Tours",
          "note": "Arrivo con largo margine. Il check-in ufficiale è 30 minuti prima del tour.",
          "mapsQuery": "Ken's Tours Lower Antelope Canyon",
          "mapLat": 36.9026,
          "mapLon": -111.4112,
          "mapForce": true
        },
        {
          "time": "11:30",
          "kind": "booked",
          "icon": "✅",
          "title": "Check-in Lower Antelope Canyon",
          "note": "Check-in alle finestre sul lato nord dell'edificio Ken's Tours. Alle 11:50 bisogna essere già pronti per la partenza."
        },
        {
          "time": "12:00–13:00 circa",
          "kind": "booked",
          "icon": "✨",
          "title": "Lower Antelope Canyon",
          "note": "Tour prenotato. Il General Tour dura normalmente circa 50–60 minuti.",
          "mapsQuery": "Ken's Tours Lower Antelope Canyon",
          "mapSkip": true,
          "detailPlace": "Lower Antelope Canyon"
        },
        {
          "time": "13:15",
          "kind": "recommended",
          "icon": "🍗",
          "title": "BirdHouse",
          "note": "Pranzo veloce a Page dopo il canyon: fried chicken, informale e con prezzi più contenuti. Non perdiamo troppo tempo prima della lunga tratta per Las Vegas.",
          "mapsQuery": "BirdHouse 707 N Navajo Dr Page AZ",
          "mapLat": 36.922,
          "mapLon": -111.459,
          "detailRestaurant": "BirdHouse"
        },
        {
          "time": "13:50 circa",
          "kind": "recommended",
          "icon": "🚗",
          "title": "Partenza per Las Vegas",
          "note": "Page → Las Vegas. Il 29 ottobre Arizona e Nevada hanno lo stesso orario, quindi non ci sono cambi d'ora da calcolare.",
          "mapsQuery": "Paris Las Vegas",
          "mapSkip": true
        },
        {
          "time": "18:15–18:30",
          "kind": "recommended",
          "icon": "🏨",
          "title": "Arrivo al Paris Las Vegas",
          "note": "Arrivo realistico da Page includendo margine sulla strada, parcheggio e check-in. Dopo il lungo road trip lasciate l’auto ferma per tutta la serata.",
          "mapsQuery": "Paris Las Vegas 3655 Las Vegas Blvd S",
          "mapLat": 36.1125,
          "mapLon": -115.1707,
          "mapForce": true
        },
        {
          "time": "18:55",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Paris → High Roller",
          "note": "🚶 A piedi consigliato · circa 0,9 km · 11–15 min. Potete passare attraverso Horseshoe/Flamingo e LINQ Promenade senza riprendere l’auto.",
          "mapsQuery": "High Roller Las Vegas"
        },
        {
          "time": "19:15–20:15 circa",
          "kind": "recommended",
          "icon": "🎡",
          "title": "High Roller",
          "note": "Il giro dura circa 30 minuti, ma teniamo quasi un’ora complessiva per ingresso, controlli, eventuale coda e imbarco. Se il rientro da Page slitta o siete stanchi, resta la prima cosa da sacrificare.",
          "mapsQuery": "High Roller Las Vegas",
          "mapLat": 36.1176,
          "mapLon": -115.1681,
          "detailPlace": "High Roller"
        },
        {
          "time": "20:15",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · High Roller → Cosmopolitan",
          "note": "🚶 A piedi · circa 1,4 km · 17–20 min lungo la Strip. È più semplice che recuperare l’auto per spostarla di un solo miglio.",
          "mapsQuery": "The Cosmopolitan of Las Vegas 3708 Las Vegas Blvd S"
        },
        {
          "time": "20:40 circa",
          "kind": "recommended",
          "icon": "🍕",
          "title": "Secret Pizza · Cosmopolitan",
          "note": "Cena volutamente semplice ed economica dopo il road trip. Si trova al terzo piano del Cosmopolitan ed è adatta anche a una cena più tarda del solito.",
          "mapsQuery": "Secret Pizza Cosmopolitan Las Vegas",
          "mapLat": 36.1096,
          "mapLon": -115.174,
          "detailRestaurant": "Secret Pizza"
        },
        {
          "time": "Dopo cena",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Rientro · Cosmopolitan → Paris Las Vegas",
          "note": "🚶 A piedi · circa 600–800 m · 8–12 min. Se avete ancora energia potete trasformare il rientro in una passeggiata libera sulla Strip.",
          "mapsQuery": "Paris Las Vegas"
        },
        {
          "time": "Dopo cena",
          "kind": "optional",
          "icon": "🌙",
          "title": "Serata libera a Las Vegas",
          "note": "Casinò, drink oppure rientro in camera. Nessun’altra attrazione obbligatoria: domani volo mattutino per Chicago."
        }
      ]
    }
  ],
  "vegas2": [
    {
      "date": "2026-10-29",
      "title": "Page → Las Vegas",
      "theme": "Rientro a Las Vegas e serata volutamente leggera, tutta a piedi dal Paris.",
      "items": [
        {
          "time": "18:15–18:30",
          "kind": "recommended",
          "icon": "🏨",
          "title": "Arrivo al Paris Las Vegas",
          "note": "Arrivo realistico da Page includendo margine sulla strada, parcheggio e check-in. Dopo il lungo road trip lasciate l’auto ferma per tutta la serata.",
          "mapsQuery": "Paris Las Vegas 3655 Las Vegas Blvd S",
          "mapLat": 36.1125,
          "mapLon": -115.1707,
          "mapForce": true
        },
        {
          "time": "18:55",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · Paris → High Roller",
          "note": "🚶 A piedi consigliato · circa 0,9 km · 11–15 min. Potete passare attraverso Horseshoe/Flamingo e LINQ Promenade senza riprendere l’auto.",
          "mapsQuery": "High Roller Las Vegas"
        },
        {
          "time": "19:15–20:15 circa",
          "kind": "recommended",
          "icon": "🎡",
          "title": "High Roller",
          "note": "Il giro dura circa 30 minuti, ma teniamo quasi un’ora complessiva per ingresso, controlli, eventuale coda e imbarco. Se il rientro da Page slitta o siete stanchi, resta la prima cosa da sacrificare.",
          "mapsQuery": "High Roller Las Vegas",
          "mapLat": 36.1176,
          "mapLon": -115.1681,
          "detailPlace": "High Roller"
        },
        {
          "time": "20:15",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Spostamento · High Roller → Cosmopolitan",
          "note": "🚶 A piedi · circa 1,4 km · 17–20 min lungo la Strip. È più semplice che recuperare l’auto per spostarla di un solo miglio.",
          "mapsQuery": "The Cosmopolitan of Las Vegas 3708 Las Vegas Blvd S"
        },
        {
          "time": "20:40 circa",
          "kind": "recommended",
          "icon": "🍕",
          "title": "Secret Pizza · Cosmopolitan",
          "note": "Cena volutamente semplice ed economica dopo il road trip. Si trova al terzo piano del Cosmopolitan ed è adatta anche a una cena più tarda del solito.",
          "mapsQuery": "Secret Pizza Cosmopolitan Las Vegas",
          "mapLat": 36.1096,
          "mapLon": -115.174,
          "detailRestaurant": "Secret Pizza"
        },
        {
          "time": "Dopo cena",
          "kind": "transfer",
          "icon": "🚶",
          "title": "Rientro · Cosmopolitan → Paris Las Vegas",
          "note": "🚶 A piedi · circa 600–800 m · 8–12 min. Se avete ancora energia potete trasformare il rientro in una passeggiata libera sulla Strip.",
          "mapsQuery": "Paris Las Vegas"
        },
        {
          "time": "Dopo cena",
          "kind": "optional",
          "icon": "🌙",
          "title": "Serata libera a Las Vegas",
          "note": "Casinò, drink oppure rientro in camera. Nessun’altra attrazione obbligatoria: domani volo mattutino per Chicago."
        },
        {
          "time": "05:15 · domani",
          "kind": "recommended",
          "icon": "⏰",
          "title": "Sveglia consigliata per il 30 ottobre",
          "note": "Domani volo LAS → ORD alle 09:58. Puntiamo a lasciare il Paris verso le 06:30, riconsegnare il SUV e arrivare in aeroporto con margine. Sveglia alle 05:15; colazione in aeroporto."
        }
      ]
    }
  ],
  chicago: [
    { date:"2026-10-30", title:"Las Vegas → Chicago", theme:"Arrivo, primo assaggio della Magnificent Mile e architettura sul fiume, senza appesantire la giornata di viaggio.", items:[
      { time:"05:15", kind:"recommended", icon:"⏰", title:"Sveglia al Paris Las Vegas", note:"Ultime cose e check-out. Colazione direttamente in aeroporto." },
      { time:"06:30 circa", kind:"transfer", icon:"🚗", title:"Spostamento · Paris → LAS · riconsegna SUV", note:"🚗 In auto fino al Rental Car Center · circa 6 km · 10–15 min, poi riconsegna e navetta verso il terminal. Partiamo con margine per sicurezza e colazione.", mapsQuery:"Harry Reid International Airport car rental return" },
      { time:"09:58", kind:"booked", icon:"✈️", title:"Volo LAS → ORD", note:"Las Vegas → Chicago O’Hare · arrivo previsto alle 15:53 ora locale." },
      { time:"15:53", kind:"booked", icon:"🛬", title:"Arrivo a Chicago O’Hare", note:"Ritiro bagagli e uscita dall’aeroporto." },
      { time:"16:30 circa", kind:"transfer", icon:"🚕", title:"Spostamento · ORD → Warwick Allerton", note:"🚕 Uber/taxi consigliato con le valigie · circa 29 km · normalmente 35–50 min, ma il traffico può allungare il tragitto.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" },
      { time:"17:30 circa", kind:"recommended", icon:"🏨", title:"Check-in Warwick Allerton + pausa", note:"Sistemazione in camera e un po’ di riposo prima di uscire." },
      { time:"18:25", kind:"recommended", icon:"🏙️", title:"Magnificent Mile", note:"Prima passeggiata direttamente da Michigan Avenue: siete già nel cuore della Magnificent Mile appena usciti dall’hotel.", mapsQuery:"Magnificent Mile Chicago", detailPlace:"Magnificent Mile" },
      { time:"19:00", kind:"transfer", icon:"🚶", title:"Spostamento · Magnificent Mile → Wrigley Building & Tribune Tower", note:"🚶 A piedi lungo Michigan Avenue · circa 900 m · 12–15 min. È già parte della passeggiata, quindi niente mezzi.", mapsQuery:"Wrigley Building Chicago" },
      { time:"19:15", kind:"recommended", icon:"🏛️", title:"Wrigley Building & Tribune Tower", note:"Due delle architetture più riconoscibili sulla testata del Chicago River. Bastano 20–25 minuti tra foto, facciate e Michigan Avenue Bridge.", mapsQuery:"Wrigley Building Chicago", detailPlace:"Wrigley Building & Tribune Tower" },
      { time:"19:40", kind:"transfer", icon:"🚶", title:"Spostamento · Wrigley Building → Chicago Riverwalk", note:"🚶 A piedi · circa 250 m · 3–5 min: basta scendere verso il livello del fiume dal ponte di Michigan Avenue.", mapsQuery:"Chicago Riverwalk" },
      { time:"19:45", kind:"recommended", icon:"🌉", title:"Chicago Riverwalk", note:"Primo impatto con i grattacieli illuminati lungo il fiume. Passeggiata compatta di circa 30 minuti.", mapsQuery:"Chicago Riverwalk", mapLat:41.8877, mapLon:-87.6263, detailPlace:"Chicago Riverwalk" },
      { time:"20:15", kind:"transfer", icon:"🚶", title:"Spostamento · Riverwalk → The Purple Pig", note:"🚶 A piedi · circa 450 m · 6–8 min tornando su Michigan Avenue.", mapsQuery:"The Purple Pig 444 N Michigan Ave Chicago" },
      { time:"20:30", kind:"recommended", icon:"🍷", title:"The Purple Pig", note:"Prima cena a Chicago: cucina mediterranea e piatti da condividere. Il venerdì resta aperto fino alle 22:00, quindi le 20:30 sono compatibili senza anticipare troppo.", mapsQuery:"The Purple Pig 444 N Michigan Ave Chicago", mapLat:41.8906, mapLon:-87.6243, detailRestaurant:"The Purple Pig" },
      { time:"Dopo cena", kind:"transfer", icon:"🚶", title:"Rientro · The Purple Pig → Warwick Allerton", note:"🚶 A piedi · circa 1 km · 13–15 min lungo Michigan Avenue.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" }
    ]},
    { date:"2026-10-31", title:"Halloween a Chicago 🎃", theme:"Mattina sulla Magnificent Mile, pranzo Chicago-style, riposo e poi Haunted Halsted come evento principale della sera.", special:true, items:[
      { time:"08:20", kind:"transfer", icon:"🚶", title:"Spostamento · Warwick Allerton → Wildberry", note:"🚶 A piedi · circa 450 m · 5–7 min verso Water Tower Place.", mapsQuery:"Wildberry Pancakes and Cafe 196 E Pearson St Chicago" },
      { time:"08:30", kind:"recommended", icon:"🥞", title:"Wildberry Pancakes and Cafe", note:"Colazione americana con calma: pancakes, French toast, Benedict, omelette e skillet.", mapsQuery:"Wildberry Pancakes and Cafe 196 E Pearson St Chicago", detailRestaurant:"Wildberry Pancakes and Cafe · Water Tower" },
      { time:"09:40", kind:"transfer", icon:"🚶", title:"Spostamento · Wildberry → Chicago Water Tower", note:"🚶 A piedi · circa 250 m · 3–4 min.", mapsQuery:"Chicago Water Tower" },
      { time:"09:50", kind:"recommended", icon:"🏛️", title:"Chicago Water Tower", note:"Tappa breve all’esterno: uno dei simboli storici di Michigan Avenue e uno dei pochi edifici pubblici dell’area sopravvissuti al Grande Incendio del 1871.", mapsQuery:"Chicago Water Tower", detailPlace:"Chicago Water Tower" },
      { time:"10:05", kind:"transfer", icon:"🚶", title:"Spostamento · Water Tower → Starbucks Reserve Roastery", note:"🚶 A piedi verso sud su Michigan Avenue · circa 600 m · 8–10 min.", mapsQuery:"Starbucks Reserve Roastery Chicago 646 N Michigan Ave" },
      { time:"10:15", kind:"recommended", icon:"☕", title:"Starbucks Reserve Roastery", note:"Visita alla grande Roastery su più piani. Non è una seconda colazione: 35–45 minuti sono sufficienti per curiosare.", mapsQuery:"Starbucks Reserve Roastery Chicago 646 N Michigan Ave", detailPlace:"Starbucks Reserve Roastery" },
      { time:"11:00", kind:"transfer", icon:"🚶", title:"Spostamento · Roastery → Warwick / River North", note:"🚶 Circa 350 m · 5 min fino all’hotel. Da qui tempo libero per negozi, due passi o riposo.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" },
      { time:"11:10–13:05", kind:"optional", icon:"🛍️", title:"Tempo libero · River North / hotel", note:"Nessun’altra attrazione obbligatoria prima di pranzo: conserviamo energie per Halloween." },
      { time:"13:10", kind:"transfer", icon:"🚶", title:"Spostamento · Warwick → Portillo's", note:"🚶 A piedi · circa 1,2 km · 15–18 min. Se fa freddo o piove, Uber/Lyft richiede pochi minuti.", mapsQuery:"Portillo's 100 W Ontario St Chicago" },
      { time:"13:30", kind:"recommended", icon:"🌭", title:"Portillo's · River North", note:"Pranzo Chicago-style: hot dog oppure Italian beef, senza anticipare troppo l’orario del pranzo.", mapsQuery:"Portillo's 100 W Ontario St Chicago", mapLat:41.8930, mapLon:-87.6312, detailRestaurant:"Portillo's · River North" },
      { time:"14:30", kind:"transfer", icon:"🚶", title:"Spostamento · Portillo's → Warwick Allerton", note:"🚶 A piedi · circa 1,2 km · 15–18 min. Rientro per riposo e cambio prima della serata.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" },
      { time:"16:45", kind:"transfer", icon:"🚇", title:"Spostamento · Warwick → Northalsted / Belmont", note:"🚇 CTA Red Line consigliata: circa 10 min a piedi fino alla stazione Chicago, ~10 min di treno fino a Belmont e 8–10 min a piedi verso Halsted. Totale realistico ~30–35 min. Le strade di Halsted sono chiuse al traffico per l’evento.", mapsQuery:"Halsted St and Belmont Ave Chicago" },
      { time:"18:20 circa", kind:"recommended", icon:"🎃", title:"Arrivo a Northalsted · posizione per la parata", note:"La strada viene liberata alle 18:00 per preparare la parata. Arrivando con questo margine avete tempo per trovare posto dietro le transenne e vivere l’atmosfera senza correre.", mapsQuery:"Halsted St and Belmont Ave Chicago" },
      { time:"19:00–20:00", kind:"booked", icon:"🎃", title:"Haunted Halsted Halloween Parade", note:"Parata ufficiale 2026: partenza alle 19:00 da Halsted & Belmont e arrivo verso Brompton alle 20:00. Per gli spettatori è gratuita.", mapsQuery:"Halsted St and Belmont Ave Chicago", mapLat:41.9395, mapLon:-87.6491, detailPlace:"Haunted Halsted Halloween Parade" },
      { time:"20:05", kind:"transfer", icon:"🚶", title:"Spostamento · fine parata → Drew's on Halsted", note:"🚶 A piedi · pochi minuti: il ristorante è al 3201 N Halsted, praticamente accanto alla zona di partenza/evento.", mapsQuery:"Drew's on Halsted 3201 N Halsted St Chicago" },
      { time:"20:30", kind:"recommended", icon:"🍔", title:"Drew's on Halsted", note:"Cena direttamente in zona dopo la parata. Il sabato chiude alle 22:00: 20:30 lascia un margine ragionevole senza costringervi a cenare alle 19.", mapsQuery:"Drew's on Halsted 3201 N Halsted St Chicago", mapLat:41.9401, mapLon:-87.6492, detailRestaurant:"Drew's on Halsted" },
      { time:"Dopo cena", kind:"transfer", icon:"🚕", title:"Rientro · Northalsted → Warwick Allerton", note:"🚕 Uber/Lyft consigliato · circa 6 km · 15–25 min. Più semplice della CTA a fine serata.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" }
    ]},
    { date:"2026-11-01", title:"Chicago dal fiume e Navy Pier", theme:"Architecture River Cruise, deep-dish e tramonto sul Lake Michigan; stanotte avete anche recuperato un’ora con il ritorno all’ora solare.", items:[
      { time:"10:00", kind:"transfer", icon:"🚶", title:"Spostamento · Warwick Allerton → First Lady Dock", note:"🚶 A piedi · circa 1,4 km · 18–20 min lungo Michigan Avenue. Nella notte alle 02:00 l’orologio è tornato alle 01:00: avete guadagnato un’ora di sonno.", mapsQuery:"112 E Wacker Dr Chicago" },
      { time:"10:30", kind:"recommended", icon:"⚓", title:"Arrivo al molo Chicago's First Lady", note:"112 E Wacker Dr. Il Chicago Architecture Center chiede di arrivare 30 minuti prima. L’orario delle 11:00 resta indicativo finché non acquistate i biglietti.", mapsQuery:"112 E Wacker Dr Chicago", mapLat:41.8874, mapLon:-87.6246, mapForce:true },
      { time:"11:00 circa", kind:"recommended", icon:"🚢", title:"Architecture River Cruise", note:"Da prenotare. La stagione 2026 arriva fino a novembre e la crociera dura 90 minuti.", mapsQuery:"Chicago Architecture Center River Cruise", mapLat:41.8874, mapLon:-87.6246, detailPlace:"Architecture River Cruise" },
      { time:"12:35", kind:"recommended", icon:"🌉", title:"Chicago Riverwalk", note:"Dopo lo sbarco restate sul fiume per una passeggiata di circa 30 minuti, senza duplicare troppo la sera dell’arrivo.", mapsQuery:"Chicago Riverwalk", mapLat:41.8877, mapLon:-87.6263, detailPlace:"Chicago Riverwalk" },
      { time:"13:05", kind:"transfer", icon:"🚶", title:"Spostamento · Riverwalk → Lou Malnati's", note:"🚶 A piedi · circa 1,2 km · 15–18 min verso River North.", mapsQuery:"Lou Malnati's 439 N Wells St Chicago" },
      { time:"13:30", kind:"recommended", icon:"🍕", title:"Lou Malnati's · River North", note:"Pranzo con deep-dish. Ordinate appena seduti: la cottura richiede più tempo di una pizza normale.", mapsQuery:"Lou Malnati's 439 N Wells St Chicago", mapLat:41.8903, mapLon:-87.6341, detailRestaurant:"Lou Malnati's · River North" },
      { time:"14:50", kind:"transfer", icon:"🚕", title:"Spostamento · Lou Malnati's → Navy Pier", note:"🚕 Uber/Lyft consigliato · circa 3 km · 10–15 min. È più efficiente del bus per non perdere il pomeriggio sul lago.", mapsQuery:"Navy Pier Chicago" },
      { time:"15:15", kind:"recommended", icon:"🎡", title:"Navy Pier · fino al tramonto", note:"Passeggiata sul Lake Michigan e skyline. Restate almeno fino al tramonto, previsto intorno alle 16:44, e qualche minuto dopo per le luci della città.", mapsQuery:"Navy Pier Chicago", mapLat:41.8917, mapLon:-87.6078, detailPlace:"Navy Pier" },
      { time:"17:10", kind:"transfer", icon:"🚌", title:"Spostamento · Navy Pier → Warwick Allerton", note:"🚌 CTA 66 consigliato da Navy Pier verso Chicago Avenue; scendete in zona Chicago & Michigan e completate gli ultimi minuti a piedi. Considerate circa 20–25 min complessivi, attesa inclusa.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" },
      { time:"20:15", kind:"transfer", icon:"🚶", title:"Spostamento · Warwick → Quartino", note:"🚶 A piedi · circa 900 m · 12–15 min verso State Street.", mapsQuery:"Quartino Ristorante 626 N State St Chicago" },
      { time:"20:30", kind:"recommended", icon:"🍝", title:"Quartino Ristorante", note:"Cena a River North con pasta, pizza e piccoli piatti da condividere. La domenica resta aperto fino a tardi, quindi nessuna corsa per una chiusura alle 21.", mapsQuery:"Quartino Ristorante 626 N State St Chicago", mapLat:41.8935, mapLon:-87.6284, detailRestaurant:"Quartino Ristorante" },
      { time:"Dopo cena", kind:"transfer", icon:"🚶", title:"Rientro · Quartino → Warwick Allerton", note:"🚶 A piedi · circa 900 m · 12–15 min.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" }
    ]},
    { date:"2026-11-02", title:"Millennium Park, Art Institute e Chicago al tramonto", theme:"Ultima giornata piena: il Loop al mattino, pranzo vero dopo il museo e 360 Chicago scelto apposta per luce, tramonto e skyline notturno.", items:[
      { time:"09:30", kind:"transfer", icon:"🚌", title:"Spostamento · Warwick → Millennium Park", note:"🚌 CTA/bus lungo Michigan Avenue consigliato · circa 2 km · 15–20 min complessivi. Alternativa: 25 min a piedi se il meteo è piacevole.", mapsQuery:"Millennium Park Chicago" },
      { time:"10:00", kind:"recommended", icon:"🌳", title:"Millennium Park", note:"Passeggiata compatta tra il parco, Pritzker Pavilion e gli spazi principali.", mapsQuery:"Millennium Park Chicago", mapLat:41.8826, mapLon:-87.6226, detailPlace:"Millennium Park" },
      { time:"10:20", kind:"transfer", icon:"🚶", title:"Spostamento · Millennium Park → Cloud Gate", note:"🚶 A piedi · circa 300 m · 4–5 min all’interno del parco.", mapsQuery:"Cloud Gate Chicago" },
      { time:"10:25", kind:"recommended", icon:"☁️", title:"Cloud Gate · The Bean", note:"Foto con il simbolo di Chicago prima dell’apertura dell’Art Institute.", mapsQuery:"Cloud Gate Chicago", mapLat:41.8827, mapLon:-87.6233, detailPlace:"Cloud Gate · The Bean" },
      { time:"10:45", kind:"transfer", icon:"🚶", title:"Spostamento · Cloud Gate → Art Institute", note:"🚶 A piedi · circa 600 m · 8–10 min lungo Michigan Avenue.", mapsQuery:"Art Institute of Chicago" },
      { time:"11:00", kind:"recommended", icon:"🎨", title:"Art Institute of Chicago", note:"Ingresso all’apertura pubblica del lunedì. Dedicate circa 2 ore e mezza alle opere principali senza trasformarlo in una maratona.", mapsQuery:"Art Institute of Chicago", mapLat:41.8796, mapLon:-87.6237, detailPlace:"Art Institute of Chicago" },
      { time:"13:35", kind:"transfer", icon:"🚶", title:"Spostamento · Art Institute → The Gage", note:"🚶 A piedi · circa 200 m · 2–3 min: è praticamente dall’altra parte di Michigan Avenue.", mapsQuery:"The Gage 24 S Michigan Ave Chicago" },
      { time:"13:45", kind:"recommended", icon:"🍽️", title:"The Gage", note:"Pranzo vero dopo il museo, senza deviazioni. Il lunedì la cucina è aperta dalle 11 alle 23.", mapsQuery:"The Gage 24 S Michigan Ave Chicago", detailRestaurant:"The Gage" },
      { time:"15:10", kind:"transfer", icon:"🚌", title:"Spostamento · The Gage → 360 Chicago", note:"🚌 CTA/bus verso nord lungo Michigan Avenue · circa 2,5 km · 15–20 min. Arrivate con ampio margine prima del tramonto.", mapsQuery:"360 Chicago Observation Deck" },
      { time:"15:40", kind:"recommended", icon:"🔭", title:"360 Chicago · tramonto e skyline", note:"Salite prima del tramonto, previsto intorno alle 16:43. Restate circa 1h15–1h30 per vedere Chicago con luce diurna, tramonto e prime luci della sera. 360 Chicago è aperto fino alle 23.", mapsQuery:"360 Chicago Observation Deck", mapLat:41.8988, mapLon:-87.6230, detailPlace:"360 Chicago" },
      { time:"17:15", kind:"transfer", icon:"🚶", title:"Spostamento · 360 Chicago → Warwick Allerton", note:"🚶 A piedi · circa 350 m · 4–5 min. Rientro perfetto per una pausa prima della cena finale.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" },
      { time:"20:10", kind:"transfer", icon:"🚕", title:"Spostamento · Warwick → Giordano's Millennium Park", note:"🚕 Uber/Lyft consigliato · circa 2 km · 8–12 min. Alternativa CTA/bus su Michigan Avenue: ~15–20 min.", mapsQuery:"Giordano's 130 E Randolph St Chicago" },
      { time:"20:30", kind:"recommended", icon:"🍕", title:"Giordano's · Millennium Park", note:"Ultima sera: stuffed deep-dish. Il lunedì la sede Millennium Park resta aperta fino alle 23:00, quindi l’orario delle 20:30 è comodo.", mapsQuery:"Giordano's 130 E Randolph St Chicago", mapLat:41.8845, mapLon:-87.6232, detailRestaurant:"Giordano's · Millennium Park" },
      { time:"Dopo cena", kind:"transfer", icon:"🚕", title:"Rientro · Giordano's → Warwick Allerton", note:"🚕 Uber/Lyft · circa 2 km · 8–12 min. Domani sveglia presto per Punta Cana.", mapsQuery:"Warwick Allerton Chicago 701 N Michigan Ave" },
      { time:"05:15 · domani", kind:"recommended", icon:"⏰", title:"Sveglia consigliata per il 3 novembre", note:"Domani volo ORD → PUJ alle 09:17. Partenza dall’hotel anticipata alle 06:00 per avere più margine a O’Hare; sveglia alle 05:15 e colazione in aeroporto." }
    ]},
    { date:"2026-11-03", title:"Partenza per Punta Cana", theme:"Niente visite: aeroporto, con margine più largo rispetto alla versione precedente.", items:[
      { time:"05:15", kind:"recommended", icon:"⏰", title:"Sveglia e ultime cose", note:"Controllo finale della camera e preparazione per il check-out. Colazione direttamente in aeroporto." },
      { time:"05:50", kind:"recommended", icon:"🧳", title:"Check-out Warwick Allerton", note:"Check-out e bagagli pronti senza tirare i tempi." },
      { time:"06:00", kind:"transfer", icon:"🚕", title:"Spostamento · Warwick Allerton → Chicago O'Hare", note:"🚕 Taxi/rideshare consigliato · circa 29 km · normalmente 35–50 min. L’obiettivo è arrivare verso le 06:45–06:55, oltre 2 ore prima del volo.", mapsQuery:"Chicago O'Hare International Airport Terminal 1", mapLat:41.9742, mapLon:-87.9073, mapForce:true },
      { time:"06:45–06:55 circa", kind:"recommended", icon:"🛫", title:"Arrivo a ORD · Terminal 1", note:"Bagagli, sicurezza e gate United con circa 2h20 di margine prima del decollo.", mapsQuery:"O'Hare International Airport Terminal 1", mapLat:41.9773, mapLon:-87.9048, mapForce:true },
      { time:"09:17", kind:"booked", icon:"✈️", title:"Volo ORD → PUJ", note:"United UA1862 · arrivo previsto alle 15:57 ora locale." },
      { time:"15:57", kind:"booked", icon:"🇩🇴", title:"Arrivo a Punta Cana · PUJ", note:"Immigrazione, ritiro bagagli e incontro con il trasferimento per Bayahibe. Nessun punto sulla mini-mappa per la parte dominicana, come deciso." },
      { time:"17:10–17:25 circa", kind:"recommended", icon:"🚐", title:"Trasferimento PUJ → Bayahibe", note:"Dal Punta Cana International Airport al Viva Dominicus Palace considerate circa 50–60 minuti di strada, più l’uscita dall’aeroporto." },
      { time:"18:10–18:40 circa", kind:"recommended", icon:"🏝️", title:"Arrivo al Viva Dominicus Palace", note:"Check-in, sistemazione e finalmente inizio della parte relax del viaggio." },
      { time:"20:30", kind:"recommended", icon:"🍽️", title:"Cena al resort", note:"Prima sera senza programmi: cena all inclusive e riposo dopo il trasferimento da Chicago." }
    ]}
  ],
  "bayahibe": [
    {
      "date": "2026-11-04",
      "title": "Caraibi senza orologio",
      "theme": "Da oggi comincia davvero il relax: mare, piscina e resort, con Saona, Catalina, Bayahibe e Cotubanamá sempre disponibili se ci viene voglia di partire all'avventura.",
      "items": [
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🚤",
          "title": "Isola Saona",
          "note": "La nostra escursione principale consigliata: giornata in barca, spiagge e piscine naturali. Da prenotare direttamente in villaggio scegliendo il giorno con meteo migliore.",
          "mapsQuery": "Saona Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🤿",
          "title": "Catalina Island · snorkeling",
          "note": "Alternativa a Saona per una giornata più orientata a mare e snorkeling. Valutatela direttamente al resort.",
          "mapsQuery": "Catalina Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🌿",
          "title": "Parco Cotubanamá",
          "note": "Opzione naturalistica se volete staccare dal resort: grotte, sentieri e natura protetta nell'area di Bayahibe.",
          "mapsQuery": "Cotubanama National Park Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "⛪",
          "title": "Bayahibe village",
          "note": "Passeggiata semplice nel borgo e sul waterfront, senza trasformarla in una giornata organizzata.",
          "mapsQuery": "Bayahibe Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Sempre valida",
          "kind": "recommended",
          "icon": "🏖️",
          "title": "Resort, mare e piscina",
          "note": "Nessun obbligo di escursione: se quel giorno preferite spiaggia, all inclusive e relax, il programma è già perfetto."
        }
      ]
    },
    {
      "date": "2026-11-05",
      "title": "Mare, relax o escursione",
      "theme": "Nessun programma imposto: scegliamo direttamente dal villaggio tra una giornata di puro relax e una delle escursioni che più ci ispira, anche in base al meteo.",
      "items": [
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🚤",
          "title": "Isola Saona",
          "note": "La nostra escursione principale consigliata: giornata in barca, spiagge e piscine naturali. Da prenotare direttamente in villaggio scegliendo il giorno con meteo migliore.",
          "mapsQuery": "Saona Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🤿",
          "title": "Catalina Island · snorkeling",
          "note": "Alternativa a Saona per una giornata più orientata a mare e snorkeling. Valutatela direttamente al resort.",
          "mapsQuery": "Catalina Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🌿",
          "title": "Parco Cotubanamá",
          "note": "Opzione naturalistica se volete staccare dal resort: grotte, sentieri e natura protetta nell'area di Bayahibe.",
          "mapsQuery": "Cotubanama National Park Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "⛪",
          "title": "Bayahibe village",
          "note": "Passeggiata semplice nel borgo e sul waterfront, senza trasformarla in una giornata organizzata.",
          "mapsQuery": "Bayahibe Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Sempre valida",
          "kind": "recommended",
          "icon": "🏖️",
          "title": "Resort, mare e piscina",
          "note": "Nessun obbligo di escursione: se quel giorno preferite spiaggia, all inclusive e relax, il programma è già perfetto."
        }
      ]
    },
    {
      "date": "2026-11-06",
      "title": "Il lusso di non avere programmi",
      "theme": "Spiaggia e all inclusive possono bastare, ma se abbiamo voglia di esplorare possiamo scegliere Saona, Catalina, Bayahibe o il parco senza aver fissato nulla in anticipo.",
      "items": [
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🚤",
          "title": "Isola Saona",
          "note": "La nostra escursione principale consigliata: giornata in barca, spiagge e piscine naturali. Da prenotare direttamente in villaggio scegliendo il giorno con meteo migliore.",
          "mapsQuery": "Saona Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🤿",
          "title": "Catalina Island · snorkeling",
          "note": "Alternativa a Saona per una giornata più orientata a mare e snorkeling. Valutatela direttamente al resort.",
          "mapsQuery": "Catalina Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🌿",
          "title": "Parco Cotubanamá",
          "note": "Opzione naturalistica se volete staccare dal resort: grotte, sentieri e natura protetta nell'area di Bayahibe.",
          "mapsQuery": "Cotubanama National Park Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "⛪",
          "title": "Bayahibe village",
          "note": "Passeggiata semplice nel borgo e sul waterfront, senza trasformarla in una giornata organizzata.",
          "mapsQuery": "Bayahibe Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Sempre valida",
          "kind": "recommended",
          "icon": "🏖️",
          "title": "Resort, mare e piscina",
          "note": "Nessun obbligo di escursione: se quel giorno preferite spiaggia, all inclusive e relax, il programma è già perfetto."
        }
      ]
    },
    {
      "date": "2026-11-07",
      "title": "Caraibi come ci va",
      "theme": "Una giornata completamente nostra: possiamo non muoverci dal resort oppure trasformarla all'ultimo momento in una giornata di mare, snorkeling o scoperta della zona.",
      "items": [
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🚤",
          "title": "Isola Saona",
          "note": "La nostra escursione principale consigliata: giornata in barca, spiagge e piscine naturali. Da prenotare direttamente in villaggio scegliendo il giorno con meteo migliore.",
          "mapsQuery": "Saona Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🤿",
          "title": "Catalina Island · snorkeling",
          "note": "Alternativa a Saona per una giornata più orientata a mare e snorkeling. Valutatela direttamente al resort.",
          "mapsQuery": "Catalina Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🌿",
          "title": "Parco Cotubanamá",
          "note": "Opzione naturalistica se volete staccare dal resort: grotte, sentieri e natura protetta nell'area di Bayahibe.",
          "mapsQuery": "Cotubanama National Park Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "⛪",
          "title": "Bayahibe village",
          "note": "Passeggiata semplice nel borgo e sul waterfront, senza trasformarla in una giornata organizzata.",
          "mapsQuery": "Bayahibe Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Sempre valida",
          "kind": "recommended",
          "icon": "🏖️",
          "title": "Resort, mare e piscina",
          "note": "Nessun obbligo di escursione: se quel giorno preferite spiaggia, all inclusive e relax, il programma è già perfetto."
        }
      ]
    },
    {
      "date": "2026-11-08",
      "title": "Ultimo giorno pieno ai Caraibi",
      "theme": "Ci godiamo l'ultima giornata completa senza obblighi: relax fino all'ultimo oppure un'escursione scelta sul momento, sapendo che domani si riparte verso casa.",
      "items": [
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🚤",
          "title": "Isola Saona",
          "note": "La nostra escursione principale consigliata: giornata in barca, spiagge e piscine naturali. Da prenotare direttamente in villaggio scegliendo il giorno con meteo migliore.",
          "mapsQuery": "Saona Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🤿",
          "title": "Catalina Island · snorkeling",
          "note": "Alternativa a Saona per una giornata più orientata a mare e snorkeling. Valutatela direttamente al resort.",
          "mapsQuery": "Catalina Island Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "🌿",
          "title": "Parco Cotubanamá",
          "note": "Opzione naturalistica se volete staccare dal resort: grotte, sentieri e natura protetta nell'area di Bayahibe.",
          "mapsQuery": "Cotubanama National Park Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Quando volete",
          "kind": "optional",
          "icon": "⛪",
          "title": "Bayahibe village",
          "note": "Passeggiata semplice nel borgo e sul waterfront, senza trasformarla in una giornata organizzata.",
          "mapsQuery": "Bayahibe Dominican Republic",
          "mapSkip": true
        },
        {
          "time": "Sempre valida",
          "kind": "recommended",
          "icon": "🏖️",
          "title": "Resort, mare e piscina",
          "note": "Nessun obbligo di escursione: se quel giorno preferite spiaggia, all inclusive e relax, il programma è già perfetto."
        }
      ]
    },
    {
      "date": "2026-11-09",
      "title": "Rientro",
      "theme": "Punta Cana → Washington → Roma",
      "items": [
        {
          "time": "07:00",
          "kind": "recommended",
          "icon": "⏰",
          "title": "Sveglia e colazione",
          "note": "Ultimo giorno: niente escursioni. Colazione, doccia e controllo bagagli/documenti senza fretta."
        },
        {
          "time": "08:00",
          "kind": "recommended",
          "icon": "🧳",
          "title": "Check-out e bagagli pronti",
          "note": "Tenete passaporti, telefoni, power bank e documenti di viaggio nel bagaglio a mano."
        },
        {
          "time": "08:15",
          "kind": "recommended",
          "icon": "🚐",
          "title": "Partenza dal Viva Dominicus Palace",
          "note": "Per il volo delle 12:56 da PUJ preferisco un margine largo: Bayahibe → Punta Cana Airport richiede normalmente circa 50–60 minuti."
        },
        {
          "time": "09:15 circa",
          "kind": "recommended",
          "icon": "🛫",
          "title": "Arrivo a Punta Cana · PUJ",
          "note": "Circa 3 ore e 40 minuti prima del decollo: check-in, bagagli, controlli di uscita e gate senza rischiare l'intero rientro."
        },
        {
          "time": "12:56",
          "kind": "booked",
          "icon": "✈️",
          "title": "Volo PUJ → IAD",
          "note": "United · arrivo previsto a Washington Dulles alle 15:55."
        },
        {
          "time": "15:55",
          "kind": "booked",
          "icon": "🇺🇸",
          "title": "Arrivo a Washington Dulles · IAD",
          "note": "Scalo: 2 ore e 05 minuti. Essendo il primo ingresso negli USA, bisogna seguire subito immigrazione/CBP e le indicazioni per la coincidenza. Niente soste inutili."
        },
        {
          "time": "18:00",
          "kind": "booked",
          "icon": "✈️",
          "title": "Volo IAD → FCO",
          "note": "Coincidenza per Roma. Arrivo a Fiumicino il 10 novembre alle 08:30."
        },
        {
          "time": "08:30 · 10 nov",
          "kind": "booked",
          "icon": "🇮🇹",
          "title": "Arrivo a Roma Fiumicino",
          "note": "Fine del viaggio di nozze ❤️"
        }
      ]
    }
  ]
};

// Approfondimenti sintetici per la schermata "Da vedere".
// Le immagini vengono recuperate da Wikipedia/Wikimedia quando c'è connessione;
// l'immagine della città resta come fallback e la risposta viene poi conservata dalla cache della PWA.
const PLACE_DETAILS = {
  "Caesars Palace & Forum Shops": {
    image: "./assets/caesars-palace-las-vegas.jpg",
    text: "Aperto nel 1966, Caesars Palace è uno dei resort più iconici della Las Vegas Strip. Il complesso richiama l’antica Roma con colonne, statue, fontane e grandi spazi scenografici. Durante la tappa del 27 ottobre faremo una passeggiata negli interni e nei Forum Shops, il centro commerciale collegato al resort con oltre 160 negozi e ristoranti, senza trasformare la visita in una lunga sessione di shopping."
  },
  "High Roller": {
    image: "./assets/high-roller-las-vegas.jpg",
    text: "La High Roller è la grande ruota panoramica del LINQ Promenade, nel cuore della Strip. Sale fino a circa 550 piedi (168 metri) e completa un giro in circa 30 minuti all'interno di cabine panoramiche chiuse. L'abbiamo inserita la sera del 29 ottobre: è vicina al Paris e permette di vedere Las Vegas illuminata dall'alto senza impegnare troppo la serata.",
    price: "Indicativamente da $39 a persona per il biglietto Anytime serale (circa $78 in due), prima di tasse/commissioni e di eventuale peak pricing.",
    officialUrl: "https://www.ticketmaster.com/High-Roller-Wheel-at-the-Linq-tickets/artist/2333410",
    officialLabel: "🎟️ Biglietti ufficiali"
  },
  "Art Institute of Chicago": { image: "./assets/places/art-institute-chicago.webp", text: "Uno dei grandi musei d'arte degli Stati Uniti, sulla Michigan Avenue accanto a Grant Park. Il lunedì l'apertura al pubblico è alle 11:00; nel vostro programma lo trattiamo come visita di circa due ore e mezza, concentrandovi sulle opere e sezioni che vi interessano davvero." },

  "Wrigley Building & Tribune Tower": {
    text: "Il Wrigley Building e la Tribune Tower si fronteggiano all’imbocco settentrionale del Michigan Avenue Bridge e formano uno degli scorci architettonici più riconoscibili di Chicago. Il Wrigley Building, completato negli anni Venti, è noto per la facciata bianca in terracotta e la torre dell’orologio; la neogotica Tribune Tower fu progettata dopo il celebre concorso internazionale del 1922. Nel vostro itinerario sono una tappa breve e naturale tra Magnificent Mile e Riverwalk."
  },
  "Chicago Water Tower": {
    image: "./assets/places/chicago-water-tower.jpg",
    text: "La Chicago Water Tower, all'incrocio tra Michigan Avenue e Chicago Avenue, è uno dei simboli storici della città. Costruita in stile neogotico, insieme alla vicina Pumping Station fu tra i pochissimi edifici pubblici dell'area a sopravvivere al Grande Incendio del 1871. Nel vostro itinerario è una tappa breve e perfetta tra Wildberry e la Roastery: basta vederla dall'esterno e fare qualche foto."
  },
  "Starbucks Reserve Roastery": {
    image: "./assets/places/starbucks-reserve-roastery-chicago.jpg",
    text: "La Starbucks Reserve Roastery di Chicago si trova al 646 N Michigan Avenue, sulla Magnificent Mile. Aperta nel 2019, occupa cinque piani dedicati alla torrefazione, ai caffè Reserve, al cibo e ai cocktail. Nel vostro programma non la trattiamo come una seconda colazione: 30–45 minuti sono sufficienti per vedere gli interni, la grande attrezzatura di torrefazione e curiosare tra i vari piani.",
    officialUrl: "https://www.starbucksreserve.com/locations/chicago-roastery",
    officialLabel: "☕ Sito ufficiale"
  },

  "Millennium Park": { image: "./assets/places/millennium-park.webp", text: "Millennium Park è il cuore contemporaneo del Loop, tra Michigan Avenue e il lago. Oltre a Cloud Gate ospita il Jay Pritzker Pavilion di Frank Gehry, Crown Fountain e Lurie Garden. Nel vostro itinerario del 2 novembre è una passeggiata compatta prima dell’Art Institute: tutto è concentrato nella stessa area." },
  "Cloud Gate · The Bean": { image: "./assets/places/cloud-gate.webp", text: "Cloud Gate, soprannominata The Bean, è la grande scultura in acciaio lucidato di Anish Kapoor nel Millennium Park. La superficie riflette e deforma lo skyline di Chicago; si può camminare tutto intorno e sotto l'arco centrale." },
  "Navy Pier": { image: "./assets/places/navy-pier.webp", text: "Navy Pier si protende nel Lake Michigan a Streeterville. È soprattutto una passeggiata sul lago con vista sullo skyline, ruota panoramica, locali e spazi interni: lo inseriamo nel pomeriggio del 1 novembre senza trasformarlo in una visita obbligatoriamente lunga." },
  "Grant Park & Buckingham Fountain": { image: "./assets/places/buckingham-fountain.webp", text: "Grant Park è il grande spazio verde sul lakefront a sud di Millennium Park. Al centro si trova Buckingham Fountain, una delle fontane monumentali più note della città. A inizio novembre la fontana può non essere in funzione, ma resta un ottimo punto panoramico verso skyline e lago." },
  "360 Chicago": { image: "./assets/places/360-chicago.webp", text: "360 Chicago occupa il 94° piano dell'ex John Hancock Center, al 875 N Michigan Avenue. Per voi è particolarmente comodo perché si trova a pochi minuti a piedi dal Warwick Allerton: lo teniamo come vista dall'alto nel pomeriggio del 2 novembre." },

  "Pipe Creek Vista": { image: "./assets/places/pipe-creek-vista.webp", text: "Primo belvedere sviluppato sulla Desert View Drive procedendo verso est. È una sosta breve, comoda direttamente in auto, con il canyon incorniciato tra Mather Point e Yaki Point. Può essere più affollato degli overlook successivi perché è il primo pullout panoramico dopo il bivio." },
  "Grandview Point": { image: "./assets/places/grandview-point.webp", text: "Uno dei viewpoint più ampi del South Rim: la vista si apre da est a ovest e permette di intravedere diverse anse del Colorado River. Per il vostro programma è una sosta panoramica, non l'inizio del ripido Grandview Trail." },
  "Moran Point": { image: "./assets/places/moran-point.webp", text: "Viewpoint dedicato al pittore Thomas Moran. Qui i diversi gruppi di rocce e le variazioni di colore del canyon sono particolarmente leggibili; è una tappa ideale da 15–20 minuti lungo il percorso verso est." },
  "Navajo Point": { image: "./assets/places/navajo-point.webp", text: "È il viewpoint più alto del South Rim, a 7.461 piedi. Guarda verso la Desert View Watchtower e offre una vista molto ampia verso ovest e a nord lungo il Colorado River. È l'ultima sosta panoramica prima della Watchtower." },

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
  "Getty Center": {
    wikiTitle: "Getty Center",
    text: "Il Getty Center domina Brentwood da una collina e unisce una grande collezione d'arte, l'architettura di Richard Meier, il Central Garden e ampi panorami su Los Angeles. L'ingresso è gratuito; il parcheggio è a pagamento e dal parcheggio si sale al campus con il tram. È uno dei grandi classici della città, ma richiede alcune ore dedicate."
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
    image: "./assets/bellagio-conservatory.jpg",
    text: "Il Conservatory & Botanical Gardens del Bellagio è uno spazio interno che viene completamente ridisegnato più volte l'anno con fiori, piante e grandi installazioni scenografiche. Ogni allestimento segue un tema stagionale e trasforma l'ambiente in una vera scenografia. È una visita breve, gratuita e facile da abbinare alle fontane."
  },
  "Sphere": {
    image: "./assets/sphere-las-vegas.jpg",
    text: "Sphere è la grande struttura sferica a est della Strip, riconoscibile soprattutto per l'Exosphere: l'enorme superficie LED esterna che cambia continuamente immagini e animazioni. Nel vostro itinerario non è previsto uno spettacolo: la tappa del 27 ottobre serve proprio a vederla illuminata dall'esterno, fare foto e video e poi continuare la serata sulla Strip."
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
