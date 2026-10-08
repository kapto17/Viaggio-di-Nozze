/* V43 · Nome/proprietario: salvataggio locale immediato, sync in background */
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
    const opt = select.options[select.selectedIndex];
    const targetKey = select.value;
    const targetLabel = opt?.dataset?.label || opt?.textContent || "";

    const backdrop = document.createElement("div");
    backdrop.className = "ticket-meta-backdrop";
    backdrop.innerHTML = `
      <div class="ticket-meta-sheet" role="dialog" aria-modal="true" aria-label="Nuovo biglietto">
        <div class="ticket-meta-handle"></div>
        <div class="ticket-meta-head">
          <div><small>🎟️ NUOVO BIGLIETTO</small><h3>Come vuoi salvarlo?</h3></div>
          <button type="button" class="ticket-meta-close" aria-label="Chiudi">×</button>
        </div>
        <div class="ticket-meta-linked">Associato a <strong>${escapeHtml(targetLabel)}</strong></div>
        <label class="ticket-meta-field">
          <span>Nome del biglietto</span>
          <input type="text" maxlength="80" autocomplete="off" placeholder="Es. Volo andata Lorenzo" value="${targetLabel === "Altro" ? "" : escapeHtml(targetLabel)}">
        </label>
        <div class="ticket-meta-label">Di chi è?</div>
        <div class="ticket-owner-grid" role="group" aria-label="Proprietario biglietto">
          <button type="button" data-ticket-owner="lorenzo"><b>L</b><span>Lorenzo</span></button>
          <button type="button" data-ticket-owner="fortuna"><b>F</b><span>Fortuna</span></button>
          <button type="button" class="active" data-ticket-owner="both"><b>L+F</b><span>Entrambi</span></button>
        </div>
        <button type="button" class="ticket-meta-confirm">Scegli file</button>
      </div>`;

    document.body.appendChild(backdrop);
    let owner = "both";
    const nameInput = backdrop.querySelector("input");

    backdrop.querySelectorAll("[data-ticket-owner]").forEach(btn => {
      btn.addEventListener("click", () => {
        owner = btn.dataset.ticketOwner;
        backdrop.querySelectorAll("[data-ticket-owner]").forEach(x => x.classList.toggle("active", x === btn));
      });
    });

    backdrop.querySelector(".ticket-meta-close").addEventListener("click", closeMetaDialog);
    backdrop.addEventListener("click", e => { if(e.target === backdrop) closeMetaDialog(); });
    backdrop.querySelector(".ticket-meta-confirm").addEventListener("click", () => {
      const name = cleanName(nameInput.value);
      if(!name){
        nameInput.focus();
        nameInput.classList.add("ticket-meta-error");
        return;
      }
      pending.set(input.id, {legId, name, owner, targetKey, targetLabel});
      input.multiple = false;
      closeMetaDialog();
      input.click();
    });

    requestAnimationFrame(() => nameInput.focus());
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
      const tickets = await getTicketsForTarget(targetKey);
      if(!tickets.length) return;
      if(tickets.length === 1){ await openTicketRecord(tickets[0]); return; }

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
        const rec = await getLocalTicket(btn.dataset.pickTicket);
        dlg.close();
        await openTicketRecord(rec);
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
    if(!select.value){
      alert("Prima scegli a cosa vuoi associare il biglietto.");
      select.focus();
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
      if(button){ button.disabled = false; button.textContent = "📎 Importa biglietto"; }
    }
  }, true);
})();
