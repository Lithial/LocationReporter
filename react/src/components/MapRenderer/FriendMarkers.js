import React from 'react';
import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import {Avatar} from "@material-ui/core";
import * as ReactDOMServer from "react-dom/server";

const FriendMarker = (props) => {

    const icon = L.divIcon({
        html: ReactDOMServer.renderToString(<Avatar src={props.friend.picture} alt={props.friend.nickname} />),
        className: "not-a-real-class-to-disable-background"
    });

    const options = {
            timeZone: props.friend.timeZone,
            hour: "numeric",
            minute: "numeric",
        }
    const formatter = new Intl.DateTimeFormat([], options);

    return (
        <Marker
            position={[props.friend.lat, props.friend.lng]}
            icon={icon}
        >
            <Popup>
                {props.friend.nickname}
                <br/>
                {formatter.format(new Date())} ({props.friend.timezone})
            </Popup>
        </Marker>
    )
};

export default FriendMarker;