import React from "react";
import logo from "../../image/logo.svg";

export const Header = () => {
  return (
    <header className="l-header w-100 shadow">
      <h1 className="l-header__logo">
        <a href="/">
          <img src={logo.src}></img>
        </a>
      </h1>
    </header>
  );
};
