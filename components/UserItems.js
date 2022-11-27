import React, { useEffect, useState } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";

const UserItems = ({ uid }) => {
  const [articles, setArticles] = useState([]);
  const [isShowArticle, setIsShowArticle] = useState(true);

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
  };
  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div className="c-user-items">
      <div className="c-user-items__head d-flex align-items-center justify-content-around">
        <span
          onClick={() => {
            setIsShowArticle(true);
          }}
          className={`${isShowArticle ? "active" : ""}`}
        >
          記事一覧
        </span>
        <span
          onClick={() => {
            setIsShowArticle(false);
          }}
          className={`${isShowArticle ? "" : "active"}`}
        >
          商品
        </span>
      </div>
      <div className={`c-user-items__contents ${isShowArticle ? "" : "shop"}`}>
        {isShowArticle ? (
          <>
            {articles.length === 0 ? (
              <div className="h-100">記事がありません</div>
            ) : (
              <>
                {articles.map((article, index) => (
                  <Link
                    href={`/article/${article.id}`}
                    className="text-dark text-decoration-none"
                    key={article.id}
                  >
                    <div className="c-user-items__article">
                      <div className="c-user-items__article-image">
                        <img src={article.data.image}></img>
                      </div>
                      <div className="c-user-items__article-content">
                        <h4>{article.data.title}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {articles.length === 0 ? (
              <div className="h-100">記事がありません</div>
            ) : (
              <>
                {articles.map((article, index) => (
                  <Link
                    href={`/article/${article.id}`}
                    className="text-dark text-decoration-none"
                    key={article.id}
                  >
                    <div className="c-user-items__article">
                      <div className="c-user-items__article-image">
                        <img src={article.data.image}></img>
                      </div>
                      <div className="c-user-items__article-content">
                        <h4>{article.data.title}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserItems;
