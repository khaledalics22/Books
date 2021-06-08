import React, {useState, useEffect, useRef} from 'react'
import {Link } from "react-router-dom";
import app from "./firebase/base.js";
import "./Navbar.css";
import me from "../me.jpg"

const Navbar = ({history, currentUser}, ...props) => {
    const dropdownRef = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [showImageList, setShowImageList] = useState(false);

    useEffect(() => {
        const pageClickEvent = (e) => {
          if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
            setShowImageList(!showImageList);
          }
        };
    
        if (showImageList) {
          window.addEventListener('click', pageClickEvent);
        }
    
        return () => {
          window.removeEventListener('click', pageClickEvent);
        }
    
      }, [showImageList, dropdownRef]);

    console.log(currentUser);

    const handleLogOut = () => {
        app.auth().signOut().then(() => {
            history.push('/')
        }).catch((error) => {
            alert(error);
        }); 
    };

    return (
        <nav className="navBarItems">
            <h1 className="title-nav">BookNerds</h1>
            <div className="search-box">
                <input type="text" value={searchText} className="search-text"
                    name="searchText" placeholder="Search books" 
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <a className="search-btn" href="#">
                    <i class="fas fa-search"></i>
                </a>
            </div>

            <div className="items">
                <Link to='/' className='home-nav'>Home</Link>
                <Link to='/mybooks' className='mybooks-nav'>MyBooks</Link>
                <Link to='/explore' className='explore-nav'>Explore</Link>
            </div>
            
            <div className="menu-container">
                <img className='user-image-nav' src={me} onClick={() => setShowImageList(!showImageList)}></img>
                
                <div ref={dropdownRef} className={`menu ${showImageList? 'active' : 'inactive'}`}>
                    <ul>
                        <li><div className="username-menu">Islam Ahmed</div></li>
                        <li><Link to="/profile" className="profile-menu">Profile</Link></li>
                        <li><Link onClick={handleLogOut}>Log Out</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
