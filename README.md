# Viaggio di nozze — App

App web (PWA) offline-first: una volta installata, si apre istantaneamente
anche senza connessione. Internet serve solo per "Apri Maps".

## Come pubblicarla gratis (10 minuti, una volta sola)

1. Vai su https://github.com e crea un account gratuito (se non ce l'hai già).
2. Crea un nuovo repository (es. `viaggio-nozze`), pubblico, senza README.
3. Carica dentro TUTTI i file di questa cartella (index.html, style.css,
   app.js, data.js, manifest.json, sw.js, icons/) trascinandoli nella pagina
   del repository su github.com ("Add file" → "Upload files").
4. Vai su Settings → Pages → in "Branch" scegli `main` e cartella `/root` → Save.
5. Dopo 1-2 minuti l'app sarà online su un indirizzo tipo:
   `https://tuonomeutente.github.io/viaggio-nozze/`

## Come installarla sul telefono

**Android (Chrome):** apri il link → menu (⋮) → "Aggiungi a schermata Home"
→ "Installa". Da quel momento si apre come un'app vera, anche offline.

**iPhone (Safari):** apri il link → icona di condivisione (□↑) → "Aggiungi
a Home". Apri l'app dall'icona (non da Safari) per avere l'esperienza
a schermo intero.

Fai questo primo avvio quando sei connesso al Wi-Fi: l'app scarica e salva
tutto sul telefono. Da lì in poi funziona anche senza rete.

## Come aggiornare i dati del viaggio

Tutte le informazioni (città, hotel, voli, ristoranti, luoghi, biglietti)
sono nel file `data.js`, scritto in modo semplice da leggere. Ogni "leg"
(tappa) ha:

- `restaurants`: aggiungi oggetti tipo `{ name: "Nome", note: "...", mapsQuery: "Nome, Città" }`
- `places`: stesso formato, per i luoghi da vedere
- `tickets`: `{ name: "Biglietto escursione X", note: "..." }`

Dopo ogni modifica, ricarica i file sul repository GitHub (o dimmi le
nuove informazioni qui in chat e li aggiorno io).

## Cosa manca ancora (V2)

- Orari e carte d'imbarco dei voli non ancora disponibili (LA→Vegas ecc.)
- Hotel da definire a Las Vegas e Page
- Ristoranti, luoghi da vedere e biglietti per ogni città
- Allegare PDF/QR code dei biglietti (si può fare quando li avrai)
