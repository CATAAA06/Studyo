/* =============================================
   STUDYO — Firebase Integration
   ============================================= */

const firebaseConfig = {
    apiKey: "AIzaSyDWMxb73W-og6Cu425Plo_rhBCun0qjTDU",
    authDomain: "studyo-4f901.firebaseapp.com",
    projectId: "studyo-4f901",
    storageBucket: "studyo-4f901.firebasestorage.app",
    messagingSenderId: "113115391624",
    appId: "1:113115391624:web:7d5101b83e02c4745f613d",
    measurementId: "G-QY4MWPQ7KV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

/* =============================================
   AUTHENTICATION
   ============================================= */

async function signInWithGoogle() {
    // Nei browser interni delle app (WhatsApp, Instagram…) il login Google
    // non può funzionare: lo storage è isolato e il ritorno si perde.
    if (typeof isInAppBrowser === 'function' && isInAppBrowser()) {
        showInAppBrowserHelp();
        return null;
    }

    try {
        const result = await auth.signInWithPopup(googleProvider);
        await handleUserLogin(result.user);
        return result.user;
    } catch (error) {
        console.warn('Google sign-in:', error.code, error.message);

        switch (error.code) {
            case 'auth/popup-closed-by-user':
            case 'auth/cancelled-popup-request':
                break; // l'utente ha chiuso: nessun messaggio
            case 'auth/popup-blocked':
                showNotification('Popup bloccato dal browser. Usa email e password qui sotto.');
                highlightEmailLogin();
                break;
            case 'auth/unauthorized-domain':
                showNotification('Dominio non autorizzato su Firebase.');
                break;
            case 'auth/operation-not-supported-in-this-environment':
            case 'auth/web-storage-unsupported':
                showInAppBrowserHelp();
                break;
            default:
                showNotification('Accesso Google non riuscito. Prova con email e password.');
                highlightEmailLogin();
        }
        return null;
    }
}

// Messaggio chiaro quando si è dentro il browser di un'altra app.
// Il pulsante Google viene proprio nascosto: lì non può funzionare,
// lasciarlo cliccabile porta solo a ripetere lo stesso errore.
function showInAppBrowserHelp() {
    const box = document.getElementById('inapp-warning');
    if (box) box.style.display = 'block';

    const gBtn = document.querySelector('.btn-google');
    if (gBtn) gBtn.style.display = 'none';
    const divider = document.querySelector('#modal-auth .auth-divider');
    if (divider) divider.style.display = 'none';

    highlightEmailLogin();
}

function highlightEmailLogin() {
    const el = document.getElementById('auth-email');
    if (el) {
        el.focus();
        el.classList.add('field-pulse');
        setTimeout(() => el.classList.remove('field-pulse'), 2000);
    }
}

async function signInWithEmail(email, password) {
    // First try to sign in
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        await handleUserLogin(result.user);
        return result.user;
    } catch (signInError) {
        console.log('Sign-in failed, code:', signInError.code);

        // If user not found or invalid credential, try to register
        if (signInError.code === 'auth/user-not-found' ||
            signInError.code === 'auth/invalid-credential' ||
            signInError.code === 'auth/wrong-password') {

            // Try creating a new account
            try {
                const result = await auth.createUserWithEmailAndPassword(email, password);
                await handleUserLogin(result.user, true);
                showNotification('🎉 Account creato con successo!');
                return result.user;
            } catch (registerError) {
                console.log('Register failed, code:', registerError.code);

                if (registerError.code === 'auth/email-already-in-use') {
                    // Account exists but password was wrong
                    showNotification('Password non corretta. Riprova.');
                } else if (registerError.code === 'auth/weak-password') {
                    showNotification('Password troppo debole (min 6 caratteri).');
                } else if (registerError.code === 'auth/invalid-email') {
                    showNotification('Email non valida.');
                } else {
                    showNotification('Errore: ' + registerError.message);
                }
                return null;
            }
        }

        // Other errors
        if (signInError.code === 'auth/invalid-email') {
            showNotification('Email non valida.');
        } else if (signInError.code === 'auth/too-many-requests') {
            showNotification('Troppi tentativi. Aspetta qualche minuto.');
        } else {
            showNotification('Errore login: ' + signInError.code);
        }
        return null;
    }
}

function signOut() {
    auth.signOut().then(() => {
        // Reset state
        localStorage.removeItem('studyo_state');
        location.reload();
    });
}

/* =============================================
   USER DATA — FIRESTORE
   ============================================= */

async function handleUserLogin(user, isNew = false) {
    const userDoc = await db.collection('users').doc(user.uid).get();

    if (userDoc.exists && !isNew) {
        // Load existing user data
        const data = userDoc.data();
        state.playerName = data.name || user.displayName || '';
        state.playerSchool = data.school || 'universita';
        state.playerUni = data.uni || '';
        state.playerScuola = data.scuola || '';
        state.playerCorso = data.corso || '';
        state.playerTipoScuola = data.tipoScuola || '';
        state.playerClasse = data.classe || '';
        state.xp = data.xp || 0;
        state.streak = data.streak || 1;
        state.level = data.level || 1;
        state.studyHours = data.studyHours || 0;
        state.quizzesCompleted = data.quizzesCompleted || 0;
        state.pomodorosCompleted = data.pomodorosCompleted || 0;
        state.setupDone = data.setupDone || false;
        state.firebaseUid = user.uid;
        state.firebaseEmail = user.email;

        saveState();

        if (state.setupDone) {
            closeModal('auth');
            closeModal('setup');
        } else {
            closeModal('auth');
            // Show setup modal to complete profile
            openModal('setup');
        }

        updateNav();
        renderLobbies();
        renderChallenges();
        renderCommunity();
        showNotification(`👋 Bentornato, ${state.playerName || 'studente'}!`);

        // Gruppi privati + eventuale link d'invito (?join=CODE)
        if (typeof refreshGroups === 'function') await refreshGroups();
        if (typeof handleJoinFromUrl === 'function') await handleJoinFromUrl();
        if (typeof refreshSessions === 'function') refreshSessions();
    } else {
        // New user — show setup
        state.firebaseUid = user.uid;
        state.firebaseEmail = user.email;
        if (user.displayName) {
            state.playerName = user.displayName;
            const nameInput = document.getElementById('setup-name');
            if (nameInput) nameInput.value = user.displayName;
        }

        closeModal('auth');
        openModal('setup');
        saveState();
    }
}

async function saveUserToFirestore() {
    if (!state.firebaseUid) return;

    try {
        await db.collection('users').doc(state.firebaseUid).set({
            name: state.playerName,
            email: state.firebaseEmail || '',
            school: state.playerSchool,
            uni: state.playerUni,
            scuola: state.playerScuola,
            corso: state.playerCorso,
            tipoScuola: state.playerTipoScuola,
            classe: state.playerClasse,
            xp: state.xp,
            streak: state.streak,
            level: state.level,
            studyHours: state.studyHours,
            quizzesCompleted: state.quizzesCompleted,
            pomodorosCompleted: state.pomodorosCompleted,
            setupDone: state.setupDone,
            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error('Firestore save error:', error);
    }
}

async function saveFeedbackToFirestore(type, text) {
    try {
        await db.collection('feedbacks').add({
            type,
            text,
            userId: state.firebaseUid || 'anonymous',
            userName: state.playerName,
            uni: state.playerUni || state.playerScuola,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Feedback save error:', error);
    }
}

// Classifica reale del proprio ateneo/scuola.
// Ordinamento lato client: evita di dover creare indici compositi su Firestore.
async function loadCommunityFromFirestore() {
    const uniName = state.playerUni || state.playerScuola;
    if (!uniName || !state.firebaseUid) return [];

    const field = state.playerUni ? 'uni' : 'scuola';
    try {
        const snapshot = await db.collection('users')
            .where(field, '==', uniName)
            .limit(60)
            .get();

        return snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(u => u.setupDone)
            .sort((a, b) => (b.xp || 0) - (a.xp || 0));
    } catch (error) {
        console.warn('Community load error:', error.code || error.message);
        return [];
    }
}

/* =============================================
   REAL-TIME PRESENCE & CHAT
   ============================================= */

let _presenceHeartbeat = null;
let _presenceUnsub = null;
let _chatUnsub = null;

// Announce that this user is now studying in a given lobby + keep a heartbeat.
async function enterLobbyPresence(lobbyId) {
    if (!state.firebaseUid) return;
    const ref = db.collection('presence').doc(state.firebaseUid);
    const payload = {
        name: state.playerName || 'Studente',
        avatar: avatarFor(state.firebaseUid || state.playerName || 'x'),
        lobbyId: lobbyId,
        status: 'studying',
        xp: state.xp || 0,
        uni: state.playerUni || state.playerScuola || '',
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    };
    try {
        await ref.set(payload, { merge: true });
    } catch (e) {
        console.warn('presence set failed (rules?):', e.code || e.message);
    }

    // Heartbeat: refresh lastSeen so others know we're still here
    if (_presenceHeartbeat) clearInterval(_presenceHeartbeat);
    _presenceHeartbeat = setInterval(() => {
        ref.update({ lastSeen: firebase.firestore.FieldValue.serverTimestamp() }).catch(() => {});
    }, 45000);
}

// Live list of people currently in this lobby (active in the last 2 minutes).
function listenLobbyPresence(lobbyId, cb) {
    if (_presenceUnsub) { _presenceUnsub(); _presenceUnsub = null; }
    try {
        _presenceUnsub = db.collection('presence')
            .where('lobbyId', '==', lobbyId)
            .onSnapshot((snap) => {
                const now = Date.now();
                const users = snap.docs
                    .map(d => ({ id: d.id, ...d.data() }))
                    .filter(u => {
                        if (!u.lastSeen) return true; // just-written (pending server ts)
                        const ms = u.lastSeen.toMillis ? u.lastSeen.toMillis() : 0;
                        return (now - ms) < 120000;
                    });
                cb(users);
            }, (err) => {
                console.warn('presence listen failed (rules?):', err.code || err.message);
                cb([]); // fall back to ambient-only
            });
    } catch (e) {
        cb([]);
    }
}

// Stop being present in a lobby (on leaving the page / closing the tab).
async function leaveLobbyPresence() {
    if (_presenceHeartbeat) { clearInterval(_presenceHeartbeat); _presenceHeartbeat = null; }
    if (_presenceUnsub) { _presenceUnsub(); _presenceUnsub = null; }
    if (state.firebaseUid) {
        try { await db.collection('presence').doc(state.firebaseUid).delete(); } catch (e) {}
    }
}

// Live chat for a lobby (last 50 messages, oldest → newest).
function listenChat(lobbyId, cb) {
    if (_chatUnsub) { _chatUnsub(); _chatUnsub = null; }
    try {
        _chatUnsub = db.collection('lobbies').doc(lobbyId).collection('messages')
            .orderBy('createdAt', 'asc')
            .limitToLast(50)
            .onSnapshot((snap) => {
                const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                cb(msgs);
            }, (err) => {
                console.warn('chat listen failed (rules?):', err.code || err.message);
                cb(null); // null → show empty/offline state
            });
    } catch (e) {
        cb(null);
    }
}

async function sendChatMessage(lobbyId, text) {
    if (!state.firebaseUid) return false;
    try {
        await db.collection('lobbies').doc(lobbyId).collection('messages').add({
            uid: state.firebaseUid,
            name: state.playerName || 'Studente',
            avatar: avatarFor(state.firebaseUid || state.playerName || 'x'),
            text: text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    } catch (e) {
        console.warn('chat send failed (rules?):', e.code || e.message);
        showNotification('Messaggio non inviato (riprova tra poco).');
        return false;
    }
}

/* =============================================
   GRUPPI DI STUDIO PRIVATI
   Un gruppo riusa il motore di presenza e chat:
   il suo id lobby è "group_<id>".
   ============================================= */

function makeGroupCode() {
    // Niente 0/O/1/I per evitare ambiguità quando si detta il codice
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
    return out;
}

async function createGroup(name) {
    if (!state.firebaseUid) return null;
    const code = makeGroupCode();
    try {
        const ref = await db.collection('groups').add({
            name: name,
            code: code,
            ownerId: state.firebaseUid,
            ownerName: state.playerName || 'Studente',
            members: { [state.firebaseUid]: state.playerName || 'Studente' },
            memberIds: [state.firebaseUid],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { id: ref.id, name, code };
    } catch (e) {
        console.warn('createGroup failed:', e.code || e.message);
        showNotification('Non riesco a creare il gruppo. Riprova.');
        return null;
    }
}

async function joinGroupByCode(code) {
    if (!state.firebaseUid) return null;
    const clean = (code || '').trim().toUpperCase();
    if (clean.length !== 6) {
        showNotification('Il codice deve avere 6 caratteri.');
        return null;
    }
    try {
        const snap = await db.collection('groups').where('code', '==', clean).limit(1).get();
        if (snap.empty) {
            showNotification('Nessun gruppo con questo codice.');
            return null;
        }
        const doc = snap.docs[0];
        const data = doc.data();

        if (data.memberIds && data.memberIds.includes(state.firebaseUid)) {
            return { id: doc.id, name: data.name, code: data.code, already: true };
        }

        await doc.ref.update({
            ['members.' + state.firebaseUid]: state.playerName || 'Studente',
            memberIds: firebase.firestore.FieldValue.arrayUnion(state.firebaseUid)
        });
        return { id: doc.id, name: data.name, code: data.code };
    } catch (e) {
        console.warn('joinGroup failed:', e.code || e.message);
        showNotification('Non riesco a entrare nel gruppo. Riprova.');
        return null;
    }
}

async function loadMyGroups() {
    if (!state.firebaseUid) return [];
    try {
        const snap = await db.collection('groups')
            .where('memberIds', 'array-contains', state.firebaseUid)
            .limit(20).get();
        return snap.docs.map(d => ({
            id: d.id,
            name: d.data().name,
            code: d.data().code,
            members: d.data().members || {},
            ownerId: d.data().ownerId
        }));
    } catch (e) {
        console.warn('loadMyGroups failed:', e.code || e.message);
        return [];
    }
}

async function leaveGroup(groupId) {
    if (!state.firebaseUid) return false;
    try {
        await db.collection('groups').doc(groupId).update({
            ['members.' + state.firebaseUid]: firebase.firestore.FieldValue.delete(),
            memberIds: firebase.firestore.FieldValue.arrayRemove(state.firebaseUid)
        });
        return true;
    } catch (e) {
        console.warn('leaveGroup failed:', e.code || e.message);
        return false;
    }
}

/* =============================================
   APPUNTI SUL CLOUD
   Un documento per utente e materia: sincronizzati
   tra dispositivi, condivisibili nella lobby.
   ============================================= */

function noteDocId(lobbyId) { return state.firebaseUid + '_' + lobbyId; }

async function loadNote(lobbyId) {
    if (!state.firebaseUid) return null;
    try {
        const doc = await db.collection('notes').doc(noteDocId(lobbyId)).get();
        return doc.exists ? doc.data() : null;
    } catch (e) {
        console.warn('loadNote failed:', e.code || e.message);
        return null;
    }
}

async function saveNote(lobbyId, text, shared) {
    if (!state.firebaseUid) return false;
    try {
        await db.collection('notes').doc(noteDocId(lobbyId)).set({
            uid: state.firebaseUid,
            authorName: state.playerName || 'Studente',
            lobbyId: lobbyId,
            text: text,
            shared: !!shared,
            uni: state.playerUni || state.playerScuola || '',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        return true;
    } catch (e) {
        console.warn('saveNote failed:', e.code || e.message);
        return false;
    }
}

// Appunti che altri hanno condiviso in questa materia
async function loadSharedNotes(lobbyId) {
    if (!state.firebaseUid) return [];
    try {
        const snap = await db.collection('notes')
            .where('lobbyId', '==', lobbyId)
            .limit(40)
            .get();
        return snap.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(n => n.shared && n.uid !== state.firebaseUid && (n.text || '').trim())
            .sort((a, b) => {
                const ta = a.updatedAt && a.updatedAt.toMillis ? a.updatedAt.toMillis() : 0;
                const tb = b.updatedAt && b.updatedAt.toMillis ? b.updatedAt.toMillis() : 0;
                return tb - ta;
            })
            .slice(0, 10);
    } catch (e) {
        console.warn('loadSharedNotes failed:', e.code || e.message);
        return [];
    }
}

/* =============================================
   SESSIONI PROGRAMMATE
   ============================================= */

async function createSession(lobbyId, lobbyName, startAt, note) {
    if (!state.firebaseUid) return null;
    try {
        const ref = await db.collection('sessions').add({
            lobbyId: lobbyId,
            lobbyName: lobbyName,
            note: note || '',
            startAt: startAt,                       // timestamp in ms
            creatorId: state.firebaseUid,
            creatorName: state.playerName || 'Studente',
            uni: state.playerUni || state.playerScuola || '',
            participants: [state.firebaseUid],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return ref.id;
    } catch (e) {
        console.warn('createSession failed:', e.code || e.message);
        showNotification('Non riesco a creare la sessione. Riprova.');
        return null;
    }
}

// Sessioni future rilevanti: della mia uni/scuola o dei miei gruppi
async function loadUpcomingSessions() {
    if (!state.firebaseUid) return [];
    const now = Date.now();
    try {
        const snap = await db.collection('sessions')
            .where('startAt', '>', now - 30 * 60000)   // anche quelle iniziate da poco
            .limit(60)
            .get();

        const uni = state.playerUni || state.playerScuola || '';
        const groupLobbyIds = (typeof myGroups !== 'undefined')
            ? myGroups.map(g => 'group_' + g.id) : [];

        return snap.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(s => s.uni === uni || groupLobbyIds.includes(s.lobbyId))
            .sort((a, b) => a.startAt - b.startAt)
            .slice(0, 12);
    } catch (e) {
        console.warn('loadUpcomingSessions failed:', e.code || e.message);
        return [];
    }
}

async function joinSession(sessionId) {
    if (!state.firebaseUid) return false;
    try {
        await db.collection('sessions').doc(sessionId).update({
            participants: firebase.firestore.FieldValue.arrayUnion(state.firebaseUid)
        });
        return true;
    } catch (e) {
        console.warn('joinSession failed:', e.code || e.message);
        return false;
    }
}

async function cancelSession(sessionId) {
    if (!state.firebaseUid) return false;
    try {
        await db.collection('sessions').doc(sessionId).delete();
        return true;
    } catch (e) {
        console.warn('cancelSession failed:', e.code || e.message);
        return false;
    }
}

/* =============================================
   AUTH STATE LISTENER
   ============================================= */

let authReady = false;

// Se l'accesso è passato da un redirect, il risultato arriva al ritorno:
// va raccolto, altrimenti l'utente resta fuori senza capire perché.
auth.getRedirectResult()
    .then((res) => {
        if (res && res.user) handleUserLogin(res.user);
    })
    .catch((e) => {
        console.warn('redirect result:', e.code || e.message);
        // "missing initial state": tipico dei browser interni delle app
        if (/missing initial state|web-storage|storage/i.test(e.message || '')) {
            if (typeof showInAppBrowserHelp === 'function') showInAppBrowserHelp();
        }
    });

auth.onAuthStateChanged(async (user) => {
    if (user) {
        // User is signed in
        state.firebaseUid = user.uid;
        state.firebaseEmail = user.email;

        if (!authReady) {
            authReady = true;
            await handleUserLogin(user);
        }
    } else {
        // No user — show auth modal
        authReady = true;
        closeModal('setup');
        openModal('auth');

        // Nel browser di un'altra app: niente Google, si va dritti su email
        if (typeof isInAppBrowser === 'function' && isInAppBrowser()) {
            showInAppBrowserHelp();
        }
    }
});
