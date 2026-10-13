/* v2.4.58 — dati definitivi voli, hotel fee e timeline 23/10 */
(function applyTripDataPatch(){
  if (typeof TRIP === "undefined" || !Array.isArray(TRIP.legs)) return;

  const leg = id => TRIP.legs.find(item => item.id === id);
  const setHotelFee = (id, fee) => {
    const target = leg(id);
    if (target?.hotel) target.hotel.hotelFee = fee;
  };

  // Fee alloggi: importi e note allineati ai voucher dell'agenzia.
  setHotelFee("sfo", {
    perNight: 0,
    label: "Fee hotel",
    status: "not-listed",
    note: "Nessuna Guest Amenities Fee è indicata nel voucher dell’agenzia · eventuali addebiti extra restano da verificare in hotel."
  });
  setHotelFee("la", {
    perNight: 30,
    label: "Resort fee",
    status: "confirmed",
    note: "$30,00 a notte · totale previsto per 4 notti: $120,00 · da pagare in hotel."
  });
  setHotelFee("vegas1", {
    perNight: 62,
    label: "Resort fee",
    status: "confirmed",
    note: "$62,00 per la notte · da pagare in hotel."
  });
  setHotelFee("page", {
    perNight: 14.99,
    label: "Fee hotel",
    status: "confirmed",
    note: "$14,99 per la notte · parcheggio incluso."
  });
  setHotelFee("vegas2", {
    perNight: 62,
    label: "Resort fee",
    status: "estimated",
    note: "Resort fee da pagare in hotel · il voucher del 29/10 non indica l’importo; nel soggiorno del 27/10 al Paris è $62,00. Nel budget è usata la stessa cifra come stima."
  });
  setHotelFee("chicago", {
    perNight: 25,
    label: "Facility fee + extra locali",
    status: "confirmed-base",
    note: "$25,00 + tasse per camera/notte · CTID 1,5% da pagare direttamente in hotel · deposito cauzionale $100 al giorno, massimo $300 (non è un costo e viene restituito se non ci sono addebiti)."
  });
  setHotelFee("bayahibe", {
    perNight: 0,
    label: "Fee hotel",
    status: "none",
    note: "Nessuna resort fee separata indicata per il pacchetto all inclusive."
  });

  // Voli definitivi dai biglietti ufficiali.
  const la = leg("la");
  const sfoLax = la?.transport?.find(item => item.type === "flight" && item.date === "2026-10-23");
  if (sfoLax) {
    sfoLax.time = "10:21";
    sfoLax.title = "Volo SFO → LAX";
    sfoLax.subtitle = "Alaska Airlines AS1369 · Durata 1 h 32 min · bagaglio da stiva non incluso";
    sfoLax.arriveTime = "11:53";
    sfoLax.arriveNote = "Arrivo a Los Angeles il 23/10 (ora locale)";
  }

  const bayahibe = leg("bayahibe");
  const ordPuj = bayahibe?.transport?.find(item => item.date === "2026-11-03" && item.type === "flight");
  if (ordPuj) {
    ordPuj.subtitle = "Chicago O'Hare → Punta Cana · United UA1862 · Durata 4 h 40 min";
  }
  const iadFco = bayahibe?.transport?.find(item => item.date === "2026-11-09" && item.title?.includes("IAD → FCO"));
  if (iadFco) {
    iadFco.subtitle = "Washington Dulles → Roma Fiumicino · United UA884 · Durata 8 h 30 min";
  }

  // Timeline del 23 ottobre: adeguiamo soltanto partenza/arrivo del volo e i margini per SFO.
  // Auto e check-in al The Commerce restano invariati, come richiesto.
  if (typeof PROGRAM_GUIDE !== "undefined") {
    const sfo22 = (PROGRAM_GUIDE.sfo || []).find(day => day.date === "2026-10-22");
    const wake = sfo22?.items?.find(item => String(item.title || "").includes("Sveglia consigliata per il 23 ottobre"));
    if (wake) {
      wake.time = "06:00 · domani";
      wake.note = "Domani lasciamo Hotel Spero alle 07:20 per il volo Alaska AS1369 SFO → LAX delle 10:21. Sveglia alle 06:00: tempo per prepararci e colazione in aeroporto.";
    }

    const la23 = (PROGRAM_GUIDE.la || []).find(day => day.date === "2026-10-23");
    if (la23?.items) {
      la23.items.forEach(item => {
        const title = String(item.title || "");
        if (title === "Partenza da Hotel Spero") {
          item.time = "07:20";
          item.note = "Lasciate l'hotel con margine per traffico, bagagli e controlli del volo Alaska AS1369 delle 10:21.";
        } else if (title === "Arrivo a SFO") {
          item.time = "07:50 circa";
          item.note = "Bag drop se necessario e controlli di sicurezza. Obiettivo: essere al gate con oltre 2 ore di margine.";
        } else if (title === "Volo SFO → LAX") {
          item.time = "10:21";
          item.kind = "booked";
          item.note = "Alaska Airlines AS1369 · partenza da San Francisco · durata prevista 1h32 · bagaglio da stiva non incluso.";
        } else if (title === "Arrivo a Los Angeles · LAX") {
          item.time = "11:53";
          item.kind = "booked";
          item.note = "Atterraggio previsto alle 11:53. Recuperate i bagagli e seguite le indicazioni Rental Car Shuttles.";
        }
      });
    }
  }
})();
