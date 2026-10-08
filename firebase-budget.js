import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  initializeAuth,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  getDocs,
  Bytes
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDreelMDDET9M8xw_6sQ6Rs3vMh-WA7GEI",
  authDomain: "viaggio-nozze-lf.firebaseapp.com",
  projectId: "viaggio-nozze-lf",
  storageBucket: "viaggio-nozze-lf.firebasestorage.app",
  messagingSenderId: "226703920809",
  appId: "1:226703920809:web:1d0396016d4b2acb90e3b8"
};

const DEFAULT_SETTINGS = {
  totalBudget: 2500,
  currency: "USD",
  bayahibeBudgetDOP: 0,
  cityBudgets: {
    "San Francisco": 450,
    "Los Angeles": 650,
    "Las Vegas 27-28": 170,
    "Page / Grand Canyon": 300,
    "Las Vegas 29-30": 180,
    "Chicago": 550
  }
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence]
});
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

let currentUser = null;
let authListeners = new Set();
let budgetListeners = new Set();
let ticketListeners = new Set();
let unsubscribeSettings = null;
let unsubscribeExpenses = null;
let unsubscribeTickets = null;
let lastSettings = null;
let lastExpenses = [];
let lastTickets = [];
let ticketsReady = false;
let ticketsFromCache = true;

const settingsRef = doc(db, "budget", "main");
const expensesRef = collection(db, "budget", "main", "expenses");
const ticketsRef = collection(db, "budget", "main", "tickets");

function emitAuth(){
  const payload = { authenticated: !!currentUser, user: currentUser ? { uid: currentUser.uid, email: currentUser.email } : null };
  authListeners.forEach(fn => fn(payload));
  window.dispatchEvent(new CustomEvent("lf-auth-changed", { detail: payload }));
}

function emitBudget(){
  const payload = { settings: lastSettings, expenses: lastExpenses };
  budgetListeners.forEach(fn => fn(payload));
  window.dispatchEvent(new CustomEvent("lf-budget-changed", { detail: payload }));
}

function emitTickets(){
  const payload = { tickets:lastTickets, ready:ticketsReady, fromCache:ticketsFromCache };
  ticketListeners.forEach(fn => fn(payload));
  window.dispatchEvent(new CustomEvent("lf-tickets-changed", { detail: payload }));
}

async function ensureSettings(){
  const snap = await getDoc(settingsRef);
  if (!snap.exists()){
    await setDoc(settingsRef, { ...DEFAULT_SETTINGS, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
}

function startBudgetListeners(){
  if (unsubscribeSettings) unsubscribeSettings();
  if (unsubscribeExpenses) unsubscribeExpenses();

  unsubscribeSettings = onSnapshot(settingsRef, (snap) => {
    lastSettings = snap.exists() ? snap.data() : { ...DEFAULT_SETTINGS };
    emitBudget();
  }, (err) => console.error("Budget settings listener:", err));

  unsubscribeExpenses = onSnapshot(expensesRef, { includeMetadataChanges: true }, (snap) => {
    lastExpenses = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => {
      const ad = (a.date || "") + (a.createdAt?.seconds || 0);
      const bd = (b.date || "") + (b.createdAt?.seconds || 0);
      return bd > ad ? 1 : bd < ad ? -1 : 0;
    });
    emitBudget();
  }, (err) => console.error("Budget expenses listener:", err));
}

function startTicketListener(){
  if (unsubscribeTickets) unsubscribeTickets();
  ticketsReady = false;
  lastTickets = [];
  emitTickets();
  unsubscribeTickets = onSnapshot(ticketsRef, { includeMetadataChanges:true }, (snap) => {
    lastTickets = snap.docs.map(d => ({ id:d.id, ...d.data() })).sort((a,b) => {
      const av = a.createdAt?.seconds || a.createdAtMs || 0;
      const bv = b.createdAt?.seconds || b.createdAtMs || 0;
      return av - bv;
    });
    ticketsReady = true;
    ticketsFromCache = !!snap.metadata.fromCache;
    emitTickets();
  }, (err) => {
    console.error("Shared tickets listener:", err);
    window.dispatchEvent(new CustomEvent("lf-tickets-error", { detail:{ code:err?.code || "", message:err?.message || String(err) } }));
  });
}

function stopBudgetListeners(){
  if (unsubscribeSettings) unsubscribeSettings();
  if (unsubscribeExpenses) unsubscribeExpenses();
  if (unsubscribeTickets) unsubscribeTickets();
  unsubscribeSettings = null;
  unsubscribeExpenses = null;
  unsubscribeTickets = null;
  lastSettings = null;
  lastExpenses = [];
  lastTickets = [];
  ticketsReady = false;
  ticketsFromCache = true;
  emitBudget();
  emitTickets();
}

onAuthStateChanged(auth, async (user) => {
  currentUser = user || null;
  if (currentUser){
    try {
      await ensureSettings();
      startBudgetListeners();
      startTicketListener();
    } catch(err){
      console.error("Budget init:", err);
    }
  } else {
    stopBudgetListeners();
  }
  emitAuth();
});

async function login(email, password){
  const credential = await signInWithEmailAndPassword(auth, String(email || "").trim(), String(password || ""));
  return credential.user;
}

async function logout(){
  await signOut(auth);
}

async function saveSettings(next){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await setDoc(settingsRef, {
    ...next,
    updatedAt: serverTimestamp()
  }, { merge:true });
}

function validCurrency(value){
  return value === "DOP" ? "DOP" : "USD";
}

async function addExpense(expense){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await addDoc(expensesRef, {
    entryType: "expense",
    amount: Number(expense.amount),
    currency: validCurrency(expense.currency),
    city: expense.city || "Generale",
    category: expense.category || "Altro",
    description: String(expense.description || "").trim(),
    paidBy: ["Lorenzo","Fortuna"].includes(expense.paidBy) ? expense.paidBy : "",
    splitType: ["equal","lorenzo_only","fortuna_only"].includes(expense.splitType) ? expense.splitType : "equal",
    date: expense.date || new Date().toISOString().slice(0,10),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

async function editExpense(id, expense){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await updateDoc(doc(db, "budget", "main", "expenses", id), {
    entryType: "expense",
    amount: Number(expense.amount),
    currency: validCurrency(expense.currency),
    city: expense.city || "Generale",
    category: expense.category || "Altro",
    description: String(expense.description || "").trim(),
    paidBy: ["Lorenzo","Fortuna"].includes(expense.paidBy) ? expense.paidBy : "",
    splitType: ["equal","lorenzo_only","fortuna_only"].includes(expense.splitType) ? expense.splitType : "equal",
    date: expense.date || new Date().toISOString().slice(0,10),
    updatedAt: serverTimestamp()
  });
}

async function addSettlement(settlement){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  const amount = Number(settlement.amount);
  const from = ["Lorenzo","Fortuna"].includes(settlement.from) ? settlement.from : "";
  const to = ["Lorenzo","Fortuna"].includes(settlement.to) ? settlement.to : "";
  if (!Number.isFinite(amount) || amount <= 0 || !from || !to || from === to) throw new Error("Pareggio non valido");
  await addDoc(expensesRef, {
    entryType: "settlement",
    amount,
    currency: validCurrency(settlement.currency),
    from,
    to,
    note: String(settlement.note || "Pareggio manuale").trim(),
    date: settlement.date || new Date().toISOString().slice(0,10),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

async function removeSettlement(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await deleteDoc(doc(db, "budget", "main", "expenses", id));
}

async function removeExpense(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await deleteDoc(doc(db, "budget", "main", "expenses", id));
}

const TICKET_CHUNK_SIZE = 600 * 1024;
const TICKET_MAX_SIZE = 20 * 1024 * 1024;

function validTicketOwner(value){
  return ["lorenzo","fortuna","both"].includes(value) ? value : "both";
}

function ticketChunksRef(id){
  return collection(db, "budget", "main", "ticketFiles", id, "chunks");
}

async function deleteTicketChunks(id){
  try {
    const snap = await getDocs(ticketChunksRef(id));
    for (const chunk of snap.docs) await deleteDoc(chunk.ref);
  } catch(err){
    console.warn("Pulizia chunk biglietto:", err);
  }
}

async function uploadTicket(ticket, file){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  if (!file) throw new Error("File biglietto mancante");
  if (!navigator.onLine) throw new Error("Offline: sincronizzazione rimandata");
  if (file.size > TICKET_MAX_SIZE) throw new Error("Il file supera il limite di 20 MB");

  const ticketDoc = doc(ticketsRef);
  const ticketId = ticketDoc.id;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const chunkCount = Math.max(1, Math.ceil(bytes.length / TICKET_CHUNK_SIZE));

  try {
    for(let i=0; i<chunkCount; i++){
      const part = bytes.slice(i*TICKET_CHUNK_SIZE, Math.min(bytes.length, (i+1)*TICKET_CHUNK_SIZE));
      const chunkId = String(i).padStart(4, "0");
      await setDoc(doc(db, "budget", "main", "ticketFiles", ticketId, "chunks", chunkId), {
        index:i,
        data:Bytes.fromUint8Array(part)
      });
    }

    const payload = {
      legId: String(ticket.legId || ""),
      label: String(ticket.label || file.name).trim().slice(0,80),
      owner: validTicketOwner(ticket.owner),
      targetKey: String(ticket.targetKey || ""),
      targetLabel: String(ticket.targetLabel || ""),
      fileName: String(file.name || "biglietto"),
      mimeType: file.type || "application/octet-stream",
      size: Number(file.size || 0),
      storageKind: "firestore-chunks",
      chunkCount,
      uploadedBy: currentUser.uid,
      createdAtMs: Date.now(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    // Il metadato viene scritto per ultimo: l'altro telefono vede il ticket
    // solo quando tutti i blocchi del file sono già disponibili.
    await setDoc(ticketDoc, payload);
    return { id:ticketId, ...payload };
  } catch(err){
    await deleteTicketChunks(ticketId);
    throw err;
  }
}

async function downloadTicket(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  let ticket = lastTickets.find(t => t.id === id);
  if (!ticket){
    const snap = await getDoc(doc(db, "budget", "main", "tickets", id));
    if (!snap.exists()) throw new Error("Biglietto non trovato");
    ticket = { id:snap.id, ...snap.data() };
  }
  if (ticket.storageKind !== "firestore-chunks") throw new Error("File condiviso non disponibile");

  const snap = await getDocs(ticketChunksRef(id));
  const chunks = snap.docs
    .map(d => ({ id:d.id, ...d.data() }))
    .sort((a,b) => Number(a.index ?? a.id) - Number(b.index ?? b.id));
  if (!chunks.length || (ticket.chunkCount && chunks.length !== Number(ticket.chunkCount))){
    throw new Error("File condiviso incompleto");
  }
  const parts = chunks.map(c => {
    if (!c.data || typeof c.data.toUint8Array !== "function") throw new Error("Blocco file non valido");
    return c.data.toUint8Array();
  });
  return new Blob(parts, { type: ticket.mimeType || "application/octet-stream" });
}

async function removeTicket(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await deleteTicketChunks(id);
  await deleteDoc(doc(db, "budget", "main", "tickets", id));
}

async function renameTicket(id, label){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  const clean = String(label || "").trim().slice(0,80);
  if (!clean) throw new Error("Nome biglietto non valido");
  await updateDoc(doc(db, "budget", "main", "tickets", id), {
    label: clean,
    updatedAt: serverTimestamp()
  });
}

window.LFBudget = {
  login,
  logout,
  saveSettings,
  addExpense,
  editExpense,
  addSettlement,
  removeSettlement,
  removeExpense,
  uploadTicket,
  downloadTicket,
  removeTicket,
  renameTicket,
  isAuthenticated: () => !!currentUser,
  getUser: () => currentUser ? { uid: currentUser.uid, email: currentUser.email } : null,
  getSnapshot: () => ({ settings:lastSettings, expenses:lastExpenses }),
  getTicketsSnapshot: () => ({ tickets:lastTickets, ready:ticketsReady, fromCache:ticketsFromCache }),
  onAuth(callback){ authListeners.add(callback); callback({ authenticated:!!currentUser, user:currentUser ? {uid:currentUser.uid,email:currentUser.email}:null }); return () => authListeners.delete(callback); },
  onBudget(callback){ budgetListeners.add(callback); callback({ settings:lastSettings, expenses:lastExpenses }); return () => budgetListeners.delete(callback); },
  onTickets(callback){ ticketListeners.add(callback); callback({ tickets:lastTickets, ready:ticketsReady, fromCache:ticketsFromCache }); return () => ticketListeners.delete(callback); },
  defaults: DEFAULT_SETTINGS
};

window.dispatchEvent(new Event("lf-firebase-ready"));
