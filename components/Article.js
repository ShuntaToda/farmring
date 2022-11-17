import React, { useEffect } from "react";

import { useRemark } from "react-remark";

const Article = ({ article }) => {
  const [reactContent, setMarkdownSource] = useRemark();
  useEffect(() => {
    setMarkdownSource(article.content);
  }, []);
  console.log(reactContent);
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h4>{article.title}</h4>
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
    </div>
  );
};

export default Article;
