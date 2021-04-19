import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useCurrentLocation} from "../contexts/LocationContext";
import {Typography} from "@material-ui/core";
import {useShowLocation} from "../contexts/ShowLocationContext";
import Button from "@material-ui/core/Button";
import {useAddress} from "../contexts/AddressContext";
import TimezoneFinder from "../components/MapRenderer/TimezoneFinder";
import LocationMaster from "../components/MapRenderer/LocationMaster";

const Profile = () => {
    const {user, getAccessTokenSilently} = useAuth0();
    const {name, picture} = user;
    console.log("UserInfo:", user)
    const [currentLocation, setCurrentLocation] = useCurrentLocation();
    const [showLocation, toggleShowLocation] = useShowLocation();
    const [addressData, setAddressData] = useAddress();

    const asyncToggleLocationAndUpdateUI = async () => {
        try {
            toggleShowLocation()
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
                    nickname: user.nickname,
                    picture: user.picture,
                    location: addressData,
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
                    nickname: user.nickname,
                    picture: user.picture,
                    location: addressData,
                    showLocation: showLocation
                })
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

  return (
    <div>
        <LocationMaster />
        <TimezoneFinder />
        <div>
        <div>
          <img
            src={picture}
            alt="Profile Picture"
          />
        </div>
        <div>
          <h2>{name}</h2>
        </div>
      </div>
      <div>
        <Typography variant={"body1"}>
            {
                "Nickname: " +user.nickname
            }
        </Typography>
      <Typography variant={"body1"}>
          {
              "CurrentLocation: " + currentLocation
          }
      </Typography>
      <Typography variant={"body1"}>
          {
              "City: " +addressData.city
          }
      </Typography>
      <Typography variant={"body1"}>
          {
              "Country: " + addressData.country
          }
      </Typography>
      <Typography variant={"body1"}>
          {
              "TimeZone: " + addressData.timezone
          }
      </Typography>
      <Typography variant={"body1"}>
          {
              "ShowLocation: " + showLocation
          }
      </Typography>
          <Button onClick={asyncToggleLocationAndUpdateUI}>{"Show Location:"}</Button>
          <Button onClick={getUser}>{"Get"}</Button>
          <Button onClick={postUser}>{"Post"}</Button>
          <Button onClick={updateUser}>{"Update"}</Button>
          <Button onClick={deleteUser}>{"Delete"}</Button>


      </div>
    </div>
  );
};

export default Profile;