/* v2.4.58 — promemoria OGGI + riepilogo fee budget */
(function installTripUiPatch(){
  const TODAY_REMINDERS = {
    "2026-10-22": [
      { icon:"🧳", title:"Acquista la valigia da stiva", text:"Per il volo di domani SFO → LAX · Alaska AS1369. Acquistala prima di fare il check-in." },
      { icon:"✈️", title:"Fai il check-in online", text:"Alaska Airlines AS1369 · partenza domani alle 10:21. Il check-in è disponibile circa 24 ore prima." }
    ],
    "2026-10-29": [
      { icon:"🧳", title:"Acquista la valigia da stiva", text:"Per il volo di domani LAS → ORD · American Airlines AA1592. Acquistala prima di fare il check-in." },
      { icon:"✈️", title:"Fai il check-in online", text:"American Airlines AA1592 · partenza domani alle 09:58. Il check-in è disponibile circa 24 ore prima." }
    ],
    "2026-11-01": [
      { icon:"🛂", title:"Compila l’E-ticket di ingresso", text:"Repubblica Dominicana · compilalo nelle 72 ore precedenti all’ingresso del 3 novembre." }
    ],
    "2026-11-02": [
      { icon:"✈️", title:"Fai il check-in online", text:"United UA1862 · Chicago → Punta Cana · partenza domani alle 09:17." }
    ],
    "2026-11-08": [
      { icon:"🛂", title:"Compila l’E-ticket di uscita", text:"Repubblica Dominicana · necessario per l’uscita del 9 novembre." },
      { icon:"🚐", title:"Conferma Transfer Ritorno", text:"Conferma circa 24 ore prima l’orario di prelievo dal Viva Dominicus Palace per Punta Cana Airport." },
      { icon:"✈️", title:"Fai il check-in online", text:"United · PUJ → IAD → FCO · partenza domani alle 12:56." }
    ]
  };

  function addStyles(){
    if (document.getElementById("trip-ui-patch-style")) return;
    const style = document.createElement("style");
    style.id = "trip-ui-patch-style";
    style.textContent = `
      .today-reminders-card{margin:16px 0 18px;padding:16px;border:1px solid rgba(176,76,91,.22);border-radius:18px;background:linear-gradient(145deg,#fffaf5,#fff);box-shadow:0 8px 22px -18px rgba(50,35,35,.45)}
      .today-reminders-head{display:flex;align-items:center;gap:9px;margin-bottom:11px}.today-reminders-head span{font-size:20px}.today-reminders-head strong{font-size:15px;letter-spacing:.02em}
      .today-reminder-item{display:grid;grid-template-columns:34px 1fr;gap:10px;padding:11px 0;border-top:1px solid rgba(40,40,40,.08)}.today-reminder-item:first-of-type{border-top:0;padding-top:2px}.today-reminder-icon{width:34px;height:34px;display:grid;place-items:center;border-radius:11px;background:rgba(176,76,91,.08);font-size:18px}.today-reminder-copy strong{display:block;font-size:14px;margin-bottom:3px}.today-reminder-copy span{display:block;font-size:13px;line-height:1.4;opacity:.76}
    `;
    document.head.appendChild(style);
  }

  function remindersHtml(iso){
    const items = TODAY_REMINDERS[iso] || [];
    if (!items.length) return "";
    return `<section class="today-reminders-card" data-today-reminders="${iso}">
      <div class="today-reminders-head"><span>⚠️</span><strong>Da fare oggi</strong></div>
      ${items.map(item => `<div class="today-reminder-item"><div class="today-reminder-icon">${item.icon}</div><div class="today-reminder-copy"><strong>${item.title}</strong><span>${item.text}</span></div></div>`).join("")}
    </section>`;
  }

  function injectTodayReminders(iso){
    const screen = document.getElementById("screen-today");
    if (!screen || !iso) return;
    screen.querySelector(".today-reminders-card")?.remove();
    const html = remindersHtml(iso);
    if (!html) return;
    const program = screen.querySelector(".today-screen-program");
    if (program) program.insertAdjacentHTML("beforebegin", html);
  }

  // openTodayScreen è globale: lo avvolgiamo senza toccare il renderer storico.
  if (typeof window.openTodayScreen === "function" && !window.openTodayScreen.__tripReminderWrapped) {
    const originalOpenTodayScreen = window.openTodayScreen;
    const wrapped = function(legId, iso){
      const result = originalOpenTodayScreen.apply(this, arguments);
      requestAnimationFrame(() => injectTodayReminders(iso));
      return result;
    };
    wrapped.__tripReminderWrapped = true;
    window.openTodayScreen = wrapped;
  }

  function nightsBetween(checkin, checkout){
    const a = new Date(`${checkin}T12:00:00Z`);
    const b = new Date(`${checkout}T12:00:00Z`);
    const value = Math.round((b-a)/86400000);
    return Number.isFinite(value) && value > 0 ? value : 1;
  }

  function knownFeeTotal(){
    if (typeof TRIP === "undefined") return 0;
    return TRIP.legs.reduce((sum, item) => {
      const fee = item.hotel?.hotelFee;
      const perNight = Number(fee?.perNight || 0);
      if (!perNight || !item.hotel?.checkin || !item.hotel?.checkout) return sum;
      return sum + perNight * nightsBetween(item.hotel.checkin, item.hotel.checkout);
    }, 0);
  }

  function patchBudgetFeeSection(){
    const host = document.getElementById("screen-budget");
    if (!host || typeof TRIP === "undefined") return;
    const legs = TRIP.legs.filter(item => item.hotel?.hotelFee);
    const rows = Array.from(host.querySelectorAll(".hotel-fee-row"));
    rows.forEach((row, index) => {
      const fee = legs[index]?.hotel?.hotelFee;
      const value = row.querySelector(".hotel-fee-value");
      if (!fee || !value) return;
      if (Number(fee.perNight) > 0) return;
      value.textContent = fee.status === "none" ? "Nessuna fee" : "Non indicata";
    });

    const total = host.querySelector(".hotel-fees-total strong");
    const note = host.querySelector(".hotel-fees-total small");
    if (total && typeof money === "function") total.textContent = money(knownFeeTotal(), "USD");
    if (note) note.textContent = "Totale delle fee base con importo noto/stimato. Per Chicago restano da aggiungere le tasse sulla facility fee e il CTID 1,5%; le cauzioni non sono costi.";
  }

  if (typeof window.renderBudgetScreen === "function" && !window.renderBudgetScreen.__tripFeeWrapped) {
    const originalRenderBudgetScreen = window.renderBudgetScreen;
    const wrappedBudget = function(){
      const result = originalRenderBudgetScreen.apply(this, arguments);
      requestAnimationFrame(patchBudgetFeeSection);
      return result;
    };
    wrappedBudget.__tripFeeWrapped = true;
    window.renderBudgetScreen = wrappedBudget;
  }

  addStyles();
})();
