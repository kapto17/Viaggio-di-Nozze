import { getApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getFirestore, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

let db = null;

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

function decorateTipCard(card){
  if (!card || card.dataset.titleEditReady === "1") return;
  const tipId = card.dataset.tipId;
  const copy = card.querySelector(".tiktok-tip-copy");
  const title = copy?.querySelector("strong");
  if (!tipId || !copy || !title) return;

  card.dataset.titleEditReady = "1";

  const line = document.createElement("div");
  line.className = "tiktok-title-line";
  title.parentNode.insertBefore(line, title);
  line.appendChild(title);

  const edit = document.createElement("button");
  edit.type = "button";
  edit.className = "tiktok-title-edit-btn";
  edit.setAttribute("aria-label", "Modifica titolo");
  edit.title = "Modifica titolo";
  edit.textContent = "✎";
  line.appendChild(edit);

  edit.addEventListener("click", async () => {
    if (!window.LFBudget?.isAuthenticated?.()) return;
    if (!initDb()){
      alert("Firebase non è ancora disponibile. Riprova tra un momento.");
      return;
    }

    const current = title.textContent === "Consiglio TikTok" ? "" : title.textContent;
    const next = prompt("Titolo del consiglio TikTok:", current || "");
    if (next === null) return;

    const value = cleanTitle(next);
    edit.disabled = true;
    edit.textContent = "…";
    try {
      await updateDoc(doc(db, "budget", "main", "tiktokTips", tipId), {
        title:value,
        updatedAt:serverTimestamp()
      });
    } catch(err){
      console.error("Modifica titolo TikTok:", err);
      alert("Non sono riuscito a modificare il titolo.");
    } finally {
      edit.disabled = false;
      edit.textContent = "✎";
    }
  });
}

function decorateVisibleTips(){
  document.querySelectorAll(".tiktok-tip-card").forEach(decorateTipCard);
}

const observer = new MutationObserver(() => decorateVisibleTips());

function start(){
  initDb();
  decorateVisibleTips();
  const host = document.querySelector("#screen-tiktok-city");
  if (host) observer.observe(host, { childList:true, subtree:true });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once:true });
else start();

window.addEventListener("lf-firebase-ready", initDb, { once:true });
