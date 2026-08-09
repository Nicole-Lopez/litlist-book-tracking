import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const FIREBASE_CONFIG = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}
const app = initializeApp(FIREBASE_CONFIG)

export const apiUserDb = getFirestore(app)

export const apiAuth = getAuth(app)
export const apiGoogleAuthProvider = new GoogleAuthProvider()

// profile (col)
// └── id del user (doc)
//     ├── recentActivity (col)
//     │   └── id del item (doc)
//     │       └── datos del item(campos)
//     ├── pagesHistory (col)
//     │   └── id del item (doc)
//     │       └── datos del item(campos)
//     └── booksReadHistory (col)
//         └── id del item (doc)
//             └── datos del item(campos)

// userSummary (col)
// └── id del user (doc)
//     ├── username (campo)
//     ├── photo (campo)
//     ├── favoriteCategories (campo)
//     ├── wantToReadLibrary (campo)
//     ├── currentlyReadingLibrary (campo)
//     └── alreadyReadLibrary (campo)

// libraries (col)
// └── id del user (doc)
//     ├── wantToReadLibrary (col)
//     │   └── id del libro (doc)
//     │       └── datos del libro(campos)
//     ├── currentlyReadingLibrary (col)
//     │   └── id del libro (doc)
//     │       ├── datos del libro(campos)
//     │       └── historial (col)
//     │           └── id del item (doc)
//     │               └── datos del item(campos)
//     └── alreadyReadLibrary (col)
//         └── id del libro (doc)
//             ├── datos del libro(campos)
//             └── historial (col)
//                 └── id del item (doc)
//                     └── datos del item(campos)
