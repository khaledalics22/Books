import React, { useState, useEffect } from "react";
import app from "../firebase/base.js";

const db = app.firestore();
const defaultImg =
  "https://yt3.ggpht.com/ytc/AAUvwngw35YY8vYI86RTOoEGafSxEjghjzTcKw3LbMyZ=s900-c-k-c0x00ffffff-no-rj";

const Review = (props) => {
  const { user_id, content } = props.review;
  const [avatar, setAvatar] = useState(defaultImg);
  const [name, setName] = useState("Reviewer");

  useEffect(() => {
    db.collection("user")
      .doc(user_id)
      .get()
      .then((user) => {
        const res = user.data();
        console.log(res);
        setAvatar(res.picture_url);
        setName(res.name);
      });
  }, []);
  return (
    <div className="review-container">
      <div className="comment">
        <img
          className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
          src={avatar}
          alt="Image Description"
        />
        <h5 className="h5 g-color-gray-dark-v1 mb-0">{name}</h5>
        <p className="review-content">{content}</p>
      </div>
    </div>
  );
};

export default Review;
