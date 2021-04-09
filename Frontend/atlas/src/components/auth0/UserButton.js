import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import {LoginButton, UserMenu} from "./LogInOutButtons";

const UserButton = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <UserMenu /> : <LoginButton />;
};

export default UserButton;