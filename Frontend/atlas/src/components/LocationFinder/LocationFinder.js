import React, {useEffect} from 'react';
import {useErrors} from "../../contexts/ErrorContext";
import {useUser} from "../../contexts/UserContext";
import {DEV_MODE} from "../../config/Config";
import {UpdateLocation} from "../../api/UserCalls";
import {useAuth0} from "@auth0/auth0-react";

const LocationFinder = () => {

    const {setCountry, setLat, setLng, setCurrentCoords, setTimezone, updateLocation, setUpdateLocation} = useUser();
    const [errorMessage, setErrorMessage] = useErrors();
    const { getAccessTokenSilently } = useAuth0();

const GetLocationCoords = () => {
    if(updateLocation) {
        if (navigator.geolocation) {
            setUpdateLocation(false);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;

                    fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
                        .then(response => {
                            if (!response.ok)
                                setErrorMessage('Error Retrieving Data. Please Wait');
                            else
                                setErrorMessage('')
                            return response.json();
                        })

                        .then(data => {
                            if (!data)
                                setErrorMessage('Error Reading Data. Please Try Again.')
                            else {
                                setErrorMessage('')

                                if (data.success !== false) {
                                    let lat = data.latt.substring(0, data.latt.length - 3);
                                    let lng = data.longt.substring(0, data.longt.length - 3);

                                    setLng(lng);
                                    setLat(lat);
                                    setCountry(data.country)
                                    setTimezone(data.timezone)
                                    setCurrentCoords([lat, lng])
                                    UpdateLocation( getAccessTokenSilently,{
                                        country: data.country,
                                        lat: lat,
                                        lng:lng,
                                        timezone:data.timezone,
                                        showLocation: true
                                    },function(){

                                    })
                                    if(DEV_MODE) {
                                        console.log("userModel Test From Location Finder:", lat, lng)
                                    }
                                } else {
                                    setErrorMessage(data.error.message)
                                }
                            }
                        }
                    )
                }
            );
        }
    }
}
useEffect(()=>{
    if(DEV_MODE) {
        console.log("Location Finder");
    }
    GetLocationCoords()
},[])

    return (
        <div>
        </div>
    );
};

export default LocationFinder;