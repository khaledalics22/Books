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
    <render >
      <body className="bodyLogin">
        <h1 name='login'>Login</h1>
        <div class="container2">
            <form className="formLogin" style={{display:'inline-block'}} onSubmit={handleLogin}>
                <label className="labelLogin"> Email </label> 
                <input className="inputLogin" name="email" type="label" placeholder="Email" /> 
                <label className="labelLogin"> Password </label> 
                <input className="inputLogin" name="password" type="password" placeholder="Password" /> 
                <button className="buttonLogin" type="submit">Login</button><br/>
                <Link className="loginLink" to="/signup">Don't have email? SignUP!</Link>
            </form>
        </div>
      </body>
    </render>
  );
};

export default withRouter(Login);