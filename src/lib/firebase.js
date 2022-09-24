import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDd8KnoD1EmgfqSTEe3Ui8Lwtj-IdQj5jM",
    authDomain: "infoskjerm-73b74.firebaseapp.com",
    projectId: "infoskjerm-73b74",
    storageBucket: "infoskjerm-73b74.appspot.com",
    messagingSenderId: "31063728365",
    appId: "1:31063728365:web:370144425f9e6301aface4",
    measurementId: "G-6YCXLYSSY9"
  };
  
  const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth();

export const googleAuthProvider = new GoogleAuthProvider();
