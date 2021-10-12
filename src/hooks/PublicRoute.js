import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isLogin} from '../Auth';

const PublicRoute = ({component: Component, restricted, ...rest}) =>
(
    <Route 
    {...rest}
    render={props => (isLogin() && restricted ? <Redirect to="/home" /> : <Component{...props} />)} />
)
export default PublicRoute;