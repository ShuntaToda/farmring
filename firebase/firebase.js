// firebaseをimportしています
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpy_wbLde4q-PW4IclFKNP9hrZSYOmS4k",
  authDomain: "farmring-b3242.firebaseapp.com",
  projectId: "farmring-b3242",
  storageBucket: "farmring-b3242.appspot.com",
  messagingSenderId: "546067550584",
  appId: "1:546067550584:web:f5dd48cd0c526db10af88d",
  measurementId: "G-BXT7PR8KDT",
};
// Firebaseのインスタンスが存在しない場合にのみ、インスタンスを作成します
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
