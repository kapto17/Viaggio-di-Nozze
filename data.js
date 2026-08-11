// ============================================================
// DATI DEL VIAGGIO — modifica liberamente questo file.
// Ogni "tappa" (leg) è una città/base con le sue date, l'hotel,
// i trasporti noti, l'itinerario giorno per giorno e le sezioni
// ristoranti / da vedere / biglietti che potrai riempire man
// mano che organizzi il viaggio.
// ============================================================

const TRIP = {
  title: "Viaggio di nozze",
  subtitle: "20 ottobre – 10 novembre",
  start: "2026-10-20",
  end: "2026-11-10",

  legs: [
    {
      id: "sfo",
      city: "San Francisco",
      accent: "sf",
      image: "./assets/san-francisco.jpg",
      dateFrom: "2026-10-20",
      dateTo: "2026-10-23",
      hotel: { name: "Hotel Spero", address: "405 Taylor St, San Francisco, CA 94102", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Spero+405+Taylor+St+San+Francisco+CA+94102", checkin: "2026-10-20", checkout: "2026-10-23" },
      transport: [
        {
          date: "2026-10-20",
          time: "15:40",
          type: "flight",
          title: "Volo FCO → SFO",
          subtitle: "Partenza da Roma Fiumicino",
          arriveTime: "19:25",
          arriveNote: "Arrivo a San Francisco (20/10, ora locale)",
          mapsQuery: "San Francisco International Airport"
        }
      ],
      days: [],
      activities: [
        {
          name: "Alcatraz Night Tour",
          date: "2026-10-22",
          time: "17:55",
          status: "Prenotato",
          icon: "🌙",
          note: "Tour serale di Alcatraz · biglietti già prenotati",
          mapsUrl: "https://www.google.com/maps/place/Alcatraz+City+Cruises/@37.806501,-122.4089044,16z/data=!4m9!1m2!2m1!1sPier+33,+San+Francisco,+CA+94133,+USA!3m5!1s0x80858140454ee651:0x99729118cdbdd53!8m2!3d37.8065008!4d-122.4045268!16s%2Fg%2F11hdz9s32p?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D"
        }
      ],
      restaurants: [],
      places: [],
      tickets: [
        {
          name: "Alcatraz Night Tour",
          note: "22 ottobre 2026 · 17:55 · prenotazione confermata. Documento/QR da aggiungere quando disponibile.",
          status: "Prenotato"
        }
      ]
    },
    {
      id: "la",
      city: "Los Angeles",
      accent: "la",
      image: "./assets/los-angeles.jpg",
      dateFrom: "2026-10-23",
      dateTo: "2026-10-27",
      hotel: { name: "The Commerce Casino & Hotel", address: "6121 E Telegraph Rd, Commerce, CA 90040", mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Commerce+Casino+%26+Hotel+6121+E+Telegraph+Rd+Commerce+CA+90040", checkin: "2026-10-23", checkout: "2026-10-27" },
      transport: [
        {
          date: "2026-10-23",
          time: "11:00",
          type: "flight",
          title: "Volo SFO → LAX",
          subtitle: "SFO Terminal 1 → LAX Terminal 6 · Durata 1 h 36 min · bagaglio da stiva incluso",
          arriveTime: "12:36",
          arriveNote: "Arrivo a Los Angeles il 23/10 (ora locale)",
          mapsQuery: "Los Angeles International Airport"
        },
        {
          date: "2026-10-23",
          time: "",
          type: "car",
          title: "Ritiro SUV a noleggio",
          subtitle: "Ritiro a LAX · noleggio dal 23/10 al 30/10 · riconsegna a LAS",
          mapsQuery: "Los Angeles International Airport car rental"
        }
      ],
      days: [],
      activities: [
        {
          name: "Universal Studios Hollywood",
          date: "2026-10-26",
          time: "Giornata",
          status: "In programma",
          icon: "🎬",
          note: "Giornata agli Universal Studios Hollywood",
          mapsQuery: "Universal Studios Hollywood, Universal City, CA"
        }
      ],
      restaurants: [],
      places: [],
      tickets: []
    },
    {
      id: "vegas1",
      city: "Las Vegas",
      accent: "vegas",
      image: "./assets/las-vegas.jpg",
      dateFrom: "2026-10-27",
      dateTo: "2026-10-28",
      hotel: {
        name: "Paris Las Vegas",
        address: "3655 Las Vegas Blvd S, Las Vegas, NV 89109",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Las+Vegas+3655+Las+Vegas+Blvd+S+Las+Vegas+NV+89109",
        checkin: "2026-10-27",
        checkout: "2026-10-28"
      },
      transport: [
        {
          date: "2026-10-27",
          time: "Da definire",
          type: "car",
          title: "Los Angeles → Las Vegas",
          subtitle: "In auto",
          mapsQuery: "Las Vegas, NV"
        }
      ],
      days: [],
      restaurants: [],
      places: [],
      tickets: []
    },
    {
      id: "page",
      city: "Page (Lake Powell)",
      accent: "page",
      image: "./assets/page.jpg",
      dateFrom: "2026-10-28",
      dateTo: "2026-10-29",
      hotel: { name: "Lake Powell Resort", address: "Wahweap Marina, Page, AZ 86040", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lake+Powell+Resort+Wahweap+Marina+Page+AZ", checkin: "2026-10-28", checkout: "2026-10-29" },
      transport: [
        {
          date: "2026-10-28",
          time: "Da definire",
          type: "car",
          title: "Las Vegas → Page",
          subtitle: "In auto — Lake Powell",
          mapsQuery: "Page, AZ"
        }
      ],
      days: [],
      restaurants: [],
      places: [],
      tickets: []
    },
    {
      id: "vegas2",
      city: "Las Vegas",
      accent: "vegas",
      image: "./assets/las-vegas.jpg",
      dateFrom: "2026-10-29",
      dateTo: "2026-10-30",
      hotel: {
        name: "Paris Las Vegas",
        address: "3655 Las Vegas Blvd S, Las Vegas, NV 89109",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Las+Vegas+3655+Las+Vegas+Blvd+S+Las+Vegas+NV+89109",
        checkin: "2026-10-29",
        checkout: "2026-10-30"
      },
      transport: [
        {
          date: "2026-10-29",
          time: "Da definire",
          type: "car",
          title: "Page → Las Vegas",
          subtitle: "In auto, ritorno",
          mapsQuery: "Las Vegas, NV"
        },
        {
          date: "2026-10-30",
          time: "",
          type: "car",
          title: "Riconsegna SUV a noleggio",
          subtitle: "Riconsegna all'aeroporto di Las Vegas (LAS)",
          mapsQuery: "Harry Reid International Airport car rental return"
        }
      ],
      days: [],
      restaurants: [],
      places: [],
      tickets: []
    },
    {
      id: "chicago",
      city: "Chicago",
      accent: "chicago",
      image: "./assets/chicago.jpg",
      dateFrom: "2026-10-30",
      dateTo: "2026-11-03",
      hotel: { name: "Warwick Allerton - Chicago", address: "701 N Michigan Ave, Chicago, IL 60611", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Warwick+Allerton+Chicago+701+N+Michigan+Ave+Chicago+IL+60611", checkin: "2026-10-30", checkout: "2026-11-03" },
      transport: [
        {
          date: "2026-10-30",
          time: "",
          type: "flight",
          title: "Volo LAS → ORD",
          subtitle: "Orario in attesa di conferma/cambio con l'agenzia",
          mapsQuery: "Chicago O'Hare International Airport"
        }
      ],
      days: [],
      restaurants: [],
      places: [],
      tickets: []
    },
    {
      id: "bayahibe",
      city: "Bayahibe",
      accent: "sd",
      image: "./assets/bayahibe.jpg",
      dateFrom: "2026-11-03",
      dateTo: "2026-11-09",
      hotel: { name: "Viva Dominicus Palace by Wyndham", address: "Dominicus, Bayahibe, La Romana, Repubblica Dominicana", mapsUrl: "https://www.google.com/maps/search/?api=1&query=Viva+Dominicus+Palace+by+Wyndham+Bayahibe+Dominican+Republic", checkin: "2026-11-03", checkout: "2026-11-09" },
      transport: [
        {
          date: "2026-11-03",
          time: "09:30",
          type: "flight",
          title: "Volo ORD → PUJ",
          subtitle: "Chicago O'Hare → Punta Cana · Durata 4 h 32 min",
          arriveTime: "16:02",
          arriveNote: "Arrivo a Punta Cana (PUJ) il 03/11 · transfer per Bayahibe incluso nel pacchetto",
          mapsQuery: "Punta Cana International Airport"
        },
        {
          date: "2026-11-09",
          time: "12:56",
          type: "flight",
          title: "Volo PUJ → IAD",
          subtitle: "Punta Cana → Washington Dulles · Durata 3 h 59 min",
          arriveTime: "15:55",
          arriveNote: "Scalo a Washington: 1 h 45 min",
          mapsQuery: "Washington Dulles International Airport"
        },
        {
          date: "2026-11-09",
          time: "17:40",
          type: "flight",
          title: "Volo IAD → FCO",
          subtitle: "Washington Dulles → Roma Fiumicino · Durata 8 h 50 min",
          arriveTime: "08:30",
          arriveNote: "Arrivo a Roma martedì 10/11/2026",
          mapsQuery: "Leonardo da Vinci–Fiumicino Airport"
        }
      ],
      days: [],
      activities: [],
      restaurants: [],
      places: [],
      tickets: []

    }
  ]
};
