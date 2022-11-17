import React from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
const post = () => {
  const testPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: "Ada",
        content: "Lovelace",
        uid: 1815,
      });
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const get = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={testPost}>
        テストボタン
      </button>
      <button className="btn btn-primary" onClick={get}>
        GETボタン
      </button>
    </div>
  );
};

export default post;
