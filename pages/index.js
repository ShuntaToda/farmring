import { useEffect, useState } from "react";
import { db, auth, provider, storage } from "../lib/firebase";
import { collection, addDoc, getDocs, limit, orderBy, getDoc, doc } from "firebase/firestore";
import { Layout } from "../components/layout/Layout";
import Article from "../components/Article";
import Product from "../components/Product";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [product, setProduct] = useState([]);

  const getAuthor = async (items, set) => {
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
    set(result);
  };

  const getArticles = async () => {
    // 記事を取得（10個、作成順）
    const querySnapshot = await getDocs(collection(db, "posts"), limit(10), orderBy("createdAt"));
    let items = [];

    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });

    items = getAuthor(items, setArticles);
  };

  const getProducts = async () => {
    // 記事を取得（10個、作成順）
    const querySnapshot = await getDocs(
      collection(db, "products"),
      limit(10),
      orderBy("createdAt")
    );
    let items = [];

    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });

    items = getAuthor(items, setProduct);
  };

  useEffect(() => {
    getProducts();
    getArticles();
  }, []);

  return (
    <Layout>
      <div className="c-home-page">
        <div className="c-home-page__article">
          <div className="c-home-page__head container">
            <div className="c-home-page__title">
              <h2>記事一覧</h2>
            </div>
          </div>
          <div className="c-home-page__content">
            <div className="c-home-page__articles container">
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
        </div>

        <div className="c-home-page__product">
          <div className="c-home-page__head container">
            <div className="c-home-page__title">
              <h2>商品一覧</h2>
            </div>
          </div>
          <div className="c-home-page__content">
            <div className="c-home-page__products container">
              {product.map((product) => (
                <Product
                  product={product.data}
                  author={product.author}
                  id={product.id}
                  key={product.id}
                ></Product>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
