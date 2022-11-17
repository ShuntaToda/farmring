import { useEffect, useState } from "react";
import { db, auth, provider, storage } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Layout } from "../components/layout/Layout";
import Article from "../components/Article";

export default function Home() {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let items = [];
    querySnapshot.forEach((doc) => {
      items = [...items, doc.data()];
    });
    setArticles(items);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Layout>
      <div className="c-articles">
        <div className="c-articles__head">
          <div className="c-articles__title">
            <h2>記事一覧</h2>
          </div>
        </div>
        <div className="c-articles__content">
          {articles.map((article, index) => (
            <Article article={article} key={index}></Article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
