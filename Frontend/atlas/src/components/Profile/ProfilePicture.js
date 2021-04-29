import React, {useEffect} from 'react';
import {useUser} from "../../contexts/UserContext";
import {Avatar} from "@material-ui/core";

const ProfilePicture = () => {
    const {picture, recentChange} = useUser();
    useEffect(() =>{

    },[recentChange])

    return (
        <div>
            <Avatar src={picture} alt="Profile Picture"/>
        </div>
    );

}

export default ProfilePicture;