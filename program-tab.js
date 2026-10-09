(() => {
  "use strict";

  const screen = document.getElementById("screen-program");
  if (!screen) return;

  let selectedDate = "";

  const localIsoDate = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const formatChip = (iso) => {
    const d = new Date(`${iso}T12:00:00`);
    return {
      weekday: new Intl.DateTimeFormat("it-IT", { weekday: "short" }).format(d).replace(".", ""),
      day: new Intl.DateTimeFormat("it-IT", { day: "numeric" }).format(d),
      month: new Intl.DateTimeFormat("it-IT", { month: "short" }).format(d).replace(".", "")
    };
  };

  const getRows = () => {
    if (typeof allProgramDays !== "function") return [];
    try {
      return allProgramDays().filter(row => row && row.day && row.day.date);
    } catch (error) {
      console.error("Programma: impossibile leggere le giornate", error);
      return [];
    }
  };

  const chooseDefaultDate = (dates) => {
    if (!dates.length) return "";
    const today = localIsoDate();
    if (dates.includes(today)) return today;
    if (today < dates[0]) return dates[0];
    if (today > dates[dates.length - 1]) return dates[dates.length - 1];
    return dates.find(date => date > today) || dates[0];
  };

  const scrollSelectedIntoView = () => {
    requestAnimationFrame(() => {
      const active = screen.querySelector(".program-date-chip.active");
      active?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
    });
  };

  const render = (forcedDate = "") => {
    const rows = getRows();
    const dates = [...new Set(rows.map(row => row.day.date))].sort();

    if (!dates.length || typeof programDayHtml !== "function") {
      screen.innerHTML = `
        <div class="program-hub-head">
          <h2>Programma</h2>
          <p>Il viaggio giorno per giorno</p>
        </div>
        <div class="empty-note">Programma momentaneamente non disponibile.</div>`;
      return;
    }

    if (forcedDate && dates.includes(forcedDate)) selectedDate = forcedDate;
    if (!dates.includes(selectedDate)) selectedDate = chooseDefaultDate(dates);

    const selectedRows = rows.filter(row => row.day.date === selectedDate);

    screen.innerHTML = `
      <div class="program-hub">
        <div class="program-hub-head">
          <h2>Programma</h2>
          <p>Il viaggio giorno per giorno</p>
        </div>

        <div class="program-date-strip" role="tablist" aria-label="Giorni del viaggio">
          ${dates.map(date => {
            const label = formatChip(date);
            const active = date === selectedDate;
            return `<button type="button" class="program-date-chip${active ? " active" : ""}" data-program-date="${date}" role="tab" aria-selected="${active}">
              <span>${label.weekday}</span><strong>${label.day}</strong><small>${label.month}</small>
            </button>`;
          }).join("")}
        </div>

        <div class="program-selected-day">
          ${selectedRows.map(row => `
            <div class="program-hub-city">${row.leg.city}</div>
            ${programDayHtml(row.day)}
          `).join("")}
        </div>
      </div>`;

    screen.querySelectorAll(".program-date-chip").forEach(button => {
      button.addEventListener("click", () => render(button.dataset.programDate || ""));
    });

    scrollSelectedIntoView();
  };

  try {
    render();
  } catch (error) {
    console.error("Programma: errore di rendering isolato", error);
    screen.innerHTML = `
      <div class="program-hub-head">
        <h2>Programma</h2>
        <p>Il viaggio giorno per giorno</p>
      </div>
      <div class="empty-note">Programma momentaneamente non disponibile.</div>`;
  }
})();
