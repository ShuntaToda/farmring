import React, { useEffect, useState } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
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
                <Link href="/edit/profile" className=" text-decoration-none">
                  <div className="c-profile__edit  d-flex align-items-center btn btn-outline-secondary">
                    <span>
                      <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                    </span>
                    <span>プロフィール編集</span>
                  </div>
                </Link>
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
              <Link href={""}>
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
