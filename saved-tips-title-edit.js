import { getApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getFirestore, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

let db = null;
let saving = false;

function initDb(){
  if (db) return true;
  try {
    db = getFirestore(getApp());
    return true;
  } catch(err){
    return false;
  }
}

function cleanTitle(value){
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 80);
}

async function editTitle(titleEl){
  if (saving || !titleEl) return;
  if (!window.LFBudget?.isAuthenticated?.()) return;

  const card = titleEl.closest(".tiktok-tip-card");
  const tipId = card?.dataset?.tipId;
  if (!tipId) return;

  if (!initDb()){
    alert("Firebase non è ancora disponibile. Riprova tra un momento.");
    return;
  }

  const currentText = String(titleEl.textContent || "").trim();
  const current = currentText === "Consiglio TikTok" ? "" : currentText;
  const next = prompt("Titolo del consiglio TikTok:", current);
  if (next === null) return;

  const value = cleanTitle(next);
  saving = true;
  titleEl.classList.add("tiktok-title-saving");
  try {
    await updateDoc(doc(db, "budget", "main", "tiktokTips", tipId), {
      title:value,
      updatedAt:serverTimestamp()
    });
  } catch(err){
    console.error("Modifica titolo TikTok:", err);
    alert("Non sono riuscito a modificare il titolo.");
  } finally {
    saving = false;
    titleEl.classList.remove("tiktok-title-saving");
  }
}

// Event delegation: nessun MutationObserver e nessuna modifica continua del DOM.
document.addEventListener("click", event => {
  const titleEl = event.target.closest(".tiktok-tip-card .tiktok-tip-copy strong");
  if (!titleEl) return;
  event.preventDefault();
  event.stopPropagation();
  editTitle(titleEl);
});

window.addEventListener("lf-firebase-ready", initDb, { once:true });
initDb();
