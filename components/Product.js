import React, { useEffect } from "react";
import { AuthErrorCodes, getAuth, getUser } from "firebase/auth";
import { useRemark } from "react-remark";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const Product = ({ product, id, author }) => {
  const [reactContent, setMarkdownSource] = useRemark();
  useEffect(() => {
    setMarkdownSource(product.content);
  }, []);

  return (
    <div className="c-product-block">
      <div className="c-product-block__container">
        <div className="c-product-block__price">
          <span>¥{product.price}</span>
        </div>
        <Link href={`product/${id}`}>
          <div className="c-product-block__img">
            <img src={product.image} className=""></img>
          </div>
        </Link>

        <div className="c-product-block__content">
          <div className="">
            <Link href={`product/${id}`} className="text-dark text-decoration-none">
              <h4 className="c-product-block__title">{product.title}</h4>
            </Link>
          </div>
          <div className="c-product-block__text">
            <div className="c-product-block__author">
              <div className="c-product-block__author-img">
                <Link
                  href={`users/${product.uid}/profile`}
                  className={"text-dark text-decoration-none"}
                >
                  <img src={author.image}></img>
                </Link>
              </div>
              <div className="c-product-block__author-name">
                <Link
                  href={`users/${product.uid}/profile`}
                  className="text-dark text-decoration-none"
                >
                  {author.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
