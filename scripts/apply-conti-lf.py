from pathlib import Path


def replace_once(text, old, new, label):
    if old not in text:
        raise SystemExit(f"Anchor missing: {label}")
    return text.replace(old, new, 1)


app = Path("app.js")
text = app.read_text(encoding="utf-8")

text = replace_once(text, '''function currentBudgetData(){
  const settings = budgetState.settings || (window.LFBudget && window.LFBudget.defaults) || (typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS : { totalBudget:2500, currency:"USD", cityBudgets:{} });
  const expenses = Array.isArray(budgetState.expenses) ? budgetState.expenses : [];
  return { settings, expenses };
}''', '''function currentBudgetData(){
  const settings = budgetState.settings || (window.LFBudget && window.LFBudget.defaults) || (typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS : { totalBudget:2500, currency:"USD", cityBudgets:{} });
  const entries = Array.isArray(budgetState.expenses) ? budgetState.expenses : [];
  const expenses = entries.filter(entry => entry.entryType !== "settlement");
  const settlements = entries.filter(entry => entry.entryType === "settlement");
  return { settings, expenses, settlements };
}''', "currentBudgetData")

budget_label_anchor = '''function budgetCityLabel(key){
  const d = typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS.destinations.find(x => x.key === key) : null;
  return d ? d.label : key;
}
'''
budget_helpers = '''function budgetCityLabel(key){
  const d = typeof BUDGET_DEFAULTS !== "undefined" ? BUDGET_DEFAULTS.destinations.find(x => x.key === key) : null;
  return d ? d.label : key;
}

const LF_PEOPLE = ["Lorenzo", "Fortuna"];

function calculateLFSplit(expenses, settlements){
  let paidLorenzo = 0, paidFortuna = 0, sharedTotal = 0, unassigned = 0;
  (expenses || []).forEach(expense => {
    const amount = Number(expense.amount || 0);
    if (!Number.isFinite(amount) || amount <= 0) return;
    if (expense.paidBy === "Lorenzo") { paidLorenzo += amount; sharedTotal += amount; }
    else if (expense.paidBy === "Fortuna") { paidFortuna += amount; sharedTotal += amount; }
    else unassigned += 1;
  });

  // Positivo: Fortuna deve a Lorenzo. Negativo: Lorenzo deve a Fortuna.
  let balance = paidLorenzo - (sharedTotal / 2);
  (settlements || []).forEach(settlement => {
    const amount = Number(settlement.amount || 0);
    if (!Number.isFinite(amount) || amount <= 0) return;
    if (settlement.from === "Fortuna" && settlement.to === "Lorenzo") balance -= amount;
    if (settlement.from === "Lorenzo" && settlement.to === "Fortuna") balance += amount;
  });
  if (Math.abs(balance) < 0.005) balance = 0;
  return { paidLorenzo, paidFortuna, sharedTotal, shareEach:sharedTotal / 2, balance, unassigned };
}

function lfDebtDirection(balance){
  if (Math.abs(Number(balance || 0)) < 0.005) return null;
  return balance > 0
    ? { from:"Fortuna", to:"Lorenzo", debtor:"Fortuna", creditor:"Lorenzo", amount:Math.abs(balance) }
    : { from:"Lorenzo", to:"Fortuna", debtor:"Lorenzo", creditor:"Fortuna", amount:Math.abs(balance) };
}
'''
text = replace_once(text, budget_label_anchor, budget_helpers, "budget helpers")

text = replace_once(text,
'''  const { settings, expenses } = currentBudgetData();
  const currency = settings.currency || "USD";''',
'''  const { settings, expenses, settlements } = currentBudgetData();
  const currency = settings.currency || "USD";
  const ledger = calculateLFSplit(expenses, settlements);
  const debt = lfDebtDirection(ledger.balance);''',
"budget destructuring")

split_card = '''    <button class="budget-edit-total" id="budget-edit-total">✎ Modifica budget iniziale</button>

    <section class="lf-split-card" aria-label="Conti tra Lorenzo e Fortuna">
      <div class="lf-split-head">
        <div><small>CONTI L&amp;F</small><strong>Chi ha anticipato cosa</strong></div>
        <span class="lf-split-icon" aria-hidden="true">⇄</span>
      </div>
      <div class="lf-split-paid-grid">
        <div><span>Lorenzo ha pagato</span><strong>${money(ledger.paidLorenzo,currency)}</strong></div>
        <div><span>Fortuna ha pagato</span><strong>${money(ledger.paidFortuna,currency)}</strong></div>
      </div>
      <div class="lf-split-share">Spese condivise conteggiate: <strong>${money(ledger.sharedTotal,currency)}</strong> · quota a testa <strong>${money(ledger.shareEach,currency)}</strong></div>
      <div class="lf-split-balance ${debt ? "debt" : "settled"}">
        <small>Saldo attuale</small>
        <strong>${debt ? `${debt.debtor} deve a ${debt.creditor} ${money(debt.amount,currency)}` : "Siete in pari ✓"}</strong>
        <span>${debt ? "Il saldo compensa automaticamente tutte le spese 50/50 e i pareggi già registrati." : "Non ci sono conti in sospeso tra voi."}</span>
      </div>
      ${ledger.unassigned ? `<div class="lf-split-warning">⚠️ ${ledger.unassigned} ${ledger.unassigned===1?"spesa precedente non ha":"spese precedenti non hanno"} ancora un pagante. Restano nel budget, ma non entrano nel saldo L&amp;F finché non ${ledger.unassigned===1?"la modifichi":"le modifichi"}.</div>` : ""}
      <div class="lf-split-actions">
        ${debt ? `<button type="button" class="primary-action" id="lf-settle-full">✓ Pareggia tutto</button><button type="button" class="secondary-action" id="lf-settle-manual">Pareggio parziale</button>` : ""}
      </div>
      ${debt ? `<div class="lf-settle-panel" id="lf-settle-panel" hidden>
        <label>Importo da considerare pareggiato<input id="lf-settle-amount" type="number" min="0.01" max="${debt.amount.toFixed(2)}" step="0.01" inputmode="decimal" placeholder="0,00"></label>
        <div><button type="button" class="primary-action" id="lf-settle-save">Registra pareggio</button><button type="button" class="secondary-action" id="lf-settle-cancel">Annulla</button></div>
        <small>Il pareggio chiude tutto o parte del debito, ma non cambia il budget speso.</small>
      </div>` : ""}
      <details class="lf-settlement-history">
        <summary>Storico pareggi <span>${settlements.length}</span></summary>
        <div class="lf-settlement-list">
          ${settlements.length ? settlements.map(s => `<div class="lf-settlement-row"><div><strong>${s.from || "—"} → ${s.to || "—"}</strong><span>${formatExpenseDate(s.date)} · ${s.note || "Pareggio manuale"}</span></div><b>${money(s.amount,currency)}</b><button type="button" data-delete-settlement="${s.id}" aria-label="Annulla questo pareggio">×</button></div>`).join("") : `<div class="empty-note">Nessun pareggio registrato.</div>`}
        </div>
      </details>
    </section>

    <div class="currency-converter" id="currency-converter">'''
text = replace_once(text,
'''    <button class="budget-edit-total" id="budget-edit-total">✎ Modifica budget iniziale</button>

    <div class="currency-converter" id="currency-converter">''',
split_card,
"split card")

text = replace_once(text,
'''        <label>Categoria<select id="expense-category">${categoryOptions("Cibo")}</select></label>
      </div>''',
'''        <label>Categoria<select id="expense-category">${categoryOptions("Cibo")}</select></label>
        <label class="expense-payer-field">Pagato da<select id="expense-paid-by" required><option value="" selected disabled>Seleziona Lorenzo o Fortuna</option><option value="Lorenzo">Lorenzo</option><option value="Fortuna">Fortuna</option></select></label>
      </div>''',
"payer field")

text = replace_once(text,
'''<div class="expense-copy"><strong>${e.description || e.category || "Spesa"}</strong><span>${formatExpenseDate(e.date)} · ${budgetCityLabel(e.city || "Generale")} · ${e.category || "Altro"}</span></div>''',
'''<div class="expense-copy"><strong>${e.description || e.category || "Spesa"}</strong><span>${formatExpenseDate(e.date)} · ${budgetCityLabel(e.city || "Generale")} · ${e.category || "Altro"}</span><em class="expense-paid-by ${e.paidBy?"":"missing"}">${e.paidBy ? `Pagato da ${e.paidBy}` : "⚠ Pagante da indicare"}</em></div>''',
"movement payer")

settlement_handlers = '''  async function registerLFSettlement(amount, note){
    const currentDebt = lfDebtDirection(ledger.balance);
    const value = Number(amount);
    if (!currentDebt || !Number.isFinite(value) || value <= 0) return;
    if (value > currentDebt.amount + 0.005){ alert("L'importo supera il debito attuale."); return; }
    await window.LFBudget.addSettlement({ amount:value, from:currentDebt.from, to:currentDebt.to, note:note || "Pareggio manuale", date:todayISO() });
  }

  $("#lf-settle-full")?.addEventListener("click", async () => {
    if (!debt) return;
    if (!confirm(`Considerare pareggiati tutti i ${money(debt.amount,currency)} che ${debt.debtor} deve a ${debt.creditor}?`)) return;
    try { await registerLFSettlement(debt.amount, "Pareggio completo"); }
    catch(err){ console.error(err); alert("Non sono riuscito a registrare il pareggio."); }
  });
  $("#lf-settle-manual")?.addEventListener("click", () => {
    const panel = $("#lf-settle-panel");
    if (!panel) return;
    panel.hidden = false;
    $("#lf-settle-amount")?.focus();
  });
  $("#lf-settle-cancel")?.addEventListener("click", () => { const panel=$("#lf-settle-panel"); if(panel) panel.hidden=true; });
  $("#lf-settle-save")?.addEventListener("click", async () => {
    const input = $("#lf-settle-amount");
    const value = Number(input?.value);
    if (!Number.isFinite(value) || value <= 0){ alert("Inserisci un importo valido."); return; }
    try { await registerLFSettlement(value, value >= (debt?.amount || 0) - 0.005 ? "Pareggio completo" : "Pareggio parziale"); }
    catch(err){ console.error(err); alert("Non sono riuscito a registrare il pareggio."); }
  });
  $$('[data-delete-settlement]', el).forEach(btn => btn.addEventListener("click", async () => {
    if (!confirm("Annullare questo pareggio? Il saldo tra Lorenzo e Fortuna verrà ricalcolato.")) return;
    try { await window.LFBudget.removeSettlement(btn.dataset.deleteSettlement); }
    catch(err){ console.error(err); alert("Non sono riuscito ad annullare il pareggio."); }
  }));

  const form = $("#expense-form");'''
text = replace_once(text, '  const form = $("#expense-form");', settlement_handlers, "settlement handlers")

text = replace_once(text,
'''      $("#expense-category").innerHTML = categoryOptions(exp.category || "Altro");
      $("#expense-description").value = exp.description || "";''',
'''      $("#expense-category").innerHTML = categoryOptions(exp.category || "Altro");
      $("#expense-paid-by").value = LF_PEOPLE.includes(exp.paidBy) ? exp.paidBy : "";
      $("#expense-description").value = exp.description || "";''',
"edit payer")

text = replace_once(text,
'''    const amount = Number($("#expense-amount").value);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const payload = { amount, date:$("#expense-date").value, city:$("#expense-city").value, category:$("#expense-category").value, description:$("#expense-description").value };''',
'''    const amount = Number($("#expense-amount").value);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const paidBy = $("#expense-paid-by").value;
    if (!LF_PEOPLE.includes(paidBy)) return;
    const payload = { amount, date:$("#expense-date").value, city:$("#expense-city").value, category:$("#expense-category").value, description:$("#expense-description").value, paidBy };''',
"submit payer")

text = replace_once(text, 'Versione app 2.4.32', 'Versione app 2.4.33', "app version")
app.write_text(text, encoding="utf-8")


fb = Path("firebase-budget.js")
text = fb.read_text(encoding="utf-8")
text = replace_once(text, '''async function addExpense(expense){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await addDoc(expensesRef, {
    amount: Number(expense.amount),
    city: expense.city || "Generale",
    category: expense.category || "Altro",
    description: String(expense.description || "").trim(),
    date: expense.date || new Date().toISOString().slice(0,10),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

async function editExpense(id, expense){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await updateDoc(doc(db, "budget", "main", "expenses", id), {
    amount: Number(expense.amount),
    city: expense.city || "Generale",
    category: expense.category || "Altro",
    description: String(expense.description || "").trim(),
    date: expense.date || new Date().toISOString().slice(0,10),
    updatedAt: serverTimestamp()
  });
}

async function removeExpense(id){''', '''async function addExpense(expense){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await addDoc(expensesRef, {
    entryType: "expense",
    amount: Number(expense.amount),
    city: expense.city || "Generale",
    category: expense.category || "Altro",
    description: String(expense.description || "").trim(),
    paidBy: ["Lorenzo","Fortuna"].includes(expense.paidBy) ? expense.paidBy : "",
    splitType: "equal",
    date: expense.date || new Date().toISOString().slice(0,10),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

async function editExpense(id, expense){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await updateDoc(doc(db, "budget", "main", "expenses", id), {
    entryType: "expense",
    amount: Number(expense.amount),
    city: expense.city || "Generale",
    category: expense.category || "Altro",
    description: String(expense.description || "").trim(),
    paidBy: ["Lorenzo","Fortuna"].includes(expense.paidBy) ? expense.paidBy : "",
    splitType: "equal",
    date: expense.date || new Date().toISOString().slice(0,10),
    updatedAt: serverTimestamp()
  });
}

async function addSettlement(settlement){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  const amount = Number(settlement.amount);
  const from = ["Lorenzo","Fortuna"].includes(settlement.from) ? settlement.from : "";
  const to = ["Lorenzo","Fortuna"].includes(settlement.to) ? settlement.to : "";
  if (!Number.isFinite(amount) || amount <= 0 || !from || !to || from === to) throw new Error("Pareggio non valido");
  await addDoc(expensesRef, {
    entryType: "settlement",
    amount,
    from,
    to,
    note: String(settlement.note || "Pareggio manuale").trim(),
    date: settlement.date || new Date().toISOString().slice(0,10),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

async function removeSettlement(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await deleteDoc(doc(db, "budget", "main", "expenses", id));
}

async function removeExpense(id){''', "firebase expense functions")
text = replace_once(text,
'''  addExpense,
  editExpense,
  removeExpense,''',
'''  addExpense,
  editExpense,
  addSettlement,
  removeSettlement,
  removeExpense,''',
"firebase exports")
fb.write_text(text, encoding="utf-8")


style = Path("style.css")
css = style.read_text(encoding="utf-8")
marker = "/* ---------- V33: Conti L&F / Splitwise lite ---------- */"
if marker in css:
    raise SystemExit("V33 CSS already present")
css += r'''

/* ---------- V33: Conti L&F / Splitwise lite ---------- */
.lf-split-card{margin:18px 0;padding:16px;border:1px solid var(--th-border,var(--line));border-radius:20px;background:var(--th-panel-soft,#fff);box-shadow:var(--th-shadow,var(--shadow));}
.lf-split-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:13px}.lf-split-head div{display:flex;flex-direction:column;gap:2px}.lf-split-head small{font-size:10px;font-weight:900;letter-spacing:.12em;color:var(--th-accent,var(--brass))}.lf-split-head strong{font-size:17px;color:var(--th-text,var(--ink))}.lf-split-icon{width:38px;height:38px;display:grid;place-items:center;border-radius:12px;background:color-mix(in srgb,var(--th-accent,var(--brass)) 10%,transparent);font-size:22px;color:var(--th-accent,var(--brass));}
.lf-split-paid-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.lf-split-paid-grid>div{padding:11px;border-radius:14px;background:var(--th-card,#fff);border:1px solid var(--th-border,var(--line));display:flex;flex-direction:column;gap:4px}.lf-split-paid-grid span{font-size:10.5px;color:var(--th-muted,var(--ink-soft))}.lf-split-paid-grid strong{font-size:16px;color:var(--th-text,var(--ink))}
.lf-split-share{font-size:11px;line-height:1.45;color:var(--th-muted,var(--ink-soft));margin:10px 2px}.lf-split-share strong{color:var(--th-text,var(--ink))}
.lf-split-balance{padding:14px;border-radius:16px;background:color-mix(in srgb,var(--th-accent,var(--brass)) 8%,var(--th-card,#fff));border:1px solid color-mix(in srgb,var(--th-accent,var(--brass)) 18%,var(--th-border,var(--line)));display:flex;flex-direction:column;gap:4px}.lf-split-balance small{text-transform:uppercase;letter-spacing:.1em;font-size:9.5px;font-weight:900;color:var(--th-accent,var(--brass))}.lf-split-balance strong{font-size:18px;line-height:1.2;color:var(--th-text,var(--ink))}.lf-split-balance span{font-size:11px;line-height:1.4;color:var(--th-muted,var(--ink-soft))}
.lf-split-warning{margin-top:10px;padding:9px 10px;border-radius:12px;font-size:11px;line-height:1.4;background:rgba(210,145,40,.10);border:1px solid rgba(210,145,40,.20);color:var(--th-text,var(--ink))}
.lf-split-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:11px}.lf-split-actions button{flex:1;min-width:135px}
.lf-settle-panel{margin-top:11px;padding:12px;border-radius:14px;background:var(--th-card,#fff);border:1px solid var(--th-border,var(--line))}.lf-settle-panel[hidden]{display:none}.lf-settle-panel label{display:flex;flex-direction:column;gap:6px;font-size:11px;font-weight:800;color:var(--th-text,var(--ink))}.lf-settle-panel input{width:100%;padding:10px 11px;border-radius:10px;border:1px solid var(--th-border,var(--line));background:#fff;color:#172235;font:inherit}.lf-settle-panel>div{display:flex;gap:8px;margin-top:9px}.lf-settle-panel>div button{flex:1}.lf-settle-panel>small{display:block;margin-top:8px;color:var(--th-muted,var(--ink-soft));line-height:1.35}
.lf-settlement-history{margin-top:12px;border-top:1px solid var(--th-border,var(--line));padding-top:10px}.lf-settlement-history summary{cursor:pointer;font-size:11px;font-weight:850;color:var(--th-text,var(--ink));display:flex;justify-content:space-between;list-style:none}.lf-settlement-history summary::-webkit-details-marker{display:none}.lf-settlement-history summary span{min-width:22px;text-align:center;border-radius:999px;background:color-mix(in srgb,var(--th-accent,var(--brass)) 10%,transparent);color:var(--th-accent,var(--brass));padding:2px 6px}.lf-settlement-list{display:flex;flex-direction:column;gap:7px;margin-top:9px}.lf-settlement-row{display:grid;grid-template-columns:1fr auto 30px;gap:8px;align-items:center;padding:9px;border-radius:12px;background:var(--th-card,#fff);border:1px solid var(--th-border,var(--line))}.lf-settlement-row>div{display:flex;flex-direction:column;gap:2px}.lf-settlement-row strong{font-size:11.5px;color:var(--th-text,var(--ink))}.lf-settlement-row span{font-size:10px;color:var(--th-muted,var(--ink-soft))}.lf-settlement-row b{font-size:12px;color:var(--th-text,var(--ink))}.lf-settlement-row button{width:28px;height:28px;border-radius:9px;border:1px solid var(--th-border,var(--line));background:transparent;color:var(--th-muted,var(--ink-soft));font-size:18px;line-height:1}
.expense-payer-field{grid-column:1/-1}.expense-payer-field select{font-weight:800}.expense-paid-by{display:block;margin-top:4px;font-style:normal;font-size:10.5px;font-weight:800;color:var(--th-accent,var(--brass))}.expense-paid-by.missing{color:#a26721}
@media(max-width:380px){.lf-split-paid-grid{grid-template-columns:1fr}.lf-split-actions{flex-direction:column}.lf-split-actions button{width:100%}.lf-settlement-row{grid-template-columns:1fr auto 28px}}
'''
style.write_text(css, encoding="utf-8")


index = Path("index.html")
text = index.read_text(encoding="utf-8")
for old, new in [
    ("style.css?v=81", "style.css?v=82"),
    ("firebase-budget.js?v=32", "firebase-budget.js?v=33"),
    ("app.js?v=109", "app.js?v=110"),
]:
    text = replace_once(text, old, new, f"index {old}")
index.write_text(text, encoding="utf-8")

sw = Path("sw.js")
text = sw.read_text(encoding="utf-8")
text = replace_once(text, "viaggio-nozze-v126", "viaggio-nozze-v127", "service worker cache")
sw.write_text(text, encoding="utf-8")
