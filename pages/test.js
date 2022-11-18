import React, { useEffect, useRef, useState } from "react";
import { db, auth, provider, storage } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Yamde from "yamde";
import { useRemark } from "react-remark";
import Article from "../components/Article";
import { Layout } from "../components/layout/Layout";

const test = () => {
  const [user] = useAuthState(auth);
  const [reactContent, setMarkdownSource] = useRemark();
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);
  const image = useRef(null);

  const login = () => {
    signInWithPopup(auth, provider);
  };

  const testPost = async (url) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        image: url,
        uid: auth.currentUser.uid,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const get = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let items = [];
    querySnapshot.forEach((doc) => {
      items = [...items, doc.data()];
    });
    setArticles(items);
  };

  const uploadImage = () => {
    const storageRef = ref(
      storage,
      `images/${auth.currentUser.uid}/${image.current.files[0].name}`
    );
    uploadBytes(storageRef, image.current.files[0]).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
          testPost(url);
        })
        .catch((error) => console.log(error));
    });
  };

  const changeContent = (e) => {
    setContent(e);
  };

  useEffect(() => {
    setMarkdownSource(content);
  }, [content]);
  return (
    <Layout>
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

        <div className="border m-2">
          <div>
            <div>
              <label>タイトル</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <Yamde value={content} handler={changeContent} theme="light" required />
            {reactContent}
            <button className="btn btn-primary" onClick={uploadImage}>
              送信
            </button>
            <input type="file" ref={image}></input>
            <img src={imageUrl} height="200px" width="200px"></img>
          </div>
        </div>
        <button className="btn btn-primary" onClick={get}>
          記事GETボタン
        </button>
        <div>
          {articles.map((article, index) => (
            <Article key={index} article={article}></Article>
          ))}
        </div>
        <div>
          <button className="btn btn-primary" onClick={get}>
            GETボタン
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default test;
