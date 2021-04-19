import React, {useEffect} from 'react';
import {useCurrentLocation} from "../../contexts/LocationContext";

const LocationReset = () => {

    const [currentLocation,setCurrentLocation] = useCurrentLocation();
    useEffect(() =>{

    },[])
    return (
        <div>

        </div>
    );
};

export default LocationReset;