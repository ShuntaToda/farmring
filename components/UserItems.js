import React, { useEffect, useState } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

const UserItems = ({ uid }) => {
  const [articles, setArticles] = useState([]);
  const citiesRef = collection(db, "posts");
  const getArticles = async () => {
    const q = query(citiesRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });
    setArticles(items);
    console.log(items);
  };
  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div className="c-user-items">
      <div className="c-user-items__head d-flex align-items-center justify-content-around">
        <span>記事一覧</span>
        <span>ショップ</span>
      </div>
      <div className="c-user-items__contents">
        {articles.map((article, index) => (
          <div key={article.data.id} className="c-user-items__article">
            <div className="c-user-items__article-image">
              <img src={article.data.image}></img>
            </div>
            <div className="c-user-items__article-content">
              <h4>{article.data.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserItems;
