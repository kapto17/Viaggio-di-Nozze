/* 2.4.69 · Correzioni isolate della sezione OGGI.
   Nessuna modifica a itinerari, Budget, Documenti o dati del viaggio. */
(() => {
  const normalize = value => String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  function fixHomeTodayCard(){
    const card = document.querySelector("#screen-home .today-card.today-image-card");
    if (!card) return;

    // Inline !important: prevale sui background generali dei temi senza alterare le altre card.
    card.style.setProperty("background-image", "var(--today-bg)", "important");
    card.style.setProperty("background-color", "#253247", "important");
    card.style.setProperty("background-size", "cover", "important");
    card.style.setProperty("background-position", "center", "important");
    card.style.setProperty("background-repeat", "no-repeat", "important");
    card.style.setProperty("color", "#fff", "important");
    card.style.setProperty("border", "0", "important");

    const shade = card.querySelector(".today-preview-shade");
    shade?.style.setProperty("background", "linear-gradient(90deg,rgba(7,15,27,.66),rgba(7,15,27,.16))", "important");

    card.querySelectorAll(".today-preview-content,.today-preview-content small,.today-preview-content strong,.today-preview-content em,.today-preview-arrow")
      .forEach(el => el.style.setProperty("color", "#fff", "important"));
    card.querySelector(".today-preview-content")?.style.setProperty("border-top", "0", "important");
  }

  function scheduleHomeFix(){
    [0, 80, 500, 1400].forEach(delay => setTimeout(fixHomeTodayCard, delay));
  }

  function voucherLabel(hotelName){
    return `Voucher hotel · ${hotelName || "Alloggio"}`;
  }

  function voucherTargetKey(legId, hotelName){
    const label = voucherLabel(hotelName);
    if (typeof window.ticketKey === "function") return window.ticketKey(legId, label);
    return `${legId}::${normalize(label)}`;
  }

  function ensureVoucherStyle(){
    if (document.getElementById("lf-today-voucher-style")) return;
    const style = document.createElement("style");
    style.id = "lf-today-voucher-style";
    style.textContent = `
      .today-hotel-voucher-quick{margin:-2px 0 14px}
      .today-hotel-voucher-btn{width:100%;display:grid;grid-template-columns:38px 1fr auto;gap:10px;align-items:center;padding:11px 13px;border:1px solid rgba(22,35,63,.12);border-radius:15px;background:rgba(255,255,255,.92);color:#16233f;font:inherit;text-align:left;cursor:pointer;box-shadow:0 8px 22px -19px rgba(22,35,63,.45)}
      .today-hotel-voucher-btn>span{width:38px;height:38px;display:grid;place-items:center;border-radius:12px;background:#f1eadb;font-size:19px}
      .today-hotel-voucher-btn>div{min-width:0}
      .today-hotel-voucher-btn small{display:block;font-size:8.5px;font-weight:900;letter-spacing:.08em;color:#5d6676}
      .today-hotel-voucher-btn strong{display:block;margin-top:2px;font-size:12.5px;line-height:1.25;color:#16233f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .today-hotel-voucher-btn>b{font-size:22px;opacity:.55}
      .today-hotel-voucher-btn:disabled{opacity:.58;cursor:default}
    `;
    document.head.appendChild(style);
  }

  async function refreshTodayHotelVoucher(){
    const screen = document.getElementById("screen-today");
    if (!screen?.classList.contains("active")) return;

    ensureVoucherStyle();
    const existing = screen.querySelector(".today-hotel-voucher-quick");
    if (!window.LFBudget?.isAuthenticated?.()) {
      existing?.remove();
      return;
    }

    const legId = screen.dataset.legId || "";
    const leg = typeof TRIP !== "undefined" ? TRIP.legs?.find?.(item => item.id === legId) : null;
    const hotelName = leg?.hotel?.name || "";
    if (!legId || !hotelName) {
      existing?.remove();
      return;
    }

    const targetLabel = voucherLabel(hotelName);
    const targetKey = voucherTargetKey(legId, hotelName);
    let records = [];
    try {
      if (typeof window.getTicketsForTarget === "function") {
        records = await window.getTicketsForTarget(targetKey);
      }
    } catch (err) {
      console.error("Voucher hotel in Oggi:", err);
    }

    if (!records.length) {
      existing?.remove();
      return;
    }

    let host = existing;
    if (!host) {
      const hero = screen.querySelector(".today-screen-hero");
      if (!hero) return;
      host = document.createElement("div");
      host.className = "today-hotel-voucher-quick";
      hero.insertAdjacentElement("afterend", host);
    }

    host.innerHTML = `<button type="button" class="today-hotel-voucher-btn"><span>🏨</span><div><small>ALLOGGIO DI OGGI</small><strong>🎟️ Apri voucher · ${hotelName}</strong></div><b>›</b></button>`;
    const button = host.querySelector(".today-hotel-voucher-btn");
    button?.addEventListener("click", async () => {
      if (typeof window.openTicketsForTarget !== "function") return;
      button.disabled = true;
      try {
        await window.openTicketsForTarget(targetKey, targetLabel);
      } catch (err) {
        console.error("Apertura voucher hotel da Oggi:", err);
        alert("Non sono riuscito ad aprire il voucher dell'hotel.");
      } finally {
        button.disabled = false;
      }
    });
  }

  function scheduleVoucherFix(){
    [0, 120, 600, 1500].forEach(delay => setTimeout(() => {
      refreshTodayHotelVoucher().catch(err => console.error("Voucher Oggi:", err));
    }, delay));
  }

  document.addEventListener("click", event => {
    if (event.target.closest?.("[data-open-today-screen]")) scheduleVoucherFix();
    if (event.target.closest?.('nav.tabbar button[data-screen="home"]')) scheduleHomeFix();
  });

  window.addEventListener("pageshow", () => { scheduleHomeFix(); scheduleVoucherFix(); });
  window.addEventListener("popstate", () => { scheduleHomeFix(); scheduleVoucherFix(); });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) { scheduleHomeFix(); scheduleVoucherFix(); }
  });
  window.addEventListener("lf-local-ticket-changed", scheduleVoucherFix);
  window.addEventListener("lf-firebase-ready", () => {
    scheduleHomeFix();
    scheduleVoucherFix();
    if (window.LFBudget?.onAuth) window.LFBudget.onAuth(() => { scheduleHomeFix(); scheduleVoucherFix(); });
    if (window.LFBudget?.onTickets) window.LFBudget.onTickets(scheduleVoucherFix);
  });

  // Firebase può essere già pronto quando questo file viene caricato.
  if (window.LFBudget?.onAuth) window.LFBudget.onAuth(() => { scheduleHomeFix(); scheduleVoucherFix(); });
  if (window.LFBudget?.onTickets) window.LFBudget.onTickets(scheduleVoucherFix);

  scheduleHomeFix();
  scheduleVoucherFix();
})();
