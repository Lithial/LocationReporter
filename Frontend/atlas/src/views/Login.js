import React, {useEffect} from "react";
import MapRenderer from "../components/MapRenderer/MapRenderer";
import {useErrors} from "../contexts/ErrorContext";

export default function Login() {
    const [errorMessage, setErrorMessage] = useErrors();

    useEffect(() => {
        setErrorMessage('');
    })
    return (
        <>
            <MapRenderer />
        </>
    );
}