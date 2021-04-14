import React from "react";
import { Route, Switch} from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./views/Login";
import Profile from "./views/Profile";
import NavBar from "./components/NavBar";
import {LinearProgress, Typography} from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import {useErrors} from "./contexts/ErrorContext";

function App() {
  const { isLoading } = useAuth0();
    const [errorMessage, setErrorMessage] = useErrors();

  if(isLoading){
    return <LinearProgress />;
    // @TODO: tweak this to be bigger
  }

  return (
      <>
          <NavBar />
          <Typography variant={"h3"}>
              {errorMessage}
          </Typography>
          <Switch>
              {/* { <Route exact path={["/", "/home"]} component={Home} /> } */}
              <Route exact path="/" component={Login} />
              <ProtectedRoute exact path ="/profile" component={Profile} />
          </Switch>
      </>
  );
}

export default App;