import React, {useEffect} from 'react';
import {useShowLocation} from "../../contexts/ShowLocationContext";
import LocationFinder from "./LocationFinder";
import LocationReset from "./LocationReset";
import {useUser} from "../../contexts/UserContext";

const LocationMaster = () => {
    const [userModel, setUserModel] = useUser()

    useEffect(() =>{
        console.log("Location Master");
    },[userModel.showLocation])


    if(userModel.showLocation){
        return <LocationFinder/>
    }
    else {
        return <LocationReset/>
    }
};

export default LocationMaster;