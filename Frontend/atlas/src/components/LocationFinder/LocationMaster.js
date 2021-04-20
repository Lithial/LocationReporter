import React, {useEffect, useMemo} from 'react';
import {useShowLocation} from "../../contexts/ShowLocationContext";
import LocationFinder from "./LocationFinder";
import LocationReset from "./LocationReset";
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