import React from "react";
import { Route, Switch} from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./views/Login";
import Profile from "./views/Profile";
import NavBar from "./components/NavBar";
import { LinearProgress } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import {useCurrentLocation} from "./contexts/LocationContext";

function App() {
  const { isLoading } = useAuth0();
  const [currentLocation,setCurrentLocation] = useCurrentLocation();
  if(isLoading){
    return <LinearProgress />;
    // @TODO: tweak this to be bigger
  }

  return (
      <>
          <NavBar />
          <Switch>
              {/* { <Route exact path={["/", "/home"]} component={Home} /> } */}
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path ="/profile" component={Profile} />
          </Switch>
      </>
  );
}

export default App;