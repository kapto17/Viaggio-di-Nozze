/* V6 incremental UI helper.
   Aggiunge la sezione Alloggio alle pagine città già renderizzate.
*/
(function () {
  function normalize(s) {
    return (s || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function cityKeyFromPage() {
    const title = document.querySelector("#cityName, .city-title, [data-city-title], h1, h2");
    const t = normalize(title ? title.textContent : "");
    if (t.includes("san-francisco")) return "san-francisco";
    if (t.includes("los-angeles")) return "los-angeles";
    if (t.includes("las-vegas")) return "las-vegas";
    if (t.includes("page") || t.includes("lake-powell")) return "page";
    if (t.includes("chicago")) return "chicago";
    if (t.includes("santo-domingo") || t.includes("dominicana") || t.includes("bayahibe")) return "santo-domingo";
    return null;
  }

  function hotelCard(hotel) {
    if (!hotel) return "";
    return `
      <section class="accommodation-section">
        <div class="accommodation-heading">
          <span class="accommodation-icon">🏨</span>
          <div><span class="accommodation-kicker">SOGGIORNO</span><h3>Alloggio</h3></div>
        </div>
        <div class="accommodation-card">
          <strong>${hotel.name}</strong>
          <span>${hotel.address}</span>
          <a class="accommodation-maps" href="${hotel.maps}" target="_blank" rel="noopener">📍 Apri in Maps</a>
        </div>
      </section>`;
  }

  function injectAccommodation() {
    if (document.querySelector(".accommodation-section")) return;
    const key = cityKeyFromPage();
    if (!key || typeof HOTELS === "undefined" || !HOTELS[key]) return;
    const host = document.querySelector("#cityBody, #cityContent, .city-content, main .screen.active, main");
    if (host) host.insertAdjacentHTML("beforeend", hotelCard(HOTELS[key]));
  }

  document.addEventListener("click", () => setTimeout(injectAccommodation, 80));
  window.addEventListener("hashchange", () => setTimeout(injectAccommodation, 80));
  window.addEventListener("load", () => setTimeout(injectAccommodation, 150));

  // Update any existing Alcatraz Maps link if identifiable.
  function updateAlcatrazLink() {
    document.querySelectorAll("a").forEach(a => {
      const context = (a.closest(".activity-card,.card,.event,.ticket-card,section")?.textContent || a.textContent || "").toLowerCase();
      if (context.includes("alcatraz") && (a.href.includes("google.") || a.textContent.toLowerCase().includes("map"))) {
        a.href = ALCATRAZ_MAPS;
      }
    });
  }
  document.addEventListener("click", () => setTimeout(updateAlcatrazLink, 50));
  window.addEventListener("load", updateAlcatrazLink);
})();
