import React, { useContext } from "react";
import { AuthConext } from "../firebase/auth.js";
import app from "../firebase/base.js";

const db = app.firestore();

const ReviewBox = ({ book }) => {
  const { currentUser } = useContext(AuthConext);

  const addReview = (e) => {
    e.preventDefault();
    const review = e.target.elements.review.value.trim();
    const name = e.target.elements.name.value.trim();
    if (name && review) {
      const reviewObject = {
        book_id: book.id,
        user_id: currentUser.uid,
        content: review,
      };
      db.collection("review").doc().set(reviewObject);
      e.target.elements.comment.value = "";
      e.target.elements.name.value = "";
    }
  };

  return (
    <div>
      <h1 className="title">Write a review</h1>
      <form onSubmit={addReview}>
        <div className="field">
          <div className="control">
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Your name"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea
              className="textarea"
              name="review"
              placeholder="Add a review"
            ></textarea>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewBox;
