import React from 'react';
import ProfileTextElement from "./ProfileTextElement";
import {useUser} from "../../contexts/UserContext";
import {LinearProgress} from "@material-ui/core";

const ProfileLocationCards = () => {
    const [userData, dispatch] = useUser();
    if(!userData.locationLoaded){
        if(!userData.user.showLocation){
            return(
                <div>

            </div>);
        }
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
            <ProfileTextElement value={`lat: ${userData.user.currentCoords[0]} | lng: ${userData.user.currentCoords[1]}`} text={"Current Location: "}/>
            <ProfileTextElement value={userData.user.country} text={"Country: "}/>
            <ProfileTextElement value={userData.user.timezone} text={"TimeZone: "}/>
        </div>
    );
};

export default ProfileLocationCards;