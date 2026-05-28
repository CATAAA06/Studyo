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
    masterVolume: 0.5,
};

function loadState() {
    const saved = localStorage.getItem('studyo_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
        state.timer = null;
        state.timerRunning = false;
    }
}

function saveState() {
    const toSave = { ...state };
    toSave.timer = null;
    localStorage.setItem('studyo_state', JSON.stringify(toSave));
}

/* =============================================
   NAVIGATION
   ============================================= */

function navigate(page, data) {
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
}

/* =============================================
   LOBBIES
   ============================================= */

function renderLobbies(filter = 'all') {
    const sidebarEl = document.getElementById('sidebar-lobbies');
    const filtered = filter === 'all' ? LOBBIES : LOBBIES.filter(l => l.category === filter);

    if (sidebarEl) {
        sidebarEl.innerHTML = filtered.map(lobby => `
            <div class="sidebar-lobby ${state.currentLobby === lobby.id ? 'active' : ''}" onclick="navigate('lobby', '${lobby.id}')">
                <span class="sidebar-lobby-icon">${lobby.icon}</span>
                <span class="sidebar-lobby-name">${lobby.name}</span>
                <span class="sidebar-lobby-count">${lobby.online + Math.floor(Math.random() * 5)}</span>
            </div>
        `).join('');
    }
}

function filterLobbies(category) {
    document.querySelectorAll('.sidebar-filter').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderLobbies(category);
}

/* =============================================
   LOBBY PAGE
   ============================================= */

function openLobby(lobbyId) {
    const lobby = LOBBIES.find(l => l.id === lobbyId);
    if (!lobby) return;

    state.currentLobby = lobbyId;

    document.getElementById('lobby-icon-big').textContent = lobby.icon;
    document.getElementById('lobby-title').textContent = lobby.name;
    document.getElementById('lobby-online').textContent = `${lobby.online + Math.floor(Math.random() * 5)} studenti online`;

    renderStudents();
    renderChat();
    resetQuizArea();
    resetTimer();
}

function renderStudents() {
    const list = document.getElementById('students-list');
    const count = 3 + Math.floor(Math.random() * 4);
    const students = FAKE_STUDENTS.slice(0, count);

    list.innerHTML = students.map(s => `
        <div class="student-item">
            <span class="student-avatar">${s.avatar}</span>
            <div class="student-info">
                <div class="student-name">${s.name}</div>
                <div class="student-studying">${s.status} · ${s.time}</div>
            </div>
        </div>
    `).join('');
}

function renderChat() {
    const messages = document.getElementById('chat-messages');
    messages.innerHTML = FAKE_CHAT.map(msg => {
        if (msg.system) {
            return `<div class="chat-msg-system">${msg.text}</div>`;
        }
        return `
            <div class="chat-msg">
                <span class="chat-msg-name">${msg.name}:</span>
                <span class="chat-msg-text">${msg.text}</span>
            </div>
        `;
    }).join('');
    messages.scrollTop = messages.scrollHeight;
}

function sendChat() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    const messages = document.getElementById('chat-messages');
    messages.innerHTML += `
        <div class="chat-msg">
            <span class="chat-msg-name">${state.playerName}:</span>
            <span class="chat-msg-text">${escapeHTML(text)}</span>
        </div>
    `;

    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        const responses = [
            "Bello, ci sto!",
            "Qualcuno ha capito l'esercizio 3?",
            "Facciamo un quiz?",
            "Grande! Continuiamo così 💪",
            "Io faccio una pausa caffè ☕",
        ];
        const randomStudent = FAKE_STUDENTS[Math.floor(Math.random() * FAKE_STUDENTS.length)];
        const randomResp = responses[Math.floor(Math.random() * responses.length)];

        messages.innerHTML += `
            <div class="chat-msg">
                <span class="chat-msg-name">${randomStudent.name}:</span>
                <span class="chat-msg-text">${randomResp}</span>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;
    }, 1500 + Math.random() * 2000);
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

function renderChallenges() {
    const list = document.getElementById('sidebar-challenges');
    if (!list) return;
    list.innerHTML = DAILY_CHALLENGES.map(c => `
        <div class="sidebar-challenge">
            <div class="sidebar-challenge-title">${c.title}</div>
            <div class="sidebar-challenge-reward">${c.reward}</div>
            <div class="sidebar-challenge-bar">
                <div class="sidebar-challenge-fill" style="width:${c.progress}%"></div>
            </div>
        </div>
    `).join('');
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
}

/* =============================================
   NOTIFICATIONS
   ============================================= */

function showNotification(text) {
    const notif = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    notif.style.cssText = isMobile ? `
        position: fixed;
        top: 16px;
        left: 16px;
        right: 16px;
        background: var(--bg-card);
        border: 1px solid var(--primary);
        border-radius: 12px;
        padding: 14px 16px;
        font-size: 13px;
        font-weight: 600;
        z-index: 300;
        animation: fadeIn 0.3s ease;
        box-shadow: 0 8px 32px rgba(108, 92, 231, 0.3);
        text-align: center;
    ` : `
        position: fixed;
        top: 80px;
        right: 24px;
        background: var(--bg-card);
        border: 1px solid var(--primary);
        border-radius: 12px;
        padding: 14px 20px;
        font-size: 14px;
        font-weight: 600;
        z-index: 300;
        animation: fadeIn 0.3s ease;
        box-shadow: 0 8px 32px rgba(108, 92, 231, 0.3);
        max-width: 320px;
    `;
    notif.textContent = text;
    document.body.appendChild(notif);

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
    gain.gain.value = state.masterVolume * 0.3;

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

function createNatureSound(type) {
    const ctx = getAudioContext();
    const gain = ctx.createGain();
    gain.gain.value = state.masterVolume * 0.25;
    gain.connect(ctx.destination);

    const oscillators = [];

    if (type === 'rain') {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const lpFilter = ctx.createBiquadFilter();
        lpFilter.type = 'lowpass';
        lpFilter.frequency.value = 800;

        const hpFilter = ctx.createBiquadFilter();
        hpFilter.type = 'highpass';
        hpFilter.frequency.value = 200;

        source.connect(hpFilter);
        hpFilter.connect(lpFilter);
        lpFilter.connect(gain);
        source.start();
        oscillators.push(source);
    } else if (type === 'fire') {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
            const w = Math.random() * 2 - 1;
            data[i] = (last + 0.01 * w) / 1.01;
            last = data[i];
            data[i] *= 5;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 300;
        filter.Q.value = 0.5;

        source.connect(filter);
        filter.connect(gain);
        source.start();
        oscillators.push(source);
    } else if (type === 'cafe') {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const lpFilter = ctx.createBiquadFilter();
        lpFilter.type = 'lowpass';
        lpFilter.frequency.value = 500;

        source.connect(lpFilter);
        lpFilter.connect(gain);
        gain.gain.value = state.masterVolume * 0.15;
        source.start();
        oscillators.push(source);
    } else if (type === 'nature') {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 2000;
        bp.Q.value = 2;

        source.connect(bp);
        bp.connect(gain);
        gain.gain.value = state.masterVolume * 0.1;
        source.start();
        oscillators.push(source);
    }

    return { oscillators, gain };
}

function toggleSound(soundType) {
    const el = document.getElementById(`sound-${soundType}`);

    if (state.activeSounds[soundType]) {
        stopSound(soundType);
        el.classList.remove('active');
        delete state.activeSounds[soundType];
    } else {
        let node;
        if (soundType === 'white' || soundType === 'brown') {
            node = createNoiseGenerator(soundType);
        } else {
            node = createNatureSound(soundType);
        }
        soundNodes[soundType] = node;
        state.activeSounds[soundType] = true;
        el.classList.add('active');
    }
}

function stopSound(soundType) {
    const node = soundNodes[soundType];
    if (!node) return;

    if (node.source) {
        try { node.source.stop(); } catch(e) {}
    }
    if (node.oscillators) {
        node.oscillators.forEach(o => { try { o.stop(); } catch(e) {} });
    }

    delete soundNodes[soundType];
}

function toggleAllSounds() {
    const anyActive = Object.keys(state.activeSounds).length > 0;

    if (anyActive) {
        Object.keys(state.activeSounds).forEach(type => {
            stopSound(type);
            document.getElementById(`sound-${type}`).classList.remove('active');
        });
        state.activeSounds = {};
        document.getElementById('sound-master-btn').textContent = 'Mute';
    }
}

function setMasterVolume(val) {
    state.masterVolume = val / 100;

    Object.keys(soundNodes).forEach(type => {
        const node = soundNodes[type];
        if (node && node.gain) {
            let mult = 0.3;
            if (type === 'cafe') mult = 0.15;
            if (type === 'nature') mult = 0.1;
            node.gain.gain.value = state.masterVolume * mult;
        }
    });
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
   INIT
   ============================================= */

function init() {
    loadState();

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

    document.getElementById('pomo-count').textContent = state.pomodorosCompleted;
    const hours = Math.floor(state.studyHours);
    const mins = Math.round((state.studyHours - hours) * 60);
    document.getElementById('pomo-total').textContent = `${hours}h ${mins}m`;
}

init();
