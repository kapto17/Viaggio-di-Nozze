/* V42 · Sincronizzazione biglietti Firebase <-> cache IndexedDB */
(() => {
  let started = false;
  let authenticated = false;
  let latestPayload = null;
  let syncRunning = false;
  let retryTimer = null;

  const OWNER_VALUES = new Set(["lorenzo","fortuna","both"]);

  function ownerOf(value){ return OWNER_VALUES.has(value) ? value : "both"; }

  async function allLocalTickets(){
    const db = await openTicketDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("tickets", "readonly");
      const req = tx.objectStore("tickets").getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async function putLocalTicket(rec){
    const db = await openTicketDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("tickets", "readwrite");
      const req = tx.objectStore("tickets").put(rec);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function addCloudTicketToLocal(meta, blob){
    const db = await openTicketDb();
    const rec = {
      legId: meta.legId || "",
      label: meta.label || meta.fileName || "Biglietto",
      owner: ownerOf(meta.owner),
      targetKey: meta.targetKey || "",
      targetLabel: meta.targetLabel || "",
      fileName: meta.fileName || "biglietto",
      mimeType: meta.mimeType || blob?.type || "application/octet-stream",
      size: Number(meta.size || blob?.size || 0),
      createdAt: Number(meta.createdAtMs || Date.now()),
      cloudId: meta.id,
      syncPending: false,
      blob
    };
    return new Promise((resolve, reject) => {
      const tx = db.transaction("tickets", "readwrite");
      const req = tx.objectStore("tickets").add(rec);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function signature(t){
    return [
      t.legId || "",
      t.targetKey || "",
      String(t.label || "").trim().toLowerCase(),
      String(t.fileName || "").trim().toLowerCase(),
      Number(t.size || 0),
      ownerOf(t.owner)
    ].join("|");
  }

  async function attachCloudId(local, cloudId){
    local.cloudId = cloudId;
    local.syncPending = false;
    await putLocalTicket(local);
  }

  async function migratePending(localTickets, sharedTickets){
    if(!authenticated || !window.LFBudget?.uploadTicket) return;
    const remoteBySignature = new Map(sharedTickets.map(t => [signature(t), t]));
    for(const local of localTickets){
      if(local.cloudId || !local.blob) continue;
      // Evita di competere con il caricamento appena iniziato dal wizard.
      if(Date.now() - Number(local.createdAt || 0) < 8000) continue;
      const same = remoteBySignature.get(signature(local));
      if(same){
        await attachCloudId(local, same.id);
        continue;
      }
      try{
        const cloud = await window.LFBudget.uploadTicket({
          legId: local.legId,
          label: local.label || local.fileName,
          owner: ownerOf(local.owner),
          targetKey: local.targetKey || "",
          targetLabel: local.targetLabel || ""
        }, local.blob);
        await attachCloudId(local, cloud.id);
        remoteBySignature.set(signature(local), cloud);
      }catch(err){
        console.error("Migrazione biglietto locale:", err);
        // Rimane in locale: verrà ritentato più avanti.
      }
    }
  }

  async function reconcile(payload){
    if(!authenticated || !payload?.ready) return;
    const shared = Array.isArray(payload.tickets) ? payload.tickets : [];
    let local = await allLocalTickets();
    const byCloud = new Map(local.filter(t => t.cloudId).map(t => [t.cloudId, t]));

    for(const meta of shared){
      const existing = byCloud.get(meta.id);
      if(existing){
        let changed = false;
        for(const [key, value] of Object.entries({
          legId:meta.legId || existing.legId,
          label:meta.label || existing.label,
          owner:ownerOf(meta.owner),
          targetKey:meta.targetKey || "",
          targetLabel:meta.targetLabel || "",
          fileName:meta.fileName || existing.fileName,
          mimeType:meta.mimeType || existing.mimeType,
          size:Number(meta.size || existing.size || 0),
          syncPending:false
        })){
          if(existing[key] !== value){ existing[key] = value; changed = true; }
        }
        if(changed) await putLocalTicket(existing);
        continue;
      }
      try{
        const blob = await window.LFBudget.downloadTicket(meta.id);
        await addCloudTicketToLocal(meta, blob);
      }catch(err){
        console.error("Download biglietto condiviso:", err);
      }
    }

    local = await allLocalTickets();
    await migratePending(local, shared);

    // Solo una risposta confermata dal server può cancellare cache locali.
    if(!payload.fromCache){
      const remoteIds = new Set(shared.map(t => t.id));
      const db = await openTicketDb();
      for(const rec of await allLocalTickets()){
        if(rec.cloudId && !remoteIds.has(rec.cloudId)){
          await new Promise((resolve, reject) => {
            const tx = db.transaction("tickets", "readwrite");
            const req = tx.objectStore("tickets").delete(Number(rec.id));
            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
          });
        }
      }
    }

    await refreshVisibleTickets();
  }

  function schedule(payload){
    latestPayload = payload;
    if(syncRunning) return;
    syncRunning = true;
    (async () => {
      try{
        while(latestPayload){
          const next = latestPayload;
          latestPayload = null;
          await reconcile(next);
        }
      }catch(err){
        console.error("Sincronizzazione biglietti:", err);
      }finally{
        syncRunning = false;
      }
    })();
  }

  async function refreshVisibleTickets(){
    refreshPrivateTicketUi();
    if(!authenticated) return;
    const hosts = Array.from(document.querySelectorAll('[id^="local-tickets-"]'));
    for(const host of hosts){
      const legId = host.id.replace("local-tickets-", "");
      if(typeof renderLocalTickets === "function") await renderLocalTickets(legId);
    }
    if(typeof decorateTicketButtons === "function") await decorateTicketButtons(document);
  }

  function refreshPrivateTicketUi(){
    document.querySelectorAll(".ticket-import-box").forEach(box => {
      const title = box.querySelector(".ticket-import-title");
      const note = box.querySelector(".ticket-import-note");
      const select = box.querySelector('select[id^="ticket-target-"]');
      const button = box.querySelector('button[id^="ticket-import-"]');
      const list = box.querySelector('.local-tickets-list');
      if(title) title.textContent = "Biglietti L&F";
      if(authenticated){
        if(note) note.textContent = "Caricalo una sola volta: viene condiviso tra i vostri telefoni e resta disponibile anche offline dopo il download.";
        if(select) select.disabled = false;
        if(button) button.disabled = false;
        if(list) list.hidden = false;
      }else{
        if(note) note.textContent = "I file reali dei biglietti sono privati. Accedi all'area L&F dal Budget per visualizzarli o caricarli.";
        if(select) select.disabled = true;
        if(button) button.disabled = true;
        if(list) list.hidden = true;
        box.querySelectorAll('.linked-ticket-btn').forEach(x => x.remove());
      }
    });
    if(!authenticated){
      document.querySelectorAll('.linked-ticket-btn').forEach(x => x.remove());
    }
  }

  function retrySoon(){
    clearTimeout(retryTimer);
    retryTimer = setTimeout(() => {
      if(!authenticated) return;
      const payload = window.LFBudget?.getTicketsSnapshot?.();
      if(payload) schedule(payload);
    }, 9000);
  }

  document.addEventListener("click", async e => {
    const btn = e.target.closest?.("[data-ticket-delete]");
    if(!btn || !authenticated) return;
    const rec = await getLocalTicket(btn.dataset.ticketDelete);
    if(!rec?.cloudId) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if(!confirm("Eliminare questo biglietto condiviso da entrambi i telefoni?")) return;
    btn.disabled = true;
    try{
      await window.LFBudget.removeTicket(rec.cloudId);
      await deleteLocalTicket(rec.id);
      await refreshVisibleTickets();
    }catch(err){
      console.error("Eliminazione biglietto condiviso:", err);
      alert("Non sono riuscito a eliminare il biglietto condiviso. Riprova quando sei online.");
      btn.disabled = false;
    }
  }, true);

  window.addEventListener("online", retrySoon);
  window.addEventListener("lf-local-ticket-changed", retrySoon);

  const observer = new MutationObserver(() => refreshPrivateTicketUi());
  observer.observe(document.documentElement, {childList:true, subtree:true});

  function start(){
    if(started || !window.LFBudget) return;
    started = true;
    window.LFBudget.onAuth(state => {
      authenticated = !!state.authenticated;
      refreshPrivateTicketUi();
      if(authenticated){
        const payload = window.LFBudget.getTicketsSnapshot?.();
        if(payload) schedule(payload);
      }
    });
    window.LFBudget.onTickets(payload => {
      if(authenticated) schedule(payload);
    });
  }

  if(window.LFBudget) start();
  else window.addEventListener("lf-firebase-ready", start, {once:true});
})();
