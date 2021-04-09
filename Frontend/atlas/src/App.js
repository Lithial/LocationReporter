import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./views/Login";
import Profile from "./views/Profile";
import NavBar from "./components/NavBar";
import { LinearProgress } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading } = useAuth0();

  if(isLoading){
    return <LinearProgress />;
    // @TODO: tweak this to be bigger
  }

  return (
      <>
          <BrowserRouter>
              <NavBar />
              <Switch>
                  {/* { <Route exact path={["/", "/home"]} component={Home} /> } */}
                  <Route exact path="/" component={Login} />
                  <ProtectedRoute exact path ="/profile" component={Profile} />
              </Switch>
          </BrowserRouter>
      </>
  );
}

export default App;