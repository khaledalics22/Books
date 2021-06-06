
import React, { useCallback, useContext } from 'react'; 
import app from "./firebase/base.js";
import './AddBook.css'
import { AuthConext } from './firebase/auth.js';
import { withRouter } from "react-router-dom";

const AddBook = ({ history })=>{
    const {currentUser} = useContext(AuthConext);
    const handleAddBook = useCallback(async event => {
        event.preventDefault();
        const {title, authoerName,category,description } = event.target.elements;
        try {
           // alert(title.value+'\n'+authoerName.value+'\n'+currentUser.uid+'\n'+description.value+'\n');
            const db = app.firestore();
            await db.collection('book').doc().set({
                publisher_id: currentUser.uid,title:title.value,
                author_name:authoerName.value, description:description.value,
                category:category.value}); 
            history.push('/profile');
        } catch (error) {
          alert(error);
        }
      }, [history]);
     
    return (
        <render >
            <h1 name='addbook' >Add New Book</h1>
            <form onSubmit={handleAddBook}>
                <div className='a'>
                <h3>Book title</h3> 
                </div><div className='a'>
                <input name="title" type="label" placeholder="Book Title" />
                </div><div className='a'>
                <h3> Author Name  </h3> 
                </div><div className='a'>
                <input name="authoerName" type="label" placeholder="Author Name" />
                </div><div className='a'>
                <h3 > category </h3> 
                </div><div className='a'>
                <input name="category" type="label" placeholder="Category" /> 
                </div><div className='a'>
                <h3 > description </h3> 
                </div><div className='a'>
                <input name="description" type="label" placeholder="Description" /> 
                </div><div className='b'>
                <button type="submit">Add</button>
                </div>
            </form>
        </render>
        
    );
};
export default withRouter(AddBook);