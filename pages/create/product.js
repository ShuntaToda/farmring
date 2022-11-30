import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRemark } from "react-remark";
import { Layout } from "../../components/layout/Layout";
import { db, auth, provider, storage } from "../../lib/firebase";
import Yamde from "yamde";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import AddTag from "../../components/AddTag";
import Select from "react-select";

const Post = () => {
  const [user] = useAuthState(auth);
  const [reactContent, setMarkdownSource] = useRemark();
  const [thumbnail, setThumbnail] = useState("");
  const [isThumbnailSelect, setIsThumbnailSelect] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const image = useRef(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsOption, setTagsOption] = useState([]);
  const [price, setPrice] = useState(0);

  const changeContent = (e) => {
    setContent(e);
  };
  const uploadImage = () => {
    const storageRef = ref(
      storage,
      `images/${auth.currentUser.uid}/${image.current.files[0].name}`
    );
    uploadBytes(storageRef, image.current.files[0]).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          // firestoreに登録
          storeImage(url);
          image.current.value = "";
        })
        .catch((error) => console.log(error));
    });
  };

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

  const storeImage = async (url) => {
    const docRef = await addDoc(collection(db, "image"), {
      uid: user.uid,
      url: url,
    });
  };
  const upload = async () => {
    const uploadTags = selectedTags.map((tag) => {
      return tag.value;
    });
    try {
      const docRef = await addDoc(collection(db, "products"), {
        title: title,
        content: content,
        image: thumbnail !== "" ? thumbnail : "https://placehold.jp/150x150.png",
        uid: auth.currentUser.uid,
        tags: uploadTags,
        price: price,
        createdAt: new Date(),
      });
      setUploadMessage("投稿されました。");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addImage = (url) => {
    // 記事に画像追加
    if (isThumbnailSelect) {
      setThumbnail(url);
    } else {
      setContent((prevContent) => {
        prevContent += `\n![](${url})`;
        return prevContent;
      });
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    const tagsArray = tags.map((tag) => {
      return { value: tag.data.name, label: tag.data.name };
    });
    setTagsOption(tagsArray);
  }, [tags]);
  return (
    <Layout>
      <div className="mt-5 container c-post">
        <h2>商品追加</h2>
        <div className="my-3 c-post__thumbnail">
          <h5>サムネイル追加</h5>
          <img src={thumbnail}></img>
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
        <div>
          <label>値段</label>
          <input
            className="form-control"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div className="c-post__title">
          <label>タイトル</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="c-article__content">
          <Yamde
            className="c-article"
            value={content}
            handler={changeContent}
            theme="light"
            required
          />
        </div>

        {reactContent}

        <div className="mb-3 c-post__images">
          <h3>画像一覧</h3>

          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#imagesBtn"
              onClick={() => {
                setIsThumbnailSelect(false);
                getImages();
              }}
            >
              表示
            </button>
          </div>

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
                        addImage(image.data.url);
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
          <h5 className="">タグ</h5>
          <Select
            value={selectedTags}
            onChange={(e) => {
              setSelectedTags(e);
            }}
            isMulti
            options={tagsOption}
          ></Select>
        </div>
        <AddTag getTags={getTags}></AddTag>
        <div className="mb-3">
          <button className="btn btn-secondary" onClick={upload}>
            送信
          </button>
        </div>
        <div className="mb-4">{uploadMessage}</div>
      </div>
    </Layout>
  );
};

export default Post;
