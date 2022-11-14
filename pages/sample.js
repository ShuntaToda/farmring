import React, { useEffect, useState } from "react";
import Yamde from "yamde";
import "bootstrap/dist/css/bootstrap.css";
import { useRemark } from "react-remark";

const sample = () => {
  const [text, setText] = useState("");
  const [reactContent, setMarkdownSource] = useRemark();

  const aaa = (e) => {
    setText(e);
    console.log(text);
    setMarkdownSource(text);
  };
  return (
    <div className="container">
      <h1 className="btn btn-primary">あいうえお</h1>
      <Yamde value={text} handler={aaa} theme="light" required />
      {reactContent}
    </div>
  );
};

export default sample;
