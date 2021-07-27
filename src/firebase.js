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
            // Signed in
            const user = userCredential.user;
            setData(`/users/${user.uid}`, {
                email
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

export function signUser(email, password) {
    const auth = firebase.auth();

     return auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

export function pushData(path = '/', data, name, description) {
    const database = firebase.database();
    const key = database.ref().child(path).push().key;
    database.ref(`${path}/${key}`).set(data);

    insertDocsOffline(name, description, key, true)

}

export function createDocument(name, description) {
    const auth     = firebase.auth();
    const user = auth.currentUser;

    if (user !== null) {
        pushData(`/documents`, {
            name: name,
            description: description,
            user: user.uid
        }, name, description);
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
    console.log(path)

    ref.on('value', (snapshot) => {
        console.log('plop')
        cb(snapshot.val());
    })

}

export function updateDoc(path = '/', datas) {

    const database = firebase.database();
    const ref = database.ref(path);
    ref.update({'description' : ''}).then(() => {
        ref.update({'description': datas})
    })

    insertDocsOffline(null, datas, ref.key, false)


}

export function insertDocsOffline(name, description, key, editOrInsert) {
    const request = indexedDB.open('offline-database', 1);
    request.onupgradeneeded = (event) => {
        let db = event.target.result;

        db.createObjectStore('Documents', {
            autoIncrement: true
        });

    };

    if (editOrInsert) {
        request.onsuccess = (event) => {
            const db = event.target.result;

            insertDoc(db, {
                name: name,
                description: description
            }, key);

        };
    } else {
        request.onsuccess = (event) => {
            const db = event.target.result;

            updateDocIdb(db, description, key);

        };
    }


}

export function insertDoc(db, document, key) {
    // create a new transaction
    const txn = db.transaction('Documents', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('Documents');
    //
    let query = store.put(document, key);


    // handle success case
    query.onsuccess = function (event) {
        console.log(event);
    };

    // handle the error case
    query.onerror = function (event) {
        console.log(event.target.errorCode);
    }

    // close the database once the
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}


export function updateDocIdb(db, document, key) {
    // create a new transaction
    const txn = db.transaction('Documents', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('Documents');
    //
    store.get(key).onsuccess = function(e) {
        var obj = e.target.result;
        obj.description = document;
        store.put(obj, key);
    };

    // close the database once the
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}
