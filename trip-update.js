/* v2.4.59 — unico file per correzioni viaggio, documenti, promemoria, fee e assicurazione */
(function(){
  if (typeof TRIP === "undefined" || !Array.isArray(TRIP.legs)) return;
  const leg = id => TRIP.legs.find(item => item.id === id);
  const setHotelFee = (id, fee) => { const target = leg(id); if (target?.hotel) target.hotel.hotelFee = fee; };
  const addTicket = (legId, ticket) => {
    const target = leg(legId);
    if (!target) return;
    if (!Array.isArray(target.tickets)) target.tickets = [];
    const exists = target.tickets.some(item => String(item?.name || "").trim().toLowerCase() === ticket.name.toLowerCase());
    if (!exists) target.tickets.push(ticket);
  };

  const sfo = leg("sfo");
  addTicket("sfo", {
    name:"Assicurazione viaggio",
    note:"Nobis Assicurazioni · WI UP · Polizza 204765892 · validità 20/10/2026–10/11/2026 · Mondo.",
    status:"Documento"
  });

  const bayahibe = leg("bayahibe");
  if (bayahibe) {
    if (!Array.isArray(bayahibe.tickets)) bayahibe.tickets = [];
    bayahibe.tickets = bayahibe.tickets.filter(item => String(item?.name || "").trim().toLowerCase() !== "e-ticket · repubblica dominicana".toLowerCase());
    addTicket("bayahibe", { name:"E-Ticket Ingresso", note:"E-ticket per l’ingresso in Repubblica Dominicana · allegare PDF, screenshot o QR della conferma.", status:"Documento" });
    addTicket("bayahibe", { name:"E-Ticket Uscita", note:"E-ticket per l’uscita dalla Repubblica Dominicana · allegare PDF, screenshot o QR della conferma.", status:"Documento" });
    addTicket("bayahibe", { name:"Transfer Andata", note:"Voucher del trasferimento da Punta Cana al Viva Dominicus Palace.", status:"Documento" });
    addTicket("bayahibe", { name:"Transfer Ritorno", note:"Voucher del trasferimento dal Viva Dominicus Palace a Punta Cana.", status:"Documento" });
  }

  setHotelFee("sfo", { perNight:0, label:"Fee hotel", status:"not-listed", note:"Nessuna Guest Amenities Fee è indicata nel voucher dell’agenzia · eventuali addebiti extra restano da verificare in hotel." });
  setHotelFee("la", { perNight:30, label:"Resort fee", status:"confirmed", note:"$30,00 a notte · totale previsto per 4 notti: $120,00 · da pagare in hotel." });
  setHotelFee("vegas1", { perNight:62, label:"Resort fee", status:"confirmed", note:"$62,00 per la notte · da pagare in hotel." });
  setHotelFee("page", { perNight:14.99, label:"Fee hotel", status:"confirmed", note:"$14,99 per la notte · parcheggio incluso." });
  setHotelFee("vegas2", { perNight:62, label:"Resort fee", status:"estimated", note:"Resort fee da pagare in hotel · il voucher del 29/10 non indica l’importo; nel soggiorno del 27/10 al Paris è $62,00. Nel budget è usata la stessa cifra come stima." });
  setHotelFee("chicago", { perNight:25, label:"Facility fee + extra locali", status:"confirmed-base", note:"$25,00 + tasse per camera/notte · CTID 1,5% da pagare direttamente in hotel · deposito cauzionale $100 al giorno, massimo $300 (non è un costo e viene restituito se non ci sono addebiti)." });
  setHotelFee("bayahibe", { perNight:0, label:"Fee hotel", status:"none", note:"Nessuna resort fee separata indicata per il pacchetto all inclusive." });

  const fcoSfo = sfo?.transport?.find(item => item.date === "2026-10-20" && item.type === "flight");
  if (fcoSfo) fcoSfo.subtitle = "United UA506 · partenza da Roma Fiumicino";
  const la = leg("la");
  const sfoLax = la?.transport?.find(item => item.type === "flight" && item.date === "2026-10-23");
  if (sfoLax) {
    sfoLax.time = "10:21";
    sfoLax.title = "Volo SFO → LAX";
    sfoLax.subtitle = "Alaska Airlines AS1369 · Durata 1 h 32 min · bagaglio da stiva non incluso";
    sfoLax.arriveTime = "11:53";
    sfoLax.arriveNote = "Arrivo a Los Angeles il 23/10 (ora locale)";
  }
  const vegas2 = leg("vegas2");
  const lasOrd = vegas2?.transport?.find(item => item.date === "2026-10-30" && item.type === "flight");
  if (lasOrd) lasOrd.subtitle = "American Airlines AA1592 · Las Vegas → Chicago O’Hare · arrivo 15:53 ora locale";
  const ordPuj = bayahibe?.transport?.find(item => item.date === "2026-11-03" && item.type === "flight");
  if (ordPuj) ordPuj.subtitle = "Chicago O'Hare → Punta Cana · United UA1862 · Durata 4 h 40 min";
  const pujIad = bayahibe?.transport?.find(item => item.date === "2026-11-09" && item.title?.includes("PUJ → IAD"));
  if (pujIad) pujIad.subtitle = "Punta Cana → Washington Dulles · United UA1614 · Durata 3 h 59 min";
  const iadFco = bayahibe?.transport?.find(item => item.date === "2026-11-09" && item.title?.includes("IAD → FCO"));
  if (iadFco) iadFco.subtitle = "Washington Dulles → Roma Fiumicino · United UA884 · Durata 8 h 30 min";

  if (typeof PROGRAM_GUIDE !== "undefined") {
    const sfo22 = (PROGRAM_GUIDE.sfo || []).find(day => day.date === "2026-10-22");
    const wake = sfo22?.items?.find(item => String(item.title || "").includes("Sveglia consigliata per il 23 ottobre"));
    if (wake) { wake.time = "06:00 · domani"; wake.note = "Domani lasciamo Hotel Spero alle 07:20 per il volo Alaska AS1369 SFO → LAX delle 10:21. Sveglia alle 06:00: tempo per prepararci e colazione in aeroporto."; }
    const la23 = (PROGRAM_GUIDE.la || []).find(day => day.date === "2026-10-23");
    if (la23?.items) {
      la23.items.forEach(item => {
        const title = String(item.title || "");
        if (title === "Partenza da Hotel Spero") { item.time = "07:20"; item.note = "Lasciate l'hotel con margine per traffico, bagagli e controlli del volo Alaska AS1369 delle 10:21."; }
        else if (title === "Arrivo a SFO") { item.time = "07:50 circa"; item.note = "Bag drop se necessario e controlli di sicurezza. Obiettivo: essere al gate con oltre 2 ore di margine."; }
        else if (title === "Volo SFO → LAX") { item.time = "10:21"; item.kind = "booked"; item.note = "Alaska Airlines AS1369 · partenza da San Francisco · durata prevista 1h32 · bagaglio da stiva non incluso."; }
        else if (title === "Arrivo a Los Angeles · LAX") { item.time = "11:53"; item.kind = "booked"; item.note = "Atterraggio previsto alle 11:53. Recuperate i bagagli e seguite le indicazioni Rental Car Shuttles."; }
      });
    }
  }

  function installUi(){
    const TODAY_REMINDERS = {
      "2026-10-22": [
        { icon:"🧳", title:"Acquista la valigia da stiva", text:"Per il volo di domani SFO → LAX · Alaska AS1369. Acquistala prima di fare il check-in." },
        { icon:"✈️", title:"Fai il check-in online", text:"Alaska Airlines AS1369 · partenza domani alle 10:21. Il check-in è disponibile circa 24 ore prima." }
      ],
      "2026-10-29": [
        { icon:"🧳", title:"Acquista la valigia da stiva", text:"Per il volo di domani LAS → ORD · American Airlines AA1592. Acquistala prima di fare il check-in." },
        { icon:"✈️", title:"Fai il check-in online", text:"American Airlines AA1592 · partenza domani alle 09:58. Il check-in è disponibile circa 24 ore prima." }
      ],
      "2026-11-01": [{ icon:"🛂", title:"Compila l’E-ticket di ingresso", text:"Repubblica Dominicana · compilalo nelle 72 ore precedenti all’ingresso del 3 novembre." }],
      "2026-11-02": [{ icon:"✈️", title:"Fai il check-in online", text:"United UA1862 · Chicago → Punta Cana · partenza domani alle 09:17." }],
      "2026-11-08": [
        { icon:"🛂", title:"Compila l’E-ticket di uscita", text:"Repubblica Dominicana · necessario per l’uscita del 9 novembre." },
        { icon:"🚐", title:"Conferma Transfer Ritorno", text:"Conferma circa 24 ore prima l’orario di prelievo dal Viva Dominicus Palace per Punta Cana Airport." },
        { icon:"✈️", title:"Fai il check-in online", text:"United · PUJ → IAD → FCO · partenza domani alle 12:56." }
      ]
    };

    if (!document.getElementById("trip-update-style")) {
      const style = document.createElement("style");
      style.id = "trip-update-style";
      style.textContent = `
        .today-reminders-card{margin:16px 0 18px;padding:16px;border:1px solid rgba(176,76,91,.22);border-radius:18px;background:linear-gradient(145deg,#fffaf5,#fff);box-shadow:0 8px 22px -18px rgba(50,35,35,.45)}
        .today-reminders-head{display:flex;align-items:center;gap:9px;margin-bottom:11px}.today-reminders-head span{font-size:20px}.today-reminders-head strong{font-size:15px;letter-spacing:.02em}
        .today-reminder-item{display:grid;grid-template-columns:34px 1fr;gap:10px;padding:11px 0;border-top:1px solid rgba(40,40,40,.08)}.today-reminder-item:first-of-type{border-top:0;padding-top:2px}
        .today-reminder-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:11px;background:rgba(176,76,91,.08);font-size:18px}.today-reminder-copy strong{display:block;font-size:14px;margin-bottom:3px}.today-reminder-copy span{display:block;font-size:13px;line-height:1.4;opacity:.76}
        .sos-insurance-note{margin:8px 0 0;font-weight:700;color:#8a2f3c}
        .sos-insurance-coverages{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
        .sos-insurance-coverages span{padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.035);font-size:12px;line-height:1.25}
        .sos-insurance-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
        .sos-insurance-actions a{display:inline-flex;align-items:center;justify-content:center;padding:9px 11px;border-radius:11px;text-decoration:none;font-weight:700;background:rgba(176,76,91,.08);color:inherit}
      `;
      document.head.appendChild(style);
    }

    const remindersHtml = iso => {
      const items = TODAY_REMINDERS[iso] || [];
      if (!items.length) return "";
      return `<section class="today-reminders-card" data-today-reminders="${iso}"><div class="today-reminders-head"><span>⚠️</span><strong>Da fare oggi</strong></div>${items.map(item => `<div class="today-reminder-item"><div class="today-reminder-icon">${item.icon}</div><div class="today-reminder-copy"><strong>${item.title}</strong><span>${item.text}</span></div></div>`).join("")}</section>`;
    };

    const injectTodayReminders = iso => {
      const screen = document.getElementById("screen-today");
      if (!screen || !iso) return;
      screen.querySelector(".today-reminders-card")?.remove();
      const html = remindersHtml(iso);
      if (!html) return;
      const program = screen.querySelector(".today-screen-program");
      if (program) program.insertAdjacentHTML("beforebegin", html);
    };

    if (typeof window.openTodayScreen === "function" && !window.openTodayScreen.__tripUpdateWrapped) {
      const originalOpenTodayScreen = window.openTodayScreen;
      const wrapped = function(legId, iso){ const result = originalOpenTodayScreen.apply(this, arguments); requestAnimationFrame(() => injectTodayReminders(iso)); return result; };
      wrapped.__tripUpdateWrapped = true;
      window.openTodayScreen = wrapped;
    }

    const nightsBetween = (checkin, checkout) => { const a = new Date(`${checkin}T12:00:00Z`); const b = new Date(`${checkout}T12:00:00Z`); const value = Math.round((b-a)/86400000); return Number.isFinite(value) && value > 0 ? value : 1; };
    const knownFeeTotal = () => TRIP.legs.reduce((sum, item) => { const fee = item.hotel?.hotelFee; const perNight = Number(fee?.perNight || 0); if (!perNight || !item.hotel?.checkin || !item.hotel?.checkout) return sum; return sum + perNight * nightsBetween(item.hotel.checkin, item.hotel.checkout); }, 0);

    const patchBudgetFeeSection = () => {
      const host = document.getElementById("screen-budget");
      if (!host) return;
      const legs = TRIP.legs.filter(item => item.hotel?.hotelFee);
      Array.from(host.querySelectorAll(".hotel-fee-row")).forEach((row, index) => {
        const fee = legs[index]?.hotel?.hotelFee;
        const value = row.querySelector(".hotel-fee-value");
        if (!fee || !value) return;
        if (Number(fee.perNight) <= 0) value.textContent = fee.status === "none" ? "Nessuna fee" : "Non indicata";
      });
      const total = host.querySelector(".hotel-fees-total strong");
      const note = host.querySelector(".hotel-fees-total small");
      if (total && typeof money === "function") total.textContent = money(knownFeeTotal(), "USD");
      if (note) note.textContent = "Totale delle fee base con importo noto/stimato. Per Chicago restano da aggiungere le tasse sulla facility fee e il CTID 1,5%; le cauzioni non sono costi.";
    };

    if (typeof window.renderBudgetScreen === "function" && !window.renderBudgetScreen.__tripUpdateWrapped) {
      const originalRenderBudgetScreen = window.renderBudgetScreen;
      const wrappedBudget = function(){ const result = originalRenderBudgetScreen.apply(this, arguments); requestAnimationFrame(patchBudgetFeeSection); return result; };
      wrappedBudget.__tripUpdateWrapped = true;
      window.renderBudgetScreen = wrappedBudget;
    }

    const patchInsuranceSOS = () => {
      const screen = document.getElementById("screen-sos");
      if (!screen) return;
      const sectionTitle = Array.from(screen.querySelectorAll(".section-title")).find(el => String(el.textContent || "").trim() === "Assicurazione viaggio");
      if (!sectionTitle) return;

      screen.querySelector("[data-sos-insurance-details]")?.remove();
      const oldCard = sectionTitle.nextElementSibling;
      if (oldCard?.classList?.contains("sos-info-card")) oldCard.remove();

      const wrap = document.createElement("div");
      wrap.dataset.sosInsuranceDetails = "1";
      wrap.innerHTML = `
        <div class="sos-info-card">
          <div class="sos-card-icon">🛡️</div>
          <div>
            <small>Nobis Assicurazioni · WI UP</small>
            <strong>Polizza 204765892</strong>
            <p>Valida dal 20/10/2026 al 10/11/2026 · validità territoriale Mondo · assicurati Lorenzo e Fortuna.</p>
          </div>
        </div>
        <div class="sos-info-card">
          <div class="sos-card-icon">🚑</div>
          <div>
            <small>Assistenza in viaggio · 24 ore su 24</small>
            <strong>Centrale Operativa Nobis</strong>
            <p>+39 039 9890 702</p>
            <p class="sos-insurance-note">Contattare la Centrale Operativa prima di sostenere spese mediche o prendere iniziative autonome, salvo emergenza immediata.</p>
          </div>
          <a href="tel:+390399890702">Chiama</a>
        </div>
        <div class="sos-info-card">
          <div class="sos-card-icon">💶</div>
          <div>
            <small>Massimali principali</small>
            <strong>Coperture incluse</strong>
            <div class="sos-insurance-coverages">
              <span>🏥 Spese mediche<br><b>€50.000</b></span>
              <span>🧳 Bagaglio<br><b>€1.500</b></span>
              <span>🩹 Infortuni<br><b>€50.000</b></span>
              <span>⚖️ Responsabilità civile<br><b>€50.000</b></span>
            </div>
          </div>
        </div>
        <div class="sos-info-card">
          <div class="sos-card-icon">📋</div>
          <div>
            <small>Denuncia sinistro</small>
            <strong>Nobis</strong>
            <p>Portale sinistri.nobis.it · email gst@nobis.it</p>
            <div class="sos-insurance-actions">
              <a href="https://sinistri.nobis.it" target="_blank" rel="noopener">Apri portale</a>
              <a href="mailto:gst@nobis.it">Scrivi email</a>
            </div>
            <div class="program-actions" data-ticket-target="sfo::assicurazione viaggio" data-ticket-label="Assicurazione viaggio"></div>
          </div>
        </div>`;
      sectionTitle.insertAdjacentElement("afterend", wrap);
      if (typeof decorateTicketButtons === "function") decorateTicketButtons(wrap);
    };

    if (typeof window.openSOS === "function" && !window.openSOS.__tripInsuranceWrapped) {
      const originalOpenSOS = window.openSOS;
      const wrappedSOS = function(){
        const result = originalOpenSOS.apply(this, arguments);
        requestAnimationFrame(patchInsuranceSOS);
        return result;
      };
      wrappedSOS.__tripInsuranceWrapped = true;
      window.openSOS = wrappedSOS;
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installUi, { once:true });
  else installUi();
})();
