import React from 'react'
import "./HomeBook.css";
import {Link } from "react-router-dom";
import harry from "../harry.jpg"

const HomeBook = ({book}) => {
    return (
        <div className="container">
            <Link to='/book_review' className='img-container'><img className='book-img' src={harry}></img></Link>
            <div className='text-container'>
                <h1 className='book-title'>Harry Botter</h1>
                <h4 className='book-author'>by Islam Ahmed</h4>
                <h6 className='book-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h6>
            </div>
        </div>
    )
}

export default HomeBook
