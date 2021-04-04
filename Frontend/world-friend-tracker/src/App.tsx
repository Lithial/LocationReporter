import { CssBaseline } from '@material-ui/core';
import React from 'react';
import Login from './pages/Login';
import { Switch, Route } from 'react-router-dom';

function App() {
  console.log("App Level User:");
  return (
      <React.Fragment>
        <CssBaseline />
        <Switch>
          {/* <Route exact path={["/", "/home"]} component={Home} /> */}
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/register" component={Register} /> */}
        </Switch>
      </React.Fragment>
  );
}

export default App;