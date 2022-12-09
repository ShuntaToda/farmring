import React, { useEffect, useState } from "react";

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
  const [userImage, setUserImage] = useState("");

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        userCheck(result.user);
        // ...
      })
      .catch((error) => {
        console.error(error);
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

  const getUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserImage(docSnap.data().image);
    }
  };

  const addUser = async () => {
    // ユーザー追加
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: auth.currentUser.displayName,
      content: "",
      image: auth.currentUser.photoURL,
      createdAt: new Date(),
      tags: {
        pref: "01",
        city: "",
      },
    });
  };

  const userCheck = async (resultUser) => {
    // ログインしているユーザーのuidが同じデータを取得
    const userRef = doc(db, "users", resultUser.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.data() === undefined) {
      // 該当ユーザーがいなかったら新規登録
      addUser();
    }
  };

  useEffect(() => {
    if (user) {
      getUser(user.uid);
    }
  }, [user]);

  return (
    <>
      {user ? (
        <div className="dropdown h-100 c-login">
          <button
            className="c-login__btn btn btn-light dropdown-toggle h-100 d-block"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="c-login__image">
              <img className="" src={userImage}></img>
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
            <li>
              <h6 className="dropdown-header">{auth.currentUser.displayName}</h6>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => auth.signOut()}>
                サインアウト
              </button>
            </li>
          </ul>
          <div className="h-100">
            <div className="h-100 d-flex align-items-center">
              <div className="h-100 p-3"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-100 d-flex align-items-center">
          <div className="btn btn-outline-primary mx-4" onClick={login}>
            ログイン
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
