/* V45 · Wizard caricamento biglietti + sync in background */
(() => {
  const pending = new Map();
  const OWNER_LABELS = {
    lorenzo: "Lorenzo",
    fortuna: "Fortuna",
    both: "Entrambi"
  };

  function cleanName(value){
    return String(value || "").replace(/[<>]/g, "").trim();
  }

  function ownerLabel(owner){
    return OWNER_LABELS[owner] || "";
  }

  async function saveTicketWithMeta(legId, file, label, targetKey, targetLabel, owner, cloudId=""){
    const db = await openTicketDb();
    const rec = {
      legId,
      label: cleanName(label) || file.name,
      owner: ["lorenzo","fortuna","both"].includes(owner) ? owner : "both",
      targetKey,
      targetLabel,
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      createdAt: Date.now(),
      cloudId: cloudId || "",
      syncPending: !cloudId,
      blob: file
    };
    return new Promise((resolve, reject) => {
      const tx = db.transaction("tickets", "readwrite");
      const req = tx.objectStore("tickets").add(rec);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function markTicketShared(localId, cloudId){
    const db = await openTicketDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("tickets", "readwrite");
      const store = tx.objectStore("tickets");
      const req = store.get(Number(localId));
      req.onsuccess = () => {
        const rec = req.result;
        if(!rec){ resolve(); return; }
        rec.cloudId = cloudId;
        rec.syncPending = false;
        const put = store.put(rec);
        put.onsuccess = () => resolve();
        put.onerror = () => reject(put.error);
      };
      req.onerror = () => reject(req.error);
    });
  }

  function cloudErrorMessage(err){
    const code = String(err?.code || "");
    if(code.includes("unauthorized") || code.includes("permission-denied")){
      return "Firebase sta bloccando l'accesso ai biglietti condivisi. Il file resta salvato su questo telefono e verrà sincronizzato appena sistemiamo i permessi.";
    }
    if(code.includes("storage/bucket-not-found") || code.includes("storage/unknown")){
      return "Firebase Storage non risulta disponibile. Il file resta salvato su questo telefono e verrà sincronizzato appena abilitiamo lo spazio condiviso.";
    }
    if(!navigator.onLine){
      return "Sei offline: il biglietto è stato salvato sul telefono e verrà condiviso automaticamente quando tornerà la connessione.";
    }
    return "Il biglietto è stato salvato sul telefono, ma la sincronizzazione non è riuscita. Riproveremo automaticamente.";
  }

  function closeMetaDialog(){
    document.querySelector(".ticket-meta-backdrop")?.remove();
  }

  function openMetaDialog(legId, select, input){
    closeMetaDialog();

    const backdrop = document.createElement("div");
    backdrop.className = "ticket-meta-backdrop";
    backdrop.innerHTML = `
      <div class="ticket-meta-sheet ticket-wizard-sheet" role="dialog" aria-modal="true" aria-label="Carica biglietto">
        <div class="ticket-meta-handle"></div>
        <div class="ticket-meta-head">
          <div><small>🎟️ CARICA BIGLIETTO</small><h3>Nuovo documento</h3></div>
          <button type="button" class="ticket-meta-close" aria-label="Chiudi">×</button>
        </div>
        <div class="ticket-wizard-progress" aria-label="Avanzamento caricamento">
          <b class="active" data-progress-step="1">1</b><i></i><b data-progress-step="2">2</b><i></i><b data-progress-step="3">3</b>
        </div>

        <section class="ticket-wizard-step" data-wizard-step="1">
          <div class="ticket-wizard-kicker">PASSO 1 DI 3</div>
          <h4>A cosa appartiene?</h4>
          <p>Collega il documento alla prenotazione o al trasporto giusto.</p>
          <label class="ticket-meta-field">
            <span>Prenotazione / attività</span>
            <select class="ticket-wizard-target">${select.innerHTML}</select>
          </label>
          <button type="button" class="ticket-meta-confirm" data-wizard-next="1">Continua</button>
        </section>

        <section class="ticket-wizard-step" data-wizard-step="2" hidden>
          <div class="ticket-wizard-kicker">PASSO 2 DI 3</div>
          <h4>Di chi è e come si chiama?</h4>
          <p>Il nome sarà quello mostrato nell’app, indipendentemente dal nome del PDF.</p>
          <div class="ticket-meta-label">Proprietario</div>
          <div class="ticket-owner-grid" role="group" aria-label="Proprietario biglietto">
            <button type="button" data-ticket-owner="lorenzo"><b>L</b><span>Lorenzo</span></button>
            <button type="button" data-ticket-owner="fortuna"><b>F</b><span>Fortuna</span></button>
            <button type="button" data-ticket-owner="both"><b>L+F</b><span>Entrambi</span></button>
          </div>
          <label class="ticket-meta-field ticket-wizard-name-field">
            <span>Nome del documento</span>
            <input class="ticket-wizard-name" type="text" maxlength="80" autocomplete="off" placeholder="Es. Volo andata Lorenzo">
          </label>
          <div class="ticket-wizard-nav">
            <button type="button" class="ticket-wizard-back" data-wizard-back="2">Indietro</button>
            <button type="button" class="ticket-meta-confirm" data-wizard-next="2">Continua</button>
          </div>
        </section>

        <section class="ticket-wizard-step" data-wizard-step="3" hidden>
          <div class="ticket-wizard-kicker">PASSO 3 DI 3</div>
          <h4>Scegli il file</h4>
          <p>Controlla i dati e poi seleziona il PDF o l’immagine dal telefono.</p>
          <div class="ticket-wizard-summary">
            <div><span>Associato a</span><strong class="ticket-summary-target">—</strong></div>
            <div><span>Di chi è</span><strong class="ticket-summary-owner">—</strong></div>
            <div><span>Nome</span><strong class="ticket-summary-name">—</strong></div>
          </div>
          <div class="ticket-wizard-nav">
            <button type="button" class="ticket-wizard-back" data-wizard-back="3">Indietro</button>
            <button type="button" class="ticket-meta-confirm ticket-wizard-file">📎 Scegli file e carica</button>
          </div>
        </section>
      </div>`;

    document.body.appendChild(backdrop);
    const targetSelect = backdrop.querySelector(".ticket-wizard-target");
    const nameInput = backdrop.querySelector(".ticket-wizard-name");
    let owner = "";
    let targetKey = "";
    let targetLabel = "";
    let name = "";

    function showStep(step){
      backdrop.querySelectorAll("[data-wizard-step]").forEach(el => el.hidden = Number(el.dataset.wizardStep) !== step);
      backdrop.querySelectorAll("[data-progress-step]").forEach(el => {
        const n = Number(el.dataset.progressStep);
        el.classList.toggle("active", n === step);
        el.classList.toggle("done", n < step);
      });
      if(step === 2) requestAnimationFrame(() => nameInput.focus());
    }

    backdrop.querySelectorAll("[data-ticket-owner]").forEach(btn => {
      btn.addEventListener("click", () => {
        owner = btn.dataset.ticketOwner;
        backdrop.querySelectorAll("[data-ticket-owner]").forEach(x => x.classList.toggle("active", x === btn));
      });
    });

    backdrop.querySelector('[data-wizard-next="1"]').addEventListener("click", () => {
      targetKey = targetSelect.value;
      const opt = targetSelect.options[targetSelect.selectedIndex];
      targetLabel = opt?.dataset?.label || opt?.textContent || "";
      if(!targetKey){
        targetSelect.classList.add("ticket-meta-error");
        targetSelect.focus();
        return;
      }
      targetSelect.classList.remove("ticket-meta-error");
      nameInput.placeholder = targetLabel && targetLabel !== "Altro" ? `Es. ${targetLabel} Lorenzo` : "Es. Volo andata Lorenzo";
      showStep(2);
    });

    backdrop.querySelector('[data-wizard-next="2"]').addEventListener("click", () => {
      name = cleanName(nameInput.value);
      if(!owner){
        backdrop.querySelector(".ticket-owner-grid").classList.add("ticket-owner-error");
        return;
      }
      backdrop.querySelector(".ticket-owner-grid").classList.remove("ticket-owner-error");
      if(!name){
        nameInput.classList.add("ticket-meta-error");
        nameInput.focus();
        return;
      }
      nameInput.classList.remove("ticket-meta-error");
      backdrop.querySelector(".ticket-summary-target").textContent = targetLabel || "Altro";
      backdrop.querySelector(".ticket-summary-owner").textContent = ownerLabel(owner);
      backdrop.querySelector(".ticket-summary-name").textContent = name;
      showStep(3);
    });

    backdrop.querySelectorAll("[data-wizard-back]").forEach(btn => btn.addEventListener("click", () => {
      showStep(Number(btn.dataset.wizardBack) - 1);
    }));

    backdrop.querySelector(".ticket-wizard-file").addEventListener("click", () => {
      select.value = targetKey;
      pending.set(input.id, {legId, name, owner, targetKey, targetLabel});
      input.multiple = false;
      closeMetaDialog();
      input.click();
    });

    backdrop.querySelector(".ticket-meta-close").addEventListener("click", closeMetaDialog);
    backdrop.addEventListener("click", e => { if(e.target === backdrop) closeMetaDialog(); });
    showStep(1);
  }

  async function decorateTicketList(legId){
    const host = document.getElementById(`local-tickets-${legId}`);
    if(!host || typeof getLocalTickets !== "function") return;
    const tickets = await getLocalTickets(legId);
    const cards = Array.from(host.querySelectorAll(".local-ticket-card"));
    cards.forEach((card, index) => {
      const rec = tickets[index];
      if(!rec) return;
      const name = card.querySelector(".local-ticket-name");
      if(!name) return;
      if(rec.owner && !card.querySelector(".ticket-owner-badge")){
        const badge = document.createElement("span");
        badge.className = `ticket-owner-badge owner-${rec.owner}`;
        badge.textContent = ownerLabel(rec.owner);
        name.insertAdjacentElement("afterend", badge);
      }
      if(!card.querySelector(".ticket-sync-badge")){
        const sync = document.createElement("span");
        sync.className = `ticket-sync-badge ${rec.cloudId ? "is-shared" : "is-pending"}`;
        sync.textContent = rec.cloudId ? "☁ Condiviso" : "↻ Da sincronizzare";
        (card.querySelector(".ticket-owner-badge") || name).insertAdjacentElement("afterend", sync);
      }
    });
  }

  if(typeof window.renderLocalTickets === "function"){
    const baseRender = window.renderLocalTickets;
    window.renderLocalTickets = async function(legId){
      const result = await baseRender(legId);
      await decorateTicketList(legId);
      return result;
    };
  }

  if(typeof window.openTicketsForTarget === "function"){
    window.openTicketsForTarget = async function(targetKey, targetLabel="Biglietti"){
      if(!window.LFBudget?.isAuthenticated?.()){
        alert("I file dei biglietti sono nell'area privata L&F. Accedi prima dal Budget.");
        return;
      }
      const popup = typeof openTicketPlaceholder === "function" ? openTicketPlaceholder() : null;
      const tickets = await getTicketsForTarget(targetKey);
      if(!tickets.length){ try{ popup?.close(); }catch(_){} return; }
      if(tickets.length === 1){ await openTicketRecord(tickets[0], popup); return; }
      try{ popup?.close(); }catch(_){}

      document.getElementById("ticket-picker-dialog")?.remove();
      const dlg = document.createElement("dialog");
      dlg.id = "ticket-picker-dialog";
      dlg.className = "ticket-picker-meta";
      dlg.innerHTML = `<div class="ticket-picker-meta-inner">
        <div class="ticket-picker-eyebrow">🎟️ BIGLIETTI</div>
        <h3>${escapeHtml(targetLabel)}</h3>
        ${tickets.map(t => `<button type="button" data-pick-ticket="${t.id}">
          <span>📄</span><div><strong>${escapeHtml(t.label || t.fileName)}</strong>${t.owner ? `<small>${escapeHtml(ownerLabel(t.owner))}${t.cloudId ? " · Condiviso" : " · Solo locale"}</small>` : ""}</div><b>›</b>
        </button>`).join("")}
        <button type="button" class="ticket-picker-close" data-close-ticket-dialog>Chiudi</button>
      </div>`;
      document.body.appendChild(dlg);
      dlg.querySelector("[data-close-ticket-dialog]").onclick = () => dlg.close();
      dlg.querySelectorAll("[data-pick-ticket]").forEach(btn => btn.onclick = async () => {
        const popup = typeof openTicketPlaceholder === "function" ? openTicketPlaceholder() : null;
        try{
          const rec = await getLocalTicket(btn.dataset.pickTicket);
          dlg.close();
          await openTicketRecord(rec, popup);
        }catch(err){
          console.error("Apertura biglietto:", err);
          try{ popup?.close(); }catch(_){}
          alert("Non sono riuscito ad aprire il biglietto su questo dispositivo.");
        }
      });
      dlg.addEventListener("close", () => dlg.remove());
      dlg.showModal();
    };
  }

  document.addEventListener("click", e => {
    const button = e.target.closest?.('button[id^="ticket-import-"]');
    if(!button) return;
    const legId = button.id.replace("ticket-import-", "");
    const select = document.getElementById(`ticket-target-${legId}`);
    const input = document.getElementById(`ticket-file-${legId}`);
    if(!select || !input) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    if(!window.LFBudget?.isAuthenticated?.()){
      alert("Per caricare e condividere i biglietti devi prima accedere all'area privata L&F dal Budget.");
      return;
    }
    openMetaDialog(legId, select, input);
  }, true);

  document.addEventListener("change", async e => {
    const input = e.target.closest?.("input.ticket-file-input");
    if(!input) return;
    const meta = pending.get(input.id);
    if(!meta) return;

    e.stopImmediatePropagation();
    const file = input.files?.[0];
    if(!file){ pending.delete(input.id); return; }

    const button = document.getElementById(`ticket-import-${meta.legId}`);
    if(button){ button.disabled = true; button.textContent = "Salvataggio…"; }
    try{
      const localId = await saveTicketWithMeta(meta.legId, file, meta.name, meta.targetKey, meta.targetLabel, meta.owner, "");
      input.value = "";
      pending.delete(input.id);
      await renderLocalTickets(meta.legId);
      if(typeof decorateTicketButtons === "function") await decorateTicketButtons(document);
      // Il cloud parte dopo: il file deve restare subito usabile sul telefono.
      window.dispatchEvent(new CustomEvent("lf-local-ticket-changed", { detail:{ localId, legId:meta.legId } }));
    }catch(err){
      console.error(err);
      alert("Non sono riuscito a salvare il file sul telefono.");
    }finally{
      if(button){ button.disabled = false; button.textContent = "＋ Carica biglietto"; }
    }
  }, true);
})();
