from pathlib import Path

# ticket-sync.js: intercept delete synchronously, then handle local/shared with one confirmation.
p=Path('ticket-sync.js')
s=p.read_text(encoding='utf-8')
old='''  document.addEventListener("click", async e => {\n    const btn = e.target.closest?.("[data-ticket-delete]");\n    if(!btn || !authenticated) return;\n    const rec = await getLocalTicket(btn.dataset.ticketDelete);\n    if(!rec?.cloudId) return;\n    e.preventDefault();\n    e.stopImmediatePropagation();\n    if(!confirm("Eliminare questo biglietto condiviso da entrambi i telefoni?")) return;\n    btn.disabled = true;\n    try{\n      await window.LFBudget.removeTicket(rec.cloudId);\n      await deleteLocalTicket(rec.id);\n      await refreshVisibleTickets();\n    }catch(err){\n      console.error("Eliminazione biglietto condiviso:", err);\n      alert("Non sono riuscito a eliminare il biglietto condiviso. Riprova quando sei online.");\n      btn.disabled = false;\n    }\n  }, true);'''
new='''  document.addEventListener("click", async e => {\n    const btn = e.target.closest?.("[data-ticket-delete]");\n    if(!btn || !authenticated) return;\n\n    // Ferma subito il vecchio handler locale: se aspettiamo IndexedDB prima di farlo,\n    // il click prosegue e vengono mostrati due popup di conferma.\n    e.preventDefault();\n    e.stopImmediatePropagation();\n    if(btn.dataset.ticketDeleting === "1") return;\n    btn.dataset.ticketDeleting = "1";\n\n    let rec = null;\n    try{\n      rec = await getLocalTicket(btn.dataset.ticketDelete);\n    }catch(err){\n      console.error("Lettura biglietto da eliminare:", err);\n    }\n    if(!rec){\n      delete btn.dataset.ticketDeleting;\n      return;\n    }\n\n    const shared = !!rec.cloudId;\n    const message = shared\n      ? "Eliminare questo biglietto condiviso da entrambi i telefoni?"\n      : "Eliminare questo biglietto da questo telefono?";\n    if(!confirm(message)){\n      delete btn.dataset.ticketDeleting;\n      return;\n    }\n\n    btn.disabled = true;\n    try{\n      if(shared) await window.LFBudget.removeTicket(rec.cloudId);\n      await deleteLocalTicket(rec.id);\n      await refreshVisibleTickets();\n    }catch(err){\n      console.error("Eliminazione biglietto:", err);\n      alert(shared\n        ? "Non sono riuscito a eliminare il biglietto condiviso. Riprova quando sei online."\n        : "Non sono riuscito a eliminare il biglietto da questo telefono.");\n      btn.disabled = false;\n      delete btn.dataset.ticketDeleting;\n    }\n  }, true);'''
if old not in s:
    raise SystemExit('delete handler marker not found')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')

# app version bump
p=Path('app.js')
s=p.read_text(encoding='utf-8')
if 'Versione app 2.4.49' not in s:
    raise SystemExit('app version marker not found')
s=s.replace('Versione app 2.4.49','Versione app 2.4.50',1)
p.write_text(s,encoding='utf-8')

# cache-bust changed JS
p=Path('index.html')
s=p.read_text(encoding='utf-8')
for old,new in [('app.js?v=124','app.js?v=125'),('ticket-sync.js?v=5','ticket-sync.js?v=6')]:
    if old not in s:
        raise SystemExit(f'index marker not found: {old}')
    s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')

# PWA cache bump
p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v147' not in s:
    raise SystemExit('service worker cache marker not found')
s=s.replace('viaggio-nozze-v147','viaggio-nozze-v148',1)
p.write_text(s,encoding='utf-8')
