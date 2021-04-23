import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import TimezoneFinder from "../components/TimezoneFinder";
import {useUser} from "../contexts/UserContext";
import ProfileElements from "../components/Profile/ProfileElements";
import {UpdateShowLocation, DeleteUser, UpdateFriendCode} from "../api/UserCalls";

const Profile = () => {
    const {getAccessTokenSilently, logout} = useAuth0();
    const {
        nickname,
        picture,
        showLocation,
        setShowLocation,
        country,
        lat,
        lng,
        timezone,
        setRecentChange,
        updateLocation,
        setFriendCode,
        setUpdateLocation,
    } = useUser();

    const deleteUser = async () => {
        try{
            DeleteUser(getAccessTokenSilently,function (){
            })
            logout({returnTo: window.location.origin});

        }catch (error) {
            console.log(error)
        }
    }
    const getNewFriendCode = async () => {
        try{
            UpdateFriendCode(getAccessTokenSilently,function (data){
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
            UpdateShowLocation(getAccessTokenSilently,false,function(){

            });

        } catch (error) {
            console.log(error)
        }
    }


    //TODO Fix current location setup
  return (
    <div>
      <div>
          <TimezoneFinder />
          <ProfileElements/>

          <Button onClick={asyncToggleLocationAndUpdateUI}>{"Show Location:"}</Button>
          <Button onClick={deleteUser}>{"Delete Account"}</Button>
          <Button onClick={getNewFriendCode}>{"New Code"}</Button>
      </div>
    </div>
  );
};

export default Profile;