import React, { useEffect } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
import { signInWithPopup, onAuthStateChanged, getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, getDoc, getDocs, limit, query, where } from "firebase/firestore";
const Login = () => {
  const [user] = useAuthState(auth);
  const login = () => {
    signInWithPopup(auth, provider);
  };
  console.log("login実行");
  const userCheck = async (login) => {
    // userの変更があったら発火
    console.log("aaa");
    if (login) {
      // ログインしているか確認
      // ログインしているユーザーのuidが同じデータを取得
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", auth.currentUser.uid));
      const userData = await getDocs(q);
      if (userData.empty) {
        // 該当ユーザーがいなかったら新規登録
        console.log("該当ユーザーなし");
      }
    }
  };

  onAuthStateChanged(getAuth(), userCheck);

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
