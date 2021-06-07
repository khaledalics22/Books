import { render } from '@testing-library/react';
import React, { useContext } from 'react'; 
import app from "./firebase/base.js";
import me from '../me.jpg'
import { Dropdown } from 'react-bootstrap';
import { Icon, IconButton } from '@material-ui/core';
import { AuthConext } from './firebase/auth.js';
import Navbar from "./Navbar"
import "./Home.css"

export  default function Home({ history }){
    const {currentUser} = useContext(AuthConext);
    return (
        <div>
            <Navbar history={history} currentUser={currentUser}/>
        </div> 
        
    );
}