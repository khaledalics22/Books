import React, { useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import app from "./firebase/base";
import "./SignUp.css";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const {name, email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).then((user)=>{
          handleUpload(user.user,name,email); 
         });
    } catch (error) {
      alert(error);
    }
  }, [history]);
  var image;
  const handleChange =  useCallback(e=>{
    if(e.target.files[0]){
        image = e.target.files[0];
    }
  },[history]);
  var userType; 
  function setUserType(type){
    userType = type; 
  }
  // upload image 
  const handleUpload = (user, name,email ) =>{
    // console.log(this.state.image);
    let file =  image;
    
    var storage = app.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child('folder/' + file.name).put(file);
  
    uploadTask.then(async () =>{
        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
        uploadTask.snapshot.ref.getDownloadURL().then(async (url) =>{
          const db = app.firestore();
          console.log(name.value);
          // console.log(user.uid);
          // alert('add user data'+user); 
          await db.collection('user').doc(user.uid)
          .set({name: name.value,email:email.value, picture_url:url,user_type:userType,
            liked_books:[],currently_raeding:[]}); 
          history.push("/");
        });
     });
    };

  return (
    <render >
      <body className="bodySignUp">
          <h1 name='signup' >Sign Up</h1>
          <div class="container3">
              <form className="formSingUp" style={{display:'inline-block'}} onSubmit={handleSignUp}>
                  <label className="labelSignUp">Name</label> 
                  <input className="inputSignUp" name="name" type="label" placeholder="Name" />
                  <label className="labelSignUp">Email</label> 
                  <input className="inputSignUp" name="email" type="email" placeholder="Email" />
                  <label className="labelSignUp"> Password </label>
                  <input className="inputSignUp" name="password" type="password" placeholder="Password" /> 
                  <label className="labelSignUp">Choose Image</label>
                  <input className="inputFile" type="file" id="file" onChange={handleChange} />
                  <label className="labelSignUp" >User type</label>
                  <div onChange={(event)=>{  setUserType(event.target.value); }}>
                    <form>
                      <label class="radio-inline" className='radio-label' for="author">  
                      <input type="radio" id="author" value="author" name="gender"/>Author</label>
                      <label class="radio-inline" className='radio-label' for="reader" >
                      <input type="radio" id="reader" value="reader" name="gender" />Reader</label>
                    </form>
                  </div>
                  <button className="buttonSignUp" type="submit">Sign Up</button><br/>
                  <Link className="signUpLink" to="/login">Already have email? Login!</Link>
              </form>
          </div>
          </body>
    </render>
  );
};

export default withRouter(SignUp);
