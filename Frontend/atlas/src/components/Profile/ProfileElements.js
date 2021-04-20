import React, {useEffect, useMemo} from 'react';
import ProfilePicture from "./ProfilePicture";
import ProfileTextElement from "./ProfileTextElement";
import {useUser} from "../../contexts/UserContext";
import LocationMaster from "../LocationFinder/LocationMaster";
import TimezoneFinder from "../TimezoneFinder";
import LocationFinder from "../LocationFinder/LocationFinder";

const ProfileElements = () => {
    const {
        nickname,
        showLocation,
        friendCode,
        country,
        currentCoords,
        timezone,
        recentChange
    } = useUser();

    useMemo(() => {

    },[recentChange])

    return (
        <div>
            <LocationMaster />

            <ProfilePicture/>
            <ProfileTextElement value={nickname} text={"Nickname: "}/>
            <ProfileTextElement value={friendCode} text={"Current Friend Code:"}/>
            <ProfileTextElement value={currentCoords} text={"Current Location"}/>
            <ProfileTextElement value={country  || ""} text={"Country"}/>
            <ProfileTextElement value={timezone || ""} text={"TimeZone:"}/>
            <ProfileTextElement value={showLocation} text={"Allow Fetch Location: :"}/>
        </div>
    );
};

export default ProfileElements;