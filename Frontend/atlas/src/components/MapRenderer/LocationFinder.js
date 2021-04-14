import React, {useEffect} from 'react';
import {useCurrentLocation} from "../../contexts/LocationContext";

import {Location} from "../../models/LocationModel";
import {useAddress} from "../../contexts/AddressContext";
import {useErrors} from "../../contexts/ErrorContext";

const LocationFinder = () => {
    const [currentLocation,setCurrentLocation] = useCurrentLocation();
    const [addressData, setAddressData] = useAddress();
    const [errorMessage, setErrorMessage] = useErrors();
    useEffect(()=>{
        console.log("UseEffect")
        if(navigator.geolocation) {
            console.log("Geolocation: ", navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation([position.coords.latitude, position.coords.longitude])
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
                            if(!data)
                                setErrorMessage('Error Reading Data. Please Try Again.')
                            else{
                                setErrorMessage('')

                                console.log("data:", data)
                                console.log(`You are in ${data?.city} ${data?.country}`);
                                let location = new Location(data.city, data.country, data.latt, data.longt, data.timezone);
                                console.log(location);
                                setAddressData(location);
                                setCurrentLocation([location.lat,location.lng])
                            }
                        })
                }
            );
            console.log("Location:", currentLocation)
        }
        else{
            console.log("Ack Nien Explosions")
            //TODO add error context to display errors
        }

    },[])

    return (
        <div>

        </div>
    );
};

export default LocationFinder;