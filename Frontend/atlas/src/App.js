import React from "react";
import { Route, Switch} from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./views/Login";
import Profile from "./views/Profile";
import NavBar from "./components/NavBar";
import {LinearProgress} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorAlert from "./components/auth0/ErrorAlert";
import Auth from "./components/AtlasAuth/Auth";
import LocationFinder from "./components/LocationFinder/LocationFinder";
import {useUser} from "./contexts/UserContext";
import {useErrors} from "./contexts/ErrorContext";

function App() {
    const { isLoading } = useAuth0();
  if(isLoading){
    return <LinearProgress />;
    // @TODO: tweak this to be bigger
  }

  return (
      <>
          <NavBar />
          <ErrorAlert/>
          <Auth />
          <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path ="/profile" component={Profile} />
          </Switch>
      </>
  );
}

export default App;