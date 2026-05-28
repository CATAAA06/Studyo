# STUDYO — Project Brief & Istruzioni Cowork

> Usa questo documento come prompt iniziale in qualsiasi ambiente di sviluppo collaborativo (Claude, Cursor, Copilot, o briefing per co-founder tecnico). Contiene tutto il contesto necessario per lavorare su Studyo.

---

## COSA È STUDYO

Studyo è una piattaforma web che trasforma lo studio in un'esperienza multiplayer gamificata. Gli studenti entrano in lobby tematiche per materia (Analisi 1, Microeconomia, Giurisprudenza, ecc.), studiano insieme in tempo reale, completano quiz, guadagnano XP e competono in classifiche. L'interfaccia è ispirata a Discord (3 colonne: server strip + sidebar canali + contenuto principale).

**Sito live:** https://cataaa06.github.io/Studyo/
**Repo:** https://github.com/CATAAA06/Studyo

---

## STATO ATTUALE (Maggio 2026)

### Funzionante
- Autenticazione reale (Google + Email/Password) via Firebase Auth
- Database Firestore per utenti e feedback
- Layout Discord-style responsive (desktop + mobile + tablet)
- Sidebar mobile con drawer slide-in e hamburger toggle
- 12 lobby di studio con materie universitarie italiane
- Timer Pomodoro con animazione torre (i blocchi si costruiscono col progresso)
- 6 suoni ambientali generati via Web Audio API (pioggia, camino, caffetteria, natura, rumore bianco, rumore marrone)
- Quiz interattivi con 5 domande per materia (12 materie)
- Flashcard con ripetizione spaziata (facile/medio/difficile)
- Sistema XP completo: 6 livelli (Matricola → Leggenda), badge, streak, sfide giornaliere
- Chat di lobby (simulata con risposte fake)
- Community per ateneo/scuola (simulata con dati fake)
- Profilo utente con statistiche, badge, attività recente
- Setup con scelta università + corso di laurea OPPURE scuola superiore + tipo + classe
- Sistema feedback in-app che salva su Firestore
- Appunti personali per lobby (salvati in localStorage)
- AI Tutor (risposte random pre-scritte, non connesso a LLM reale)

### Non ancora implementato (priorità)
1. **Lobby reali in tempo reale** — Attualmente le lobby hanno studenti fake. Servono WebSocket o Firebase Realtime per la presenza reale.
2. **Chat reale** — La chat ha risposte simulate. Serve Firestore real-time o WebSocket.
3. **Upload appunti con XP** — Sistema per caricare PDF/foto appunti, guadagnare XP, e condividerli.
4. **AI Tutor reale** — Integrare un LLM (API OpenAI/Anthropic o NotebookLM).
5. **Notifiche push** — Reminder per streak e sessioni di studio.
6. **Marketplace appunti** — Vendita/acquisto appunti tra studenti.
7. **Lezioni private** — Marketplace peer tutoring.
8. **PWA / App nativa** — Manifest, service worker, o React Native.
9. **Firestore security rules** — Attualmente in test mode (scade dopo 30 giorni).
10. **Integrazione Spotify** — Playlist di studio collegate.

---

## ARCHITETTURA TECNICA

### Stack
- **Frontend:** HTML + CSS + JavaScript vanilla (nessun framework, nessun build tool)
- **Backend:** Firebase (Auth + Firestore) via CDN compat SDK v10.12.0
- **Hosting:** GitHub Pages (deploy = git push su main)
- **Audio:** Web Audio API (generazione procedurale di rumore, nessun file audio)
- **Storage locale:** localStorage per stato utente e appunti

### Struttura file
```
C:\App\Studyo\
├── index.html              # App principale (tutto in una pagina SPA)
├── css/
│   ├── style.css           # Design system + componenti + responsive
│   └── discord.css         # Layout Discord 3 colonne + mobile drawer
├── js/
│   ├── data.js             # Dati statici: lobby, quiz, flashcard, badge, livelli, sfide
│   ├── app.js              # Logica app: navigazione, timer, quiz, flashcard, suoni, community
│   └── firebase-config.js  # Firebase: auth, Firestore CRUD, listener auth state
├── BUSINESS_PLAN.md        # Business plan completo
├── BETA_TEST.md            # Kit per beta testing
└── PROJECT_PROMPT.md       # Questo file
```

### Firebase
- **Progetto:** studyo-4f901
- **Auth:** Google provider + Email/Password
- **Firestore collections:**
  - `users` — doc per utente (uid come doc ID), campi: name, email, school, uni, scuola, corso, tipoScuola, classe, xp, streak, level, studyHours, quizzesCompleted, pomodorosCompleted, setupDone, lastActive, updatedAt
  - `feedbacks` — doc per feedback, campi: type, text, userId, userName, uni, createdAt
- **Dominio autorizzato:** cataaa06.github.io (aggiunto in Firebase Console → Auth → Settings)
- **Security rules:** test mode (DA CAMBIARE prima di produzione)

### Convenzioni di codice
- Nessun framework: vanilla JS con funzioni globali
- CSS variables per tutto il design system (definite in :root di style.css)
- Colori principali: --primary (#6C5CE7), --accent (#FF6B6B), --bg (#0F0E17)
- Naming: camelCase per JS, kebab-case per CSS classes
- Modali: pattern `openModal('name')` / `closeModal('name')` con id `modal-{name}`
- Navigazione: `navigate('page', data)` con pagine: home, lobby, profile
- State globale: oggetto `state` con tutti i dati utente, persistito in localStorage
- Firestore sync: `saveUserToFirestore()` chiamato dopo ogni cambio significativo di stato

---

## DESIGN SYSTEM

### Tema
- **Dark theme** ispirato a Discord/gaming
- Background scuro (#0F0E17) con card leggermente più chiare (#1A1929)
- Gradient primario: viola (#6C5CE7) → rosso corallo (#FF6B6B)
- Testo: bianco (#FFFFFE) con secondario (#A7A7BE) e muted (#6B6B80)

### Layout
- **Desktop:** 3 colonne — server strip (72px) | channel sidebar (260px) | main content (flex)
- **Tablet (≤1100px):** sidebar 220px, content si adatta
- **Mobile (≤768px):** server strip nascosto, sidebar come drawer slide-in, content full-width
- **Small phone (≤480px):** padding e font ridotti ulteriormente

### Componenti riutilizzabili
- `.btn` `.btn-primary` `.btn-secondary` `.btn-accent` `.btn-large` — bottoni
- `.card` `.card-header` — container con bordo e background
- `.form-group` — label + input/select
- `.modal` `.modal-content` `.modal-header` — sistema modale
- `.server-icon` — icone nella strip laterale
- `.sidebar-lobby` — item lobby nella sidebar

---

## GAMIFICAZIONE

### Sistema XP
| Azione | XP |
|--------|-----|
| Registrazione | +50 |
| Quiz risposta corretta | +50 |
| Pomodoro 25min completato | +75 |
| Pomodoro <25min completato | +30 |
| Flashcard facile | +20 |
| Flashcard media | +10 |
| Flashcard difficile | +5 |
| Domanda AI Tutor | +5 |
| Feedback inviato | +25 |

### Livelli
1. Matricola (0 XP)
2. Studente (500 XP)
3. Veterano (1500 XP)
4. Esperto (3500 XP)
5. Maestro (7000 XP)
6. Leggenda (15000 XP)

### Streak
- Contatore giorni consecutivi di studio
- Attualmente resettato solo manualmente (da implementare: reset automatico se non studi per 1 giorno)

---

## TARGET E BUSINESS

### Utenti target
- **Primario:** Studenti universitari italiani (18-25 anni)
- **Secondario:** Studenti scuole superiori italiane (14-19 anni)
- **Futuro:** Studenti europei

### Modello di business (sintesi)
- **Freemium:** Base gratis, Pro a 4.99€/mese (quiz illimitati, AI avanzato, lobby private, stats)
- **Marketplace:** Appunti venduti tra studenti, commissione 20%
- **B2B:** Studyo Campus per università (2-5€/studente/anno)

### Competitor principali
- Forest (solo timer), Quizlet (solo quiz), StudyStream (video pesante), Discord (non per studio)

---

## COME LAVORARE SU STUDYO

### Setup sviluppo
1. Clona il repo: `git clone https://github.com/CATAAA06/Studyo.git`
2. Apri `index.html` in un browser (o usa Live Server in VS Code)
3. Firebase è già configurato — funziona subito con le API key nel codice (sono API key client-side, è normale che siano visibili)

### Deploy
```bash
git add .
git commit -m "descrizione cambio"
git push origin main
```
GitHub Pages si aggiorna automaticamente in 1-2 minuti.

### Priorità di sviluppo
1. 🔴 **Security rules Firestore** — Urgente, test mode scade
2. 🔴 **Presenza reale nelle lobby** — Trasforma il prototipo in prodotto reale
3. 🟡 **Chat reale** — Firebase Realtime Database o Firestore listeners
4. 🟡 **AI Tutor con LLM** — API call a un modello reale
5. 🟢 **Upload appunti** — Firebase Storage + XP reward
6. 🟢 **PWA** — Manifest + service worker per installazione mobile
7. 🟢 **Notifiche** — Firebase Cloud Messaging

### Regole di design
- Mantieni il tema scuro Discord-like
- Ogni azione utente deve dare feedback visivo (notifica, animazione, suono)
- Ogni azione di studio deve dare XP (anche piccoli, tipo 5 XP)
- Touch target minimo 44px su mobile
- Input font 16px su mobile (previene zoom iOS)
- Tono UI: informale, universitario, emoji ok, italiano

---

## TEAM

- **[Francesco]** — CEO & Product (studente UNIMORE, Modena)
- **Davide** — Co-founder & Growth (studente UNIMORE, Modena)
- **[Cercasi]** — CTO / Co-founder tecnico (dev full-stack)

---

## CONTESTO STRATEGICO

L'idea è nata perché i due fondatori studiavano insieme su Google Meet e si sono chiesti: "perché non esiste un posto fatto apposta per questo?" L'obiettivo è creare il Duolingo dello studio collaborativo — dove la gamificazione rende lo studio avvincente e la community crea accountability.

Il mercato EdTech italiano è relativamente vuoto per questo tipo di prodotto. Il timing è perfetto: studenti digital-native post-COVID, AI che abilita tutor personalizzati a costo zero, e la gamificazione è provata (Duolingo vale $6.5B).

La strategia è: partire da UNIMORE → top 10 università italiane → superiori → Europa.
