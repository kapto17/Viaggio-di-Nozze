// ============================================================
// DATI DEL VIAGGIO — modifica liberamente questo file.
// Ogni "tappa" (leg) è una città/base con le sue date, l'hotel,
// i trasporti noti, l'itinerario giorno per giorno e le sezioni
// ristoranti / da vedere / biglietti che potrai riempire man
// mano che organizzi il viaggio.
// ============================================================

const TRIP = {
  title: "Viaggio di nozze",
  subtitle: "20 ottobre – 9 novembre",
  start: "2026-10-20",
  end: "2026-11-09",

  legs: [
    {
      id: "sfo",
      city: "San Francisco",
      accent: "sf",
      dateFrom: "2026-10-20",
      dateTo: "2026-10-23",
      hotel: { name: "Hotel Spero", checkin: "2026-10-20", checkout: "2026-10-23" },
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
          mapsQuery: "Alcatraz Island, San Francisco, CA"
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
      dateFrom: "2026-10-23",
      dateTo: "2026-10-27",
      hotel: { name: "The Commerce Hotel", checkin: "2026-10-23", checkout: "2026-10-27" },
      transport: [
        {
          date: "2026-10-23",
          time: "Da definire",
          type: "flight",
          title: "Volo SFO → LAX",
          subtitle: "Orario e carta d'imbarco da aggiungere",
          mapsQuery: "Los Angeles International Airport"
        },
        {
          date: "2026-10-23",
          time: "Da definire",
          type: "car",
          title: "Ritiro auto a noleggio",
          subtitle: "Primo giorno a Los Angeles",
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
      dateFrom: "2026-10-27",
      dateTo: "2026-10-28",
      hotel: { name: "Hotel da definire", checkin: "2026-10-27", checkout: "2026-10-28" },
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
      dateFrom: "2026-10-28",
      dateTo: "2026-10-29",
      hotel: { name: "Hotel da definire", checkin: "2026-10-28", checkout: "2026-10-29" },
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
      dateFrom: "2026-10-29",
      dateTo: "2026-10-30",
      hotel: { name: "Hotel da definire (stesso di prima tappa)", checkin: "2026-10-29", checkout: "2026-10-30" },
      transport: [
        {
          date: "2026-10-29",
          time: "Da definire",
          type: "car",
          title: "Page → Las Vegas",
          subtitle: "In auto, ritorno",
          mapsQuery: "Las Vegas, NV"
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
      dateFrom: "2026-10-30",
      dateTo: "2026-11-03",
      hotel: { name: "Warwick Allerton Hotel", checkin: "2026-10-30", checkout: "2026-11-03" },
      transport: [
        {
          date: "2026-10-30",
          time: "Da definire",
          type: "flight",
          title: "Volo Las Vegas → Chicago",
          subtitle: "Orario e carta d'imbarco da aggiungere",
          mapsQuery: "Chicago O'Hare International Airport"
        }
      ],
      days: [],
      restaurants: [],
      places: [],
      tickets: []
    },
    {
      id: "santodomingo",
      city: "Santo Domingo",
      accent: "sd",
      dateFrom: "2026-11-03",
      dateTo: "2026-11-09",
      hotel: { name: "Viva Dominicus Palace", checkin: "2026-11-03", checkout: "2026-11-09" },
      transport: [
        {
          date: "2026-11-03",
          time: "Da definire",
          type: "flight",
          title: "Volo Chicago → Santo Domingo",
          subtitle: "Orario e carta d'imbarco da aggiungere",
          mapsQuery: "Aeropuerto Internacional Las Américas"
        },
        {
          date: "2026-11-09",
          time: "Da definire",
          type: "flight",
          title: "Volo di rientro: Santo Domingo → Washington → FCO",
          subtitle: "Scalo a Washington — orari da aggiungere",
          mapsQuery: "Leonardo da Vinci–Fiumicino Airport"
        }
      ],
      days: [],
      restaurants: [],
      places: [],
      tickets: []
    }
  ]
};
