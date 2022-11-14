import React, { useState } from "react";
import Yamde from "yamde";
import "bootstrap/dist/css/bootstrap.css";

const sample = () => {
  const [text, setText] = useState("");
  const aaa = (e) => {
    console.log(e, text);
  };
  return (
    <div className="container">
      <h1 className="btn btn-primary">あいうえお</h1>
      <Yamde value={text} handler={aaa} theme="light" required />
    </div>
  );
};

export default sample;
