import React, { useCallback } from "react";
import { withRouter ,Link } from "react-router-dom";
import app from "./firebase/base";
import './SignUp.css'


const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const {name, email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).then(function(user){
          const db = app.firestore();
          console.log(name.value);
          // console.log(user.uid);
          db.collection('user').doc(user.uid).set({name: name.value}); 
         });
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div>
      <h1 name='SignUp' style={StyleSheet.SignUp}>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label> Name  </label> <p></p>
        <input name="name" type="label" placeholder="Name" /><p></p>
        <label> Email  </label> <p></p>
        <input name="email" type="email" placeholder="Email" /><p></p>
        <label > Password </label> <p></p>
        <input name="password" type="password" placeholder="Password" /> <p></p>
        <button type="submit">Sign Up</button>
      </form><p></p>
      <Link to="/login">Already have email? Login!</Link>
    </div>
  );
};

export default withRouter(SignUp);