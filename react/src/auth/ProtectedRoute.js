import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import LinearProgress from '@material-ui/core/LinearProgress';

const ProtectedRoute = ({ component, ...args }) => (
    <Route 
    component={withAuthenticationRequired(component,{ onRedirecting: () => <LinearProgress />, })}
    {...args}
    />
);

export default ProtectedRoute;