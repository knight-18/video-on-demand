import React, { useEffect, useState } from "react";
import "../../css/navbar.css";
import { Grid, Paper, Box, Typography } from "@mui/material";
import { fetchCurrentUser } from "../../utils/authentication";

const MenuItems = [
  // {
  //   name: "Home",
  //   link: "/",
  //   cName: "menu_items",
  // },

  // {
  //   name: "Short Content",
  //   link: "/short-content",
  //   cName: "menu_items",
  // },
  // {
  //   name: "Long Content",
  //   link: "/long-content",
  //   cName: "menu_items",
  // },
];
const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    clicked ? setClicked(false) : setClicked(true);
  };
  useEffect(() => {
    fetchCurrentUser().then((res) => {
      if (res) {
        setIsLoggedIn(true);
      }
    });
  });
  return (
    <div className="full_page" style={{ height: "11vh !important" }}>
      <div className="navbar">
        <h1>
          <a href="/" style={{ textDecoration: "none", color: "white" }}>
            V<span style={{ color: "lime" }}>O</span>D
          </a>
        </h1>

        <ul className={!clicked ? "navlist" : "navlist_active nav-link"}>
          {MenuItems.map((item, index) => {
            return (
              <li onClick={handleClick} key={index} className={item.cName}>
                <a href={item.link}>{item.name}</a>
              </li>
            );
          })}
          <li className="log">
            <a
              href="/signin"
              style={{ textDecoration: "none", color: "white" }}
            >
              {isLoggedIn ? "Sign out" : "Sign in"}
            </a>
          </li>
        </ul>

        {
          <i
            onClick={handleClick}
            className={clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        }
      </div>
    </div>
  );
};

export default Navbar;
