import React, { useContext, useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import app from "../firebase/base.js";
import "./BookReview.css";
import { AuthConext } from "../firebase/auth.js";
import ReviewBox from "./ReviewBox";
import Review from "./Review";
import Rating from "react-rating";

const db = app.firestore();

const BookReview = ({ history }) => {
  const { bookId } = useParams();
  const [user, setUser] = useState([]);
  const [book, setBook] = useState({});
  const [rating, setRating] = useState(0);
  const [liked, setLiked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reading, setReading] = useState(false);

  const { currentUser } = useContext(AuthConext);
  // const bookId = "DUjmj5IkEUoxq6hn0mjC";

  const fetchReviews = () => {
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
          console.log(review.id);
        });
        console.log(result);
        setReviews(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchUser = () => {
    db.collection("book")
      .doc(bookId)
      .get()
      .then((book) => {
        setBook(book.data());
        setRating(book.data().rating);

        db.collection("user")
          .doc(currentUser.uid)
          .get()
          .then((doc) => {
            console.log(doc);
            setUser(doc.data());
          })
          .catch((err) => {
            console.error(err);
          });
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

  const toggleLike = () => {
    db.collection("user")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const likedBookIds = doc.data().liked_books;
        let likedList = [];
        likedBookIds?.forEach((id) => {
          likedList.push(id);
        });
        let idx = likedList.indexOf(bookId);
        if (idx != -1) {
          likedList.splice(idx, 1);
          setLiked(true);
        } else {
          likedList.push(bookId);
          setLiked(false);
        }

        if (likedList == null || likedList.length == 0) {
          likedList = [];
        }
        db.collection("user")
          .doc(currentUser.uid)
          .update({ liked_books: likedList });
      });
  };

  const toggleReading = () => {
    db.collection("user")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const currReadingIds = doc.data().currently_reading;
        let readingList = [];
        currReadingIds?.forEach((id) => {
          readingList.push(id);
        });
        let idx = readingList.indexOf(bookId);
        if (idx != -1) {
          readingList.splice(idx, 1);
          setReading(true);
        } else {
          readingList.push(bookId);
          setReading(false);
        }

        if (readingList == null || readingList.length == 0) {
          readingList = [];
        }
        db.collection("user")
          .doc(currentUser.uid)
          .update({ currently_reading: readingList });
      });
  };

  useEffect(() => {
    if (currentUser) fetchUser();
    fetchReviews();
  }, [bookId]);

  return (
    <>
      <div className="review-container">
        <div className="book-review">
          <div className="book-review-img">
            <img className="rounded mx-auto d-block" src={book.cover_url} />
          </div>

          <div className="book-review-summary">
            {currentUser && (
              <div>
                <button
                  style={{ color: `${liked ? "red" : "white"}` }}
                  className="ActionButton"
                  onClick={toggleLike}
                >
                  <i class="fa fa-thumbs-up">{liked ? "liked" : "like"}</i>
                </button>
                <button
                  style={{ color: `${reading ? "red" : "white"}` }}
                  className="ActionButton"
                  onClick={toggleReading}
                >
                  <i class="fa fa-plus"></i>
                  {reading ? "Is Reading" : "Add to reading"}
                </button>
              </div>
            )}
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
