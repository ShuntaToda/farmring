import React from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
const Post = () => {
  const testPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: "Ada",
        content: "Lovelace",
        uid: 1815,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const get = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {});
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

export default Post;
