import React, {useEffect} from 'react';
import {useErrors} from "../../contexts/ErrorContext";
import {Alert, AlertTitle} from "@material-ui/lab";

const ErrorAlert = () => {

    const [errorMessage, setErrorMessage] = useErrors();

    useEffect(() =>{

    },[errorMessage])

    return (
        <div>
            {errorMessage !== "" && (
                <div style={{
                    padding: 10
                }}>
                    <Alert severity="error">
                        <AlertTitle><strong>Error</strong></AlertTitle>
                        {errorMessage}
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default ErrorAlert;