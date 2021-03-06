import React from 'react'
import "./HomeBook.css";
import {Link } from "react-router-dom";

const HomeBook = ({book}) => {
    return (
        <div className="container">
            <Link to={`/reviews/${book.book_id}`} className='img-container'><img className='book-img' src={book.cover_url}></img></Link>
            <div className='text-container'>
                <h1 className='book-title'>{book.title}</h1>
                <h4 className='book-author'>by {book.author_name}</h4>
                <h5 className='category-label'>category:</h5>
                <h5 className='book-category'>{book.category}</h5>
                <h6 className='book-description'>{book.description}</h6>
            </div>
        </div>
    )
}

export default HomeBook