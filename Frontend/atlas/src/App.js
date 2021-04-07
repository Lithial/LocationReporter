import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NavBar from './components/auth0/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import LinearProgress from '@material-ui/core/LinearProgress';
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  console.log("App Level User:");
  const { isLoading } = useAuth0();

  if(isLoading){
    return <LinearProgress />;
    //todo tweak this to be bigger
  }
  return (
        <React.Fragment>
          <CssBaseline />
          <NavBar />
          <Switch>
            {/* { <Route exact path={["/", "/home"]} component={Home} /> } */}
            <Route exact path="/" component={Login} />
            <ProtectedRoute exact path ="/profile" component={Profile} />
          </Switch>
        </React.Fragment>
  );
}

export default App;