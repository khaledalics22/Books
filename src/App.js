import React from 'react';
import './App.css';
import { AuthProvider } from './components/firebase/auth';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <AuthProvider>
    <Router>
      
        <PrivateRoute exact path="/" component={Home}/>  
        <Route exact path="/login" component={Login}/> 
        <Route exact path="/signup" component={SignUp}/>
    </Router>
    </AuthProvider>
  );
}

export default App;
