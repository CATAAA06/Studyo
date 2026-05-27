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
        console.error('Google sign-in error:', error.code, error.message);

        if (error.code === 'auth/popup-blocked') {
            showNotification('Popup bloccato! Disattiva il blocco popup per questo sito.');
        } else if (error.code === 'auth/popup-closed-by-user') {
            // User closed the popup, no error needed
        } else if (error.code === 'auth/unauthorized-domain') {
            showNotification('Dominio non autorizzato su Firebase. Aggiungi il dominio nelle impostazioni.');
        } else if (error.code === 'auth/cancelled-popup-request') {
            // Ignore
        } else {
            showNotification('Errore Google: ' + error.code);
        }
        return null;
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
