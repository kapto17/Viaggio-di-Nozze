from pathlib import Path

# data.js: Lakers resta attività/programma, ma non è un documento caricabile e non ha box ticket statico
p=Path('data.js')
s=p.read_text(encoding='utf-8')
old_activity='{ priority: "must", lf: true, name: "Los Angeles Lakers vs LA Clippers", date: "2026-10-23", time: "19:00", status: "Prenotato", icon: "🏀", note: "Partita NBA alla Crypto.com Arena · biglietti acquistati", mapsQuery: "Crypto.com Arena 1111 S Figueroa St Los Angeles CA 90015" }'
new_activity='{ priority: "must", lf: true, ticketUpload: false, name: "Los Angeles Lakers vs LA Clippers", date: "2026-10-23", time: "19:00", status: "Prenotato", icon: "🏀", note: "Partita NBA alla Crypto.com Arena · biglietti acquistati", mapsQuery: "Crypto.com Arena 1111 S Figueroa St Los Angeles CA 90015" }'
if old_activity not in s: raise SystemExit('Lakers activity not found')
s=s.replace(old_activity,new_activity,1)
old_tickets='''      ], days: [], tickets: [\n        { name: "Lakers vs LA Clippers", note: "23 ottobre 2026 · 19:00 · Crypto.com Arena · biglietti acquistati. Documento/QR da aggiungere quando disponibile.", status: "Prenotato" }\n      ]\n    },'''
new_tickets='''      ], days: [], tickets: []\n    },'''
if old_tickets not in s: raise SystemExit('Lakers static ticket block not found')
s=s.replace(old_tickets,new_tickets,1)
p.write_text(s,encoding='utf-8')

# app.js: esclude esplicitamente le attività non caricabili e bump versione
p=Path('app.js')
s=p.read_text(encoding='utf-8')
old='  (leg.activities||[]).forEach(x=>add(x.name));'
new='  (leg.activities||[]).filter(x=>x.ticketUpload!==false).forEach(x=>add(x.name));'
if old not in s: raise SystemExit('ticket target activities line not found')
s=s.replace(old,new,1)
s=s.replace('Versione app 2.4.45','Versione app 2.4.46',1)
p.write_text(s,encoding='utf-8')

# firebase-budget.js: consente rinomina metadato condiviso
p=Path('firebase-budget.js')
s=p.read_text(encoding='utf-8')
needle='''async function removeTicket(id){\n  if (!currentUser) throw new Error("Area L&F non sbloccata");\n  await deleteTicketChunks(id);\n  await deleteDoc(doc(db, "budget", "main", "tickets", id));\n}\n'''
insert=needle+'''\nasync function renameTicket(id, label){\n  if (!currentUser) throw new Error("Area L&F non sbloccata");\n  const clean = String(label || "").trim().slice(0,80);\n  if (!clean) throw new Error("Nome biglietto non valido");\n  await updateDoc(doc(db, "budget", "main", "tickets", id), {\n    label: clean,\n    updatedAt: serverTimestamp()\n  });\n}\n'''
if needle not in s: raise SystemExit('removeTicket block not found')
s=s.replace(needle,insert,1)
old='''  uploadTicket,\n  downloadTicket,\n  removeTicket,'''
new='''  uploadTicket,\n  downloadTicket,\n  removeTicket,\n  renameTicket,'''
if old not in s: raise SystemExit('LFBudget ticket export block not found')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')

# ticket-meta.js: pulsante Modifica nome + dialog, con sync cloud se condiviso
p=Path('ticket-meta.js')
s=p.read_text(encoding='utf-8')
needle='''  async function markTicketShared(localId, cloudId){\n    const db = await openTicketDb();\n    return new Promise((resolve, reject) => {\n      const tx = db.transaction("tickets", "readwrite");\n      const store = tx.objectStore("tickets");\n      const req = store.get(Number(localId));\n      req.onsuccess = () => {\n        const rec = req.result;\n        if(!rec){ resolve(); return; }\n        rec.cloudId = cloudId;\n        rec.syncPending = false;\n        const put = store.put(rec);\n        put.onsuccess = () => resolve();\n        put.onerror = () => reject(put.error);\n      };\n      req.onerror = () => reject(req.error);\n    });\n  }\n'''
addition=needle+'''\n  async function updateLocalTicketLabel(localId, label){\n    const db = await openTicketDb();\n    return new Promise((resolve, reject) => {\n      const tx = db.transaction("tickets", "readwrite");\n      const store = tx.objectStore("tickets");\n      const req = store.get(Number(localId));\n      req.onsuccess = () => {\n        const rec = req.result;\n        if(!rec){ resolve(); return; }\n        rec.label = cleanName(label) || rec.fileName;\n        const put = store.put(rec);\n        put.onsuccess = () => resolve();\n        put.onerror = () => reject(put.error);\n      };\n      req.onerror = () => reject(req.error);\n    });\n  }\n\n  function openRenameDialog(rec){\n    closeMetaDialog();\n    const backdrop = document.createElement("div");\n    backdrop.className = "ticket-meta-backdrop";\n    backdrop.innerHTML = `\n      <div class="ticket-meta-sheet" role="dialog" aria-modal="true" aria-label="Modifica nome biglietto">\n        <div class="ticket-meta-handle"></div>\n        <div class="ticket-meta-head">\n          <div><small>🎟️ BIGLIETTO</small><h3>Modifica nome</h3></div>\n          <button type="button" class="ticket-meta-close" aria-label="Chiudi">×</button>\n        </div>\n        <label class="ticket-meta-field ticket-wizard-name-field">\n          <span>Nome del documento</span>\n          <input class="ticket-rename-input" type="text" maxlength="80" autocomplete="off" value="${escapeHtml(rec.label || rec.fileName || "")}">\n        </label>\n        <button type="button" class="ticket-meta-confirm ticket-rename-save">Salva nuovo nome</button>\n      </div>`;\n    document.body.appendChild(backdrop);\n    const input = backdrop.querySelector(".ticket-rename-input");\n    const save = backdrop.querySelector(".ticket-rename-save");\n    backdrop.querySelector(".ticket-meta-close").addEventListener("click", closeMetaDialog);\n    backdrop.addEventListener("click", e => { if(e.target === backdrop) closeMetaDialog(); });\n    save.addEventListener("click", async () => {\n      const next = cleanName(input.value);\n      if(!next){ input.classList.add("ticket-meta-error"); input.focus(); return; }\n      save.disabled = true;\n      save.textContent = "Salvataggio…";\n      try{\n        if(rec.cloudId){\n          if(!window.LFBudget?.renameTicket) throw new Error("Rinomina cloud non disponibile");\n          await window.LFBudget.renameTicket(rec.cloudId, next);\n        }\n        await updateLocalTicketLabel(rec.id, next);\n        closeMetaDialog();\n        await renderLocalTickets(rec.legId);\n        if(typeof decorateTicketButtons === "function") await decorateTicketButtons(document);\n      }catch(err){\n        console.error("Rinomina biglietto:", err);\n        save.disabled = false;\n        save.textContent = "Salva nuovo nome";\n        alert("Non sono riuscito a rinominare il biglietto. Controlla la connessione e riprova.");\n      }\n    });\n    requestAnimationFrame(() => { input.focus(); input.select(); });\n  }\n'''
if needle not in s: raise SystemExit('markTicketShared block not found')
s=s.replace(needle,addition,1)

needle2='''      if(!card.querySelector(".ticket-sync-badge")){\n        const sync = document.createElement("span");\n        sync.className = `ticket-sync-badge ${rec.cloudId ? "is-shared" : "is-pending"}`;\n        sync.textContent = rec.cloudId ? "☁ Condiviso" : "↻ Da sincronizzare";\n        (card.querySelector(".ticket-owner-badge") || name).insertAdjacentElement("afterend", sync);\n      }\n'''
addition2=needle2+'''      const actions = card.querySelector(".local-ticket-actions");\n      if(actions && !actions.querySelector("[data-ticket-rename]")){\n        const edit = document.createElement("button");\n        edit.type = "button";\n        edit.className = "local-ticket-rename";\n        edit.dataset.ticketRename = rec.id;\n        edit.textContent = "Modifica nome";\n        const del = actions.querySelector("[data-ticket-delete]");\n        if(del) actions.insertBefore(edit, del); else actions.appendChild(edit);\n      }\n'''
if needle2 not in s: raise SystemExit('sync badge block not found')
s=s.replace(needle2,addition2,1)

needle3='''  document.addEventListener("click", e => {\n    const button = e.target.closest?.('button[id^="ticket-import-"]');'''
insert3='''  document.addEventListener("click", async e => {\n    const edit = e.target.closest?.("[data-ticket-rename]");\n    if(!edit) return;\n    e.preventDefault();\n    e.stopImmediatePropagation();\n    const rec = await getLocalTicket(edit.dataset.ticketRename);\n    if(rec) openRenameDialog(rec);\n  }, true);\n\n'''+needle3
if needle3 not in s: raise SystemExit('import click listener not found')
s=s.replace(needle3,insert3,1)
s=s.replace('/* V45 · Wizard caricamento biglietti + sync in background */','/* V46 · Wizard + rinomina biglietti + sync in background */',1)
p.write_text(s,encoding='utf-8')

# cache busts
p=Path('index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('data.js?v=108','data.js?v=109',1)
s=s.replace('firebase-budget.js?v=37','firebase-budget.js?v=38',1)
s=s.replace('app.js?v=120','app.js?v=121',1)
s=s.replace('ticket-meta.js?v=5','ticket-meta.js?v=6',1)
p.write_text(s,encoding='utf-8')

p=Path('sw.js')
s=p.read_text(encoding='utf-8').replace('viaggio-nozze-v143','viaggio-nozze-v144',1)
p.write_text(s,encoding='utf-8')
