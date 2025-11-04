# 🚀 Developer Setup - Generational Handbook

## Requisiti di Sistema

- **Node.js**: v18+ (verificare con `node --version`)
- **npm**: v9+ (verificare con `npm --version`)
- **Sistema Operativo**: Windows, macOS, Linux

---

## 📦 Primo Setup su Nuovo PC

### 1. Clone del Repository
```bash
git clone [repository-url]
cd generational-handbook
git checkout develop
```

### 2. Installazione Dipendenze
```bash
npm install
```

### 3. Configurazione Environment

Se necessario, crea file `.env.local` (verificare con il team se ci sono variabili richieste).

### 4. Avvio Development Server
```bash
npm run dev
```

---

## ⚠️ Problema Noto: Schermata Bianca al Primo Avvio

### Sintomo

Al **primo caricamento** su un nuovo PC:
- ✅ Server dev parte correttamente
- ❌ Browser mostra schermata bianca
- ❌ Nav e Container non caricano
- ❌ Console mostra `ChunkLoadError`

Al **secondo caricamento** (dopo refresh F5):
- ✅ Tutto funziona correttamente
- ✅ Dark theme applicato
- ✅ Componenti caricati

### Causa

Webpack Dev Server con cache `.next/` vuota su nuovo PC genera chunk in modo asincrono.
Al primo caricamento i chunk non sono pronti, al secondo vengono serviti correttamente dalla cache.

### ✅ Soluzione Rapida

**Opzione 1: Refresh Browser**
```
Semplicemente ricarica la pagina (F5 o Cmd+R)
```

**Opzione 2: Restart Dev Server**
```bash
# Stop server (Ctrl+C)
# Pulisci cache
rm -rf .next
# Riavvia
npm run dev
```

### 🎯 Importante

- ✅ **Questo NON impatta la produzione** (Vercel funziona sempre)
- ✅ **È un problema solo di dev environment**
- ✅ **Succede solo al primo setup su nuovo PC**
- ✅ **Non è un bug del codice**

---

## 🔧 Comandi Utili

### Development
```bash
# Avvio normale
npm run dev

# Build e start produzione (test locale)
npm run build
npm start

# Lint
npm run lint

# Type check
npm run type-check  # (se configurato)
```

### Pulizia Cache
```bash
# Pulisci solo build
rm -rf .next

# Pulisci tutto e reinstalla
rm -rf .next node_modules
npm install
```

---

## 🌍 Internazionalizzazione (i18n)

Il progetto supporta:
- 🇬🇧 Inglese (default)
- 🇮🇹 Italiano

Traduzioni in: `/public/locales/{lang}/`

---

## 📂 Struttura Progetto Principale
```
/
├── app/                 # Next.js App Router
├── components/          # React Components
├── contexts/           # React Contexts (LanguageProvider, etc)
├── data/              # Handbook Data (generazioni, temi, etc)
├── public/            # Assets statici
│   └── locales/      # File traduzioni i18n
├── styles/           # CSS/Tailwind
└── types/            # TypeScript types
```

---

## 🐛 Troubleshooting

### Port già in uso
```bash
# Errore: Port 3000 already in use
# Soluzione: Kill processo o usa altra porta
npm run dev -- -p 3001
```

### Errori TypeScript
```bash
# Verifica errori
npm run lint
# O manualmente
npx tsc --noEmit
```

### Modifiche non riflesse
```bash
# Hard refresh browser
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (macOS)

# O pulisci cache
rm -rf .next
npm run dev
```

---

## 📞 Supporto

Per problemi non documentati, contattare il team o aprire issue su GitHub.

---

## ✅ Checklist Primo Setup

- [ ] Node.js v18+ installato
- [ ] Repository clonato su branch `develop`
- [ ] `npm install` completato
- [ ] `npm run dev` avviato
- [ ] Al primo caricamento bianco → **F5 refresh** → tutto funziona ✅
- [ ] Dark theme visibile
- [ ] Nav e Container caricati

**Setup completato! 🎉**