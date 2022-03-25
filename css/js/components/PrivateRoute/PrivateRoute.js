import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authService from '../../services/authService';

// auth guard high order component 
const PrivateRoute =  ({ component: Component, ...rest }) => {
    const userData = authService.getCurrentUser();
    document.title= rest.name + " - Phitron"
    return <Route
        {...rest}
        render={props => userData ? <Component {...props} /> : <Redirect to='/login' /> }
    />  
}
export default PrivateRoute;