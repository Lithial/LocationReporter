import React, {useEffect} from 'react';
import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import {Avatar} from "@material-ui/core";
import mapIcon from "../../assets/venue_location_icon.svg"

const FriendMarker = (props) => {


    const icon = L.icon({
        iconUrl: !props.friend.picture ? props.friend.picture : mapIcon,
        iconSize: [64, 64],
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