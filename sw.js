const CACHE_NAME = "viaggio-nozze-v45";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./firebase-budget.js",
  "./manifest.json",
  "./icons/favicon-v10-64.png",
  "./icons/icon-v10-180.png",
  "./icons/icon-v10-192.png",
  "./icons/icon-v10-512.png",
  "./icons/icon-v10-maskable-512.png",
  "./assets/san-francisco.jpg",
  "./assets/los-angeles.jpg",
  "./assets/las-vegas.jpg",
  "./assets/las-vegas-2.jpg",
  "./assets/checklist-prepartenza.jpg",
  "./assets/heart-line.png",
  "./assets/page.jpg",
  "./assets/chicago.jpg",
  "./assets/bayahibe.jpg",
  "./assets/hero-travel.jpg",
  "./assets/food/sf-clam-chowder.jpg",
  "./assets/food/sf-mission-burrito.jpg",
  "./assets/food/la-tacos-al-pastor.jpg",
  "./assets/food/la-french-dip.jpg",
  "./assets/food/vegas-shrimp-cocktail.jpg",
  "./assets/food/vegas-prime-rib.jpg",
  "./assets/food/page-frybread.jpg",
  "./assets/food/chicago-italian-beef.jpg",
  "./assets/food/bayahibe-mangu.jpg",
  "./assets/food/bayahibe-pescado-frito.jpg",
  "./assets/food/bayahibe-tostones-camarones.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Per navigazioni HTML: rete prima, cache come fallback.
  // Così gli aggiornamenti da GitHub Pages arrivano subito senza rompere l'offline.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // File applicativi principali: rete prima, cache come fallback.
  // Evita che browser diversi rimangano bloccati su vecchie versioni di CSS/JS.
  const url = new URL(event.request.url);
  const isCoreAsset = ["/style.css", "/app.js", "/data.js", "/firebase-budget.js", "/manifest.json"].some((suffix) => url.pathname.endsWith(suffix));

  if (isCoreAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && (response.ok || response.type === "opaque")) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Immagini e altri asset: cache prima, rete come fallback.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && (response.ok || response.type === "opaque")) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
