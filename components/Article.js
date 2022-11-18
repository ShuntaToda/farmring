import React, { useEffect } from "react";
import { getAuth, getUser } from "firebase/auth";
import { useRemark } from "react-remark";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const Article = ({ article, id }) => {
  const [reactContent, setMarkdownSource] = useRemark();
  useEffect(() => {
    setMarkdownSource(article.content);
  }, []);
  return (
    <div className="c-article-block">
      <div className="c-article-block__container d-flex">
        <Link href={`article/${id}`}>
          <div className="c-article-block__img">
            <img src={article.image}></img>
          </div>
        </Link>

        <div className="c-article-block__content">
          <div className="c-article-block__title">
            <Link href={`article/${id}`}>
              <h4>{article.title}</h4>
            </Link>
          </div>
          <div className="c-article-block__text">
            <div className="c-article-block__author">
              <div className="c-article-block__author-img">
                <img src="https://placehold.jp/150x150.png"></img>
              </div>
              <div className="c-article-block__author-name">筆者名が入ります</div>
            </div>
            <div className="c-article-block__property">
              <div className="c-article-block__property-heart">
                <FontAwesomeIcon icon={faHeart} />
                <span>110</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
