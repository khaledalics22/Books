import React, { useContext, useState, useEffect, useRef} from 'react'; 
import app from "./firebase/base.js";
import { AuthConext } from './firebase/auth.js';
import Navbar from "./Navbar"
import HomeBook from "./HomeBook"
import "./Home.css"

export  default function Home({ history }){
    const db = app.firestore();
    const {currentUser} = useContext(AuthConext);
    const [user, setUser] = useState(''); 
    const [books, setBooks] = useState([]);
    const [scrolling, setScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [reachedBottom, setReachedBottom] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);

    function hasReachedBottom() {
        return (
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight
        );
    }

    const getUser = async() =>{
        try {
            db.collection('user').doc(currentUser.uid).get().then( (doc)=>{
                if(doc.exists){
                    setUser(doc.data());
                }
            });
        } catch {
            alert('something went wrong!');
        }
    };

    const getBooks = async() =>{
        try {
            db.collection('book').limit(5).get().then( (result)=>{
                const returnedBooks = [];
                result.docs.forEach(doc => {
                    returnedBooks.push(doc.data());
                });
                setLastDoc(result.docs[result.docs.length-1]);
                setBooks(books.concat(returnedBooks));
            });
        } catch {
            alert('something went wrong!');
        }
    };

    const getMoreBooks = async() =>{
        try {
            db.collection('book').startAfter(lastDoc).limit(5).get().then( (result)=>{
                const returnedBooks = [];
                result.docs.forEach(doc => {
                    returnedBooks.push(doc.data());
                });
                setLastDoc(result.docs[result.docs.length-1]);
                setBooks(books.concat(returnedBooks));
            });
        } catch {
            setReachedBottom(true);
        }
    };

    useEffect(()=>{
        getUser();
        getBooks();
    },[])

    useEffect(() => {
        const onScroll = e => {
            if(hasReachedBottom() && !reachedBottom) {
                getMoreBooks();
            }
            // console.log(hasReachedBottom());
            setScrollTop(e.target.documentElement.scrollTop);
            setScrolling(e.target.documentElement.scrollTop > scrollTop);
        };
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
      }, [scrollTop]);    

    return (
        <div>
            <Navbar history={history} currentUser={user}/>
            <div className="home-books">
                {books.map((book) => (
                    <HomeBook key={book.book_id} book={book}/>
                ))}
            </div>
        </div> 
        
    );
}
