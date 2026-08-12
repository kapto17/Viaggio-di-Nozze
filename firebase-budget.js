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
  cityBudgets: {
    "San Francisco": 450,
    "Los Angeles": 650,
    "Las Vegas 27-28": 170,
    "Page / Grand Canyon": 300,
    "Las Vegas 29-30": 180,
    "Chicago": 550,
    "Bayahibe": 200
  }
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

let currentUser = null;
let authListeners = new Set();
let budgetListeners = new Set();
let unsubscribeSettings = null;
let unsubscribeExpenses = null;
let lastSettings = null;
let lastExpenses = [];

const settingsRef = doc(db, "budget", "main");
const expensesRef = collection(db, "budget", "main", "expenses");

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

function stopBudgetListeners(){
  if (unsubscribeSettings) unsubscribeSettings();
  if (unsubscribeExpenses) unsubscribeExpenses();
  unsubscribeSettings = null;
  unsubscribeExpenses = null;
  lastSettings = null;
  lastExpenses = [];
  emitBudget();
}

setPersistence(auth, browserLocalPersistence).catch(err => console.error("Auth persistence:", err));

onAuthStateChanged(auth, async (user) => {
  currentUser = user || null;
  if (currentUser){
    try {
      await ensureSettings();
      startBudgetListeners();
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

async function addExpense(expense){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await addDoc(expensesRef, {
    amount: Number(expense.amount),
    city: expense.city || "Generale",
    category: expense.category || "Altro",
    description: String(expense.description || "").trim(),
    date: expense.date || new Date().toISOString().slice(0,10),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

async function editExpense(id, expense){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await updateDoc(doc(db, "budget", "main", "expenses", id), {
    amount: Number(expense.amount),
    city: expense.city || "Generale",
    category: expense.category || "Altro",
    description: String(expense.description || "").trim(),
    date: expense.date || new Date().toISOString().slice(0,10),
    updatedAt: serverTimestamp()
  });
}

async function removeExpense(id){
  if (!currentUser) throw new Error("Area L&F non sbloccata");
  await deleteDoc(doc(db, "budget", "main", "expenses", id));
}

window.LFBudget = {
  login,
  logout,
  saveSettings,
  addExpense,
  editExpense,
  removeExpense,
  isAuthenticated: () => !!currentUser,
  getUser: () => currentUser ? { uid: currentUser.uid, email: currentUser.email } : null,
  getSnapshot: () => ({ settings:lastSettings, expenses:lastExpenses }),
  onAuth(callback){ authListeners.add(callback); callback({ authenticated:!!currentUser, user:currentUser ? {uid:currentUser.uid,email:currentUser.email}:null }); return () => authListeners.delete(callback); },
  onBudget(callback){ budgetListeners.add(callback); callback({ settings:lastSettings, expenses:lastExpenses }); return () => budgetListeners.delete(callback); },
  defaults: DEFAULT_SETTINGS
};

window.dispatchEvent(new Event("lf-firebase-ready"));
