/* V34 · separazione Budget / Conti L&F / Strumenti */
(() => {
  let activeBudgetPanel = "budget";
  const originalRenderBudgetScreen = renderBudgetScreen;

  function makeIntro(title, text){
    const intro=document.createElement("div");
    intro.className="budget-panel-intro";
    intro.innerHTML=`<strong>${title}</strong><span>${text}</span>`;
    return intro;
  }

  function appendIf(panel,node){ if(node) panel.appendChild(node); }

  function setPanel(root,name,focus=false){
    activeBudgetPanel=name;
    root.querySelectorAll("[data-budget-panel]").forEach(panel=>{
      panel.hidden=panel.dataset.budgetPanel!==name;
    });
    root.querySelectorAll("[data-budget-hub]").forEach(btn=>{
      const selected=btn.dataset.budgetHub===name;
      btn.classList.toggle("active",selected);
      btn.setAttribute("aria-selected",selected?"true":"false");
    });
    if(focus){
      const panel=root.querySelector(`[data-budget-panel="${name}"]`);
      panel?.scrollIntoView({behavior:"smooth",block:"start"});
    }
  }

  function enhanceBudgetLayout(){
    const root=document.querySelector("#screen-budget");
    if(!root || !root.querySelector(".budget-hero") || root.dataset.budgetHubReady==="1") return;
    root.dataset.budgetHubReady="1";

    const hero=root.querySelector(".budget-hero");
    const back=root.querySelector("#back-budget");

    const nav=document.createElement("div");
    nav.className="budget-hub-nav";
    nav.setAttribute("role","tablist");
    nav.innerHTML=`
      <button type="button" class="budget-hub-tab" data-budget-hub="budget" role="tab"><span class="budget-hub-tab-icon">💰</span><strong>Budget</strong><small>Spese e previsioni</small></button>
      <button type="button" class="budget-hub-tab" data-budget-hub="split" role="tab"><span class="budget-hub-tab-icon">⇄</span><strong>Conti L&amp;F</strong><small>Chi deve quanto</small></button>
      <button type="button" class="budget-hub-tab" data-budget-hub="tools" role="tab"><span class="budget-hub-tab-icon">€$</span><strong>Strumenti</strong><small>Cambio e mancia</small></button>`;
    hero.insertAdjacentElement("afterend",nav);

    const budget=document.createElement("section");
    budget.className="budget-panel";
    budget.dataset.budgetPanel="budget";
    budget.appendChild(makeIntro("Budget del viaggio","Riepilogo generale, nuova spesa e costi previsti in un'unica area."));

    const summary=root.querySelector(".budget-summary-grid");
    const progress=root.querySelector(".budget-progress");
    const editTotal=root.querySelector("#budget-edit-total");
    appendIf(budget,summary);
    appendIf(budget,progress);
    appendIf(budget,editTotal);

    const expenseForm=root.querySelector("#expense-form");
    const expenseTitle=expenseForm?.previousElementSibling?.classList.contains("section-title") ? expenseForm.previousElementSibling : null;
    const quickTitle=document.createElement("div");
    quickTitle.className="budget-quick-add-title";
    quickTitle.innerHTML=`<strong>${editingExpenseId ? "Modifica spesa" : "+ Aggiungi spesa"}</strong><span>Registrala appena paghi</span>`;
    budget.appendChild(quickTitle);
    if(expenseTitle) expenseTitle.remove();
    appendIf(budget,expenseForm);

    const list=root.querySelector(".expense-list");
    const movementsTitle=list?.previousElementSibling?.classList.contains("section-title") ? list.previousElementSibling : null;
    appendIf(budget,movementsTitle);
    appendIf(budget,list);

    const forecastTitle=document.createElement("div");
    forecastTitle.className="section-title budget-forecast-title";
    forecastTitle.textContent="Costi previsti e ripartizione";
    budget.appendChild(forecastTitle);
    root.querySelectorAll("details.budget-city-accordion").forEach(details=>budget.appendChild(details));
    appendIf(budget,root.querySelector(".budget-offline-note"));

    const split=document.createElement("section");
    split.className="budget-panel";
    split.dataset.budgetPanel="split";
    split.appendChild(makeIntro("Conti tra Lorenzo e Fortuna","Spese condivise, personali e pareggi: qui vedi solo ciò che resta da compensare tra voi."));
    appendIf(split,root.querySelector(".lf-split-card"));

    const tools=document.createElement("section");
    tools.className="budget-panel";
    tools.dataset.budgetPanel="tools";
    tools.appendChild(makeIntro("Strumenti rapidi","Convertitore valuta e calcolo della mancia, separati dalla contabilità del viaggio."));
    appendIf(tools,root.querySelector(".currency-converter"));
    appendIf(tools,root.querySelector(".tip-calculator"));

    root.appendChild(budget);
    root.appendChild(split);
    root.appendChild(tools);
    if(back) root.insertBefore(back,root.firstChild);

    nav.querySelectorAll("[data-budget-hub]").forEach(btn=>btn.addEventListener("click",()=>setPanel(root,btn.dataset.budgetHub,true)));
    setPanel(root,activeBudgetPanel,false);
  }

  renderBudgetScreen=function(){
    const root=document.querySelector("#screen-budget");
    if(root) delete root.dataset.budgetHubReady;
    originalRenderBudgetScreen();
    enhanceBudgetLayout();
  };

  const refreshIfOpen=()=>{
    if(document.querySelector("#screen-budget.active")) renderBudgetScreen();
  };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(refreshIfOpen),{once:true});
  else requestAnimationFrame(refreshIfOpen);
})();
