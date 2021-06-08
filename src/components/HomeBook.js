import React from "react";
import "./HomeBook.css";
import { Link } from "react-router-dom";
// import harry from "../harry.jpg";
// import { BookOutlined } from "@material-ui/icons";

const HomeBook = ({ book }) => {
  console.log(book);
  return (
    <div className="container">
      <Link to={`/reviews/${book.id}`} className="img-container">
        <img className="book-img" src={book.cover_url}></img>
      </Link>
      <div className="text-container">
        <h1 className="book-title">{book.title || "CMP Horror Movie"}</h1>
        <h4 className="book-author">by {book.author_name || "The Author"}</h4>
        <h6 className="book-description">{book.description || "This is the description"}</h6>
      </div>
    </div>
  );
};

export default HomeBook;
