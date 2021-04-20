import React, {useEffect} from 'react';
import {useCurrentLocation} from "../../contexts/LocationContext";

const LocationReset = () => {

    useEffect(() =>{
        console.log("Location Reset");
    },[])
    return (
        <div>

        </div>
    );
};

export default LocationReset;