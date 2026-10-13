/* v2.4.64 — unico file per correzioni viaggio, documenti, promemoria, fee, assicurazione e navigazione privata */
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
  if (sfo && Array.isArray(sfo.tickets)) {
    sfo.tickets = sfo.tickets.filter(item => !String(item?.name || "").toLowerCase().includes("assicurazione"));
  }

  const bayahibe = leg("bayahibe");
  if (bayahibe) {
    if (!Array.isArray(bayahibe.tickets)) bayahibe.tickets = [];
    const obsolete = new Set(["e-ticket · repubblica dominicana","transfer andata","transfer ritorno"]);
    bayahibe.tickets = bayahibe.tickets.filter(item => !obsolete.has(String(item?.name || "").trim().toLowerCase()));
    addTicket("bayahibe", { name:"E-Ticket Ingresso", note:"E-ticket per l’ingresso in Repubblica Dominicana · allegare PDF, screenshot o QR della conferma.", status:"Documento" });
    addTicket("bayahibe", { name:"E-Ticket Uscita", note:"E-ticket per l’uscita dalla Repubblica Dominicana · allegare PDF, screenshot o QR della conferma.", status:"Documento" });
    addTicket("bayahibe", { name:"Transfer da e per aeroporto", note:"Voucher unico dei transfer Punta Cana Airport ↔ Viva Dominicus Palace.", status:"Documento" });
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
        .sos-insurance-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.sos-insurance-actions a,.sos-insurance-actions button{display:inline-flex;align-items:center;justify-content:center;padding:9px 11px;border:0;border-radius:11px;text-decoration:none;font:inherit;font-weight:700;background:rgba(176,76,91,.08);color:inherit;cursor:pointer}
        .lf-hidden-tiktok-trigger{display:none!important}
        .lf-theme-submenu{margin:8px 0 12px;border:1px solid rgba(255,255,255,.12);border-radius:16px;overflow:hidden}
        .lf-theme-submenu>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:14px 15px;font-weight:800}.lf-theme-submenu>summary::-webkit-details-marker{display:none}.lf-theme-submenu>summary:after{content:'⌄';opacity:.7}.lf-theme-submenu[open]>summary:after{transform:rotate(180deg)}
        .lf-theme-submenu-inner{padding:0 8px 8px}.lf-theme-submenu .theme-panel-intro{margin:0 8px 8px}
        .lf-menu-shortcuts{display:grid;gap:8px;margin-top:10px}.lf-menu-shortcuts[hidden]{display:none!important}.lf-menu-shortcut{width:100%;display:flex;align-items:center;gap:12px;padding:13px 14px;border:0;border-radius:14px;background:rgba(255,255,255,.08);color:inherit;text-align:left;font:inherit;cursor:pointer}.lf-menu-shortcut span{font-size:18px}.lf-menu-shortcut strong{font-size:14px}.lf-menu-shortcut b{margin-left:auto;opacity:.7}
        nav.tabbar #documents-tab[hidden]{display:none!important}
        .documents-head{padding:6px 2px 14px}.documents-head small{font-size:11px;font-weight:900;letter-spacing:.12em;opacity:.62}.documents-head h2{margin:4px 0 6px;font-size:28px}.documents-head p{margin:0;opacity:.72;line-height:1.45}
        .documents-add-btn{width:100%;margin:4px 0 18px;padding:14px 16px;border:0;border-radius:16px;background:#d29a28;color:#10203a;font-weight:900;font-size:15px}
        .documents-section{margin:12px 0;border-radius:17px;background:rgba(255,255,255,.5);overflow:hidden}.documents-section>summary{list-style:none}.documents-section>summary::-webkit-details-marker{display:none}.documents-section-title{display:flex;align-items:center;gap:8px;margin:0;padding:14px 15px;font-size:13px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}.documents-section-title .documents-section-count{margin-left:auto;min-width:24px;height:24px;padding:0 7px;border-radius:999px;display:grid;place-items:center;background:#ece9e0;font-size:11px;letter-spacing:0}.documents-section-title .documents-section-chevron{font-size:15px;opacity:.55;transition:transform .2s ease}.documents-section[open] .documents-section-chevron{transform:rotate(180deg)}
        .documents-list{display:grid;gap:10px;padding:0 10px 10px}.documents-card{background:#fff;border-radius:17px;padding:14px;box-shadow:0 9px 24px -21px rgba(20,30,45,.55)}.documents-card-top{display:flex;align-items:flex-start;gap:11px}.documents-card-icon{width:38px;height:38px;flex:0 0 38px;border-radius:12px;display:grid;place-items:center;background:#f2ede3;font-size:19px}.documents-card-copy{min-width:0;flex:1}.documents-card-copy strong{display:block;font-size:14px;line-height:1.25}.documents-card-copy small{display:block;margin-top:4px;font-size:11px;line-height:1.35;opacity:.65}.documents-card-badges{display:flex;gap:5px;flex-wrap:wrap;margin-top:7px}.documents-card-badges span{padding:4px 7px;border-radius:999px;background:#eef1ec;font-size:10px;font-weight:800}.documents-open{width:100%;margin-top:11px;padding:11px;border:0;border-radius:13px;background:#eef0f3;color:#23334e;font-weight:800}.documents-card-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.documents-card-actions button{padding:10px;border:0;border-radius:13px;background:#eef0f3;color:#23334e;font:inherit;font-size:12px;font-weight:800}.documents-empty{padding:24px 16px;border-radius:17px;background:#fff;text-align:center;opacity:.72}
        .documents-upload-backdrop{position:fixed;inset:0;z-index:10050;background:rgba(10,18,30,.52);display:grid;align-items:end;padding:18px}.documents-upload-sheet{width:min(100%,520px);max-height:88vh;overflow:auto;margin:0 auto;background:#fff;border-radius:23px;padding:18px;box-shadow:0 20px 70px rgba(0,0,0,.3)}.documents-upload-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.documents-upload-head small{font-size:10px;font-weight:900;letter-spacing:.1em;opacity:.58}.documents-upload-head h3{margin:3px 0 14px}.documents-upload-close{border:0;background:#eef0f3;border-radius:50%;width:36px;height:36px;font-size:20px}.documents-field{display:grid;gap:6px;margin:12px 0}.documents-field span{font-size:12px;font-weight:800}.documents-field select,.documents-field input{width:100%;box-sizing:border-box;padding:12px;border:1px solid #d9dde4;border-radius:12px;background:#fff;font:inherit}.documents-upload-save{width:100%;margin-top:9px;padding:13px;border:0;border-radius:14px;background:#d29a28;color:#10203a;font-weight:900}
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
      wrap.innerHTML = `<div class="sos-info-card"><div class="sos-card-icon">🛡️</div><div><small>Nobis Assicurazioni · WI UP</small><strong>Polizza 204765892</strong><p>Valida dal 20/10/2026 al 10/11/2026 · validità territoriale Mondo · assicurati Lorenzo e Fortuna.</p></div></div><div class="sos-info-card"><div class="sos-card-icon">🚑</div><div><small>Assistenza in viaggio · 24 ore su 24</small><strong>Centrale Operativa Nobis</strong><p>+39 039 9890 702</p><p class="sos-insurance-note">Contattare la Centrale Operativa prima di sostenere spese mediche o prendere iniziative autonome, salvo emergenza immediata.</p></div><a href="tel:+390399890702">Chiama</a></div><div class="sos-info-card"><div class="sos-card-icon">💶</div><div><small>Massimali principali</small><strong>Coperture incluse</strong><div class="sos-insurance-coverages"><span>🏥 Spese mediche<br><b>€50.000</b></span><span>🧳 Bagaglio<br><b>€1.500</b></span><span>🩹 Infortuni<br><b>€50.000</b></span><span>⚖️ Responsabilità civile<br><b>€50.000</b></span></div></div></div><div class="sos-info-card"><div class="sos-card-icon">📋</div><div><small>Denuncia sinistro</small><strong>Nobis</strong><p>Portale sinistri.nobis.it · email gst@nobis.it</p><div class="sos-insurance-actions"><a href="https://sinistri.nobis.it" target="_blank" rel="noopener">Apri portale</a><a href="mailto:gst@nobis.it">Scrivi email</a><button type="button" id="sos-insurance-open">Apri polizza assicurativa</button></div></div></div>`;
      sectionTitle.insertAdjacentElement("afterend", wrap);
      wrap.querySelector("#sos-insurance-open")?.addEventListener("click", openInsurancePolicy);
    };

    if (typeof window.openSOS === "function" && !window.openSOS.__tripInsuranceWrapped) {
      const originalOpenSOS = window.openSOS;
      const wrappedSOS = function(){ const result = originalOpenSOS.apply(this, arguments); requestAnimationFrame(patchInsuranceSOS); return result; };
      wrappedSOS.__tripInsuranceWrapped = true;
      window.openSOS = wrappedSOS;
    }

    const stripStaticTicketSummaries = () => {
      document.querySelectorAll("#screen-city-detail .ticket-import-box").forEach(box => {
        let node = box.previousElementSibling;
        while (node?.classList?.contains("ticket")) { const previous = node.previousElementSibling; node.remove(); node = previous; }
      });
    };

    if (typeof window.openCity === "function" && !window.openCity.__tripTicketSummaryWrapped) {
      const originalOpenCity = window.openCity;
      const wrappedOpenCity = function(){ const result = originalOpenCity.apply(this, arguments); requestAnimationFrame(stripStaticTicketSummaries); return result; };
      wrappedOpenCity.__tripTicketSummaryWrapped = true;
      window.openCity = wrappedOpenCity;
    }

    const normalizeKey = value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
    const makeTicketKey = (legId, label) => typeof window.ticketKey === "function" ? window.ticketKey(legId,label) : `${legId}::${normalizeKey(label)}`;
    const ownerLabel = owner => owner === "lorenzo" ? "Lorenzo" : owner === "fortuna" ? "Fortuna" : "Entrambi";
    const cityLabel = legId => legId === "documents" ? "Archivio generale" : legId === "sos" ? "SOS" : (leg(legId)?.city || legId || "Viaggio");
    const legOrder = new Map(TRIP.legs.map((item,index) => [item.id,index]));
    const DOCS_ONLY_TARGETS = [
      { legId:"documents", city:"Solo Documenti", label:"Voucher United UA506 · FCO → SFO", key:"docs-only::voucher-united-ua506-fco-sfo" },
      { legId:"documents", city:"Solo Documenti", label:"Voucher United UA1862 · ORD → PUJ", key:"docs-only::voucher-united-ua1862-ord-puj" },
      { legId:"documents", city:"Solo Documenti", label:"Voucher United UA1614 · PUJ → IAD", key:"docs-only::voucher-united-ua1614-puj-iad" },
      { legId:"documents", city:"Solo Documenti", label:"Voucher United UA884 · IAD → FCO", key:"docs-only::voucher-united-ua884-iad-fco" },
      { legId:"documents", city:"Solo Documenti", label:"Voucher volo Alaska · SFO → LAX", key:"docs-only::voucher-volo-alaska-sfo-lax" },
      { legId:"documents", city:"Solo Documenti", label:"Voucher volo American · LAS → ORD", key:"docs-only::voucher-volo-american-las-ord" },
      { legId:"sos", city:"SOS", label:"Assicurazione medico bagaglio", key:"sos::assicurazione-medico-bagaglio" },
      { legId:"documents", city:"Solo Documenti", label:"Altro voucher volo", key:"docs-only::altro-voucher-volo" }
    ];

    function allUploadTargets(){
      const out = [];
      TRIP.legs.forEach(item => {
        const seen = new Set();
        const add = label => { if (!label) return; const key = makeTicketKey(item.id,label); if (seen.has(key)) return; seen.add(key); out.push({ legId:item.id, city:item.city, label, key }); };
        (item.transport || []).forEach(x => add(x.title));
        if (item.hotel?.name) add(`Voucher hotel · ${item.hotel.name}`);
        (item.activities || []).filter(x => x.ticketUpload !== false).forEach(x => add(x.name));
        (item.tickets || []).forEach(x => add(x.name));
      });
      return out;
    }

    async function allDocumentRecords(){
      if (typeof window.openTicketDb !== "function") return [];
      const db = await window.openTicketDb();
      return await new Promise((resolve,reject) => {
        const tx = db.transaction("tickets","readonly");
        const req = tx.objectStore("tickets").getAll();
        req.onsuccess = () => resolve((req.result || []).sort((a,b) => Number(b.createdAt || 0) - Number(a.createdAt || 0)));
        req.onerror = () => reject(req.error);
      });
    }

    const isInsuranceRecord = rec => normalizeKey(`${rec?.targetLabel || ""} ${rec?.label || ""} ${rec?.fileName || ""}`).includes("assicurazione");

    function documentCategory(rec){
      const value = normalizeKey(`${rec.targetLabel || ""} ${rec.label || ""}`);
      if (/voucher hotel|hotel spero|commerce|paris las vegas|lake powell|warwick|dominicus/.test(value)) return { id:"hotels", icon:"🏨", label:"Hotel" };
      if (/^voucher united|^voucher volo alaska|^voucher volo american|altro voucher volo/.test(value)) return { id:"flightvouchers", icon:"🧾", label:"Voucher voli" };
      if (/\bvolo\b|\bvoli\b|\bfco\b|\bsfo\b|\blax\b|\blas\b|\bord\b|\bpuj\b|\biad\b|\bunited\b|\balaska\b|\bamerican\b/.test(value)) return { id:"flights", icon:"✈️", label:"Voli" };
      if (/noleggio|ritiro suv|auto|transfer|rental/.test(value)) return { id:"transport", icon:"🚗", label:"Auto e transfer" };
      if (/esta|e ticket|assicurazione|passaporto|documento/.test(value)) return { id:"travel", icon:"🛂", label:"Documenti di viaggio" };
      if (/alcatraz|universal|antelope|tour|studios|attivita/.test(value)) return { id:"activities", icon:"🎟️", label:"Attività" };
      return { id:"other", icon:"📄", label:"Altri documenti" };
    }

    function documentCard(rec){
      const cat = documentCategory(rec);
      const sync = rec.cloudId ? "☁ Condiviso" : "↻ Da sincronizzare";
      const insurance = isInsuranceRecord(rec);
      const targetText = insurance ? "Assicurazione medico bagaglio" : (rec.targetLabel || "Non associato");
      const locationText = insurance ? "SOS" : cityLabel(rec.legId);
      return `<div class="documents-card"><div class="documents-card-top"><div class="documents-card-icon">${cat.icon}</div><div class="documents-card-copy"><strong>${typeof escapeHtml === "function" ? escapeHtml(rec.label || rec.fileName || "Documento") : (rec.label || rec.fileName || "Documento")}</strong><small>${typeof escapeHtml === "function" ? escapeHtml(targetText) : targetText} · ${typeof escapeHtml === "function" ? escapeHtml(locationText) : locationText}</small><div class="documents-card-badges"><span>${ownerLabel(rec.owner)}</span><span>${sync}</span></div></div></div><button type="button" class="documents-open" data-document-open="${rec.id}">Apri</button><div class="documents-card-actions"><button type="button" data-document-rename="${rec.id}">Modifica nome</button><button type="button" data-document-delete="${rec.id}">Elimina</button></div></div>`;
    }

    const voucherOrder = value => {
      const v = normalizeKey(value);
      if (v.includes("ua506") || v.includes("fco sfo")) return 10;
      if (v.includes("alaska") || v.includes("sfo lax")) return 20;
      if (v.includes("american") || v.includes("las ord")) return 30;
      if (v.includes("ua1862") || v.includes("ord puj")) return 40;
      if (v.includes("ua1614") || v.includes("puj iad")) return 50;
      if (v.includes("ua884") || v.includes("iad fco")) return 60;
      return 999;
    };

    function sortDocumentGroup(id, items){
      const copy = [...items];
      if (id === "hotels") return copy.sort((a,b) => { const aOrder = legOrder.has(a.legId) ? legOrder.get(a.legId) : 999; const bOrder = legOrder.has(b.legId) ? legOrder.get(b.legId) : 999; return aOrder - bOrder || Number(a.createdAt || 0) - Number(b.createdAt || 0); });
      if (id === "flightvouchers") return copy.sort((a,b) => voucherOrder(`${a.targetLabel} ${a.label}`) - voucherOrder(`${b.targetLabel} ${b.label}`));
      return copy.sort((a,b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
    }

    async function updateLocalDocumentLabel(id,label){
      const db = await window.openTicketDb();
      return await new Promise((resolve,reject) => {
        const tx = db.transaction("tickets","readwrite");
        const store = tx.objectStore("tickets");
        const req = store.get(Number(id));
        req.onsuccess = () => { const rec = req.result; if (!rec) { resolve(); return; } rec.label = String(label || "").trim().slice(0,80) || rec.fileName; const put = store.put(rec); put.onsuccess = () => resolve(); put.onerror = () => reject(put.error); };
        req.onerror = () => reject(req.error);
      });
    }

    async function renameDocument(id){
      const rec = await getLocalTicket(id);
      if (!rec) return;
      const next = String(prompt("Nuovo nome del documento", rec.label || rec.fileName || "") || "").trim();
      if (!next) return;
      try {
        if (rec.cloudId) { if (!window.LFBudget?.renameTicket) throw new Error("Rinomina cloud non disponibile"); await window.LFBudget.renameTicket(rec.cloudId,next); }
        await updateLocalDocumentLabel(rec.id,next);
        await renderDocumentsScreen();
      } catch(err) { console.error("Rinomina documento:",err); alert("Non sono riuscito a rinominare il documento. Controlla la connessione e riprova."); }
    }

    async function removeDocument(id){
      const rec = await getLocalTicket(id);
      if (!rec) return;
      if (!confirm(`Eliminare “${rec.label || rec.fileName || "questo documento"}”?`)) return;
      try {
        if (rec.cloudId) { if (!window.LFBudget?.removeTicket) throw new Error("Eliminazione cloud non disponibile"); await window.LFBudget.removeTicket(rec.cloudId); }
        await deleteLocalTicket(rec.id);
        await renderDocumentsScreen();
      } catch(err) { console.error("Eliminazione documento:",err); alert("Non sono riuscito a eliminare il documento. Controlla la connessione e riprova."); }
    }

    async function openInsurancePolicy(){
      try {
        const records = await allDocumentRecords();
        const rec = records.find(isInsuranceRecord);
        if (!rec) { alert("La polizza assicurativa non risulta caricata."); return; }
        const popup = typeof openTicketPlaceholder === "function" ? openTicketPlaceholder() : null;
        if (typeof openTicketRecord === "function") await openTicketRecord(rec,popup); else try { popup?.close(); } catch(_) {}
      } catch(err) { console.error("Apertura polizza:",err); alert("Non sono riuscito ad aprire la polizza assicurativa."); }
    }

    async function renderDocumentsScreen(){
      const screen = document.getElementById("screen-documents");
      if (!screen) return;
      if (!window.LFBudget?.isAuthenticated?.()) { screen.innerHTML = `<div class="documents-empty">Area privata L&amp;F.</div>`; return; }
      let records = [];
      try { records = await allDocumentRecords(); } catch(err){ console.error("Archivio documenti:",err); }
      const order = ["flights","hotels","transport","travel","activities","flightvouchers","other"];
      const grouped = new Map();
      records.forEach(rec => { const cat = documentCategory(rec); if (!grouped.has(cat.id)) grouped.set(cat.id,{cat,items:[]}); grouped.get(cat.id).items.push(rec); });
      const sections = order.filter(id => grouped.has(id)).map(id => { const group = grouped.get(id); const items = sortDocumentGroup(id,group.items); return `<details class="documents-section"><summary class="documents-section-title"><span>${group.cat.icon}</span><strong>${group.cat.label}</strong><span class="documents-section-count">${items.length}</span><span class="documents-section-chevron">⌄</span></summary><div class="documents-list">${items.map(documentCard).join("")}</div></details>`; }).join("");
      screen.innerHTML = `<button type="button" class="back-btn" id="back-documents">‹ Home</button><div class="documents-head"><small>AREA PRIVATA L&amp;F</small><h2>Documenti</h2><p>Tutti i file del viaggio in un unico posto. I documenti restano gli stessi già associati alle singole tappe.</p></div><button type="button" class="documents-add-btn" id="documents-add">＋ Aggiungi documento</button>${sections || `<div class="documents-empty">Non hai ancora caricato documenti.</div>`}`;
      document.getElementById("back-documents")?.addEventListener("click", () => history.back());
      document.getElementById("documents-add")?.addEventListener("click", openDocumentsUpload);
      screen.querySelectorAll("[data-document-open]").forEach(btn => btn.addEventListener("click", async () => { const popup = typeof openTicketPlaceholder === "function" ? openTicketPlaceholder() : null; try { const rec = await getLocalTicket(btn.dataset.documentOpen); if (rec && typeof openTicketRecord === "function") await openTicketRecord(rec,popup); else try{ popup?.close(); }catch(_){} } catch(err){ console.error("Apertura documento:",err); try{ popup?.close(); }catch(_){} alert("Non sono riuscito ad aprire il documento."); } }));
      screen.querySelectorAll("[data-document-rename]").forEach(btn => btn.addEventListener("click",() => renameDocument(btn.dataset.documentRename)));
      screen.querySelectorAll("[data-document-delete]").forEach(btn => btn.addEventListener("click",() => removeDocument(btn.dataset.documentDelete)));
    }

    async function saveDocumentFromHub(file, meta){
      const db = await window.openTicketDb();
      const rec = { legId:meta.legId, label:meta.label, owner:meta.owner, targetKey:meta.targetKey, targetLabel:meta.targetLabel, fileName:file.name, mimeType:file.type || "application/octet-stream", size:file.size, createdAt:Date.now(), cloudId:"", syncPending:true, blob:file };
      return await new Promise((resolve,reject) => { const tx = db.transaction("tickets","readwrite"); const req = tx.objectStore("tickets").add(rec); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); });
    }

    function closeDocumentsUpload(){ document.querySelector(".documents-upload-backdrop")?.remove(); }

    function openDocumentsUpload(){
      if (!window.LFBudget?.isAuthenticated?.()) return;
      closeDocumentsUpload();
      const targets = allUploadTargets();
      const byLeg = new Map();
      targets.forEach(target => { if (!byLeg.has(target.legId)) byLeg.set(target.legId,[]); byLeg.get(target.legId).push(target); });
      const docsOnlyOptions = `<optgroup label="Solo nella sezione Documenti / SOS">${DOCS_ONLY_TARGETS.map(target => `<option value="${target.key}" data-leg-id="${target.legId}" data-target-label="${target.label}">${target.label}</option>`).join("")}</optgroup>`;
      const tripOptions = TRIP.legs.map(item => { const rows = byLeg.get(item.id) || []; return `<optgroup label="${item.city}">${rows.map(target => `<option value="${target.key}" data-leg-id="${target.legId}" data-target-label="${String(target.label).replaceAll('&','&amp;').replaceAll('"','&quot;')}">${target.label}</option>`).join("")}</optgroup>`; }).join("");
      const backdrop = document.createElement("div");
      backdrop.className = "documents-upload-backdrop";
      backdrop.innerHTML = `<form class="documents-upload-sheet" id="documents-upload-form"><div class="documents-upload-head"><div><small>DOCUMENTI</small><h3>Aggiungi documento</h3></div><button type="button" class="documents-upload-close" aria-label="Chiudi">×</button></div><label class="documents-field"><span>Associa a</span><select id="documents-upload-target">${docsOnlyOptions + tripOptions}</select></label><label class="documents-field"><span>Di chi è</span><select id="documents-upload-owner"><option value="both">Entrambi</option><option value="lorenzo">Lorenzo</option><option value="fortuna">Fortuna</option></select></label><label class="documents-field"><span>Nome del documento</span><input id="documents-upload-name" type="text" maxlength="80" placeholder="Es. Prenotazione volo United"></label><label class="documents-field"><span>File</span><input id="documents-upload-file" type="file" accept="application/pdf,image/*" required></label><button class="documents-upload-save" type="submit">Salva e condividi</button></form>`;
      document.body.appendChild(backdrop);
      backdrop.querySelector(".documents-upload-close")?.addEventListener("click",closeDocumentsUpload);
      backdrop.addEventListener("click",e => { if (e.target === backdrop) closeDocumentsUpload(); });
      backdrop.querySelector("#documents-upload-form")?.addEventListener("submit", async e => {
        e.preventDefault();
        const targetSelect = backdrop.querySelector("#documents-upload-target");
        const selected = targetSelect.options[targetSelect.selectedIndex];
        const file = backdrop.querySelector("#documents-upload-file")?.files?.[0];
        if (!selected || !file) return;
        const save = backdrop.querySelector(".documents-upload-save");
        save.disabled = true; save.textContent = "Salvataggio…";
        const typedName = String(backdrop.querySelector("#documents-upload-name")?.value || "").trim();
        const label = typedName || file.name.replace(/\.[^.]+$/,"");
        try {
          const localId = await saveDocumentFromHub(file,{ legId:selected.dataset.legId, targetKey:selected.value, targetLabel:selected.dataset.targetLabel || selected.textContent, owner:backdrop.querySelector("#documents-upload-owner")?.value || "both", label });
          closeDocumentsUpload();
          window.dispatchEvent(new CustomEvent("lf-local-ticket-changed",{detail:{localId,legId:selected.dataset.legId}}));
          await renderDocumentsScreen();
        } catch(err){ console.error("Salvataggio documento:",err); save.disabled = false; save.textContent = "Salva e condividi"; alert("Non sono riuscito a salvare il documento."); }
      });
    }

    function ensureDocumentsScreen(){
      if (document.getElementById("screen-documents")) return;
      const screen = document.createElement("section");
      screen.className = "screen"; screen.id = "screen-documents"; document.querySelector("main")?.appendChild(screen);
    }

    function openDocumentsScreen(pushHistory=true){
      if (!window.LFBudget?.isAuthenticated?.()) { if (typeof openPrivateAccess === "function") openPrivateAccess(pushHistory); return; }
      ensureDocumentsScreen(); renderDocumentsScreen();
      if (typeof navigateTo === "function") navigateTo("documents",{},pushHistory); else if (typeof showScreen === "function") showScreen("documents");
    }
    window.openDocumentsScreen = openDocumentsScreen;

    function setupBottomNavigation(){
      const nav = document.querySelector("nav.tabbar");
      const oldTikTok = document.getElementById("tiktok-tab");
      const sos = document.getElementById("sos-tab");
      if (!nav || !oldTikTok || !sos) return;
      if (!document.getElementById("documents-tab")) {
        const docs = document.createElement("button");
        docs.id = "documents-tab"; docs.type = "button"; docs.dataset.screen = "documents"; docs.hidden = true; docs.style.setProperty("display","none","important"); docs.setAttribute("aria-label","Documenti di viaggio"); docs.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h6l2 2h8v14H4z"/><path d="M8 11h8M8 15h6"/></svg>Documenti`;
        nav.insertBefore(docs,sos);
        docs.addEventListener("click",e => { e.preventDefault(); e.stopImmediatePropagation(); openDocumentsScreen(true); },true);
      }
      oldTikTok.classList.add("lf-hidden-tiktok-trigger"); oldTikTok.hidden = true; if (oldTikTok.parentElement === nav) document.body.appendChild(oldTikTok);
    }

    function setupMainMenu(){
      const panel = document.getElementById("theme-panel");
      if (!panel || panel.dataset.lfMenuUpdated === "1") return;
      panel.dataset.lfMenuUpdated = "1";
      const themeButtons = Array.from(panel.querySelectorAll(".theme-choice[data-theme-choice]"));
      const intro = panel.querySelector(".theme-panel-intro");
      if (themeButtons.length) {
        const details = document.createElement("details"); details.className = "lf-theme-submenu";
        const summary = document.createElement("summary"); summary.innerHTML = `<span>🎨 Temi</span>`;
        const inner = document.createElement("div"); inner.className = "lf-theme-submenu-inner";
        if (intro) inner.appendChild(intro); themeButtons.forEach(btn => inner.appendChild(btn)); details.append(summary,inner);
        const checklist = document.getElementById("archived-checklist-btn"); panel.insertBefore(details,checklist || null);
      }
      const checklist = document.getElementById("archived-checklist-btn"); if (checklist) checklist.hidden = false;
      const shortcuts = document.createElement("div"); shortcuts.className = "lf-menu-shortcuts"; shortcuts.id = "lf-private-menu-shortcuts"; shortcuts.hidden = true; shortcuts.style.setProperty("display","none","important");
      shortcuts.innerHTML = `<button type="button" class="lf-menu-shortcut" data-lf-shortcut="tiktok"><span>♪</span><strong>Consigli TikTok</strong><b>›</b></button><button type="button" class="lf-menu-shortcut" data-lf-shortcut="program"><span>🗓️</span><strong>Programma</strong><b>›</b></button><button type="button" class="lf-menu-shortcut" data-lf-shortcut="budget"><span>💰</span><strong>Budget</strong><b>›</b></button><button type="button" class="lf-menu-shortcut" data-lf-shortcut="documents"><span>📁</span><strong>Documenti</strong><b>›</b></button><button type="button" class="lf-menu-shortcut" data-lf-shortcut="sos"><span>🆘</span><strong>SOS</strong><b>›</b></button>`;
      panel.appendChild(shortcuts);
      shortcuts.querySelectorAll("[data-lf-shortcut]").forEach(btn => btn.addEventListener("click",() => { const target = btn.dataset.lfShortcut; if (typeof closeThemePanel === "function") closeThemePanel(); if (target === "tiktok") { document.getElementById("tiktok-tab")?.click(); return; } if (target === "program") { document.querySelector('nav.tabbar button[data-screen="program"]')?.click(); return; } if (target === "budget") { document.getElementById("budget-tab")?.click(); return; } if (target === "documents") { openDocumentsScreen(true); return; } if (target === "sos") document.getElementById("sos-tab")?.click(); }));
    }

    if (typeof window.updateChecklistArchiveEntry === "function") window.updateChecklistArchiveEntry = function(){ const btn = document.getElementById("archived-checklist-btn"); if (btn) btn.hidden = false; };

    function applyPrivateNavigationState(authenticated){
      const docs = document.getElementById("documents-tab");
      const shortcuts = document.getElementById("lf-private-menu-shortcuts");
      if (docs) { docs.hidden = !authenticated; if (authenticated) docs.style.removeProperty("display"); else docs.style.setProperty("display","none","important"); }
      if (shortcuts) { shortcuts.hidden = !authenticated; if (authenticated) shortcuts.style.removeProperty("display"); else shortcuts.style.setProperty("display","none","important"); }
      const checklist = document.getElementById("archived-checklist-btn"); if (checklist) checklist.hidden = false;
      if (!authenticated && document.getElementById("screen-documents")?.classList.contains("active")) if (typeof openPrivateAccess === "function") openPrivateAccess(false);
    }

    if (typeof window.renderLocalTickets === "function" && !window.renderLocalTickets.__insuranceMovedToSOS) {
      const baseRenderLocalTickets = window.renderLocalTickets;
      const wrappedRenderLocalTickets = async function(legId){
        const result = await baseRenderLocalTickets.apply(this,arguments);
        if (legId === "sfo") document.querySelectorAll("#local-tickets-sfo .local-ticket-card").forEach(card => { const text = normalizeKey(card.textContent || ""); if (text.includes("assicurazione viaggio") || text.includes("204765892")) card.remove(); });
        return result;
      };
      wrappedRenderLocalTickets.__insuranceMovedToSOS = true;
      window.renderLocalTickets = wrappedRenderLocalTickets;
    }

    ensureDocumentsScreen(); setupBottomNavigation(); setupMainMenu(); stripStaticTicketSummaries(); applyPrivateNavigationState(!!window.LFBudget?.isAuthenticated?.());
    if (window.LFBudget?.onAuth) window.LFBudget.onAuth(state => applyPrivateNavigationState(!!state?.authenticated));
    window.addEventListener("lf-auth-changed",e => applyPrivateNavigationState(!!e.detail?.authenticated));
    window.addEventListener("lf-local-ticket-changed",() => { if (document.getElementById("screen-documents")?.classList.contains("active")) setTimeout(renderDocumentsScreen,150); if (document.getElementById("screen-sos")?.classList.contains("active")) setTimeout(patchInsuranceSOS,150); });
    if (window.LFBudget?.onTickets) window.LFBudget.onTickets(() => { if (document.getElementById("screen-documents")?.classList.contains("active")) setTimeout(renderDocumentsScreen,900); if (document.getElementById("screen-sos")?.classList.contains("active")) setTimeout(patchInsuranceSOS,900); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installUi, { once:true });
  else installUi();
})();
