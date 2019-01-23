/* eslint-disable react/prop-types */
import React from 'react';
import { Route } from 'react-router-dom';

// eslint-disable-next-line max-len
export default ({ component: C, props: cProps, ...rest }) => <Route {...rest} render={props => <C {...props} {...cProps} />} />;
