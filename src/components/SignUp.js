import React, { useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import app from "./firebase/base";
import "./SignUp.css";

const SignUp = ({ history }) => {
  // upload image
  const handleUpload = (user, name, email) => {
    // console.log(this.state.image);
    let file = image;
    var storage = app.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child("folder/" + file.name).put(file);

    uploadTask.then(async () => {
      // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
      uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
        const db = app.firestore();
        console.log(name.value);
        // console.log(user.uid);
        // alert('add user data'+user);
        await db
          .collection("user")
          .doc(user.uid)
          .set({ name: name.value, email: email.value, picture_url: url });
        history.push("/");
      });
    });
  };
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { name, email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((user) => {
            handleUpload(user.user, name, email);
          });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  var image;
  const handleChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        image = e.target.files[0];
      }
    },
    [history]
  );

  return (
    <render>
      <h6 name="login" style={{ fontSize: "xx-large" }}>
        Sign Up
      </h6>
      <div class="container3">
        <form style={{ display: "inline-block" }} onSubmit={handleSignUp}>
          <label className="labelSignUp">Name</label>
          <input
            className="inputSignUp"
            name="name"
            type="label"
            placeholder="Name"
          />
          <label className="labelSignUp">Email</label>
          <input
            className="inputSignUp"
            name="email"
            type="email"
            placeholder="Email"
          />
          <label className="labelSignUp"> Password </label>
          <input
            className="inputSignUp"
            name="password"
            type="password"
            placeholder="Password"
          />
          <label className="labelSignUp">Choose Image</label>
          <input
            className="inputSignUp"
            type="file"
            id="file"
            onChange={handleChange}
          />
          <button className="buttonSignUp" type="submit">
            Sign Up
          </button>
          <br />
          <Link to="/login">Already have email? Login!</Link>
        </form>
      </div>
    </render>
  );
};

export default withRouter(SignUp);
