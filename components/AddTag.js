import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
const AddTag = () => {
  const [tagName, setTagName] = useState("");

  const storeTag = async () => {
    const docRef = await addDoc(collection(db, "tags"), {
      name: tagName,
    });
    setTagName("");
  };
  return (
    <div className="mb-3">
      <h5>タグ追加</h5>
      <input
        className="form-control"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
      ></input>
      <button className="btn btn-outline-primary" onClick={storeTag}>
        追加
      </button>
    </div>
  );
};

export default AddTag;
