import React, {useContext, useState} from 'react';

const ShowLocationContext = React.createContext();

export function useShowLocation(){
    return useContext(ShowLocationContext);
}
export const ShowLocationProvider = ({children}) => {
    const [showLocation,setShowLocation] = useState(false);
    function toggleShowLocation(){
        setShowLocation(prevShowLocation => !prevShowLocation);
    }
    return (
        <ShowLocationContext.Provider value={[showLocation,toggleShowLocation]}>
            {children}
        </ShowLocationContext.Provider>
    )
};

export default ShowLocationProvider;
