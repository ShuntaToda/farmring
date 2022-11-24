import React, { useEffect, useState } from "react";

const UserItems = ({ user_id }) => {
  const [articles, setArticles] = useState([]);
  const getArticles = async () => {
    // 記事を取得（10個、作成順）
    const querySnapshot = await getDocs(collection(db, "posts"), limit(10), orderBy("createdAt"));
    let items = [];

    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });
    setArticles(items);
  };
  useEffect(() => {
    getArticle();
  }, []);
  return (
    <div className="c-user-items">
      <div className="c-user-items__head d-flex align-items-center justify-content-around">
        <span>記事一覧</span>
        <span>ショップ</span>
      </div>
      <div className="c-user-items__contents">
        <div className="c-user-items__item">content</div>
        <div className="c-user-items__item">content</div>
        <div className="c-user-items__item">content</div>
        <div className="c-user-items__item">content</div>
      </div>
    </div>
  );
};

export default UserItems;
