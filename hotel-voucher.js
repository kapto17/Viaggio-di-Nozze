/* 2.4.55 · Voucher hotel condiviso nel box Alloggio */
(() => {
  let authBound = false;
  let ticketsBound = false;

  const FALLBACK_LEGS = {
    "San Francisco": "sfo",
    "Los Angeles": "la",
    "Page": "page",
    "Chicago": "chicago",
    "Bayahibe": "bayahibe"
  };

  function isAuthenticated(){
    return !!window.LFBudget?.isAuthenticated?.();
  }

  function currentLegId(){
    const fromState = history.state?.legId;
    if (fromState) return fromState;

    const screen = document.getElementById("screen-city-detail");
    if (!screen?.classList.contains("active")) return "";
    const city = screen.querySelector(".city-detail-hero h2, .cd-hero h2, h2")?.textContent?.trim() || "";
    if (city === "Las Vegas") {
      const dates = screen.querySelector(".cd-dates")?.textContent || "";
      return /27\s*ott/i.test(dates) ? "vegas1" : "vegas2";
    }
    return FALLBACK_LEGS[city] || "";
  }

  function voucherLabel(hotelName){
    return `Voucher hotel · ${hotelName || "Alloggio"}`;
  }

  function fallbackNormalize(value){
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function voucherTargetKey(legId, hotelName){
    const label = voucherLabel(hotelName);
    if (typeof window.ticketKey === "function") return window.ticketKey(legId, label);
    return `${legId}::${fallbackNormalize(label)}`;
  }

  async function ticketsFor(targetKey){
    if (typeof window.getTicketsForTarget === "function") {
      return await window.getTicketsForTarget(targetKey);
    }
    if (typeof window.openTicketDb !== "function") return [];
    const db = await window.openTicketDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction("tickets", "readonly");
      const req = tx.objectStore("tickets").index("targetKey").getAll(targetKey);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveVoucher(legId, hotelName, file){
    if (typeof window.openTicketDb !== "function") throw new Error("Archivio biglietti non disponibile");
    const db = await window.openTicketDb();
    const targetLabel = voucherLabel(hotelName);
    const targetKey = voucherTargetKey(legId, hotelName);
    const rec = {
      legId,
      label: targetLabel,
      owner: "both",
      targetKey,
      targetLabel,
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      createdAt: Date.now(),
      cloudId: "",
      syncPending: true,
      blob: file
    };
    return await new Promise((resolve, reject) => {
      const tx = db.transaction("tickets", "readwrite");
      const req = tx.objectStore("tickets").add(rec);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function refreshButton(btn){
    if (!btn) return;
    const auth = isAuthenticated();
    btn.hidden = !auth;
    if (!auth) return;

    try {
      const found = await ticketsFor(btn.dataset.hotelVoucherTarget || "");
      const hasVoucher = found.length > 0;
      btn.dataset.hasVoucher = hasVoucher ? "1" : "0";
      btn.classList.toggle("is-ready", hasVoucher);
      btn.textContent = hasVoucher ? "🎟️ Apri voucher" : "📎 Aggiungi voucher";
    } catch (err) {
      console.error("Stato voucher hotel:", err);
      btn.textContent = "🎟️ Voucher hotel";
    }
  }

  async function decorateCurrentHotel(){
    const screen = document.getElementById("screen-city-detail");
    if (!screen?.classList.contains("active")) return;
    const card = screen.querySelector(".hotel-card");
    const mapLink = card?.querySelector("a.hotel-map");
    const hotelName = card?.querySelector(".hotel-name")?.textContent?.trim() || "";
    const legId = currentLegId();
    if (!card || !mapLink || !hotelName || !legId) return;

    let actions = card.querySelector(".hotel-voucher-actions");
    if (!actions) {
      actions = document.createElement("div");
      actions.className = "hotel-voucher-actions";
      mapLink.parentNode.insertBefore(actions, mapLink);
      actions.appendChild(mapLink);
    }

    let button = actions.querySelector(".hotel-voucher-btn");
    let input = actions.querySelector(".hotel-voucher-input");
    const targetKey = voucherTargetKey(legId, hotelName);
    const targetLabel = voucherLabel(hotelName);

    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "mapbtn hotel-map hotel-voucher-btn";
      button.hidden = true;
      actions.appendChild(button);
    }
    if (!input) {
      input = document.createElement("input");
      input.type = "file";
      input.accept = "application/pdf,image/*";
      input.className = "hotel-voucher-input";
      actions.appendChild(input);
    }

    button.dataset.hotelVoucherLeg = legId;
    button.dataset.hotelVoucherHotel = hotelName;
    button.dataset.hotelVoucherTarget = targetKey;
    button.dataset.hotelVoucherLabel = targetLabel;

    if (button.dataset.hotelVoucherBound !== "1") {
      button.dataset.hotelVoucherBound = "1";
      button.addEventListener("click", async () => {
        if (!isAuthenticated()) return;
        button.disabled = true;
        try {
          const found = await ticketsFor(button.dataset.hotelVoucherTarget || "");
          if (found.length) {
            button.disabled = false;
            if (typeof window.openTicketsForTarget === "function") {
              await window.openTicketsForTarget(button.dataset.hotelVoucherTarget, button.dataset.hotelVoucherLabel || "Voucher hotel");
            }
            return;
          }
          input.click();
        } catch (err) {
          console.error("Apertura voucher hotel:", err);
          alert("Non sono riuscito ad aprire il voucher dell'hotel.");
        } finally {
          button.disabled = false;
        }
      });
    }

    if (input.dataset.hotelVoucherBound !== "1") {
      input.dataset.hotelVoucherBound = "1";
      input.addEventListener("change", async () => {
        const file = input.files?.[0];
        if (!file) return;
        if (!isAuthenticated()) {
          input.value = "";
          return;
        }
        const original = button.textContent;
        button.disabled = true;
        button.textContent = "Salvataggio…";
        try {
          const localId = await saveVoucher(button.dataset.hotelVoucherLeg, button.dataset.hotelVoucherHotel, file);
          input.value = "";
          button.dataset.hasVoucher = "1";
          button.classList.add("is-ready");
          button.textContent = "🎟️ Apri voucher";
          if (typeof window.renderLocalTickets === "function") await window.renderLocalTickets(button.dataset.hotelVoucherLeg);
          if (typeof window.decorateTicketButtons === "function") await window.decorateTicketButtons(document);
          window.dispatchEvent(new CustomEvent("lf-local-ticket-changed", {
            detail:{ localId, legId:button.dataset.hotelVoucherLeg }
          }));
        } catch (err) {
          console.error("Salvataggio voucher hotel:", err);
          button.textContent = original || "📎 Aggiungi voucher";
          alert("Non sono riuscito a salvare il voucher dell'hotel.");
        } finally {
          button.disabled = false;
        }
      });
    }

    await refreshButton(button);
  }

  function scheduleDecorate(delay=0){
    setTimeout(() => { decorateCurrentHotel().catch(err => console.error("Voucher hotel:", err)); }, delay);
  }

  function bindFirebase(){
    if (!window.LFBudget) return;
    if (!authBound && typeof window.LFBudget.onAuth === "function") {
      authBound = true;
      window.LFBudget.onAuth(() => scheduleDecorate(0));
    }
    if (!ticketsBound && typeof window.LFBudget.onTickets === "function") {
      ticketsBound = true;
      window.LFBudget.onTickets(() => scheduleDecorate(900));
    }
  }

  document.addEventListener("click", e => {
    if (e.target.closest?.("[data-leg], nav.tabbar button, .back-btn")) scheduleDecorate(0);
  });
  window.addEventListener("popstate", () => scheduleDecorate(0));
  window.addEventListener("pageshow", () => scheduleDecorate(0));
  window.addEventListener("lf-local-ticket-changed", () => scheduleDecorate(150));
  window.addEventListener("lf-firebase-ready", () => {
    bindFirebase();
    scheduleDecorate(0);
  });

  bindFirebase();
  scheduleDecorate(0);
  window.LFHotelVoucher = { refresh: decorateCurrentHotel };
})();
