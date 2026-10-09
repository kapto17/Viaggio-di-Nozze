import { getApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const CITIES = [
  { id:"sf", label:"San Francisco", icon:"🌉" },
  { id:"la", label:"Los Angeles", icon:"🌴" },
  { id:"vegas", label:"Las Vegas", icon:"🎰" },
  { id:"page", label:"Page / Grand Canyon", icon:"🏜️" },
  { id:"chicago", label:"Chicago", icon:"🏙️" },
  { id:"bayahibe", label:"Bayahibe", icon:"🌊" }
];

// Import iniziale dei link inviati da Lorenzo il 9/10/2026.
// La città resta volutamente non assegnata finché il contenuto non viene verificato:
// nell'app basta un tap sulla città corretta e la voce "Da assegnare" scompare a lavoro finito.
const INITIAL_TIPS = [
  { url:"https://vm.tiktok.com/ZN8kTR9ek/", canonicalUrl:"https://www.tiktok.com/@noemiderrico3/photo/7670899434162490657", postId:"7670899434162490657" },
  { url:"https://vm.tiktok.com/ZN8kTssWS/", canonicalUrl:"https://www.tiktok.com/@simonemariino/video/7670049913861868833", postId:"7670049913861868833" },
  { url:"https://vm.tiktok.com/ZN8kTxKFo/", canonicalUrl:"https://www.tiktok.com/@maria.allegroo/video/7691653479735053601", postId:"7691653479735053601" },
  { url:"https://vm.tiktok.com/ZN8kTE6EJ/", canonicalUrl:"https://www.tiktok.com/@sofi.spam111/photo/7674289286241471775", postId:"7674289286241471775" },
  { url:"https://vm.tiktok.com/ZN8kTcHrc/", canonicalUrl:"https://www.tiktok.com/@limonadaapink/video/7665187358425255182", postId:"7665187358425255182" },
  { url:"https://vm.tiktok.com/ZN8kTseDX/", canonicalUrl:"https://www.tiktok.com/@ferieinvaligia/video/7683931074837204246", postId:"7683931074837204246" },
  { url:"https://vm.tiktok.com/ZN8kTQcCP/", canonicalUrl:"https://www.tiktok.com/@charlotte.louail/photo/7670199959282584864", postId:"7670199959282584864" },
  { url:"https://vm.tiktok.com/ZN8kTcVEd/", canonicalUrl:"https://www.tiktok.com/@footprints_88/photo/7667574589349711125", postId:"7667574589349711125" },
  { url:"https://vm.tiktok.com/ZN8kTVwdT/", canonicalUrl:"https://www.tiktok.com/@lealsnt/photo/7629710593838288151", postId:"7629710593838288151" },
  { url:"https://vm.tiktok.com/ZN8BJkwcv/", canonicalUrl:"https://www.tiktok.com/@tonia_in_viaggio/photo/7682436068800564512", postId:"7682436068800564512" }
];

let app;
let auth;
let db;
let currentUser = null;
let tips = [];
let tipsReady = false;
let unsubscribeTips = null;
let currentCity = null;
let firebaseStarted = false;

const $ = (sel, root=document) => root.querySelector(sel);
const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function cityInfo(id){
  return CITIES.find(city => city.id === id) || null;
}

function tipsRef(){
  return collection(db, "budget", "main", "tiktokTips");
}

function seedMetaRef(){
  return doc(db, "budget", "main", "tiktokMeta", "seed-v1");
}

function normalizeUrl(raw){
  let value = String(raw || "").trim();
  if (!value) throw new Error("Incolla il link TikTok.");
  if (!/^https?:\/\//i.test(value)) value = "https://" + value;
  let parsed;
  try { parsed = new URL(value); } catch(_){ throw new Error("Link non valido."); }
  const host = parsed.hostname.toLowerCase();
  if (!(host === "tiktok.com" || host.endsWith(".tiktok.com"))) throw new Error("Inserisci un link TikTok.");
  return parsed.href;
}

function extractPostId(url){
  const match = String(url || "").match(/\/(?:video|photo)\/(\d{12,25})/i);
  return match ? match[1] : "";
}

function compactText(value, max=140){
  const clean = String(value || "").replace(/\s+/g," ").trim();
  return clean.length > max ? clean.slice(0,max-1).trimEnd() + "…" : clean;
}

async function resolveMetadata(url){
  const directId = extractPostId(url);
  if (directId) return { postId:directId, canonicalUrl:url };

  // I link copiati dall'app TikTok sono spesso vm.tiktok.com. Per ricavare soltanto
  // id/cover/titolo proviamo il resolver pubblico TikWM; se non risponde il link viene
  // comunque salvato e resta apribile normalmente.
  try {
    const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`, {
      headers:{ "Accept":"application/json" }
    });
    if (!response.ok) throw new Error("metadata unavailable");
    const payload = await response.json();
    const data = payload?.data || {};
    const postId = String(data.id || data.aweme_id || "").trim();
    const uniqueId = String(data.author?.unique_id || data.author?.uniqueId || "").trim();
    const canonicalUrl = postId && uniqueId
      ? `https://www.tiktok.com/@${encodeURIComponent(uniqueId)}/video/${postId}`
      : (String(data.url || data.web_url || "").startsWith("http") ? String(data.url || data.web_url) : "");
    const coverUrl = data.cover || data.origin_cover || data.ai_dynamic_cover || (Array.isArray(data.images) ? data.images[0] : "") || "";
    return {
      postId,
      canonicalUrl,
      coverUrl:String(coverUrl || ""),
      autoTitle:compactText(data.title || ""),
      author:compactText(data.author?.nickname || data.author?.unique_id || "",80)
    };
  } catch(err){
    console.warn("TikTok metadata non disponibile, salvo il link senza anteprima avanzata:", err);
    return {};
  }
}

async function ensureInitialTips(){
  if (!currentUser || !db) return;
  try {
    const marker = await getDoc(seedMetaRef());
    if (marker.exists()) return;
    const base = Date.now();
    for (let i=0; i<INITIAL_TIPS.length; i++){
      const item = INITIAL_TIPS[i];
      await setDoc(doc(tipsRef(), `seed-${item.postId}`), {
        city:"unassigned",
        url:item.url,
        canonicalUrl:item.canonicalUrl,
        postId:item.postId,
        title:"",
        autoTitle:"",
        coverUrl:"",
        author:"",
        source:"initial-import-2026-10-09",
        createdBy:currentUser.uid,
        createdAtMs:base + i,
        createdAt:serverTimestamp(),
        updatedAt:serverTimestamp()
      });
    }
    await setDoc(seedMetaRef(), {
      imported:true,
      count:INITIAL_TIPS.length,
      importedBy:currentUser.uid,
      importedAt:serverTimestamp()
    });
  } catch(err){
    console.error("Import iniziale TikTok:", err);
  }
}

function startTipsListener(){
  if (unsubscribeTips) unsubscribeTips();
  tipsReady = false;
  unsubscribeTips = onSnapshot(tipsRef(), { includeMetadataChanges:true }, snap => {
    tips = snap.docs.map(d => ({ id:d.id, ...d.data() })).sort((a,b) => {
      const av = Number(a.createdAtMs || a.createdAt?.seconds || 0);
      const bv = Number(b.createdAtMs || b.createdAt?.seconds || 0);
      return bv - av;
    });
    tipsReady = true;
    rerenderActiveScreen();
  }, err => {
    console.error("TikTok tips listener:", err);
    tipsReady = true;
    const active = $("#screen-tiktok.active, #screen-tiktok-city.active");
    if (active) active.innerHTML = `<button class="back-btn" onclick="history.back()">‹ Indietro</button><div class="tiktok-empty">Non riesco a leggere i consigli condivisi. Controlla la connessione o i permessi Firebase.</div>`;
  });
}

function stopTipsListener(){
  if (unsubscribeTips) unsubscribeTips();
  unsubscribeTips = null;
  tips = [];
  tipsReady = false;
  currentCity = null;
}

function setTabVisible(moduleAuthenticated){
  const tab = $("#tiktok-tab");
  if (!tab) return;
  // La visibilità deve seguire lo stesso stato L&F usato da Budget e SOS.
  // Anche se il modulo Firebase TikTok vede ancora una sessione durante un cambio stato,
  // il tab resta nascosto finché l'area privata centrale non risulta autenticata.
  const privateAreaAuthenticated = !!window.LFBudget?.isAuthenticated?.();
  tab.hidden = !(moduleAuthenticated && privateAreaAuthenticated);
}

function setScreen(name){
  if (typeof window.showScreen === "function"){
    window.showScreen(name);
  } else {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    $("#screen-" + name)?.classList.add("active");
  }
}

function navigate(name, payload={}, push=true){
  if (typeof window.navigateTo === "function"){
    window.navigateTo(name, payload, push);
    return;
  }
  const state = { screen:name, ...payload };
  if (push) history.pushState(state,"","#"+name);
  else history.replaceState(state,"","#"+name);
  setScreen(name);
}

function requireAuth(pushHistory=true){
  if (currentUser && window.LFBudget?.isAuthenticated?.()) return true;
  sessionStorage.setItem("lf-private-target", "tiktok");
  if (typeof window.openPrivateAccess === "function") window.openPrivateAccess(pushHistory);
  else location.hash = "private-access";
  return false;
}

function countFor(cityId){
  return tips.filter(t => (t.city || "unassigned") === cityId).length;
}

function renderHub(){
  const host = $("#screen-tiktok");
  if (!host) return;
  if (!currentUser || !window.LFBudget?.isAuthenticated?.()){
    host.innerHTML = `<div class="tiktok-empty">Area privata L&amp;F.</div>`;
    return;
  }
  if (!tipsReady){
    host.innerHTML = `<button class="back-btn" id="back-tiktok">‹ Home</button><div class="tiktok-loading">Carico i consigli TikTok…</div>`;
    $("#back-tiktok")?.addEventListener("click",()=>history.back());
    return;
  }
  const unassigned = countFor("unassigned");
  const cards = CITIES.map(city => {
    const count = countFor(city.id);
    return `<button class="tiktok-city-card" type="button" data-tiktok-city="${city.id}">
      <span class="tiktok-city-icon">${city.icon}</span>
      <strong>${escapeHtml(city.label)}</strong>
      <span>${count} ${count===1?"video":"video"}</span>
    </button>`;
  }).join("");
  host.innerHTML = `
    <button class="back-btn" id="back-tiktok">‹ Home</button>
    <div class="tiktok-hub-head"><small>Area privata L&amp;F</small><h2>Consigli TikTok</h2><p>I video che volete ritrovare durante il viaggio, divisi per tappa.</p></div>
    <div class="tiktok-city-grid">
      ${unassigned ? `<button class="tiktok-city-card tiktok-unassigned" type="button" data-tiktok-city="unassigned"><span class="tiktok-city-icon">📥</span><strong>Da assegnare</strong><span>${unassigned} ${unassigned===1?"video":"video"} · solo import iniziale</span></button>` : ""}
      ${cards}
    </div>
    <div class="tiktok-sync-note">☁️ Sincronizzato tra i vostri telefoni.</div>`;
  $("#back-tiktok")?.addEventListener("click",()=>history.back());
  host.querySelectorAll("[data-tiktok-city]").forEach(btn => btn.addEventListener("click",()=>openCity(btn.dataset.tiktokCity,true)));
}

function previewHtml(tip){
  const href = tip.canonicalUrl || tip.url;
  const postId = String(tip.postId || extractPostId(tip.canonicalUrl || tip.url) || "");
  const cover = String(tip.coverUrl || "");
  let visual = `<div class="tiktok-preview-fallback"><b>♪</b><span>Consiglio TikTok</span></div>`;
  if (cover){
    visual = `<img src="${escapeHtml(cover)}" alt="Anteprima TikTok" loading="lazy" referrerpolicy="no-referrer">`;
  } else if (postId){
    const src = `https://www.tiktok.com/player/v1/${encodeURIComponent(postId)}?autoplay=0&controls=0&loop=0&music_info=0&description=0&rel=0`;
    visual = `<iframe src="${src}" title="Anteprima TikTok" loading="lazy" allow="encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }
  return `<div class="tiktok-preview">${visual}<a class="tiktok-preview-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="Apri su TikTok"><span class="tiktok-open-pill">▶ Apri su TikTok</span></a></div>`;
}

function assignButtons(tipId){
  return `<div class="tiktok-assign"><span>Sposta nella tappa:</span><div class="tiktok-assign-buttons">${CITIES.map(city => `<button type="button" data-assign-tip="${escapeHtml(tipId)}" data-assign-city="${city.id}">${city.icon} ${escapeHtml(city.label)}</button>`).join("")}</div></div>`;
}

function tipCard(tip, cityId){
  const displayTitle = compactText(tip.title || tip.autoTitle || "Consiglio TikTok", 100);
  let hostLabel = "TikTok";
  try { hostLabel = new URL(tip.url).hostname.replace(/^www\./,""); } catch(_){}
  return `<article class="tiktok-tip-card" data-tip-id="${escapeHtml(tip.id)}">
    ${previewHtml(tip)}
    <div class="tiktok-tip-body">
      <div class="tiktok-tip-row"><div class="tiktok-tip-copy"><strong>${escapeHtml(displayTitle)}</strong><small>${escapeHtml(tip.author ? `@${tip.author.replace(/^@/,"")}` : hostLabel)}</small></div><button class="tiktok-delete-btn" type="button" data-delete-tip="${escapeHtml(tip.id)}">Elimina</button></div>
      ${cityId === "unassigned" ? assignButtons(tip.id) : ""}
    </div>
  </article>`;
}

function renderCity(cityId){
  currentCity = cityId;
  const host = $("#screen-tiktok-city");
  if (!host) return;
  if (!currentUser || !window.LFBudget?.isAuthenticated?.()){ host.innerHTML = `<div class="tiktok-empty">Area privata L&amp;F.</div>`; return; }
  const info = cityInfo(cityId);
  const label = cityId === "unassigned" ? "Da assegnare" : (info?.label || "Consigli TikTok");
  const icon = cityId === "unassigned" ? "📥" : (info?.icon || "♪");
  const cityTips = tips.filter(t => (t.city || "unassigned") === cityId);
  host.innerHTML = `
    <button class="back-btn" id="back-tiktok-city">‹ Consigli TikTok</button>
    <div class="tiktok-city-toolbar">
      <div class="tiktok-city-head"><small>${icon} Consigli TikTok</small><h2>${escapeHtml(label)}</h2><p>${cityId === "unassigned" ? "Assegna questi link una sola volta alla tappa corretta." : `${cityTips.length} ${cityTips.length===1?"video salvato":"video salvati"}`}</p></div>
      ${cityId !== "unassigned" ? `<button class="tiktok-add-btn" id="tiktok-add-open" type="button">＋ Aggiungi</button>` : ""}
    </div>
    ${cityId !== "unassigned" ? `<form class="tiktok-add-panel" id="tiktok-add-form" hidden>
      <label>Link TikTok<input id="tiktok-url" type="url" inputmode="url" autocomplete="off" required placeholder="https://vm.tiktok.com/…"></label>
      <label>Titolo <small>(facoltativo)</small><input id="tiktok-title" type="text" maxlength="80" autocomplete="off" placeholder="Es. Parcheggio, ristorante, punto foto…"></label>
      <div class="tiktok-add-actions"><button class="tiktok-save-btn" id="tiktok-save" type="submit">Salva</button><button class="tiktok-cancel-btn" id="tiktok-add-cancel" type="button">Annulla</button></div>
      <div class="tiktok-form-status" id="tiktok-form-status"></div>
    </form>` : ""}
    <div class="tiktok-list">${cityTips.length ? cityTips.map(t => tipCard(t,cityId)).join("") : `<div class="tiktok-empty">${cityId === "unassigned" ? "Tutti i link iniziali sono stati assegnati." : "Nessun consiglio ancora. Premi ＋ Aggiungi e incolla un link TikTok."}</div>`}</div>
    <div class="tiktok-sync-note">☁️ Le modifiche si sincronizzano con l’altro telefono.</div>`;

  $("#back-tiktok-city")?.addEventListener("click",()=>history.back());
  $("#tiktok-add-open")?.addEventListener("click",()=>{
    const panel = $("#tiktok-add-form");
    if (!panel) return;
    panel.hidden = false;
    $("#tiktok-url")?.focus();
  });
  $("#tiktok-add-cancel")?.addEventListener("click",()=>{
    const panel = $("#tiktok-add-form");
    if (panel) panel.hidden = true;
  });
  $("#tiktok-add-form")?.addEventListener("submit", event => saveTip(event,cityId));
  host.querySelectorAll("[data-delete-tip]").forEach(btn => btn.addEventListener("click",()=>removeTip(btn.dataset.deleteTip)));
  host.querySelectorAll("[data-assign-tip]").forEach(btn => btn.addEventListener("click",()=>assignTip(btn.dataset.assignTip,btn.dataset.assignCity)));
}

async function saveTip(event, cityId){
  event.preventDefault();
  if (!currentUser || !window.LFBudget?.isAuthenticated?.() || cityId === "unassigned") return;
  const status = $("#tiktok-form-status");
  const button = $("#tiktok-save");
  try {
    const url = normalizeUrl($("#tiktok-url")?.value);
    const title = compactText($("#tiktok-title")?.value,80);
    button.disabled = true;
    if (status) status.textContent = "Salvataggio…";
    const meta = await resolveMetadata(url);
    await addDoc(tipsRef(), {
      city:cityId,
      url,
      canonicalUrl:meta.canonicalUrl || "",
      postId:meta.postId || "",
      coverUrl:meta.coverUrl || "",
      autoTitle:meta.autoTitle || "",
      author:meta.author || "",
      title,
      source:"manual",
      createdBy:currentUser.uid,
      createdAtMs:Date.now(),
      createdAt:serverTimestamp(),
      updatedAt:serverTimestamp()
    });
    if (status) status.textContent = "Salvato ✓";
    event.currentTarget.reset();
    setTimeout(()=>{ if (event.currentTarget) event.currentTarget.hidden = true; },250);
  } catch(err){
    console.error(err);
    if (status) status.textContent = err?.message || "Non sono riuscito a salvare il link.";
  } finally {
    if (button) button.disabled = false;
  }
}

async function removeTip(id){
  if (!currentUser || !window.LFBudget?.isAuthenticated?.() || !id) return;
  if (!confirm("Eliminare questo consiglio TikTok? Verrà rimosso anche dall'altro telefono.")) return;
  try { await deleteDoc(doc(db,"budget","main","tiktokTips",id)); }
  catch(err){ console.error(err); alert("Non sono riuscito a eliminare il consiglio."); }
}

async function assignTip(id, cityId){
  if (!currentUser || !window.LFBudget?.isAuthenticated?.() || !id || !cityInfo(cityId)) return;
  try {
    await updateDoc(doc(db,"budget","main","tiktokTips",id), { city:cityId, updatedAt:serverTimestamp() });
  } catch(err){
    console.error(err);
    alert("Non sono riuscito a spostare il consiglio.");
  }
}

function openHub(push=true){
  if (!requireAuth(push)) return;
  currentCity = null;
  renderHub();
  navigate("tiktok",{},push);
}

function openCity(cityId,push=true){
  if (!requireAuth(push)) return;
  if (cityId !== "unassigned" && !cityInfo(cityId)) return;
  renderCity(cityId);
  navigate("tiktok-city",{tipsCity:cityId},push);
}

function rerenderActiveScreen(){
  if ($("#screen-tiktok")?.classList.contains("active")) renderHub();
  if ($("#screen-tiktok-city")?.classList.contains("active")) renderCity(currentCity || history.state?.tipsCity || "unassigned");
}

function bindNavigation(){
  const tab = $("#tiktok-tab");
  if (tab && tab.dataset.tiktokBound !== "1"){
    tab.dataset.tiktokBound = "1";
    tab.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openHub(true);
    }, true);
  }
  window.addEventListener("popstate", event => {
    const state = event.state || {};
    if (state.screen === "tiktok") renderHub();
    if (state.screen === "tiktok-city" && state.tipsCity) {
      currentCity = state.tipsCity;
      renderCity(state.tipsCity);
    }
  });
}

function startFirebase(){
  if (firebaseStarted) return;
  firebaseStarted = true;
  try {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } catch(err){
    firebaseStarted = false;
    console.error("TikTok tips Firebase init:",err);
    return;
  }
  onAuthStateChanged(auth, async user => {
    currentUser = user || null;
    setTabVisible(!!currentUser);
    if (currentUser){
      await ensureInitialTips();
      startTipsListener();
    } else {
      stopTipsListener();
      if ($("#screen-tiktok")?.classList.contains("active") || $("#screen-tiktok-city")?.classList.contains("active")) {
        if (typeof window.openPrivateAccess === "function") window.openPrivateAccess(false);
      }
    }
  });
}

bindNavigation();
setTabVisible(false);

// Fonte di verità per la visibilità: lo stesso stato privato L&F di Budget e SOS.
window.addEventListener("lf-auth-changed", event => {
  setTabVisible(!!event.detail?.authenticated && !!currentUser);
  if (!event.detail?.authenticated && ($("#screen-tiktok")?.classList.contains("active") || $("#screen-tiktok-city")?.classList.contains("active"))){
    if (typeof window.openPrivateAccess === "function") window.openPrivateAccess(false);
  }
});

if (window.LFBudget) startFirebase();
else window.addEventListener("lf-firebase-ready", startFirebase, { once:true });
window.addEventListener("online",()=>{ if (currentUser && window.LFBudget?.isAuthenticated?.()) ensureInitialTips(); });

window.LFTikTokTips = { open:openHub, openCity };
