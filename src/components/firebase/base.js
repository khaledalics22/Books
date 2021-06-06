
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

  let app = firebase.initializeApp({
    apiKey: "AIzaSyCdAggi7FwFD5eFKI5J-SKQHlJZllSpZo0",
    authDomain: "books-ad527.firebaseapp.com",
    projectId: "books-ad527",
    storageBucket: "books-ad527.appspot.com",
    messagingSenderId: "726816442080",
    appId: "1:726816442080:web:407f6f28ed52c3968a7285",
    measurementId: "G-QLMW55X952"
  });

  firebase.analytics();

  export default app