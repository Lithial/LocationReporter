import React from 'react';
import LocationFinder from "./LocationFinder";
import {useUser} from "../../contexts/UserContext";

const LocationMaster = () => {
    const {showLocation,updateLocation} = useUser()

    if(showLocation && updateLocation){
        return <LocationFinder/>
    }
    return <div>

    </div>

};

export default LocationMaster;