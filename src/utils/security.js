import React from 'react';
import {Redirect} from 'react-router-dom';
import {userHasRole, isUserLogged} from './user-info';

export const WithAuth = (WrappedComponent, allowedRoles) => {
    return props => userHasRole(allowedRoles) ? <WrappedComponent {...props} /> : <Redirect to='/welcome'/>;
};

export const WithoutAuth = (WrappedComponent) => {
    return props => isUserLogged() ? <Redirect to='/'/> : <WrappedComponent {...props} />;
};
