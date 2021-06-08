import React, { useCallback, useContext } from "react";
import app from "./firebase/base.js";
import "./AddBook.css";
import { AuthConext } from "./firebase/auth.js";
import { withRouter } from "react-router-dom";

const AddBook = ({ history }) => {
  const { currentUser } = useContext(AuthConext);
  const handleAddBook = useCallback(
    async (event) => {
      event.preventDefault();
      const { title, authoerName, category, description } =
        event.target.elements;
      try {
        handleUpload(title, authoerName, description, category);
        // alert(title.value+'\n'+authoerName.value+'\n'+currentUser.uid+'\n'+description.value+'\n');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const handleUpload = (title, authoerName, description, category) => {
    // console.log(this.state.image);
    let file = image;
    var storage = app.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child("folder/" + file.name).put(file);

    uploadTask.then(async () => {
      // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
      uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
        const db = app.firestore();
        const doc = db.collection("book").doc();
        await doc.set({
          book_id: doc.id,
          publisher_id: currentUser.uid,
          title: title.value,
          author_name: authoerName.value,
          description: description.value,
          category: category.value,
          cover_url: url,
          rating: 0,
        });
        history.push("/profile");
      });
    });
  };
  var image;
  const handleChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        image = e.target.files[0];
      }
    },
    [history]
  );
  return (
    <render>
      <div class="container">
        <body className="bodyAddBook">
          <h1 style={{ color: "white" }} name="addbook">
            Add New Book
          </h1>
          <form
            className="formAddBook"
            style={{ display: "inline-block" }}
            onSubmit={handleAddBook}
          >
            <label className="labelAddBook">Book title</label>
            <input
              className="inputAddBook"
              name="title"
              type="label"
              placeholder="Book Title"
            />
            <label className="labelAddBook"> Author Name </label>
            <input
              className="inputAddBook"
              name="authoerName"
              type="label"
              placeholder="Author Name"
            />
            <label className="labelAddBook"> category </label>
            <input
              className="inputAddBook"
              name="category"
              type="label"
              placeholder="Category"
            />
            <label className="labelAddBook"> description </label>
            <input
              className="inputAddBook"
              name="description"
              type="label"
              placeholder="Description"
            />
            <label className="labelAddBook"> Book Cover </label>
            <input
              className="inputFile"
              type="file"
              id="file"
              onChange={handleChange}
            />
            <button className="buttonAddBook" type="submit">
              Add
            </button>
            <br />
          </form>
        </body>
      </div>
    </render>
  );
};
export default withRouter(AddBook);
