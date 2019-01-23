/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps => (childProps.isLoggedIn ? (<C {...rProps} {...childProps} />) : (<Redirect to="/login" />))
    }
  />
);

export default ProtectedRoute;
