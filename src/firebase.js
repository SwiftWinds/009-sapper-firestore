import firebaseConfig from './firebaseConfig';

export async function firebase() {
    if (process.browser) {
        return window.firebase;
    } else {
        const firebase = await import('firebase');
        if (firebase.apps.length == 0) {
            let app = firebase.initializeApp(firebaseConfig);
            return app;
        }
        else {
            return firebase.apps[0];
        }
    }
}

export async function firestore() {
    if (process.browser) {
        return window.db;
    } else {
        const firebase = await import('firebase');
        if (firebase.apps.length == 0) {
            let app = firebase.initializeApp(firebaseConfig);
            return app.firestore();
        }
        else {
            return firebase.apps[0].firestore();
        }
    }
}