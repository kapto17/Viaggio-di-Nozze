/* V37 · riepilogo spese + conti L&F separati per valuta */
(() => {
  const previousRenderBudgetScreen = renderBudgetScreen;
  let activeSummaryView = "city";

  const CITY_ORDER = [
    "San Francisco",
    "Los Angeles",
    "Las Vegas 27-28",
    "Page / Grand Canyon",
    "Las Vegas 29-30",
    "Chicago",
    "Bayahibe"
  ];

  function entryCurrency(entry){
    return entry && entry.currency === "DOP" ? "DOP" : "USD";
  }

  function total(entries){
    return (entries || []).reduce((sum,entry) => sum + Number(entry.amount || 0), 0);
  }

  function amountPair(entries){
    const usd = total((entries || []).filter(e => entryCurrency(e) === "USD"));
    const dop = total((entries || []).filter(e => entryCurrency(e) === "DOP"));
    const parts = [];
    if (usd || !dop) parts.push(money(usd,"USD"));
    if (dop) parts.push(money(dop,"DOP"));
    return parts.join(" + ");
  }

  function debtDirection(balance){
    const amount = Math.abs(Number(balance || 0));
    if (amount < 0.005) return null;
    return balance > 0
      ? { debtor:"Fortuna", creditor:"Lorenzo", from:"Fortuna", to:"Lorenzo", amount }
      : { debtor:"Lorenzo", creditor:"Fortuna", from:"Lorenzo", to:"Fortuna", amount };
  }

  function ledgerFor(currency){
    const { expenses, settlements } = currentBudgetData();
    let paidLorenzo = 0, paidFortuna = 0, sharedTotal = 0, unassigned = 0, balance = 0;

    expenses.filter(e => entryCurrency(e) === currency).forEach(expense => {
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

    settlements.filter(s => entryCurrency(s) === currency).forEach(settlement => {
      const amount = Number(settlement.amount || 0);
      if (!Number.isFinite(amount) || amount <= 0) return;
      if (settlement.from === "Fortuna" && settlement.to === "Lorenzo") balance -= amount;
      if (settlement.from === "Lorenzo" && settlement.to === "Fortuna") balance += amount;
    });

    if (Math.abs(balance) < 0.005) balance = 0;
    return { currency, paidLorenzo, paidFortuna, sharedTotal, shareEach:sharedTotal/2, balance, unassigned };
  }

  function categoryRows(entries){
    const groups = new Map();
    (entries || []).forEach(e => {
      const key = e.category || "Altro";
      if (!groups.has(key)) groups.set(key,[]);
      groups.get(key).push(e);
    });
    return Array.from(groups.entries()).sort((a,b) => total(b[1]) - total(a[1]));
  }

  function cityRows(entries){
    const groups = new Map();
    (entries || []).forEach(e => {
      const key = e.city || "Generale";
      if (!groups.has(key)) groups.set(key,[]);
      groups.get(key).push(e);
    });
    return Array.from(groups.entries()).sort((a,b) => {
      const ai = CITY_ORDER.indexOf(a[0]), bi = CITY_ORDER.indexOf(b[0]);
      if (ai === -1 && bi === -1) return a[0].localeCompare(b[0]);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }

  function plannedForCity(city,settings){
    if (city === "Bayahibe") return { amount:Number(settings.bayahibeBudgetDOP || 0), currency:"DOP" };
    return { amount:Number((settings.cityBudgets || {})[city] || 0), currency:"USD" };
  }

  function actualForExpectedCurrency(entries,currency){
    return total((entries || []).filter(e => entryCurrency(e) === currency));
  }

  function renderCityView(expenses,settings){
    const extras = Array.from(new Set(expenses.map(e => e.city || "Generale"))).filter(city => !CITY_ORDER.includes(city));
    const cities = [...CITY_ORDER, ...extras];
    return `<div class="summary-list">${cities.map(city => {
      const rows = expenses.filter(e => (e.city || "Generale") === city);
      const planned = plannedForCity(city,settings);
      const spentExpected = actualForExpectedCurrency(rows,planned.currency);
      const remaining = planned.amount - spentExpected;
      const breakdown = categoryRows(rows);
      return `<details class="summary-breakdown-card">
        <summary>
          <span class="summary-breakdown-main"><strong>${escapeHtml(city)}</strong><small>${planned.amount > 0 ? `Previsto ${money(planned.amount,planned.currency)} · ${remaining >= 0 ? "restano" : "oltre"} ${money(Math.abs(remaining),planned.currency)}` : city === "Bayahibe" ? "Budget DOP da impostare" : "Nessun budget previsto"}</small></span>
          <span class="summary-breakdown-total">${amountPair(rows)}</span>
          <span class="accordion-chevron">⌄</span>
        </summary>
        <div class="summary-breakdown-content">
          ${breakdown.length ? breakdown.map(([category,items]) => `<div class="summary-mini-row"><span>${expenseCategoryIcon(category)} ${escapeHtml(category)}</span><strong>${amountPair(items)}</strong></div>`).join("") : `<div class="empty-note">Nessuna spesa registrata per questa tappa.</div>`}
        </div>
      </details>`;
    }).join("")}</div>`;
  }

  function renderCategoryView(expenses){
    const categories = categoryRows(expenses);
    if (!categories.length) return `<div class="empty-note">Le categorie compariranno qui appena registrate le prime spese.</div>`;
    return `<div class="summary-list">${categories.map(([category,rows]) => {
      const breakdown = cityRows(rows);
      return `<details class="summary-breakdown-card">
        <summary>
          <span class="summary-breakdown-main"><strong>${expenseCategoryIcon(category)} ${escapeHtml(category)}</strong><small>${rows.length} ${rows.length===1?"movimento":"movimenti"}</small></span>
          <span class="summary-breakdown-total">${amountPair(rows)}</span>
          <span class="accordion-chevron">⌄</span>
        </summary>
        <div class="summary-breakdown-content">
          ${breakdown.map(([city,items]) => `<div class="summary-mini-row"><span>${escapeHtml(city)}</span><strong>${amountPair(items)}</strong></div>`).join("")}
        </div>
      </details>`;
    }).join("")}</div>`;
  }

  function renderSummary(root){
    const host = root.querySelector("#budget-summary-analytics");
    if (!host) return;
    const { settings, expenses } = currentBudgetData();
    const usdExpenses = expenses.filter(e => entryCurrency(e) === "USD");
    const dopExpenses = expenses.filter(e => entryCurrency(e) === "DOP");
    const bayahibeDop = dopExpenses.filter(e => (e.city || "") === "Bayahibe");
    const usdSpent = total(usdExpenses);
    const dopSpent = total(bayahibeDop);
    const usdBudget = Number(settings.totalBudget || 0);
    const dopBudget = Number(settings.bayahibeBudgetDOP || 0);
    const dopOutsideBayahibe = dopExpenses.filter(e => (e.city || "") !== "Bayahibe");

    host.innerHTML = `
      <div class="summary-currency-grid">
        <div class="summary-currency-card">
          <small>BUDGET USD</small>
          <strong>${money(usdSpent,"USD")} spesi</strong>
          <span>${usdBudget > 0 ? `${money(Math.max(0,usdBudget-usdSpent),"USD")} rimanenti su ${money(usdBudget,"USD")}` : "Budget USD non impostato"}</span>
        </div>
        <div class="summary-currency-card bayahibe">
          <small>BAYAHIBE · DOP</small>
          <strong>${money(dopSpent,"DOP")} spesi</strong>
          <span>${dopBudget > 0 ? `${money(Math.max(0,dopBudget-dopSpent),"DOP")} rimanenti su ${money(dopBudget,"DOP")}` : "Budget DOP da impostare"}</span>
          <button type="button" id="summary-edit-bayahibe-budget">${dopBudget > 0 ? "✎ Modifica budget" : "+ Imposta budget DOP"}</button>
        </div>
      </div>
      <div class="summary-currency-note">USD e DOP restano separati: nessuna conversione automatica viene usata nei totali.</div>
      ${dopOutsideBayahibe.length ? `<div class="summary-warning">⚠️ ${dopOutsideBayahibe.length} ${dopOutsideBayahibe.length===1?"spesa in DOP è associata":"spese in DOP sono associate"} a una tappa diversa da Bayahibe. Il riepilogo la mostra comunque senza convertirla.</div>` : ""}

      <div class="summary-section-head"><div><strong>Analisi spese</strong><span>Leggi gli stessi movimenti per tappa oppure per categoria.</span></div></div>
      <div class="summary-view-switch" role="tablist">
        <button type="button" data-summary-view="city" class="${activeSummaryView==="city"?"active":""}">📍 Per tappa</button>
        <button type="button" data-summary-view="category" class="${activeSummaryView==="category"?"active":""}">◫ Per categoria</button>
      </div>
      <div class="summary-view" data-summary-content="city" ${activeSummaryView==="city"?"":"hidden"}>${renderCityView(expenses,settings)}</div>
      <div class="summary-view" data-summary-content="category" ${activeSummaryView==="category"?"":"hidden"}>${renderCategoryView(expenses)}</div>`;

    host.querySelectorAll("[data-summary-view]").forEach(btn => btn.addEventListener("click",() => {
      activeSummaryView = btn.dataset.summaryView;
      host.querySelectorAll("[data-summary-view]").forEach(b => b.classList.toggle("active",b===btn));
      host.querySelectorAll("[data-summary-content]").forEach(panel => panel.hidden = panel.dataset.summaryContent !== activeSummaryView);
    }));

    host.querySelector("#summary-edit-bayahibe-budget")?.addEventListener("click", async () => {
      const current = Number(settings.bayahibeBudgetDOP || 0);
      const raw = prompt("Budget per Bayahibe in pesos dominicani (DOP)", current > 0 ? String(current) : "");
      if (raw === null) return;
      const value = Number(String(raw).replace(",","."));
      if (!Number.isFinite(value) || value < 0){ alert("Inserisci un budget DOP valido."); return; }
      try { await window.LFBudget.saveSettings({ bayahibeBudgetDOP:value }); }
      catch(err){ console.error(err); alert("Non sono riuscito a salvare il budget Bayahibe."); }
    });
  }

  function splitBlock(currency,ledger){
    const debt = debtDirection(ledger.balance);
    return `<section class="lf-currency-ledger" data-ledger-currency="${currency}">
      <div class="lf-currency-ledger-head"><div><small>${currency === "USD" ? "DOLLARI" : "PESOS DOMINICANI"}</small><strong>${currency}</strong></div><b>${currency === "USD" ? "$" : "RD$"}</b></div>
      <div class="lf-split-paid-grid">
        <div><span>Lorenzo ha pagato</span><strong>${money(ledger.paidLorenzo,currency)}</strong></div>
        <div><span>Fortuna ha pagato</span><strong>${money(ledger.paidFortuna,currency)}</strong></div>
      </div>
      <div class="lf-split-share">Spese condivise: <strong>${money(ledger.sharedTotal,currency)}</strong> · quota a testa <strong>${money(ledger.shareEach,currency)}</strong></div>
      <div class="lf-split-balance ${debt ? "debt" : "settled"}">
        <small>Saldo ${currency}</small>
        <strong>${debt ? `${debt.debtor} deve a ${debt.creditor} ${money(debt.amount,currency)}` : "Siete in pari ✓"}</strong>
        <span>${debt ? "Questo saldo usa solo movimenti nella stessa valuta." : "Nessun conto in sospeso in questa valuta."}</span>
      </div>
      ${ledger.unassigned ? `<div class="lf-split-warning">⚠️ ${ledger.unassigned} ${ledger.unassigned===1?"spesa non ha":"spese non hanno"} ancora un pagante.</div>` : ""}
      ${debt ? `<div class="lf-split-actions"><button type="button" class="primary-action" data-settle-full="${currency}">✓ Pareggia tutto</button><button type="button" class="secondary-action" data-settle-partial="${currency}">Pareggio parziale</button></div>
      <div class="lf-currency-partial" data-partial-panel="${currency}" hidden><input type="number" min="0.01" max="${debt.amount.toFixed(2)}" step="0.01" inputmode="decimal" placeholder="Importo"><button type="button" data-settle-save="${currency}">Registra</button></div>` : ""}
    </section>`;
  }

  function renderSplit(root){
    const card = root.querySelector(".lf-split-card");
    if (!card) return;
    const { expenses, settlements } = currentBudgetData();
    const hasDop = expenses.some(e => entryCurrency(e) === "DOP") || settlements.some(s => entryCurrency(s) === "DOP");
    const currencies = hasDop ? ["USD","DOP"] : ["USD"];

    card.innerHTML = `
      <div class="lf-split-head"><div><small>CONTI L&amp;F</small><strong>Saldi separati per valuta</strong></div><span class="lf-split-icon" aria-hidden="true">⇄</span></div>
      <p class="lf-split-currency-note">Dollari e pesos non vengono mai sommati o convertiti automaticamente.</p>
      ${currencies.map(currency => splitBlock(currency,ledgerFor(currency))).join("")}
      <details class="lf-settlement-history">
        <summary>Storico pareggi <span>${settlements.length}</span></summary>
        <div class="lf-settlement-list">${settlements.length ? settlements.map(s => {
          const currency = entryCurrency(s);
          return `<div class="lf-settlement-row"><div><strong>${escapeHtml(s.from || "—")} → ${escapeHtml(s.to || "—")}</strong><span>${formatExpenseDate(s.date)} · ${escapeHtml(s.note || "Pareggio manuale")} · ${currency}</span></div><b>${money(s.amount,currency)}</b><button type="button" data-delete-settlement="${s.id}" aria-label="Annulla questo pareggio">×</button></div>`;
        }).join("") : `<div class="empty-note">Nessun pareggio registrato.</div>`}</div>
      </details>`;

    card.querySelectorAll("[data-settle-full]").forEach(btn => btn.addEventListener("click", async () => {
      const currency = btn.dataset.settleFull;
      const debt = debtDirection(ledgerFor(currency).balance);
      if (!debt) return;
      if (!confirm(`Considerare pareggiati tutti i ${money(debt.amount,currency)} che ${debt.debtor} deve a ${debt.creditor}?`)) return;
      try { await window.LFBudget.addSettlement({ amount:debt.amount, from:debt.from, to:debt.to, currency, note:"Pareggio completo", date:todayISO() }); }
      catch(err){ console.error(err); alert("Non sono riuscito a registrare il pareggio."); }
    }));

    card.querySelectorAll("[data-settle-partial]").forEach(btn => btn.addEventListener("click",() => {
      const panel = card.querySelector(`[data-partial-panel="${btn.dataset.settlePartial}"]`);
      if (panel) panel.hidden = !panel.hidden;
    }));

    card.querySelectorAll("[data-settle-save]").forEach(btn => btn.addEventListener("click", async () => {
      const currency = btn.dataset.settleSave;
      const panel = card.querySelector(`[data-partial-panel="${currency}"]`);
      const input = panel?.querySelector("input");
      const value = Number(input?.value || 0);
      const debt = debtDirection(ledgerFor(currency).balance);
      if (!debt || !Number.isFinite(value) || value <= 0) return;
      if (value > debt.amount + 0.005){ alert("L'importo supera il debito attuale."); return; }
      try { await window.LFBudget.addSettlement({ amount:value, from:debt.from, to:debt.to, currency, note:"Pareggio manuale", date:todayISO() }); }
      catch(err){ console.error(err); alert("Non sono riuscito a registrare il pareggio."); }
    }));

    card.querySelectorAll("[data-delete-settlement]").forEach(btn => btn.addEventListener("click", async () => {
      if (!confirm("Annullare questo pareggio e ripristinare il saldo precedente?")) return;
      try { await window.LFBudget.removeSettlement(btn.dataset.deleteSettlement); }
      catch(err){ console.error(err); alert("Non sono riuscito ad annullare il pareggio."); }
    }));
  }

  function correctBudgetCards(root){
    const { settings, expenses } = currentBudgetData();
    const usdSpent = total(expenses.filter(e => entryCurrency(e) === "USD"));
    const totalBudget = Number(settings.totalBudget || 0);
    const remaining = totalBudget - usdSpent;
    const cards = root.querySelectorAll('.budget-panel[data-budget-panel="budget"] .budget-summary-card');
    if (cards[0]) cards[0].querySelector("strong").textContent = money(totalBudget,"USD");
    if (cards[1]) cards[1].querySelector("strong").textContent = money(usdSpent,"USD");
    if (cards[2]) cards[2].querySelector("strong").textContent = money(remaining,"USD");
    const progress = root.querySelector('.budget-panel[data-budget-panel="budget"] .budget-progress span');
    if (progress) progress.style.width = `${totalBudget > 0 ? Math.min(100,Math.max(0,usdSpent/totalBudget*100)) : 0}%`;

    expenses.forEach(expense => {
      const row = root.querySelector(`[data-expense-id="${CSS.escape(String(expense.id))}"]`);
      const amount = row?.querySelector(".expense-amount");
      if (amount) amount.textContent = money(expense.amount,entryCurrency(expense));
    });
  }

  function enhance(){
    const root = document.querySelector("#screen-budget");
    if (!root) return;
    correctBudgetCards(root);
    renderSummary(root);
    renderSplit(root);
  }

  renderBudgetScreen = function(){
    previousRenderBudgetScreen();
    enhance();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",() => requestAnimationFrame(() => {
    if (document.querySelector("#screen-budget.active")) renderBudgetScreen();
  }),{ once:true });
})();
