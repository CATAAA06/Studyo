/* =============================================
   STUDYO — App Logic
   ============================================= */

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

// Stable per-lobby online count: base + deterministic 0..4 variation,
// fixed for the whole session so it doesn't flicker when re-rendering.
function lobbyOnline(lobby) {
    const variation = _hashString(lobby.id + _sessionSalt) % 5;
    return lobby.online + variation;
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
        renderLobbies();
        renderChallenges();
        renderCommunity();
    } else if (page === 'lobby') {
        document.getElementById('page-lobby').classList.add('active');
        openLobby(data);
    } else if (page === 'profile') {
        document.getElementById('page-profile').classList.add('active');
        renderProfile();
    }

    // Close mobile sidebar when navigating
    closeMobileSidebar();

    updateNav();
    window.scrollTo(0, 0);
}

function updateNav() {
    const sidebarName = document.getElementById('sidebar-name');
    const sidebarXp = document.getElementById('sidebar-xp');
    const welcomeName = document.getElementById('main-welcome-name');
    const uniIcon = document.getElementById('server-uni-icon');

    if (sidebarName) sidebarName.textContent = state.playerName || 'Studente';
    if (sidebarXp) sidebarXp.textContent = `${state.xp} XP · 🔥${state.streak}`;
    if (welcomeName) welcomeName.textContent = state.playerName || 'Studente';

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

function loginWithEmail() {
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

    // Save to Firestore
    if (typeof saveUserToFirestore === 'function') {
        saveUserToFirestore();
    }

    updateNav();
    renderLobbies();
    renderChallenges();
    renderCommunity();

    addXP(50, 'Benvenuto su Studyo!');

    // Show feedback welcome for new users after a moment
    setTimeout(() => showFeedbackWelcome(), 4000);
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
    }
}

function renderSectionHeader(id, emoji, label, count) {
    const isCollapsed = collapsedSections[id] || false;
    return `
        <div class="sidebar-section-toggle" onclick="toggleSidebarSection('${id}')">
            <span class="sidebar-section-arrow" id="arrow-${id}">${isCollapsed ? '▶' : '▼'}</span>
            <span class="sidebar-section-emoji">${emoji}</span>
            <span class="sidebar-section-label">${label}</span>
            <span class="sidebar-section-count">${count}</span>
        </div>
        <div class="sidebar-section-content ${isCollapsed ? 'collapsed' : ''}" id="section-${id}">
    `;
}

function renderLobbies(filter = 'all') {
    const sidebarEl = document.getElementById('sidebar-lobbies');
    if (!sidebarEl) return;

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
        const mieiLobbies = LOBBIES.filter(l => mieiIds.includes(l.id));
        const relevant = getRelevantLobbies();
        const altreLobbies = relevant.filter(l => !mieiIds.includes(l.id));

        const headerEmoji = isSuperiori ? '🏫' : '📚';
        html += renderSectionHeader('miei', headerEmoji, mieiLabel, mieiLobbies.length);
        html += mieiLobbies.map(lobby => renderLobbyItem(lobby)).join('');
        html += '</div>';

        if (altreLobbies.length > 0) {
            html += renderGrouped(altreLobbies);
        }
    } else if (filter === 'all') {
        const relevant = getRelevantLobbies();

        if (mieiIds.length > 0) {
            const mieiLobbies = LOBBIES.filter(l => mieiIds.includes(l.id));
            const altreLobbies = relevant.filter(l => !mieiIds.includes(l.id));

            const headerEmoji = isSuperiori ? '🏫' : '📚';
            const headerLabel = isSuperiori ? 'Le tue materie' : 'I tuoi esami';
            html += renderSectionHeader('miei', headerEmoji, headerLabel, mieiLobbies.length);
            html += mieiLobbies.map(lobby => renderLobbyItem(lobby)).join('');
            html += '</div>';

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
        <div class="sidebar-lobby ${state.currentLobby === lobby.id ? 'active' : ''}" onclick="navigate('lobby', '${lobby.id}')">
            <span class="sidebar-lobby-icon">${lobby.icon}</span>
            <span class="sidebar-lobby-name">${lobby.name}</span>
            <span class="sidebar-lobby-count">${lobbyOnline(lobby)}</span>
        </div>
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

function openLobby(lobbyId) {
    const lobby = LOBBIES.find(l => l.id === lobbyId);
    if (!lobby) return;

    state.currentLobby = lobbyId;
    lobbyRealUsers = [];

    document.getElementById('lobby-icon-big').textContent = lobby.icon;
    document.getElementById('lobby-title').textContent = lobby.name;
    document.getElementById('lobby-online').textContent = `${lobbyOnline(lobby)} studenti online`;

    // Render with ambient first; live data fills in via listeners below
    renderStudents([]);
    renderChat(null);
    resetQuizArea();
    resetTimer();

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
}

// Leaving the lobby page: stop presence + listeners + any open video call
function leaveLobby() {
    if (typeof leaveLobbyPresence === 'function') leaveLobbyPresence();
    if (typeof _chatUnsub !== 'undefined' && _chatUnsub) { _chatUnsub(); _chatUnsub = null; }
    if (typeof closeModal === 'function') closeModal('video'); // disposes Jitsi if open
    lobbyRealUsers = [];
}

function updateLobbyOnlineCount(lobby, realCount) {
    // Hybrid: ambient baseline, but never show fewer than the real people present
    const shown = Math.max(lobbyOnline(lobby), realCount);
    const el = document.getElementById('lobby-online');
    if (el) el.textContent = `${shown} studenti online`;
}

// Hybrid render: REAL present users first (live dot), then ambient profiles to fill.
function renderStudents(realUsers = []) {
    const list = document.getElementById('students-list');
    if (!list) return;

    const lobby = LOBBIES.find(l => l.id === state.currentLobby);
    const ambientTarget = lobby ? (3 + (_hashString(lobby.id + 'amb') % 3)) : 4; // 3..5 stable

    // Real users (mark self)
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

    // Ambient fill (only what's needed to reach the baseline)
    const fill = Math.max(0, ambientTarget - realUsers.length);
    const ambientHtml = FAKE_STUDENTS.slice(0, fill).map(s => `
        <div class="student-item ambient">
            <span class="student-avatar">${s.avatar}</span>
            <div class="student-info">
                <div class="student-name">${s.name}</div>
                <div class="student-studying">${s.status} · ${s.time}</div>
            </div>
        </div>
    `).join('');

    list.innerHTML = realHtml + ambientHtml;
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

    // Streak + daily challenge tracking
    registerStudyDay();
    bumpDailyStat('quizzes');
    renderChallenges();

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

function openNotes() {
    openModal('notes');
    const editor = document.getElementById('notes-editor');
    const saved = localStorage.getItem(`studyo_notes_${state.currentLobby}`);
    if (saved) editor.value = saved;

    editor.oninput = () => {
        localStorage.setItem(`studyo_notes_${state.currentLobby}`, editor.value);
    };
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

function openAI() {
    openModal('ai');
}

function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const text = input.value.trim();
    if (!text) return;

    const chat = document.getElementById('ai-chat');
    chat.innerHTML += `<div class="ai-message ai-user"><p>${escapeHTML(text)}</p></div>`;
    input.value = '';
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
        const lobbyId = state.currentLobby;
        let responses = AI_RESPONSES.default;
        if (AI_RESPONSES[lobbyId]) {
            responses = [...AI_RESPONSES[lobbyId], ...AI_RESPONSES.default];
        }
        const response = responses[Math.floor(Math.random() * responses.length)];

        chat.innerHTML += `<div class="ai-message ai-bot"><p>${response}</p></div>`;
        chat.scrollTop = chat.scrollHeight;

        addXP(5, 'Domanda all\'AI Tutor');
    }, 800 + Math.random() * 1200);
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

function renderBadges() {
    const grid = document.getElementById('badges-grid');
    const dynamicBadges = BADGES.map(b => {
        const badge = { ...b };
        if (b.name === '10 Quiz' && state.quizzesCompleted >= 10) badge.earned = true;
        if (b.name === '20 Pomodori' && state.pomodorosCompleted >= 20) badge.earned = true;
        if (b.name === 'Streak 7gg' && state.streak >= 7) badge.earned = true;
        return badge;
    });

    grid.innerHTML = dynamicBadges.map(b => `
        <div class="badge-item ${b.earned ? 'earned' : ''}">
            <span class="badge-icon">${b.icon}</span>
            <div class="badge-name">${b.name}</div>
        </div>
    `).join('');
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

// Global UX: Esc closes modals, clicking the backdrop closes modals.
function setupGlobalUX() {
    // Esc to close the top dismissible modal (or Focus Pocus)
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const fp = document.getElementById('focuspocus');
        if (fp && fp.classList.contains('active')) { closeFocusPocus(); return; }
        closeTopModal();
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
}

/* =============================================
   LEVEL-UP CELEBRATION (confetti)
   ============================================= */

function celebrate() {
    const colors = ['#6C5CE7', '#A29BFE', '#FF6B6B', '#FDCB6E', '#00B894'];
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
    nature: 'audio/nature2.mp3',   // real birdsong forest
    white:  'audio/white2.wav',    // clean, seamless generated noise
    brown:  'audio/brown2.wav'
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

const FAKE_COMMUNITY = [
    { name: "Alessandro R.", avatar: "😎", xp: 2450, online: true, studying: "Analisi 1" },
    { name: "Francesca M.", avatar: "👩‍🎓", xp: 3200, online: true, studying: "Microeconomia" },
    { name: "Davide P.", avatar: "🧑‍💻", xp: 1800, online: true, studying: "Fisica 1" },
    { name: "Sofia L.", avatar: "📚", xp: 4100, online: false, studying: "" },
    { name: "Marco T.", avatar: "🎯", xp: 950, online: true, studying: "Diritto Privato" },
    { name: "Giulia B.", avatar: "✨", xp: 2800, online: false, studying: "" },
    { name: "Andrea C.", avatar: "🔥", xp: 1500, online: true, studying: "Statistica" },
    { name: "Chiara V.", avatar: "💡", xp: 3600, online: true, studying: "Marketing" },
    { name: "Lorenzo G.", avatar: "🚀", xp: 2100, online: false, studying: "" },
    { name: "Valentina S.", avatar: "🎓", xp: 5200, online: true, studying: "Informatica" },
];

function renderCommunity() {
    const section = document.getElementById('community-section');
    if (!section) return;

    const uniName = state.playerUni || state.playerScuola;
    if (!uniName || !state.setupDone) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    document.getElementById('community-name').textContent = uniName;

    const onlineCount = FAKE_COMMUNITY.filter(m => m.online).length;
    document.getElementById('comm-online').textContent = onlineCount;
    document.getElementById('comm-total').textContent = FAKE_COMMUNITY.length + Math.floor(Math.random() * 50 + 30);
    document.getElementById('comm-rank').textContent = '#' + (Math.floor(Math.random() * 15) + 1);

    const membersEl = document.getElementById('community-members');
    membersEl.innerHTML = FAKE_COMMUNITY.map(m => `
        <div class="community-member">
            <span class="community-member-avatar">${m.avatar}</span>
            <div class="community-member-info">
                <div class="community-member-name">${m.name}</div>
                <div class="community-member-status ${m.online ? 'online' : ''}">
                    ${m.online ? '● ' + (m.studying ? 'Studia ' + m.studying : 'Online') : '○ Offline'}
                </div>
            </div>
            <span class="community-member-xp">${m.xp} XP</span>
        </div>
    `).join('');
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
    const dismissed = sessionStorage.getItem('studyo_feedback_welcome_dismissed');
    if (dismissed) return;

    // Don't show if no setup done (user hasn't logged in yet)
    if (!state.setupDone) return;

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
    sessionStorage.setItem('studyo_feedback_welcome_dismissed', 'true');
}

/* =============================================
   MOBILE SIDEBAR
   ============================================= */

function toggleMobileSidebar() {
    const sidebar = document.querySelector('.channel-sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    const icon = document.getElementById('hamburger-icon');

    if (sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        icon.textContent = '☰';
        document.body.style.overflow = '';
    } else {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        icon.textContent = '✕';
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileSidebar() {
    const sidebar = document.querySelector('.channel-sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    const icon = document.getElementById('hamburger-icon');

    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        if (icon) icon.textContent = '☰';
        document.body.style.overflow = '';
    }
}

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
   FOCUS POCUS — immersive focus rooms
   ============================================= */

const FOCUS_ROOMS = [
    { id: 'rain',   name: 'Biblioteca Piovosa',  emoji: '🌧️', sound: 'rain',   theme: 'rain',   desc: 'Pioggia sulla finestra, libri e silenzio.' },
    { id: 'fire',   name: 'Baita sul Fuoco',     emoji: '🔥', sound: 'fire',   theme: 'fire',   desc: 'Il crepitio del camino in una notte fredda.' },
    { id: 'cafe',   name: 'Caffè Letterario',    emoji: '☕', sound: 'cafe',   theme: 'cafe',   desc: 'Il brusio caldo di una caffetteria.' },
    { id: 'forest', name: 'Foresta Silenziosa',  emoji: '🌿', sound: 'nature', theme: 'forest', desc: 'Vento tra le foglie e canto di uccelli.' },
    { id: 'cosmos', name: 'Notte Stellata',      emoji: '🌌', sound: 'brown',  theme: 'cosmos', desc: 'Sotto un cielo infinito di stelle.' },
    { id: 'void',   name: 'Concentrazione Pura', emoji: '🤍', sound: 'white',  theme: 'void',   desc: 'Il vuoto bianco. Solo tu e lo studio.' },
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

    updateNav();
    renderLobbies();
    renderChallenges();
    renderCommunity();

    // Restore master volume slider + label
    const volSlider = document.getElementById('master-volume');
    if (volSlider) volSlider.value = Math.round((state.masterVolume ?? 0.5) * 100);

    document.getElementById('pomo-count').textContent = state.pomodorosCompleted;
    const hours = Math.floor(state.studyHours);
    const mins = Math.round((state.studyHours - hours) * 60);
    document.getElementById('pomo-total').textContent = `${hours}h ${mins}m`;

    // Global UX: Esc / backdrop to close modals
    setupGlobalUX();

    // Show feedback welcome after a short delay (only if logged in)
    setTimeout(() => {
        if (state.setupDone) {
            showFeedbackWelcome();
        }
    }, 3000);
}

init();
