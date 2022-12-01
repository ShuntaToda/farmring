import React, { useEffect, useState } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/Login";

import { doc, getDoc } from "firebase/firestore";
import { Layout } from "../components/layout/Layout";
import { useRemark } from "react-remark";
import UserItems from "../components/UserItems";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const User = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [isShowArticle, setIsShowArticle] = useState(true);

  const getUser = async () => {
    // ユーザー取得
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 記事が存在したらセット
      setUserData(docSnap.data());
      console.log(docSnap.data());
    } else {
      alert("ユーザーが取得できません");
    }
  };

  const postsRef = collection(db, "posts");
  const productsRef = collection(db, "products");
  const getArticles = async () => {
    const q = query(postsRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });
    setArticles(items);
  };
  const getProducts = async () => {
    const q = query(productsRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });
    setProducts(items);
  };
  useEffect(() => {
    getArticles();
    getProducts();
  }, []);

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return (
    <Layout>
      <div className="c-user">
        {user ? (
          <div className="c-profile pt-5">
            <div className="c-profile__head px-2">
              <div className="d-flex justify-content-between align-items-center ">
                <div className="c-profile__image">
                  <img className="rounded-circle" src={userData.image}></img>
                </div>
                <div>
                  <Link href="/edit/profile" className=" text-decoration-none">
                    <div className="c-profile__edit  d-flex align-items-center btn btn-outline-secondary">
                      <span>
                        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                      </span>
                      <span>プロフィール編集</span>
                    </div>
                  </Link>
                  <div className="dropdown">
                    <div
                      className="c-profile__edit  d-flex align-items-center btn btn-outline-secondary dropdown-toggle"
                      id="editItems"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span>
                        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                      </span>
                      <span>記事・商品編集</span>
                    </div>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="#editItems">
                      <li>
                        <h6 className="dropdown-header">記事</h6>
                      </li>
                      {articles.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={`/edit/article/${item.id}`}
                            className="dropdown-item text-dark text-decoration-none"
                          >
                            {item.data.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <h6 className="dropdown-header">商品</h6>
                      </li>
                      {products.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={`/edit/product/${item.id}`}
                            className="dropdown-item text-dark text-decoration-none"
                          >
                            {item.data.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="c-profile__name">
                <h2>{userData.name}</h2>
              </div>
              <div className="c-profile__address">
                {userData.address ? userData.address : "設定無し"}
              </div>
              <div className="c-profile__content">
                {userData.content ? userData.content : "設定なし"}
              </div>
            </div>
            <div className="mt-4 w-100 d-flex justify-content-around">
              <Link href={"/create/post"}>
                <div className="btn btn-outline-primary">
                  <span>記事を追加</span>
                </div>
              </Link>
              <Link href={"/create/product"}>
                <div className="btn btn-outline-primary">
                  <span>商品を追加</span>
                </div>
              </Link>
            </div>
            <UserItems uid={user.uid}></UserItems>
          </div>
        ) : (
          <div className="c-user__login ">
            <Login></Login>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default User;
