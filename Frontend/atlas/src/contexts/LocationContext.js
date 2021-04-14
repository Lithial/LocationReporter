import React, {useContext, useState} from 'react';

const LocationContext = React.createContext();

export function useCurrentLocation(){
    return useContext(LocationContext);
}
export const LocationProvider = ({children}) => {
    const [currentLocation,setCurrentLocation] = useState([0,0]);

    return (
        <LocationContext.Provider value={[currentLocation,setCurrentLocation]}>
                {children}
        </LocationContext.Provider>
    )
};

export default LocationProvider;
