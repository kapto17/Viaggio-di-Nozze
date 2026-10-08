from pathlib import Path

# app.js: simplify visible upload UI and bump version
p=Path('app.js')
s=p.read_text(encoding='utf-8')
old='''      <div class="ticket-import-note">Accedi all'area L&F per caricare e vedere i file condivisi. Scegli prima a quale prenotazione appartengono.</div>\n      <select id="ticket-target-${leg.id}" class="ticket-import-btn" style="width:100%;margin:10px 0;text-align:left">\n        <option value="">Associa a…</option>\n        ${ticketTargetsForLeg(leg).map(t=>`<option value="${escapeHtml(t.key)}" data-label="${escapeHtml(t.label)}">${escapeHtml(t.label)}</option>`).join("")}\n        <option value="${leg.id}::altro" data-label="Altro">Altro</option>\n      </select>\n      <input id="ticket-file-${leg.id}" class="ticket-file-input" type="file" accept=".pdf,image/*" multiple>\n      <button id="ticket-import-${leg.id}" class="ticket-import-btn">📎 Importa biglietto</button>'''
new='''      <div class="ticket-import-note">Carica una sola volta PDF o immagini: scegli nel wizard a cosa appartengono, di chi sono e come vuoi chiamarli.</div>\n      <select id="ticket-target-${leg.id}" class="ticket-import-btn" hidden aria-hidden="true">\n        <option value="">Associa a…</option>\n        ${ticketTargetsForLeg(leg).map(t=>`<option value="${escapeHtml(t.key)}" data-label="${escapeHtml(t.label)}">${escapeHtml(t.label)}</option>`).join("")}\n        <option value="${leg.id}::altro" data-label="Altro">Altro</option>\n      </select>\n      <input id="ticket-file-${leg.id}" class="ticket-file-input" type="file" accept=".pdf,image/*">\n      <button id="ticket-import-${leg.id}" class="ticket-import-btn">＋ Carica biglietto</button>'''
if old not in s: raise SystemExit('ticket upload UI block not found')
s=s.replace(old,new,1)
s=s.replace('Versione app 2.4.44','Versione app 2.4.45',1)
p.write_text(s,encoding='utf-8')

# ticket-meta.js: turn existing sheet into a real 3-step wizard
p=Path('ticket-meta.js')
s=p.read_text(encoding='utf-8')
start=s.index('  function openMetaDialog(legId, select, input){')
end=s.index('\n  async function decorateTicketList', start)
new_func=r'''  function openMetaDialog(legId, select, input){
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
'''
s=s[:start]+new_func+s[end:]
# click handler: association is now selected inside the wizard
old='''    if(!select.value){\n      alert("Prima scegli a cosa vuoi associare il biglietto.");\n      select.focus();\n      return;\n    }\n    openMetaDialog(legId, select, input);'''
new='''    openMetaDialog(legId, select, input);'''
if old not in s: raise SystemExit('old preselect validation not found')
s=s.replace(old,new,1)
s=s.replace('button.textContent = "📎 Importa biglietto"','button.textContent = "＋ Carica biglietto"')
s=s.replace('/* V43 · Nome/proprietario: salvataggio locale immediato, sync in background */','/* V45 · Wizard caricamento biglietti + sync in background */',1)
p.write_text(s,encoding='utf-8')

# ticket-meta.css: wizard styling
p=Path('ticket-meta.css')
s=p.read_text(encoding='utf-8')
s=s.replace('/* V42 · Nome, proprietario e stato sincronizzazione biglietti */','/* V45 · Wizard, proprietario e stato sincronizzazione biglietti */',1)
s += r'''

/* Wizard caricamento biglietti */
.ticket-wizard-sheet{max-height:min(88vh,760px);overflow:auto}
.ticket-wizard-progress{display:grid;grid-template-columns:28px 1fr 28px 1fr 28px;align-items:center;margin:18px 2px 20px}
.ticket-wizard-progress b{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--paper-alt,#f1eadb);color:var(--ink-soft,#2a3b5c);font-size:11px;font-weight:900;border:1px solid rgba(22,35,63,.10)}
.ticket-wizard-progress b.active{background:var(--ink,#16233f);color:#fff;border-color:var(--ink,#16233f)}
.ticket-wizard-progress b.done{background:#e8f3ea;color:#275c34;border-color:#cfe4d4}
.ticket-wizard-progress i{height:2px;background:rgba(22,35,63,.12)}
.ticket-wizard-step[hidden]{display:none!important}
.ticket-wizard-kicker{font-size:10px;letter-spacing:.09em;font-weight:900;color:var(--ink-soft,#2a3b5c);opacity:.72;margin-bottom:5px}
.ticket-wizard-step h4{font-size:20px;line-height:1.15;margin:0 0 6px;color:var(--ink,#16233f)}
.ticket-wizard-step>p{font-size:13px;line-height:1.4;color:var(--ink-soft,#2a3b5c);margin:0 0 17px}
.ticket-wizard-target{width:100%;appearance:auto;border:1px solid rgba(22,35,63,.18);border-radius:14px;background:#fff;color:var(--ink,#16233f);font:inherit;font-size:15px;padding:13px 12px;outline:none}
.ticket-wizard-target:focus{border-color:rgba(22,35,63,.55);box-shadow:0 0 0 3px rgba(22,35,63,.07)}
.ticket-wizard-target.ticket-meta-error{border-color:#b43b48}
.ticket-wizard-name-field{margin-top:17px}
.ticket-owner-grid.ticket-owner-error{padding:3px;border-radius:17px;box-shadow:0 0 0 2px rgba(180,59,72,.55)}
.ticket-wizard-nav{display:grid;grid-template-columns:minmax(92px,.42fr) minmax(0,1fr);gap:9px;margin-top:18px}
.ticket-wizard-nav .ticket-meta-confirm{margin-top:0}
.ticket-wizard-back{border:1px solid rgba(22,35,63,.15);border-radius:14px;background:transparent;color:var(--ink,#16233f);font:inherit;font-weight:800;padding:13px 12px}
.ticket-wizard-summary{display:grid;gap:8px;margin-top:4px}
.ticket-wizard-summary>div{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:11px 12px;border-radius:13px;background:rgba(255,255,255,.66);border:1px solid rgba(22,35,63,.08)}
.ticket-wizard-summary span{font-size:11px;color:var(--ink-soft,#2a3b5c);font-weight:750;white-space:nowrap}
.ticket-wizard-summary strong{font-size:12px;line-height:1.35;text-align:right;color:var(--ink,#16233f);overflow-wrap:anywhere}
@media(max-width:390px){.ticket-wizard-sheet{padding-left:14px;padding-right:14px}.ticket-owner-grid button span{font-size:11px}.ticket-wizard-nav{grid-template-columns:90px 1fr}}
'''
p.write_text(s,encoding='utf-8')

# cache busts
p=Path('index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('ticket-meta.css?v=2','ticket-meta.css?v=3',1)
s=s.replace('app.js?v=119','app.js?v=120',1)
s=s.replace('ticket-meta.js?v=4','ticket-meta.js?v=5',1)
p.write_text(s,encoding='utf-8')

p=Path('sw.js')
s=p.read_text(encoding='utf-8').replace('viaggio-nozze-v142','viaggio-nozze-v143',1)
p.write_text(s,encoding='utf-8')
