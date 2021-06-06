import React, { useCallback, useContext } from "react";
import { withRouter, Redirect,Link } from "react-router-dom";
import { AuthConext } from "./firebase/auth.js";
import app from "./firebase/base.js";

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
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>Email</label><p></p>
        <input name="email" type="email" placeholder="Email" /><p></p>
        <label>Password</label><p></p>
        <input name="password" type="password" placeholder="Password" /><p></p>
        <button type="submit">Log in</button><p></p>
        <Link to='/signup'>Don't have Email? Sign Up!</Link>
      </form>
    </div>
  );
};

export default withRouter(Login);