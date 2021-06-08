import React, { useContext, useState, useEffect } from "react";
import app from "./firebase/base.js";
import { AuthConext } from "./firebase/auth.js";
import HomeBook from "./HomeBook";
import "./Home.css";

export default function Home({ history }) {
  const db = app.firestore();
  const { currentUser } = useContext(AuthConext);
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([]);
  let offset = 0;
  const getUser = async () => {
    try {
      db.collection("user")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUser(doc.data());
          }
        });
    } catch {
      alert("something went wrong!");
    }
  };

  const getBooks = async () => {
    try {
      db.collection("book")
        .get()
        .then((result) => {
          const returnedBooks = [];
          result.docs.forEach((doc) => {
            offset++;
            returnedBooks.push(doc.data());
          });
          setBooks(books.concat(returnedBooks));
        });
    } catch {
      alert("something went wrong!");
    }
  };

  useEffect(() => {
    getUser();
    getBooks();
  }, [currentUser]);

  return (
    <div>
      <div className="home-books">
        {books.map((book) => (
          <HomeBook key={book.book_id} book={book} />
        ))}
      </div>
    </div>
  );
}
