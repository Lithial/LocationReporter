import React, {useMemo} from 'react';
import ProfilePicture from "./ProfilePicture";
import ProfileTextElement from "./ProfileTextElement";
import {useUser} from "../../contexts/UserContext";
import ProfileFriendInput from "./ProfileFriendInput";
import {LinearProgress} from "@material-ui/core";
import ProfileFriendCard from "./ProfileFriendCard";
import Button from "@material-ui/core/Button";
import {DeleteUser, UpdateFriendCode, UpdateShowLocation} from "../../api/UserCalls";
import {useAuth0} from "@auth0/auth0-react";

const ProfileElements = () => {
    const {
        nickname,
        showLocation,
        friendCode,
        country,
        currentCoords,
        timezone,
        recentChange,
        userLoaded,
        friendsLoaded,
        setShowLocation,
        setRecentChange,
        setFriendCode,
        setUpdateLocation,
    } = useUser();

    const {getAccessTokenSilently, logout} = useAuth0();

    const deleteUser = async () => {
        try{
            await DeleteUser(getAccessTokenSilently,function (){
            })
            logout({returnTo: window.location.origin});

        }catch (error) {
            console.log(error)
        }
    }
    const getNewFriendCode = async () => {
        try{
            await UpdateFriendCode(getAccessTokenSilently,function (data){
                setFriendCode(data.friendCode)
            })
        }catch (error) {
            console.log(error)
        }
    }
    const asyncToggleLocationAndUpdateUI = async () => {
        try {
            let reverseLocation = !showLocation;
            setShowLocation(reverseLocation)
            setUpdateLocation(reverseLocation);
            setRecentChange(Date.now())
            await UpdateShowLocation(getAccessTokenSilently,false,function(){

            });

        } catch (error) {
            console.log(error)
        }
    }

    useMemo(() => {

    },[recentChange])

    if(!userLoaded){
        return <LinearProgress />;
        // @TODO: tweak this to be bigger
    }
    return (
        <div>
            <ProfilePicture/>
            <ProfileTextElement value={nickname} text={"Nickname: "}/>
            <ProfileTextElement value={friendCode} text={"Current Friend Code: "}/>
            <ProfileTextElement value={currentCoords} text={"Current Location: "}/>
            <ProfileTextElement value={country  || ""} text={"Country: "}/>
            <ProfileTextElement value={timezone || ""} text={"TimeZone: "}/>
            <ProfileTextElement value={showLocation} text={"Allow Fetch Location: :"}/>
            <ProfileFriendInput/>
            <Button onClick={asyncToggleLocationAndUpdateUI}>{"Show Location"}</Button>
            <Button onClick={deleteUser}>{"Delete Account"}</Button>
            <Button onClick={getNewFriendCode}>{"New Code"}</Button>

            {friendsLoaded ? <ProfileFriendCard/> : <LinearProgress />}
        </div>
    );
};

export default ProfileElements;