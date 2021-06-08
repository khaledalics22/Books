import { useState, useEffect, useContext } from "react";
import "./Explore.css";
import app from "./firebase/base.js";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthConext } from "./firebase/auth.js";
import HomeBook from "./HomeBook";
const Explore = ({ history }) => {
  const { currentUser } = useContext(AuthConext);
  const db = app.firestore();
  const [categories, setCategories] = useState();
  const getCategory = async () => {
    try {
      let categories = [];
      let result = await db.collection("category").get();
      if (!result) console.log("There is no categories in the database");
      else {
        result.forEach((doc) => {
          categories.push({ Name: doc.data().Name, id: doc.id });
        });
      }
      setCategories(categories);
    } catch {
      alert("error in getting categories from database");
    }
  };

  let categoriesList = [];
  if (categories != null) {
    categoriesList = (
      <div className="categoriesContainer">
        <h1>Categories</h1>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={"/category/" + category.Name}
            className="categoryLink"
          >
            <h3 className="categoryLink"> {category.Name} </h3>
          </Link>
        ))}
      </div>
    );
  }

  const [books, setBooks] = useState();
  const getBooks = async (orderBy, searchText) => {
    try {
      let books = [];
      let query = db.collection("book");
      let query1, query2, query3;
      if (searchText != "") {
        query1 = query.where("title", "==", searchText);
        query2 = query.where("author_name", "==", searchText);
        query3 = query.where("category", "==", searchText);
        let result1 = await query1.get();
        let result2 = await query2.get();
        let result3 = await query3.get();
        result1.forEach((doc) => {
          books.push(doc.data());
        });
        result2.forEach((doc) => {
          books.push(doc.data());
        });
        result3.forEach((doc) => {
          books.push(doc.data());
        });
        books.sort((a, b) => {
          if (a[orderBy] < b[orderBy]) return -1;
          if (a[orderBy] > b[orderBy]) return 1;
          return 0;
        });
        setBooks(books);
      } else {
        let result = await query.orderBy(orderBy).get();
        if (!result) console.log("There is no books in the database");
        else {
          result.forEach((doc) => {
            books.push(doc.data());
          });
        }
        setBooks(books);
      }
    } catch (err) {
      alert(err);
    }
  };

  let booksList = [];
  if (books != null) {
    booksList = (
      <div className="booksContainer">
        {books.map(({ title, category, rating, author_name, cover_url }) => (
          <HomeBook
            title={title}
            category={category}
            rating={rating}
            author_name={author_name}
            cover_url={cover_url}
          />
        ))}
      </div>
    );
  }
  let [orderBy] = useState("title");
  const changeOrderBy = (orderby) => {
    orderBy = orderby;
    console.log(orderBy);
  };
  const orderByChecked = (
    <div className="checkBoxes">
      <label>Order By</label>
      <ul>
        <li>
          <input type="radio" onClick={changeOrderBy("likes")} /> Likes
        </li>
        <li>
          <input type="radio" onClick={changeOrderBy("title")} /> Title
        </li>
        <li>
          <input type="radio" onClick={changeOrderBy("author_name")} /> Author
          Name
        </li>
        <li>
          <input type="radio" onClick={changeOrderBy("rating")} /> Rating
        </li>
      </ul>
    </div>
  );
  const onClickSearch = (searchText) => {
    console.log(searchText);
    getBooks("title", searchText);
  };

  useEffect(() => {
    getCategory();
    getBooks(orderBy, "");
  }, []);
  return (
    <render>
      <Navbar
        history={history}
        currentUser={currentUser}
        search={onClickSearch}
      />
      {categoriesList}
      {booksList}
      {orderByChecked}
    </render>
  );
};

export default Explore;
