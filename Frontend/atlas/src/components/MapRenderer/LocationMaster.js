import React, {useEffect} from 'react';
import {useShowLocation} from "../../contexts/ShowLocationContext";
import LocationFinder from "./LocationFinder";
import LocationReset from "./LocationReset";

const LocationMaster = () => {
    const [showLocation, setShowLocation] = useShowLocation()
    useEffect(() =>{

    },[showLocation])
    if(showLocation){
        return <LocationFinder/>
    }
    else {
        return <LocationReset/>
    }
};

export default LocationMaster;