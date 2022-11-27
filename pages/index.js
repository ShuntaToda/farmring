import { useEffect, useState } from "react";
import { db, auth, provider, storage } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  limit,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { Layout } from "../components/layout/Layout";
import Article from "../components/Article";

export default function Home() {
  const [articles, setArticles] = useState([]);

  const getAuthor = async (items) => {
    // 記者取得
    const result = await Promise.all(
      items.map(async (art) => {
        const docRef = doc(db, "users", art.data.uid);
        const userDoc = await getDoc(docRef);
        const author = userDoc.data();
        art.author = author;
        return art;
      })
    );
    setArticles(result);
  };

  const getArticles = async () => {
    // 記事を取得（10個、作成順）
    const querySnapshot = await getDocs(
      collection(db, "posts"),
      limit(10),
      orderBy("createdAt")
    );
    let items = [];

    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });

    items = getAuthor(items);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Layout>
      <div className="c-home-page">
        <div className="c-home-page__head container">
          <div className="c-home-page__title">
            <h2>記事一覧</h2>
          </div>
        </div>
        <div className="c-home-page__content container">
          {articles.map((article) => (
            <Article
              article={article.data}
              author={article.author}
              id={article.id}
              key={article.id}
            ></Article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
