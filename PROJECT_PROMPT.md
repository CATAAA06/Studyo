# STUDYO — Project Brief

> Documento di contesto per chiunque lavori su Studyo (co-founder tecnico, collaboratori, o come prompt iniziale in un ambiente di sviluppo assistito). Aggiornato a settembre 2026.

---

## COSA È STUDYO

Piattaforma web che trasforma lo studio in un'esperienza multiplayer. Gli studenti entrano in lobby per materia, si vedono studiare in tempo reale, usano timer condivisi, quiz e flashcard, e guadagnano XP. Interfaccia a 3 colonne ispirata a Discord.

**Sito pubblico:** https://cataaa06.github.io/Studyo/ (landing)
**App:** https://cataaa06.github.io/Studyo/app.html
**Repo:** https://github.com/CATAAA06/Studyo

---

## STRUTTURA DEI FILE

```
C:\App\Studyo\
├── index.html              # LANDING PAGE pubblica (self-contained, CSS inline)
├── app.html                # L'APP vera (era index.html, rinominata)
├── css/
│   ├── style.css           # Design system + componenti + identity layer
│   └── discord.css         # Layout 3 colonne + drawer mobile
├── js/
│   ├── data.js             # LOBBIES, CORSI_PIANI, MATERIE_DESC, quiz, flashcard
│   ├── app.js              # Logica app (UI, timer, gruppi, sessioni, note, Focus Pocus)
│   └── firebase-config.js  # Auth + tutte le operazioni Firestore
├── audio/                  # 6 loop ambientali MP3 (usare SEMPRE mp3, i wav non vanno ovunque)
├── icons/                  # Icone PWA (lime con S nera)
├── manifest.json           # PWA — start_url punta ad app.html
├── sw.js                   # Service worker
└── firestore.rules         # Regole di sicurezza (da pubblicare a mano in Console)
```

> ⚠️ La cartella `STUDYO/` dentro il repo è una vecchia copia duplicata: ignorarla.

---

## STACK

- **Frontend:** HTML/CSS/JS vanilla. Nessun framework, nessun build step, nessuna dipendenza npm.
- **Backend:** Firebase (Auth + Firestore), progetto `studyo-4f901`, SDK compat via CDN v10.12.0
- **Hosting:** GitHub Pages. **Deploy = `git push origin main`**
- **Video:** Jitsi Meet embedded (`meet.jit.si`), una stanza per lobby
- **AI Tutor:** modalità base locale + BYOK opzionale (API key Anthropic salvata in localStorage)

### Nota importante sul deploy
La CDN di GitHub Pages impiega **1-3 minuti** a propagare, e `app.js`/`data.js` possono aggiornarsi a ritmi diversi: dopo un deploy può servire **una seconda ricarica**. Per verificare cosa c'è davvero sul server usare una query cache-busting (`?cb=timestamp`).

---

## IDENTITÀ VISIVA

Volutamente **lontana** dal look "template generato da AI" (viola/indigo, gradienti, glow sfocati).

| | |
|---|---|
| Sfondo | `#0A0A0B` nero neutro (nessuna dominante blu/viola) |
| Primario | `#C8F031` **lime elettrico** — testo sopra sempre scuro (`--on-primary`) |
| Secondario | `#FF5A1F` arancio |
| Testo | bianco + grigi neutri (`#A1A1A6`, `#6E6E73`) |
| Display | Bricolage Grotesque |
| Testo | Manrope |

**Regole:** niente gradienti decorativi, niente testo con gradient-clip, niente glow diffusi. Colori pieni, bordi netti, raggi stretti (10/8/6px). C'è un *identity layer* in fondo a `style.css` che sovrascrive i residui: se un colore sembra non cambiare, è probabilmente lì.

---

## DATI E CONTENUTI

- **155 lobby**: università (per area), superiori (per indirizzo), TOLC
- **`CORSI_PIANI`**: 34 corsi di laurea con piano **anno per anno**, ricalcato sui piani reali italiani (L-8, L-18, LMG-01, LM-41…). Triennali 1-3, Giurisprudenza/Farmacia/Veterinaria 1-5, Medicina 1-6.
- **`CORSI_ESAMI`**: derivato automaticamente da `CORSI_PIANI`, con fallback su `CORSI_ESAMI_LEGACY` per i corsi non ancora dettagliati. **Non modificarlo a mano.**
- **`SCUOLE_MATERIE`**: materie per tipo di scuola superiore
- **`MATERIE_DESC`**: 128 descrizioni brevi mostrate sotto il titolo della lobby

---

## FUNZIONALITÀ (tutte attive)

**Real-time (Firestore)**
- Presenza in lobby con heartbeat 45s, considerati attivi entro 2 minuti
- Chat per lobby (`lobbies/{id}/messages`)
- Community e classifica **reali** per ateneo (ordinamento lato client: nessun indice composito da creare)

**Sociale**
- **Gruppi privati**: codice a 6 caratteri + link `?join=CODE`. Un gruppo è una lobby con id `group_<id>`, così riusa presenza/chat/timer/video senza codice duplicato. Nei gruppi **non compaiono mai profili ambiente**.
- **Sessioni programmate**: `sessions`, con promemoria locale 5 minuti prima via Notification API

**Studio**
- Timer Pomodoro con animazione torre, XP, streak reale (giorni consecutivi), sfide giornaliere vere
- Quiz e flashcard con ripetizione spaziata
- **Focus Pocus**: 6 stanze immersive a schermo intero (scene CSS animate + audio + timer)
- Suoni ambientali (6 loop MP3 reali)
- Appunti sul cloud, sincronizzati e condivisibili nella lobby
- Videochiamata Jitsi per lobby
- Ricerca dispense su Studocu precompilata con materia + ateneo

**Gamification:** 6 livelli (Matricola → Leggenda), badge, XP per ogni azione di studio.

---

## FIRESTORE

Collezioni: `users`, `feedbacks`, `presence`, `lobbies/{id}/messages`, `groups`, `sessions`, `notes`.

Le regole stanno in `firestore.rules` e **vanno pubblicate a mano** dalla Console (Firestore → Regole → Pubblica). Chi lavora sul progetto non può farlo via CLI senza credenziali.

Principi: ognuno scrive solo ciò che gli appartiene; gli appunti altrui si leggono solo se `shared == true`; nessuno può cambiare proprietario o codice di un gruppo; default deny su tutto il resto.

---

## COSE APPRESE (da non riscoprire)

1. **Il service worker non deve intercettare i media**: clonare/cachare una risposta audio in streaming blocca la riproduzione (`readyState` fermo a 0). Audio, video e richieste con header `Range` vanno lasciati passare.
2. **Usare MP3, non WAV**: i WAV non vengono riprodotti su alcuni dispositivi.
3. **Il SW non deve intercettare Firebase**: auth e Firestore devono sempre andare in rete.
4. **PowerShell corrompe l'UTF-8**: leggere+riscrivere `app.html` con `Get-Content/Set-Content` distrugge le emoji. Usare strumenti di edit che preservano la codifica.
5. **L'ambiente di test automatico non riproduce audio**: la verifica dei suoni la può fare solo una persona su un dispositivo vero.

---

## TEAM

- **Francesco** — CEO & Product (UNIMORE, Modena)
- **Davide Barbieri** — Co-founder & Growth (UNIMORE)
- **[Cercasi]** — CTO / co-founder tecnico

## STRATEGIA

Nato perché i due fondatori studiavano insieme su Google Meet in silenzio, solo per non sentirsi soli. Obiettivo: il posto fatto apposta per quello. Percorso: UNIMORE → principali atenei italiani → superiori.
