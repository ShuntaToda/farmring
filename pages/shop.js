import { useEffect, useState } from "react";
import { db, auth, provider, storage } from "../lib/firebase";
import { collection, addDoc, getDocs, limit, orderBy, getDoc, doc } from "firebase/firestore";
import { Layout } from "../components/layout/Layout";
import Article from "../components/Article";
import Product from "../components/Product";

export default function Shop() {
  const [products, setProducts] = useState([]);

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
    setProducts(result);
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

    items = getAuthor(items);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="c-home-page">
        <div className="c-home-page__head container">
          <div className="c-home-page__title">
            <h2>商品一覧</h2>
          </div>
        </div>
        <div className="c-home-page__content container">
          {products.map((article) => (
            <Product
              product={article.data}
              author={article.author}
              id={article.id}
              key={article.id}
            ></Product>
          ))}
        </div>
      </div>
    </Layout>
  );
}
