import { useEffect, useState } from "react";
import { db, auth, provider, storage } from "../lib/firebase";
import { collection, addDoc, getDocs, limit, orderBy, getDoc, doc } from "firebase/firestore";
import { Layout } from "../components/layout/Layout";
import Article from "../components/Article";

export default function Home() {
  const [articles, setArticles] = useState([]);

  const getAuthor = async (id) => {
    const docRef = doc(db, "users", id);
    const userDoc = await getDoc(docRef);
    const author = userDoc.data();
    return author;
  };

  const getArticles = async () => {
    // 記事を取得（10個、作成順）
    const querySnapshot = await getDocs(collection(db, "posts"), limit(10), orderBy("createdAt"));
    let items = [];

    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });

    items = items.map((art) => {
      const author = getAuthor(art.id);
      art.author = author;
      return art;
    });

    console.log(items);
    setArticles(items);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Layout>
      <section className="l-section container">
        <div className="c-articles">
          <div className="c-articles__head">
            <div className="c-articles__title">
              <h2>記事一覧</h2>
            </div>
          </div>
          <div className="c-articles__content">
            {articles.map((article) => (
              <Article article={article.data} id={article.id} key={article.id}></Article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
