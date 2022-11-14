import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBpy_wbLde4q-PW4IclFKNP9hrZSYOmS4k",
  authDomain: "farmring-b3242.firebaseapp.com",
  projectId: "farmring-b3242",
  storageBucket: "farmring-b3242.appspot.com",
  messagingSenderId: "546067550584",
  appId: "1:546067550584:web:f5dd48cd0c526db10af88d",
  measurementId: "G-BXT7PR8KDT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
console.log(db);
export { auth, provider, db };
