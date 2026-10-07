from pathlib import Path

# app.js
p=Path('app.js')
t=p.read_text(encoding='utf-8')

old='''        <label class="expense-payer-field">Pagato da<select id="expense-paid-by" required><option value="" selected disabled>Seleziona Lorenzo o Fortuna</option><option value="Lorenzo">Lorenzo</option><option value="Fortuna">Fortuna</option></select></label>'''
new='''        <input id="expense-currency" type="hidden" value="USD">
        <label class="expense-payer-field">Pagato da<select id="expense-paid-by" required><option value="" selected disabled>Seleziona Lorenzo o Fortuna</option><option value="Lorenzo">Lorenzo</option><option value="Fortuna">Fortuna</option></select></label>'''
if old not in t: raise SystemExit('expense payer marker missing')
t=t.replace(old,new,1)

old='''      $("#expense-paid-by").value = LF_PEOPLE.includes(exp.paidBy) ? exp.paidBy : "";
      $("#expense-split-type").value = ["equal","lorenzo_only","fortuna_only"].includes(exp.splitType) ? exp.splitType : "equal";'''
new='''      $("#expense-currency").value = exp.currency === "DOP" ? "DOP" : "USD";
      $("#expense-paid-by").value = LF_PEOPLE.includes(exp.paidBy) ? exp.paidBy : "";
      $("#expense-split-type").value = ["equal","lorenzo_only","fortuna_only"].includes(exp.splitType) ? exp.splitType : "equal";'''
if old not in t: raise SystemExit('expense edit marker missing')
t=t.replace(old,new,1)

old='''    const payload = { amount, date:$("#expense-date").value, city:$("#expense-city").value, category:$("#expense-category").value, description:$("#expense-description").value, paidBy, splitType };'''
new='''    const expenseCurrency = $("#expense-currency")?.value === "DOP" ? "DOP" : "USD";
    const payload = { amount, currency:expenseCurrency, date:$("#expense-date").value, city:$("#expense-city").value, category:$("#expense-category").value, description:$("#expense-description").value, paidBy, splitType };'''
if old not in t: raise SystemExit('expense payload marker missing')
t=t.replace(old,new,1)

old='''  const spent = expenses.reduce((sum,e) => sum + Number(e.amount || 0), 0);'''
new='''  const spent = expenses.filter(e => (e.currency || "USD") === "USD").reduce((sum,e) => sum + Number(e.amount || 0), 0);'''
if old not in t: raise SystemExit('spent marker missing')
t=t.replace(old,new,1)

old='''  const citySpent = expenses.reduce((acc,e) => { acc[e.city] = (acc[e.city] || 0) + Number(e.amount || 0); return acc; }, {});'''
new='''  const citySpent = expenses.filter(e => (e.currency || "USD") === "USD").reduce((acc,e) => { acc[e.city] = (acc[e.city] || 0) + Number(e.amount || 0); return acc; }, {});'''
if old not in t: raise SystemExit('citySpent marker missing')
t=t.replace(old,new,1)

old='''          <div class="expense-amount">${money(e.amount,currency)}</div>'''
new='''          <div class="expense-amount">${money(e.amount,e.currency === "DOP" ? "DOP" : "USD")}</div>'''
if old not in t: raise SystemExit('movement amount marker missing')
t=t.replace(old,new,1)

if 'Versione app 2.4.35' not in t: raise SystemExit('version marker missing')
t=t.replace('Versione app 2.4.35','Versione app 2.4.37',1)
p.write_text(t,encoding='utf-8')

# index.html
p=Path('index.html')
t=p.read_text(encoding='utf-8')
replacements={
  'budget-layout.css?v=1':'budget-layout.css?v=2',
  'expense-wizard.css?v=2':'expense-wizard.css?v=3',
  'firebase-budget.js?v=34':'firebase-budget.js?v=35',
  'app.js?v=112':'app.js?v=113',
  'budget-layout.js?v=3':'budget-layout.js?v=4',
  'expense-wizard.js?v=2':'expense-wizard.js?v=3',
}
for old,new in replacements.items():
    if old not in t: raise SystemExit(f'index marker missing: {old}')
    t=t.replace(old,new,1)
css_marker='<link rel="stylesheet" href="expense-wizard.css?v=3">'
if css_marker not in t: raise SystemExit('wizard css marker missing')
t=t.replace(css_marker,css_marker+'\n<link rel="stylesheet" href="budget-summary.css?v=1">',1)
js_marker='<script src="expense-wizard.js?v=3"></script>'
if js_marker not in t: raise SystemExit('wizard js marker missing')
t=t.replace(js_marker,js_marker+'\n<script src="budget-summary.js?v=1"></script>',1)
p.write_text(t,encoding='utf-8')

# sw.js
p=Path('sw.js')
t=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v132' not in t: raise SystemExit('cache marker missing')
t=t.replace('viaggio-nozze-v132','viaggio-nozze-v133',1)
if '"./expense-wizard.css",' not in t: raise SystemExit('sw css marker missing')
t=t.replace('"./expense-wizard.css",','"./expense-wizard.css",\n  "./budget-summary.css",',1)
if '"./expense-wizard.js",' not in t: raise SystemExit('sw js marker missing')
t=t.replace('"./expense-wizard.js",','"./expense-wizard.js",\n  "./budget-summary.js",',1)
p.write_text(t,encoding='utf-8')
