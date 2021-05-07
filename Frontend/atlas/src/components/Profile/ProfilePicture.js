import React from 'react';
import {useUser} from "../../contexts/UserContext";
import {Avatar} from "@material-ui/core";

const ProfilePicture = () => {
    const [userData, dispatch] = useUser();

    return (
        <div>
            <Avatar src={userData.user.picture} alt="Profile Picture"/>
        </div>
    );

}

export default ProfilePicture;