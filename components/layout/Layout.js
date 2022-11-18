import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import NavBar from "../NavBar";

export const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <NavBar></NavBar>
      <Footer></Footer>
    </>
  );
};
