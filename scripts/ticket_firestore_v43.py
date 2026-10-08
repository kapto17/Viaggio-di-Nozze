from pathlib import Path

# firebase-budget.js: use Firestore chunks instead of Cloud Storage
p=Path('firebase-budget.js')
s=p.read_text(encoding='utf-8')
s=s.replace('  onSnapshot,\n  serverTimestamp\n} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";\nimport {\n  getStorage,\n  ref as storageRef,\n  uploadBytes,\n  getBlob,\n  deleteObject\n} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-storage.js";','  onSnapshot,\n  serverTimestamp,\n  getDocs,\n  Bytes\n} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";')
s=s.replace('const storage = getStorage(app);\n','')
start=s.index('function safeStorageName(name){')
end=s.index('\nwindow.LFBudget = {', start)
new_block=r'''const TICKET_CHUNK_SIZE = 600 * 1024;
const TICKET_MAX_SIZE = 20 * 1024 * 1024;

function validTicketOwner(value){
  return ["lorenzo","fortuna","both"].includes(value) ? value : "both";
}

function ticketChunksRef(id){
  return collection(db, "budget", "main", "ticketFiles", id, "chunks");
}

async function deleteTicketChunks(id){
  try {
    const snap = await getDocs(ticketChunksRef(id));
    for (const chunk of snap.docs) await deleteDoc(chunk.ref);
  } catch(err){
    console.warn("Pulizia chunk biglietto:", err);
  }
}

async function uploadTicket(ticket, file){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  if (!file) throw new Error("File biglietto mancante");
  if (!navigator.onLine) throw new Error("Offline: sincronizzazione rimandata");
  if (file.size > TICKET_MAX_SIZE) throw new Error("Il file supera il limite di 20 MB");

  const ticketDoc = doc(ticketsRef);
  const ticketId = ticketDoc.id;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const chunkCount = Math.max(1, Math.ceil(bytes.length / TICKET_CHUNK_SIZE));

  try {
    for(let i=0; i<chunkCount; i++){
      const part = bytes.slice(i*TICKET_CHUNK_SIZE, Math.min(bytes.length, (i+1)*TICKET_CHUNK_SIZE));
      const chunkId = String(i).padStart(4, "0");
      await setDoc(doc(db, "budget", "main", "ticketFiles", ticketId, "chunks", chunkId), {
        index:i,
        data:Bytes.fromUint8Array(part)
      });
    }

    const payload = {
      legId: String(ticket.legId || ""),
      label: String(ticket.label || file.name).trim().slice(0,80),
      owner: validTicketOwner(ticket.owner),
      targetKey: String(ticket.targetKey || ""),
      targetLabel: String(ticket.targetLabel || ""),
      fileName: String(file.name || "biglietto"),
      mimeType: file.type || "application/octet-stream",
      size: Number(file.size || 0),
      storageKind: "firestore-chunks",
      chunkCount,
      uploadedBy: currentUser.uid,
      createdAtMs: Date.now(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    // Il metadato viene scritto per ultimo: l'altro telefono vede il ticket
    // solo quando tutti i blocchi del file sono già disponibili.
    await setDoc(ticketDoc, payload);
    return { id:ticketId, ...payload };
  } catch(err){
    await deleteTicketChunks(ticketId);
    throw err;
  }
}

async function downloadTicket(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  let ticket = lastTickets.find(t => t.id === id);
  if (!ticket){
    const snap = await getDoc(doc(db, "budget", "main", "tickets", id));
    if (!snap.exists()) throw new Error("Biglietto non trovato");
    ticket = { id:snap.id, ...snap.data() };
  }
  if (ticket.storageKind !== "firestore-chunks") throw new Error("File condiviso non disponibile");

  const snap = await getDocs(ticketChunksRef(id));
  const chunks = snap.docs
    .map(d => ({ id:d.id, ...d.data() }))
    .sort((a,b) => Number(a.index ?? a.id) - Number(b.index ?? b.id));
  if (!chunks.length || (ticket.chunkCount && chunks.length !== Number(ticket.chunkCount))){
    throw new Error("File condiviso incompleto");
  }
  const parts = chunks.map(c => {
    if (!c.data || typeof c.data.toUint8Array !== "function") throw new Error("Blocco file non valido");
    return c.data.toUint8Array();
  });
  return new Blob(parts, { type: ticket.mimeType || "application/octet-stream" });
}

async function removeTicket(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await deleteTicketChunks(id);
  await deleteDoc(doc(db, "budget", "main", "tickets", id));
}
'''
s=s[:start]+new_block+s[end:]
p.write_text(s,encoding='utf-8')

# ticket-meta.js: local save must never wait for cloud
p=Path('ticket-meta.js')
s=p.read_text(encoding='utf-8')
s=s.replace('/* V42 · Nome, proprietario e sincronizzazione cloud biglietti */','/* V43 · Nome/proprietario: salvataggio locale immediato, sync in background */',1)
old=r'''    let localId = null;
    try{
      localId = await saveTicketWithMeta(meta.legId, file, meta.name, meta.targetKey, meta.targetLabel, meta.owner, "");
      if(button) button.textContent = "Condivisione…";
      try{
        const cloud = await window.LFBudget.uploadTicket({
          legId:meta.legId,
          label:meta.name,
          owner:meta.owner,
          targetKey:meta.targetKey,
          targetLabel:meta.targetLabel
        }, file);
        await markTicketShared(localId, cloud.id);
      }catch(syncErr){
        console.error("Ticket cloud sync:", syncErr);
        alert(cloudErrorMessage(syncErr));
      }
      input.value = "";
      pending.delete(input.id);
      await renderLocalTickets(meta.legId);
      if(typeof decorateTicketButtons === "function") await decorateTicketButtons(document);
    }catch(err){
      console.error(err);
      alert("Non sono riuscito a salvare il file sul telefono.");
    }finally{
      if(button){ button.disabled = false; button.textContent = "📎 Importa biglietto"; }
    }'''
new=r'''    try{
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
    }'''
if old not in s: raise SystemExit('ticket-meta upload block not found')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')

# ticket-sync.js: no age skip because there is no competing direct uploader anymore
p=Path('ticket-sync.js')
s=p.read_text(encoding='utf-8')
s=s.replace('/* V42 · Sincronizzazione biglietti Firebase <-> cache IndexedDB */','/* V43 · Sincronizzazione biglietti Firestore <-> cache IndexedDB */',1)
s=s.replace('      // Evita di competere con il caricamento appena iniziato dal wizard.\n      if(Date.now() - Number(local.createdAt || 0) < 8000) continue;\n','',1)
s=s.replace('    }, 9000);','    }, 700);',1)
p.write_text(s,encoding='utf-8')

# version + cache bust
p=Path('app.js')
s=p.read_text(encoding='utf-8').replace('Versione app 2.4.42','Versione app 2.4.43',1)
p.write_text(s,encoding='utf-8')

p=Path('index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('firebase-budget.js?v=36','firebase-budget.js?v=37',1)
s=s.replace('ticket-meta.js?v=2','ticket-meta.js?v=3',1)
s=s.replace('ticket-sync.js?v=2','ticket-sync.js?v=3',1)
p.write_text(s,encoding='utf-8')

p=Path('sw.js')
s=p.read_text(encoding='utf-8').replace('viaggio-nozze-v140','viaggio-nozze-v141',1)
p.write_text(s,encoding='utf-8')
