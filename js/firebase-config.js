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
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;
        await handleUserLogin(user);
        return user;
    } catch (error) {
        console.error('Google sign-in error:', error);
        showNotification('Errore nel login con Google. Riprova.');
        return null;
    }
}

async function signInWithEmail(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        await handleUserLogin(result.user);
        return result.user;
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            // Auto-create account
            return await registerWithEmail(email, password);
        }
        console.error('Email sign-in error:', error);
        showNotification('Email o password non corretti.');
        return null;
    }
}

async function registerWithEmail(email, password) {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        await handleUserLogin(result.user, true);
        return result.user;
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 'auth/email-already-in-use') {
            showNotification('Email già registrata. Prova ad accedere.');
        } else if (error.code === 'auth/weak-password') {
            showNotification('Password troppo debole (min 6 caratteri).');
        } else {
            showNotification('Errore nella registrazione. Riprova.');
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

async function loadCommunityFromFirestore() {
    const uniName = state.playerUni || state.playerScuola;
    if (!uniName) return [];

    try {
        const snapshot = await db.collection('users')
            .where('uni', '==', uniName)
            .orderBy('xp', 'desc')
            .limit(20)
            .get();

        return snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(u => u.id !== state.firebaseUid);
    } catch (error) {
        console.error('Community load error:', error);
        return [];
    }
}

/* =============================================
   AUTH STATE LISTENER
   ============================================= */

let authReady = false;

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
    }
});
