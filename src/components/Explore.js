import { useState, useEffect, useContext } from "react";
import "./Explore.css";
import app from "./firebase/base.js";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthConext } from "./firebase/auth.js";
import HomeBook from "./HomeBook";
const orders = [
  { Name: "Likes", order: "likes" },
  { Name: "Title", order: "title" },
  { Name: "Author Name", order: "author_name" },
  { Name: "Rating", order: "rating" },
];
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
          <a
            key={category.id}
            className="categoryLink"
            onClick={() => changeCategory(category.Name)}
          >
            <h3 className="categoryLink"> {category.Name} </h3>
          </a>
        ))}
      </div>
    );
  }
  const changeCategory = (category) => {
    getBooks("title", "", category);
  };

  const [books, setBooks] = useState();
  const getBooks = async (orderBy, searchText, category) => {
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
        if (category !== "") query = query.where("category", "==", category);
        let result = await query.orderBy(orderBy).get();
        if (!result) console.log("There is no books in the database");
        else {
          result.forEach((doc) => {
            books.push(doc.data());
          });
        }
        console.log(books);
        setBooks(books);
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  let booksList = [];
  if (books != null) {
    booksList = (
      <div className="booksContainer">
        {books.map((book) => (
          <HomeBook key={book.book_id} book={book} />
        ))}
      </div>
    );
  }

  const [checkedState, setCheckedState] = useState(
    new Array(orders.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedState(updatedCheckedState);

    updatedCheckedState.forEach((item, index) => {
      if (item === true) {
        setOrderBy(orders[index].order);
        books.sort((a, b) => {
          if (a[orders[index].order] < b[orders[index].order]) return -1;
          if (a[orders[index].order] > b[orders[index].order]) return 1;
          return 0;
        });
      }
    });
  };

  let [orderBy, setOrderBy] = useState("title");

  const orderByChecked = (
    <div className="checkBoxes">
      <label>Order By</label>
      <ul>
        {orders.map((order, index) => {
          return (
            <li key={index}>
              <input
                onChange={() => handleOnChange(index)}
                checked={checkedState[index]}
                type="checkbox"
              />
              {order.Name}
            </li>
          );
        })}
      </ul>
    </div>
  );
  const onClickSearch = (searchText) => {
    console.log(searchText);
    getBooks(orderBy, searchText, "");
  };

  useEffect(() => {
    getCategory();
    getBooks(orderBy, "", "");
  }, []);
  return (
    <>
      <Navbar
        history={history}
        currentUser={currentUser}
        search={onClickSearch}
      />
      {orderByChecked}
      {booksList}
      {categoriesList}
    </>
  );
};

export default Explore;
