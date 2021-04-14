import React, {useEffect} from 'react';
import {useCurrentLocation} from "../../contexts/LocationContext";

const LocationReset = () => {

    const [currentLocation,setCurrentLocation] = useCurrentLocation();
    useEffect(() =>{
            setCurrentLocation([0,0])
    },[])
    return (
        <div>

        </div>
    );
};

export default LocationReset;