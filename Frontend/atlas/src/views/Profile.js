import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useCurrentLocation} from "../contexts/LocationContext";
import {Typography} from "@material-ui/core";
import {useShowLocation} from "../contexts/ShowLocationContext";
import Button from "@material-ui/core/Button";
import LocationMaster from "../components/MapRenderer/LocationMaster";
import {useAddress} from "../contexts/AddressContext";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  const [currentLocation,setCurrentLocation] = useCurrentLocation();
  const [showLocation,toggleShowLocation] = useShowLocation();
  const [addressData, setAddressData] = useAddress();

  useEffect(() =>{
      return (<LocationMaster />)
  },[currentLocation])

  return (
    <div>
        <LocationMaster />
      <div>
        <div>
          <img
            src={picture}
            alt="Profile Picture"
          />
        </div>
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
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
          <Button onClick={toggleShowLocation}>{"Show Location:"}</Button>
      </div>
    </div>
  );
};

export default Profile;