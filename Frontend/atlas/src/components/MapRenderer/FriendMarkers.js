import React, {useEffect} from 'react';
import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import {Avatar} from "@material-ui/core";
import mapIcon from "../../assets/venue_location_icon.svg"

const FriendMarker = (props) => {


    const icon = L.divIcon({
        html:
        `<img src='${props.friend.picture}' style="border-radius: 50%; height: 48px; width: 48px; margin: 0 0;justify-content: center; align-items: center; padding: 0 0;"/>`
        ,
       /* iconUrl: props.friend.picture ? props.friend.picture : mapIcon,*/
        iconSize: [50, 50],
    });
    return (
        <Marker
            position={[props.friend.lat, props.friend.lng]}
            icon={icon}
        >
            <Popup>
                <Avatar src={`${props.friend.picture}`} />
                {props.friend.nickname}
                <br/>
                {props.friend.timezone}
            </Popup>
        </Marker>)
};

export default FriendMarker;