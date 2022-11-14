import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { auth, db, provider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const test = () => {
  const [user] = useAuthState(auth);

  const login = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <div>
      {user ? (
        <div>
          <div className="btn btn-primary" onClick={() => auth.signOut()}>
            サインアウト
          </div>
          <p>{auth.currentUser.displayName}</p>
          <img src={auth.currentUser.photoURL}></img>
        </div>
      ) : (
        <div className="btn btn-primary" onClick={login}>
          ログイン
        </div>
      )}
    </div>
  );
};

export default test;
