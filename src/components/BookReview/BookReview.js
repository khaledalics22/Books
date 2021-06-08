import React from "react";
import { withRouter } from "react-router-dom";

// db.collection("review")
// .doc("512")
// .set({
//   book_id: "harry512",
//   user_id: "ahmed32",
//   content: "This is very usefull book",
// })
// .then(() => {
//   console.log("Document successfully written!");
// });

const BookReview = () => {
  return (
    <div className="book-review">
      <h1>Hello Book Review</h1>
    </div>
  );
};

export default withRouter(BookReview);
