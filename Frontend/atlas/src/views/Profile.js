import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useUser} from "../contexts/UserContext";
import {LinearProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ProfilePicture from "../components/Profile/ProfilePicture";
import ProfileTextElement from "../components/Profile/ProfileTextElement";
import ProfileFriendInput from "../components/Profile/ProfileFriendInput";
import {UpdateFriendCode} from "../api/FriendCalls";
import {DeleteUser, UpdateLocation, UpdateShowLocation} from "../api/UserCalls";
import ProfileFriendCard from "../components/Profile/ProfileFriendCard";
import {useErrors} from "../contexts/ErrorContext";
import LocationFinder from "../components/LocationFinder/LocationFinder";
import ProfileLocationCards from "../components/Profile/ProfileLocationCards";


const Profile = () => {
    const [userData, dispatch] = useUser();
    const {getAccessTokenSilently, logout} = useAuth0();
    const [errorMessage, setErrorMessage] = useErrors();

    const deleteUser = async () => {
        await DeleteUser(getAccessTokenSilently)
            .then(() => logout({returnTo: window.location.origin}))

    }

    const getNewFriendCode = async () => {
        try {
            dispatch({
                type: "UNLOAD_USER",
            });
            await UpdateFriendCode(getAccessTokenSilently)
                .then(data => {
                    dispatch({
                        type: "SET_FRIEND_CODE",
                        payload: data.friendCode,
                    })
                });

        } catch (error) {
            console.log(error)
        }
    }

    const flipShowLocation = async () => {
        dispatch({
            type: "UNLOAD_USER",
        })
        dispatch({
            type: "FLIP_SHOW_LOCATION",
        })
    }
    const toggleShowLocation = async () => {
        console.log("Show location:", userData.user.showLocation)
        try {
            console.log("Toggle show location")
            await flipShowLocation()
                .then(() =>{
                    if(userData.user.showLocation){
                        dispatch({
                            type: "UNLOAD_LOCATION",
                        })
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }
    if (!userData?.userLoaded) {
        return (
            <div>
                <LinearProgress/>
            </div>
        )
    }


    return (
        <div>
            <ProfilePicture/>
            <ProfileTextElement value={userData.user.nickname} text={"Nickname: "}/>
            <ProfileTextElement value={userData.user.friendCode} text={"Current Friend Code: "}/>
            <ProfileLocationCards/>
            <ProfileTextElement value={userData.user.showLocation} text={"Allow Fetch Location: "}/>
            <Button onClick={toggleShowLocation}>{"Show Location"}</Button>
            <Button onClick={deleteUser}>{"Delete Account"}</Button>
            <Button onClick={getNewFriendCode}>{"New Code"}</Button>
            <ProfileFriendInput/>
            <LocationFinder getAccessTokenSilently={getAccessTokenSilently} userData={userData} dispatch={dispatch} setErrorMessage={setErrorMessage}/>

            {userData.friendsLoaded ? <ProfileFriendCard/> : <LinearProgress/>}
        </div>
    );
};

export default Profile;