/* V35 · wizard rapido per aggiunta/modifica spese */
(() => {
  const previousRenderBudgetScreen = renderBudgetScreen;
  const SPLITS = [
    { value:"equal", icon:"↔", title:"50/50", note:"Metà a testa" },
    { value:"lorenzo_only", icon:"L", title:"Solo Lorenzo", note:"Personale" },
    { value:"fortuna_only", icon:"F", title:"Solo Fortuna", note:"Personale" }
  ];

  function guessCityOption(select,date){
    const ranges=[
      ["2026-10-20","2026-10-22","San Francisco"],
      ["2026-10-23","2026-10-26","Los Angeles"],
      ["2026-10-27","2026-10-27","Las Vegas 27-28"],
      ["2026-10-28","2026-10-28","Page / Grand Canyon"],
      ["2026-10-29","2026-10-29","Las Vegas 29-30"],
      ["2026-10-30","2026-11-02","Chicago"],
      ["2026-11-03","2026-11-09","Bayahibe"]
    ];
    const label=ranges.find(([a,b])=>date>=a&&date<=b)?.[2];
    if(!label) return null;
    return Array.from(select.options).find(o=>o.value===label || o.textContent.trim()===label) || null;
  }

  function template(form){
    const categories=Array.from(form.querySelectorAll("#expense-category option")).map(o=>o.value);
    return `
      <div class="expense-wizard-backdrop" data-wizard-close></div>
      <section class="expense-wizard-sheet" role="dialog" aria-modal="true" aria-label="${editingExpenseId?"Modifica spesa":"Aggiungi spesa"}">
        <div class="expense-wizard-grab"></div>
        <div class="expense-wizard-head">
          <div><small>SPESA RAPIDA</small><strong>${editingExpenseId?"Modifica spesa":"Aggiungi spesa"}</strong></div>
          <button type="button" data-wizard-close aria-label="Chiudi">×</button>
        </div>
        <div class="expense-wizard-progress"><span></span><span></span><span></span></div>

        <div class="expense-wizard-step" data-step="1">
          <div class="expense-wizard-question">Quanto avete speso?</div>
          <div class="expense-wizard-amount"><span>$</span><input id="wiz-amount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="0.00"></div>
          <div class="expense-wizard-question small">Chi ha pagato?</div>
          <div class="expense-choice-grid two">
            <button type="button" data-wiz-payer="Lorenzo"><span>L</span><strong>Lorenzo</strong></button>
            <button type="button" data-wiz-payer="Fortuna"><span>F</span><strong>Fortuna</strong></button>
          </div>
        </div>

        <div class="expense-wizard-step" data-step="2">
          <div class="expense-wizard-question">Che tipo di spesa è?</div>
          <div class="expense-category-chips">${categories.map(cat=>`<button type="button" data-wiz-category="${escapeHtml(cat)}">${expenseCategoryIcon(cat)} ${escapeHtml(cat)}</button>`).join("")}</div>
          <div class="expense-wizard-question small">Come va divisa?</div>
          <div class="expense-choice-grid three">${SPLITS.map(x=>`<button type="button" data-wiz-split="${x.value}"><span>${x.icon}</span><strong>${x.title}</strong><small>${x.note}</small></button>`).join("")}</div>
          <p class="expense-wizard-hint">Se ognuno paga il proprio shopping personale, la spesa resta nel Budget ma non modifica il saldo da pareggiare.</p>
        </div>

        <div class="expense-wizard-step" data-step="3">
          <div class="expense-wizard-question">Ultimi dettagli</div>
          <label class="wizard-field">Descrizione <small>facoltativa</small><input id="wiz-description" type="text" maxlength="80" placeholder="Es. cena, souvenir, parcheggio…"></label>
          <div class="wizard-field-row">
            <label class="wizard-field">Tappa<select id="wiz-city"></select></label>
            <label class="wizard-field">Data<input id="wiz-date" type="date"></label>
          </div>
          <div class="expense-wizard-summary" id="wiz-summary"></div>
        </div>

        <div class="expense-wizard-actions">
          <button type="button" class="secondary-action" id="wiz-back">Indietro</button>
          <button type="button" class="primary-action" id="wiz-next">Continua</button>
        </div>
      </section>`;
  }

  function openWizard(form){
    if(!form || document.querySelector(".expense-wizard")) return;
    const wrap=document.createElement("div");
    wrap.className="expense-wizard";
    wrap.innerHTML=template(form);
    document.body.appendChild(wrap);
    document.body.classList.add("expense-wizard-open");

    const amount=wrap.querySelector("#wiz-amount");
    const description=wrap.querySelector("#wiz-description");
    const city=wrap.querySelector("#wiz-city");
    const date=wrap.querySelector("#wiz-date");
    const srcAmount=form.querySelector("#expense-amount");
    const srcPayer=form.querySelector("#expense-paid-by");
    const srcSplit=form.querySelector("#expense-split-type");
    const srcCategory=form.querySelector("#expense-category");
    const srcDescription=form.querySelector("#expense-description");
    const srcCity=form.querySelector("#expense-city");
    const srcDate=form.querySelector("#expense-date");

    city.innerHTML=srcCity?.innerHTML || '<option value="Generale">Generale</option>';
    amount.value=srcAmount?.value || "";
    description.value=srcDescription?.value || "";
    date.value=srcDate?.value || todayISO();
    city.value=srcCity?.value || "Generale";
    if(!editingExpenseId){
      const guessed=guessCityOption(city,date.value);
      if(guessed) city.value=guessed.value;
    }

    let step=1;
    let payer=srcPayer?.value || "";
    let split=srcSplit?.value || "equal";
    let category=srcCategory?.value || "Cibo";

    function close(cancelEdit=false){
      wrap.remove();
      document.body.classList.remove("expense-wizard-open");
      if(cancelEdit && editingExpenseId){ editingExpenseId=null; renderBudgetScreen(); }
    }
    function paint(){
      wrap.querySelectorAll("[data-wiz-payer]").forEach(b=>b.classList.toggle("active",b.dataset.wizPayer===payer));
      wrap.querySelectorAll("[data-wiz-split]").forEach(b=>b.classList.toggle("active",b.dataset.wizSplit===split));
      wrap.querySelectorAll("[data-wiz-category]").forEach(b=>b.classList.toggle("active",b.dataset.wizCategory===category));
    }
    function show(next){
      step=next;
      wrap.querySelectorAll(".expense-wizard-step").forEach(s=>s.classList.toggle("active",Number(s.dataset.step)===step));
      wrap.querySelectorAll(".expense-wizard-progress span").forEach((s,i)=>s.classList.toggle("active",i<step));
      wrap.querySelector("#wiz-back").hidden=step===1;
      wrap.querySelector("#wiz-next").textContent=step===3 ? (editingExpenseId?"Salva modifica":"Salva spesa") : "Continua";
      if(step===3){
        const splitLabel=split==="lorenzo_only"?"Solo Lorenzo":split==="fortuna_only"?"Solo Fortuna":"50/50";
        wrap.querySelector("#wiz-summary").innerHTML=`<span>${expenseCategoryIcon(category)} ${escapeHtml(category)}</span><strong>${money(Number(amount.value||0),"USD")}</strong><small>Pagato da ${escapeHtml(payer)} · ${splitLabel}</small>`;
      }
    }
    function stepValid(){
      if(step!==1) return true;
      const value=Number(amount.value);
      if(!Number.isFinite(value)||value<=0){ amount.focus(); return false; }
      if(!LF_PEOPLE.includes(payer)){ alert("Scegli chi ha pagato."); return false; }
      return true;
    }

    wrap.querySelectorAll("[data-wizard-close]").forEach(el=>el.addEventListener("click",()=>close(true)));
    wrap.querySelectorAll("[data-wiz-payer]").forEach(b=>b.addEventListener("click",()=>{payer=b.dataset.wizPayer;paint();}));
    wrap.querySelectorAll("[data-wiz-split]").forEach(b=>b.addEventListener("click",()=>{split=b.dataset.wizSplit;paint();}));
    wrap.querySelectorAll("[data-wiz-category]").forEach(b=>b.addEventListener("click",()=>{category=b.dataset.wizCategory;paint();}));
    wrap.querySelector("#wiz-back").addEventListener("click",()=>show(Math.max(1,step-1)));
    wrap.querySelector("#wiz-next").addEventListener("click",()=>{
      if(!stepValid()) return;
      if(step<3){ show(step+1); return; }
      srcAmount.value=amount.value;
      srcPayer.value=payer;
      srcSplit.value=split;
      srcCategory.value=category;
      srcDescription.value=description.value;
      srcCity.value=city.value;
      srcDate.value=date.value || todayISO();
      form.querySelector("#expense-save")?.click();
      close(false);
    });
    date.addEventListener("change",()=>{
      if(editingExpenseId) return;
      const guessed=guessCityOption(city,date.value);
      if(guessed) city.value=guessed.value;
    });

    paint(); show(1);
    requestAnimationFrame(()=>amount.focus());
  }

  function enhance(){
    const root=document.querySelector("#screen-budget");
    if(!root || root.dataset.expenseWizardReady==="1") return;
    const panel=root.querySelector('.budget-panel[data-budget-panel="budget"]');
    const form=panel?.querySelector("#expense-form");
    if(!panel || !form) return;
    root.dataset.expenseWizardReady="1";

    form.classList.add("expense-form-source");
    const oldQuick=panel.querySelector(".budget-quick-add-title");
    oldQuick?.remove();

    const button=document.createElement("button");
    button.type="button";
    button.className="budget-add-expense-btn";
    button.innerHTML=`<span class="budget-add-expense-plus">+</span><span><strong>${editingExpenseId?"Modifica spesa":"Aggiungi spesa"}</strong><small>Importo, pagante e categoria in pochi tocchi</small></span><b>›</b>`;
    form.insertAdjacentElement("beforebegin",button);
    button.addEventListener("click",()=>openWizard(form));

    if(editingExpenseId) requestAnimationFrame(()=>openWizard(form));
  }

  renderBudgetScreen=function(){
    const root=document.querySelector("#screen-budget");
    if(root) delete root.dataset.expenseWizardReady;
    previousRenderBudgetScreen();
    enhance();
  };

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",()=>requestAnimationFrame(()=>{
    if(document.querySelector("#screen-budget.active")) renderBudgetScreen();
  }),{once:true});
})();
