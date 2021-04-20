import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useCurrentLocation} from "../contexts/LocationContext";
import Button from "@material-ui/core/Button";
import TimezoneFinder from "../components/TimezoneFinder";
import LocationMaster from "../components/LocationFinder/LocationMaster";
import {useUser} from "../contexts/UserContext";
import ProfilePicture from "../components/Profile/ProfilePicture";
import ProfileTextElement from "../components/Profile/ProfileTextElement";

const Profile = () => {
    const {getAccessTokenSilently} = useAuth0();
    const [userModel, setUserModel] = useUser();
    const [currentLocation, setCurrentLocation] = useCurrentLocation();
   /* const [addressData, setAddressData] = useAddress();*/

    const asyncToggleLocationAndUpdateUI = async () => {
        try {
            let showLocation = !userModel.showLocation;
            setUserModel({
                ...userModel,
                showLocation
            })
            console.log("Test of toggle show location changes:", userModel)
        } catch (error) {
            console.log(error)
        }
    }
    const postUser = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:3002/user`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors', // no-cors, *cors, same-origin
                body: JSON.stringify({
                    nickname: userModel.nickname,
                    picture: userModel.picture,
                    location: userModel.location,
                    showLocation: userModel.showLocation
                })
            });
            const responseData = await response.json();
        } catch (error) {
            console.log(error)
        }

    }
    const getUser = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:3002/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = await response.json();
        } catch (error) {
            console.log(error)
        }
    }
    const updateUser = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:3002/user`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors', // no-cors, *cors, same-origin
                body: JSON.stringify({
                    nickname: userModel.nickname,
                    picture: userModel.picture,
                    location: userModel.location,
                    showLocation: userModel.showLocation
                })
            });
            const responseData = await response.json();
        } catch (error) {
            console.log(error)
        }
    }
    const updateCode = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:3002/code`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors', // no-cors, *cors, same-origin
            });
            const responseData = await response.json();
        } catch (error) {
            console.log(error)
        }
    }
    const deleteUser = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:3002/user`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                mode: 'cors', // no-cors, *cors, same-origin
            });
            const responseData = await response.json();
        } catch (error) {
            console.log(error)
        }
    }
  /*  const updateShowLocation = () => {
        let prevUserModel = {
            ...userModel,
            showLocation
        }
        setUserModel(prevUserModel);
    }*/
    /*useEffect(() =>{
        console.log("Profile change on show location");
        updateShowLocation()
    },[showLocation]);*/

    //TODO Fix current location setup
  return (
    <div>
        <LocationMaster />
        <TimezoneFinder />
        <div>
            <ProfilePicture />
      </div>
      <div>
          <ProfileTextElement value={userModel.nickname} text={"Nickname: "}/>
          <ProfileTextElement value={userModel.friendCode} text={"Current Friend Code:"}/>
          <ProfileTextElement value={currentLocation} text={"Current Location"}/>
          <ProfileTextElement value={userModel.location?.country  || ""} text={"Country"}/>
          <ProfileTextElement value={userModel.location?.timezone || ""} text={"TimeZone:"}/>
          <ProfileTextElement value={userModel.showLocation} text={"Allow Fetch Location: :"}/>

          <Button onClick={asyncToggleLocationAndUpdateUI}>{"Show Location:"}</Button>
          <Button onClick={getUser}>{"Get"}</Button>
          <Button onClick={postUser}>{"Post"}</Button>
          <Button onClick={updateUser}>{"Update"}</Button>
          <Button onClick={deleteUser}>{"Delete"}</Button>
          <Button onClick={updateCode}>{"New Code"}</Button>
      </div>
    </div>
  );
};

export default Profile;