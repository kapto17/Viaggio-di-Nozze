/* V39 · Guida pratica Lakers–Clippers */
(() => {
  const TARGET = "Los Angeles Lakers vs LA Clippers";
  if (typeof openPlaceDetail !== "function") return;
  const originalOpenPlaceDetail = openPlaceDetail;

  const link = (href,label,klass="") => `<a class="lakers-guide-link ${klass}" target="_blank" rel="noopener" href="${href}">${label}</a>`;

  function decorateLakersGuide(){
    const screen = document.querySelector("#screen-place-detail");
    const title = screen?.querySelector(".place-detail-overlay h2")?.textContent?.trim();
    if (!screen || title !== TARGET) return;
    const body = screen.querySelector(".place-detail-body");
    if (!body || body.querySelector(".lakers-event-guide")) return;

    const kicker = body.querySelector(".place-detail-kicker");
    if (kicker) kicker.textContent = "23 ottobre · 19:00 · Prenotato";

    const hero = screen.querySelector(".place-detail-hero");
    if (hero && !screen.querySelector(".lakers-photo-credit")){
      hero.insertAdjacentHTML("afterend", `<div class="lakers-photo-credit">Foto: Troutfarm27 · Wikimedia Commons · CC BY-SA 4.0</div>`);
    }

    const guide = document.createElement("section");
    guide.className = "lakers-event-guide";
    guide.innerHTML = `
      <div class="lakers-guide-hero">
        <small>PIANO SERATA</small>
        <strong>Arriviamo comodi, niente auto allo stadio</strong>
        <span>Lasciamo il SUV al The Commerce e usiamo Uber o Lyft direttamente fino alla Crypto.com Arena.</span>
      </div>

      <div class="lakers-guide-card">
        <div class="lakers-guide-title"><span>🕒</span><div><strong>Quando partire</strong><small>Partita alle 19:00</small></div></div>
        <div class="lakers-guide-timeline">
          <div><b>16:50–17:00</b><span>Chiama Uber/Lyft dal The Commerce.</span></div>
          <div><b>17:35–17:50</b><span>Arrivo previsto in zona Crypto.com Arena / L.A. LIVE, traffico permettendo.</span></div>
          <div><b>18:00 circa</b><span>Ingresso e controlli con calma, poi giro dentro l'arena.</span></div>
          <div class="booked"><b>19:00</b><span>Lakers vs LA Clippers 🏀</span></div>
        </div>
        <p class="lakers-guide-tip">Il giorno prima ricontrolliamo l'orario ufficiale di apertura porte: può variare da evento a evento.</p>
      </div>

      <div class="lakers-guide-card">
        <div class="lakers-guide-title"><span>🚪</span><div><strong>Come entrare</strong><small>Tre ingressi principali per i normali biglietti</small></div></div>
        <div class="lakers-entry-list">
          <div><b>Kobe Bryant Entrance</b><span>Chick Hearn Ct / 11th St × Georgia St</span></div>
          <div><b>Star Plaza Entrance</b><span>Chick Hearn Ct × Figueroa · tra Box Office e Team LA Store</span></div>
          <div><b>Figueroa Entrance</b><span>12th St × Figueroa</span></div>
        </div>
        <p class="lakers-guide-tip"><strong>Non serve scegliere un gate in anticipo:</strong> con un normale biglietto potete usare uno dei tre ingressi principali. Andate semplicemente verso quello con meno coda.</p>
      </div>

      <div class="lakers-guide-card compact">
        <div class="lakers-guide-title"><span>🎟️</span><div><strong>Prima di uscire dall'hotel</strong><small>Tre controlli da fare</small></div></div>
        <ul class="lakers-check-list">
          <li><strong>Biglietti nell'app autorizzata</strong> (AXS / Venue / Team): screenshot e QR stampati non vengono accettati.</li>
          <li><strong>Niente borse.</strong> È ammesso solo un piccolo wallet/clutch inferiore a circa 5 × 9 × 1 pollici; il resto è meglio lasciarlo in hotel.</li>
          <li><strong>Arena cashless:</strong> portate carta/contactless o pagamento da telefono.</li>
        </ul>
      </div>

      <div class="lakers-guide-card">
        <div class="lakers-guide-title"><span>🚕</span><div><strong>Uber / Lyft all'andata</strong><small>Dove farsi lasciare</small></div></div>
        <p>La Crypto.com Arena usa aree rideshare su <strong>Chick Hearn Ct</strong> e su <strong>Figueroa</strong>. Non chiederei all'autista di portarvi a un parcheggio: fatevi lasciare nella zona ufficiale più comoda e poi raggiungete a piedi l'ingresso con meno fila.</p>
        <div class="lakers-guide-actions">
          ${link("https://www.uber.com/global/en/r/cities/los-angeles-ca-us/","Apri Uber")}
          ${link("https://www.lyft.com/rider/cities/los-angeles-ca","Apri Lyft")}
        </div>
      </div>

      <div class="lakers-guide-card restaurant-main">
        <div class="lakers-guide-title"><span>🍽️</span><div><strong>Dopo la partita: JOEY DTLA</strong><small>Scelta principale · fuori dalla bolgia dell'arena</small></div></div>
        <p>Usciti dalla partita, invece di chiamare subito una corsa nel momento di massima domanda, camminiamo verso Downtown e ceniamo da <strong>JOEY DTLA</strong>. Sono circa <strong>1,1 km / 16 min a piedi</strong>; il venerdì resta aperto fino all'<strong>1:00</strong>, quindi non c'è ansia se la gara finisce tardi o va all'overtime.</p>
        <p class="lakers-guide-tip">Restate sulle strade principali e illuminate. Se siete stanchi o la zona non vi convince quella sera, usate una delle alternative qui sotto senza forzare la passeggiata.</p>
        <div class="lakers-guide-actions">
          ${link("https://www.google.com/maps/search/?api=1&query=JOEY+DTLA+700+W+7th+St+Los+Angeles+CA+90017","📍 Maps")}
          ${link("https://joeyrestaurants.com/location/joey-dtla","Menu / sito")}
        </div>
      </div>

      <div class="lakers-guide-card compact">
        <div class="lakers-guide-title"><span>↪</span><div><strong>Alternative dopo la partita</strong><small>Se cambiamo idea sul momento</small></div></div>
        <div class="lakers-alt-list">
          <div><strong>33 Taps DTLA</strong><span>Molto vicino alla Crypto.com Arena, sports bar e late-night. Comodo, ma restate ancora nella folla dell'evento.</span>${link("https://www.google.com/maps/search/?api=1&query=33+Taps+DTLA+1240+S+Figueroa+St+Los+Angeles+CA+90015","Maps")}</div>
          <div><strong>Yard House · L.A. LIVE</strong><span>Piano B più semplice se siete distrutti: praticamente accanto all'arena, ma non aiuta ad allontanarsi dal picco post-partita.</span>${link("https://www.google.com/maps/search/?api=1&query=Yard+House+L.A.+LIVE+Los+Angeles","Maps")}</div>
        </div>
      </div>

      <div class="lakers-guide-card return-card">
        <div class="lakers-guide-title"><span>🌙</span><div><strong>Rientro dopo cena</strong><small>Confronta prima di prenotare</small></div></div>
        <p>Quando avremo finito di cenare, il picco immediato della partita dovrebbe essere passato. Aprite <strong>Uber, Lyft e Curb</strong> e scegliete in quel momento la soluzione migliore. Curb chiama taxi regolari e mostra una tariffa anticipata: può essere molto utile se Uber/Lyft sono ancora in surge.</p>
        <div class="lakers-app-grid">
          ${link("https://www.uber.com/global/en/r/cities/los-angeles-ca-us/","Uber")}
          ${link("https://www.lyft.com/rider/cities/los-angeles-ca","Lyft")}
          ${link("https://www.gocurb.com/cities/los-angeles","Curb · Taxi")}
          ${link("https://waymo.com/rides/los-angeles/","Waymo · bonus")}
        </div>
        <p class="lakers-guide-tip">Waymo è solo un'opzione da controllare: non facciamo affidamento sul fatto che accetti il tragitto fino al The Commerce, che è più a est della sua area LA abituale.</p>
      </div>

      <div class="lakers-guide-card final-check">
        <div class="lakers-guide-title"><span>✓</span><div><strong>Checklist del 23 ottobre</strong><small>Prima di chiamare la macchina</small></div></div>
        <div class="lakers-mini-checks"><span>Biglietti caricati</span><span>Telefono carico</span><span>Power bank</span><span>Niente borsa grande</span><span>Uber + Lyft + Curb installate</span></div>
      </div>
    `;

    const firstMapButton = body.querySelector(".place-detail-mapbtn");
    if (firstMapButton) body.insertBefore(guide, firstMapButton);
    else body.appendChild(guide);
  }

  openPlaceDetail = function(legId, placeName, pushHistory=true){
    const result = originalOpenPlaceDetail(legId, placeName, pushHistory);
    if (placeName === TARGET){
      requestAnimationFrame(() => requestAnimationFrame(decorateLakersGuide));
    }
    return result;
  };
})();
