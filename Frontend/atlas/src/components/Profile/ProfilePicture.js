import React, {useEffect} from 'react';
import {useUser} from "../../contexts/UserContext";

const ProfilePicture = () => {
    const {picture, recentChange} = useUser();
    useEffect(() =>{

    },[recentChange])

    return (
        <div>
            <img
                src={picture}
                alt="Profile Picture"
            />
        </div>
    );
};

export default ProfilePicture;