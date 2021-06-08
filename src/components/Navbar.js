import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
    getUser();
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

  return (
    <nav className="navBarItems">
      <h1 className="title-nav">BookNerds</h1>

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
          <i className="fas fa-search" onClick={() => search(searchText)}></i>
        </a>
      </div>

      <div className="items">
        <Link to="/" className="home-nav">
          Home
        </Link>
        {currentUser && (
          <Link to="/mybooks" className="mybooks-nav">
            MyBooks
          </Link>
        )}
        <Link to="/explore" className="explore-nav">
          Explore
        </Link>
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
                <Link to="/profile" className="profile-menu">
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
