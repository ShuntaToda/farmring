import React, { useEffect } from "react";
import { AuthErrorCodes, getAuth, getUser } from "firebase/auth";
import { useRemark } from "react-remark";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const Article = ({ article, id, author }) => {
  const [reactContent, setMarkdownSource] = useRemark();
  useEffect(() => {
    setMarkdownSource(article.content);
  }, []);

  console.log(author);
  return (
    <div className="c-article-block">
      <div className="c-article-block__container d-flex">
        <Link href={`article/${id}`}>
          <div className="c-article-block__img">
            <img src={article.image} className=""></img>
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
                <Link href={`users/${article.uid}/profile`}>
                  <img src={author.image}></img>
                </Link>
              </div>
              <div className="c-article-block__author-name">
                <Link href={`users/${article.uid}/profile`} className="">
                  {author.name}
                </Link>
              </div>
            </div>
            <div className="c-article-block__property">
              <div className="c-article-block__property-heart">
                <FontAwesomeIcon icon={faHeart} />
                <span>{article.good}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
