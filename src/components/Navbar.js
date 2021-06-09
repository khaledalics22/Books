import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import app from "./firebase/base.js";
import "./Navbar.css";
import temp from "../user-circle-solid.svg";
import { AuthConext } from "./firebase/auth";

const db = app.firestore();

const Navbar = ({ search }, ...props) => {
  const { currentUser } = useContext(AuthConext);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showImageList, setShowImageList] = useState(false);
  let history = useHistory();
  let location = useLocation();
  const getUser = () => {
    db.collection("user")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentUser) getUser();
    console.log(props);
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowImageList(!showImageList);
      }
    };

    if (showImageList) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [showImageList, dropdownRef, currentUser]);

  const handleLogOut = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const searchIcon = () => {
    if (location.pathname !== "/explore") {
      console.log("1");
      return (
        <Link
          to="/explore"
          className="fas fa-search"
          onClick={() => search(searchText)}
        ></Link>
      );
    } else {
      console.log("0");
      return <i className="fas fa-search" onClick={() => search(searchText)} />;
    }
  };

  return (
    <nav className="navBarItems">
      <Link to="/" className="title-link">
        <h1 className="title-nav">BookNerds</h1>
      </Link>

      <div className="search-box">
        <input
          type="text"
          value={searchText}
          className="search-text"
          name="searchText"
          placeholder="Search books"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <a className="search-btn" href="#">
          {searchIcon()}
        </a>
      </div>

      <div className="items">
        <Link to="/" className="home-nav">
          Home
        </Link>
        <Link to="/explore" className="explore-nav">
          Explore
        </Link>
        {!currentUser && (
          <div className="login-signup-container">
              <Link to="/login" className="login-nav">
              Login
            </Link>
            <Link to="/signup" className="signup-nav">
              Sign up
            </Link>
          </div>)}
      </div>

      {currentUser && (
        <div className="menu-container">
          <img
            className="user-image-nav"
            src={user ? user.picture_url : temp}
            onClick={() => setShowImageList(!showImageList)}
          ></img>
          <div
            ref={dropdownRef}
            className={`menu ${showImageList ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                <div className="username-menu">{user?.name}</div>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="profile-menu"
                  onClick={() => {
                    setShowImageList(!showImageList);
                  }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link onClick={handleLogOut}>Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
