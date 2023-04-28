import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth, updateProfile} from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyCHFx0B0krQVivgCkaOPhLmMx8tfdV7Qso",
//   authDomain: "recifil.firebaseapp.com",
//   databaseURL: "https://recifil-default-rtdb.firebaseio.com",
//   projectId: "recifil",
//   storageBucket: "recifil.appspot.com",
//   messagingSenderId: "986428398442",
//   appId: "1:986428398442:web:d43a57605bffe2f3a6a313",
//   measurementId: "G-BF98SLQW1L"
// };



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
const storage = getStorage(app)

export {
    db,
    auth,
    storage,
}

