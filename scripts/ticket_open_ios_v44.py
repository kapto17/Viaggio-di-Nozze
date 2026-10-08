from pathlib import Path

# app.js — apertura autorizzata dal tap, prima delle letture asincrone
p=Path('app.js')
s=p.read_text(encoding='utf-8')
old='''async function openTicketRecord(rec){\n  if(!rec)return;\n  const url=URL.createObjectURL(rec.blob);\n  window.open(url,"_blank");\n  setTimeout(()=>URL.revokeObjectURL(url),60000);\n}'''
new='''function openTicketPlaceholder(){\n  let popup = null;\n  try{\n    popup = window.open("about:blank", "_blank");\n    if(popup && !popup.closed){\n      try{\n        popup.document.title = "Apertura biglietto…";\n        popup.document.body.innerHTML = '<div style="font-family:system-ui;padding:24px;color:#16233f">Apertura biglietto…</div>';\n      }catch(_){}\n    }\n  }catch(_){}\n  return popup;\n}\nasync function openTicketRecord(rec, popup=null){\n  if(!rec || !rec.blob){\n    try{ popup?.close(); }catch(_){}\n    return;\n  }\n  const url=URL.createObjectURL(rec.blob);\n  let opened=false;\n  if(popup && !popup.closed){\n    try{ popup.location.replace(url); opened=true; }catch(_){\n      try{ popup.location.href=url; opened=true; }catch(__){}\n    }\n  }\n  if(!opened){\n    try{ window.location.href=url; opened=true; }catch(_){}\n  }\n  setTimeout(()=>URL.revokeObjectURL(url),120000);\n}'''
if old not in s: raise SystemExit('openTicketRecord block not found')
s=s.replace(old,new,1)
old2='''    $$("[data-ticket-open]", host).forEach(btn => {\n      btn.addEventListener("click", async () => {\n        const rec = await getLocalTicket(btn.dataset.ticketOpen);\n        if (!rec) return;\n        const url = URL.createObjectURL(rec.blob);\n        window.open(url, "_blank");\n        setTimeout(() => URL.revokeObjectURL(url), 60000);\n      });\n    });'''
new2='''    $$("[data-ticket-open]", host).forEach(btn => {\n      btn.addEventListener("click", async () => {\n        const popup = openTicketPlaceholder();\n        try{\n          const rec = await getLocalTicket(btn.dataset.ticketOpen);\n          if (!rec){ try{ popup?.close(); }catch(_){} return; }\n          await openTicketRecord(rec, popup);\n        }catch(err){\n          console.error("Apertura biglietto:", err);\n          try{ popup?.close(); }catch(_){}\n          alert("Non sono riuscito ad aprire il biglietto su questo dispositivo.");\n        }\n      });\n    });'''
if old2 not in s: raise SystemExit('local open handler not found')
s=s.replace(old2,new2,1)
s=s.replace('Versione app 2.4.43','Versione app 2.4.44',1)
p.write_text(s,encoding='utf-8')

# ticket-meta.js — anche i pulsanti collegati devono aprire la finestra prima degli await
p=Path('ticket-meta.js')
s=p.read_text(encoding='utf-8')
old='''      const tickets = await getTicketsForTarget(targetKey);\n      if(!tickets.length) return;\n      if(tickets.length === 1){ await openTicketRecord(tickets[0]); return; }\n\n      document.getElementById("ticket-picker-dialog")?.remove();'''
new='''      const popup = typeof openTicketPlaceholder === "function" ? openTicketPlaceholder() : null;\n      const tickets = await getTicketsForTarget(targetKey);\n      if(!tickets.length){ try{ popup?.close(); }catch(_){} return; }\n      if(tickets.length === 1){ await openTicketRecord(tickets[0], popup); return; }\n      try{ popup?.close(); }catch(_){}\n\n      document.getElementById("ticket-picker-dialog")?.remove();'''
if old not in s: raise SystemExit('ticket-meta single target block not found')
s=s.replace(old,new,1)
old2='''      dlg.querySelectorAll("[data-pick-ticket]").forEach(btn => btn.onclick = async () => {\n        const rec = await getLocalTicket(btn.dataset.pickTicket);\n        dlg.close();\n        await openTicketRecord(rec);\n      });'''
new2='''      dlg.querySelectorAll("[data-pick-ticket]").forEach(btn => btn.onclick = async () => {\n        const popup = typeof openTicketPlaceholder === "function" ? openTicketPlaceholder() : null;\n        try{\n          const rec = await getLocalTicket(btn.dataset.pickTicket);\n          dlg.close();\n          await openTicketRecord(rec, popup);\n        }catch(err){\n          console.error("Apertura biglietto:", err);\n          try{ popup?.close(); }catch(_){}\n          alert("Non sono riuscito ad aprire il biglietto su questo dispositivo.");\n        }\n      });'''
if old2 not in s: raise SystemExit('ticket-meta picker handler not found')
s=s.replace(old2,new2,1)
p.write_text(s,encoding='utf-8')

# ticket-sync.js — allinea davvero alla V43: nessun ritardo artificiale di 8 secondi
p=Path('ticket-sync.js')
s=p.read_text(encoding='utf-8')
s=s.replace('/* V42.1 · Sincronizzazione biglietti Firebase <-> cache IndexedDB */','/* V43.1 · Sincronizzazione biglietti Firestore <-> cache IndexedDB */',1)
s=s.replace('      if(Date.now() - Number(local.createdAt || 0) < 8000) continue;\n','',1)
p.write_text(s,encoding='utf-8')

# cache bust
p=Path('index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('app.js?v=118','app.js?v=119',1)
s=s.replace('ticket-meta.js?v=3','ticket-meta.js?v=4',1)
s=s.replace('ticket-sync.js?v=3','ticket-sync.js?v=4',1)
p.write_text(s,encoding='utf-8')

p=Path('sw.js')
s=p.read_text(encoding='utf-8').replace('viaggio-nozze-v141','viaggio-nozze-v142',1)
p.write_text(s,encoding='utf-8')
