import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { db, auth, provider, storage } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Layout } from "../../components/layout/Layout";
import { useRemark } from "react-remark";

const Index = () => {
  const ref = useRef();
  const router = useRouter();
  const { post_id } = router.query;

  const [article, setArticle] = useState({});
  const [articleContent, setMarkdownSource] = useRemark();

  const getArticle = async () => {
    // 記事取得
    const docRef = doc(db, "posts", post_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 記事が存在したらセット
      setArticle(docSnap.data());
    } else {
      alert("記事が取得できません");
    }
  };

  useEffect(() => {
    getArticle();
  }, [post_id]);

  useEffect(() => {
    setMarkdownSource(article.content);
  }, [article]);
  return (
    <Layout>
      <div className="c-article">
        <div className="c-article__head">
          <h2 className="c-article__title">{article.title}</h2>
        </div>
        <div className="c-artcle__content">{articleContent}</div>
      </div>
    </Layout>
  );
};

export default Index;
