import React, {useEffect, useMemo} from 'react';
import {DEV_MODE} from "../../config/Config";
import {UpdateLocation} from "../../api/UserCalls";

const LocationFinder = (props) => {
    const { country, showLocation} = props.userData.user;
    const { locationLoaded, user } = props.userData;
    const GetLocationCoords = async () => {
        if (props.userData.locationLoaded) {
            console.log("No need to run function")
            return;
        }
        if (!locationLoaded && showLocation) {
            console.log("Start finding location")
            if (navigator.geolocation) {
                await navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        let lat = position.coords.latitude.toString().substring(0, 7);
                        let lng = position.coords.longitude.toString().substring(0, 7);
                        await fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
                            .then(response => {
                                if (!response.ok) {
                                    props.setErrorMessage('Error Retrieving Data. Please Wait');
                                } else {
                                    props.setErrorMessage('')
                                }
                                return response.json();
                            })
                            .then(data => {
                                if (!data)
                                    props.setErrorMessage('Error Reading Data. Please Try Again.')
                                else {
                                    props.setErrorMessage('')
                                    if (data.success !== false) {
                                       // let lat = data.latt.substring(0, data.latt.length - 3);
                                        //let lng = data.longt.substring(0, data.longt.length - 3);
                                        UpdateLocation(props.getAccessTokenSilently, {
                                            country: data.country,
                                            lat: lat.toString(),
                                            lng: lng.toString(),
                                            timezone: data.timezone,
                                            showLocation: true
                                        }).then(msg => {
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

    }
    const EscapeFunction = () => {
        props.dispatch({
            type: "LOCATION_LOADED",
        })
    }
    useEffect(() => {
        if (country === null || !country) {
            GetLocationCoords()
                .then(() => console.log('location loaded'))
        } else {
            EscapeFunction()
        }
    }, [showLocation])

    return (
        <div>
        </div>
    );
};

export default LocationFinder;