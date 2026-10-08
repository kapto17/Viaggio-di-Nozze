from pathlib import Path

# motion.js: when restoring history, newly-rendered nodes must be born already visible.
p = Path('motion.js')
s = p.read_text(encoding='utf-8')
old = '''  function registerReveal(root = document) {\n    if (reducedMotion.matches || !("IntersectionObserver" in window)) {\n      revealImmediately(root);\n      return;\n    }'''
new = '''  function registerReveal(root = document) {\n    // On history/back the previous screen is being reconstructed. Do not hand\n    // those nodes to IntersectionObserver: on iOS its callback can arrive a\n    // frame later, producing a brief opacity:0 flash. Mark them visible now.\n    if (document.documentElement.classList.contains("history-restoring")) {\n      revealImmediately(root);\n      return;\n    }\n    if (reducedMotion.matches || !("IntersectionObserver" in window)) {\n      revealImmediately(root);\n      return;\n    }'''
if old not in s:
    raise SystemExit('registerReveal marker not found')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

# app version bump
p = Path('app.js')
s = p.read_text(encoding='utf-8')
if 'Versione app 2.4.50' not in s:
    raise SystemExit('app version marker not found')
s = s.replace('Versione app 2.4.50', 'Versione app 2.4.51', 1)
p.write_text(s, encoding='utf-8')

# Cache-bust changed bundles.
p = Path('index.html')
s = p.read_text(encoding='utf-8')
for old, new in [
    ('app.js?v=125', 'app.js?v=126'),
    ('motion.js?v=3', 'motion.js?v=4'),
]:
    if old not in s:
        raise SystemExit(f'index marker not found: {old}')
    s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

# PWA cache bump.
p = Path('sw.js')
s = p.read_text(encoding='utf-8')
if 'viaggio-nozze-v148' not in s:
    raise SystemExit('service worker cache marker not found')
s = s.replace('viaggio-nozze-v148', 'viaggio-nozze-v149', 1)
p.write_text(s, encoding='utf-8')
