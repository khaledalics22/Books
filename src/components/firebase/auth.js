import React , {useEffect, useState} from "react";
import app from "./base";

export const  AuthConext  =  React.createContext(); 


export const  AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null); 

    useEffect(()=>{
         app.auth().onAuthStateChanged(setCurrentUser); 
    },[]);
    return (
        <AuthConext.Provider
         value = {{currentUser}}
        >{children}</AuthConext.Provider>
    );
};

export default AuthProvider 
