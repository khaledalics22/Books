import React, { useEffect, useState } from "react";
import app from "./base";

export const AuthConext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    app.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setCurrentUser(authUser);
        return localStorage.setItem("authUser", JSON.stringify(authUser));
      } else {
        setCurrentUser(null);
        return localStorage.removeItem("authUser");
      }
    });
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);
  return (
    <AuthConext.Provider value={{ currentUser }}>
      {children}
    </AuthConext.Provider>
  );
};

export default AuthProvider;
