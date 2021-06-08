import React, { useContext, useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import app from "../firebase/base.js";
import "./BookReview.css";
import { AuthConext } from "../firebase/auth.js";
import Navbar from "../Navbar";
import ReviewBox from "./ReviewBox";
import Review from "./Review";
import Rating from "react-rating";

const db = app.firestore();

const BookReview = ({ history }) => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useContext(AuthConext);

  const fetchReviews = () => {
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
  };
  const handleRating = (value) => {
    console.log(value);
    setRating(value);
    setBook({ ...book, rating: value });
    db.collection("book")
      .doc(bookId)
      .set({ ...book, rating: value });
  };
  useEffect(() => {
    // db.collection("book")
    //   .get()
    //   .then((book) => {
    //     book.forEach((b) => {
    //       console.log(b.data());
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   })
    db.collection("book")
      .doc(bookId)
      .get()
      .then((book) => {
        setBook(book.data());
        setRating(book.data().rating);
      })
      .catch((err) => {
        console.error(err);
      });

    fetchReviews();
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
            <Rating
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              fractions="10"
              initialRating={rating}
              onChange={handleRating}
            />
          </div>
        </div>
      </div>
      <div>
        <ReviewBox bookId={bookId} fetchReviews={fetchReviews} />
        {reviews.map((review, index) => {
          return <Review key={index} review={review} />;
        })}
      </div>
    </>
  );
};

export default withRouter(BookReview);
