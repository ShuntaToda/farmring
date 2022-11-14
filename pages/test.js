import React from "react";
import { auth, provider, db } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore/lite";

const test = () => {
  const [user] = useAuthState(auth);

  const login = () => {
    signInWithPopup(auth, provider);
  };

  const writeUserData = async () => {
    const res = await collection(db, "post").doc("aaa").set({
      content: "",
      title: "title",
      uid: "",
    });
  };
  const getData = async () => {
    const citiesCol = collection(db, "post");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    console.log(cityList);
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

      <div>
        <div>databasetest</div>
        <button className="btn btn-outline-primary" onClick={writeUserData}>
          書き込み
        </button>
        <button className="btn btn-outline-primary" onClick={getData}>
          テストボタン
        </button>
      </div>
    </div>
  );
};

export default test;
