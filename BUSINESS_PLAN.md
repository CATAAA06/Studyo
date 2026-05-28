# STUDYO — Business Plan
### Lo studio diventa multiplayer
**Versione 1.0 — Maggio 2026**

---

## 1. EXECUTIVE SUMMARY

**Studyo** è una piattaforma digitale che trasforma lo studio individuale in un'esperienza sociale e gamificata, ispirata alle dinamiche dei videogiochi multiplayer. Gli studenti entrano in "lobby di studio" tematiche per materia, dove possono studiare insieme in tempo reale, completare quiz, guadagnare XP e competere in classifiche.

**Il problema:** Lo studio universitario e scolastico è spesso un'attività solitaria, demotivante e poco strutturata. Gli studenti mancano di accountability, motivazione e strumenti integrati.

**La soluzione:** Studyo unisce in un'unica piattaforma: studio collaborativo sincrono/asincrono, gamificazione (XP, livelli, badge, streak), strumenti di studio integrati (Pomodoro, flashcard, quiz, suoni ambientali), e community per ateneo/scuola.

**Target:** Studenti universitari e delle scuole superiori in Italia (1.9M universitari + 2.6M studenti superiori), con espansione europea successiva.

**Modello di business:** Freemium con abbonamento premium (Studyo Pro), marketplace di appunti, e partnership B2B con istituti educativi.

**Fase attuale:** MVP funzionante live, con autenticazione reale, database Firebase, e prime validazioni utenti.

---

## 2. IL PROBLEMA

### 2.1 Lo studio è solitario e demotivante
- Il 67% degli studenti universitari studia da solo (Fonte: AlmaLaurea)
- La mancanza di accountability porta a procrastinazione cronica
- Non esiste un "luogo digitale" dedicato allo studio sociale

### 2.2 Strumenti frammentati
Gli studenti usano 5-8 strumenti diversi per studiare:
- Timer (Forest, Focus To-Do)
- Flashcard (Anki, Quizlet)
- Appunti (Notion, Google Docs)
- Comunicazione (WhatsApp, Discord, Meet)
- Musica/suoni (Spotify, mynoise.net)

**Nessuna piattaforma integra tutto questo in un'esperienza unica e gamificata.**

### 2.3 Mancanza di community accademica digitale
- I gruppi WhatsApp sono caotici e non strutturati
- Discord è generico, non progettato per lo studio
- Non esistono classifiche o incentivi per studiare di più

---

## 3. LA SOLUZIONE: STUDYO

### 3.1 Core Features

| Feature | Descrizione |
|---------|-------------|
| **Lobby di Studio** | Stanze tematiche per materia (Analisi 1, Microeconomia, ecc.) con modalità sincrona e asincrona |
| **Gamificazione** | Sistema XP, 6 livelli (Matricola → Leggenda), badge, streak giornalieri, sfide quotidiane |
| **Pomodoro Builder** | Timer Pomodoro con animazione visuale (costruisci una torre mentre studi) |
| **Quiz Arena** | Quiz interattivi per materia con XP reward |
| **Flashcard Spaced** | Sistema di ripetizione spaziata intelligente |
| **Suoni Ambientali** | Generatore di suoni (pioggia, camino, caffetteria, natura, rumore bianco/marrone) |
| **Chat di Lobby** | Comunicazione in tempo reale con i compagni di studio |
| **Community** | Classifica per ateneo/scuola, profili studente, statistiche |

### 3.2 Differenziazione
- **Vs Discord:** Studyo è pensato per studiare, non per giocare. Ogni feature è ottimizzata per la produttività.
- **Vs Forest:** Studyo aggiunge la dimensione sociale e competitiva.
- **Vs Quizlet:** Studyo integra i quiz in un ecosistema gamificato completo.
- **Vs StudyStream:** Studyo non usa video, è più leggero, accessibile e gamificato.

### 3.3 Roadmap Prodotto

**Q3 2026 — MVP+**
- Lobby reali con WebSocket (studio sincrono vero)
- Sistema di upload e condivisione appunti
- Notifiche push e reminder
- Miglioramento AI Tutor con integrazione LLM

**Q4 2026 — Growth**
- App nativa iOS/Android (PWA → React Native)
- Marketplace appunti con sistema di rating
- Integrazione Spotify per playlist di studio
- Sistema di lezioni private (peer tutoring)

**Q1 2027 — Monetizzazione**
- Lancio Studyo Pro (abbonamento premium)
- Partnership con università (B2B)
- Pack di studio premium per materia

**Q2 2027 — Espansione**
- Espansione a mercato europeo (Spagna, Francia, Germania)
- Localizzazione multilingua
- Partnership con editori (Pearson, McGraw-Hill, Zanichelli)

---

## 4. ANALISI DI MERCATO

### 4.1 Mercato Target

**TAM (Total Addressable Market):**
- Mercato EdTech globale: $340B nel 2025, previsto $605B nel 2030 (CAGR 12.2%)
- Mercato EdTech Europa: ~$75B

**SAM (Serviceable Available Market):**
- Studenti Italia: ~4.5M (1.9M universitari + 2.6M superiori)
- Spesa media in tool digitali per studente: ~120 EUR/anno
- SAM Italia: ~540M EUR

**SOM (Serviceable Obtainable Market):**
- Target primo anno: 50.000 utenti attivi
- Conversione premium 5%: 2.500 abbonati
- Revenue target anno 1: ~150.000 EUR

### 4.2 Trend di Mercato
- **Post-COVID:** Gli studenti sono abituati allo studio digitale e cercano alternative al 100% in presenza
- **Gamificazione:** Duolingo ha dimostrato che la gamificazione funziona nell'education (40M+ DAU)
- **Creator Economy:** Gli studenti vogliono monetizzare i propri appunti e competenze
- **AI in Education:** L'integrazione di AI tutor sta diventando uno standard

### 4.3 Analisi Competitiva

| Competitor | Punti di forza | Punti deboli | Studyo vs |
|-----------|---------------|-------------|-----------|
| **Forest** | Brand forte, semplicità | Solo timer, no social | Studyo aggiunge social + gamification completa |
| **Quizlet** | Database quiz enorme | No studio sociale, no timer | Studyo integra quiz + strumenti + community |
| **StudyStream** | Live study rooms | Pesante (video), meno gamificato | Studyo è leggero, gamificato, integrato |
| **Discord** | Community enormi | Non progettato per studio | Studyo è purpose-built per studiare |
| **Notion** | Flessibilità totale | Curva di apprendimento alta, no social | Studyo è immediato e sociale |

---

## 5. MODELLO DI BUSINESS

### 5.1 Revenue Streams

#### A) Freemium → Studyo Pro (B2C)
**Free tier:**
- Accesso a tutte le lobby pubbliche
- Timer Pomodoro + suoni base
- 3 quiz al giorno
- Flashcard base
- Community del proprio ateneo

**Studyo Pro (4.99 EUR/mese | 39.99 EUR/anno):**
- Quiz illimitati
- Flashcard avanzate con AI
- Suoni premium + mix personalizzati
- Statistiche avanzate + analytics studio
- Badge esclusivi + personalizzazione profilo
- Lobby private (crea le tue stanze)
- AI Tutor potenziato
- Nessuna pubblicità

**Studyo Pro Student (2.99 EUR/mese):**
- Prezzo scontato con verifica email .edu/.unimore.it

#### B) Marketplace Appunti
- Gli studenti caricano e vendono appunti verificati
- Commissione piattaforma: 20% su ogni vendita
- Rating system per qualità
- Pack per materia/esame curati dalla community
- **Prezzo dinamico:** discriminazione di prezzo basata su domanda (periodo esami = prezzo più alto)

#### C) Partnership B2B — Istituti
- **Studyo Campus:** Versione white-label per università
- Dashboard analytics per professori/tutor
- Integrazione con LMS esistenti (Moodle, ecc.)
- Pricing: 2-5 EUR/studente/anno (licenza istituzionale)

#### D) Revenue Aggiuntive
- **Lezioni private:** Marketplace peer tutoring (commissione 15%)
- **Pack premium per materia:** Contenuti curati da esperti (9.99 EUR/pack)
- **Sponsorship:** Brand education-friendly (Zanichelli, Pearson, ecc.)
- **Strumenti aggiuntivi:** Marketplace di tool/plugin premium

### 5.2 Proiezioni Finanziarie (3 anni)

| Metrica | Anno 1 | Anno 2 | Anno 3 |
|---------|--------|--------|--------|
| Utenti registrati | 50.000 | 200.000 | 500.000 |
| Utenti attivi mensili (MAU) | 15.000 | 80.000 | 250.000 |
| Abbonati Pro | 750 | 8.000 | 37.500 |
| Revenue abbonamenti | 36K EUR | 384K EUR | 1.8M EUR |
| Revenue marketplace | 5K EUR | 60K EUR | 300K EUR |
| Revenue B2B | 0 | 50K EUR | 400K EUR |
| **Revenue totale** | **41K EUR** | **494K EUR** | **2.5M EUR** |
| Costi operativi | 30K EUR | 250K EUR | 800K EUR |
| **Margine** | **11K EUR** | **244K EUR** | **1.7M EUR** |

### 5.3 Unit Economics (target Anno 2)
- **CAC (Customer Acquisition Cost):** 2-5 EUR (viral + organic)
- **LTV (Lifetime Value) utente Pro:** 48 EUR (12 mesi media)
- **LTV/CAC ratio:** 10-24x (eccellente)
- **Churn mensile target:** < 8%

---

## 6. STRATEGIA GO-TO-MARKET

### 6.1 Fase 1 — Seed (Mesi 1-3)
**Obiettivo: 1.000 utenti attivi**

- **Campus Seeding:** Partire da UNIMORE Modena (home university)
  - Gruppi studio esistenti
  - Rappresentanti di corso
  - Passaparola tra amici e colleghi
- **Social Media:** TikTok + Instagram con contenuti "study with me" gamificati
- **Viralità built-in:** Sistema di inviti con XP bonus (+100 XP per ogni amico invitato)

### 6.2 Fase 2 — Expansion (Mesi 4-8)
**Obiettivo: 20.000 utenti**

- **Multi-campus:** Espansione alle top 10 università italiane
  - Ambassador program: 1 studente per ateneo
  - Competizioni inter-ateneo (classifica università)
- **Content marketing:** Blog/social con tips di studio, metodi efficaci
- **Periodo esami:** Campagne mirate pre-sessione (gennaio, giugno, settembre)
- **Superiori:** Espansione alle scuole superiori con contenuti specifici

### 6.3 Fase 3 — Scale (Mesi 9-18)
**Obiettivo: 100.000+ utenti**

- **PR + Media:** Articoli su testate education/tech italiane
- **Partnership:** Collaborazioni con creator educativi (YouTube, TikTok)
- **B2B pilot:** 2-3 università pilota con Studyo Campus
- **App Store:** Lancio app nativa per aumentare retention

### 6.4 Canali di Acquisizione
| Canale | % acquisizione target | CAC stimato |
|--------|----------------------|-------------|
| Virale/passaparola | 40% | 0 EUR |
| Social media organico | 25% | 0 EUR |
| Ambassador program | 15% | 2 EUR |
| Paid social (Instagram/TikTok) | 10% | 5-8 EUR |
| Partnership/PR | 10% | 1-3 EUR |

---

## 7. TEAM E STRUTTURA

### 7.1 Fondatore
- **[Il tuo nome]** — CEO & Product
  - Studente UNIMORE, Modena
  - Comprensione diretta del problema (è il target)
  - Visione prodotto e strategia

### 7.2 Team Necessario (Fase Seed)
- **1 Co-founder tecnico** — Full-stack developer (React/Node.js/Firebase)
  - Priorità: trovare tra colleghi di Ingegneria Informatica UNIMORE
- **1 Growth/Marketing** — Social media + community management
  - Priorità: studente di Marketing/Comunicazione

### 7.3 Advisory Board (da costruire)
- Professore UNIMORE (credibilità accademica)
- Mentor startup (esperienza imprenditoriale)
- Advisor EdTech (conoscenza mercato)

---

## 8. ASPETTI LEGALI E FINANZIARI

### 8.1 Struttura Societaria
**Fase attuale:** Progetto pre-seed, nessuna struttura formale.

**Prossimi passi:**
1. **SRL Semplificata (SRLS):** Costo ~300-500 EUR, capitale minimo 1 EUR
   - Ideale per startup early-stage in Italia
   - Necessaria per: ricevere investimenti, aprire conto business, partecipare a bandi
2. **Startup Innovativa:** Registrazione come startup innovativa per benefici fiscali
   - Agevolazioni fiscali per investitori (30% detrazione IRPEF)
   - Equity crowdfunding possibile
   - Facilitazioni per assunzioni

### 8.2 Proprietà Intellettuale
- Registrazione marchio "Studyo" (UIBM — Ufficio Italiano Brevetti e Marchi)
- Dominio studyo.it / studyo.app
- Copyright su codice e design

### 8.3 Privacy e GDPR
- Informativa privacy conforme al GDPR
- Consenso esplicito per raccolta dati
- Data Processing Agreement con Firebase/Google Cloud
- DPO (Data Protection Officer) necessario con scale

### 8.4 Fundraising Roadmap

| Round | Timing | Target | Uso fondi |
|-------|--------|--------|-----------|
| **Pre-seed** | Q3 2026 | 20-50K EUR | MVP completo, primi 5K utenti |
| **Seed** | Q1 2027 | 200-500K EUR | Team (3-4 persone), app nativa, marketing |
| **Serie A** | Q1 2028 | 1-3M EUR | Espansione EU, team 10+, B2B |

**Fonti pre-seed:**
- Bandi regionali (Emilia-Romagna Startup)
- Programmi universitari (UNIMORE incubatore)
- Business angel / family & friends
- Crowdfunding (Mamacrowd, CrowdFundMe)

---

## 9. RISCHI E MITIGAZIONE

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|------------|---------|-------------|
| Bassa adozione iniziale | Media | Alto | Focus su 1 campus, viralità built-in, ambassador program |
| Competitor lancia prodotto simile | Media | Medio | First-mover advantage in Italia, community lock-in |
| Difficoltà a trovare co-founder tecnico | Media | Alto | Network UNIMORE, hackathon, community dev |
| Scalabilità tecnica | Bassa | Alto | Architettura cloud-native (Firebase → custom backend) |
| Churn alto | Media | Alto | Gamificazione forte, streak system, social pressure |
| Regolamentazione dati | Bassa | Medio | GDPR compliance from day 1, consulenza legale |

---

## 10. METRICHE CHIAVE (KPI)

### Metriche North Star
- **Weekly Active Users (WAU):** Obiettivo crescita 15% mese su mese
- **Tempo medio di studio per sessione:** Target > 45 minuti

### Metriche di Acquisizione
- Nuovi utenti/settimana
- Tasso di completamento onboarding (> 70%)
- Inviti inviati per utente (target: 2+)

### Metriche di Engagement
- Sessioni per utente/settimana (target: 4+)
- Quiz completati/settimana
- Streak media (target: 5+ giorni)

### Metriche di Revenue
- Conversion rate free → pro (target: 5%)
- MRR (Monthly Recurring Revenue)
- Churn rate (target: < 8%)

---

## 11. PERCHE ADESSO

1. **Post-COVID:** La generazione attuale di studenti è digital-native e cerca soluzioni online
2. **Gamificazione proven:** Duolingo (valutazione $6.5B) ha dimostrato il modello nell'education
3. **AI revolution:** L'integrazione AI rende possibile tutor personalizzati a costo marginale zero
4. **Mercato italiano vuoto:** Non esiste un competitor italiano dominante nello studio gamificato
5. **Timing universitario:** Il fondatore è studente, comprende profondamente il problema e ha accesso diretto al mercato target

---

## 12. RICHIESTA

**Cerchiamo:**
- Co-founder tecnico (equity 20-30%)
- Pre-seed funding: 20-50K EUR
- Mentorship da ecosistema startup Emilia-Romagna

**Offriamo:**
- MVP funzionante e validato
- Mercato da 540M EUR solo in Italia
- Team con comprensione profonda del problema
- Modello di business con multiple revenue stream
- Potenziale di scaling europeo

---

*Studyo — Perché studiare da soli è noioso.*

**Contatti:**
- Web: https://cataaa06.github.io/Studyo/
- GitHub: https://github.com/CATAAA06/Studyo
- Email: [la tua email]
