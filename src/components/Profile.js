import React, { useContext, useEffect, useState } from 'react'; 
import app from "./firebase/base.js";
import logo from '../logo.svg'
import './Profile.css'
import me from '../me.jpg'
import { AuthConext } from './firebase/auth.js';
import GridList from '@material-ui/core/GridList';




export  default function Profile({ history }){
    const db = app.firestore();
    const {currentUser} = useContext(AuthConext);
    const [user,setUserName] = useState(); 
    const getUser = async() =>{
        try {
        const data = await db.collection('user').doc('tKJvbIdlmr9Z4AUfUgCO').get('name');
        setUserName(data.data());
    } catch {
       alert('something went wrong!');
      }
    };

    const [booksResponse,setListOfBooks] = useState(); 
    const getBooks = async ()=> {
            db.collection('book').where('publisher_id','==',currentUser.uid).get()
            .then(function(result){
            const books = []; 
               result.forEach(doc => {
                   books.push({title:doc.data()?.title
                    ,desc:doc.data()?.description,
                    authorName:doc.data()?.author_name,
                    category:doc.data()?.category});
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
            <div className='wrap'>
                <img  className='profile_img' src={me} onClick={()=>{
                        history.push('/profile')
                    }}/> 
                <body>
                <div className='username'>
                    <b  style={{margin:'7px',fontSize:'30px'}}>{user&&user?.name}</b>
                </div>
                <div className='useremail'>
                    <b  style={{margin:'7px'}}>{currentUser.email}</b>
                </div>
                </body>
            </div>

            <div className='username'>
                <body>
                    <button onClick={()=>{
                       history.push('/add-book') 
                    }}>Add Book</button>
                    <button >Reviews</button>
                </body>
           </div>
           {/* <div>
           <GridList cellHeight={160} className={classes.gridList} cols={4}>
                {books.map((tile) => (
                    <GridListTile  title={tile.title}>
                    <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                ))}
                </GridList>
           </div> */}
        </render>
        
    );
}