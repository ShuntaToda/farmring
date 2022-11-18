import React, { useEffect } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
import { signInWithPopup, onAuthStateChanged, getAuth, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
const Login = () => {
  const [user] = useAuthState(auth);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        userCheck();
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const addUser = async () => {
    // ユーザー追加
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: auth.currentUser.displayName,
      content: "",
      image: auth.currentUser.photoURL,
      createdAt: new Date(),
    });
  };

  const userCheck = async () => {
    // ログインしているユーザーのuidが同じデータを取得
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", auth.currentUser.uid));
    const userData = await getDocs(q);
    if (userData.empty) {
      // 該当ユーザーがいなかったら新規登録
      addUser();
    }
  };

  // onAuthStateChanged(getAuth(), userCheck);

  return (
    <>
      {user ? (
        <div className="h-100">
          <div className="h-100 d-flex align-items-center">
            <div className="h-100 p-3">
              <img className="h-100 rounded-circle" src={auth.currentUser.photoURL}></img>
            </div>
            <span>{auth.currentUser.displayName}</span>
            <div className="btn btn-primary mx-4" onClick={() => auth.signOut()}>
              サインアウト
            </div>
          </div>
        </div>
      ) : (
        <div className="h-100 d-flex align-items-center">
          <div className="btn btn-primary mx-4" onClick={login}>
            ログイン
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
