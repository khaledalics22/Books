import { render } from '@testing-library/react';
import React, { useContext, useState} from 'react'; 
import app from "./firebase/base.js";
import me from '../me.jpg'
import { Dropdown } from 'react-bootstrap';
import { Icon, IconButton } from '@material-ui/core';
import { AuthConext } from './firebase/auth.js';
import Navbar from "./Navbar"
import HomeBook from "./HomeBook"
import "./Home.css"

export  default function Home({ history }){
    const db = app.firestore();
    const {currentUser} = useContext(AuthConext);
    const [user ,setUser ] = useState(); 
    const [likedBooksResponse,setListLikedBooks] = useState(); 
    const getUser = async() =>{
        try {
        db.collection('user').doc(currentUser.uid).get().then(async(doc)=>{
            if(doc.exists){
                setUser(doc.data());
                const ids = doc.data().liked_books;
                const list = []; 
               ids.forEach((id)=>{ 
                    list.push(id); 
                });
                await db.collection('book').where('book_id','in',list)
                .get().then((result)=>{
                    const liked = []; 
                    result.forEach((doc)=>{
                        liked.push({title:doc.data()?.title
                            ,description:doc.data()?.description,
                            author_name:doc.data()?.author_name,
                            category:doc.data()?.category,
                            cover_url:doc.data()?.cover_url,
                            rating:doc.data()?.rating});
                    });
                    setListLikedBooks(liked); 
                });
            }
        });
       
    } catch {
       alert('something went wrong!');
      }
    };

    return (
        <div>
            <Navbar history={history} currentUser={user}/>
            <div className="home-books">
                <HomeBook book={null}/>
                <HomeBook book={null}/>
                <HomeBook book={null}/>
                <HomeBook book={null}/>
                <HomeBook book={null}/>
                <HomeBook book={null}/>
            </div>
        </div> 
        
    );
}