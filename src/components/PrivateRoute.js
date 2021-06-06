import React , { useContext } from 'react'; 
import { Route, Redirect } from 'react-router-dom'; 
import { AuthConext } from './firebase/auth'

const PrivateRoute = ({ component: RouteComponent,...rest})=> {
    const {currentUser} = useContext(AuthConext);
    return (
    <Route
      {...rest}
      render = {routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps}/>
        ) : ( 
         <Redirect to={"/login"}/> 
        )
      }
    />
  );
};


export default PrivateRoute