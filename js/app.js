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
    streak: 1,
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

function todayStr() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
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
    if (streakNum) streakNum.textContent = state.streak || 0;
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
    if (homeStreak) homeStreak.textContent = state.streak;
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

function completeSetup() {
    const name = document.getElementById('setup-name').value.trim();
    if (!name) {
        document.getElementById('setup-name').style.borderColor = '#E17055';
        document.getElementById('setup-name').placeholder = 'Inserisci il tuo nome!';
        return;
    }

    state.playerName = name;
    state.playerSchool = document.getElementById('setup-school').value;

    if (state.playerSchool === 'universita') {
        state.playerUni = document.getElementById('setup-uni').value.trim();
        state.playerCorso = document.getElementById('setup-corso').value;
    } else {
        state.playerScuola = document.getElementById('setup-scuola').value.trim();
        state.playerTipoScuola = document.getElementById('setup-tipo-scuola').value;
        state.playerClasse = document.getElementById('setup-classe').value;
    }

    state.setupDone = true;
    state.streak = 1;

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

    // Guided tour right after setup (first impression)
    setTimeout(() => startOnboarding(), 500);

    // Show feedback welcome later (skipped while the tour is open)
    setTimeout(() => showFeedbackWelcome(), 12000);
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
    if (typeof enterLobbyPresence === 'function') {
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
    if (realCount <= 0) el.textContent = 'Nessuno online adesso';
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
    document.querySelector('.build-scene').style.boxShadow = '0 0 30px rgba(108, 92, 231, 0.2)';

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
   QUIZ
   ============================================= */

function startQuiz() {
    const lobbyId = state.currentLobby;
    const questions = QUIZZES[lobbyId];
    if (!questions) {
        document.getElementById('quiz-area').innerHTML = `
            <div class="quiz-placeholder">
                <p>Quiz non ancora disponibili per questa materia. Presto in arrivo!</p>
            </div>
        `;
        return;
    }

    state.currentQuiz = shuffleArray([...questions]).slice(0, 5);
    state.currentQuizIndex = 0;
    state.quizScore = 0;

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
        <div class="quiz-counter" style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">
            Domanda ${state.currentQuizIndex + 1} di ${state.currentQuiz.length}
        </div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
            ${q.options.map((opt, i) => `
                <button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>
            `).join('')}
        </div>
    `;
}

function answerQuiz(selected) {
    const q = state.currentQuiz[state.currentQuizIndex];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) opt.classList.add('correct');
        if (i === selected && i !== q.correct) opt.classList.add('wrong');
    });

    if (selected === q.correct) {
        state.quizScore++;
    }

    setTimeout(() => {
        state.currentQuizIndex++;
        renderQuizQuestion();
    }, 1200);
}

function finishQuiz() {
    state.quizzesCompleted++;

    // Quiz senza errori → badge "Quiz Perfetto"
    if (state.currentQuiz && state.quizScore === state.currentQuiz.length) {
        state.perfectQuizzes = (state.perfectQuizzes || 0) + 1;
    }

    // Streak + daily challenge tracking
    registerStudyDay();
    bumpDailyStat('quizzes');
    renderChallenges();
    checkNewBadges();

    const xpEarned = state.quizScore * 50;
    addXP(xpEarned, `Quiz completato: ${state.quizScore}/${state.currentQuiz.length}`);

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
            <div class="quiz-xp-earned">+${xpEarned} XP guadagnati!</div>
            <button class="btn btn-accent" onclick="startQuiz()">🔄 Nuovo Quiz</button>
        </div>
    `;

    saveState();
}

function resetQuizArea() {
    document.getElementById('quiz-area').innerHTML = `
        <div class="quiz-placeholder">
            <span class="quiz-placeholder-icon">🧠</span>
            <p>Premi "Nuova Sfida" per iniziare un quiz sulla materia!</p>
            <p class="quiz-sub">+50 XP per ogni risposta corretta</p>
        </div>
    `;
}

/* =============================================
   FLASHCARDS
   ============================================= */

let studyDeck = [];
let fcCompleted = 0;
let fcTotal = 0;

function openFlashcards() {
    const lobbyId = state.currentLobby;
    const cards = FLASHCARDS[lobbyId];

    if (!cards || cards.length === 0) {
        showNotification('Flashcard non ancora disponibili per questa materia!');
        return;
    }

    // Build a study deck with spaced repetition metadata
    studyDeck = cards.map((card, i) => ({
        ...card,
        id: i,
        interval: 0, // 0 = new, not yet seen
    }));
    fcCompleted = 0;
    fcTotal = cards.length;

    document.getElementById('fc-total').textContent = fcTotal;
    renderFlashcard();
    openModal('flashcard');
}

function renderFlashcard() {
    if (studyDeck.length === 0) {
        // All cards mastered in this session
        document.getElementById('flashcard-front').innerHTML = `
            <div style="text-align:center">
                <div style="font-size:48px;margin-bottom:12px">🎉</div>
                <p>Tutte le carte completate!</p>
                <p style="font-size:14px;color:var(--text-secondary);margin-top:8px">${fcCompleted} carte studiate con ripetizione spaziata</p>
            </div>
        `;
        document.getElementById('flashcard-back').innerHTML = '';
        document.getElementById('fc-current').textContent = fcTotal;
        const el = document.getElementById('flashcard');
        el.classList.remove('flipped');
        return;
    }

    const card = studyDeck[0];
    const repeatTag = card.interval > 0 ? ' <span style="font-size:11px;color:var(--accent)">(ripasso)</span>' : '';
    document.getElementById('flashcard-front').innerHTML = `<p>${card.front}${repeatTag}</p>`;
    document.getElementById('flashcard-back').innerHTML = `<p>${card.back}</p>`;
    document.getElementById('fc-current').textContent = fcCompleted + 1;

    const el = document.getElementById('flashcard');
    el.classList.remove('flipped');
    state.flashcardFlipped = false;
}

function flipCard() {
    if (studyDeck.length === 0) return;
    const el = document.getElementById('flashcard');
    el.classList.toggle('flipped');
    state.flashcardFlipped = !state.flashcardFlipped;
}

function rateFlashcard(rating) {
    if (studyDeck.length === 0) return;

    const card = studyDeck.shift(); // Remove from front
    let xp = 10;

    if (rating === 'easy') {
        // Easy: card is mastered, don't re-insert
        xp = 20;
        fcCompleted++;
        showNotification('😎 Facile! Carta padroneggiata');
    } else if (rating === 'medium') {
        // Medium: re-insert further back (after 4-6 cards)
        xp = 10;
        card.interval++;
        if (card.interval >= 3) {
            // Seen 3 times as medium, consider learned
            fcCompleted++;
        } else {
            const insertAt = Math.min(studyDeck.length, 4 + Math.floor(Math.random() * 3));
            studyDeck.splice(insertAt, 0, card);
        }
    } else if (rating === 'hard') {
        // Hard: re-insert soon (after 1-2 cards)
        xp = 5;
        card.interval++;
        const insertAt = Math.min(studyDeck.length, 1 + Math.floor(Math.random() * 2));
        studyDeck.splice(insertAt, 0, card);
    }

    addXP(xp, 'Flashcard studiata');
    renderFlashcard();
}

/* =============================================
   NOTES
   ============================================= */

let noteSaveTimer = null;
let noteIsShared = false;

async function openNotes() {
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
        } else {
            noteIsShared = false;
        }
        const cb = document.getElementById('notes-shared');
        if (cb) cb.checked = noteIsShared;
        statusEl.textContent = 'Salvati sul tuo account';
    } else {
        statusEl.textContent = 'Salvati su questo dispositivo';
    }

    // 3) Salvataggio: locale immediato, cloud con debounce
    editor.oninput = () => {
        localStorage.setItem(`studyo_notes_${lobbyId}`, editor.value);
        statusEl.textContent = 'Scrivo…';
        clearTimeout(noteSaveTimer);
        noteSaveTimer = setTimeout(async () => {
            if (typeof saveNote === 'function' && state.firebaseUid) {
                const ok = await saveNote(lobbyId, editor.value, noteIsShared);
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
        await saveNote(state.currentLobby, editor.value, noteIsShared);
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

let reviewState = { lobbyId: null, list: [], scope: 'mine', difficulty: 0, loading: false };

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

async function renderExamSection(lobby) {
    const card = document.getElementById('exam-card');
    if (!card) return;

    if (!reviewsEnabledFor(lobby)) { card.hidden = true; return; }
    card.hidden = false;

    reviewState.lobbyId = lobby.id;
    reviewState.list = [];

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
    document.querySelectorAll('.exam-scope-btn').forEach(b => {
        const on = b.dataset.scope === scope;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderExamSummary();
    renderReviewList();
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
    const list = scopedReviews();
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
        <p class="exam-basis">Basato su ${list.length} ${list.length === 1 ? 'recensione' : 'recensioni'}${reviewState.scope === 'mine' ? ' del tuo ateneo' : ''}.</p>`;
}

function renderReviewList() {
    const box = document.getElementById('exam-reviews');
    if (!box) return;
    const list = scopedReviews().sort((a, b) => {
        if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
        const ta = a.updatedAt && a.updatedAt.toMillis ? a.updatedAt.toMillis() : 0;
        const tb = b.updatedAt && b.updatedAt.toMillis ? b.updatedAt.toMillis() : 0;
        return tb - ta;
    });

    if (!list.length) {
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
                <span class="review-tag">${r.hours} ore</span>${types}${parz}
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
    if (!canWriteReviews()) {
        showNotification("Le recensioni d'esame possono scriverle solo gli studenti universitari.");
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
        uni: (state.playerUni || '').slice(0, 120),
        uniKey: uniKey(state.playerUni)
    });

    if (!ok) { showNotification('Non riesco a pubblicare la recensione. Riprova tra poco.'); return; }

    closeModal('review');
    showNotification(isNew ? '📋 Recensione pubblicata. Grazie, aiuti chi viene dopo!' : 'Recensione aggiornata.');
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
        if (state.currentLobby) sel.value = state.currentLobby;
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
    openModal('ai');
    aiHistory = [];
    refreshAIMode();
    renderAISuggestions();
}

function refreshAIMode() {
    const hasKey = !!getAIKey();
    const badge = document.getElementById('ai-mode-badge');
    const link = document.querySelector('.ai-mode-link');
    const rm = document.getElementById('ai-key-remove');
    if (badge) {
        badge.textContent = hasKey ? '✨ Claude collegato' : 'Modalità base';
        badge.classList.toggle('live', hasKey);
    }
    if (link) link.textContent = hasKey ? 'Gestisci' : "Collega un'AI vera";
    if (rm) rm.style.display = hasKey ? 'block' : 'none';
}

function toggleAISettings() {
    const box = document.getElementById('ai-settings');
    if (!box) return;
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
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
    document.getElementById('ai-settings').style.display = 'none';
    refreshAIMode();
    showNotification('✨ AI collegata! Ora le risposte sono generate da Claude.');
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
    const cards = FLASHCARDS[state.currentLobby] || [];
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
    const has = tools.length ? ` Per ${escapeHTML(subject)} ho ${tools.join(' e ')}: aprili dagli strumenti della lobby.` : '';

    return `Su questo non ho materiale pronto in modalità base.${has}
        <span class="ai-src">Vuoi risposte complete? Collega un'AI vera dal pulsante qui sopra.</span>`;
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
        let current = c.metric === 'streak' ? (state.streak || 0) : (stats[c.metric] || 0);
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
    document.getElementById('stat-streak').textContent = state.streak;
    document.getElementById('stat-quizzes').textContent = state.quizzesCompleted;
    document.getElementById('stat-pomodoros').textContent = state.pomodorosCompleted;

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
    document.getElementById(`modal-${name}`).classList.add('active');
}

function closeModal(name) {
    document.getElementById(`modal-${name}`).classList.remove('active');
    // Tear down the video call whenever its modal closes (Esc, backdrop, X, readyToClose)
    if (name === 'video' && typeof disposeJitsi === 'function') disposeJitsi();
}

// Modals that must NOT be dismissible by Esc / backdrop (login gate).
const PROTECTED_MODALS = ['auth', 'setup'];

function closeTopModal() {
    // Find the last-opened active modal that is dismissible
    const active = Array.from(document.querySelectorAll('.modal.active'))
        .filter(m => !PROTECTED_MODALS.includes(m.id.replace('modal-', '')));
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
        if (PROTECTED_MODALS.includes(name)) return;
        modal.addEventListener('mousedown', (e) => {
            if (e.target === modal) closeModal(name);
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
        box-shadow: 0 8px 32px rgba(108, 92, 231, 0.3);
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
    if (!uniName || !state.setupDone) {
        section.style.display = 'none';
        return;
    }

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
   ONBOARDING — primi 60 secondi
   ============================================= */

const OB_STEPS = [
    {
        visual: `<div class="ob-scene ob-scene-lobby">
            <div class="ob-row on"><span>📐</span> Analisi 1 <b>14</b></div>
            <div class="ob-row"><span>⚛️</span> Fisica 1 <b>9</b></div>
            <div class="ob-row"><span>💻</span> Informatica <b>21</b></div>
        </div>`,
        title: 'Ogni materia ha la sua lobby',
        text: 'In Home trovi gli esami del tuo corso, in Materie tutte le altre. Il numero dice quante persone ci sono adesso.'
    },
    {
        visual: `<div class="ob-scene ob-scene-people">
            <div class="ob-person"><span class="ob-av">🎓</span><div><b>Giulia</b><i>sta studiando ora</i></div></div>
            <div class="ob-person"><span class="ob-av">🧑‍💻</span><div><b>Marco</b><i>sta studiando ora</i></div></div>
        </div>`,
        title: 'Non sei da solo',
        text: 'Vedi in tempo reale chi sta studiando nella tua stessa materia. Potete scrivervi in chat o aprire una videochiamata.'
    },
    {
        visual: `<div class="ob-scene ob-scene-timer">
            <div class="ob-timer">25:00</div>
            <div class="ob-bar"><span></span></div>
            <div class="ob-xp">+75 XP</div>
        </div>`,
        title: 'Ogni sessione lascia un segno',
        text: 'Avvia il timer e studia. Al termine guadagni XP, sali di livello e mantieni viva la streak dei giorni consecutivi.'
    },
    {
        visual: `<div class="ob-scene ob-scene-focus">
            <div class="ob-stars"></div>
            <div class="ob-focus-label">🔮 Focus Pocus</div>
        </div>`,
        title: 'E quando serve silenzio totale',
        text: 'Apri Focus Pocus dalla Home: schermo intero, atmosfera immersiva e solo il timer. Tutto il resto sparisce.'
    }
];

let obIndex = 0;

function obShouldRun() {
    return !localStorage.getItem('studyo_onboarded');
}

function startOnboarding() {
    if (!obShouldRun()) return;
    obIndex = 0;
    obRender();
    document.getElementById('onboarding').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function obRender() {
    const s = OB_STEPS[obIndex];
    if (!s) return;
    document.getElementById('ob-visual').innerHTML = s.visual;
    document.getElementById('ob-title').textContent = s.title;
    document.getElementById('ob-text').textContent = s.text;
    document.getElementById('ob-next').textContent = obIndex === OB_STEPS.length - 1 ? 'Inizia a studiare' : 'Avanti';
    document.getElementById('ob-dots').innerHTML = OB_STEPS
        .map((_, i) => `<span class="ob-dot ${i === obIndex ? 'on' : ''}"></span>`).join('');

    // sprinkle stars for the focus step
    const sky = document.querySelector('.ob-stars');
    if (sky) {
        let h = '';
        for (let i = 0; i < 26; i++) {
            h += `<span style="left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${(Math.random()*3).toFixed(2)}s"></span>`;
        }
        sky.innerHTML = h;
    }
}

function obNext() {
    if (obIndex < OB_STEPS.length - 1) {
        obIndex++;
        obRender();
    } else {
        obFinish();
    }
}

function obFinish() {
    localStorage.setItem('studyo_onboarded', '1');
    const el = document.getElementById('onboarding');
    if (el) el.classList.remove('active');
    document.body.style.overflow = '';
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

function renderHome() {
    updateNav();
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
            <button class="btn btn-primary btn-large hero-cta" onclick="navigate('lobby','${last.id}')">
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
            <button type="submit" class="btn btn-primary">Cerca</button>
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
            <span class="subject-card-online ${n > 0 ? 'is-live' : ''}">${n > 0 ? '<span class="live-dot"></span>' : ''}${onlineLabel(n)}</span>
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
    if (!el || !state.setupDone) return;
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

    // Returning users who never saw the tour get it once
    setTimeout(() => {
        if (state.setupDone) startOnboarding();
    }, 900);

    // Show feedback welcome after a short delay (only if logged in)
    setTimeout(() => {
        if (state.setupDone) {
            showFeedbackWelcome();
        }
    }, 6000);
}

init();
