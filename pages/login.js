import React from "react";
import { Layout } from "../components/layout/Layout";

const Login = () => {
  return (
    <Layout>
      <div className="h-100">login</div>
      <div className="c-login-merit">
        <div className="c-login-merit__title">
          <h2>ログインするとできること</h2>
        </div>
        <div className="c-login-merit__content">
          <ol>
            <li>記事が書ける</li>
            <li>プロフィールページを作れる</li>
            <li>ショッピングができる</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
