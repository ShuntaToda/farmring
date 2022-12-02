import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db, auth, provider, storage } from "../lib/firebase";
import Select from "react-select";
import { Layout } from "../components/layout/Layout";
import Article from "../components/Article";
import { useRouter } from "next/router";
import Product from "../components/Product";
import Link from "next/link";

import { cities } from "../lib/city";

const SearchUser = () => {
  const [users, setUsers] = useState([]);

  const router = useRouter();
  const defaultTag = router.query.tag;
  const [pref, setPref] = useState("01");
  const [city, setCity] = useState("0");

  const getUsers = async (p, c) => {
    let q;
    q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    let items = [];

    querySnapshot.forEach((doc) => {
      // itemsにデータを挿入
      items = [...items, { data: doc.data(), id: doc.id }];
    });

    if (c === "0") {
      items = items.filter((item) => item.data.tags.pref === p);
    } else {
      items = items.filter((item) => item.data.tags.city === c);
    }
    setUsers(items);
  };

  useState(() => {
    getUsers(pref, city);
  }, []);

  return (
    <Layout>
      <div className="c-search mt-5 container">
        <div className="d-flex justify-content-between">
          <h2>ユーザー検索</h2>
          <Link href="/search">
            <div className="btn btn-outline-primary">記事・商品検索</div>
          </Link>
        </div>

        <div className="mb-3">
          <div className="d-flex">
            <select
              className="form-select"
              value={pref}
              onChange={(e) => {
                setPref(e.target.value);
                getUsers(e.target.value, city);
              }}
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                getUsers(pref, e.target.value);
              }}
            >
              <option value={"0"}>指定なし</option>
              <>
                {cities
                  .find((p) => p.id === pref)
                  .city.map((city) => (
                    <option key={city.citycode} value={city.citycode}>
                      {city.city}
                    </option>
                  ))}
              </>
            </select>
          </div>
        </div>
        <div className="c-search__content">
          <div className="c-search__users">
            {users.map((user, index) => (
              <div key={user.id} className="c-user-block">
                <Link href={`/users/${user.id}/profile`}>
                  <div className="c-user-block__image">
                    <img src={user.data.image}></img>
                  </div>
                </Link>
                <Link href={`/users/${user.id}/profile`} className="text-dark text-decoration-none">
                  <div className="c-user-block__name">{user.data.name}</div>
                </Link>
                <div className="c-user-block__address">{user.data.address}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchUser;
