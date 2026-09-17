/* =============================================
   STUDYO — CONTENUTI DI STUDIO (quiz e flashcard)
   =============================================
   Prima i contenuti stavano solo in js/data.js: aggiungere una domanda
   voleva dire pubblicare il sito. Ora:

     Firestore  content/{materia}  →  { quiz: [...], cards: [...] }
        ↓ (copia locale per l'offline e per non rileggere ogni volta)
     localStorage studyo_content_<materia>
        ↓ (riserva sempre disponibile, anche senza account)
     js/data.js  QUIZZES / FLASHCARDS

   Chi può scrivere: solo gli account con isAdmin = true nel proprio
   documento users (si imposta a mano dalla Console Firebase).
   ============================================= */

const CONTENT_CACHE_PREFIX = 'studyo_content_';
const CONTENT_CACHE_TTL = 12 * 60 * 60 * 1000;   // 12 ore
const CONTENT_LIMITS = { quiz: 50, cards: 80, text: 400, option: 200, explain: 500 };

// Contenuti in memoria per la sessione: { quiz: [], cards: [] }
const contentCache = {};

function contentCacheKey(lobbyId) { return CONTENT_CACHE_PREFIX + lobbyId; }

function readContentCache(lobbyId) {
    try {
        const raw = localStorage.getItem(contentCacheKey(lobbyId));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return null;
        return parsed;   // { at, quiz, cards }
    } catch (e) { return null; }
}

function writeContentCache(lobbyId, data) {
    try {
        localStorage.setItem(contentCacheKey(lobbyId), JSON.stringify({ at: Date.now(), quiz: data.quiz, cards: data.cards }));
    } catch (e) { /* spazio esaurito: pazienza, si rilegge dal cloud */ }
}

function baseQuiz(lobbyId) {
    return (typeof QUIZZES !== 'undefined' && Array.isArray(QUIZZES[lobbyId])) ? QUIZZES[lobbyId] : [];
}
function baseCards(lobbyId) {
    return (typeof FLASHCARDS !== 'undefined' && Array.isArray(FLASHCARDS[lobbyId])) ? FLASHCARDS[lobbyId] : [];
}

// Validazione: scarta tutto ciò che non ha la forma giusta, senza far esplodere la UI
function cleanQuiz(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(q =>
        q && typeof q.question === 'string' && q.question.trim() &&
        Array.isArray(q.options) && q.options.length >= 2 && q.options.length <= 6 &&
        q.options.every(o => typeof o === 'string' && o.trim()) &&
        Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length
    ).slice(0, CONTENT_LIMITS.quiz).map(q => ({
        question: q.question.trim().slice(0, CONTENT_LIMITS.text),
        options: q.options.map(o => o.trim().slice(0, CONTENT_LIMITS.option)),
        correct: q.correct,
        explain: typeof q.explain === 'string' ? q.explain.trim().slice(0, CONTENT_LIMITS.explain) : ''
    }));
}

function cleanCards(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(c =>
        c && typeof c.front === 'string' && c.front.trim() &&
        typeof c.back === 'string' && c.back.trim()
    ).slice(0, CONTENT_LIMITS.cards).map(c => ({
        front: c.front.trim().slice(0, CONTENT_LIMITS.text),
        back: c.back.trim().slice(0, CONTENT_LIMITS.text)
    }));
}

/* Carica i contenuti di una materia. Non blocca mai la UI:
   torna subito la riserva locale e aggiorna dal cloud quando arriva. */
async function ensureContent(lobbyId) {
    if (!lobbyId) return { quiz: [], cards: [] };
    if (contentCache[lobbyId]) return contentCache[lobbyId];

    // 1) riserva immediata: cache locale, altrimenti data.js
    const cached = readContentCache(lobbyId);
    const fallback = {
        quiz: cached ? cleanQuiz(cached.quiz) : baseQuiz(lobbyId),
        cards: cached ? cleanCards(cached.cards) : baseCards(lobbyId)
    };
    if (!fallback.quiz.length) fallback.quiz = baseQuiz(lobbyId);
    if (!fallback.cards.length) fallback.cards = baseCards(lobbyId);
    contentCache[lobbyId] = fallback;

    const fresh = cached && (Date.now() - (cached.at || 0) < CONTENT_CACHE_TTL);
    if (fresh || typeof loadContentDoc !== 'function' || !state.firebaseUid) return contentCache[lobbyId];

    // 2) aggiornamento dal cloud (se fallisce resta la riserva)
    const remote = await loadContentDoc(lobbyId);
    if (remote) {
        const merged = {
            quiz: cleanQuiz(remote.quiz).length ? cleanQuiz(remote.quiz) : baseQuiz(lobbyId),
            cards: cleanCards(remote.cards).length ? cleanCards(remote.cards) : baseCards(lobbyId)
        };
        contentCache[lobbyId] = merged;
        writeContentCache(lobbyId, merged);
    }
    return contentCache[lobbyId];
}

// Versione sincrona: quello che abbiamo adesso, senza aspettare la rete
function contentNow(lobbyId) {
    return contentCache[lobbyId] || { quiz: baseQuiz(lobbyId), cards: baseCards(lobbyId) };
}

function getQuiz(lobbyId) { return contentNow(lobbyId).quiz; }
function getCards(lobbyId) { return contentNow(lobbyId).cards; }

/* =============================================
   EDITOR (solo amministratori)
   ============================================= */

let editorDraft = { quiz: [], cards: [] };

function isContentAdmin() {
    return !!state.isAdmin && !state.guest;
}

function openContentEditor() {
    if (!isContentAdmin()) return;
    const lobby = resolveLobby(state.currentLobby);
    if (!lobby) return;
    const current = contentNow(lobby.id);
    editorDraft = {
        quiz: current.quiz.map(q => ({ ...q, options: [...q.options] })),
        cards: current.cards.map(c => ({ ...c }))
    };
    document.getElementById('editor-subject').textContent = lobby.name;
    renderContentEditor();
    setLobbyTab('materiali');
    openModal('editor');
}

function renderContentEditor() {
    const cardsBox = document.getElementById('editor-cards');
    const quizBox = document.getElementById('editor-quiz');
    if (!cardsBox || !quizBox) return;

    cardsBox.innerHTML = editorDraft.cards.map((c, i) => `
        <div class="ed-item">
            <div class="ed-item-head"><span>Carta ${i + 1}</span>
                <button type="button" class="icon-btn" onclick="editorRemoveCard(${i})" aria-label="Elimina carta ${i + 1}">
                    <svg class="ic ic-sm" aria-hidden="true"><use href="#i-x"/></svg>
                </button>
            </div>
            <label class="sr-only" for="ed-card-front-${i}">Fronte della carta ${i + 1}</label>
            <input id="ed-card-front-${i}" type="text" maxlength="400" placeholder="Domanda o concetto" value="${escapeHTML(c.front)}" oninput="editorSet('cards', ${i}, 'front', this.value)">
            <label class="sr-only" for="ed-card-back-${i}">Retro della carta ${i + 1}</label>
            <input id="ed-card-back-${i}" type="text" maxlength="400" placeholder="Risposta" value="${escapeHTML(c.back)}" oninput="editorSet('cards', ${i}, 'back', this.value)">
        </div>`).join('') || '<p class="muted-line">Nessuna flashcard per questa materia.</p>';

    quizBox.innerHTML = editorDraft.quiz.map((q, i) => `
        <div class="ed-item">
            <div class="ed-item-head"><span>Domanda ${i + 1}</span>
                <button type="button" class="icon-btn" onclick="editorRemoveQuiz(${i})" aria-label="Elimina domanda ${i + 1}">
                    <svg class="ic ic-sm" aria-hidden="true"><use href="#i-x"/></svg>
                </button>
            </div>
            <label class="sr-only" for="ed-q-${i}">Testo della domanda ${i + 1}</label>
            <input id="ed-q-${i}" type="text" maxlength="400" placeholder="Domanda" value="${escapeHTML(q.question)}" oninput="editorSet('quiz', ${i}, 'question', this.value)">
            <fieldset class="ed-options">
                <legend>Risposte (segna quella giusta)</legend>
                ${q.options.map((o, j) => `
                    <div class="ed-option">
                        <input type="radio" id="ed-correct-${i}-${j}" name="ed-correct-${i}" ${q.correct === j ? 'checked' : ''} onchange="editorSetCorrect(${i}, ${j})">
                        <label class="sr-only" for="ed-correct-${i}-${j}">Risposta ${j + 1} corretta</label>
                        <input type="text" maxlength="200" aria-label="Testo risposta ${j + 1}" placeholder="Risposta ${j + 1}" value="${escapeHTML(o)}" oninput="editorSetOption(${i}, ${j}, this.value)">
                    </div>`).join('')}
            </fieldset>
            <label class="sr-only" for="ed-explain-${i}">Spiegazione della domanda ${i + 1}</label>
            <input id="ed-explain-${i}" type="text" maxlength="500" placeholder="Spiegazione (facoltativa, si vede dopo la risposta)" value="${escapeHTML(q.explain || '')}" oninput="editorSet('quiz', ${i}, 'explain', this.value)">
        </div>`).join('') || '<p class="muted-line">Nessuna domanda per questa materia.</p>';

    document.getElementById('editor-count').textContent =
        `${editorDraft.cards.length} flashcard · ${editorDraft.quiz.length} domande`;
}

function editorSet(kind, index, field, value) {
    if (editorDraft[kind] && editorDraft[kind][index]) editorDraft[kind][index][field] = value;
}
function editorSetOption(index, optIndex, value) {
    if (editorDraft.quiz[index]) editorDraft.quiz[index].options[optIndex] = value;
}
function editorSetCorrect(index, optIndex) {
    if (editorDraft.quiz[index]) editorDraft.quiz[index].correct = optIndex;
}
function editorAddCard() {
    if (editorDraft.cards.length >= CONTENT_LIMITS.cards) { showNotification(`Massimo ${CONTENT_LIMITS.cards} flashcard per materia.`); return; }
    editorDraft.cards.push({ front: '', back: '' });
    renderContentEditor();
}
function editorAddQuiz() {
    if (editorDraft.quiz.length >= CONTENT_LIMITS.quiz) { showNotification(`Massimo ${CONTENT_LIMITS.quiz} domande per materia.`); return; }
    editorDraft.quiz.push({ question: '', options: ['', '', '', ''], correct: 0, explain: '' });
    renderContentEditor();
}
function editorRemoveCard(i) { editorDraft.cards.splice(i, 1); renderContentEditor(); }
function editorRemoveQuiz(i) { editorDraft.quiz.splice(i, 1); renderContentEditor(); }

async function saveContentEditor() {
    const lobbyId = state.currentLobby;
    if (!lobbyId || !isContentAdmin()) return;

    const quiz = cleanQuiz(editorDraft.quiz);
    const cards = cleanCards(editorDraft.cards);
    const droppedQuiz = editorDraft.quiz.length - quiz.length;
    const droppedCards = editorDraft.cards.length - cards.length;

    const ok = await saveContentDoc(lobbyId, { quiz, cards });
    if (!ok) { showNotification('Salvataggio non riuscito: controlla di essere amministratore.'); return; }

    contentCache[lobbyId] = { quiz: quiz.length ? quiz : baseQuiz(lobbyId), cards: cards.length ? cards : baseCards(lobbyId) };
    writeContentCache(lobbyId, contentCache[lobbyId]);
    closeModal('editor');
    const skipped = droppedQuiz + droppedCards;
    showNotification(skipped
        ? `Contenuti salvati. ${skipped} voci incomplete non sono state salvate.`
        : 'Contenuti salvati: li vedono tutti gli studenti.');
    resetQuizArea();
}

// Il pulsante dell'editor compare solo agli amministratori
function refreshAdminUI() {
    const btn = document.getElementById('editor-open-btn');
    if (btn) btn.hidden = !isContentAdmin();
}
