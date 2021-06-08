import React, { useContext, useEffect } from "react";
import { AuthConext } from "../firebase/auth.js";
import app from "../firebase/base.js";

const db = app.firestore();

const ReviewBox = (props) => {
  const { bookId, fetchReviews } = props;
  const { currentUser } = useContext(AuthConext);

  const addReview = (e) => {
    e.preventDefault();
    const review = e.target.elements.review.value.trim();
    if (review) {
      const reviewObject = {
        book_id: bookId,
        user_id: currentUser.uid,
        content: review,
      };
      db.collection("review")
        .doc()
        .set(reviewObject)
        .then(() => {
          console.log("Done");
          e.target.elements.review.value = "";
          fetchReviews();
        });
    }
  };
  return (
    currentUser && (
      <form onSubmit={addReview} className="review-form">
        <div className="form-group review-input">
          <label htmlFor="addReview" className="review-label">
            Add a review
          </label>
          <input
            type="text"
            className="form-control review-text"
            id="addReview"
            name="review"
            placeholder="Add a review"
          />
        </div>
        <button type="submit" className="btn btn-primary review-submit">
          Submit
        </button>
      </form>
    )
  );
};

export default ReviewBox;
