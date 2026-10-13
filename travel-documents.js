// Documenti di viaggio aggiuntivi — caricabili nella sezione Biglietti/Documenti.
// Modulo separato per evitare di modificare il grande data.js.
(function addTravelDocuments(){
  if (typeof TRIP === "undefined" || !Array.isArray(TRIP.legs)) return;

  function addTicket(legId, ticket){
    const leg = TRIP.legs.find(item => item.id === legId);
    if (!leg) return;
    if (!Array.isArray(leg.tickets)) leg.tickets = [];
    const exists = leg.tickets.some(item => String(item?.name || "").trim().toLowerCase() === ticket.name.toLowerCase());
    if (!exists) leg.tickets.push(ticket);
  }

  addTicket("sfo", {
    name: "ESTA · Stati Uniti",
    note: "Autorizzazione ESTA per l’ingresso negli Stati Uniti · allegare PDF o screenshot della conferma.",
    status: "Documento"
  });

  addTicket("bayahibe", {
    name: "E-Ticket Ingresso",
    note: "E-ticket per l’ingresso in Repubblica Dominicana · allegare PDF, screenshot o QR della conferma.",
    status: "Documento"
  });

  addTicket("bayahibe", {
    name: "E-Ticket Uscita",
    note: "E-ticket per l’uscita dalla Repubblica Dominicana · allegare PDF, screenshot o QR della conferma.",
    status: "Documento"
  });

  addTicket("bayahibe", {
    name: "Transfer Andata",
    note: "Voucher del trasferimento da Punta Cana al Viva Dominicus Palace.",
    status: "Documento"
  });

  addTicket("bayahibe", {
    name: "Transfer Ritorno",
    note: "Voucher del trasferimento dal Viva Dominicus Palace a Punta Cana.",
    status: "Documento"
  });
})();
