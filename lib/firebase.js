import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1LmH7uj35VdqxtTQFF8kYuAOGombNU4I",
  authDomain: "farmring-2b3ac.firebaseapp.com",
  projectId: "farmring-2b3ac",
  storageBucket: "farmring-2b3ac.appspot.com",
  messagingSenderId: "944560247926",
  appId: "1:944560247926:web:b14c8c0316ed6094b2fb57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, provider, storage };
