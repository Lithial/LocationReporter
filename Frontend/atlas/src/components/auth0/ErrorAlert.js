import React, {useEffect} from 'react';
import {useErrors} from "../../contexts/ErrorContext";
import {Typography} from "@material-ui/core";

const ErrorAlert = () => {
    const [errorMessage, setErrorMessage] = useErrors();

    useEffect(() =>{

    },[errorMessage])

    return (
        <Typography variant={"h6"}>
            {errorMessage}
        </Typography>
    );
};

export default ErrorAlert;