// Programma Las Vegas — collegamenti urbani espliciti senza appesantire i giorni road trip.
// Caricato dopo data.js e prima di app.js: aggiorna soltanto vegas1, vegas2 e la parte serale del 29/10.
(function(){
  if (typeof PROGRAM_GUIDE === "undefined") return;

  PROGRAM_GUIDE.vegas1 = [
    { date:"2026-10-27", title:"Los Angeles → Las Vegas", theme:"Las Vegas essenziale: Strip quasi tutta a piedi, poi auto solo per Old Vegas.", items:[
      { time:"08:00", kind:"recommended", icon:"🚗", title:"Partenza da The Commerce Hotel", note:"Check-out e partenza direttamente dall’hotel verso Las Vegas. Con una pausa, considerate circa 4½–5 ore.", mapsQuery:"Welcome to Fabulous Las Vegas Sign" },
      { time:"13:00 circa", kind:"recommended", icon:"📸", title:"Welcome to Fabulous Las Vegas Sign", note:"Prima tappa entrando a Las Vegas da sud: foto al cartello prima di raggiungere l’hotel.", mapsQuery:"Welcome to Fabulous Las Vegas Sign", detailPlace:"Welcome to Fabulous Las Vegas Sign" },
      { time:"13:20", kind:"transfer", icon:"🚗", title:"Spostamento · Welcome Sign → Paris Las Vegas", note:"🚗 In auto · circa 3–4 km · 10–15 min considerando traffico sulla Strip e ingresso al parcheggio del Paris.", mapsQuery:"Paris Las Vegas 3655 Las Vegas Blvd S Las Vegas NV 89109" },
      { time:"13:40–14:00", kind:"recommended", icon:"🏨", title:"Paris Las Vegas · check-in", note:"Parcheggio, bagagli e check-in se la camera è disponibile. Da questo momento lasciate l’auto ferma: il centro della Strip si gira meglio a piedi.", mapsQuery:"Paris Las Vegas" },
      { time:"14:40", kind:"transfer", icon:"🚶", title:"Spostamento · Paris → Bellagio", note:"🚶 A piedi consigliato · circa 0,8–1 km · 10–15 min usando i passaggi pedonali della Strip. Non conviene spostare l’auto per una tratta così breve.", mapsQuery:"Bellagio Conservatory & Botanical Gardens" },
      { time:"15:00", kind:"recommended", icon:"🌿", title:"Bellagio Conservatory", note:"Ingresso gratuito. Dedicate circa 40–45 minuti al Conservatory & Botanical Gardens e a un breve giro nel Bellagio.", mapsQuery:"Bellagio Conservatory & Botanical Gardens", detailPlace:"Bellagio Conservatory" },
      { time:"15:45", kind:"transfer", icon:"🚶", title:"Spostamento · Bellagio → Caesars Palace", note:"🚶 A piedi · circa 650 m · 10–15 min. Si attraversa Flamingo Road con il ponte pedonale sopraelevato.", mapsQuery:"Caesars Palace Forum Shops Las Vegas" },
      { time:"16:00", kind:"recommended", icon:"🏛️", title:"Caesars Palace & Forum Shops", note:"Passeggiata tra gli interni del Caesars Palace e una parte dei Forum Shops. Circa 45–50 minuti sono sufficienti per vedere l’essenziale senza perdersi nei negozi.", mapsQuery:"Caesars Palace Forum Shops", detailPlace:"Caesars Palace & Forum Shops" },
      { time:"16:55", kind:"transfer", icon:"🚶", title:"Spostamento · Caesars Palace → The Venetian", note:"🚶 A piedi consigliato · circa 1 km · 12–18 min. Meglio il lato est della Strip, passando da LINQ e Harrah’s: evita la zona dei lavori dell’ex Mirage.", mapsQuery:"The Venetian Las Vegas" },
      { time:"17:15", kind:"recommended", icon:"🛶", title:"The Venetian & Grand Canal", note:"Interni, canali e Grand Canal Shoppes. Tenete circa 45–50 minuti: basta per vedere la parte scenografica senza fare il giro in gondola.", mapsQuery:"The Venetian Las Vegas", detailPlace:"The Venetian & Grand Canal" },
      { time:"18:05", kind:"transfer", icon:"🚶", title:"Spostamento · Venetian → Sphere", note:"🚶 A piedi · circa 0,9–1 km · 12–17 min. Seguite le indicazioni interne/esterne del Venetian verso Sphere: è troppo vicina per usare l’auto.", mapsQuery:"Sphere Las Vegas" },
      { time:"18:25", kind:"recommended", icon:"🌐", title:"Sphere · esterno", note:"Sosta fotografica quando è ormai buio: Exosphere illuminata, foto e video. Circa 25–30 minuti; nessuno spettacolo a pagamento previsto.", mapsQuery:"Sphere Las Vegas", detailPlace:"Sphere" },
      { time:"18:55", kind:"transfer", icon:"🚶", title:"Spostamento · Sphere → Bellagio", note:"🚶 A piedi consigliato se avete ancora gambe · circa 2,4 km · 25–30 min passando nuovamente verso Venetian/LINQ. Alternativa 🚕 taxi/Uber: circa 5–10 min più l’eventuale attesa.", mapsQuery:"Bellagio Fountains Las Vegas" },
      { time:"19:30", kind:"recommended", icon:"⛲", title:"Fontane del Bellagio + Strip illuminata", note:"Guardate uno spettacolo delle fontane e godetevi la Strip completamente illuminata. In questa fascia serale gli spettacoli sono molto frequenti, quindi non serve inseguire un singolo minuto preciso.", mapsQuery:"Bellagio Fountains", detailPlace:"Fontane del Bellagio" },
      { time:"20:00", kind:"transfer", icon:"🚶", title:"Spostamento · Bellagio → Paris Las Vegas", note:"🚶 A piedi · circa 0,8 km · 10–12 min attraversando Las Vegas Boulevard con i passaggi pedonali. Siete già diretti al ristorante del vostro hotel.", mapsQuery:"Mon Ami Gabi Paris Las Vegas" },
      { time:"20:30", kind:"recommended", icon:"🍷", title:"Mon Ami Gabi · Paris Las Vegas", note:"Cena al vostro orario abituale, direttamente al Paris: bistrot francese con patio sulla Strip e vista verso il Bellagio.", mapsQuery:"Mon Ami Gabi 3655 S Las Vegas Blvd Las Vegas NV 89109", mapLat:36.112855, mapLon:-115.172414, detailRestaurant:"Mon Ami Gabi · Paris Las Vegas" },
      { time:"21:45 circa", kind:"transfer", icon:"🚗", title:"Spostamento · Paris → Fremont Street", note:"🚗 Riprendete l’auto · circa 11 km · 15–20 min. Parcheggio consigliato: Fremont Street Experience Garage, 111 S 4th St. L’ingresso è da 4th Street tra Carson e Fremont.", mapsQuery:"Fremont Street Experience Parking Garage 111 S 4th St Las Vegas NV 89101" },
      { time:"22:10–23:15", kind:"recommended", icon:"🎰", title:"Fremont Street Experience", note:"Old Vegas, casinò storici, neon e Canopy. I contenuti principali del Viva Vision partono all’inizio di ogni ora: arrivando intorno alle 22:10 avete tempo di passeggiare e vedere quello delle 23:00.", mapsQuery:"Fremont Street Experience", detailPlace:"Fremont Street Experience" },
      { time:"23:15 circa", kind:"transfer", icon:"🚗", title:"Rientro · Fremont Street → Paris Las Vegas", note:"🚗 In auto · circa 11 km · 15–20 min. Rientro diretto: domani la partenza per il Grand Canyon è alle 07:00.", mapsQuery:"Paris Las Vegas" },
      { time:"05:45 · domani", kind:"recommended", icon:"⏰", title:"Sveglia consigliata per il 28 ottobre", note:"Domani partenza dal Paris alle 07:00 verso il Grand Canyon. Sveglia alle 05:45: circa 1h15 per prepararci, recuperare l’auto e partire; colazione lungo il tragitto." }
    ]}
  ];

  const vegas29Evening = [
    { time:"18:15–18:30", kind:"recommended", icon:"🏨", title:"Arrivo al Paris Las Vegas", note:"Arrivo realistico da Page includendo margine sulla strada, parcheggio e check-in. Dopo il lungo road trip lasciate l’auto ferma per tutta la serata.", mapsQuery:"Paris Las Vegas 3655 Las Vegas Blvd S", mapLat:36.1125, mapLon:-115.1707, mapForce:true },
    { time:"19:05", kind:"transfer", icon:"🚶", title:"Spostamento · Paris → High Roller", note:"🚶 A piedi consigliato · circa 0,9 km · 11–15 min. Potete passare attraverso Horseshoe/Flamingo e LINQ Promenade senza riprendere l’auto.", mapsQuery:"High Roller Las Vegas" },
    { time:"19:30 circa", kind:"recommended", icon:"🎡", title:"High Roller", note:"Giro panoramico di circa 30 minuti al LINQ con vista a 360° sulla Strip illuminata. Se il rientro da Page slitta o siete stanchi, resta la prima cosa da sacrificare.", mapsQuery:"High Roller Las Vegas", mapLat:36.1176, mapLon:-115.1681, detailPlace:"High Roller" },
    { time:"20:10", kind:"transfer", icon:"🚶", title:"Spostamento · High Roller → Cosmopolitan", note:"🚶 A piedi · circa 1,4 km · 17–20 min lungo la Strip. È più semplice che recuperare l’auto per spostarla di un solo miglio.", mapsQuery:"The Cosmopolitan of Las Vegas 3708 Las Vegas Blvd S" },
    { time:"20:35 circa", kind:"recommended", icon:"🍕", title:"Secret Pizza · Cosmopolitan", note:"Cena volutamente semplice ed economica dopo il road trip. Si trova al terzo piano del Cosmopolitan ed è adatta anche a una cena più tarda del solito.", mapsQuery:"Secret Pizza Cosmopolitan Las Vegas", mapLat:36.1096, mapLon:-115.1740, detailRestaurant:"Secret Pizza" },
    { time:"Dopo cena", kind:"transfer", icon:"🚶", title:"Rientro · Cosmopolitan → Paris Las Vegas", note:"🚶 A piedi · circa 600–800 m · 8–12 min. Se avete ancora energia potete trasformare il rientro in una passeggiata libera sulla Strip.", mapsQuery:"Paris Las Vegas" },
    { time:"Dopo cena", kind:"optional", icon:"🌙", title:"Serata libera a Las Vegas", note:"Casinò, drink oppure rientro in camera. Nessun’altra attrazione obbligatoria: domani volo mattutino per Chicago." }
  ];

  // Nel giorno Page manteniamo compatta tutta la parte road trip e sostituiamo
  // solo la serata successiva all'arrivo al Paris con i collegamenti urbani.
  const page29 = (PROGRAM_GUIDE.page || []).find(day => day.date === "2026-10-29");
  if (page29) {
    const arrivalIndex = page29.items.findIndex(item => item.title === "Arrivo al Paris Las Vegas");
    if (arrivalIndex >= 0) page29.items = [...page29.items.slice(0, arrivalIndex), ...vegas29Evening];
  }

  PROGRAM_GUIDE.vegas2 = [
    { date:"2026-10-29", title:"Page → Las Vegas", theme:"Rientro a Las Vegas e serata volutamente leggera, tutta a piedi dal Paris.", items:[
      ...vegas29Evening,
      { time:"05:15 · domani", kind:"recommended", icon:"⏰", title:"Sveglia consigliata per il 30 ottobre", note:"Domani volo LAS → ORD alle 09:58. Puntiamo a lasciare il Paris verso le 06:30, riconsegnare il SUV e arrivare in aeroporto con margine. Sveglia alle 05:15; colazione in aeroporto." }
    ]}
  ];
})();
