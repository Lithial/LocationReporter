import React from 'react';
import ProfileTextElement from "./ProfileTextElement";
import {useUser} from "../../contexts/UserContext";
import {LinearProgress} from "@material-ui/core";

const ProfileLocationCards = () => {
    const [userData, dispatch] = useUser();
    if(!userData.locationLoaded){
        return (
            <div>
                <LinearProgress/>
            </div>
        )
    }
    if((userData.user.country === "" || userData.user.country === undefined || userData.user.country === "undefined") && !userData.user.showLocation){
        return(
            <div>

        </div>
        )
    }
    return (
        <div>
            <ProfileTextElement value={userData.user.currentCoords} text={"Current Location: "}/>
            <ProfileTextElement value={userData.user.country} text={"Country: "}/>
            <ProfileTextElement value={userData.user.timezone} text={"TimeZone: "}/>
        </div>
    );
};

export default ProfileLocationCards;