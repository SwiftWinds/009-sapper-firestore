import firebaseConfig from './firebaseConfig';

export async function firebase() {
    if (process.browser) {
        console.log("im firebase() client");
        return window.db;
    } else {
        const firebase = await import('firebase');
        await import('firebase/firestore');
        if (firebase.apps.length == 0) {
            console.log("im firebase() server uninitialized");
            let app = firebase.initializeApp(firebaseConfig);
            return app;
        }
        else {
            console.log("im firebase() server initialized");
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