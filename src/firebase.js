import firebase from "firebase/app";

import 'firebase/database';
import 'firebase/auth';

const apiKey = import.meta.env.API_KEY
const authDomain = import.meta.env.AUTH_DOMAIN
const databaseURL = import.meta.env.DATABASE_URL
const projectId = import.meta.env.PROJECT_ID
const storageBucket = import.meta.env.STORAGE_BUCKET
const messagingSenderId = import.meta.env.MESSAGING_SENDER_ID
const appId = import.meta.env.APP_ID

export function initFirebase() {
    firebase.initializeApp({
        apiKey,
        authDomain,
        databaseURL,
        projectId,
        storageBucket,
        messagingSenderId,
        appId
    })
}

export function setData(path = '/', data) {
    const database = firebase.database();
    return database.ref(path).set(data);
}

export function createUser(email, password) {
    const auth = firebase.auth();

    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setData(`/users/${user.uid}`, {
                email
            });
            localStorage.setItem('currentUser', JSON.stringify(userCredential.user));
        })
        .catch((error) => {
            return error.code
        });
}

export function signOut() {
    const auth = firebase.auth();
    return auth.signOut().then(() => {
        localStorage.removeItem('currentUser');
        window.alert('Deconnexion réussi');
    });
}

export function signUser(email, password) {
    const auth = firebase.auth();

    return auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            localStorage.setItem('currentUser', JSON.stringify(userCredential.user));
            return userCredential.user;
        })
        .catch((error) => {
            if (error.code !== undefined) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        return {
                            'successful': false,
                            'message': 'Utilisateur non trouvé'
                        }
                    case 'auth/wrong-password':
                        return {
                            'successful': false,
                            'message': 'Mot de passe incorrect'
                        }
                }
            }
        });
}

export function pushData(path = '/', data) {
    const database = firebase.database();
    const key = database.ref().child(path).push().key;
    database.ref(`${path}/${key}`).set(data);

}

export function createDocument(name, description) {
    const auth = firebase.auth();
    const user = auth.currentUser;

    if (user !== null) {
        pushData(`/documents`, {
            name: name,
            description: description,
            user: user.uid
        });
    } else {
        return 'error: Not connected'
    }
}


export function subscribeDocs(path = '/', cb = () => {}) {
    const database = firebase.database();
    let list = [];
    database.ref().child(path)
        .on('child_added', (data) => {
            list.push(data);
            cb(list);
        });
    database.ref().child(path)
        .on('child_removed', (data) => {
            list = list.filter(item => item.key !== data.key);
            cb(list);
        });

}

export function getDoc(path = '/', cb = () => {}) {
    const database = firebase.database();
    const ref = database.ref(path);
    ref.on('value', (snapshot) => {
        cb(snapshot.val());
    })

}

export function updateDoc(path = '/', datas) {
    const database = firebase.database();
    const ref = database.ref(path);
    ref.update({'description': htmlentities.encode(datas)})
}

window.htmlentities = {
    encode : function(str) {
        var buf = [];

        for (var i=str.length-1;i>=0;i--) {
            buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }

        return buf.join('');
    },
    decode : function(str) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
    }
};
