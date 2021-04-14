import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";
import LocationProvider from "./contexts/LocationContext";

ReactDOM.render(
  <>
      <BrowserRouter>
          <Auth0ProviderWithHistory>
              <CssBaseline />
              <LocationProvider>
                  <App/>
              </LocationProvider>
          </Auth0ProviderWithHistory>
      </BrowserRouter>
  </>,
  document.getElementById("root")
);

