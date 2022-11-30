import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Layout } from "../../components/layout/Layout";
import Login from "../../components/Login";
import { cities } from "../../lib/city";

import { db, auth, provider, storage } from "../../lib/firebase";

const Profile = () => {
  const [user] = useAuthState(auth);

  const [userData, setUserData] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [isThumbnailSelect, setIsThumbnailSelect] = useState(false);

  const image = useRef(null);

  const getImages = async () => {
    const imagesRef = collection(db, "image");
    const q = query(imagesRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });
    setImages(items);
  };

  const storeImage = async (url) => {
    const docRef = await addDoc(collection(db, "image"), {
      uid: user.uid,
      url: url,
    });
  };

  const uploadImage = () => {
    const storageRef = ref(
      storage,
      `images/${auth.currentUser.uid}/${image.current.files[0].name}`
    );
    uploadBytes(storageRef, image.current.files[0]).then((snapshot) => {
      console.log(storageRef);
      getDownloadURL(storageRef)
        .then((url) => {
          // firestoreに登録
          storeImage(url);
          image.current.value = "";
        })
        .catch((error) => console.log(error));
    });
  };
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
            <div className="my-3 c-post__thumbnail">
              <h5>サムネイル追加</h5>
              <img src={userData.image}></img>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#imagesBtn"
                  onClick={() => {
                    setIsThumbnailSelect(true);
                    getImages();
                  }}
                >
                  表示
                </button>
              </div>
            </div>
            <div className="mb-3 c-post__images">
              <div
                className="modal fade"
                id="imagesBtn"
                aria-labelledby="imagesBtnLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="imagesBtnLabel">
                        画像一覧
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body c-post__images">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="c-post__images-wrap"
                          onClick={() => {
                            setUserData((prev) => ({ ...prev, image: image.data.url }));
                          }}
                        >
                          <img src={image.data.url}></img>
                        </div>
                      ))}
                    </div>
                    <div className="modal-footer"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <h5>画像を追加</h5>
              <div className="input-group">
                <input className="form-control" type="file" ref={image}></input>
                <button className="btn btn-outline-primary" onClick={uploadImage}>
                  追加
                </button>
              </div>
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
            <button type="submit" className="btn btn-outline-primary" onClick={onSubmit}>
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
