from pathlib import Path
import re

# Firebase: persist split type.
p=Path('firebase-budget.js')
text=p.read_text(encoding='utf-8')
old='    splitType: "equal",'
new='    splitType: ["equal","lorenzo_only","fortuna_only"].includes(expense.splitType) ? expense.splitType : "equal",'
if text.count(old) != 2:
    raise SystemExit(f'firebase split markers: {text.count(old)}')
text=text.replace(old,new)
p.write_text(text,encoding='utf-8')

# App: Splitwise-like accounting + hidden source form fields.
p=Path('app.js')
text=p.read_text(encoding='utf-8')
pattern=r'function calculateLFSplit\(expenses, settlements\)\{.*?\n\}\n\nfunction lfDebtDirection'
replacement='''function calculateLFSplit(expenses, settlements){
  let paidLorenzo = 0, paidFortuna = 0, sharedTotal = 0, unassigned = 0;
  let balance = 0; // Positivo: Fortuna deve a Lorenzo. Negativo: Lorenzo deve a Fortuna.
  (expenses || []).forEach(expense => {
    const amount = Number(expense.amount || 0);
    if (!Number.isFinite(amount) || amount <= 0) return;
    const paidBy = expense.paidBy;
    const splitType = expense.splitType || "equal";
    if (!LF_PEOPLE.includes(paidBy)){ unassigned += 1; return; }
    if (paidBy === "Lorenzo") paidLorenzo += amount;
    if (paidBy === "Fortuna") paidFortuna += amount;

    if (splitType === "equal"){
      sharedTotal += amount;
      balance += paidBy === "Lorenzo" ? amount / 2 : -amount / 2;
    } else if (splitType === "lorenzo_only"){
      if (paidBy === "Fortuna") balance -= amount;
    } else if (splitType === "fortuna_only"){
      if (paidBy === "Lorenzo") balance += amount;
    }
  });

  (settlements || []).forEach(settlement => {
    const amount = Number(settlement.amount || 0);
    if (!Number.isFinite(amount) || amount <= 0) return;
    if (settlement.from === "Fortuna" && settlement.to === "Lorenzo") balance -= amount;
    if (settlement.from === "Lorenzo" && settlement.to === "Fortuna") balance += amount;
  });
  if (Math.abs(balance) < 0.005) balance = 0;
  return { paidLorenzo, paidFortuna, sharedTotal, shareEach:sharedTotal / 2, balance, unassigned };
}

function lfDebtDirection'''
text,n=re.subn(pattern,replacement,text,count=1,flags=re.S)
if n != 1:
    raise SystemExit('calculateLFSplit marker missing')

if 'function expenseSplitLabel' not in text:
    marker='function renderBudgetScreen(){'
    helper='''function expenseSplitLabel(expense){
  const type = expense?.splitType || "equal";
  if (type === "lorenzo_only") return "Solo Lorenzo";
  if (type === "fortuna_only") return "Solo Fortuna";
  return "50/50";
}

'''
    if marker not in text:
        raise SystemExit('renderBudgetScreen marker missing')
    text=text.replace(marker,helper+marker,1)

payer='''        <label class="expense-payer-field">Pagato da<select id="expense-paid-by" required><option value="" selected disabled>Seleziona Lorenzo o Fortuna</option><option value="Lorenzo">Lorenzo</option><option value="Fortuna">Fortuna</option></select></label>'''
split='''        <label class="expense-payer-field">Pagato da<select id="expense-paid-by" required><option value="" selected disabled>Seleziona Lorenzo o Fortuna</option><option value="Lorenzo">Lorenzo</option><option value="Fortuna">Fortuna</option></select></label>
        <label class="expense-split-field">Divisione<select id="expense-split-type"><option value="equal">50/50</option><option value="lorenzo_only">Solo Lorenzo</option><option value="fortuna_only">Solo Fortuna</option></select></label>'''
if payer not in text:
    raise SystemExit('payer marker missing')
text=text.replace(payer,split,1)

edit='''      $("#expense-paid-by").value = LF_PEOPLE.includes(exp.paidBy) ? exp.paidBy : "";
      $("#expense-description").value = exp.description || "";'''
edit_new='''      $("#expense-paid-by").value = LF_PEOPLE.includes(exp.paidBy) ? exp.paidBy : "";
      $("#expense-split-type").value = ["equal","lorenzo_only","fortuna_only"].includes(exp.splitType) ? exp.splitType : "equal";
      $("#expense-description").value = exp.description || "";'''
if edit not in text:
    raise SystemExit('edit marker missing')
text=text.replace(edit,edit_new,1)

submit='''    const paidBy = $("#expense-paid-by").value;
    if (!LF_PEOPLE.includes(paidBy)) return;
    const payload = { amount, date:$("#expense-date").value, city:$("#expense-city").value, category:$("#expense-category").value, description:$("#expense-description").value, paidBy };'''
submit_new='''    const paidBy = $("#expense-paid-by").value;
    if (!LF_PEOPLE.includes(paidBy)) return;
    const splitType = $("#expense-split-type").value || "equal";
    if (!["equal","lorenzo_only","fortuna_only"].includes(splitType)) return;
    const payload = { amount, date:$("#expense-date").value, city:$("#expense-city").value, category:$("#expense-category").value, description:$("#expense-description").value, paidBy, splitType };'''
if submit not in text:
    raise SystemExit('submit marker missing')
text=text.replace(submit,submit_new,1)

movement='''<em class="expense-paid-by ${e.paidBy?"":"missing"}">${e.paidBy ? `Pagato da ${e.paidBy}` : "⚠ Pagante da indicare"}</em></div>'''
movement_new='''<em class="expense-paid-by ${e.paidBy?"":"missing"}">${e.paidBy ? `Pagato da ${e.paidBy}` : "⚠ Pagante da indicare"}</em><em class="expense-split-type">${expenseSplitLabel(e)}</em></div>'''
if movement not in text:
    raise SystemExit('movement marker missing')
text=text.replace(movement,movement_new,1)

if 'Versione app 2.4.34' not in text:
    raise SystemExit('version marker missing')
text=text.replace('Versione app 2.4.34','Versione app 2.4.35',1)
p.write_text(text,encoding='utf-8')

# Index: load wizard after budget layout and cache-bust changed files.
p=Path('index.html')
text=p.read_text(encoding='utf-8')
repls={
    'budget-layout.css?v=1':'budget-layout.css?v=1\n<link rel="stylesheet" href="expense-wizard.css?v=1">',
    'firebase-budget.js?v=33':'firebase-budget.js?v=34',
    'app.js?v=110':'app.js?v=111',
    'budget-layout.js?v=2':'budget-layout.js?v=2\n<script src="expense-wizard.js?v=1"></script>'
}
for a,b in repls.items():
    if a not in text:
        raise SystemExit(f'index marker missing: {a}')
    text=text.replace(a,b,1)
p.write_text(text,encoding='utf-8')

# PWA cache.
p=Path('sw.js')
text=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v129' not in text:
    raise SystemExit('cache marker missing')
text=text.replace('viaggio-nozze-v129','viaggio-nozze-v130',1)
if '"./expense-wizard.css"' not in text:
    text=text.replace('  "./budget-layout.css",','  "./budget-layout.css",\n  "./expense-wizard.css",',1)
if '"./expense-wizard.js"' not in text:
    text=text.replace('  "./budget-layout.js",','  "./budget-layout.js",\n  "./expense-wizard.js",',1)
p.write_text(text,encoding='utf-8')
