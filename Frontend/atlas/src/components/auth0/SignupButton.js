import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@material-ui/core';

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button 
        onClick={()=> 
            loginWithRedirect({
                screen_hint: "SignUp"
            })
        }
        >
        Sign Up
        </Button>
    )
}
export default SignupButton;