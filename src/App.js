import React, { useContext } from "react";
import "./App.css";
import { AuthProvider } from "./components/firebase/auth";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddBook from "./components/AddBook";
import BookReview from "./components/BookReview/BookReview";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/add-book" component={AddBook} />
          <Route exact path="/reviews/:bookId" component={BookReview} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
