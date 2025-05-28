/***************************************************************/
// fb_io.mjs
//
//
/***************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log(`%c  fb_io.mjs  `, `color: ${COL_C}; background-color: ${COL_B}`);

// Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getDatabase, ref, set, get, orderByChild, limitToFirst, query } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Exports
export { fb_initialiseAndAuth, fb_initialise, fb_write, fb_read, fb_sortedRead, getAuth };


/***************************************************************/
// fb_initialiseAndAuth()
// Called by button in index.html
// Initialises firebase and authenticates with Google
// Input: None
// Output: None
/***************************************************************/
function fb_initialiseAndAuth() {
    console.log(`%c  fb_authenticateAndAuth()  `, `color: ${COL_C}; background-color: ${COL_B}`);

    // Initialise firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCkKH0pJ-Fo9axQNsBswxIwZyuruG1X6ts",
        authDomain: "comp-2025-idrees-munshi-24d0e.firebaseapp.com",
        databaseURL: "https://comp-2025-idrees-munshi-24d0e-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp-2025-idrees-munshi-24d0e",
        storageBucket: "comp-2025-idrees-munshi-24d0e.firebasestorage.app",
        messagingSenderId: "811934625308",
        appId: "1:811934625308:web:a1ff1ffffdcab01bcd79d9",
        measurementId: "G-7P3VZN9ZFD"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Authenticate with Google
    let auth = getAuth();
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(auth, provider).then((result) => {
        console.log(result.user);
    }).catch((error) => {
        console.log(error)
    });
}

function fb_initialise() {
    console.log(`%c  fb_initialise()  `, `color: ${COL_C}; background-color: ${COL_B}`);

    // Initialise firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCkKH0pJ-Fo9axQNsBswxIwZyuruG1X6ts",
        authDomain: "comp-2025-idrees-munshi-24d0e.firebaseapp.com",
        databaseURL: "https://comp-2025-idrees-munshi-24d0e-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp-2025-idrees-munshi-24d0e",
        storageBucket: "comp-2025-idrees-munshi-24d0e.firebasestorage.app",
        messagingSenderId: "811934625308",
        appId: "1:811934625308:web:a1ff1ffffdcab01bcd79d9",
        measurementId: "G-7P3VZN9ZFD"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
}

/***************************************************************/
// fb_write()
// Called by button in index.html
// Writes data to firebase
// Input: _data (object) - data to write
// Output: None
/***************************************************************/
function fb_write(_data) {
    console.log(`%c  fb_write()  `, `color: ${COL_C}; background-color: ${COL_B}`);

    const db = getDatabase();
    const auth = getAuth();
    const refPath = ref(db, 'salsStrawberrySaloon/users/' + auth.currentUser.uid);
    set(refPath, _data);
}

function fb_read(_path) {
    console.log(`%c  fb_read()  `, `color: ${COL_C}; background-color: ${COL_B}`);

    if (!getAuth().currentUser) {
        console.log('No user logged in');
        throw new Error('No user logged in');
    }

    const db = getDatabase();
    const auth = getAuth();
    const refPath = ref(db, _path);
    return get(refPath).then((snapshot) => {
        let fbdata = snapshot.val();
        return fbdata;
    }).catch((error) => {
        console.log(error);
    });
}

function fb_sortedRead(_path, _sortKey, _numberOfItems) {
    console.log(`%c  fb_sortedRead()  `, `color: ${COL_C}; background-color: ${COL_B}`);

    const DB = getDatabase();
    const QUERY = query(ref(DB, _path), orderByChild(_sortKey), limitToFirst(_numberOfItems));
    return get(QUERY).then((snapshot) => {
        let fbdata = []
        snapshot.forEach((childSnapshot) => {
            fbdata.push(childSnapshot.val().name + ': ' + childSnapshot.val().favoriteFruit);
        })
        return fbdata;
    })
}

