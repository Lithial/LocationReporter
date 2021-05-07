import React, {useEffect} from 'react';
import {DEV_MODE} from "../../config/Config";
import {UpdateLocation} from "../../api/UserCalls";

const LocationFinder = (props) => {
    const {showLocation} = props.userData.user;
    const GetLocationCoords = () => {
        console.log("Location finder state:", props)
        if(props.userData.locationLoaded || !props.userData.user.country){
            console.log("No need to run function")
            props.dispatch({
                type: "LOCATION_LOADED",
            })
            return;
        }
        console.log("Fetching Location Data")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;
                    fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
                        .then(response => {
                            if (!response.ok)
                                props.setErrorMessage('Error Retrieving Data. Please Wait');
                            else
                                props.setErrorMessage('')
                            return response.json();
                        })

                        .then(data => {
                            if (!data)
                                props.setErrorMessage('Error Reading Data. Please Try Again.')
                            else {
                                props.setErrorMessage('')

                                if (data.success !== false) {
                                    let lat = data.latt.substring(0, data.latt.length - 3);
                                    let lng = data.longt.substring(0, data.longt.length - 3);
                                    UpdateLocation(props.getAccessTokenSilently, {
                                        country: data.country,
                                        lat: lat.toString(),
                                        lng: lng.toString(),
                                        timezone: data.timezone,
                                        showLocation: true
                                    }).then(msg => {
                                        console.log("LOCATION FINDER DATA:", data)
                                        props.dispatch({
                                            type: "UPDATE_USER",
                                            payload: {
                                                lat: lat,
                                                lng: lng,
                                                country: data.country,
                                                timezone: data.timezone,
                                                currentCoords: [lat, lng]
                                            }
                                        })
                                        props.dispatch({
                                            type: "LOCATION_LOADED",
                                        })
                                    })
                                    if (DEV_MODE) {
                                        console.log("userModel Test From Location Finder:", lat, lng)
                                    }
                                } else {
                                    props.setErrorMessage(data.error.message)
                                }
                            }
                        }
                    )
                }
            );
        }
    }
    useEffect(() => {
        if (DEV_MODE) {
            console.log("Location Finder");
        }
        GetLocationCoords()

    }, [])
    useEffect(() => {
        if (DEV_MODE) {
            console.log("Location Finder");
        }
        GetLocationCoords()

    }, [showLocation])

    return (
        <div>
        </div>
    );
};

export default LocationFinder;