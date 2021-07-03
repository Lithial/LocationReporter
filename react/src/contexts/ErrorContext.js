import React, {useContext, useState} from 'react';

const ErrorContext = React.createContext("");

export function useErrors(){
    return useContext(ErrorContext);
}
export const ErrorProvider = ({children}) => {
    const [errorMessage,setErrorMessage] = useState("");

    return (
        <ErrorContext.Provider value={[errorMessage,setErrorMessage]}>
            {children}
        </ErrorContext.Provider>
    )
};

export default ErrorProvider;
