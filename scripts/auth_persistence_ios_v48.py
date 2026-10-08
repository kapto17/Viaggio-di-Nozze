from pathlib import Path

# Firebase Auth: initialize with robust local persistence chain for iOS/PWA.
p=Path('firebase-budget.js')
s=p.read_text(encoding='utf-8')
old='''import {\n  getAuth,\n  setPersistence,\n  browserLocalPersistence,\n  signInWithEmailAndPassword,\n  signOut,\n  onAuthStateChanged\n} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";'''
new='''import {\n  initializeAuth,\n  indexedDBLocalPersistence,\n  browserLocalPersistence,\n  signInWithEmailAndPassword,\n  signOut,\n  onAuthStateChanged\n} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";'''
if old not in s:
    raise SystemExit('firebase auth import block not found')
s=s.replace(old,new,1)
old='const auth = getAuth(app);'
new='''const auth = initializeAuth(app, {\n  persistence: [indexedDBLocalPersistence, browserLocalPersistence]\n});'''
if old not in s:
    raise SystemExit('getAuth init not found')
s=s.replace(old,new,1)
old='setPersistence(auth, browserLocalPersistence).catch(err => console.error("Auth persistence:", err));\n\n'
if old not in s:
    raise SystemExit('setPersistence line not found')
s=s.replace(old,'',1)
p.write_text(s,encoding='utf-8')

# App version bump.
p=Path('app.js')
s=p.read_text(encoding='utf-8')
if 'Versione app 2.4.47' not in s:
    raise SystemExit('app version marker not found')
s=s.replace('Versione app 2.4.47','Versione app 2.4.48',1)
p.write_text(s,encoding='utf-8')

# Cache bust the Firebase module and app bundle.
p=Path('index.html')
s=p.read_text(encoding='utf-8')
if 'firebase-budget.js?v=38' not in s or 'app.js?v=122' not in s:
    raise SystemExit('index cache markers not found')
s=s.replace('firebase-budget.js?v=38','firebase-budget.js?v=39',1)
s=s.replace('app.js?v=122','app.js?v=123',1)
p.write_text(s,encoding='utf-8')

# Service worker cache bump.
p=Path('sw.js')
s=p.read_text(encoding='utf-8')
if 'viaggio-nozze-v145' not in s:
    raise SystemExit('service worker cache marker not found')
s=s.replace('viaggio-nozze-v145','viaggio-nozze-v146',1)
p.write_text(s,encoding='utf-8')
