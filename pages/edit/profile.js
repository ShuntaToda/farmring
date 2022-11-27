import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Layout } from "../../components/layout/Layout";
import Login from "../../components/Login";
import { cities } from "../../lib/city";

import { db, auth, provider, storage } from "../../lib/firebase";

const Profile = () => {
  const [user] = useAuthState(auth);

  const [userData, setUserData] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");

  const getUser = async () => {
    // ユーザー取得
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // 記事が存在したらセット
      setUserData(docSnap.data());
    } else {
      alert("ユーザーが取得できません");
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const onSubmit = async () => {
    const washingtonRef = doc(db, "users", user.uid);
    try {
      await updateDoc(washingtonRef, userData);
      setUpdateMessage("更新が完了しました。");
    } catch (err) {
      setUpdateMessage("");
      console.error(err);
    }
  };
  console.log(userData);
  return (
    <Layout>
      {userData.name !== undefined ? (
        <div className="mt-5 container">
          <h1>プロフィール編集</h1>
          <div className="">
            <div className="mb-3">
              <label className="form-label">ニックネーム</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                value={userData.name}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, name: e.target.value }));
                  setUpdateMessage("");
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">住所</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                value={userData.address}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, address: e.target.value }));
                  setUpdateMessage("");
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">自己紹介</label>
              <textarea
                className="form-control"
                aria-describedby="emailHelp"
                value={userData.content}
                onChange={(e) => {
                  setUpdateMessage("");
                  setUserData((prev) => ({ ...prev, content: e.target.value }));
                }}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">タグ（県）</label>
              <div className="d-flex">
                <select
                  className="form-select"
                  onChange={(e) => {
                    setUpdateMessage("");
                    setUserData((prev) => ({
                      ...prev,
                      tags: { ...prev.tags, pref: e.target.value },
                    }));
                  }}
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  onChange={(e) => {
                    setUpdateMessage("");
                    setUserData((prev) => ({
                      ...prev,
                      tags: { ...prev.tags, city: e.target.value },
                    }));
                  }}
                >
                  <option value={"0"}>指定なし</option>
                  {userData.tags.pref !== undefined ? (
                    <>
                      {cities
                        .find((pref) => pref.id === userData.tags.pref)
                        .city.map((city) => (
                          <option key={city.citycode} value={city.citycode}>
                            {city.city}
                          </option>
                        ))}
                    </>
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={onSubmit}
            >
              保存
            </button>
            <span className="ms-3">{updateMessage}</span>
          </div>
        </div>
      ) : (
        <div>ログインしてください</div>
      )}
    </Layout>
  );
};

export default Profile;
