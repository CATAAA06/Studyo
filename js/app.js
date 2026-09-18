/* =============================================
   STUDYO — App Logic
   ============================================= */

/* Il codice d'invito va messo al sicuro SUBITO, prima di qualsiasi login:
   l'accesso Google può passare da un redirect che cancella la query string. */
(function captureInvite() {
    try {
        const c = new URLSearchParams(location.search).get('join');
        if (c) localStorage.setItem('studyo_pending_join', c.trim().toUpperCase());
    } catch (e) {}
})();

// Browser interni delle app (WhatsApp, Instagram, Facebook…): isolano lo
// storage e il login Google non riesce a completarsi.
function isInAppBrowser() {
    const ua = navigator.userAgent || '';
    return /FBAN|FBAV|FB_IAB|Instagram|Line\/|Snapchat|Twitter|WhatsApp|; wv\)/i.test(ua);
}

let state = {
    currentPage: 'home',
    currentLobby: null,
    playerName: '',
    playerSchool: 'universita',
    playerUni: '',
    playerScuola: '',
    playerCorso: '',
    playerTipoScuola: '',
    playerClasse: '',
    firebaseUid: null,
    firebaseEmail: '',
    xp: 0,
    streak: 0,
    level: 1,
    studyHours: 0,
    quizzesCompleted: 0,
    pomodorosCompleted: 0,
    timer: null,
    timerRunning: false,
    timerSeconds: 25 * 60,
    timerTotal: 25 * 60,
    currentQuiz: null,
    currentQuizIndex: 0,
    quizScore: 0,
    flashcardIndex: 0,
    flashcardFlipped: false,
    setupDone: false,
    activeSounds: {},
    masterVolume: 0.65,
    soundsMuted: false,
    lastStudyDay: null,
};

function loadState() {
    const saved = localStorage.getItem('studyo_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
        state.timer = null;
        state.timerRunning = false;
        // Audio can't resume without a user gesture → start each session clean
        state.activeSounds = {};
        state.soundsMuted = false;
    }
}

function saveState() {
    const toSave = { ...state };
    toSave.timer = null;
    localStorage.setItem('studyo_state', JSON.stringify(toSave));
}

/* =============================================
   DATE & STREAK HELPERS
   ============================================= */

// Data LOCALE (YYYY-MM-DD). Prima era in UTC: in Italia chi studiava tra
// mezzanotte e le 2 finiva nel giorno precedente e la streak si rompeva.
function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function dayDiff(a, b) {
    // whole days between date-strings a and b (b - a)
    const da = new Date(a + 'T00:00:00');
    const db = new Date(b + 'T00:00:00');
    return Math.round((db - da) / 86400000);
}

// Call this whenever the user does real study (pomodoro / quiz).
// Keeps the consecutive-day streak honest.
function registerStudyDay() {
    const today = todayStr();
    const last = state.lastStudyDay;

    if (last === today) return; // already counted today

    if (last && dayDiff(last, today) === 1) {
        state.streak = (state.streak || 0) + 1; // consecutive day
        showNotification(`🔥 Streak ${state.streak} giorni! Continua così.`);
    } else {
        state.streak = 1; // first day or streak broken → restart at 1
    }
    state.lastStudyDay = today;
    saveState();
    updateNav();
    // La data dell'ultimo studio va anche online, altrimenti su un altro dispositivo
    // (o dopo un logout) la streak ripartirebbe da 1
    if (typeof saveUserToFirestore === 'function') saveUserToFirestore();
}

// Al login: tra i dati locali e quelli dell'account vale l'ultimo giorno di studio più recente
function mergeStreak(remoteStreak, remoteLastDay) {
    const localDay = state.lastStudyDay;
    const localStreak = state.streak || 0;
    const rStreak = remoteStreak || 0;

    if (remoteLastDay && (!localDay || remoteLastDay > localDay)) {
        state.lastStudyDay = remoteLastDay;
        state.streak = rStreak;
    } else if (remoteLastDay && localDay === remoteLastDay) {
        state.streak = Math.max(localStreak, rStreak);
    } else if (!remoteLastDay && !localDay) {
        state.streak = rStreak;           // account vecchio senza data: teniamo il valore salvato
    }
    // se il dato locale è più recente (es. sessione fatta prima di accedere) resta quello

    reconcileStreak();
    saveState();
}

// On load: if the user skipped one or more full days, the streak is broken.
function reconcileStreak() {
    const today = todayStr();
    const last = state.lastStudyDay;
    if (last && dayDiff(last, today) > 1) {
        state.streak = 0; // broken — they'll restart at 1 on next study
        saveState();
    }
}

/* =============================================
   STABLE "ONLINE" COUNTS (no jitter on re-render)
   ============================================= */

// Deterministic pseudo-random from a string seed, refreshed each session.
const _sessionSalt = (() => {
    let s = sessionStorage.getItem('studyo_session_salt');
    if (!s) { s = String(Math.floor(Math.random() * 100000)); sessionStorage.setItem('studyo_session_salt', s); }
    return s;
})();

function _hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
}

/* Conteggio REALE delle persone presenti per lobby.
   Popolato da un listener sulla collezione "presence": mostrare numeri
   inventati quando una stanza è vuota sarebbe una pratica ingannevole. */
let presenceCounts = {};

function lobbyOnline(lobby) {
    if (!lobby) return 0;
    return presenceCounts[lobby.id] || 0;
}

/* =============================================
   DAILY CHALLENGE STATS
   ============================================= */

function getDailyStats() {
    const today = todayStr();
    const key = 'studyo_daily_' + today;
    let stats = { pomodoros: 0, quizzes: 0, messages: 0, minutes: 0 };
    try {
        const saved = JSON.parse(localStorage.getItem(key) || 'null');
        if (saved) stats = { ...stats, ...saved };
    } catch (e) {}
    return stats;
}

function bumpDailyStat(field, amount = 1) {
    const today = todayStr();
    const key = 'studyo_daily_' + today;
    const stats = getDailyStats();
    stats[field] = (stats[field] || 0) + amount;
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
}

/* =============================================
   NAVIGATION
   ============================================= */

function navigate(page, data) {
    // Una materia che non esiste più (es. gruppo abbandonato) riporta alla home
    if (page === 'lobby' && !resolveLobby(data)) page = 'home';

    // Leaving the lobby page → stop presence + chat listeners
    const switchingLobby = page === 'lobby' && data && data !== state.currentLobby;
    if (state.currentPage === 'lobby' && (page !== 'lobby' || switchingLobby)) {
        if (typeof leaveLobby === 'function') leaveLobby();
        if (page !== 'lobby') state.currentLobby = null;
    }

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    state.currentPage = page;
    closeInlinePanelsOutside(page);

    if (page === 'home') {
        document.getElementById('page-home').classList.add('active');
        renderHome();
        renderSidebarGroups();
    } else if (page === 'materie') {
        document.getElementById('page-materie').classList.add('active');
        renderLobbies(currentLobbyFilter);
    } else if (page === 'insieme') {
        document.getElementById('page-insieme').classList.add('active');
        renderSidebarGroups();
        renderSessions();
        renderCommunity();
    } else if (page === 'lobby') {
        document.getElementById('page-lobby').classList.add('active');
        openLobby(data);
        renderSidebarGroups();
    } else if (page === 'profile') {
        document.getElementById('page-profile').classList.add('active');
        renderProfile();
    }

    closeMobileSidebar();
    if (page !== 'lobby') closeLobbySheet();

    // Voce attiva in sidebar e barra in basso (la materia rientra in "Materie")
    const navKey = page === 'lobby' ? 'materie' : page;
    document.querySelectorAll('[data-nav]').forEach(el => {
        const on = el.dataset.nav === navKey;
        el.classList.toggle('active', on);
        if (on) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    });

    const chatFab = document.getElementById('chat-fab');
    if (chatFab) chatFab.hidden = page !== 'lobby';

    renderNavSubjects();
    updateNav();
    updateMiniTimer();
    window.scrollTo(0, 0);
}

function updateNav() {
    const sidebarName = document.getElementById('sidebar-name');
    const sidebarXp = document.getElementById('sidebar-xp');
    const welcomeName = document.getElementById('main-welcome-name');
    const uniIcon = document.getElementById('server-uni-icon');

    if (sidebarName) sidebarName.textContent = state.playerName || 'Studente';
    if (sidebarXp) sidebarXp.textContent = `${state.xp} XP · Livello ${getCurrentLevel().level}`;
    if (welcomeName) welcomeName.textContent = state.playerName || 'Studente';

    const menuName = document.getElementById('avatar-menu-name');
    if (menuName) menuName.textContent = state.playerName || 'Studente';
    const streakNum = document.getElementById('topbar-streak-num');
    renderTopbarStreak();
    renderEmptyStates();
    applyGuestUI();
    const homeDate = document.getElementById('home-date');
    if (homeDate) {
        const d = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
        homeDate.textContent = d.charAt(0).toUpperCase() + d.slice(1);
    }

    if (uniIcon && (state.playerUni || state.playerScuola)) {
        uniIcon.style.display = 'flex';
        uniIcon.title = state.playerUni || state.playerScuola;
    }

    // Home stats
    const homeXp = document.getElementById('home-xp');
    const homeStreak = document.getElementById('home-streak');
    const homeQuizzes = document.getElementById('home-quizzes');
    const homePomodoros = document.getElementById('home-pomodoros');
    if (homeXp) homeXp.textContent = state.xp;
    if (homeStreak) homeStreak.textContent = effectiveStreak();
    if (homeQuizzes) homeQuizzes.textContent = state.quizzesCompleted;
    if (homePomodoros) homePomodoros.textContent = state.pomodorosCompleted;
}

/* =============================================
   EMAIL LOGIN
   ============================================= */

// Il consenso deve essere un'azione esplicita dell'utente, non una casella
// già spuntata: vale sia per Google sia per email.
function hasAcceptedTerms() {
    const cb = document.getElementById('consent-terms');
    if (cb && !cb.checked) {
        showNotification('Per continuare accetta i Termini e conferma di avere almeno 14 anni.');
        const box = document.querySelector('.consent-box');
        if (box) {
            box.classList.add('consent-missing');
            setTimeout(() => box.classList.remove('consent-missing'), 2000);
        }
        return false;
    }
    return true;
}

function loginWithEmail() {
    if (!hasAcceptedTerms()) return;

    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;

    if (!email) {
        document.getElementById('auth-email').style.borderColor = '#E17055';
        return;
    }
    if (!password || password.length < 6) {
        document.getElementById('auth-password').style.borderColor = '#E17055';
        showNotification('La password deve avere almeno 6 caratteri.');
        return;
    }

    signInWithEmail(email, password);
}

/* =============================================
   SETUP
   ============================================= */

function toggleSchoolField() {
    const val = document.getElementById('setup-school').value;
    document.getElementById('setup-uni-group').style.display = val === 'universita' ? 'block' : 'none';
    document.getElementById('setup-scuola-group').style.display = val === 'superiori' ? 'block' : 'none';
}

// La registrazione chiede solo ciò che serve a mostrare le materie giuste:
// nome e corso (o tipo di scuola). Ateneo, scuola e classe si aggiungono dal Profilo.
function setupFieldError(fieldId, message) {
    const err = document.getElementById('setup-error');
    const field = document.getElementById(fieldId);
    if (err) { err.textContent = message; err.hidden = false; }
    if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); }
}

function completeSetup() {
    ['setup-name', 'setup-corso', 'setup-tipo-scuola'].forEach(id => {
        const f = document.getElementById(id);
        if (f) f.removeAttribute('aria-invalid');
    });
    const err = document.getElementById('setup-error');
    if (err) err.hidden = true;

    const name = document.getElementById('setup-name').value.trim().slice(0, 40);
    if (!name) { setupFieldError('setup-name', 'Scrivi come ti chiami: è il nome che vedono gli altri nelle stanze.'); return; }

    const school = document.getElementById('setup-school').value;
    const corso = document.getElementById('setup-corso').value;
    const tipo = document.getElementById('setup-tipo-scuola').value;
    if (school === 'universita' && !corso) { setupFieldError('setup-corso', 'Scegli il tuo corso: serve a mostrarti gli esami giusti.'); return; }
    if (school === 'superiori' && !tipo) { setupFieldError('setup-tipo-scuola', 'Scegli la tua scuola: serve a mostrarti le materie giuste.'); return; }

    state.playerName = name;
    state.playerSchool = school;

    if (state.playerSchool === 'universita') {
        state.playerCorso = corso;
    } else {
        state.playerTipoScuola = tipo;
    }

    state.setupDone = true;
    if (!hasStudied()) state.streak = 0;   // la streak parte dal primo giorno di studio vero, non dalla registrazione

    closeModal('setup');
    saveState();

    // Un nuovo utente può arrivare da un link d'invito
    if (typeof refreshGroups === 'function') refreshGroups();
    if (typeof handleJoinFromUrl === 'function') setTimeout(handleJoinFromUrl, 600);

    // Save to Firestore
    if (typeof saveUserToFirestore === 'function') {
        saveUserToFirestore();
    }

    updateNav();
    renderLobbies();
    renderCommunity();
    renderHome();

    addXP(50, 'Benvenuto su Studyo!');

    // Niente tour a slide: in home compare la scheda "Primi passi" con azioni vere

    // Il feedback si chiede dal badge "Beta" sempre visibile: niente popup a sorpresa
}

/* =============================================
   LOBBIES
   ============================================= */

// Track which sidebar sections are collapsed (persisted in sessionStorage)
let collapsedSections = JSON.parse(sessionStorage.getItem('studyo_collapsed') || '{}');

function toggleSidebarSection(sectionId) {
    collapsedSections[sectionId] = !collapsedSections[sectionId];
    sessionStorage.setItem('studyo_collapsed', JSON.stringify(collapsedSections));
    const content = document.getElementById('section-' + sectionId);
    const arrow = document.getElementById('arrow-' + sectionId);
    if (content) {
        content.classList.toggle('collapsed', collapsedSections[sectionId]);
    }
    if (arrow) {
        arrow.textContent = collapsedSections[sectionId] ? '▶' : '▼';
        const btn = arrow.closest('button');
        if (btn) btn.setAttribute('aria-expanded', String(!collapsedSections[sectionId]));
    }
}

function renderSectionHeader(id, emoji, label, count) {
    const isCollapsed = collapsedSections[id] || false;
    return `
        <button class="sidebar-section-toggle" onclick="toggleSidebarSection('${id}')" aria-expanded="${!isCollapsed}" aria-controls="section-${id}">
            <span class="sidebar-section-arrow" id="arrow-${id}" aria-hidden="true">${isCollapsed ? '▶' : '▼'}</span>
            <span class="sidebar-section-emoji">${emoji}</span>
            <span class="sidebar-section-label">${label}</span>
            <span class="sidebar-section-count">${count}</span>
        </button>
        <div class="sidebar-section-content ${isCollapsed ? 'collapsed' : ''}" id="section-${id}">
    `;
}

const YEAR_EMOJI = { 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣' };

// "I tuoi esami": se il corso ha un piano di studi anno per anno,
// mostra una sezione per ogni anno; altrimenti una sezione unica.
function renderMieiEsami(mieiIds, headerLabel, headerEmoji) {
    const piano = (state.playerSchool === 'universita' && state.playerCorso
                   && typeof CORSI_PIANI !== 'undefined')
                   ? CORSI_PIANI[state.playerCorso] : null;

    if (!piano) {
        const lobbies = LOBBIES.filter(l => mieiIds.includes(l.id));
        let out = renderSectionHeader('miei', headerEmoji, headerLabel, lobbies.length);
        out += lobbies.map(l => renderLobbyItem(l)).join('');
        out += '</div>';
        return out;
    }

    let out = '';
    Object.keys(piano).sort().forEach(anno => {
        const ids = piano[anno];
        const lobbies = ids.map(id => LOBBIES.find(l => l.id === id)).filter(Boolean);
        if (!lobbies.length) return;
        out += renderSectionHeader('anno' + anno, YEAR_EMOJI[anno] || '📘', anno + '° anno', lobbies.length);
        out += lobbies.map(l => renderLobbyItem(l)).join('');
        out += '</div>';
    });
    return out;
}

/* --- Ricerca tra le materie --- */
let lobbySearchQuery = '';

function searchLobbies(q) {
    lobbySearchQuery = (q || '').trim();
    const clear = document.getElementById('lobby-search-clear');
    if (clear) clear.style.display = lobbySearchQuery ? 'block' : 'none';
    renderLobbies(currentLobbyFilter);
}

function clearLobbySearch() {
    const input = document.getElementById('lobby-search');
    if (input) input.value = '';
    searchLobbies('');
}

// Confronto senza accenti e maiuscole, così "analisi" trova "Analisi Matematica"
function normalizeText(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function renderSearchResults(sidebarEl) {
    const q = normalizeText(lobbySearchQuery);
    const found = LOBBIES.filter(l => normalizeText(l.name).includes(q));

    if (!found.length) {
        sidebarEl.innerHTML = `<div class="lobby-search-empty">
            Nessuna materia trovata per “${escapeHTML(lobbySearchQuery)}”.
        </div>`;
        return;
    }

    const CAT_LABEL = {
        scientifica: 'Scientifica', economia: 'Economia', giuridica: 'Giuridica',
        umanistica: 'Umanistica', medicina: 'Medicina', superiori: 'Superiori', tolc: 'TOLC'
    };

    sidebarEl.innerHTML =
        `<div class="lobby-search-count">${found.length} ${found.length === 1 ? 'risultato' : 'risultati'}</div>` +
        found.slice(0, 40).map(l => `
            <button class="sidebar-lobby" onclick="navigate('lobby','${l.id}')">
                <span class="sidebar-lobby-icon" aria-hidden="true">${l.icon}</span>
                <span class="sidebar-lobby-name">${l.name}</span>
                <span class="sidebar-lobby-cat">${CAT_LABEL[l.category] || ''}</span>
            </button>
        `).join('');
}

let currentLobbyFilter = 'all';

function renderLobbies(filter = 'all') {
    currentLobbyFilter = filter;
    const sidebarEl = document.getElementById('sidebar-lobbies');
    if (!sidebarEl) return;

    // Con una ricerca attiva mostro i risultati piatti, senza sezioni
    if (lobbySearchQuery) {
        updateFilterBar();
        renderSearchResults(sidebarEl);
        return;
    }

    const isUni = state.playerSchool === 'universita';
    const isSuperiori = state.playerSchool === 'superiori';
    const is5anno = state.playerClasse === '5';

    // Determine user's personal lobbies
    let mieiIds = [];
    let mieiLabel = '';
    if (isUni && state.playerCorso && CORSI_ESAMI[state.playerCorso]) {
        mieiIds = CORSI_ESAMI[state.playerCorso];
        mieiLabel = state.playerCorso;
    } else if (isSuperiori && state.playerTipoScuola && typeof SCUOLE_MATERIE !== 'undefined' && SCUOLE_MATERIE[state.playerTipoScuola]) {
        mieiIds = SCUOLE_MATERIE[state.playerTipoScuola];
        mieiLabel = state.playerTipoScuola;
    }

    // Show/hide "I miei esami" filter button
    const filterMiei = document.getElementById('filter-miei');
    if (filterMiei) {
        filterMiei.style.display = mieiIds.length > 0 ? 'block' : 'none';
        filterMiei.textContent = isSuperiori ? '🎓 Le mie materie' : '🎓 I miei esami';
    }

    // Update filter bar visibility based on user type
    updateFilterBar();

    let html = '';

    // Category display config
    const CATEGORY_META = {
        scientifica: { emoji: '🔬', label: 'Scientifica' },
        economia: { emoji: '📊', label: 'Economia' },
        giuridica: { emoji: '⚖️', label: 'Giuridica' },
        umanistica: { emoji: '📖', label: 'Umanistica' },
        medicina: { emoji: '🏥', label: 'Medicina' },
        superiori: { emoji: '🏫', label: 'Superiori' },
        tolc: { emoji: '🎯', label: 'TOLC' },
        trasversale: { emoji: '🌍', label: 'Trasversali' }
    };

    // Helper: group lobbies by category and render
    function renderGrouped(lobbies) {
        let out = '';
        const grouped = {};
        lobbies.forEach(l => {
            if (!grouped[l.category]) grouped[l.category] = [];
            grouped[l.category].push(l);
        });
        for (const cat of Object.keys(grouped)) {
            const meta = CATEGORY_META[cat] || { emoji: '📁', label: cat };
            out += renderSectionHeader(cat, meta.emoji, meta.label, grouped[cat].length);
            out += grouped[cat].map(lobby => renderLobbyItem(lobby)).join('');
            out += '</div>';
        }
        return out;
    }

    // Determine which lobbies are relevant to this user type
    function getRelevantLobbies() {
        if (isSuperiori) {
            // Superiori users see: superiori lobbies + TOLC (if 5th year) — NOT uni lobbies by default
            let relevant = LOBBIES.filter(l => l.category === 'superiori');
            if (is5anno) {
                relevant = relevant.concat(LOBBIES.filter(l => l.category === 'tolc'));
            }
            return relevant;
        } else {
            // Uni users see: uni lobbies (not superiori or tolc by default)
            return LOBBIES.filter(l => l.category !== 'superiori' && l.category !== 'tolc');
        }
    }

    if (filter === 'miei' && mieiIds.length > 0) {
        const relevant = getRelevantLobbies();
        const altreLobbies = relevant.filter(l => !mieiIds.includes(l.id));

        const headerEmoji = isSuperiori ? '🏫' : '📚';
        html += renderMieiEsami(mieiIds, mieiLabel, headerEmoji);

        if (altreLobbies.length > 0) {
            html += renderGrouped(altreLobbies);
        }
    } else if (filter === 'all') {
        const relevant = getRelevantLobbies();

        if (mieiIds.length > 0) {
            const altreLobbies = relevant.filter(l => !mieiIds.includes(l.id));

            const headerEmoji = isSuperiori ? '🏫' : '📚';
            const headerLabel = isSuperiori ? 'Le tue materie' : 'I tuoi esami';
            html += renderMieiEsami(mieiIds, headerLabel, headerEmoji);

            if (altreLobbies.length > 0) {
                html += renderGrouped(altreLobbies);
            }
        } else {
            html += renderGrouped(relevant);
        }
    } else if (filter === 'tolc') {
        const tolcLobbies = LOBBIES.filter(l => l.category === 'tolc');
        html += renderSectionHeader('tolc', '🎯', 'TOLC', tolcLobbies.length);
        html += tolcLobbies.map(lobby => renderLobbyItem(lobby)).join('');
        html += '</div>';
    } else if (filter === 'superiori') {
        const supLobbies = LOBBIES.filter(l => l.category === 'superiori');
        html += renderSectionHeader('superiori', '🏫', 'Superiori', supLobbies.length);
        html += supLobbies.map(lobby => renderLobbyItem(lobby)).join('');
        html += '</div>';
    } else {
        // Standard category filter (scientifica, economia, etc.)
        const filtered = LOBBIES.filter(l => l.category === filter);
        const meta = CATEGORY_META[filter] || { emoji: '📁', label: filter };
        html += renderSectionHeader(filter, meta.emoji, meta.label, filtered.length);
        html += filtered.map(lobby => renderLobbyItem(lobby)).join('');
        html += '</div>';
    }

    sidebarEl.innerHTML = html;
}

// Dynamically update filter buttons based on user type
function updateFilterBar() {
    const filtersEl = document.getElementById('sidebar-filters');
    if (!filtersEl) return;

    const isSuperiori = state.playerSchool === 'superiori';
    const is5anno = state.playerClasse === '5';

    // Get current active filter
    const activeBtn = filtersEl.querySelector('.sidebar-filter.active');
    const activeFilter = activeBtn ? activeBtn.dataset.filter || 'all' : 'all';

    let buttonsHtml = '';

    // "I miei esami / Le mie materie" — shown if user has a profile
    const mieiLabel = isSuperiori ? '🎓 Le mie materie' : '🎓 I miei esami';
    const hasMiei = isSuperiori
        ? (state.playerTipoScuola && typeof SCUOLE_MATERIE !== 'undefined' && SCUOLE_MATERIE[state.playerTipoScuola])
        : (state.playerCorso && CORSI_ESAMI[state.playerCorso]);
    buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'miei' ? 'active' : ''}" data-filter="miei" onclick="filterLobbies('miei')" style="${hasMiei ? '' : 'display:none'}">${mieiLabel}</button>`;

    // "Tutte"
    buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'all' ? 'active' : ''}" data-filter="all" onclick="filterLobbies('all')">Tutte</button>`;

    if (isSuperiori) {
        // Superiori filters
        buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'superiori' ? 'active' : ''}" data-filter="superiori" onclick="filterLobbies('superiori')">🏫 Materie</button>`;
        if (is5anno) {
            buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'tolc' ? 'active' : ''}" data-filter="tolc" onclick="filterLobbies('tolc')">🎯 TOLC</button>`;
        }
    } else {
        // Uni filters
        buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'scientifica' ? 'active' : ''}" data-filter="scientifica" onclick="filterLobbies('scientifica')">🔬 Scientifica</button>`;
        buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'umanistica' ? 'active' : ''}" data-filter="umanistica" onclick="filterLobbies('umanistica')">📖 Umanistica</button>`;
        buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'economia' ? 'active' : ''}" data-filter="economia" onclick="filterLobbies('economia')">📊 Economia</button>`;
        buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'giuridica' ? 'active' : ''}" data-filter="giuridica" onclick="filterLobbies('giuridica')">⚖️ Giuridica</button>`;
        buttonsHtml += `<button class="sidebar-filter ${activeFilter === 'medicina' ? 'active' : ''}" data-filter="medicina" onclick="filterLobbies('medicina')">🏥 Medicina</button>`;
    }

    filtersEl.innerHTML = buttonsHtml;
}

function renderLobbyItem(lobby) {
    return `
        <button class="sidebar-lobby" onclick="navigate('lobby', '${lobby.id}')">
            <span class="sidebar-lobby-icon" aria-hidden="true">${lobby.icon}</span>
            <span class="sidebar-lobby-name">${lobby.name}</span>
            ${lobbyOnline(lobby) > 0 ? `<span class="sidebar-lobby-count" title="Persone online">● ${lobbyOnline(lobby)}</span>` : ''}
        </button>
    `;
}

function filterLobbies(category) {
    document.querySelectorAll('.sidebar-filter').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.sidebar-filter[data-filter="${category}"]`);
    if (btn) btn.classList.add('active');
    else if (event && event.target) event.target.classList.add('active');
    renderLobbies(category);
}

/* =============================================
   LOBBY PAGE
   ============================================= */

// Real present users in the current lobby (filled live by Firestore)
let lobbyRealUsers = [];

// Un gruppo privato si comporta come una lobby, ma non sta in LOBBIES
function resolveLobby(lobbyId) {
    if (typeof lobbyId === 'string' && lobbyId.startsWith('group_')) {
        const g = myGroups.find(x => groupLobbyId(x.id) === lobbyId);
        if (!g) return null;
        return {
            id: lobbyId,
            name: g.name,
            icon: '👥',
            category: 'gruppo',
            online: 0,
            isGroup: true,
            groupCode: g.code,
            members: g.members || {}
        };
    }
    return LOBBIES.find(l => l.id === lobbyId) || null;
}

function openLobby(lobbyId) {
    const lobby = resolveLobby(lobbyId);
    if (!lobby) return;

    // Una sessione già avviata nella stessa lobby non va azzerata: prima
    // bastava passare dal profilo e tornare per perderla. Non posso usare
    // currentLobby perché navigate() lo azzera uscendo dalla pagina.
    // Il timer è personale: una sessione avviata o in pausa sopravvive al cambio
    // di pagina e di materia (prima cambiare materia la azzerava senza avviso).
    const keepTimer = timerInSession();
    const sameLobbyAsBefore = lastOpenedLobbyId === lobbyId;
    lastOpenedLobbyId = lobbyId;

    state.currentLobby = lobbyId;
    lobbyRealUsers = [];

    // Prima visita di una lobby: serve per il badge
    trackLobbyVisit(lobbyId);

    // Ultime materie aperte: alimentano "Riprendi" e "Le tue materie"
    state.recentLobbies = [lobbyId, ...(state.recentLobbies || []).filter(id => id !== lobbyId)].slice(0, 12);
    state.lastLobbyAt = Date.now();
    saveState();

    // Contenuti (quiz/flashcard) dal cloud, con riserva locale
    if (typeof ensureContent === "function") ensureContent(lobbyId);
    if (typeof refreshAdminUI === "function") refreshAdminUI();

    // Tab: l'ultimo usato in questa materia; "Com'è l'esame" solo dove ha senso
    const examTab = document.getElementById('tab-esame');
    if (examTab) examTab.hidden = !reviewsEnabledFor(lobby);
    let tab = getSavedLobbyTab(lobbyId);
    if (tab === 'esame' && !reviewsEnabledFor(lobby)) tab = 'studia';
    setLobbyTab(tab, true);

    // Chat: i messaggi già presenti all'ingresso non contano come non letti
    chatSeenIds = null;
    lastChatMessages = [];
    setChatUnread(0);
    lobbyPanelOpenMobile = false;
    applyLobbyPanelState();

    document.getElementById('lobby-icon-big').textContent = lobby.icon;
    document.getElementById('lobby-title').textContent = lobby.name;
    updateLobbyOnlineCount(lobby, lobbyOnline(lobby));

    // Una riga di contesto: cosa si studia, o le info del gruppo privato
    const descEl = document.getElementById('lobby-desc');
    if (descEl) {
        let d = '';
        if (lobby.isGroup) {
            const n = Object.keys(lobby.members || {}).length;
            d = `Gruppo privato · ${n} ${n === 1 ? 'membro' : 'membri'} · codice ${lobby.groupCode}`;
        } else if (typeof MATERIE_DESC !== 'undefined') {
            d = MATERIE_DESC[lobby.id] || '';
        }
        descEl.textContent = d;
        descEl.style.display = d ? 'block' : 'none';
    }

    // Render with ambient first; live data fills in via listeners below
    renderStudents([]);
    renderChat(null);
    if (!sameLobbyAsBefore) resetQuizArea();
    if (!keepTimer) {
        resetTimer();
    } else {
        // Sessione in corso o in pausa: ripristino solo la vista del timer
        updateTimerDisplay();
        const b = document.getElementById('timer-start-btn');
        if (b && state.timerRunning) { b.textContent = '⏸ Pausa'; b.classList.remove('btn-primary'); b.classList.add('btn-warning'); }
        else if (b) { b.textContent = '▶ Riprendi'; b.classList.add('btn-primary'); b.classList.remove('btn-warning'); }
    }

    // ---- REAL-TIME: announce presence + listen to people & chat ----
    if (state.guest) {
        renderGuestLobbyPanels();
    } else if (typeof enterLobbyPresence === 'function') {
        enterLobbyPresence(lobbyId);
        listenLobbyPresence(lobbyId, (users) => {
            lobbyRealUsers = users;
            renderStudents(users);
            updateLobbyOnlineCount(lobby, users.length);
        });
        listenChat(lobbyId, (msgs) => renderChat(msgs));
    }

    renderExamSection(lobby);
}

// Leaving the lobby page: stop presence + listeners + any open video call
function leaveLobby() {
    if (typeof leaveLobbyPresence === 'function') leaveLobbyPresence();
    if (typeof _chatUnsub !== 'undefined' && _chatUnsub) { _chatUnsub(); _chatUnsub = null; }
    if (typeof closeModal === 'function') closeModal('video'); // disposes Jitsi if open
    lobbyRealUsers = [];
}

// Numero reale di presenti. Se non c'è nessuno lo diciamo.
function updateLobbyOnlineCount(lobby, realCount) {
    const el = document.getElementById('lobby-online');
    if (!el) return;
    const dot = document.querySelector('.lobby-meta .online-dot');
    if (dot) dot.classList.toggle('is-empty', realCount <= 0);
    const onlyMe = realCount === 1 && lobbyRealUsers.some(u => u.id === state.firebaseUid);
    if (realCount <= 0) el.textContent = 'Nessuno qui adesso: inizia tu, chi entra ti vede studiare';
    else if (onlyMe) el.textContent = 'Per ora ci sei solo tu: chi entra ti vede studiare';
    else if (realCount === 1) el.textContent = '1 persona online';
    else el.textContent = `${realCount} persone online`;
}

// Hybrid render: REAL present users first (live dot), then ambient profiles to fill.
// Nei gruppi privati NON si mostra mai nessun profilo ambiente.
function renderStudents(realUsers = []) {
    const list = document.getElementById('students-list');
    if (!list) return;

    const lobby = resolveLobby(state.currentLobby);

    // Solo persone reali: nessun profilo di riempimento, mai.
    const realHtml = realUsers.map(u => {
        const isSelf = u.id === state.firebaseUid;
        return `
            <div class="student-item">
                <span class="student-avatar">${u.avatar || avatarFor(u.id)}</span>
                <div class="student-info">
                    <div class="student-name">${escapeHTML(u.name || 'Studente')}${isSelf ? ' <span class="student-you">(tu)</span>' : ''}</div>
                    <div class="student-studying"><span class="live-dot"></span>Sta studiando ora</div>
                </div>
            </div>
        `;
    }).join('');

    // Nessuno oltre a te (o stanza vuota): lo diciamo, non lo mascheriamo
    if (realUsers.length <= 1) {
        const isGroup = !!(lobby && lobby.isGroup);
        const inviteBtn = isGroup
            ? `<button class="btn btn-secondary btn-sm" onclick="showInvite('${(state.currentLobby||'').replace('group_','')}')">Invita i tuoi amici</button>`
            : `<button class="btn btn-secondary btn-sm" onclick="openGroups()">Studia con i tuoi amici</button>`;
        list.innerHTML = realHtml + `<div class="group-nudge">
            <p>${realUsers.length === 1 ? 'Per ora ci sei solo tu qui.' : 'Ancora nessuno in questa stanza.'}</p>
            ${inviteBtn}
        </div>`;
        return;
    }

    list.innerHTML = realHtml;
}

function renderChat(messages) {
    const box = document.getElementById('chat-messages');
    if (!box) return;

    // Always start with a friendly system line
    let html = `<div class="chat-msg-system">Benvenuto nella lobby! Scrivi per studiare insieme 👋</div>`;

    if (messages === null) {
        // Listener not ready / offline
        html += `<div class="chat-msg-system" style="opacity:.6">Chat non disponibile offline.</div>`;
    } else if (messages.length === 0) {
        html += `<div class="chat-msg-system" style="opacity:.7">Ancora nessun messaggio. Rompi il ghiaccio! ✍️</div>`;
    } else {
        html += messages.map(m => `
            <div class="chat-msg">
                <span class="chat-msg-avatar">${m.avatar || avatarFor(m.uid)}</span>
                <span class="chat-msg-name">${escapeHTML(m.name || 'Studente')}:</span>
                <span class="chat-msg-text">${escapeHTML(m.text || '')}</span>
            </div>
        `).join('');
    }

    box.innerHTML = html;
    box.scrollTop = box.scrollHeight;

    // Non letti: contano solo i messaggi arrivati a pannello chiuso
    // (per id: il listener tiene solo gli ultimi 50, il conteggio non basterebbe)
    if (Array.isArray(messages)) {
        lastChatMessages = messages;
        if (chatSeenIds === null || isLobbyPanelOpen()) {
            markChatSeen();
        } else {
            const unread = messages.filter(m => !chatSeenIds.has(m.id) && m.uid !== state.firebaseUid).length;
            setChatUnread(unread);
        }
    }
}

function sendChat() {
    if (state.guest) { requireAccount('scrivere in chat'); return; }
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    if (text.length > 1000) {
        showNotification('Messaggio troppo lungo (max 1000 caratteri).');
        return;
    }

    input.value = '';

    // Send to Firestore — the real-time listener renders it for everyone (incl. us)
    if (typeof sendChatMessage === 'function' && state.currentLobby) {
        sendChatMessage(state.currentLobby, text);
    }

    // Daily challenge: social messages
    bumpDailyStat('messages');
    bumpStat('messagesSent');
    renderChallenges();
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendChat();
}

/* =============================================
   POMODORO TIMER
   ============================================= */

function setPomodoro(minutes) {
    if (state.timerRunning) return;
    state.timerSeconds = minutes * 60;
    state.timerTotal = minutes * 60;
    updateTimerDisplay();
}

function toggleTimer() {
    if (state.timerRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    state.timerRunning = true;
    timerTouched = true;
    state.timerLobby = state.currentLobby;   // dove sta girando questa sessione
    document.getElementById('timer-start-btn').textContent = '⏸ Pausa';
    document.getElementById('timer-start-btn').classList.remove('btn-primary');
    document.getElementById('timer-start-btn').classList.add('btn-warning');
    document.querySelector('.build-scene').style.boxShadow = '0 0 30px rgba(200, 240, 49, 0.18)';

    state.timer = setInterval(() => {
        state.timerSeconds--;

        if (state.timerSeconds <= 0) {
            completePomodoro();
            return;
        }

        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    state.timerRunning = false;
    clearInterval(state.timer);
    document.getElementById('timer-start-btn').textContent = '▶ Riprendi';
    document.getElementById('timer-start-btn').classList.add('btn-primary');
    document.getElementById('timer-start-btn').classList.remove('btn-warning');
    const scene = document.querySelector('.build-scene');
    if (scene) scene.style.boxShadow = 'none';
    updateMiniTimer();
}

function resetTimer() {
    pauseTimer();
    state.timerSeconds = state.timerTotal;
    document.getElementById('timer-start-btn').textContent = '▶ Inizia a costruire';
    resetBuildingAnimation();
    updateTimerDisplay();
}

function completePomodoro() {
    clearInterval(state.timer);
    state.timerRunning = false;
    state.pomodorosCompleted++;

    const minutes = state.timerTotal / 60;
    state.studyHours = Math.round((state.studyHours + minutes / 60) * 100) / 100;

    // Streak + daily challenge tracking (real study activity)
    registerStudyDay();
    bumpDailyStat('pomodoros');
    bumpDailyStat('minutes', minutes);
    renderChallenges();

    const xpEarned = minutes >= 25 ? 75 : 30;
    addXP(xpEarned, `Pomodoro ${minutes}min completato!`);

    document.getElementById('pomo-count').textContent = state.pomodorosCompleted;
    const hours = Math.floor(state.studyHours);
    const mins = Math.round((state.studyHours - hours) * 60);
    document.getElementById('pomo-total').textContent = `${hours}h ${mins}m`;

    state.timerSeconds = state.timerTotal;
    document.getElementById('timer-start-btn').textContent = '▶ Inizia a costruire';
    document.getElementById('timer-start-btn').classList.add('btn-primary');
    document.getElementById('timer-start-btn').classList.remove('btn-warning');
    updateTimerDisplay();

    showNotification(`🍅 Torre completata! +${xpEarned} XP`);
    saveState();
}

function updateTimerDisplay() {
    const mins = Math.floor(state.timerSeconds / 60);
    const secs = state.timerSeconds % 60;
    const timeStr = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

    const smallTimer = document.getElementById('build-timer-small');
    if (smallTimer) smallTimer.textContent = timeStr;

    const progress = ((state.timerTotal - state.timerSeconds) / state.timerTotal) * 100;
    document.getElementById('timer-bar').style.width = progress + '%';

    updateBuildingAnimation(progress);
    updateMiniTimer();
}

function updateBuildingAnimation(progress) {
    const blocks = document.querySelectorAll('.build-block');
    const totalBlocks = blocks.length;
    const blocksToShow = Math.floor((progress / 100) * totalBlocks);

    blocks.forEach((block, index) => {
        const blockIndex = totalBlocks - 1 - index;
        if (blockIndex < blocksToShow) {
            if (!block.classList.contains('visible')) {
                block.classList.add('visible', 'latest');
                setTimeout(() => block.classList.remove('latest'), 600);
            }
        } else {
            block.classList.remove('visible', 'latest');
        }
    });
}

function resetBuildingAnimation() {
    document.querySelectorAll('.build-block').forEach(b => {
        b.classList.remove('visible', 'latest');
    });
}

/* =============================================
   XP DELLO STUDIO — tetti giornalieri
   Prima un quiz ripetuto sulle stesse 5 domande valeva 250 XP contro i 75 di
   25 minuti di studio: la classifica premiava chi ripeteva, non chi studiava.
   ============================================= */

const XP_CAPS = { quiz: 150, flash: 100 };   // XP massimi al giorno per tipo

function xpUsedToday(kind) {
    return getDailyStats()['xp_' + kind] || 0;
}

// Assegna XP fino al tetto giornaliero. Torna gli XP effettivamente dati.
function awardStudyXP(kind, amount, reason) {
    const left = Math.max(0, (XP_CAPS[kind] || Infinity) - xpUsedToday(kind));
    const give = Math.min(amount, left);
    if (give > 0) {
        bumpDailyStat('xp_' + kind, give);
        addXP(give, reason);
    }
    return give;
}

/* =============================================
   QUIZ
   ============================================= */

let quizPool = [];          // domande preparate per il giro in corso
let quizAwarded = 0;        // XP dati in questo quiz
let quizDone = false;       // evita che un doppio avanzamento chiuda due volte lo stesso quiz
const lastQuizAsked = {};   // ultime domande viste per materia: si evita di ripeterle

function shuffleQuizOptions(q) {
    // Le risposte vanno mescolate: con l'ordine fisso si impara la posizione, non la materia
    const pairs = q.options.map((text, i) => ({ text, correct: i === q.correct }));
    shuffleArray(pairs);
    return {
        question: q.question,
        explain: q.explain || '',
        options: pairs.map(p => p.text),
        correct: pairs.findIndex(p => p.correct)
    };
}

async function startQuiz() {
    const lobbyId = state.currentLobby;
    const area = document.getElementById('quiz-area');
    if (!lobbyId || !area) return;

    area.innerHTML = `<div class="quiz-placeholder"><p>Preparo le domande…</p></div>`;
    await ensureContent(lobbyId);
    const all = getQuiz(lobbyId);

    if (!all.length) {
        area.innerHTML = `
            <div class="quiz-placeholder">
                <p>Per questa materia non ci sono ancora domande.</p>
                <p class="quiz-sub">Segnalacelo dal badge Beta: le aggiungiamo alla materia più richiesta.</p>
            </div>`;
        return;
    }

    // Se il serbatoio è abbastanza grande, si evitano le domande dell'ultimo giro
    const seen = lastQuizAsked[lobbyId] || [];
    let pool = all.filter(q => !seen.includes(q.question));
    if (pool.length < Math.min(5, all.length)) pool = all.slice();

    const picked = shuffleArray(pool.slice()).slice(0, 5);
    lastQuizAsked[lobbyId] = picked.map(q => q.question);

    state.currentQuiz = picked.map(shuffleQuizOptions);
    state.currentQuizIndex = 0;
    state.quizScore = 0;
    quizAwarded = 0;
    quizDone = false;

    renderQuizQuestion();
}

function renderQuizQuestion() {
    if (state.currentQuizIndex >= state.currentQuiz.length) {
        finishQuiz();
        return;
    }

    const q = state.currentQuiz[state.currentQuizIndex];
    const area = document.getElementById('quiz-area');

    area.innerHTML = `
        <div class="quiz-counter">Domanda ${state.currentQuizIndex + 1} di ${state.currentQuiz.length}</div>
        <div class="quiz-question">${escapeHTML(q.question)}</div>
        <div class="quiz-options" role="group" aria-label="Risposte">
            ${q.options.map((opt, i) => `
                <button class="quiz-option" onclick="answerQuiz(${i})">${escapeHTML(opt)}</button>
            `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-feedback" role="status" hidden></div>
    `;
}

function answerQuiz(selected) {
    const q = state.currentQuiz[state.currentQuizIndex];
    const options = document.querySelectorAll('.quiz-option');
    const right = selected === q.correct;

    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) opt.classList.add('correct');
        if (i === selected && !right) opt.classList.add('wrong');
    });

    if (right) state.quizScore++;

    // Si dice sempre perché: sbagliare senza spiegazione non insegna niente
    const fb = document.getElementById('quiz-feedback');
    const last = state.currentQuizIndex === state.currentQuiz.length - 1;
    if (fb) {
        fb.hidden = false;
        fb.className = 'quiz-feedback ' + (right ? 'is-right' : 'is-wrong');
        fb.innerHTML = `
            <strong>${right ? 'Giusto.' : 'Non ci siamo.'}</strong>
            ${right ? '' : `<span>La risposta è: ${escapeHTML(q.options[q.correct])}</span>`}
            ${q.explain ? `<span>${escapeHTML(q.explain)}</span>` : ''}
            <button class="btn btn-primary btn-sm" onclick="nextQuizQuestion()">${last ? 'Vedi il risultato' : 'Avanti'}</button>`;
        const btn = fb.querySelector('button');
        if (btn) btn.focus({ preventScroll: true });
    } else {
        nextQuizQuestion();
    }
}

function nextQuizQuestion() {
    state.currentQuizIndex++;
    renderQuizQuestion();
}

function finishQuiz() {
    if (quizDone) return;
    quizDone = true;
    state.quizzesCompleted++;

    // Quiz senza errori → badge "Quiz Perfetto"
    const perfect = state.currentQuiz && state.quizScore === state.currentQuiz.length;
    if (perfect) state.perfectQuizzes = (state.perfectQuizzes || 0) + 1;

    // Streak + sfide del giorno
    registerStudyDay();
    bumpDailyStat('quizzes');
    renderChallenges();
    checkNewBadges();

    // 10 XP a risposta giusta + 20 se è perfetto, con tetto giornaliero
    const earned = state.quizScore * 10 + (perfect ? 20 : 0);
    quizAwarded = awardStudyXP('quiz', earned, `Quiz completato: ${state.quizScore}/${state.currentQuiz.length}`);
    const capped = quizAwarded < earned;

    const area = document.getElementById('quiz-area');
    const percentage = Math.round((state.quizScore / state.currentQuiz.length) * 100);
    let emoji = '😅';
    if (percentage >= 80) emoji = '🏆';
    else if (percentage >= 60) emoji = '💪';
    else if (percentage >= 40) emoji = '📖';

    area.innerHTML = `
        <div class="quiz-result">
            <div class="quiz-score">${emoji} ${state.quizScore}/${state.currentQuiz.length}</div>
            <div class="quiz-score-label">${percentage}% risposte corrette</div>
            <div class="quiz-xp-earned">+${quizAwarded} XP</div>
            ${capped ? `<p class="quiz-sub">Hai raggiunto il massimo di XP da quiz per oggi: puoi continuare a esercitarti, ma gli XP ripartono domani.</p>` : ''}
            <button class="btn btn-primary" onclick="startQuiz()">Nuovo quiz</button>
        </div>
    `;

    saveState();
}

function resetQuizArea() {
    const area = document.getElementById('quiz-area');
    if (!area) return;
    area.innerHTML = `
        <div class="quiz-placeholder">
            <span class="quiz-placeholder-icon">🧠</span>
            <p>Premi "Nuova sfida" per iniziare un quiz sulla materia!</p>
            <p class="quiz-sub">5 domande, risposte in ordine casuale, con spiegazione</p>
        </div>
    `;
}

/* =============================================
   FLASHCARDS — ripetizione spaziata che dura nel tempo
   Prima il mazzo ripartiva da zero a ogni apertura: la valutazione
   (difficile/medio/facile) valeva solo per quella sessione.
   Ora ogni carta ha un intervallo in giorni salvato su questo dispositivo.
   ============================================= */

const SRS_KEY = 'studyo_srs';
const SRS_SESSION_MAX = 20;     // carte per sessione
const SRS_MIN_GAP = 3;          // carte che devono passare prima di rivedere la stessa

let studyDeck = [];
let fcCompleted = 0;
let fcTotal = 0;
let fcExtraPractice = false;    // ripasso extra: fuori dalla programmazione

function srsAll() {
    try { return JSON.parse(localStorage.getItem(SRS_KEY) || '{}'); } catch (e) { return {}; }
}
function srsSave(all) {
    try { localStorage.setItem(SRS_KEY, JSON.stringify(all)); } catch (e) {}
}
// Chiave stabile anche se l'ordine delle carte cambia
function srsKey(card) { return _hashString(card.front).toString(36); }

function srsFor(lobbyId, card) {
    const all = srsAll();
    return (all[lobbyId] || {})[srsKey(card)] || null;
}

function srsUpdate(lobbyId, card, patch) {
    const all = srsAll();
    if (!all[lobbyId]) all[lobbyId] = {};
    all[lobbyId][srsKey(card)] = { ...(all[lobbyId][srsKey(card)] || {}), ...patch };
    srsSave(all);
}

function addDays(dateStr, days) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// Carte in scadenza oggi (mai viste incluse)
function dueCards(lobbyId, cards) {
    const today = todayStr();
    return cards.filter(c => {
        const s = srsFor(lobbyId, c);
        return !s || !s.due || s.due <= today;
    });
}

async function openFlashcards(extra) {
    const lobbyId = state.currentLobby;
    if (!lobbyId) return;

    await ensureContent(lobbyId);
    const cards = getCards(lobbyId);

    if (!cards.length) {
        showNotification('Per questa materia non ci sono ancora flashcard. Segnalacelo dal badge Beta.');
        return;
    }

    fcExtraPractice = !!extra;
    const pool = fcExtraPractice ? cards.slice() : dueCards(lobbyId, cards);

    studyDeck = shuffleArray(pool.slice()).slice(0, SRS_SESSION_MAX).map(c => ({ ...c, seenInSession: 0 }));
    fcCompleted = 0;
    fcTotal = studyDeck.length;

    document.getElementById('fc-total').textContent = fcTotal;
    renderFlashcard();
    openModal('flashcard');
}

function renderFlashcard() {
    const front = document.getElementById('flashcard-front');
    const back = document.getElementById('flashcard-back');
    const el = document.getElementById('flashcard');
    const actions = document.querySelector('.flashcard-actions');
    const hint = document.getElementById('fc-hint');

    // Niente da ripassare oggi: si può comunque fare pratica extra
    if (fcTotal === 0) {
        front.innerHTML = `<div class="fc-done">
            <p><strong>Per oggi hai finito.</strong></p>
            <p>Le carte tornano quando è il momento giusto per ricordarle.</p>
            <button class="btn btn-secondary btn-sm" onclick="openFlashcards(true)">Ripassa comunque</button>
        </div>`;
        back.innerHTML = '';
        if (actions) actions.hidden = true;
        if (hint) hint.hidden = true;
        el.classList.remove('flipped');
        document.getElementById('fc-current').textContent = '0';
        return;
    }

    if (studyDeck.length === 0) {
        front.innerHTML = `<div class="fc-done">
            <p><strong>Sessione completata.</strong></p>
            <p>${fcCompleted} ${fcCompleted === 1 ? 'carta ripassata' : 'carte ripassate'}${fcExtraPractice ? '' : ': le rivedrai nei prossimi giorni'}.</p>
        </div>`;
        back.innerHTML = '';
        if (actions) actions.hidden = true;
        if (hint) hint.hidden = true;
        el.classList.remove('flipped');
        document.getElementById('fc-current').textContent = fcTotal;
        return;
    }

    const card = studyDeck[0];
    const s = srsFor(state.currentLobby, card);
    const tag = s && s.reps ? ' <span class="fc-tag">ripasso</span>' : '';
    front.innerHTML = `<p>${card.front}${tag}</p>`;
    back.innerHTML = `<p>${card.back}</p>`;
    document.getElementById('fc-current').textContent = Math.min(fcCompleted + 1, fcTotal);

    el.classList.remove('flipped');
    state.flashcardFlipped = false;
    // Si valuta solo dopo aver visto la risposta
    if (actions) actions.hidden = true;
    if (hint) hint.hidden = false;
}

function flipCard() {
    if (studyDeck.length === 0) return;
    const el = document.getElementById('flashcard');
    el.classList.toggle('flipped');
    state.flashcardFlipped = !state.flashcardFlipped;

    const actions = document.querySelector('.flashcard-actions');
    const hint = document.getElementById('fc-hint');
    if (actions) actions.hidden = !state.flashcardFlipped;
    if (hint) hint.hidden = state.flashcardFlipped;
}

/* difficile → torna in questa sessione, ma non subito (almeno 3 carte dopo)
   medio    → tra 1-2 giorni
   facile   → intervallo più lungo, in base a quante volte l'hai già ricordata */
function rateFlashcard(rating) {
    if (studyDeck.length === 0) return;
    if (!state.flashcardFlipped) return;   // prima si gira la carta

    const card = studyDeck.shift();
    const lobbyId = state.currentLobby;
    const prev = srsFor(lobbyId, card) || { interval: 0, ease: 2.3, reps: 0 };
    const today = todayStr();
    let interval, ease = prev.ease || 2.3;

    if (rating === 'hard') {
        ease = Math.max(1.5, ease - 0.15);
        interval = 0;                                   // da rivedere oggi stesso
        card.seenInSession = (card.seenInSession || 0) + 1;
        // Rientra nel mazzo, ma con almeno SRS_MIN_GAP carte in mezzo
        const at = Math.min(studyDeck.length, SRS_MIN_GAP + Math.floor(Math.random() * 2));
        if (studyDeck.length === 0 && card.seenInSession >= 3) {
            fcCompleted++;                              // mazzo di una carta sola: non si insiste all'infinito
        } else {
            studyDeck.splice(at, 0, card);
        }
    } else if (rating === 'medium') {
        interval = prev.reps ? Math.max(1, Math.round((prev.interval || 1) * 1.4)) : 1;
        fcCompleted++;
    } else {
        ease = Math.min(2.8, ease + 0.1);
        interval = prev.reps ? Math.max(2, Math.round((prev.interval || 1) * ease)) : 3;
        fcCompleted++;
    }

    srsUpdate(lobbyId, card, {
        interval,
        ease,
        reps: (prev.reps || 0) + 1,
        last: today,
        due: addDays(today, Math.max(interval, rating === 'hard' ? 0 : 1))
    });

    // XP una sola volta al giorno per carta, con tetto giornaliero
    const already = prev.last === today;
    if (!already) {
        const xp = rating === 'easy' ? 8 : rating === 'medium' ? 6 : 4;
        awardStudyXP('flash', xp, 'Flashcard ripassata');
    }

    renderFlashcard();
}

/* =============================================
   NOTES
   ============================================= */

let noteSaveTimer = null;
let noteIsShared = false;
let noteFiles = [];              // allegati della nota aperta
const NOTE_FILES_MAX = 5;
const NOTE_FILE_MB = 10;

/* Allegati: richiedono Firebase Storage attivo sul progetto (piano Blaze).
   Finché è false la sezione resta nascosta, così nessuno prova a caricare
   un file per poi vederselo rifiutare.
   PER ATTIVARLI: metti true qui, attiva Storage in Console e pubblica storage.rules. */
const NOTE_FILES_ENABLED = false;

function formatFileSize(bytes) {
    if (!bytes) return '';
    return bytes >= 1024 * 1024
        ? (bytes / (1024 * 1024)).toFixed(1).replace('.', ',') + ' MB'
        : Math.max(1, Math.round(bytes / 1024)) + ' KB';
}

function renderNoteFiles() {
    const section = document.querySelector('.notes-files');
    if (section) section.hidden = !NOTE_FILES_ENABLED;
    if (!NOTE_FILES_ENABLED) return;

    const list = document.getElementById('nf-list');
    const count = document.getElementById('nf-count');
    const addBtn = document.getElementById('nf-add');
    const hint = document.getElementById('nf-hint');
    if (!list) return;

    // Storage non attivo sul progetto: si dice, invece di far fallire un caricamento
    const ready = typeof storageReady === 'function' && storageReady();
    if (addBtn) addBtn.disabled = !ready || noteFiles.length >= NOTE_FILES_MAX;
    if (hint && !ready) hint.textContent = 'Gli allegati non sono ancora attivi su questo progetto.';
    if (count) count.textContent = noteFiles.length ? `${noteFiles.length} di ${NOTE_FILES_MAX}` : '';

    if (!noteFiles.length) {
        list.innerHTML = `<p class="muted-line">Nessun allegato: puoi aggiungere il PDF del professore o la foto di una lavagna.</p>`;
        return;
    }

    list.innerHTML = noteFiles.map((f, i) => {
        const isImg = (f.type || '').startsWith('image/');
        const preview = isImg
            ? `<img src="${f.url}" alt="" loading="lazy">`
            : `<span class="nf-icon" aria-hidden="true"><svg class="ic"><use href="#i-file"/></svg></span>`;
        return `<div class="nf-item">
            <a class="nf-preview" href="${f.url}" target="_blank" rel="noopener" aria-label="Apri ${escapeHTML(f.name)}">${preview}</a>
            <div class="nf-meta">
                <a href="${f.url}" target="_blank" rel="noopener">${escapeHTML(f.name)}</a>
                <span>${formatFileSize(f.size)}${isImg ? ' · immagine' : ' · PDF'}</span>
            </div>
            <button type="button" class="icon-btn" onclick="removeNoteFile(${i})" aria-label="Rimuovi ${escapeHTML(f.name)}">
                <svg class="ic ic-sm" aria-hidden="true"><use href="#i-x"/></svg>
            </button>
        </div>`;
    }).join('');
}

async function onNoteFilePicked(event) {
    const input = event.target;
    const file = input.files && input.files[0];
    input.value = '';                      // così si può ricaricare lo stesso file
    if (!file) return;

    if (noteFiles.length >= NOTE_FILES_MAX) { showNotification(`Massimo ${NOTE_FILES_MAX} allegati per materia.`); return; }
    if (!/^(image\/|application\/pdf$)/.test(file.type)) { showNotification('Puoi allegare solo PDF o immagini.'); return; }
    if (file.size > NOTE_FILE_MB * 1024 * 1024) { showNotification(`Il file supera i ${NOTE_FILE_MB} MB.`); return; }

    const box = document.getElementById('nf-progress');
    const bar = document.getElementById('nf-bar');
    if (box) box.hidden = false;
    if (bar) bar.style.width = '0%';

    const res = await uploadNoteFile(state.currentLobby, file, p => { if (bar) bar.style.width = p + '%'; });
    if (box) box.hidden = true;

    if (!res || res.error) {
        const why = res && res.error;
        showNotification(
            why === 'storage/unauthorized' ? 'Caricamento rifiutato: le regole di Storage non lo permettono.'
            : (why === 'storage/timeout' || why === 'storage/retry-limit-exceeded') ? 'Caricamento non riuscito: rete lenta, oppure Storage non è ancora attivo sul progetto.'
            : 'Caricamento non riuscito. Riprova tra poco.');
        return;
    }

    noteFiles.push(res);
    renderNoteFiles();
    const editor = document.getElementById('notes-editor');
    await saveNote(state.currentLobby, editor ? editor.value : '', noteIsShared, noteFiles);
    showNotification('Allegato caricato.');
}

async function removeNoteFile(index) {
    const f = noteFiles[index];
    if (!f) return;
    if (!confirm(`Rimuovere "${f.name}"?`)) return;
    await deleteNoteFile(f.path);
    noteFiles.splice(index, 1);
    renderNoteFiles();
    const editor = document.getElementById('notes-editor');
    await saveNote(state.currentLobby, editor ? editor.value : '', noteIsShared, noteFiles);
}

async function openNotes() {
    if (!requireAccount('salvare gli appunti nel cloud')) return;
    if (state.currentPage === 'lobby') setLobbyTab('materiali');
    openModal('notes');
    showNotesTab('mine');

    const editor = document.getElementById('notes-editor');
    const statusEl = document.getElementById('notes-status');
    const lobbyId = state.currentLobby;

    // 1) Mostro subito la copia locale (istantanea, funziona anche offline)
    const local = localStorage.getItem(`studyo_notes_${lobbyId}`) || '';
    editor.value = local;

    // 2) Poi allineo con la versione sul cloud, se più recente
    if (typeof loadNote === 'function' && state.firebaseUid) {
        statusEl.textContent = 'Sincronizzo…';
        const remote = await loadNote(lobbyId);
        if (remote && typeof remote.text === 'string') {
            // il cloud vince se il locale è vuoto o identico all'inizio
            if (!local || remote.text.length >= local.length) {
                editor.value = remote.text;
                localStorage.setItem(`studyo_notes_${lobbyId}`, remote.text);
            }
            noteIsShared = !!remote.shared;
            noteFiles = Array.isArray(remote.files) ? remote.files : [];
        } else {
            noteIsShared = false;
            noteFiles = [];
        }
        renderNoteFiles();
        const cb = document.getElementById('notes-shared');
        if (cb) cb.checked = noteIsShared;
        statusEl.textContent = 'Salvati sul tuo account';
    } else {
        statusEl.textContent = 'Salvati su questo dispositivo';
        noteFiles = [];
        renderNoteFiles();
    }

    // 3) Salvataggio: locale immediato, cloud con debounce
    editor.oninput = () => {
        localStorage.setItem(`studyo_notes_${lobbyId}`, editor.value);
        statusEl.textContent = 'Scrivo…';
        clearTimeout(noteSaveTimer);
        noteSaveTimer = setTimeout(async () => {
            if (typeof saveNote === 'function' && state.firebaseUid) {
                const ok = await saveNote(lobbyId, editor.value, noteIsShared, noteFiles);
                statusEl.textContent = ok ? 'Salvato ✓' : 'Salvato solo qui';
            } else {
                statusEl.textContent = 'Salvato su questo dispositivo';
            }
        }, 900);
    };
}

async function toggleShareNote() {
    const cb = document.getElementById('notes-shared');
    noteIsShared = !!(cb && cb.checked);
    const editor = document.getElementById('notes-editor');
    if (typeof saveNote === 'function' && state.firebaseUid) {
        await saveNote(state.currentLobby, editor.value, noteIsShared, noteFiles);
    }
    showNotification(noteIsShared
        ? '📤 I tuoi appunti sono ora visibili nella lobby'
        : '🔒 Appunti tornati privati');
    if (noteIsShared) addXP(20, 'Appunti condivisi');
}

async function showNotesTab(which) {
    const mine = document.getElementById('notes-pane-mine');
    const shared = document.getElementById('notes-pane-shared');
    document.getElementById('tab-mine').classList.toggle('active', which === 'mine');
    document.getElementById('tab-shared').classList.toggle('active', which === 'shared');
    mine.style.display = which === 'mine' ? 'block' : 'none';
    shared.style.display = which === 'shared' ? 'block' : 'none';

    if (which !== 'shared') return;

    const box = document.getElementById('shared-notes');
    box.innerHTML = `<div class="community-loading">Cerco appunti condivisi…</div>`;
    const notes = (typeof loadSharedNotes === 'function')
        ? await loadSharedNotes(state.currentLobby) : [];

    if (!notes.length) {
        box.innerHTML = `<div class="session-empty">
            <p>Ancora nessun appunto condiviso qui.</p>
            <small>Condividi i tuoi dalla scheda "I miei": chi studia questa materia li vedrà.</small>
        </div>`;
        return;
    }

    box.innerHTML = notes.map(n => `
        <div class="shared-note">
            <div class="shared-note-head">
                <span class="shared-note-avatar">${avatarFor(n.uid)}</span>
                <span class="shared-note-author">${escapeHTML(n.authorName || 'Studente')}</span>
            </div>
            <div class="shared-note-text">${escapeHTML(n.text).replace(/\n/g, '<br>')}</div>
            ${(n.files || []).length ? `<div class="shared-note-files">${n.files.map(f =>
                `<a class="nf-chip" href="${f.url}" target="_blank" rel="noopener">${escapeHTML(f.name)}</a>`).join('')}</div>` : ''}
        </div>
    `).join('');
}

/* =============================================
   COM'È L'ESAME — recensioni sull'esame
   Scelte di progetto:
   - si parla della prova, mai delle persone (nessun campo sul docente)
   - scrivono solo gli universitari (imposto anche dalle regole Firestore)
   - 3 segnalazioni nascondono una recensione
   ============================================= */

const REVIEW_HIDE_AFTER = 3;

const EXAM_TYPE_LABEL = {
    scritto: 'Scritto', orale: 'Orale', crocette: 'Test a crocette',
    progetto: 'Progetto', pratica: 'Prova pratica'
};
const DIFFICULTY_LABEL = { 1: 'Facile', 2: 'Abbordabile', 3: 'Nella media', 4: 'Impegnativo', 5: 'Molto difficile' };

// L'ateneo è testo libero: "UNIMORE", "Unimore" e "Università di Modena
// e Reggio Emilia" devono finire nella stessa chiave. L'ordine conta
// (es. Politecnico e Bicocca prima della Statale di Milano).
const UNI_ALIASES = [
    [/unimore|modena|reggio emilia/, 'unimore'],
    [/polimi|politecnico di milano/, 'polimi'],
    [/bicocca|unimib/, 'unimib'],
    [/bocconi/, 'bocconi'],
    [/cattolica|unicatt/, 'unicatt'],
    [/unimi|statale di milano|studi di milano/, 'unimi'],
    [/polito|politecnico di torino/, 'polito'],
    [/unito|torino/, 'unito'],
    [/unibo|bologna|alma mater/, 'unibo'],
    [/tor vergata|roma 2|uniroma2/, 'uniroma2'],
    [/roma tre|roma 3|uniroma3/, 'uniroma3'],
    [/sapienza|roma 1|uniroma1/, 'sapienza'],
    [/unipd|padova/, 'unipd'],
    [/unina|federico ii|napoli/, 'unina'],
    [/unifi|firenze/, 'unifi'],
    [/unipi|pisa/, 'unipi'],
    [/unipr|parma/, 'unipr'],
    [/unife|ferrara/, 'unife'],
    [/univr|verona/, 'univr'],
    [/unige|genova/, 'unige'],
    [/unitn|trento/, 'unitn'],
    [/unipv|pavia/, 'unipv'],
    [/unisi|siena/, 'unisi'],
    [/uniba|bari/, 'uniba'],
    [/unipa|palermo/, 'unipa'],
    [/unict|catania/, 'unict']
];

function uniKey(name) {
    const s = normalizeText(name || '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    for (const [re, key] of UNI_ALIASES) if (re.test(s)) return key;
    return s.slice(0, 120);
}

let reviewState = { lobbyId: null, list: [], scope: 'mine', docente: '', difficulty: 0, loading: false };

// Il docente è solo un'etichetta per riconoscere l'edizione del corso.
// Tolgo titoli e punteggiatura e tengo il cognome, così "prof. rossi" e "Rossi"
// finiscono nello stesso gruppo.
const DOCENTE_TITLES = new Set(['prof', 'profssa', 'professor', 'professore', 'professoressa',
    'dott', 'dottssa', 'dottore', 'dottoressa', 'dr', 'drssa', 'ing', 'avv', 'docente', 'sig', 'sigra']);
function cleanDocente(value) {
    const words = (value || '').replace(/\s+/g, ' ').trim().split(' ');
    while (words.length && DOCENTE_TITLES.has(normalizeText(words[0]).replace(/[^a-z]/g, ''))) words.shift();
    let s = words.join(' ').replace(/[^\p{L}\s'’-]/gu, '').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    if (s === s.toUpperCase()) s = s.toLowerCase();       // chi scrive tutto maiuscolo non sta urlando
    s = s.replace(/(^|[\s'’-])(\p{L})/gu, (m, sep, letter) => sep + letter.toUpperCase());
    return s.slice(0, 60);
}

function docenteKey(value) {
    return normalizeText(cleanDocente(value)).replace(/[^a-z ]+/g, '').trim();
}

function docenteLabel(review) {
    const d = cleanDocente(review && review.docente);
    return d ? 'Prof. ' + d : '';
}

function reviewsEnabledFor(lobby) {
    return !!lobby && !lobby.isGroup && lobby.category !== 'superiori';
}

function canWriteReviews() {
    return state.playerSchool === 'universita' && !!state.firebaseUid;
}

function visibleReviews() {
    return reviewState.list.filter(r => {
        const reported = Array.isArray(r.reportedBy) ? r.reportedBy : [];
        if (reported.length >= REVIEW_HIDE_AFTER) return false;
        if (reported.includes(state.firebaseUid)) return false;
        return true;
    });
}

function scopedReviews() {
    const lobby = resolveLobby(reviewState.lobbyId);
    const all = visibleReviews();
    if (!lobby || lobby.category === 'tolc' || reviewState.scope === 'all') return all;
    const mine = uniKey(state.playerUni);
    return all.filter(r => r.uniKey && r.uniKey === mine);
}

// Recensioni davvero mostrate: ateneo + eventuale docente scelto
function filteredReviews() {
    const list = scopedReviews();
    if (!reviewState.docente) return list;
    if (reviewState.docente === '_nessuno') return list.filter(r => !docenteKey(r.docente));
    return list.filter(r => docenteKey(r.docente) === reviewState.docente);
}

// Gruppi di docenti presenti, dal più citato al meno
function docenteGroups() {
    const groups = new Map();
    scopedReviews().forEach(r => {
        const key = docenteKey(r.docente);
        if (!key) return;
        const g = groups.get(key) || { key, label: cleanDocente(r.docente), count: 0 };
        g.count++;
        groups.set(key, g);
    });
    return [...groups.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function setReviewDocente(key) {
    reviewState.docente = reviewState.docente === key ? '' : key;
    renderProfFilter();
    renderExamSummary();
    renderReviewList();
}

function renderProfFilter() {
    const box = document.getElementById('exam-prof');
    if (!box) return;
    const groups = docenteGroups();
    const senza = scopedReviews().filter(r => !docenteKey(r.docente)).length;

    // Un filtro con un solo docente non serve a niente
    if (groups.length < 2) {
        box.hidden = true;
        box.innerHTML = '';
        if (reviewState.docente) reviewState.docente = '';
        return;
    }

    // Se il docente selezionato non c'è più (cambio ateneo), torno a tutti
    if (reviewState.docente && reviewState.docente !== '_nessuno'
        && !groups.some(g => g.key === reviewState.docente)) reviewState.docente = '';

    const btn = (key, label, count) => {
        const on = reviewState.docente === key;
        return `<button type="button" class="exam-prof-btn ${on ? 'active' : ''}" aria-pressed="${on}"
                onclick="setReviewDocente('${key}')">${escapeHTML(label)}<span aria-hidden="true"> · ${count}</span></button>`;
    };

    box.hidden = false;
    box.innerHTML = `<span class="exam-prof-label">Docente</span>
        <button type="button" class="exam-prof-btn ${reviewState.docente ? '' : 'active'}" aria-pressed="${!reviewState.docente}"
            onclick="setReviewDocente('')">Tutti</button>
        ${groups.map(g => btn(g.key, 'Prof. ' + g.label, g.count)).join('')}
        ${senza ? btn('_nessuno', 'Non indicato', senza) : ''}`;
}

async function renderExamSection(lobby) {
    const card = document.getElementById('exam-card');
    if (!card) return;

    if (!reviewsEnabledFor(lobby)) { card.hidden = true; return; }
    card.hidden = false;

    reviewState.lobbyId = lobby.id;
    reviewState.list = [];
    reviewState.docente = '';
    const profBox = document.getElementById('exam-prof');
    if (profBox) { profBox.hidden = true; profBox.innerHTML = ''; }

    // In prova le recensioni non si caricano: servono login e regole del database
    if (state.guest) {
        document.getElementById('exam-scope').hidden = true;
        document.getElementById('exam-write-btn').hidden = true;
        document.getElementById('exam-summary').innerHTML = '';
        document.getElementById('exam-reviews').innerHTML = `<div class="session-empty">
            <p>Le recensioni sugli esami si leggono con un account.</p>
            <small>Difficoltà, ore di studio e consigli di chi ha già dato questo esame.</small>
            <div style="margin-top:12px"><button class="btn btn-secondary btn-sm" onclick="requireAccount('leggere le recensioni')">Crea un account</button></div>
        </div>`;
        return;
    }

    const isTolc = lobby.category === 'tolc';
    const scopeEl = document.getElementById('exam-scope');
    if (scopeEl) scopeEl.hidden = isTolc || !state.playerUni;

    const writeBtn = document.getElementById('exam-write-btn');
    if (writeBtn) writeBtn.hidden = !canWriteReviews();

    document.getElementById('exam-summary').innerHTML = '';
    document.getElementById('exam-reviews').innerHTML = `<div class="community-loading">Carico le recensioni…</div>`;

    const loaded = (typeof loadReviews === 'function') ? await loadReviews(lobby.id) : [];
    if (reviewState.lobbyId !== lobby.id) return;          // l'utente ha cambiato lobby nel frattempo

    if (loaded === null) {
        document.getElementById('exam-reviews').innerHTML =
            `<div class="session-empty"><p>Recensioni non disponibili al momento.</p><small>Controlla la connessione e riprova.</small></div>`;
        return;
    }

    reviewState.list = loaded;

    // Se il mio ateneo non ha ancora recensioni, mostro tutti gli atenei
    const mineKey = uniKey(state.playerUni);
    const hasMine = loaded.some(r => r.uniKey === mineKey);
    setReviewScope(!isTolc && state.playerUni && hasMine ? 'mine' : 'all', true);
}

function setReviewScope(scope, silent) {
    reviewState.scope = scope;
    reviewState.docente = '';                     // i docenti cambiano da un ateneo all'altro
    document.querySelectorAll('#exam-scope .exam-scope-btn').forEach(b => {
        const on = b.dataset.scope === scope;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderProfFilter();
    renderExamSummary();
    renderReviewList();
}

function docenteBasisText() {
    if (!reviewState.docente) return '';
    if (reviewState.docente === '_nessuno') return ', senza docente indicato';
    const g = docenteGroups().find(x => x.key === reviewState.docente);
    return g ? `, edizione del prof. ${escapeHTML(g.label)}` : '';
}

function median(nums) {
    if (!nums.length) return 0;
    const s = [...nums].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

function renderExamSummary() {
    const box = document.getElementById('exam-summary');
    if (!box) return;
    const list = filteredReviews();
    if (!list.length) { box.innerHTML = ''; return; }

    const avg = list.reduce((a, r) => a + (r.difficulty || 0), 0) / list.length;
    const hours = median(list.map(r => r.hours || 0).filter(Boolean));

    const typeCount = {};
    list.forEach(r => (r.examTypes || []).forEach(t => typeCount[t] = (typeCount[t] || 0) + 1));
    const topTypes = Object.entries(typeCount).sort((a, b) => b[1] - a[1]).slice(0, 2)
        .map(([t]) => EXAM_TYPE_LABEL[t] || t);

    const withParziali = list.filter(r => r.parziali === 'si' || r.parziali === 'no');
    const parzialiSi = withParziali.filter(r => r.parziali === 'si').length;
    const parzialiTxt = withParziali.length
        ? `${Math.round(parzialiSi / withParziali.length * 100)}% sì`
        : 'n.d.';

    const dots = [1, 2, 3, 4, 5].map(i =>
        `<span class="diff-dot ${i <= Math.round(avg) ? 'on' : ''}"></span>`).join('');

    // Distribuzione dei voti di difficoltà, in percentuale
    const pct = n => Math.round(n / list.length * 100);
    const distribution = [5, 4, 3, 2, 1].map(v => {
        const p = pct(list.filter(r => r.difficulty === v).length);
        return `<div class="exam-dist-row">
            <span class="exam-dist-label">${v} · ${DIFFICULTY_LABEL[v]}</span>
            <span class="exam-dist-bar"><span style="width:${p}%"></span></span>
            <span class="exam-dist-pct">${p}%</span>
        </div>`;
    }).join('');

    const typeShare = Object.entries(typeCount).sort((a, b) => b[1] - a[1])
        .map(([t, n]) => `${EXAM_TYPE_LABEL[t] || escapeHTML(t)} ${pct(n)}%`).join(' · ');

    box.innerHTML = `
        <div class="exam-summary">
            <div class="exam-stat">
                <span class="exam-stat-label">Difficoltà</span>
                <span class="exam-stat-value">${avg.toFixed(1)}<small>/5</small></span>
                <span class="diff-dots" aria-hidden="true">${dots}</span>
            </div>
            <div class="exam-stat">
                <span class="exam-stat-label">Ore di studio</span>
                <span class="exam-stat-value">${hours || '—'}<small>${hours ? ' h' : ''}</small></span>
                <span class="exam-stat-note">valore tipico</span>
            </div>
            <div class="exam-stat">
                <span class="exam-stat-label">Prova</span>
                <span class="exam-stat-value exam-stat-text">${topTypes.join(' + ') || '—'}</span>
                <span class="exam-stat-note">Parziali: ${parzialiTxt}</span>
            </div>
        </div>
        <div class="exam-dist" aria-label="Distribuzione della difficoltà">${distribution}</div>
        ${typeShare ? `<p class="exam-types-share">Tipo di prova: ${typeShare}</p>` : ''}
        <p class="exam-basis">Basato su ${list.length} ${list.length === 1 ? 'recensione' : 'recensioni'}${reviewState.scope === 'mine' ? ' del tuo ateneo' : ''}${docenteBasisText()}.</p>`;
}

function renderReviewList() {
    const box = document.getElementById('exam-reviews');
    if (!box) return;
    const list = filteredReviews().sort((a, b) => {
        if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
        const ta = a.updatedAt && a.updatedAt.toMillis ? a.updatedAt.toMillis() : 0;
        const tb = b.updatedAt && b.updatedAt.toMillis ? b.updatedAt.toMillis() : 0;
        return tb - ta;
    });

    if (!list.length) {
        // Se il filtro docente non dà risultati, il modo più utile è toglierlo
        if (reviewState.docente) {
            box.innerHTML = `<div class="session-empty">
                <p>Nessuna recensione con questo filtro.</p>
                <small>Prova a guardare tutte le edizioni dell'esame.</small>
                <div style="margin-top:12px"><button class="btn btn-secondary btn-sm" onclick="setReviewDocente('')">Mostra tutti i docenti</button></div>
            </div>`;
            return;
        }
        const cta = canWriteReviews()
            ? `<button class="btn btn-primary btn-sm" onclick="openReviewForm()">Scrivi la prima</button>`
            : '';
        const where = reviewState.scope === 'mine' ? ' per il tuo ateneo' : '';
        box.innerHTML = `<div class="session-empty">
            <p>Ancora nessuna recensione${where}.</p>
            <small>${canWriteReviews() ? "Hai già dato questo esame? Racconta com'è: aiuti chi lo deve preparare." : "Le recensioni vengono scritte da chi ha già sostenuto l'esame."}</small>
            ${cta ? `<div style="margin-top:12px">${cta}</div>` : ''}
        </div>`;
        return;
    }

    box.innerHTML = list.map(r => {
        const mine = r.uid === state.firebaseUid;
        const types = (r.examTypes || []).map(t => `<span class="review-tag">${EXAM_TYPE_LABEL[t] || escapeHTML(t)}</span>`).join('');
        const parz = r.parziali === 'si' ? '<span class="review-tag">Con parziali</span>'
                   : r.parziali === 'no' ? '<span class="review-tag">Senza parziali</span>' : '';
        // Recensioni vecchie o di chi non ricordava: restano valide, senza etichetta piena
        const prof = docenteLabel(r);
        const profTag = prof
            ? `<span class="review-tag review-tag-prof">${escapeHTML(prof)}</span>`
            : `<span class="review-tag review-tag-prof is-empty">Docente non indicato</span>`;
        return `
        <article class="review ${mine ? 'is-mine' : ''}">
            <header class="review-head">
                <span class="review-avatar" aria-hidden="true">${avatarFor(r.uid)}</span>
                <div class="review-who">
                    <span class="review-author">${escapeHTML(r.authorName || 'Studente')}${mine ? ' <span class="student-you">(tu)</span>' : ''}</span>
                    <span class="review-meta">Sostenuto nel ${r.year || '—'}${reviewState.scope === 'all' && r.uni ? ' · ' + escapeHTML(r.uni) : ''}</span>
                </div>
                <span class="review-diff diff-${r.difficulty}">${r.difficulty}/5 · ${DIFFICULTY_LABEL[r.difficulty] || ''}</span>
            </header>
            <div class="review-tags">
                ${profTag}<span class="review-tag">${r.hours} ore</span>${types}${parz}
            </div>
            ${r.material ? `<div class="review-block"><strong>Cosa è servito</strong><p>${escapeHTML(r.material)}</p></div>` : ''}
            ${r.tip ? `<div class="review-block"><strong>Consiglio</strong><p>${escapeHTML(r.tip)}</p></div>` : ''}
            <footer class="review-foot">
                ${mine
                    ? `<button class="review-link" onclick="openReviewForm()">Modifica</button>`
                    : `<button class="review-link" onclick="doReportReview('${r.id}')">Segnala</button>`}
            </footer>
        </article>`;
    }).join('');
}

/* --- Modulo --- */

function setReviewDifficulty(v) {
    reviewState.difficulty = v;
    document.querySelectorAll('#review-difficulty button').forEach(b => {
        const on = +b.dataset.v === v;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
}

function openReviewForm() {
    if (!requireAccount('scrivere una recensione')) return;
    if (!canWriteReviews()) {
        showNotification("Le recensioni d'esame possono scriverle solo gli studenti universitari.");
        return;
    }
    if (!state.playerUni) {
        showNotification("Prima aggiungi il tuo ateneo: la recensione vale per il corso di quell'ateneo.");
        openProfileEditor('pe-uni');
        return;
    }
    const lobby = resolveLobby(reviewState.lobbyId || state.currentLobby);
    if (!lobby) return;

    document.getElementById('review-subject').textContent =
        `${lobby.name}${state.playerUni ? ' · ' + state.playerUni : ''}`;

    // Anni: dal corrente indietro di 8
    const yearSel = document.getElementById('review-year');
    const now = new Date().getFullYear();
    yearSel.innerHTML = Array.from({ length: 9 }, (_, i) => now - i)
        .map(y => `<option value="${y}">${y}</option>`).join('');

    // Precompilo se ho già scritto una recensione su questo esame
    const mine = reviewState.list.find(r => r.uid === state.firebaseUid);
    setReviewDifficulty(mine ? mine.difficulty : 0);
    document.getElementById('review-hours').value = mine ? mine.hours : '';
    document.getElementById('review-docente').value = mine ? (mine.docente || '') : '';
    yearSel.value = mine ? String(mine.year) : String(now);
    document.querySelectorAll('#review-types input').forEach(cb => {
        cb.checked = !!(mine && (mine.examTypes || []).includes(cb.value));
    });
    document.querySelectorAll('input[name="review-parziali"]').forEach(rb => {
        rb.checked = rb.value === (mine ? mine.parziali : 'nonso');
    });
    document.getElementById('review-material').value = mine ? (mine.material || '') : '';
    document.getElementById('review-tip').value = mine ? (mine.tip || '') : '';
    document.getElementById('review-delete').hidden = !mine;
    checkPersonMention();

    openModal('review');
}

// Avviso gentile se il testo sembra parlare di una persona: non blocca
// (dire "il prof dà gli esercizi del libro" va bene), ma ricorda la regola.
const PERSON_HINT = /\b(prof|professore|professoressa|docente|assistente|tutor|lui|lei)\b/i;
function checkPersonMention() {
    const text = (document.getElementById('review-material').value || '') + ' ' +
                 (document.getElementById('review-tip').value || '');
    const warn = document.getElementById('review-warn');
    if (warn) warn.hidden = !PERSON_HINT.test(normalizeText(text));
}

async function submitReview() {
    const lobbyId = reviewState.lobbyId || state.currentLobby;
    const difficulty = reviewState.difficulty;
    const hours = parseInt(document.getElementById('review-hours').value, 10);
    const year = parseInt(document.getElementById('review-year').value, 10);
    const examTypes = [...document.querySelectorAll('#review-types input:checked')].map(i => i.value);
    const parzialiEl = document.querySelector('input[name="review-parziali"]:checked');
    const material = document.getElementById('review-material').value.trim();
    const tip = document.getElementById('review-tip').value.trim();
    const docente = cleanDocente(document.getElementById('review-docente').value);

    if (!difficulty) { showNotification('Indica quanto è difficile l\'esame.'); return; }
    if (!hours || hours < 1 || hours > 1000) { showNotification('Indica le ore di studio (tra 1 e 1000).'); document.getElementById('review-hours').focus(); return; }
    if (!examTypes.length) { showNotification('Scegli almeno un tipo di prova.'); return; }
    if (!material && !tip) { showNotification('Scrivi almeno cosa ti è servito o un consiglio.'); document.getElementById('review-material').focus(); return; }

    const isNew = !reviewState.list.some(r => r.uid === state.firebaseUid);

    const ok = await saveReview(lobbyId, {
        difficulty, hours, year, examTypes,
        parziali: parzialiEl ? parzialiEl.value : 'nonso',
        material: material.slice(0, 800),
        tip: tip.slice(0, 800),
        docente: docente,
        uni: (state.playerUni || '').slice(0, 120),
        uniKey: uniKey(state.playerUni)
    });

    if (!ok) { showNotification('Non riesco a pubblicare la recensione. Riprova tra poco.'); return; }

    closeModal('review');
    if (ok === 'senza-docente' && docente) {
        showNotification('Recensione pubblicata, ma il docente non è stato salvato. Riprova più tardi ad aggiungerlo.');
    } else {
        showNotification(isNew ? '📋 Recensione pubblicata. Grazie, aiuti chi viene dopo!' : 'Recensione aggiornata.');
    }
    // XP una sola volta per esame, anche se la cancello e la riscrivo
    const reviewed = state.reviewedLobbies || [];
    if (isNew && !reviewed.includes(lobbyId)) {
        state.reviewedLobbies = [...reviewed, lobbyId];
        addXP(30, 'Recensione d\'esame');
        bumpStat('reviewsWritten');
    }
    const lobby = resolveLobby(lobbyId);
    if (lobby) renderExamSection(lobby);
}

async function deleteMyReview() {
    const lobbyId = reviewState.lobbyId || state.currentLobby;
    if (!confirm('Vuoi eliminare la tua recensione su questo esame?')) return;
    const ok = await deleteReview(lobbyId);
    if (!ok) { showNotification('Non riesco a eliminarla. Riprova.'); return; }
    closeModal('review');
    showNotification('Recensione eliminata.');
    const lobby = resolveLobby(lobbyId);
    if (lobby) renderExamSection(lobby);
}

async function doReportReview(reviewId) {
    const reason = prompt(
        'Perché segnali questa recensione?\n\nEs: parla di una persona, è offensiva, contiene informazioni false o dati personali.'
    );
    if (reason === null) return;                  // annullato
    const ok = await reportReview(reviewId, reason);
    if (!ok) { showNotification('Segnalazione non inviata. Riprova.'); return; }
    // La nascondo subito a chi ha segnalato
    const r = reviewState.list.find(x => x.id === reviewId);
    if (r) r.reportedBy = [...(r.reportedBy || []), state.firebaseUid];
    renderExamSummary();
    renderReviewList();
    showNotification('Grazie, la valuteremo. Non vedrai più questa recensione.');
}

/* =============================================
   SESSIONI PROGRAMMATE
   ============================================= */

let upcomingSessions = [];
let sessionReminders = {};

function openNewSession() {
    if (!requireAccount('programmare una sessione')) return;
    // Il modulo vive nella pagina Insieme; se arrivo da una materia la preseleziono
    const fromLobby = state.currentLobby;
    if (state.currentPage !== 'insieme') navigate('insieme');
    const sel = document.getElementById('session-lobby');
    if (sel) {
        // I miei esami in cima, poi i gruppi, poi il resto
        const mieiIds = (state.playerCorso && CORSI_ESAMI[state.playerCorso]) ? CORSI_ESAMI[state.playerCorso] : [];
        const miei = LOBBIES.filter(l => mieiIds.includes(l.id));
        const altre = LOBBIES.filter(l => !mieiIds.includes(l.id));
        let html = '';
        if (myGroups.length) {
            html += '<optgroup label="I tuoi gruppi">' +
                myGroups.map(g => `<option value="group_${g.id}">👥 ${escapeHTML(g.name)}</option>`).join('') +
                '</optgroup>';
        }
        if (miei.length) {
            html += '<optgroup label="I tuoi esami">' +
                miei.map(l => `<option value="${l.id}">${l.name}</option>`).join('') + '</optgroup>';
        }
        html += '<optgroup label="Tutte le materie">' +
            altre.map(l => `<option value="${l.id}">${l.name}</option>`).join('') + '</optgroup>';
        sel.innerHTML = html;
        if (fromLobby) sel.value = fromLobby;
    }

    // Default: oggi (o domani se è tardi)
    const d = new Date();
    if (d.getHours() >= 21) d.setDate(d.getDate() + 1);
    const dateEl = document.getElementById('session-date');
    if (dateEl) dateEl.value = d.toISOString().slice(0, 10);

    openModal('session');
}

async function doCreateSession() {
    const lobbyId = document.getElementById('session-lobby').value;
    const date = document.getElementById('session-date').value;
    const time = document.getElementById('session-time').value;
    const note = document.getElementById('session-note').value.trim();

    if (!lobbyId || !date || !time) { showNotification('Scegli materia, giorno e ora.'); return; }

    const startAt = new Date(`${date}T${time}`).getTime();
    if (isNaN(startAt)) { showNotification('Data o ora non valide.'); return; }
    if (startAt < Date.now() - 60000) { showNotification('Scegli un orario futuro.'); return; }

    const lobby = resolveLobby(lobbyId);
    const name = lobby ? lobby.name : 'Studio';

    const id = await createSession(lobbyId, name, startAt, note);
    if (!id) return;

    document.getElementById('session-note').value = '';
    closeModal('session');
    showNotification('📅 Sessione programmata!');
    addXP(15, 'Sessione programmata');
    askNotificationPermission();
    await refreshSessions();
}

async function refreshSessions() {
    if (typeof loadUpcomingSessions !== 'function' || !state.firebaseUid) return;
    upcomingSessions = await loadUpcomingSessions();
    renderSessions();
    scheduleReminders();
}

function formatWhen(ts) {
    const d = new Date(ts);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
    const isTomorrow = d.toDateString() === tomorrow.toDateString();
    const hh = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    if (sameDay) return 'Oggi alle ' + hh;
    if (isTomorrow) return 'Domani alle ' + hh;
    return d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' }) + ' alle ' + hh;
}

function renderSessions() {
    renderHomeSessions();
    const section = document.getElementById('sessions-section');
    const list = document.getElementById('sessions-list');
    if (!section || !list) return;

    if (!state.setupDone) { section.style.display = 'none'; return; }
    section.style.display = 'block';

    if (!upcomingSessions.length) {
        list.innerHTML = `<div class="session-empty">
            <p>Nessuna sessione in programma.</p>
            <small>Fissane una e invita gli altri: studiare a un orario deciso funziona molto meglio.</small>
        </div>`;
        return;
    }

    list.innerHTML = upcomingSessions.map(s => {
        const joined = (s.participants || []).includes(state.firebaseUid);
        const mine = s.creatorId === state.firebaseUid;
        const n = (s.participants || []).length;
        const live = s.startAt <= Date.now();
        return `
        <div class="session-card ${live ? 'live' : ''}">
            <div class="session-when">${live ? '🔴 In corso' : formatWhen(s.startAt)}</div>
            <div class="session-main">
                <div class="session-title">${escapeHTML(s.lobbyName || 'Studio')}</div>
                ${s.note ? `<div class="session-note">${escapeHTML(s.note)}</div>` : ''}
                <div class="session-meta">da ${escapeHTML(s.creatorName || 'Studente')} · ${n} ${n === 1 ? 'partecipante' : 'partecipanti'}</div>
            </div>
            <div class="session-actions">
                ${live
                    ? `<button class="btn btn-primary btn-sm" onclick="navigate('lobby','${s.lobbyId}')">Entra</button>`
                    : joined
                        ? `<span class="session-joined">✓ Ci sei</span>`
                        : `<button class="btn btn-secondary btn-sm" onclick="doJoinSession('${s.id}')">Partecipa</button>`}
                ${mine ? `<button class="group-leave" onclick="doCancelSession('${s.id}')" title="Annulla">✕</button>` : ''}
            </div>
        </div>`;
    }).join('');
}

async function doJoinSession(id) {
    const ok = await joinSession(id);
    if (!ok) return;
    showNotification('✓ Ti sei unito alla sessione');
    addXP(5, 'Partecipazione a una sessione');
    askNotificationPermission();
    await refreshSessions();
}

async function doCancelSession(id) {
    if (!confirm('Annullare questa sessione?')) return;
    await cancelSession(id);
    await refreshSessions();
    showNotification('Sessione annullata.');
}

/* --- Promemoria (notifiche locali, nessun server) --- */

function askNotificationPermission() {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') Notification.requestPermission().catch(() => {});
}

function scheduleReminders() {
    Object.values(sessionReminders).forEach(t => clearTimeout(t));
    sessionReminders = {};

    upcomingSessions.forEach(s => {
        if (!(s.participants || []).includes(state.firebaseUid)) return;
        const lead = s.startAt - 5 * 60000 - Date.now();   // 5 minuti prima
        if (lead <= 0 || lead > 24 * 3600000) return;      // solo entro le prossime 24h
        sessionReminders[s.id] = setTimeout(() => {
            const msg = `Tra 5 minuti: ${s.lobbyName}`;
            showNotification('⏰ ' + msg);
            if ('Notification' in window && Notification.permission === 'granted') {
                try {
                    new Notification('Studyo', { body: msg, icon: 'icons/icon-192.png' });
                } catch (e) {}
            }
        }, lead);
    });
}

/* =============================================
   GRUPPI DI STUDIO PRIVATI
   ============================================= */

let myGroups = [];

function groupLobbyId(id) { return 'group_' + id; }

function openGroups() {
    if (!requireAccount('i gruppi privati')) return;
    if (state.currentPage !== 'insieme') navigate('insieme');
    renderGroupList();
    openModal('groups');
}

async function refreshGroups() {
    if (typeof loadMyGroups !== 'function' || !state.firebaseUid) return;
    myGroups = await loadMyGroups();
    renderSidebarGroups();
    renderGroupList();
}

function renderSidebarGroups() {
    renderInsiemeGroups();
    const el = document.getElementById('sidebar-groups');
    if (!el) return;

    if (!myGroups.length) {
        el.innerHTML = `<button class="nav-empty" onclick="openGroups()">Crea un gruppo e invita i tuoi amici</button>`;
        return;
    }

    el.innerHTML = myGroups.map(g => {
        const lid = groupLobbyId(g.id);
        const n = Object.keys(g.members || {}).length;
        return navSubItem('👥', g.name, lid, n, `${n} ${n === 1 ? 'membro' : 'membri'}`);
    }).join('');
}

// Voce secondaria della sidebar (materia o gruppo)
function navSubItem(icon, name, lobbyId, count, countLabel) {
    const active = state.currentPage === 'lobby' && state.currentLobby === lobbyId;
    return `<button class="nav-sub ${active ? 'active' : ''}" onclick="navigate('lobby','${lobbyId}')"${active ? ' aria-current="page"' : ''}>
        <span class="nav-sub-icon" aria-hidden="true">${icon}</span>
        <span class="nav-sub-name">${escapeHTML(name)}</span>
        ${count > 0 ? `<span class="nav-sub-count" aria-label="${countLabel}">${count}</span>` : ''}
    </button>`;
}

function renderGroupList() {
    const el = document.getElementById('group-list');
    if (!el) return;
    if (!myGroups.length) { el.innerHTML = ''; return; }

    el.innerHTML = `<div class="group-list-title">I tuoi gruppi</div>` + myGroups.map(g => `
        <div class="group-item">
            <div class="group-item-info">
                <div class="group-item-name">👥 ${escapeHTML(g.name)}</div>
                <div class="group-item-meta">${Object.keys(g.members || {}).length} membri · codice <b>${g.code}</b></div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="showInvite('${g.id}')">Invita</button>
            <button class="group-leave" onclick="doLeaveGroup('${g.id}')" title="Esci dal gruppo">✕</button>
        </div>
    `).join('');
}

async function doCreateGroup() {
    const input = document.getElementById('group-name');
    const name = (input.value || '').trim();
    if (!name) { showNotification('Dai un nome al gruppo.'); return; }
    if (!state.firebaseUid) { showNotification('Accedi per creare un gruppo.'); return; }

    const g = await createGroup(name);
    if (!g) return;
    input.value = '';
    await refreshGroups();
    closeModal('groups');
    showInvite(g.id);
    addXP(25, 'Gruppo di studio creato');
    bumpStat('groupsJoined');
}

async function doJoinGroup() {
    const input = document.getElementById('group-code');
    const code = (input.value || '').trim().toUpperCase();
    if (!code) return;

    const g = await joinGroupByCode(code);
    if (!g) return;
    input.value = '';
    await refreshGroups();
    closeModal('groups');
    if (g.already) {
        showNotification(`Sei già nel gruppo "${g.name}"`);
    } else {
        showNotification(`🎉 Sei entrato in "${g.name}"!`);
        addXP(15, 'Entrato in un gruppo');
        bumpStat('groupsJoined');
    }
    navigate('lobby', groupLobbyId(g.id));
}

async function doLeaveGroup(id) {
    const g = myGroups.find(x => x.id === id);
    if (!g) return;
    if (!confirm(`Vuoi uscire dal gruppo "${g.name}"?`)) return;
    await leaveGroup(id);
    if (state.currentLobby === groupLobbyId(id)) navigate('home');
    await refreshGroups();
    showNotification('Sei uscito dal gruppo.');
}

function inviteUrlFor(code) {
    return location.origin + location.pathname + '?join=' + code;
}

function showInvite(groupId) {
    const g = myGroups.find(x => x.id === groupId);
    if (!g) return;
    document.getElementById('invite-code').textContent = g.code;
    document.getElementById('invite-link').value = inviteUrlFor(g.code);
    openModal('invite');
}

// Copia il link dell'app (con eventuale codice invito) per riaprirlo in un browser vero
function copyAppLink() {
    const pending = localStorage.getItem('studyo_pending_join');
    const url = location.origin + location.pathname + (pending ? '?join=' + pending : '');
    const done = () => showNotification('🔗 Link copiato! Incollalo in Chrome o Safari.');
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(done).catch(() => {
            prompt('Copia questo link e aprilo nel browser:', url);
        });
    } else {
        prompt('Copia questo link e aprilo nel browser:', url);
    }
}

function copyInvite() {
    markInvited();
    const input = document.getElementById('invite-link');
    input.select();
    const done = () => showNotification('🔗 Link copiato! Incollalo dove vuoi.');
    if (navigator.clipboard) {
        navigator.clipboard.writeText(input.value).then(done).catch(() => { document.execCommand('copy'); done(); });
    } else {
        document.execCommand('copy'); done();
    }
}

function shareInvite() {
    markInvited();
    const link = document.getElementById('invite-link').value;
    const text = `Studiamo insieme su Studyo! Entra nel gruppo: ${link}`;
    if (navigator.share) {
        navigator.share({ title: 'Studyo', text }).catch(() => {});
    } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
    }
}

// Se l'utente arriva da un link d'invito (?join=CODE)
async function handleJoinFromUrl() {
    // Il codice può essere nell'URL oppure messo da parte prima del login
    const code = new URLSearchParams(location.search).get('join')
              || localStorage.getItem('studyo_pending_join');
    if (!code || !state.firebaseUid) return;

    // ripulisco URL e memoria così un refresh non ritenta
    history.replaceState({}, '', location.pathname);
    localStorage.removeItem('studyo_pending_join');

    const g = await joinGroupByCode(code);
    if (!g) return;
    await refreshGroups();
    showNotification(g.already ? `Sei già in "${g.name}"` : `🎉 Benvenuto in "${g.name}"!`);
    if (!g.already) addXP(15, 'Entrato in un gruppo');
    navigate('lobby', groupLobbyId(g.id));
}

/* =============================================
   DISPENSE — ricerca rapida su Studocu
   ============================================= */

function openDispense() {
    const lobby = LOBBIES.find(l => l.id === state.currentLobby);
    if (!lobby) {
        showNotification('Entra in una lobby per cercare le dispense.');
        return;
    }

    // Nome pulito per la ricerca: via i trattini interni e ogni parentesi
    // ("TOLC — Logica" → "TOLC Logica", "Informatica (ITIS)" → "Informatica")
    let q = lobby.name
        .replace(/^TOLC\s*—\s*/i, 'TOLC ')
        .replace(/\s*\([^)]*\)/g, '')
        .replace(/\s*\/\s*Alt\.?$/i, '')
        .trim();

    // L'ateneo aiuta a trovare gli appunti del proprio corso
    const uni = state.playerUni || '';
    const query = uni ? `${q} ${uni}` : q;

    const url = 'https://www.studocu.com/it/search?q=' + encodeURIComponent(query);
    window.open(url, '_blank', 'noopener');
    showNotification(`📄 Cerco dispense di ${q} su Studocu…`);
    addXP(5, 'Ricerca dispense');
}

/* =============================================
   MIND MAP (placeholder)
   ============================================= */

function openMindmap() {
    showNotification('🗺️ Mappe concettuali in arrivo! Prossimo aggiornamento.');
}

/* =============================================
   VIDEOCHIAMATA (Jitsi Meet embedded)
   ============================================= */

let jitsiApi = null;

function loadJitsiScript() {
    return new Promise((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) return resolve();
        const s = document.createElement('script');
        s.src = 'https://meet.jit.si/external_api.js';
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Jitsi load failed'));
        document.head.appendChild(s);
    });
}

async function openVideoCall() {
    if (!requireAccount('la videochiamata')) return;
    if (!state.currentLobby) {
        showNotification('Entra in una lobby per avviare la videochiamata.');
        return;
    }
    const lobby = LOBBIES.find(l => l.id === state.currentLobby);
    const nameEl = document.getElementById('video-lobby-name');
    if (nameEl) nameEl.textContent = lobby ? '· ' + lobby.name : '';

    openModal('video');

    const container = document.getElementById('jitsi-container');
    if (container) container.innerHTML = '<div class="jitsi-loading">Avvio videochiamata… 🎥</div>';

    try {
        await loadJitsiScript();
    } catch (e) {
        if (container) container.innerHTML = '<div class="jitsi-loading">Impossibile avviare la videochiamata. Controlla la connessione e riprova.</div>';
        return;
    }

    if (container) container.innerHTML = '';

    // One shared room per lobby (salted so randoms on the public server don't collide)
    const room = 'StudyoBeta_x7k2_' + (state.currentLobby || 'lobby');

    try {
        jitsiApi = new JitsiMeetExternalAPI('meet.jit.si', {
            roomName: room,
            parentNode: container,
            width: '100%',
            height: '100%',
            userInfo: { displayName: state.playerName || 'Studente' },
            configOverwrite: {
                prejoinPageEnabled: true,
                startWithAudioMuted: true,
                disableDeepLinking: true
            },
            interfaceConfigOverwrite: {
                MOBILE_APP_PROMO: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DISABLE_DEEP_LINKING: true
            }
        });
        jitsiApi.addEventListener('readyToClose', () => closeModal('video'));
        addXP(10, 'Videochiamata di studio');
    } catch (e) {
        if (container) container.innerHTML = '<div class="jitsi-loading">Errore videochiamata. Riprova tra poco.</div>';
    }
}

function disposeJitsi() {
    if (jitsiApi) {
        try { jitsiApi.dispose(); } catch (e) {}
        jitsiApi = null;
    }
    const c = document.getElementById('jitsi-container');
    if (c) c.innerHTML = '';
}

/* =============================================
   AI TUTOR
   ============================================= */

const AI_KEY_STORE = 'studyo_ai_key';
let aiHistory = [];

function getAIKey() { return localStorage.getItem(AI_KEY_STORE) || ''; }

function openAI() {
    if (state.currentPage === 'lobby') setLobbyTab('materiali');
    openModal('ai');
    aiHistory = [];
    refreshAIMode();
    renderAISuggestions();
}

function refreshAIMode() {
    const hasKey = !!getAIKey();
    const badge = document.getElementById('ai-mode-badge');
    const desc = document.getElementById('ai-mode-desc');
    const rm = document.getElementById('ai-key-remove');
    if (badge) {
        badge.textContent = hasKey ? 'Claude collegato' : 'Pronto';
        badge.classList.toggle('live', hasKey);
    }
    if (desc) {
        desc.textContent = hasKey
            ? 'Risposte generate da Claude con la tua chiave personale.'
            : 'Ti aiuta con definizioni, domande di ripasso e flashcard di questa materia.';
    }
    if (rm) rm.style.display = hasKey ? 'block' : 'none';
}

// Le impostazioni avanzate stanno in un <details> chiuso di default
function toggleAISettings(open) {
    const box = document.getElementById('ai-advanced');
    if (!box) return;
    box.open = typeof open === 'boolean' ? open : !box.open;
}

function saveAIKey() {
    const input = document.getElementById('ai-key-input');
    const key = (input.value || '').trim();
    if (!key) return;
    if (!key.startsWith('sk-')) {
        showNotification('La chiave non sembra valida (deve iniziare con sk-).');
        return;
    }
    localStorage.setItem(AI_KEY_STORE, key);
    input.value = '';
    toggleAISettings(false);
    refreshAIMode();
    showNotification('Chiave collegata: ora le risposte sono generate da Claude.');
}

function removeAIKey() {
    localStorage.removeItem(AI_KEY_STORE);
    refreshAIMode();
    showNotification('Chiave rimossa. Torni alla modalità base.');
}

// Suggested questions built from the lobby's real content
function renderAISuggestions() {
    const box = document.getElementById('ai-suggest');
    if (!box) return;
    const lobby = LOBBIES.find(l => l.id === state.currentLobby);
    const cards = (typeof getCards === 'function') ? getCards(state.currentLobby) : (FLASHCARDS[state.currentLobby] || []);
    const subject = lobby ? lobby.name : 'questa materia';

    const ideas = [];
    if (cards.length) ideas.push(cards[0].front);
    if (cards.length > 1) ideas.push(cards[1].front);
    ideas.push(`Spiegami ${subject} in parole semplici`);
    ideas.push(`Cosa devo ripassare per ${subject}?`);

    box.innerHTML = ideas.slice(0, 3).map(q =>
        `<button class="ai-chip" onclick="askAI(${JSON.stringify(q).replace(/"/g, '&quot;')})">${escapeHTML(q)}</button>`
    ).join('');
}

function askAI(q) {
    const input = document.getElementById('ai-input');
    if (input) input.value = q;
    sendAIMessage();
}

function aiAppend(html) {
    const chat = document.getElementById('ai-chat');
    chat.insertAdjacentHTML('beforeend', html);
    chat.scrollTop = chat.scrollHeight;
}

function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const text = input.value.trim();
    if (!text) return;

    aiAppend(`<div class="ai-message ai-user"><p>${escapeHTML(text)}</p></div>`);
    input.value = '';

    const key = getAIKey();
    if (key) {
        askClaude(text, key);
    } else {
        setTimeout(() => {
            aiAppend(`<div class="ai-message ai-bot"><p>${localTutorAnswer(text)}</p></div>`);
            addXP(5, 'Domanda all\'AI Tutor');
        }, 500 + Math.random() * 700);
    }
}

// --- Local tutor: answers from the lobby's real study material ---
function localTutorAnswer(question) {
    const lobbyId = state.currentLobby;
    const lobby = LOBBIES.find(l => l.id === lobbyId);
    const subject = lobby ? lobby.name : 'questa materia';
    const q = question.toLowerCase();

    // 1) Try to match a flashcard (real content)
    const cards = FLASHCARDS[lobbyId] || [];
    let best = null, bestScore = 0;
    const words = q.split(/[^a-zàèéìòùA-Z0-9]+/).filter(w => w.length > 3);
    cards.forEach(c => {
        const hay = (c.front + ' ' + c.back).toLowerCase();
        let score = 0;
        words.forEach(w => { if (hay.includes(w)) score++; });
        if (score > bestScore) { bestScore = score; best = c; }
    });
    if (best && bestScore > 0) {
        return `<strong>${escapeHTML(best.front)}</strong><br>${escapeHTML(best.back)}
            <span class="ai-src">dalle flashcard di ${escapeHTML(subject)}</span>`;
    }

    // 2) Try a quiz question on the same topic
    const quiz = QUIZZES[lobbyId] || [];
    const hit = quiz.find(item => words.some(w => item.question.toLowerCase().includes(w)));
    if (hit) {
        return `Su questo punto c'è una domanda d'esame tipica:<br><br>
            <strong>${escapeHTML(hit.question)}</strong><br>
            Risposta: <strong>${escapeHTML(hit.options[hit.correct])}</strong>
            <span class="ai-src">dal quiz di ${escapeHTML(subject)}</span>`;
    }

    // 3) Honest fallback + pointer to what actually exists
    const tools = [];
    if (cards.length) tools.push(`${cards.length} flashcard`);
    if (quiz.length) tools.push(`un quiz da ${quiz.length} domande`);
    const has = tools.length ? ` Per ${escapeHTML(subject)} ho ${tools.join(' e ')}: aprili dalla scheda Ripassa.` : '';

    return `Su questo non ho materiale pronto per questa materia.${has}
        <span class="ai-src">Prova a chiedere una definizione o un argomento del programma. Se hai una chiave API personale, la trovi tra le impostazioni avanzate qui sotto.</span>`;
}

// --- Real Claude answers (user's own API key, stays on their device) ---
async function askClaude(question, key) {
    const lobby = LOBBIES.find(l => l.id === state.currentLobby);
    const subject = lobby ? lobby.name : 'una materia universitaria';
    const level = state.playerSchool === 'superiori' ? 'studente di scuola superiore' : 'studente universitario';

    const typingId = 'ai-typing-' + Date.now();
    aiAppend(`<div class="ai-message ai-bot" id="${typingId}"><p class="ai-typing"><span></span><span></span><span></span></p></div>`);

    aiHistory.push({ role: 'user', content: question });

    try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': key,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-5',
                max_tokens: 700,
                system: `Sei il tutor di Studyo, un'app di studio italiana. Stai aiutando uno ${level} con "${subject}". Rispondi in italiano, in modo chiaro e conciso (max 150 parole), con esempi concreti. Se la domanda è vaga, chiedi una precisazione. Non inventare: se non sai, dillo.`,
                messages: aiHistory.slice(-8)
            })
        });

        const el = document.getElementById(typingId);
        if (!res.ok) {
            let msg = 'Errore ' + res.status;
            if (res.status === 401) msg = 'Chiave non valida o scaduta.';
            if (res.status === 429) msg = 'Troppe richieste, riprova tra poco.';
            if (res.status === 400) msg = 'Richiesta non accettata dall\'API.';
            if (el) el.innerHTML = `<p>⚠️ ${msg}</p>`;
            return;
        }

        const data = await res.json();
        const answer = (data.content && data.content[0] && data.content[0].text) || 'Nessuna risposta.';
        aiHistory.push({ role: 'assistant', content: answer });

        if (el) el.innerHTML = `<p>${escapeHTML(answer).replace(/\n/g, '<br>')}</p>`;
        const chat = document.getElementById('ai-chat');
        if (chat) chat.scrollTop = chat.scrollHeight;
        addXP(5, 'Domanda all\'AI Tutor');
    } catch (e) {
        const el = document.getElementById(typingId);
        if (el) el.innerHTML = `<p>⚠️ Connessione non riuscita. Controlla la rete e riprova.</p>`;
    }
}

function handleAIKey(e) {
    if (e.key === 'Enter') sendAIMessage();
}

/* =============================================
   CHALLENGES
   ============================================= */

// Challenge definitions: real goals tied to today's activity
const CHALLENGE_DEFS = [
    { id: 'maratoneta', title: '🏃 Maratoneta', desc: 'Studia 2 ore oggi', metric: 'minutes', goal: 120, xp: 200 },
    { id: 'quizmaster', title: '🧠 Quizmaster', desc: 'Completa 3 quiz', metric: 'quizzes', goal: 3, xp: 150 },
    { id: 'costanza', title: '🔥 Costanza', desc: 'Streak di 3 giorni', metric: 'streak', goal: 3, xp: 300 },
    { id: 'social', title: '💬 Social Learner', desc: 'Invia 10 messaggi', metric: 'messages', goal: 10, xp: 100 },
];

function getClaimedChallenges() {
    const key = 'studyo_claimed_' + todayStr();
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; }
}

function claimChallenge(id, xp) {
    const key = 'studyo_claimed_' + todayStr();
    const claimed = getClaimedChallenges();
    if (claimed.includes(id)) return;
    claimed.push(id);
    localStorage.setItem(key, JSON.stringify(claimed));
    const def = CHALLENGE_DEFS.find(c => c.id === id);
    addXP(xp, `Sfida completata: ${def ? def.desc : id}`);
    showNotification(`🎯 Sfida completata! +${xp} XP`);
}

function renderChallenges() {
    const list = document.getElementById('sidebar-challenges');
    if (!list) return;

    const stats = getDailyStats();
    const claimed = getClaimedChallenges();

    list.innerHTML = CHALLENGE_DEFS.map(c => {
        let current = c.metric === 'streak' ? effectiveStreak() : (stats[c.metric] || 0);
        const pct = Math.min(100, Math.round((current / c.goal) * 100));
        const isDone = current >= c.goal;
        const isClaimed = claimed.includes(c.id);

        // Auto-claim reward the moment a challenge is completed
        if (isDone && !isClaimed) {
            setTimeout(() => claimChallenge(c.id, c.xp), 50);
        }

        return `
            <div class="sidebar-challenge ${isDone ? 'completed' : ''}">
                <div class="sidebar-challenge-title">${c.title} ${isDone ? '✓' : ''}</div>
                <div class="sidebar-challenge-reward">+${c.xp} XP · <span class="challenge-count">${Math.min(current, c.goal)}/${c.goal}</span></div>
                <div class="sidebar-challenge-bar">
                    <div class="sidebar-challenge-fill" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

/* =============================================
   PROFILE
   ============================================= */

function renderProfile() {
    const levelData = getCurrentLevel();

    document.getElementById('profile-name').textContent = state.playerName || 'Studente';
    document.getElementById('profile-level').textContent = `Livello ${levelData.level}`;
    document.getElementById('profile-title').textContent = levelData.title;

    const uniLabel = document.getElementById('profile-uni-label');
    const courseLabel = document.getElementById('profile-course-label');
    if (uniLabel) {
        uniLabel.textContent = state.playerUni || state.playerScuola || '';
    }
    if (courseLabel) {
        courseLabel.textContent = state.playerCorso || state.playerTipoScuola || '';
    }

    const prevXP = levelData.level > 1 ? LEVELS[levelData.level - 2].xpNeeded : 0;
    const progress = ((state.xp - prevXP) / (levelData.xpNeeded - prevXP)) * 100;
    document.getElementById('profile-xp-fill').style.width = Math.min(progress, 100) + '%';
    document.getElementById('profile-xp-text').textContent = `${state.xp} / ${levelData.xpNeeded} XP`;

    document.getElementById('stat-hours').textContent = state.studyHours.toFixed(1);
    document.getElementById('stat-streak').textContent = effectiveStreak();
    document.getElementById('stat-quizzes').textContent = state.quizzesCompleted;
    document.getElementById('stat-pomodoros').textContent = state.pomodorosCompleted;

    const peSummary = document.getElementById('pe-summary');
    if (peSummary) peSummary.textContent = profileSummary();

    renderBadges();
    renderActivity();
}

/* --- Tracciamento dei traguardi (serve ai badge veri) --- */

function trackLobbyVisit(lobbyId) {
    if (!lobbyId) return;
    if (!Array.isArray(state.lobbiesVisited)) state.lobbiesVisited = [];
    if (!state.lobbiesVisited.includes(lobbyId)) {
        state.lobbiesVisited.push(lobbyId);
        saveState();
        checkNewBadges();
    }
}

function bumpStat(field, by = 1) {
    state[field] = (state[field] || 0) + by;
    saveState();
    checkNewBadges();
}

// Avvisa quando un badge viene sbloccato davvero
function checkNewBadges() {
    const unlocked = JSON.parse(localStorage.getItem('studyo_badges') || '[]');
    let changed = false;
    BADGES.forEach(b => {
        if (typeof b.check !== 'function') return;
        if (b.check(state) && !unlocked.includes(b.name)) {
            unlocked.push(b.name);
            changed = true;
            showNotification(`${b.icon} Badge sbloccato: ${b.name}!`);
            if (typeof celebrate === 'function') celebrate();
        }
    });
    if (changed) localStorage.setItem('studyo_badges', JSON.stringify(unlocked));
}

function renderBadges() {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;

    grid.innerHTML = BADGES.map(b => {
        const earned = typeof b.check === 'function' ? b.check(state) : false;
        let bar = '';
        if (!earned && typeof b.progress === 'function') {
            const [cur, goal] = b.progress(state);
            const pct = Math.min(100, Math.round((cur / goal) * 100));
            bar = `<div class="badge-bar"><span style="width:${pct}%"></span></div>
                   <div class="badge-progress">${Math.min(cur, goal)}/${goal}</div>`;
        }
        return `
        <div class="badge-item ${earned ? 'earned' : ''}" title="${escapeHTML(b.desc || '')}">
            <span class="badge-icon">${b.icon}</span>
            <div class="badge-name">${b.name}</div>
            ${bar}
        </div>`;
    }).join('');
}

function renderActivity() {
    const list = document.getElementById('activity-list');
    const activities = JSON.parse(localStorage.getItem('studyo_activities') || '[]').slice(-5).reverse();

    if (activities.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">Nessuna attività ancora. Inizia a studiare!</p>';
        return;
    }

    list.innerHTML = activities.map(a => `
        <div class="activity-item">
            <span class="activity-icon">${a.icon || '📌'}</span>
            <span class="activity-text">${a.text}</span>
            <span class="activity-xp">+${a.xp} XP</span>
        </div>
    `).join('');
}

/* =============================================
   XP & LEVELS
   ============================================= */

function addXP(amount, reason) {
    state.xp += amount;

    const activities = JSON.parse(localStorage.getItem('studyo_activities') || '[]');
    activities.push({
        text: reason,
        xp: amount,
        icon: amount >= 100 ? '🏆' : amount >= 50 ? '⚡' : '📌',
        time: new Date().toISOString()
    });
    localStorage.setItem('studyo_activities', JSON.stringify(activities.slice(-20)));

    const oldLevel = state.level;
    const newLevelData = getCurrentLevel();
    if (newLevelData.level > oldLevel) {
        state.level = newLevelData.level;
        showNotification(`🎉 Level Up! Sei ora ${newLevelData.title} (Livello ${newLevelData.level})`);
        if (typeof celebrate === 'function') celebrate();
    }

    updateNav();
    saveState();

    // Sync to Firestore
    if (typeof saveUserToFirestore === 'function') {
        saveUserToFirestore();
    }
}

function getCurrentLevel() {
    for (const l of LEVELS) {
        if (state.xp < l.xpNeeded) return l;
    }
    return LEVELS[LEVELS.length - 1];
}

/* =============================================
   MODALS
   ============================================= */

function openModal(name) {
    const modal = document.getElementById(`modal-${name}`);
    // Pannelli "in linea": uno solo aperto per contenitore, e ci si porta sopra
    if (modal.classList.contains('modal-inline')) {
        modal.parentElement.querySelectorAll('.modal-inline.active').forEach(m => { if (m !== modal) m.classList.remove('active'); });
        modal.classList.add('active');
        requestAnimationFrame(() => {
            modal.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            const first = modal.querySelector('input:not([type="checkbox"]):not([type="hidden"]), textarea, select');
            if (first) first.focus({ preventScroll: true });
        });
        return;
    }
    modal.classList.add('active');
}

/* Meno finestre sopra la pagina: alcune "modali" vivono dentro la pagina a cui
   appartengono. Gli id restano gli stessi, quindi openModal/closeModal non cambiano. */
const INLINE_PANELS = { 'insieme-inline': ['groups', 'session'], 'materiali-inline': ['notes', 'ai', 'editor'] };

function setupInlinePanels() {
    Object.keys(INLINE_PANELS).forEach(hostId => {
        const host = document.getElementById(hostId);
        if (!host) return;
        INLINE_PANELS[hostId].forEach(name => {
            const modal = document.getElementById('modal-' + name);
            if (!modal) return;
            modal.classList.add('modal-inline');
            host.appendChild(modal);
        });
    });
}

function closeInlinePanelsOutside(page) {
    document.querySelectorAll('.modal-inline.active').forEach(m => {
        const inPage = m.closest('.page');
        if (!inPage || inPage.id !== 'page-' + page) closeModal(m.id.replace('modal-', ''));
    });
}

function closeModal(name) {
    document.getElementById(`modal-${name}`).classList.remove('active');
    // Tear down the video call whenever its modal closes (Esc, backdrop, X, readyToClose)
    if (name === 'video' && typeof disposeJitsi === 'function') disposeJitsi();
}

// Modals that must NOT be dismissible by Esc / backdrop (login gate).
const PROTECTED_MODALS = ['auth', 'setup'];

function isProtectedModal(name) {
    if (name === 'auth' && state.guest) return false;
    return PROTECTED_MODALS.includes(name);
}

function closeTopModal() {
    // Find the last-opened active modal that is dismissible
    const active = Array.from(document.querySelectorAll('.modal.active'))
        .filter(m => !isProtectedModal(m.id.replace('modal-', '')));
    if (active.length === 0) return false;
    const top = active[active.length - 1];
    top.classList.remove('active');
    return true;
}

/* Accessibilità: gli elementi cliccabili che non sono <button> devono
   essere raggiungibili e attivabili da tastiera, altrimenti chi non usa
   il mouse (o usa uno screen reader) resta tagliato fuori. */
function makeClickablesAccessible(root) {
    (root || document).querySelectorAll('[onclick]').forEach(el => {
        const tag = el.tagName.toLowerCase();
        if (tag === 'button' || tag === 'a' || tag === 'input' || tag === 'select') return;
        if (el.dataset.a11yReady) return;

        el.dataset.a11yReady = '1';
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
        if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
        if (!el.hasAttribute('aria-label')) {
            const label = (el.getAttribute('title') || el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 80);
            if (label) el.setAttribute('aria-label', label);
        }
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });
    });
}

// Le liste vengono ridisegnate di continuo: riapplico dopo ogni render
function observeDynamicContent() {
    const targets = ['sidebar-lobbies', 'sidebar-groups', 'students-list', 'sessions-list', 'community-members', 'fp-rooms',
                     'nav-subjects', 'home-resume', 'home-subjects', 'home-sessions', 'insieme-groups', 'sidebar-challenges'];
    targets.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        new MutationObserver(() => makeClickablesAccessible(el)).observe(el, { childList: true, subtree: true });
    });
}

// Global UX: Esc closes modals, clicking the backdrop closes modals.
function setupGlobalUX() {
    makeClickablesAccessible(document);
    observeDynamicContent();
    // Esc to close the top dismissible modal (or Focus Pocus)
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        // Dal livello più in alto al più in basso
        if (closeCommandPalette()) return;
        if (closeAvatarMenu(true)) return;
        const fp = document.getElementById('focuspocus');
        if (fp && fp.classList.contains('active')) { closeFocusPocus(); return; }
        if (closeTopModal()) return;
        if (closeLobbySheet()) {
            const fab = document.getElementById('chat-fab');
            if (fab && !fab.hidden) fab.focus();
        }
    });

    // Click on backdrop (the .modal element itself, not its content) to close
    document.querySelectorAll('.modal').forEach(modal => {
        const name = modal.id.replace('modal-', '');
        modal.addEventListener('mousedown', (e) => {
            if (e.target === modal && !isProtectedModal(name)) closeModal(name);
        });
    });

    // Remove our presence when the tab closes / refreshes
    window.addEventListener('beforeunload', () => {
        if (state.currentPage === 'lobby' && typeof leaveLobby === 'function') {
            leaveLobby();
        }
    });

    // Resume the audio context on the first real user gesture (autoplay policy)
    const resumeAudio = () => {
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    };
    document.addEventListener('pointerdown', resumeAudio);
    document.addEventListener('keydown', resumeAudio);

    // Safety net: never let an unexpected error leave the user stuck silently
    let lastErrorAt = 0;
    window.addEventListener('error', (e) => {
        console.error('[Studyo]', e.message, e.filename + ':' + e.lineno);
        const now = Date.now();
        if (now - lastErrorAt < 15000) return;   // don't spam
        lastErrorAt = now;
        if (typeof showNotification === 'function') {
            showNotification('Qualcosa non ha funzionato. Se si ripete, segnalacelo da Invia feedback, nel menu del tuo account.');
        }
    });
    window.addEventListener('unhandledrejection', (e) => {
        console.error('[Studyo] promise:', e.reason);
    });
}

/* =============================================
   LEVEL-UP CELEBRATION (confetti)
   ============================================= */

function celebrate() {
    const colors = ['#C8F031', '#DDFF70', '#FF5A1F', '#FFB020', '#FFFFFF'];
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const count = 70;
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = (Math.random() * 0.6) + 's';
        piece.style.animationDuration = (1.8 + Math.random() * 1.4) + 's';
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        piece.style.width = (6 + Math.random() * 8) + 'px';
        piece.style.height = (8 + Math.random() * 10) + 'px';
        container.appendChild(piece);
    }

    setTimeout(() => container.remove(), 3600);
}

/* =============================================
   NOTIFICATIONS
   ============================================= */

// Toasts stack vertically in a fixed container (so multiple don't overlap).
function getToastStack() {
    let stack = document.getElementById('toast-stack');
    if (!stack) {
        stack = document.createElement('div');
        stack.id = 'toast-stack';
        document.body.appendChild(stack);
    }
    const isMobile = window.innerWidth <= 768;
    stack.style.cssText = isMobile ? `
        position: fixed;
        top: 16px;
        left: 16px;
        right: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 400;
        pointer-events: none;
    ` : `
        position: fixed;
        top: 80px;
        right: 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 400;
        pointer-events: none;
        max-width: 340px;
    `;
    return stack;
}

function showNotification(text) {
    const stack = getToastStack();
    const isMobile = window.innerWidth <= 768;

    const notif = document.createElement('div');
    notif.style.cssText = `
        background: var(--bg-card);
        border: 1px solid var(--primary);
        border-radius: 12px;
        padding: ${isMobile ? '14px 16px' : '14px 20px'};
        font-size: ${isMobile ? '13px' : '14px'};
        font-weight: 600;
        animation: fadeIn 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        ${isMobile ? 'text-align: center;' : ''}
        pointer-events: auto;
    `;
    notif.textContent = text;
    stack.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

/* =============================================
   AMBIENT SOUNDS (Web Audio API)
   ============================================= */

let audioCtx = null;
let soundNodes = {};

/* Real ambient audio loops (recorded files, looped) */
const SOUND_FILES = {
    rain:   'audio/rain.mp3',
    fire:   'audio/fire.mp3',
    cafe:   'audio/cafe.mp3',
    nature: 'audio/nature2.mp3',     // real birdsong forest
    white:  'audio/waterfall.mp3',   // steady waterfall (MP3, was white noise WAV)
    brown:  'audio/crickets.mp3'     // night crickets (MP3, was brown noise WAV)
};
const audioEls = {};

function getAudioEl(type) {
    if (!audioEls[type]) {
        const a = new Audio(SOUND_FILES[type]);
        a.loop = true;
        a.preload = 'none';
        audioEls[type] = a;
    }
    return audioEls[type];
}

function soundVolume() {
    return state.soundsMuted ? 0 : (state.masterVolume != null ? state.masterVolume : 0.65);
}

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function createNoiseGenerator(type) {
    const ctx = getAudioContext();
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
    } else if (type === 'brown') {
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (last + (0.02 * white)) / 1.02;
            last = data[i];
            data[i] *= 3.5;
        }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = ctx.createGain();
    gain.gain.value = (state.soundsMuted ? 0 : state.masterVolume) * gainMultiplier(type);

    if (type === 'brown') {
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        source.connect(filter);
        filter.connect(gain);
    } else {
        source.connect(gain);
    }

    gain.connect(ctx.destination);
    source.start();

    return { source, gain };
}

// --- noise buffer helper ---
function _ambBuffer(ctx, seconds, kind) {
    const len = Math.max(1, Math.floor(seconds * ctx.sampleRate));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    if (kind === 'brown') {
        let last = 0;
        for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; d[i] = (last + 0.02 * w) / 1.02; last = d[i]; d[i] *= 3.5; }
    } else {
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    return buf;
}

// Slowly modulate an AudioParam for natural ebb & flow
function _slowLFO(ctx, targetParam, baseValue, depth, rateHz) {
    const lfo = ctx.createOscillator();
    lfo.frequency.value = rateHz;
    const lg = ctx.createGain();
    lg.gain.value = depth;
    targetParam.value = baseValue;
    lfo.connect(lg); lg.connect(targetParam);
    lfo.start();
    return lfo;
}

// --- characteristic transient events (recursively self-schedule) ---
function _fireCrackle(ctx, dest, node) {
    if (node._stopped) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = _ambBuffer(ctx, 0.12, 'white');
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1000 + Math.random() * 2600;
    bp.Q.value = 1.5 + Math.random() * 2.5;
    const g = ctx.createGain();
    const peak = 0.3 + Math.random() * 0.7;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.05 + Math.random() * 0.1);
    src.connect(bp); bp.connect(g); g.connect(dest);
    src.start(t); src.stop(t + 0.3);
    node._timer = setTimeout(() => _fireCrackle(ctx, dest, node), 25 + Math.random() * 300);
}

function _birdChirp(ctx, dest, node) {
    if (node._stopped) return;
    const chirp = (delay) => {
        const t = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        osc.type = Math.random() < 0.5 ? 'sine' : 'triangle';
        const f0 = 1900 + Math.random() * 2200;
        osc.frequency.setValueAtTime(f0, t);
        osc.frequency.linearRampToValueAtTime(f0 * (1.15 + Math.random() * 0.45), t + 0.06);
        osc.frequency.linearRampToValueAtTime(f0 * 0.9, t + 0.13);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.22, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0005, t + 0.16);
        osc.connect(g); g.connect(dest);
        osc.start(t); osc.stop(t + 0.22);
    };
    chirp(0);
    if (Math.random() < 0.5) chirp(0.18 + Math.random() * 0.18); // sometimes a double-chirp
    node._timer = setTimeout(() => _birdChirp(ctx, dest, node), 700 + Math.random() * 3600);
}

function _cafeClink(ctx, dest, node) {
    if (node._stopped) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1400 + Math.random() * 2600;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.1 + Math.random() * 0.12, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0004, t + 0.12 + Math.random() * 0.12);
    osc.connect(g); g.connect(dest);
    osc.start(t); osc.stop(t + 0.32);
    node._timer = setTimeout(() => _cafeClink(ctx, dest, node), 1300 + Math.random() * 4000);
}

function createNatureSound(type) {
    const ctx = getAudioContext();
    const gain = ctx.createGain();
    gain.gain.value = (state.soundsMuted ? 0 : state.masterVolume) * gainMultiplier(type);
    gain.connect(ctx.destination);

    const node = { oscillators: [], gain, _stopped: false, _timer: null };

    // Continuous base layer through a filter chain, at a fixed sub-level
    function baseLayer(kind, filters, level) {
        const src = ctx.createBufferSource();
        src.buffer = _ambBuffer(ctx, 2, kind);
        src.loop = true;
        const bg = ctx.createGain();
        bg.gain.value = level;
        let prev = src;
        filters.forEach(f => { prev.connect(f); prev = f; });
        prev.connect(bg);
        bg.connect(gain);
        src.start();
        node.oscillators.push(src);
        return bg;
    }

    if (type === 'rain') {
        const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 350;
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 4500;
        const bg = baseLayer('white', [hp, lp], 0.7);
        node.oscillators.push(_slowLFO(ctx, bg.gain, 0.7, 0.18, 0.12)); // gentle surge
    } else if (type === 'fire') {
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 480;
        baseLayer('brown', [lp], 0.5);        // low roar
        _fireCrackle(ctx, gain, node);        // + crackles
    } else if (type === 'cafe') {
        const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 150;
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
        const bg = baseLayer('brown', [hp, lp], 0.55);  // murmur
        node.oscillators.push(_slowLFO(ctx, bg.gain, 0.55, 0.12, 0.25));
        _cafeClink(ctx, gain, node);          // + clinks
    } else if (type === 'nature') {
        const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 500;
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3500;
        const bg = baseLayer('white', [hp, lp], 0.28);  // wind / leaves
        node.oscillators.push(_slowLFO(ctx, bg.gain, 0.28, 0.12, 0.15));
        _birdChirp(ctx, gain, node);          // + bird chirps
    }

    return node;
}

function toggleSound(soundType) {
    const el = document.getElementById(`sound-${soundType}`);

    if (state.activeSounds[soundType]) {
        const a = audioEls[soundType];
        if (a) a.pause();
        delete state.activeSounds[soundType];
        if (el) el.classList.remove('active');
    } else {
        // Explicitly turning a sound on → clear global mute
        if (state.soundsMuted) {
            state.soundsMuted = false;
            const btn = document.getElementById('sound-master-btn');
            if (btn) btn.textContent = '🔇 Silenzia';
        }
        const a = getAudioEl(soundType);
        a.volume = soundVolume();
        const p = a.play();
        if (p && p.catch) p.catch(() => showNotification('🔊 Tocca di nuovo per attivare l\'audio'));
        state.activeSounds[soundType] = true;
        if (el) el.classList.add('active');
    }
    saveState();
}

// Apply current master volume (respecting mute) to every playing loop.
function applyAllGains() {
    const v = soundVolume();
    Object.keys(state.activeSounds).forEach(type => {
        const a = audioEls[type];
        if (a) a.volume = v;
    });
}

// Master button: mute/unmute all WITHOUT stopping the sources (so they resume instantly).
function toggleAllSounds() {
    const anyActive = Object.keys(state.activeSounds).length > 0;
    const btn = document.getElementById('sound-master-btn');

    if (!anyActive) {
        showNotification('🎧 Attiva prima un suono ambientale!');
        return;
    }

    state.soundsMuted = !state.soundsMuted;
    applyAllGains();

    if (btn) btn.textContent = state.soundsMuted ? '🔊 Riattiva' : '🔇 Silenzia';
    saveState();
}

function setMasterVolume(val) {
    state.masterVolume = val / 100;
    // Changing volume implicitly unmutes
    if (state.soundsMuted && state.masterVolume > 0) {
        state.soundsMuted = false;
        const btn = document.getElementById('sound-master-btn');
        if (btn) btn.textContent = '🔇 Silenzia';
    }
    applyAllGains();
    saveState();
}

/* =============================================
   COMMUNITY
   ============================================= */

// Classifica REALE del proprio ateneo/scuola: nessun profilo inventato.
let communityCache = null;

async function renderCommunity() {
    const section = document.getElementById('community-section');
    if (!section) return;

    const uniName = state.playerUni || state.playerScuola;
    if (!state.setupDone || state.guest) {
        section.style.display = 'none';
        return;
    }
    // Senza ateneo la community non ha senso: lo diciamo e portiamo al profilo
    const statsRow = section.querySelector('.community-stats-row');
    if (!uniName) {
        section.style.display = 'block';
        if (statsRow) statsRow.hidden = true;
        document.getElementById('community-name').textContent = '';
        document.getElementById('community-members').innerHTML = `<div class="empty-inline">
            <p>Aggiungi il tuo ateneo o la tua scuola per vedere chi studia con te e la classifica.</p>
            <button class="btn btn-secondary btn-sm" onclick="openProfileEditor(state.playerSchool === 'superiori' ? 'pe-scuola' : 'pe-uni')">Aggiungi</button>
        </div>`;
        return;
    }
    if (statsRow) statsRow.hidden = false;

    section.style.display = 'block';
    document.getElementById('community-name').textContent = uniName;

    const membersEl = document.getElementById('community-members');
    if (!communityCache) {
        membersEl.innerHTML = `<div class="community-loading">Carico la classifica…</div>`;
    }

    let people = [];
    if (typeof loadCommunityFromFirestore === 'function') {
        people = await loadCommunityFromFirestore();
    }
    communityCache = people;

    // Chi è online adesso, dalla presenza in tempo reale
    let onlineIds = new Set();
    if (typeof db !== 'undefined') {
        try {
            const snap = await db.collection('presence').limit(100).get();
            const now = Date.now();
            snap.docs.forEach(d => {
                const p = d.data();
                const ms = p.lastSeen && p.lastSeen.toMillis ? p.lastSeen.toMillis() : 0;
                if (!ms || (now - ms) < 120000) onlineIds.add(d.id);
            });
        } catch (e) { /* regole non ancora pubblicate: si prosegue senza */ }
    }

    // La mia posizione in classifica (serve anche al badge "Top 10")
    const myIdx = people.findIndex(p => p.id === state.firebaseUid);
    if (myIdx >= 0) {
        const rank = myIdx + 1;
        if (!state.bestRank || rank < state.bestRank) {
            state.bestRank = rank;
            saveState();
            checkNewBadges();
        }
    }
    document.getElementById('comm-total').textContent = people.length || 1;
    document.getElementById('comm-online').textContent =
        people.filter(p => onlineIds.has(p.id)).length || (onlineIds.has(state.firebaseUid) ? 1 : 0);
    document.getElementById('comm-rank').textContent = myIdx >= 0 ? '#' + (myIdx + 1) : '—';

    if (!people.length) {
        membersEl.innerHTML = `<div class="community-empty">
            <p>Sei il primo di ${escapeHTML(uniName)} su Studyo.</p>
            <small>Invita qualcuno del tuo corso: la classifica prende vita appena siete in due.</small>
        </div>`;
        return;
    }

    membersEl.innerHTML = people.slice(0, 12).map((p, i) => {
        const isMe = p.id === state.firebaseUid;
        const online = onlineIds.has(p.id);
        const corso = p.corso || p.tipoScuola || '';
        return `
        <div class="community-member ${isMe ? 'is-me' : ''}">
            <span class="community-rank">${i + 1}</span>
            <span class="community-member-avatar">${avatarFor(p.id)}</span>
            <div class="community-member-info">
                <div class="community-member-name">${escapeHTML(p.name || 'Studente')}${isMe ? ' <span class="student-you">(tu)</span>' : ''}</div>
                <div class="community-member-status ${online ? 'online' : ''}">
                    ${online ? '● Online ora' : (corso ? escapeHTML(corso) : '○ Offline')}
                </div>
            </div>
            <span class="community-member-xp">${p.xp || 0} XP</span>
        </div>`;
    }).join('');
}

/* =============================================
   FEEDBACK WIDGET
   ============================================= */

function openFeedbackWidget() {
    // Close welcome banner if open
    closeFeedbackWelcome();

    // Show a random guiding question in the modal
    const randomQ = FEEDBACK_QUESTIONS[Math.floor(Math.random() * FEEDBACK_QUESTIONS.length)];
    const hintEl = document.getElementById('feedback-question-hint');
    if (hintEl) {
        hintEl.textContent = '💡 Spunto: "' + randomQ + '"';
    }
    const textarea = document.getElementById('feedback-text');
    if (textarea) {
        textarea.placeholder = 'Scrivi il tuo pensiero...';
    }

    openModal('feedback');
}

function showFeedbackWelcome() {
    // Don't show if already dismissed this session or feedback already given
    // Una volta sola, non a ogni visita
    const dismissed = localStorage.getItem('studyo_feedback_welcome_dismissed');
    if (dismissed) return;

    // Don't show if no setup done (user hasn't logged in yet)
    if (!state.setupDone) return;

    // Don't stack on top of the onboarding tour
    const ob = document.getElementById('onboarding');
    if (ob && ob.classList.contains('active')) {
        setTimeout(showFeedbackWelcome, 8000);
        return;
    }

    const welcome = document.getElementById('feedback-welcome');
    const questionEl = document.getElementById('feedback-welcome-question');

    if (welcome && questionEl) {
        // Pick a random question to display
        const randomQ = FEEDBACK_QUESTIONS[Math.floor(Math.random() * FEEDBACK_QUESTIONS.length)];
        questionEl.textContent = '"' + randomQ + '"';

        welcome.style.display = 'block';
    }
}

function closeFeedbackWelcome() {
    const welcome = document.getElementById('feedback-welcome');
    if (welcome) {
        welcome.style.display = 'none';
    }
    localStorage.setItem('studyo_feedback_welcome_dismissed', 'true');
}

/* =============================================
   COMPATIBILITÀ: prima esisteva un menu laterale a scomparsa su mobile.
   Ora c'è la barra in basso; chi chiamava queste funzioni chiude i menu aperti.
   ============================================= */

function toggleMobileSidebar() { closeAvatarMenu(); }
function closeMobileSidebar() { closeAvatarMenu(); }

/* =============================================
   UTILS
   ============================================= */

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Deterministic emoji avatar from a seed string (stable per user).
const AVATAR_POOL = ['🎓', '😎', '👩‍🎓', '🧑‍💻', '📚', '🎯', '✨', '🔥', '💡', '🚀', '🦉', '🧠', '⭐', '🌟', '🎒'];
function avatarFor(seed) {
    let h = 0;
    const s = String(seed || 'x');
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return AVATAR_POOL[Math.abs(h) % AVATAR_POOL.length];
}

/* =============================================
   FEEDBACK
   ============================================= */

function sendFeedback() {
    if (state.guest) {
        showNotification("Dall'app il feedback si invia con un account. Senza account scrivici via email: l'indirizzo è qui sotto.");
        return;
    }
    const type = document.getElementById('feedback-type').value;
    const text = document.getElementById('feedback-text').value.trim();

    if (!text) {
        document.getElementById('feedback-text').style.borderColor = '#E17055';
        return;
    }

    // Save feedback locally (in production would go to a server)
    const feedbacks = JSON.parse(localStorage.getItem('studyo_feedbacks') || '[]');
    feedbacks.push({
        type,
        text,
        user: state.playerName,
        uni: state.playerUni || state.playerScuola,
        date: new Date().toISOString()
    });
    localStorage.setItem('studyo_feedbacks', JSON.stringify(feedbacks));

    // Save to Firestore
    if (typeof saveFeedbackToFirestore === 'function') {
        saveFeedbackToFirestore(type, text);
    }

    closeModal('feedback');
    document.getElementById('feedback-text').value = '';
    showNotification('💬 Feedback inviato! Grazie per aiutarci a migliorare.');
    addXP(25, 'Feedback inviato');
}

/* =============================================
   FOCUS POCUS — immersive focus rooms
   ============================================= */

const FOCUS_ROOMS = [
    { id: 'rain',   name: 'Biblioteca Piovosa',  emoji: '🌧️', sound: 'rain',   theme: 'rain',   desc: 'Pioggia sulla finestra, libri e silenzio.' },
    { id: 'fire',   name: 'Baita sul Fuoco',     emoji: '🔥', sound: 'fire',   theme: 'fire',   desc: 'Il crepitio del camino in una notte fredda.' },
    { id: 'cafe',   name: 'Caffè Letterario',    emoji: '☕', sound: 'cafe',   theme: 'cafe',   desc: 'Il brusio caldo di una caffetteria.' },
    { id: 'forest', name: 'Foresta Silenziosa',  emoji: '🌿', sound: 'nature', theme: 'forest', desc: 'Vento tra le foglie e canto di uccelli.' },
    { id: 'cosmos', name: 'Notte Stellata',      emoji: '🌌', sound: 'brown',  theme: 'cosmos', desc: 'Grilli sotto un cielo infinito di stelle.' },
    { id: 'void',   name: 'Cascata Zen',         emoji: '💧', sound: 'white',  theme: 'void',   desc: 'Il flusso costante dell\'acqua. Solo tu e lo studio.' },
];

const FOCUS_QUOTES = [
    'Un capitolo alla volta.',
    'La concentrazione è un superpotere.',
    'Stai costruendo il tuo futuro, adesso.',
    'Respira. Sei esattamente dove devi essere.',
    'I grandi risultati nascono da piccole sessioni.',
    'Meno distrazioni, più magia.',
    'Il momento giusto per studiare è adesso.',
    'Ogni minuto di focus conta.',
];

let fpTimer = null, fpRunning = false, fpSeconds = 25 * 60, fpTotal = 25 * 60;
let fpRoom = null, fpAudioType = null, fpSoundOn = true;

function openFocusPocus() {
    renderFocusRooms();
    document.getElementById('fp-picker').style.display = 'flex';
    document.getElementById('fp-room').style.display = 'none';
    document.getElementById('focuspocus').classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof closeMobileSidebar === 'function') closeMobileSidebar();
}

function closeFocusPocus() {
    fpStopSound();
    fpPause();
    document.getElementById('focuspocus').classList.remove('active');
    document.body.style.overflow = '';
    fpRoom = null;
}

function renderFocusRooms() {
    const el = document.getElementById('fp-rooms');
    if (!el) return;
    el.innerHTML = FOCUS_ROOMS.map(r => `
        <div class="fp-room-card fp-card-${r.theme}" onclick="enterRoom('${r.id}')">
            <span class="fp-room-card-emoji">${r.emoji}</span>
            <span class="fp-room-card-name">${r.name}</span>
            <span class="fp-room-card-desc">${r.desc}</span>
        </div>
    `).join('');
}

function enterRoom(id) {
    fpRoom = FOCUS_ROOMS.find(r => r.id === id);
    if (!fpRoom) return;
    document.getElementById('fp-picker').style.display = 'none';
    const room = document.getElementById('fp-room');
    room.style.display = 'flex';
    const scene = document.getElementById('fp-scene');
    scene.className = 'fp-scene fp-scene-' + fpRoom.theme;
    generateParticles(scene, fpRoom.theme);
    document.getElementById('fp-room-name').textContent = fpRoom.emoji + '  ' + fpRoom.name;
    document.getElementById('fp-quote').textContent = '“' + FOCUS_QUOTES[Math.floor(Math.random() * FOCUS_QUOTES.length)] + '”';
    fpResetTimer();
    fpSoundOn = true;
    const sbtn = document.getElementById('fp-sound-btn');
    if (sbtn) sbtn.textContent = '🔊 Suono';
    fpPlaySound(fpRoom.sound);
}

function exitRoom() {
    fpStopSound();
    fpPause();
    document.getElementById('fp-room').style.display = 'none';
    document.getElementById('fp-picker').style.display = 'flex';
}

/* --- Focus Pocus sound (reuses the file-based audio players) --- */
function fpPlaySound(type) {
    // Stop any lobby ambient sounds to avoid overlap
    if (typeof audioEls !== 'undefined') {
        Object.keys(state.activeSounds || {}).forEach(t => { const a = audioEls[t]; if (a) a.pause(); });
        state.activeSounds = {};
        document.querySelectorAll('.sound-item.active').forEach(e => e.classList.remove('active'));
    }
    fpStopSound();
    if (!fpSoundOn) return;
    const a = getAudioEl(type);
    a.volume = (state.masterVolume != null ? state.masterVolume : 0.65);
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
    fpAudioType = type;
}

function fpStopSound() {
    if (fpAudioType && typeof audioEls !== 'undefined') {
        const a = audioEls[fpAudioType];
        if (a) a.pause();
    }
    fpAudioType = null;
}

function fpToggleSound() {
    fpSoundOn = !fpSoundOn;
    const btn = document.getElementById('fp-sound-btn');
    if (fpSoundOn && fpRoom) {
        fpPlaySound(fpRoom.sound);
        if (btn) btn.textContent = '🔊 Suono';
    } else {
        fpStopSound();
        if (btn) btn.textContent = '🔇 Muto';
    }
}

/* --- Focus Pocus timer --- */
function fpSetTime(min) {
    if (fpRunning) return;
    fpTotal = min * 60;
    fpSeconds = min * 60;
    fpUpdateDisplay();
    document.querySelectorAll('.fp-time-btn').forEach(b => b.classList.toggle('active', +b.dataset.min === min));
}

function fpToggle() { fpRunning ? fpPause() : fpStart(); }

function fpStart() {
    fpRunning = true;
    const b = document.getElementById('fp-start');
    if (b) b.textContent = '⏸ Pausa';
    document.getElementById('fp-room').classList.add('fp-running');
    fpTimer = setInterval(() => {
        fpSeconds--;
        if (fpSeconds <= 0) { fpComplete(); return; }
        fpUpdateDisplay();
    }, 1000);
}

function fpPause() {
    fpRunning = false;
    clearInterval(fpTimer);
    const b = document.getElementById('fp-start');
    if (b) b.textContent = '▶ Riprendi';
    const room = document.getElementById('fp-room');
    if (room) room.classList.remove('fp-running');
}

function fpResetTimer() {
    fpPause();
    fpSeconds = fpTotal;
    const b = document.getElementById('fp-start');
    if (b) b.textContent = '▶ Inizia';
    fpUpdateDisplay();
}

function fpUpdateDisplay() {
    const m = Math.floor(fpSeconds / 60), s = fpSeconds % 60;
    const el = document.getElementById('fp-timer');
    if (el) el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function fpComplete() {
    clearInterval(fpTimer);
    fpRunning = false;
    const room = document.getElementById('fp-room');
    if (room) room.classList.remove('fp-running');
    const min = fpTotal / 60;
    state.pomodorosCompleted = (state.pomodorosCompleted || 0) + 1;
    state.studyHours = Math.round((state.studyHours + min / 60) * 100) / 100;
    if (typeof registerStudyDay === 'function') registerStudyDay();
    if (typeof bumpDailyStat === 'function') { bumpDailyStat('pomodoros'); bumpDailyStat('minutes', min); }
    const xp = min >= 25 ? 75 : 30;
    addXP(xp, `Focus Pocus: ${min} min · ${fpRoom ? fpRoom.name : ''}`);
    if (typeof celebrate === 'function') celebrate();
    showNotification(`✨ Sessione completata! +${xp} XP`);
    fpResetTimer();
}

/* --- Atmospheric particles per scene --- */
function generateParticles(scene, theme) {
    const old = scene.querySelector('.fp-particles');
    if (old) old.remove();
    const layer = document.createElement('div');
    layer.className = 'fp-particles';

    let n = 0, cls = '';
    if (theme === 'cosmos')      { n = 70; cls = 'fp-star'; }
    else if (theme === 'fire')   { n = 28; cls = 'fp-ember'; }
    else if (theme === 'forest') { n = 22; cls = 'fp-firefly'; }
    else if (theme === 'rain')   { n = 50; cls = 'fp-raindrop'; }
    else if (theme === 'cafe')   { n = 8;  cls = 'fp-steam'; }
    else                         { n = 14; cls = 'fp-dust'; }

    for (let i = 0; i < n; i++) {
        const p = document.createElement('div');
        p.className = 'fp-particle ' + cls;
        p.style.left = Math.random() * 100 + '%';
        if (cls === 'fp-raindrop') {
            p.style.top = '-10%';
            p.style.animationDelay = (Math.random() * 1.2) + 's';
            p.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
            p.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
        } else {
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = (Math.random() * 6) + 's';
            p.style.animationDuration = (3 + Math.random() * 6) + 's';
        }
        if (cls === 'fp-star') {
            const s = (1 + Math.random() * 2).toFixed(1);
            p.style.width = s + 'px';
            p.style.height = s + 'px';
        }
        layer.appendChild(p);
    }
    scene.appendChild(layer);
}

/* =============================================
   SHELL — navigazione, home, pagina materia, ricerca rapida
   ============================================= */

function isNarrowScreen() {
    return window.matchMedia('(max-width: 900px)').matches;
}

function safeStorageGet(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; }
}
function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage bloccato: pazienza */ }
}

function onlineLabel(n) {
    if (n <= 0) return 'Nessuno online';
    return n === 1 ? '1 online' : `${n} online`;
}

function formatAgo(ts) {
    if (!ts) return '';
    const min = Math.round((Date.now() - ts) / 60000);
    if (min < 2) return 'poco fa';
    if (min < 60) return `${min} minuti fa`;
    const h = Math.round(min / 60);
    if (h < 24) return h === 1 ? "un'ora fa" : `${h} ore fa`;
    const d = Math.round(h / 24);
    return d === 1 ? 'ieri' : `${d} giorni fa`;
}

/* --- Le tue materie: prima quelle aperte di recente, poi il piano di studi --- */

function getMySubjects(limit) {
    let plan = [];
    if (state.playerSchool === 'superiori') {
        if (state.playerTipoScuola && typeof SCUOLE_MATERIE !== 'undefined' && SCUOLE_MATERIE[state.playerTipoScuola]) {
            plan = SCUOLE_MATERIE[state.playerTipoScuola];
        }
    } else if (state.playerCorso && CORSI_ESAMI[state.playerCorso]) {
        plan = CORSI_ESAMI[state.playerCorso];
    }
    const recent = (state.recentLobbies || []).filter(id => typeof id === 'string' && !id.startsWith('group_'));
    const ids = [...new Set([...recent, ...plan])];
    return ids.map(id => LOBBIES.find(l => l.id === id)).filter(Boolean).slice(0, limit);
}

function renderNavSubjects() {
    const el = document.getElementById('nav-subjects');
    if (!el) return;
    const list = getMySubjects(6);
    if (!list.length) {
        el.innerHTML = `<button class="nav-empty" onclick="navigate('materie')">Scegli le materie che stai preparando</button>`;
        return;
    }
    el.innerHTML = list.map(l => navSubItem(l.icon, l.name, l.id, lobbyOnline(l), onlineLabel(lobbyOnline(l)))).join('');
}

/* --- Home --- */

/* --- Modalità prova (senza account) ---
   Solo funzioni che girano sul dispositivo: timer, suoni, Focus Pocus, quiz,
   flashcard, AI Tutor di base. Niente Firebase, niente dati inviati.
   Presenza, chat, video, gruppi, sessioni, appunti e recensioni chiedono un account. */

const GUEST_KEY = 'studyo_guest';

function isGuestActive() {
    return safeStorageGet(GUEST_KEY, '0') === '1';
}

function enterGuestMode() {
    safeStorageSet(GUEST_KEY, '1');
    state.guest = true;
    if (!state.playerName) state.playerName = 'Ospite';
    saveState();
    closeModal('auth');
    applyGuestUI();
    navigate('home');
}

// Chiamata da firebase-config quando non c'è un utente ma la prova è attiva
function onGuestReady() {
    state.guest = true;
    applyGuestUI();
    if (state.currentPage === 'home') renderHome();
}

function leaveGuestMode() {
    if (!state.guest && !isGuestActive()) return;
    try { localStorage.removeItem(GUEST_KEY); } catch (e) {}
    state.guest = false;
    if (state.playerName === 'Ospite') state.playerName = '';
    const reason = document.getElementById('auth-reason');
    if (reason) reason.hidden = true;
    applyGuestUI();
}

function applyGuestUI() {
    const g = !!state.guest;
    const show = (id, visible) => { const el = document.getElementById(id); if (el) el.hidden = !visible; };
    show('guest-banner', g);
    show('menu-login', g);
    show('menu-logout', !g);
    show('profile-login', g);
    show('profile-logout', !g);
    show('guest-box', !g);      // già in prova: nella finestra di accesso resta solo "crea un account"
    show('auth-close', g);      // in prova la finestra di accesso si può chiudere

    const chat = document.getElementById('chat-input');
    if (chat) {
        chat.disabled = g;
        chat.placeholder = g ? 'Crea un account per scrivere' : 'Scrivi…';
    }
}

// Ritorna true se si può procedere; in prova apre l'accesso spiegando perché
function requireAccount(feature) {
    if (!state.guest) return true;
    const reason = document.getElementById('auth-reason');
    if (reason) {
        reason.textContent = feature
            ? `Per ${feature} serve un account: è gratis e ci vuole mezzo minuto. Se ne crei uno nuovo, i progressi fatti finora restano.`
            : 'Crea un account gratis: se è nuovo, i progressi fatti finora restano.';
        reason.hidden = false;
    }
    applyGuestUI();
    openModal('auth');
    return false;
}

// Pannello persone + chat nella stanza, in prova
function renderGuestLobbyPanels() {
    const list = document.getElementById('students-list');
    if (list) {
        list.innerHTML = `<div class="group-nudge">
            <p>Con un account vedi chi sta studiando questa materia adesso e ti vedono loro.</p>
            <button class="btn btn-secondary btn-sm" onclick="requireAccount('vedere chi studia e scrivere in chat')">Crea un account</button>
        </div>`;
    }
    const box = document.getElementById('chat-messages');
    if (box) box.innerHTML = `<div class="chat-msg-system">La chat è per chi ha un account: così sai sempre con chi stai parlando.</div>`;
    const online = document.getElementById('lobby-online');
    if (online) online.textContent = 'Crea un account per vedere chi sta studiando qui';
}

/* --- Stati vuoti ---
   Uno zero nudo comunica "qui non succede niente": finché non c'è attività
   vera mostriamo cosa fare, non una fila di numeri a zero. */

function hasStudied() {
    return (state.pomodorosCompleted || 0) + (state.quizzesCompleted || 0) > 0 || !!state.lastStudyDay;
}

// Una streak esiste solo dopo il primo giorno di studio reale
function effectiveStreak() {
    return hasStudied() ? (state.streak || 0) : 0;
}

function renderTopbarStreak() {
    const btn = document.getElementById('topbar-streak');
    const num = document.getElementById('topbar-streak-num');
    if (!btn || !num) return;
    const s = effectiveStreak();
    num.textContent = s;
    btn.classList.toggle('is-empty', s === 0);
    const label = s === 0
        ? 'Nessuna streak ancora: inizia una sessione'
        : `${s} ${s === 1 ? 'giorno' : 'giorni'} di studio consecutivi`;
    btn.setAttribute('aria-label', label);
    btn.title = label;
}

function onStreakClick() {
    if (effectiveStreak() === 0) startFirstSession(25);
    else navigate('profile');
}

function renderEmptyStates() {
    const studied = hasStudied();
    const weekEmpty = document.getElementById('week-stats-empty');
    const week = document.getElementById('week-stats');
    // Se la scheda Primi passi è aperta, l'invito c'è già: niente doppioni
    const firstStepsOpen = !state.firstStepsHidden && firstStepsStatus().some(s => !s.done);
    if (week) week.hidden = !studied;
    if (weekEmpty) weekEmpty.hidden = studied || firstStepsOpen;
    const profileEmpty = document.getElementById('profile-empty');
    if (profileEmpty) profileEmpty.hidden = studied;
}

/* --- Completa il profilo ---
   Dopo la prima sessione, un invito leggero ad aggiungere ateneo o classe. */

function missingProfileField() {
    if (!state.setupDone || state.guest) return null;
    if (state.playerSchool === 'superiori') return state.playerClasse ? null : 'classe';
    return state.playerUni ? null : 'ateneo';
}

function renderProfileNudge() {
    const box = document.getElementById('profile-nudge');
    if (!box) return;
    const missing = missingProfileField();
    if (!missing || !hasStudied() || state.profileNudgeHidden) { box.hidden = true; return; }
    const text = missing === 'ateneo'
        ? 'Aggiungi il tuo ateneo: vedi la community del tuo ateneo e le recensioni d\'esame del tuo corso.'
        : 'Aggiungi la tua classe: in quinta si sbloccano le stanze per i TOLC.';
    box.hidden = false;
    box.innerHTML = `
        <div class="pn-text"><strong>Completa il profilo</strong><span>${text}</span></div>
        <div class="pn-actions">
            <button class="btn btn-secondary btn-sm" onclick="openProfileEditor('${missing === 'ateneo' ? 'pe-uni' : 'pe-classe'}')">Completa</button>
            <button class="link-btn" onclick="hideProfileNudge()">Più tardi</button>
        </div>`;
}

function hideProfileNudge() {
    state.profileNudgeHidden = true;
    saveState();
    renderProfileNudge();
}

function profileSummary() {
    if (state.playerSchool === 'superiori') {
        const parts = [state.playerTipoScuola, state.playerScuola, state.playerClasse ? state.playerClasse + '° anno' : ''].filter(Boolean);
        return parts.join(' · ') || 'Scuola superiore';
    }
    const parts = [state.playerCorso, state.playerUni].filter(Boolean);
    return parts.join(' · ') || 'Università';
}

// Le opzioni dei corsi e delle scuole esistono già nel modulo di registrazione: le riuso
function fillProfileSelect(targetId, sourceId, value) {
    const target = document.getElementById(targetId);
    const source = document.getElementById(sourceId);
    if (!target || !source) return;
    if (!target.options.length) target.innerHTML = source.innerHTML;
    target.value = value || '';
}

function togglePeSchool() {
    const sup = document.getElementById('pe-school').value === 'superiori';
    document.getElementById('pe-uni-group').hidden = sup;
    document.getElementById('pe-sup-group').hidden = !sup;
}

function toggleProfileEditor(force) {
    const form = document.getElementById('pe-form');
    const btn = document.getElementById('pe-toggle');
    if (!form || !btn) return;
    const open = typeof force === 'boolean' ? force : form.hidden;
    if (open) {
        document.getElementById('pe-name').value = state.playerName || '';
        document.getElementById('pe-school').value = state.playerSchool === 'superiori' ? 'superiori' : 'universita';
        document.getElementById('pe-uni').value = state.playerUni || '';
        document.getElementById('pe-scuola').value = state.playerScuola || '';
        document.getElementById('pe-classe').value = state.playerClasse || '';
        fillProfileSelect('pe-corso', 'setup-corso', state.playerCorso);
        fillProfileSelect('pe-tipo', 'setup-tipo-scuola', state.playerTipoScuola);
        togglePeSchool();
    }
    form.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.hidden = open;
}

function openProfileEditor(focusId) {
    navigate('profile');
    toggleProfileEditor(true);
    const el = document.getElementById(focusId || 'pe-name');
    if (el) {
        el.scrollIntoView({ block: 'center' });
        el.focus();
    }
}

function saveProfileEdits() {
    const name = document.getElementById('pe-name').value.trim().slice(0, 40);
    if (!name) { showNotification('Il nome non può restare vuoto.'); document.getElementById('pe-name').focus(); return; }

    const school = document.getElementById('pe-school').value;
    state.playerName = name;
    state.playerSchool = school;
    if (school === 'universita') {
        state.playerUni = document.getElementById('pe-uni').value.trim().slice(0, 120);
        state.playerCorso = document.getElementById('pe-corso').value;
    } else {
        state.playerTipoScuola = document.getElementById('pe-tipo').value;
        state.playerScuola = document.getElementById('pe-scuola').value.trim().slice(0, 120);
        state.playerClasse = document.getElementById('pe-classe').value;
    }
    saveState();
    if (typeof saveUserToFirestore === 'function') saveUserToFirestore();

    communityCache = null;
    toggleProfileEditor(false);
    renderProfile();
    renderLobbies(currentLobbyFilter);
    renderNavSubjects();
    updateNav();
    showNotification('Profilo aggiornato.');
}

/* --- Primi passi ---
   Sostituisce il vecchio tour a slide (che andava "saltato"): tre azioni vere,
   ognuna si spunta quando la fai davvero e lascia un risultato visibile. */

function markInvited() {
    if (state.invitedOnce) return;
    state.invitedOnce = true;
    saveState();
    if (state.currentPage === 'home') renderFirstSteps();
}

function firstStepsStatus() {
    return [
        {
            id: 'lobby',
            done: (state.lobbiesVisited || []).length > 0,
            title: 'Entra nella stanza di una materia',
            text: 'Vedi chi la sta preparando e cosa trovi dentro.',
            actions: `<button class="btn btn-secondary btn-sm" onclick="goToFirstLobby()">Scegli una materia</button>`
        },
        {
            id: 'session',
            done: (state.pomodorosCompleted || 0) > 0,
            title: 'Completa la tua prima sessione',
            text: 'Alla fine guadagni XP e parte la tua streak.',
            actions: `<button class="btn btn-primary btn-sm" onclick="startFirstSession(25)">Inizia 25 minuti</button>
                      <button class="link-btn" onclick="startFirstSession(5)">Prova con 5</button>`
        },
        {
            id: 'friend',
            done: !!state.invitedOnce || (state.groupsJoined || 0) > 0,
            title: 'Studia con qualcuno',
            text: state.guest
                ? 'Con un account crei un gruppo privato e inviti i tuoi compagni con un link.'
                : 'Crea un gruppo privato e manda il link a un compagno di corso.',
            actions: state.guest
                ? `<button class="btn btn-secondary btn-sm" onclick="requireAccount('Gruppi')">Crea un account</button>`
                : `<button class="btn btn-secondary btn-sm" onclick="openGroups()">Crea un gruppo</button>`
        }
    ];
}

function renderFirstSteps() {
    const box = document.getElementById('first-steps');
    if (!box) return;
    if (state.firstStepsHidden) { box.hidden = true; return; }

    const steps = firstStepsStatus();
    const done = steps.filter(s => s.done).length;

    if (done === steps.length) {
        box.hidden = false;
        box.className = 'first-steps is-complete';
        box.innerHTML = `
            <div class="fs-complete">
                <span class="fs-check" aria-hidden="true"></span>
                <div>
                    <h2 id="first-steps-title">Primi passi completati</h2>
                    <p>Hai visto una stanza, chiuso una sessione e portato qualcuno con te. Da qui in poi conta la costanza.</p>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="hideFirstSteps()">Chiudi</button>
            </div>`;
        return;
    }

    // La prima azione non ancora fatta è quella "attiva"
    const nextId = (steps.find(s => !s.done) || {}).id;
    box.hidden = false;
    box.className = 'first-steps';
    box.innerHTML = `
        <div class="fs-head">
            <div>
                <h2 id="first-steps-title">Primi passi</h2>
                <p class="fs-sub">${done} di ${steps.length} fatti</p>
            </div>
            <button class="link-btn" onclick="hideFirstSteps()">Nascondi</button>
        </div>
        <div class="fs-bar" aria-hidden="true"><span style="transform:scaleX(${(done / steps.length).toFixed(3)})"></span></div>
        <ol class="fs-list">
            ${steps.map((s, i) => `
            <li class="fs-item ${s.done ? 'is-done' : ''} ${s.id === nextId ? 'is-next' : ''}">
                <span class="fs-num" aria-hidden="true">${s.done ? '' : i + 1}</span>
                <div class="fs-body">
                    <strong>${s.title}${s.done ? '<span class="sr-only"> (fatto)</span>' : ''}</strong>
                    <span>${s.text}</span>
                    ${!s.done && s.id === nextId ? `<div class="fs-actions">${s.actions}</div>` : ''}
                </div>
            </li>`).join('')}
        </ol>`;
}

function hideFirstSteps() {
    state.firstStepsHidden = true;
    saveState();
    renderFirstSteps();
}

// Porta nella materia più probabile: l'ultima aperta o la prima del piano di studi
function firstLobbyId() {
    const recent = (state.recentLobbies || []).find(id => resolveLobby(id));
    if (recent) return recent;
    const mine = getMySubjects(1)[0];
    return mine ? mine.id : null;
}

function goToFirstLobby() {
    const id = firstLobbyId();
    if (id) navigate('lobby', id);
    else navigate('materie');
}

function startFirstSession(minutes) {
    const id = firstLobbyId();
    if (!id) {
        navigate('materie');
        showNotification('Scegli la materia che stai preparando: il timer parte da lì.');
        return;
    }
    if (state.currentPage !== 'lobby' || state.currentLobby !== id) navigate('lobby', id);
    setLobbyTab('studia');
    if (state.timerRunning) return;
    setPomodoro(minutes);
    startTimer();
    showNotification(minutes >= 25 ? '▶ 25 minuti: si parte.' : '▶ 5 minuti di prova: si parte.');
}

function renderHome() {
    updateNav();
    renderFirstSteps();
    renderProfileNudge();
    renderHomeResume();
    renderHomeSubjects();
    renderHomeSessions();
    renderChallenges();
    renderNavSubjects();
}

function renderHomeResume() {
    const box = document.getElementById('home-resume');
    if (!box) return;
    // Non ridisegno mentre l'utente sta scrivendo nella ricerca
    if (document.activeElement && document.activeElement.id === 'home-search') return;

    const last = (state.recentLobbies || []).map(id => resolveLobby(id)).find(Boolean);
    // Un solo pulsante lime per schermata: se i Primi passi sono aperti, comandano loro
    const ctaClass = (!state.firstStepsHidden && firstStepsStatus().some(s => !s.done)) ? 'btn-secondary' : 'btn-primary';

    if (last) {
        const n = lobbyOnline(last);
        const people = n > 0 ? `<span class="live-pill"><span class="live-dot"></span>${n === 1 ? '1 persona sta studiando' : `${n} persone stanno studiando`}</span>` : '';
        box.className = 'hero-card';
        box.innerHTML = `
            <div class="hero-text">
                <span class="eyebrow">Riprendi</span>
                <h2><span aria-hidden="true">${last.icon}</span> ${escapeHTML(last.name)}</h2>
                <p>${people}${state.lastLobbyAt ? `<span>Ultima volta ${formatAgo(state.lastLobbyAt)}</span>` : ''}</p>
            </div>
            <button class="btn ${ctaClass} btn-large hero-cta" onclick="navigate('lobby','${last.id}')">
                Entra e studia <svg class="ic ic-sm" aria-hidden="true"><use href="#i-arrow-right"/></svg>
            </button>`;
        return;
    }

    const suggestions = getMySubjects(4);
    box.className = 'hero-card hero-card-start';
    box.innerHTML = `
        <div class="hero-text">
            <span class="eyebrow">Inizia</span>
            <h2>Cosa studi oggi?</h2>
        </div>
        <form class="hero-search" onsubmit="event.preventDefault();goToCatalogSearch(document.getElementById('home-search').value)">
            <svg class="ic" aria-hidden="true"><use href="#i-search"/></svg>
            <input type="search" id="home-search" placeholder="Es. Analisi 1, Diritto privato…" aria-label="Cerca una materia" autocomplete="off">
            <button type="submit" class="btn ${ctaClass}">Cerca</button>
        </form>
        ${suggestions.length ? `<div class="hero-chips">${suggestions.map(l =>
            `<button class="chip" onclick="navigate('lobby','${l.id}')"><span aria-hidden="true">${l.icon}</span> ${escapeHTML(l.name)}</button>`).join('')}</div>` : ''}`;
}

function renderHomeSubjects() {
    const el = document.getElementById('home-subjects');
    if (!el) return;
    const list = getMySubjects(8);
    if (!list.length) {
        el.innerHTML = `<div class="empty-inline">
            <p>Non hai ancora materie qui.</p>
            <button class="btn btn-secondary btn-sm" onclick="navigate('materie')">Sfoglia le materie</button>
        </div>`;
        return;
    }
    el.innerHTML = list.map(l => {
        const n = lobbyOnline(l);
        return `<button class="subject-card" onclick="navigate('lobby','${l.id}')">
            <span class="subject-card-icon" aria-hidden="true">${l.icon}</span>
            <span class="subject-card-name">${escapeHTML(l.name)}</span>
            <span class="subject-card-online ${n > 0 ? 'is-live' : ''}">${n > 0 ? '<span class="live-dot"></span>' : ''}${n > 0 ? onlineLabel(n) : 'Entra per primo'}</span>
        </button>`;
    }).join('');
}

function renderHomeSessions() {
    const el = document.getElementById('home-sessions');
    if (!el) return;
    if (!upcomingSessions.length) {
        el.innerHTML = `<p class="muted-line">Nessuna sessione in programma. Fissane una e invita gli altri.</p>`;
        return;
    }
    const rows = upcomingSessions.slice(0, 3).map(s => {
        const joined = (s.participants || []).includes(state.firebaseUid);
        const live = s.startAt <= Date.now();
        const n = (s.participants || []).length;
        const action = live
            ? `<button class="btn btn-secondary btn-sm" onclick="navigate('lobby','${s.lobbyId}')">Entra</button>`
            : joined
                ? `<span class="session-joined">✓ Ci sei</span>`
                : `<button class="btn btn-secondary btn-sm" onclick="doJoinSession('${s.id}')">Partecipa</button>`;
        return `<div class="mini-row">
            <div class="mini-row-main">
                <span class="mini-row-when ${live ? 'is-live' : ''}">${live ? 'In corso' : formatWhen(s.startAt)}</span>
                <span class="mini-row-title">${escapeHTML(s.lobbyName || 'Studio')}</span>
                <span class="mini-row-meta">${n} ${n === 1 ? 'partecipante' : 'partecipanti'}</span>
            </div>
            ${action}
        </div>`;
    }).join('');
    const more = upcomingSessions.length > 3
        ? `<button class="link-btn" onclick="navigate('insieme')">Vedi tutte (${upcomingSessions.length})</button>` : '';
    el.innerHTML = rows + more;
}

function goToCatalogSearch(q) {
    navigate('materie');
    const input = document.getElementById('lobby-search');
    if (!input) return;
    input.value = (q || '').trim();
    searchLobbies(input.value);
    input.focus();
}

/* --- Insieme --- */

function renderInsiemeGroups() {
    const el = document.getElementById('insieme-groups');
    if (!el) return;
    if (state.guest) {
        el.innerHTML = `<div class="empty-inline">
            <p>I gruppi privati e le sessioni programmate sono per chi ha un account: servono a sapere con chi studi.</p>
            <button class="btn btn-secondary btn-sm" onclick="requireAccount('i gruppi privati')">Crea un account</button>
        </div>`;
        return;
    }
    if (!myGroups.length) {
        el.innerHTML = `<div class="empty-inline">
            <p>Non sei ancora in nessun gruppo. Crea un gruppo privato e invita i tuoi compagni con un link, oppure entra con un codice.</p>
        </div>`;
        return;
    }
    el.innerHTML = myGroups.map(g => {
        const n = Object.keys(g.members || {}).length;
        const lid = groupLobbyId(g.id);
        return `<div class="group-row">
            <span class="group-row-icon" aria-hidden="true">👥</span>
            <div class="group-row-info">
                <strong>${escapeHTML(g.name)}</strong>
                <span>${n} ${n === 1 ? 'membro' : 'membri'} · codice <b>${escapeHTML(g.code || '')}</b>${lobbyOnline({ id: lid }) > 0 ? ` · ${onlineLabel(lobbyOnline({ id: lid }))}` : ''}</span>
            </div>
            <div class="group-row-actions">
                <button class="btn btn-secondary btn-sm" onclick="navigate('lobby','${lid}')">Apri</button>
                <button class="btn btn-secondary btn-sm" onclick="showInvite('${g.id}')">Invita</button>
                <button class="icon-btn" onclick="doLeaveGroup('${g.id}')" aria-label="Esci dal gruppo ${escapeHTML(g.name)}" title="Esci dal gruppo">
                    <svg class="ic ic-sm" aria-hidden="true"><use href="#i-logout"/></svg>
                </button>
            </div>
        </div>`;
    }).join('');
}

/* --- Presenza aggiornata: ridisegno solo ciò che è visibile --- */

function onPresenceCountsChanged() {
    renderNavSubjects();
    if (state.currentPage === 'materie') renderLobbies(currentLobbyFilter);
    else if (state.currentPage === 'home') { renderHomeSubjects(); renderHomeResume(); }
    else if (state.currentPage === 'insieme') renderInsiemeGroups();
}

/* --- Sidebar comprimibile --- */

function applyNavCollapsed() {
    const collapsed = safeStorageGet('studyo_nav_collapsed', '0') === '1';
    const shell = document.getElementById('app-shell');
    if (shell) shell.classList.toggle('nav-collapsed', collapsed);
    const btn = document.getElementById('nav-collapse-btn');
    if (btn) {
        const label = collapsed ? 'Espandi la barra laterale' : 'Comprimi la barra laterale';
        btn.setAttribute('aria-label', label);
        btn.title = label;
        const text = btn.querySelector('.nav-label');
        if (text) text.textContent = collapsed ? 'Espandi' : 'Comprimi';
    }
}

function toggleNavCollapsed() {
    const collapsed = safeStorageGet('studyo_nav_collapsed', '0') === '1';
    safeStorageSet('studyo_nav_collapsed', collapsed ? '0' : '1');
    applyNavCollapsed();
}

/* --- Menu account --- */

function toggleAvatarMenu() {
    const menu = document.getElementById('avatar-menu');
    if (!menu) return;
    if (menu.hidden) {
        menu.hidden = false;
        document.getElementById('avatar-btn').setAttribute('aria-expanded', 'true');
        const first = menu.querySelector('[role="menuitem"]');
        if (first) first.focus();
    } else {
        closeAvatarMenu();
    }
}

function closeAvatarMenu(returnFocus) {
    const menu = document.getElementById('avatar-menu');
    if (!menu || menu.hidden) return false;
    menu.hidden = true;
    const btn = document.getElementById('avatar-btn');
    if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        if (returnFocus) btn.focus();
    }
    return true;
}

/* --- Tab della materia --- */

const LOBBY_TABS = ['studia', 'ripassa', 'materiali', 'esame'];
let currentLobbyTab = 'studia';

function getSavedLobbyTab(lobbyId) {
    try {
        const map = JSON.parse(safeStorageGet('studyo_lobby_tabs', '{}'));
        return LOBBY_TABS.includes(map[lobbyId]) ? map[lobbyId] : 'studia';
    } catch (e) { return 'studia'; }
}

function saveLobbyTab(lobbyId, tab) {
    try {
        const map = JSON.parse(safeStorageGet('studyo_lobby_tabs', '{}'));
        map[lobbyId] = tab;
        safeStorageSet('studyo_lobby_tabs', JSON.stringify(map));
    } catch (e) {}
}

function setLobbyTab(tab, silent) {
    if (!LOBBY_TABS.includes(tab)) tab = 'studia';
    const wanted = document.getElementById('tab-' + tab);
    if (!wanted || wanted.hidden) tab = 'studia';

    LOBBY_TABS.forEach(t => {
        const btn = document.getElementById('tab-' + t);
        const panel = document.getElementById('panel-' + t);
        const on = t === tab;
        if (btn) {
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-selected', on ? 'true' : 'false');
            btn.tabIndex = on ? 0 : -1;
        }
        if (panel) panel.hidden = !on;
    });

    currentLobbyTab = tab;
    // Appunti e AI Tutor aperti restano legati alla scheda Materiali
    if (tab !== 'materiali') {
        document.querySelectorAll('#materiali-inline .modal-inline.active').forEach(m => closeModal(m.id.replace('modal-', '')));
    }
    if (!silent && state.currentLobby) saveLobbyTab(state.currentLobby, tab);
    updateMiniTimer();
}

function handleTabKeys(e) {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const tabs = [...document.querySelectorAll('.lobby-tab')].filter(t => !t.hidden);
    const idx = tabs.indexOf(document.activeElement);
    if (idx < 0) return;
    e.preventDefault();
    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    setLobbyTab(tabs[next].dataset.tab);
    tabs[next].focus();
}

/* --- Pannello persone + chat (colonna su desktop, foglio dal basso su mobile) --- */

let lobbyPanelOpenDesktop = safeStorageGet('studyo_panel_open', '1') !== '0';
let lobbyPanelOpenMobile = false;
let chatSeenIds = null;
let lastChatMessages = [];

function isLobbyPanelOpen() {
    return isNarrowScreen() ? lobbyPanelOpenMobile : lobbyPanelOpenDesktop;
}

function toggleLobbyPanel(force) {
    const next = typeof force === 'boolean' ? force : !isLobbyPanelOpen();
    if (isNarrowScreen()) {
        lobbyPanelOpenMobile = next;
    } else {
        lobbyPanelOpenDesktop = next;
        safeStorageSet('studyo_panel_open', next ? '1' : '0');
    }
    applyLobbyPanelState();
    if (next) markChatSeen();
    else if (isNarrowScreen()) {
        const fab = document.getElementById('chat-fab');
        if (fab && !fab.hidden && document.activeElement && document.getElementById('lobby-panel').contains(document.activeElement)) fab.focus();
    }
}

function closeLobbySheet() {
    if (!lobbyPanelOpenMobile) return false;
    lobbyPanelOpenMobile = false;
    applyLobbyPanelState();
    return true;
}

function applyLobbyPanelState() {
    const narrow = isNarrowScreen();
    const open = isLobbyPanelOpen();
    const onLobby = state.currentPage === 'lobby';

    const layout = document.getElementById('lobby-layout');
    if (layout) layout.classList.toggle('panel-closed', !narrow && !open);

    const sheetOpen = narrow && open && onLobby;
    document.body.classList.toggle('sheet-open', sheetOpen);
    const backdrop = document.getElementById('sheet-backdrop');
    if (backdrop) backdrop.hidden = !sheetOpen;

    const toggle = document.getElementById('panel-toggle');
    if (toggle) {
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Nascondi persone e chat' : 'Mostra persone e chat');
    }
    const fab = document.getElementById('chat-fab');
    if (fab) fab.setAttribute('aria-expanded', sheetOpen ? 'true' : 'false');
}

function markChatSeen() {
    chatSeenIds = new Set((lastChatMessages || []).map(m => m.id));
    setChatUnread(0);
}

function setChatUnread(n) {
    ['chat-unread', 'chat-fab-unread'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = n > 9 ? '9+' : String(n);
        el.hidden = n <= 0;
    });
    const fab = document.getElementById('chat-fab');
    if (fab) fab.setAttribute('aria-label', n > 0 ? `Apri persone e chat, ${n} messaggi non letti` : 'Apri persone e chat');
}

/* --- Mini-timer: la sessione resta visibile anche fuori dalla materia --- */

let timerTouched = false;
let lastOpenedLobbyId = null;

function timerInSession() {
    return timerTouched && !!state.timerLobby
        && (state.timerRunning || (state.timerSeconds > 0 && state.timerSeconds < state.timerTotal));
}

function updateMiniTimer() {
    const el = document.getElementById('mini-timer');
    if (!el) return;
    const timerInView = state.currentPage === 'lobby' && currentLobbyTab === 'studia';
    const show = timerInSession() && !timerInView;
    el.hidden = !show;
    if (!show) return;

    const m = Math.floor(state.timerSeconds / 60), s = state.timerSeconds % 60;
    document.getElementById('mini-timer-time').textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    const lobby = resolveLobby(state.timerLobby);
    document.getElementById('mini-timer-name').textContent =
        (state.timerRunning ? '' : 'In pausa · ') + (lobby ? lobby.name : 'Sessione');
    el.classList.toggle('is-paused', !state.timerRunning);
    el.setAttribute('aria-label', `Timer ${state.timerRunning ? 'in corso' : 'in pausa'}, torna alla sessione`);
}

function returnToTimer() {
    if (state.currentPage === 'lobby') {
        setLobbyTab('studia');
        return;
    }
    const target = resolveLobby(state.timerLobby) ? state.timerLobby : null;
    if (!target) return;
    saveLobbyTab(target, 'studia');
    navigate('lobby', target);
}

/* --- Ricerca rapida (Ctrl+K) --- */

let cmdkItems = [];
let cmdkIndex = 0;
let cmdkReturnFocus = null;

function isCommandPaletteOpen() {
    const el = document.getElementById('cmdk');
    return !!el && !el.hidden;
}

function openCommandPalette() {
    const el = document.getElementById('cmdk');
    if (!el || !(state.setupDone || state.guest)) return;
    closeAvatarMenu();
    cmdkReturnFocus = document.activeElement;
    el.hidden = false;
    document.body.classList.add('cmdk-open');
    const input = document.getElementById('cmdk-input');
    input.value = '';
    renderCommandResults();
    input.focus();
}

function closeCommandPalette(restoreFocus = true) {
    const el = document.getElementById('cmdk');
    if (!el || el.hidden) return false;
    el.hidden = true;
    document.body.classList.remove('cmdk-open');
    if (restoreFocus && cmdkReturnFocus && typeof cmdkReturnFocus.focus === 'function') cmdkReturnFocus.focus();
    return true;
}

function renderCommandResults() {
    const input = document.getElementById('cmdk-input');
    const box = document.getElementById('cmdk-results');
    if (!input || !box) return;
    const q = normalizeText(input.value.trim());
    const match = label => !q || normalizeText(label).includes(q);

    const CAT = { scientifica: 'Scientifica', economia: 'Economia', giuridica: 'Giuridica', umanistica: 'Umanistica',
                  medicina: 'Medicina', superiori: 'Superiori', tolc: 'TOLC' };

    const subjects = (q ? LOBBIES.filter(l => normalizeText(l.name).includes(q)).slice(0, 8) : getMySubjects(5))
        .map(l => ({ icon: l.icon, label: l.name, hint: CAT[l.category] || 'Materia', run: () => navigate('lobby', l.id) }));
    const groups = myGroups.filter(g => match(g.name))
        .map(g => ({ icon: '👥', label: g.name, hint: 'Gruppo', run: () => navigate('lobby', groupLobbyId(g.id)) }));
    const pages = [
        { icon: '🏠', label: 'Home', hint: 'Pagina', run: () => navigate('home') },
        { icon: '📚', label: 'Materie', hint: 'Pagina', run: () => navigate('materie') },
        { icon: '🤝', label: 'Insieme', hint: 'Pagina', run: () => navigate('insieme') },
        { icon: '👤', label: 'Profilo', hint: 'Pagina', run: () => navigate('profile') },
    ].filter(p => match(p.label));
    const actions = [
        { icon: '🔮', label: 'Focus Pocus', hint: 'Azione', run: () => openFocusPocus() },
        { icon: '📅', label: 'Programma una sessione', hint: 'Azione', run: () => openNewSession() },
        { icon: '➕', label: 'Crea o entra in un gruppo', hint: 'Azione', run: () => openGroups() },
        { icon: '💬', label: 'Invia feedback', hint: 'Azione', run: () => openFeedbackWidget() },
    ].filter(a => match(a.label));

    const sections = [
        [q ? 'Materie' : 'Le tue materie', subjects],
        ['Gruppi', groups],
        ['Pagine', pages],
        ['Azioni', actions],
    ].filter(([, items]) => items.length);

    cmdkItems = sections.flatMap(([, items]) => items);
    cmdkIndex = 0;

    if (!cmdkItems.length) {
        box.innerHTML = `<div class="cmdk-empty">Nessun risultato per “${escapeHTML(input.value.trim())}”.</div>`;
        input.removeAttribute('aria-activedescendant');
        return;
    }

    let i = 0;
    box.innerHTML = sections.map(([title, items]) => `
        <div class="cmdk-section" role="group" aria-label="${title}">
            <div class="cmdk-section-title" aria-hidden="true">${title}</div>
            ${items.map(it => {
                const idx = i++;
                return `<div class="cmdk-item" role="option" id="cmdk-opt-${idx}" data-idx="${idx}"
                             onmousedown="event.preventDefault()" onclick="runCommand(${idx})" onmousemove="highlightCommand(${idx})">
                    <span class="cmdk-item-icon" aria-hidden="true">${it.icon}</span>
                    <span class="cmdk-item-label">${escapeHTML(it.label)}</span>
                    <span class="cmdk-item-hint">${it.hint}</span>
                </div>`;
            }).join('')}
        </div>`).join('');
    highlightCommand(0);
}

function highlightCommand(idx) {
    if (idx === cmdkIndex && document.querySelector('.cmdk-item.active')) return;
    cmdkIndex = idx;
    document.querySelectorAll('.cmdk-item').forEach(el => {
        const on = +el.dataset.idx === idx;
        el.classList.toggle('active', on);
        el.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on) el.scrollIntoView({ block: 'nearest' });
    });
    const input = document.getElementById('cmdk-input');
    if (input) input.setAttribute('aria-activedescendant', 'cmdk-opt-' + idx);
}

function handleCommandKey(e) {
    if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeCommandPalette();
        return;
    }
    if (!cmdkItems.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); highlightCommand((cmdkIndex + 1) % cmdkItems.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlightCommand((cmdkIndex - 1 + cmdkItems.length) % cmdkItems.length); }
    else if (e.key === 'Enter') { e.preventDefault(); runCommand(cmdkIndex); }
}

function runCommand(idx) {
    const item = cmdkItems[idx];
    if (!item) return;
    closeCommandPalette(false);
    item.run();
}

function setupShell() {
    applyNavCollapsed();

    // Ctrl/Cmd + K apre la ricerca rapida
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (isCommandPaletteOpen()) closeCommandPalette(); else openCommandPalette();
        }
    });

    // Clic fuori dal menu account lo chiude
    document.addEventListener('click', (e) => {
        const wrap = document.querySelector('.avatar-wrap');
        if (wrap && !wrap.contains(e.target)) closeAvatarMenu();
    });

    // Frecce dentro il menu account
    const menu = document.getElementById('avatar-menu');
    if (menu) {
        menu.addEventListener('keydown', (e) => {
            const items = [...menu.querySelectorAll('[role="menuitem"]')];
            const idx = items.indexOf(document.activeElement);
            if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
            else if (e.key === 'Tab') closeAvatarMenu();
        });
    }

    const tablist = document.querySelector('.lobby-tabs');
    if (tablist) tablist.addEventListener('keydown', handleTabKeys);

    // Passando da desktop a mobile (o ruotando il tablet) il pannello si riadatta
    window.matchMedia('(max-width: 900px)').addEventListener('change', () => {
        lobbyPanelOpenMobile = false;
        applyLobbyPanelState();
    });

    // Il layout mobile usa la barra in basso: niente scroll della pagina sotto il foglio chat
    applyLobbyPanelState();
    setLobbyTab('studia', true);
}

/* =============================================
   INIT
   ============================================= */

function init() {
    loadState();
    setupInlinePanels();

    // Modalità prova: dal link della landing (?prova=1) o già attiva su questo dispositivo
    if (new URLSearchParams(location.search).get('prova') === '1') {
        safeStorageSet(GUEST_KEY, '1');
        history.replaceState({}, '', location.pathname);
    }
    if (isGuestActive()) {
        state.guest = true;
        if (!state.playerName) state.playerName = 'Ospite';
        closeModal('auth');
    } else {
        state.guest = false;
    }

    // Break the streak if the user skipped one or more full days
    reconcileStreak();

    // Firebase handles auth modals now
    // Close setup if already done (firebase will re-open if needed)
    if (state.setupDone) {
        closeModal('setup');
        closeModal('auth');
    }

    // Si riparte sempre dalla home: presenza e chat si riattivano entrando in una materia
    state.currentPage = 'home';
    state.currentLobby = null;
    setupShell();
    navigate('home');

    // Restore master volume slider + label
    const volSlider = document.getElementById('master-volume');
    if (volSlider) volSlider.value = Math.round((state.masterVolume ?? 0.5) * 100);

    document.getElementById('pomo-count').textContent = state.pomodorosCompleted;
    const hours = Math.floor(state.studyHours);
    const mins = Math.round((state.studyHours - hours) * 60);
    document.getElementById('pomo-total').textContent = `${hours}h ${mins}m`;

    // Global UX: Esc / backdrop to close modals
    setupGlobalUX();

}

init();
