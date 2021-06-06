import { render } from '@testing-library/react';
import React from 'react'; 
import app from "./firebase/base.js";

export  default function Home({ history }){
    return (
        <render >
        <div style={{ display: "flex" }}>
            <button style={{ marginLeft: "auto" }} onClick={async ()=>{
                app.auth().signOut().then(() => {
                    history.push('/')
                }).catch((error) => {
                    alert(error);
                }); 
            }}>Log Out</button>
        </div>
        <h1>Home</h1>
        </render>
        
    );
}