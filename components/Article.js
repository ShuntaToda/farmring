import React, { useEffect } from "react";
import { getAuth, getUser } from "firebase/auth";
import { useRemark } from "react-remark";

const Article = ({ article }) => {
  const [reactContent, setMarkdownSource] = useRemark();
  useEffect(() => {
    setMarkdownSource(article.content);
  }, []);
  console.log(getAuth());
  return (
    <div className="c-article">
      <div className="c-article__container">
        <div className="c-article__img">
          <img className="h-100 w-100" style={{ objectFit: "cover" }} src={article.image}></img>
        </div>

        <div className="c-article__content">
          <div className="c-article__title">
            <h4>{article.title}</h4>
          </div>
          <div className="c-article__user">{}</div>
        </div>
      </div>
      <div className="card-body">
        <div style={{ width: "200px", height: "100px" }}>
          <img className="h-100 w-100" style={{ objectFit: "cover" }} src={article.image}></img>
        </div>
        {reactContent}
      </div>
      <div className="card-footer">
        <span className="badge">{article.createdAt.seconds}</span>
      </div>
    </div>
  );
};

export default Article;
