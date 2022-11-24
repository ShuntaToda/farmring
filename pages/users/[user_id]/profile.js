import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { db, auth, provider, storage } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Layout } from "../../../components/layout/Layout";
import { useRemark } from "react-remark";
import UserItems from "../../../components/UserItems";

const Profile = () => {
  // ユーザー詳細ページ
  const router = useRouter();
  const { user_id } = router.query;

  const [user, setUser] = useState({});

  const getUser = async () => {
    // ユーザー取得
    const docRef = doc(db, "users", user_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 記事が存在したらセット
      setUser(docSnap.data());
    } else {
      alert("ユーザーが取得できません");
    }
  };

  useEffect(() => {
    getUser();
  }, [user_id]);

  return (
    <Layout>
      {user ? (
        <div className="c-profile pt-5">
          <div className="c-profile__head px-2">
            <div className="c-profile__image">
              <img className="rounded-circle" src={user.image}></img>
            </div>
            <div className="c-profile__name">
              <h2>{user.name}</h2>
            </div>
            <div className="c-profile__address">
              {user.address ? user.address : "設定無し"}
            </div>
            <div className="c-profile__content">
              {user.content ? user.content : "設定なし"}
            </div>
          </div>
          <UserItems uid={user_id}></UserItems>
        </div>
      ) : (
        <div>ユーザー情報がありません</div>
      )}
    </Layout>
  );
};

export default Profile;
