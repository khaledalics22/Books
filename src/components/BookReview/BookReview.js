import React, { useContext, useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import app from "../firebase/base.js";
import "./BookReview.css";
import { AuthConext } from "../firebase/auth.js";
import Navbar from "../Navbar";
import ReviewBox from "./ReviewBox";
import Review from "./Review";

const db = app.firestore();

const BookReview = ({ history }) => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useContext(AuthConext);

  useEffect(() => {
    db.collection("book")
      .get()
      .then((book) => {
        book.forEach((b) => {
          console.log(b.data());
        });
      })
      .catch((err) => {
        console.error(err);
      });
    db.collection("book")
      .doc(bookId)
      .get()
      .then((book) => {
        console.log(book.data());
        setBook(book.data());
      })
      .catch((err) => {
        console.error(err);
      });

    db.collection("review")
      .where("book_id", "==", bookId)
      .get()
      .then((reviews) => {
        let result = [];
        reviews.forEach((review) => {
          result.push(review.data());
          result.push(review.data());
          console.log(review.id);
        });
        console.log(result);
        setReviews(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [bookId]);
  return (
    <>
      <Navbar history={history} currentUser={currentUser} />
      <div className="review-container">
        <div className="book-review">
          <div className="book-review-img">
            <img className="rounded mx-auto d-block" src={book.cover_url} />
          </div>
          <div className="book-review-summary">
            <h1 className="italic">{book.title}</h1>
            <h4 className="author-name">{book.author_name}</h4>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
      <div>
        <ReviewBox bookId={bookId} />
        {reviews.map((review, index) => {
          return <Review key={index} review={review} />;
        })}
      </div>
    </>
  );
};

export default withRouter(BookReview);
