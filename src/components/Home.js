import React, { useContext, useState, useEffect } from "react";
import app from "./firebase/base.js";
import { AuthConext } from "./firebase/auth.js";
import Navbar from "./Navbar";
import HomeBook from "./HomeBook";
import "./Home.css";

const db = app.firestore();

const Home = ({ history }) => {
  const [books, setBooks] = useState([]);
  const { currentUser } = useContext(AuthConext);
  useEffect(() => {
    db.collection("book")
      .get()
      .then((fetchedBooks) => {
        let result = [];
        fetchedBooks.forEach((book) => {
          result.push({ ...book.data(), id: book.id });
        });
        setBooks(result);
        console.log(books);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <Navbar history={history} currentUser={currentUser} />
      {books.map((book) => (
        <HomeBook book={book} />
      ))}
    </div>
  );
};

export default Home;
