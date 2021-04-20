import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";
import ErrorContext from "./contexts/ErrorContext";
import UserContext from "./contexts/UserContext";

ReactDOM.render(
  <>
      <BrowserRouter>
          <Auth0ProviderWithHistory>
              <CssBaseline />
              <UserContext>
                  <ErrorContext>
                          <App/>
                  </ErrorContext>
              </UserContext>
          </Auth0ProviderWithHistory>
      </BrowserRouter>
  </>,
  document.getElementById("root")
);

