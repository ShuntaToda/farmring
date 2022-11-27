import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="c-nav-bar">
      <Link href={"/"} className={"h-100"}>
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <Link href={"/search"} className={"h-100"}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Link>
      <Link href={"/shop"} className={"h-100"}>
        <FontAwesomeIcon icon={faCartShopping} />
      </Link>
      <Link href={"/user"} className={"h-100"}>
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </div>
  );
};

export default NavBar;
