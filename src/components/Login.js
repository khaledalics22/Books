import React, { useCallback, useContext } from "react";
import { withRouter, Redirect,Link } from "react-router-dom";
import { AuthConext } from "./firebase/auth.js";
import app from "./firebase/base.js";
import './Login.css'

const Login = ({ history }) => {

  
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthConext);
  if (currentUser) {
    return (<Redirect to="/" />);
  }

  return (
    <div className="formLogin" >
      <h1>Log in</h1>
      <form  onSubmit={handleLogin}>
        <label className="labelLogin">Email</label>
        <input className="inputLogin" name="email" type="email" placeholder="Email" />
        <label className="labelLogin">Password</label>
        <input className="inputLogin" name="password" type="password" placeholder="Password" />
        <button className="buttonLogin" type="submit">Log in</button>
        <Link to='/signup'>Don't have Email? Sign Up!</Link>
      </form>
    </div>
  );
};

export default withRouter(Login);