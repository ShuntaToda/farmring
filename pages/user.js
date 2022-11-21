import React from "react";

import { db, auth, provider, storage } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Layout } from "../components/layout/Layout";
import Login from "../components/Login";

const User = () => {
  const [user] = useAuthState(auth);
  return (
    <Layout>
      <div>
        {user ? (
          <div>
            <div>ログイン済み</div>
          </div>
        ) : (
          <Login></Login>
        )}
      </div>
    </Layout>
  );
};

export default User;
