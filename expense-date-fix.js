/* 2.4.70 · Data locale per le nuove spese.
   Il core usa todayISO() basato su UTC: la sera negli USA può quindi risultare già il giorno successivo.
   Prima di aprire il wizard impostiamo solo le NUOVE spese sulla data locale del dispositivo.
   Le spese esistenti in modifica mantengono la loro data salvata. */
(() => {
  function currentLocalDate(){
    if (typeof localISODate === "function") return localISODate();
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  document.addEventListener("click", event => {
    const trigger = event.target.closest?.(".budget-add-expense-btn");
    if (!trigger) return;

    try {
      if (typeof editingExpenseId !== "undefined" && editingExpenseId) return;
    } catch (_) {}

    const sourceDate = document.querySelector("#screen-budget #expense-date");
    if (sourceDate) sourceDate.value = currentLocalDate();
  }, true);
})();
