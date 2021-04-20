import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import TimezoneFinder from "../components/TimezoneFinder";
import {useUser} from "../contexts/UserContext";
import ProfileElements from "../components/Profile/ProfileElements";

const Profile = () => {
    const {getAccessTokenSilently} = useAuth0();
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
        setUpdateLocation,
    } = useUser();


    const asyncToggleLocationAndUpdateUI = async () => {
        try {
            let reverseLocation = !showLocation;
            setShowLocation(reverseLocation)
            setUpdateLocation(reverseLocation);
            setRecentChange(Date.now())
            console.log("Test of toggle show location changes:", reverseLocation)
            console.log("Test of update location:", updateLocation)
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
                    nickname: nickname,
                    picture: picture,
                    location: {
                        country: country,
                        lat: lat,
                        lng:lng,
                        timezone:timezone
                    },
                    showLocation: showLocation
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
                    nickname: nickname,
                    picture: picture,
                    location: {
                        country: country,
                        lat: lat,
                        lng:lng,
                        timezone:timezone
                    },
                    showLocation: showLocation
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
    //TODO Fix current location setup
  return (
    <div>
      <div>
          <TimezoneFinder />

          <ProfileElements/>

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