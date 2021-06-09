import React, { useContext, useEffect, useState } from "react";
import app from "./firebase/base.js";
import "./Profile.css";
import { AuthConext } from "./firebase/auth.js";
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  GridList,
  Divider,
  Container,
  colors,
} from "@material-ui/core";
import {Link } from "react-router-dom";
import ReactRoundedImage from "react-rounded-image";


function getBooksView(booksArray) {
  if (booksArray != null && booksArray?.length > 0) {
    return (
      <div>
        <Divider style={{ backgroundColor: "white", height: "1px" }} />
        <GridList
          maxWidth="200px"
          spacing="0px"
          cols={4}
          style={{ textAlign: "left", textAlignLast: "left" }}
        >
          {booksArray?.map((book) => (
            <GridListTile className="likedItemContainer">
              <Link to={`/reviews/${book.book_id}`}>
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="likedBooks"
                />
              </Link>
              <GridListTileBar title={book.title} subtitle={book.author_name} />
            </GridListTile>
          ))}
        </GridList>
        {/* <Divider style={{backgroundColor:'white', height:'1px'}}/> */}
      </div>
    );
  } else {
    return <p className="no_books">No books Yet!</p>;
  }
}
export default function Profile({ history }) {
  const db = app.firestore();
  const { currentUser } = useContext(AuthConext);
  const [user, setUser] = useState();
  const [likedBooksResponse, setListLikedBooks] = useState();
  const [currReadingResponse, setCurrReaingBooks] = useState();

  // fetch user data from firebase
  const getUser = async () => {
    try {
      db.collection("user")
        .doc(currentUser.uid)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            // alert(doc.data().picture_url);
            setUser(doc.data());
            // ge liked
            const likedBookIds = doc.data().liked_books;
            const likedList = [];
            likedBookIds?.forEach((id) => {
              likedList.push(id);
            });
            if (likedList != null && likedList.length > 0)
              db.collection("book")
                .where("book_id", "in", likedList)
                .get()
                .then((result) => {
                  const liked = [];
                  result.forEach((doc) => {
                    liked.push({
                      book_id: doc.data().book_id,
                      title: doc.data()?.title,
                      description: doc.data()?.description,
                      author_name: doc.data()?.author_name,
                      category: doc.data()?.category,
                      cover_url: doc.data()?.cover_url,
                      rating: doc.data()?.rating,
                    });
                  });
                  setListLikedBooks(liked);
                });
            // get currently reading
            const currentlyReading = doc.data().currently_reading;
            const currList = [];
            currentlyReading?.forEach((id) => {
              currList.push(id);
            });
            if (currList != null && currList.length > 0)
              db.collection("book")
                .where("book_id", "in", currList)
                .get()
                .then((result) => {
                  const curr = [];
                  result?.forEach((doc) => {
                    curr.push({
                      book_id: doc.data().book_id,
                      title: doc.data()?.title,
                      description: doc.data()?.description,
                      author_name: doc.data()?.author_name,
                      category: doc.data()?.category,
                      cover_url: doc.data()?.cover_url,
                      rating: doc.data()?.rating,
                    });
                  });
                  setCurrReaingBooks(curr);
                });
          }
        });
    } catch {
      alert("something went wrong!");
    }
  };

  // fetch published books from firebase
  const [booksResponse, setListOfBooks] = useState();
  const getBooks = async () => {
    db.collection("book")
      .where("publisher_id", "==", currentUser?.uid)
      .get()
      .then(function (result) {
        const books = [];
        result.forEach((doc) => {
          books.push({
            title: doc.data()?.title,
            description: doc.data()?.description,
            author_name: doc.data()?.author_name,
            category: doc.data()?.category,
            cover_url: doc.data()?.cover_url,
            rating: doc.data()?.rating,
          });
        });
        setListOfBooks(books);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  // fetch from firebase
  useEffect(() => {
    getUser();
    getBooks();
  }, []);

  // get html to display
  let publishedBooks;
  if (user?.user_type == "author")
    publishedBooks = (
      <div>
        <h2 className="profileHeaders">Published Books</h2>
        <button
          className="buttonAddBookAction"
          onClick={() => {
            history.push("/add-book");
          }}
        >
          +
        </button>
        {getBooksView(booksResponse)}
      </div>
    );
  else {
    publishedBooks = <br></br>;
  }
  let likedBooks = getBooksView(likedBooksResponse);
  let currReadingBooks = getBooksView(currReadingResponse);

  return (
    <render>
      <div>
        <body className="profileBody">
          <br/>
          <ReactRoundedImage
            image={user && user.picture_url}
            roundedColor="#66A5CC"
            roundedSize="8"
            borderRadius="100"
          ></ReactRoundedImage>
          <h2 className="username">{user && user?.name}</h2>
          <h5 className="useremail">{user?.email}</h5>
          <h5 className="useremail">
            {" > "}
            {user?.user_type || "reader"}
          </h5>
       
        {publishedBooks}
        <h2 className="profileHeaders">Liked Books</h2>
        {likedBooks}
        <h2 className="profileHeaders">Currently Reading</h2>
        {currReadingBooks}
      </body>
      </div>
    </render>
  );
}
