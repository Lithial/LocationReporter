import React, {useEffect, useMemo, useRef} from 'react';
import {useErrors} from "../../contexts/ErrorContext";
import {useUser} from "../../contexts/UserContext";

const LocationFinder = () => {

    const {showLocation,setCountry, setLat, setLng, setCurrentCoords, setTimezone, setRecentChange, updateLocation, setUpdateLocation} = useUser();
    const [errorMessage, setErrorMessage] = useErrors();

const GetLocationCoords = () => {
    if(updateLocation) {
        if (navigator.geolocation) {
            setUpdateLocation(false);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;

                    const response = fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
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
                                    setRecentChange(Date.now)
                                    console.log("userModel Test From Location Finder:", lat, lng)
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
useMemo(()=>{
    console.log("Location Finder");
    if(updateLocation){
        GetLocationCoords()
    }
},[])

    return (
        <div>
        </div>
    );
};

export default LocationFinder;