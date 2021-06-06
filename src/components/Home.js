import { render } from '@testing-library/react';
import React, { useContext } from 'react'; 
import app from "./firebase/base.js";
import me from '../me.jpg'
import { Dropdown } from 'react-bootstrap';
import './Home.css'
import { Icon, IconButton } from '@material-ui/core';
import { AuthConext } from './firebase/auth.js';
import {Link } from "react-router-dom";

export  default function Home({ history }){
    const {currentUser} = useContext(AuthConext);
    return (
        <render >
        <div style={{ display: "flex", backgroundColor:'#FF5722' }}>
            <button className='logoutBtn' onClick={async ()=>{
                app.auth().signOut().then(() => {
                    history.push('/')
                }).catch((error) => {
                    alert(error);
                }); 
            }}>Log Out</button>
            <Link to='/profile' style={{alignSelf:'center'}}>{currentUser.email}</Link>
            <img style={{borderRadius:'30px',alignSelf:'center', margin:'10px', border: '5px solid white'}} className='icon' src={me} onClick={()=>{
                history.push('/profile')
            }}/>
            
        </div>
        <h1>Home</h1>
        </render>
        
    );
}