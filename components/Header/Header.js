import React from "react";
import logo from "../../image/logo.svg";
import Login from "../Login";

export const Header = () => {
  return (
    <header className="l-header w-100 shadow">
      <div className="l-header__head">
        <h1 className="l-header__logo">
          <a href="/">
            <img src={logo.src}></img>
          </a>
        </h1>
      </div>
      <div className="l-header__login">
        <Login></Login>
      </div>
    </header>
  );
};
