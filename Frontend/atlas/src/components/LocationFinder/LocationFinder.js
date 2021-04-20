import React, {useEffect} from 'react';
import {useCurrentLocation} from "../../contexts/LocationContext";
import {LocationModel} from "../../models/LocationModel";
import {useAddress} from "../../contexts/AddressContext";
import {useErrors} from "../../contexts/ErrorContext";
import {useUser} from "../../contexts/UserContext";

const LocationFinder = () => {
    const [currentLocation,setCurrentLocation] = useCurrentLocation();
    const [addressData, setAddressData] = useAddress();

    const [userModel, setUserModel] = useUser();
    const [errorMessage, setErrorMessage] = useErrors();

const GetLocationCoords = async () => {
    if (navigator.geolocation) {
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
                            if(data.success !== false) {
                                let lat = data.latt.substring(0,data.latt.length -3);
                                let lng = data.longt.substring(0,data.longt.length -3);

                                setAddressData(new LocationModel(data.country, lat, lng, data.timezone));
                                setCurrentLocation([lat, lng])
                                let location = new LocationModel(data.country, lat, lng, data.timezone);
                                setUserModel({
                                    userModel,
                                    location
                                })
                                console.log("userModel Test From Location Finder:", userModel)
                            } else {
                                setErrorMessage(data.error.message)
                            }
                        }
                    })
            }
        );
    }
}
useEffect(()=>{
    console.log("Location Finder");
    GetLocationCoords();

},[userModel.showLocation])

    return (
        <div>

        </div>
    );
};

export default LocationFinder;