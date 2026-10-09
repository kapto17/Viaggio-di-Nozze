from pathlib import Path

# app.js — keep the existing internal 'cities' screen/history key, but turn its content into Programma.
p = Path('app.js')
s = p.read_text(encoding='utf-8')
start_marker = '// ---------- Rendering: Città (elenco) ----------'
end_marker = '// ---------- Rendering: dettaglio città ----------'
start = s.find(start_marker)
end = s.find(end_marker, start)
if start < 0 or end < 0:
    raise SystemExit('render cities section markers not found')
new_section = r'''// ---------- Rendering: Programma (riusa lo screen "cities" per non cambiare history/navigation) ----------
let programTabSelectedDate = "";

function programTabDates(){
  return [...new Set(allProgramDays().map(row => row.day.date))].sort();
}

function programTabDefaultDate(dates){
  if(!dates.length) return "";
  const today = localISODate();
  if(today <= dates[0]) return dates[0];
  if(today >= dates[dates.length - 1]) return dates[dates.length - 1];
  if(dates.includes(today)) return today;
  return dates.find(date => date > today) || dates[0];
}

function programTabChipHtml(iso, active){
  const d = new Date(`${iso}T12:00:00`);
  const weekday = d.toLocaleDateString("it-IT", {weekday:"short"}).replace(".", "");
  const month = d.toLocaleDateString("it-IT", {month:"short"}).replace(".", "");
  return `<button type="button" class="program-date-chip ${active ? "active" : ""}" data-program-tab-date="${iso}" aria-pressed="${active ? "true" : "false"}">
    <span>${weekday}</span><strong>${d.getDate()}</strong><small>${month}</small>
  </button>`;
}

function renderCitiesList(forcedDate=null){
  const el = $("#screen-cities");
  const rows = allProgramDays();
  const dates = programTabDates();

  if(!dates.length){
    el.innerHTML = `<div class="program-hub-head"><h2>Programma</h2></div><div class="empty-note">Programma non disponibile.</div>`;
    return;
  }

  if(forcedDate && dates.includes(forcedDate)) programTabSelectedDate = forcedDate;
  else if(!dates.includes(programTabSelectedDate)) programTabSelectedDate = programTabDefaultDate(dates);

  const selectedRows = rows.filter(row => row.day.date === programTabSelectedDate);
  el.innerHTML = `
    <div class="program-hub">
      <div class="program-hub-head">
        <h2>Programma</h2>
        <div>Il viaggio giorno per giorno</div>
      </div>
      <div class="program-date-strip" role="tablist" aria-label="Giorni del viaggio">
        ${dates.map(date => programTabChipHtml(date, date === programTabSelectedDate)).join("")}
      </div>
      <div class="program-hub-content">
        ${selectedRows.map(({leg,day}) => `
          <section class="program-hub-leg" style="--program-leg-accent:${ACCENT[leg.accent] || "var(--brass)"}">
            <div class="program-hub-city"><span></span>${escapeHtml(leg.city)}</div>
            ${programDayHtml(day)}
          </section>
        `).join("")}
      </div>
    </div>`;

  $$("[data-program-tab-date]", el).forEach(button => {
    button.addEventListener("click", () => {
      const next = button.dataset.programTabDate;
      if(!next || next === programTabSelectedDate) return;
      programTabSelectedDate = next;
      renderCitiesList(next);
      window.scrollTo({top:0, behavior:"auto"});
    });
  });

  requestAnimationFrame(() => {
    const active = $(".program-date-chip.active", el);
    active?.scrollIntoView({behavior:"auto", block:"nearest", inline:"center"});
  });
}

'''
s = s[:start] + new_section + s[end:]
if 'Versione app 2.4.51' not in s:
    raise SystemExit('app version marker not found')
s = s.replace('Versione app 2.4.51', 'Versione app 2.4.53', 1)
p.write_text(s, encoding='utf-8')

# index.html — only change visible tab from Città to Programma, preserving data-screen="cities".
p = Path('index.html')
s = p.read_text(encoding='utf-8')
old_tab = '''    <button data-screen="cities">\n      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z"/></svg>\n      Città\n    </button>'''
new_tab = '''    <button data-screen="cities" aria-label="Programma del viaggio">\n      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h2M14 14h2M8 18h2M14 18h2"/></svg>\n      Programma\n    </button>'''
if old_tab not in s:
    raise SystemExit('cities tab marker not found')
s = s.replace(old_tab, new_tab, 1)
for old,new in [('style.css?v=82','style.css?v=83'),('app.js?v=126','app.js?v=127')]:
    if old not in s:
        raise SystemExit(f'index version marker not found: {old}')
    s = s.replace(old,new,1)
p.write_text(s, encoding='utf-8')

# style.css — compact Programma hub; reuses the existing program-day/timeline styles.
p = Path('style.css')
s = p.read_text(encoding='utf-8')
css = r'''

/* ===== V53 · Programma nella bottom bar ===== */
.program-hub-head{margin:2px 0 14px;}
.program-hub-head h2{margin:0;font-size:25px;line-height:1.1;color:var(--ink);letter-spacing:-.02em;}
.program-hub-head>div{margin-top:5px;font-size:12.5px;color:var(--ink-soft);font-weight:650;}
.program-date-strip{display:flex;gap:8px;overflow-x:auto;margin:0 -16px 16px;padding:2px 16px 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;}
.program-date-strip::-webkit-scrollbar{display:none;}
.program-date-chip{flex:0 0 58px;min-height:66px;border:1px solid var(--line);border-radius:16px;background:var(--panel,#fff);color:var(--ink);font-family:inherit;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:7px 4px;box-shadow:0 7px 18px -16px rgba(22,35,63,.45);scroll-snap-align:center;cursor:pointer;}
.program-date-chip span,.program-date-chip small{text-transform:uppercase;font-size:9px;font-weight:850;letter-spacing:.055em;color:var(--ink-soft);line-height:1.05;}
.program-date-chip strong{font-size:20px;line-height:1.05;font-weight:900;color:var(--ink);}
.program-date-chip.active{background:var(--ink);border-color:var(--ink);box-shadow:0 9px 22px -13px rgba(22,35,63,.7);}
.program-date-chip.active span,.program-date-chip.active small{color:rgba(251,248,241,.72);}
.program-date-chip.active strong{color:var(--paper);}
.program-hub-content{min-height:240px;}
.program-hub-leg{margin-bottom:18px;}
.program-hub-city{display:flex;align-items:center;gap:8px;margin:0 2px 8px;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.075em;color:var(--ink-soft);}
.program-hub-city>span{width:9px;height:9px;border-radius:50%;background:var(--program-leg-accent,var(--brass));box-shadow:0 0 0 3px color-mix(in srgb,var(--program-leg-accent,var(--brass)) 15%,transparent);}
.program-hub .program-day{margin-bottom:0;}
.program-hub .program-date{display:none;}
@media(max-width:380px){.program-date-chip{flex-basis:54px;min-height:63px}.program-date-strip{gap:7px}}
'''
if 'V53 · Programma nella bottom bar' in s:
    raise SystemExit('program hub css already present')
s += css
p.write_text(s, encoding='utf-8')

# service worker — use a fresh cache number; do not reuse the bad v150 from the rolled-back build.
p = Path('sw.js')
s = p.read_text(encoding='utf-8')
if 'viaggio-nozze-v149' not in s:
    raise SystemExit('service worker cache marker not found')
s = s.replace('viaggio-nozze-v149', 'viaggio-nozze-v151', 1)
p.write_text(s, encoding='utf-8')
