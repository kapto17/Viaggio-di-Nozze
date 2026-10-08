import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getAuth,
  setPersistence,
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
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getBlob,
  deleteObject
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-storage.js";

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
const auth = getAuth(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
const storage = getStorage(app);

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

setPersistence(auth, browserLocalPersistence).catch(err => console.error("Auth persistence:", err));

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

function safeStorageName(name){
  const clean = String(name || "biglietto").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return (clean || "biglietto").slice(-120);
}

function validTicketOwner(value){
  return ["lorenzo","fortuna","both"].includes(value) ? value : "both";
}

async function uploadTicket(ticket, file){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  if (!file) throw new Error("File biglietto mancante");
  const ticketDoc = doc(ticketsRef);
  const storagePath = `tickets/${ticketDoc.id}/${Date.now()}-${safeStorageName(file.name)}`;
  const fileRef = storageRef(storage, storagePath);
  try {
    await uploadBytes(fileRef, file, {
      contentType: file.type || "application/octet-stream",
      customMetadata: {
        ticketId: ticketDoc.id,
        owner: validTicketOwner(ticket.owner),
        uploadedBy: currentUser.uid
      }
    });
    const payload = {
      legId: String(ticket.legId || ""),
      label: String(ticket.label || file.name).trim().slice(0,80),
      owner: validTicketOwner(ticket.owner),
      targetKey: String(ticket.targetKey || ""),
      targetLabel: String(ticket.targetLabel || ""),
      fileName: String(file.name || "biglietto"),
      mimeType: file.type || "application/octet-stream",
      size: Number(file.size || 0),
      storagePath,
      uploadedBy: currentUser.uid,
      createdAtMs: Date.now(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(ticketDoc, payload);
    return { id:ticketDoc.id, ...payload };
  } catch(err){
    try { await deleteObject(fileRef); } catch(_){}
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
  if (!ticket.storagePath) throw new Error("File del biglietto non disponibile");
  return getBlob(storageRef(storage, ticket.storagePath));
}

async function removeTicket(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  let ticket = lastTickets.find(t => t.id === id);
  if (!ticket){
    const snap = await getDoc(doc(db, "budget", "main", "tickets", id));
    if (snap.exists()) ticket = { id:snap.id, ...snap.data() };
  }
  if (ticket?.storagePath){
    try { await deleteObject(storageRef(storage, ticket.storagePath)); }
    catch(err){ if (err?.code !== "storage/object-not-found") throw err; }
  }
  await deleteDoc(doc(db, "budget", "main", "tickets", id));
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
