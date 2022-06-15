import React, { useEffect, useState } from "react";
import "../../../css/banner.css";
import { Grid, Paper, Box, Typography } from "@mui/material";
import { fetchCurrentUser, handleSignOut } from "../../../utils/authentication";

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
const Banner = ({ user }) => {
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
  }, []);
  return (
    <div className="navbar_full_page">
      <div className="navbar">
        <h1 style={{ fontWeight: "bold !important" }}>
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
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                style={{
                  background: "none",
                  color: "inherit",
                  border: "none",
                  padding: "0",
                  font: "inherit",
                  cursor: "pointer",
                  outline: "inherit",
                }}
              >
                Signout
              </button>
            ) : (
              <a href="/signin" style={{ textDecoration: "none" }}>
                Signin
              </a>
            )}
          </li>
        </ul>

        {
          <i
            onClick={handleClick}
            className={clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        }
      </div>
      <Grid container spacing={2}>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <a
            href="/short-content"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bolder",
            }}
          >
            <div id="box1" className="box blurred-bg tinted">
              <div className="content">
                <Typography variant="h3" fontWeight="bold">
                  Social Media Streaming
                </Typography>
              </div>
            </div>
          </a>
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <a
            href="/long-content"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bolder",
            }}
          >
            <div id="box1" className="box blurred-bg tinted">
              <div className="content">
                <Typography variant="h3" fontWeight="bold">
                  OTT Streaming
                </Typography>
              </div>
            </div>
          </a>
        </Grid>
      </Grid>
    </div>
  );
};

// class Navbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       clicked: false,
//       login: false,
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.handleLog = this.handleLog.bind(this);
//   }

//   handleClick() {
//     this.state.clicked
//       ? this.setState({ clicked: false })
//       : this.setState({ clicked: true });
//   }

//   handleLog() {
//     this.state.login
//       ? this.setState({ login: false })
//       : this.setState({ login: true });
//   }

//   render() {
//     return (
//       <div className="full_page">
//         <div className="navbar">
//           <Helmet>
//             <link
//               rel="stylesheet"
//               href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
//               integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
//               crossorigin="anonymous"
//             />
//           </Helmet>
//           <h1>VOD</h1>

//           <ul className={!this.state.clicked ? "navlist" : "navlist_active nav-link"}>
//             {MenuItems.map((item, index) => {
//               return (
//                 <li
//                   onClick={this.handleClick}
//                   key={index}
//                   className={item.cName}
//                 >
//                   <a href={item.link}>{item.name}</a>
//                 </li>
//               );
//             })}
//             <li className="log" onClick={this.handleLog}>
//               {this.state.login ? "Sign out" : "Sign in"}
//             </li>
//           </ul>

//           {
//             <i
//               onClick={this.handleClick}
//               className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
//             ></i>
//           }
//         </div>
//       </div>
//     );
//   }
// }

export default Banner;
