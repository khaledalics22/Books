import React, { useContext, useEffect, useState } from 'react'; 
import app from "./firebase/base.js";
import './Profile.css'
import { AuthConext } from './firebase/auth.js';
import { GridListTile, GridListTileBar,IconButton ,GridList ,Divider, Container, colors} from '@material-ui/core';
import Rating from 'react-rating';
import ReactRoundedImage from "react-rounded-image";


export default function Profile({ history}){
    const db = app.firestore();
    const {currentUser} = useContext(AuthConext);
    const [user ,setUser ] = useState(); 

    const getUser = async() =>{
        try {
        db.collection('user').doc(currentUser.uid).get().then((doc)=>{
            if(doc.exists){
                setUser(doc.data());
            }
        });
       
    } catch {
       alert('something went wrong!');
      }
    };
    const [booksResponse,setListOfBooks] = useState(); 
    const getBooks = async ()=> {
            db.collection('book').where('publisher_id','==',currentUser?.uid).get()
            .then(function(result){
            const books = []; 
               result.forEach(doc => {
                   books.push({title:doc.data()?.title
                    ,description:doc.data()?.description,
                    author_name:doc.data()?.author_name,
                    category:doc.data()?.category,
                    cover_url:doc.data()?.cover_url,
                    rating:doc.data()?.rating});
               });
                setListOfBooks(books);
            }).catch(function(error){
                alert(error);
            }
        );
    }
    useEffect(()=>{
        getUser();
        getBooks(); 
    },[])
    return (
        <render > 
            <div>
             <ReactRoundedImage
                    image={user?.picture_url}
                    roundedColor="#66A5CC"
                    roundedSize="8"
                    borderRadius="100"
                   >
            </ReactRoundedImage>
            <h2 className="username">{user&&user?.name}</h2>
            <h3 className="useremail">{user?.email}</h3>
            </div>
           <h2 >Books</h2>
           <button className="buttonAddBookAction"  onClick={()=>{
                       history.push('/add-book') 
                    }}>+</button>
            <div required={booksResponse!=null&&booksResponse?.length>0}>
           <Divider style={{backgroundColor:'white', height:'1px'}} />
           <GridList cellHeight="auto" maxWidth="200px" spacing="0px" cols={4} style={{textAlign:'left', textAlignLast:'left'}}>
                  {booksResponse?.map((book) => (
                  <div className='itemContainer'>
                    <img src={book.cover_url} className="bookCover"/>
                    <p className="bookTileData" style={{fontSize:"22px"}}>{book.title}</p>
                    <p className="bookTileData" style={{color:'gray'}}>Category: {book.category}</p>
                    <p className="bookTileData" style={{color:'gray'}}>Author: {book.author_name}</p>
                    <p className="bookTileData" style={{color:'gray'}}>{book.description}</p> 
                     <Rating initialRating={`${book?.rating}`} emptySymbol={<Container style={{backgroundColor:"white"}}></Container>} /> 
               </div>
            ))}
           </GridList >
           <Divider style={{backgroundColor:'white', height:'1px'}}/>
           </div>   
        </render>
        
    );
}

