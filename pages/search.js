import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
import Select from "react-select";
import { Layout } from "../components/layout/Layout";
import Article from "../components/Article";
import { useRouter } from "next/router";
import Product from "../components/Product";
import Link from "next/link";

const Search = () => {
  const [tags, setTags] = useState([]);
  const [article, setArticles] = useState([]);
  const [products, setProducts] = useState([]);

  const [tagsOption, setTagsOption] = useState([]);

  const router = useRouter();
  const defaultTag = router.query.tag;
  const [selectedTags, setSelectedTags] = useState(
    defaultTag ? [{ value: defaultTag, label: defaultTag }] : []
  );

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
  const getArticles = async (uploadTags) => {
    let q;
    q = query(collection(db, "posts"), where("tags", "array-contains-any", ["", ...uploadTags]));
    const querySnapshot = await getDocs(q);
    let items = [];

    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });

    items = getAuthor(items, setArticles);
  };
  const getProducts = async (uploadTags) => {
    let q;
    q = query(collection(db, "products"), where("tags", "array-contains-any", ["", ...uploadTags]));
    const querySnapshot = await getDocs(q);
    let items = [];

    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });

    items = getAuthor(items, setProducts);
  };

  const getTags = async () => {
    const tagsRef = collection(db, "tags");
    const q = query(tagsRef);
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });
    setTags(items);
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    const tagsArray = tags.map((tag) => {
      return { value: tag.data.name, label: tag.data.name };
    });
    setTagsOption(tagsArray);
    const uploadTags = selectedTags.map((tag) => {
      return tag.value;
    });
    getArticles(uploadTags);
    getProducts(uploadTags);
  }, [tags, selectedTags]);
  return (
    <Layout>
      <div className="c-search mt-5 container">
        <div className="d-flex justify-content-between">
          <h2>記事・商品検索</h2>
          <Link href="/search-user">
            <div className="btn btn-outline-primary">ユーザー検索</div>
          </Link>
        </div>
        <div className="mb-3">
          <Select
            value={selectedTags}
            onChange={(e) => {
              setSelectedTags(e);
            }}
            isMulti
            options={tagsOption}
          ></Select>
        </div>
        <div className="c-search__content">
          <div className="c-search__articles">
            {article.map((art, index) => (
              <Article article={art.data} author={art.author} id={art.id} key={art.id}></Article>
            ))}
          </div>
          <div className="c-search__products">
            {products.map((product, index) => (
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
    </Layout>
  );
};

export default Search;
