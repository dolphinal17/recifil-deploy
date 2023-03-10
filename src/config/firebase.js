import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyOaoKf5SYhu-1fC1Gsm_2q5a1Q8B29iU",
  authDomain: "firestore-328db.firebaseapp.com",
  projectId: "firestore-328db",
  storageBucket: "firestore-328db.appspot.com",
  messagingSenderId: "792728774707",
  appId: "1:792728774707:web:707d090b3f4dbb53bfdb46"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth,
}