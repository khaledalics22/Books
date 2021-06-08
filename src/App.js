import React from "react";
import "./App.css";
import { AuthProvider } from "./components/firebase/auth";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddBook from "./components/AddBook";
import Explore from "./components/Explore";

function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/add-book" component={AddBook} />
        <Route exact path="/explore" component={Explore} />
      </Router>
    </AuthProvider>
  );
}

export default App;
