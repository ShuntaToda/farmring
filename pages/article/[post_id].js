import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { db, auth, provider, storage } from "../../lib/firebase";
import { doc, getDoc, query } from "firebase/firestore";
import { Layout } from "../../components/layout/Layout";
import { useRemark } from "react-remark";
import dayjs from "dayjs";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const { post_id } = router.query;

  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [articleContent, setMarkdownSource] = useRemark();

  const getArticle = async () => {
    // 記事取得
    const docRef = doc(db, "posts", post_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 記事が存在したらセット
      let data = docSnap.data();
      data.createdAt = data.createdAt.toDate();
      setArticle(data);
      getAuthor(docSnap.data().uid);
    } else {
      alert("記事が取得できません");
    }
  };
  const getAuthor = async (uid) => {
    // 記事取得
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 記事が存在したらセット
      setAuthor(docSnap.data());
    } else {
      alert("記者が取得できません");
    }
  };

  useEffect(() => {
    if (router.isReady) getArticle();
  }, [post_id, router]);

  useEffect(() => {
    setMarkdownSource(article.content);
  }, [article]);
  return (
    <Layout>
      <div className="c-article-author container my-3 d-flex align-items-center">
        <Link href={`/users/${article.uid}/profile`}>
          <div className="c-article-author__image overflow-hidden rounded-circle">
            <img src={author.image}></img>
          </div>
        </Link>
        <Link href={`/users/${article.uid}/profile`} className={"text-decoration-none"}>
          <span className="c-article-author__name ms-3 text-dark">{author.name}</span>
        </Link>
      </div>
      <div className="c-article">
        <div className="c-article__head container">
          <div>{dayjs(article.createdAt).format("YYYY/MM/DD")}</div>
          <h1 className="c-article__title">{article.title}</h1>
          <div className="c-article__image">
            <img className="" src={article.image}></img>
          </div>
          <div className="c-article__tags overflow-auto d-flex my-2">
            {article.tags ? (
              <>
                {article.tags.map((tag, index) => (
                  <Link
                    href={{ pathname: "/search", query: { tag } }}
                    key={index}
                    className={
                      "text-dark text-decoration-none mx-1 py-1 px-3 bg-light rounded-pill border border-primary"
                    }
                  >
                    {tag}
                  </Link>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="c-article__content container py-4">{articleContent}</div>
        <div className="c-article__footer  py-4">
          <div className="container">
            <div className="c-article__footer-head mb-3 d-flex flex-wrap align-items-center">
              <Link href={`/users/${article.uid}/profile`}>
                <div className="c-article__footer-image">
                  <img src={author.image}></img>
                </div>
              </Link>

              <Link
                href={`/users/${article.uid}/profile`}
                className="text-dark text-decoration-none"
              >
                <div className="ms-3 fw-bold">{author.name}</div>
              </Link>
            </div>
            {author.address ? <div className="mb-3">{author.address}</div> : <></>}
            {author.content ? <div className="mb-3">{author.content}</div> : <></>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
