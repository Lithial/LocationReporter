import React, { useEffect,useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapRenderer.css"
import mapIcon from "../../assets/venue_location_icon.svg"
import L from "leaflet";
import {useUser} from "../../contexts/UserContext";
import FriendMarkers from "./FriendMarkers";
import {Map} from "leaflet/dist/leaflet-src.esm";

/*These imports need to be in this order for the map to load properly*/

const MapRenderer = () => {
    const [zoom,setZoom] = useState(3);
    const [centrePosition,setCentrePosition] = useState([5, 176])
    const {nickname, timezone,showLocation,currentCoords,friends} = useUser();
    const icon = L.icon({
        iconUrl: mapIcon,
        iconSize: [64, 64],
    });

    useEffect(() =>{
        console.log(currentCoords)
    },[currentCoords]);

    return (
        <div>
            <MapContainer
                center={centrePosition}
                zoom={zoom}
                scrollWheelZoom={true}>
                <TileLayer
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                 {showLocation ?
                    <Marker
                    position={currentCoords}
                    icon={icon}>
                    <Popup>
                        {nickname}
                        <br/>
                        {timezone}
                    </Popup>
                </Marker>
                    : <></>
                }
                {friends.length !== 0 ?
                    friends.map((friend, index ) => {
                        console.log(`Loading friend marker for ${friend.nickname}`)
                        return (
                            <Marker
                                position={[friend.lat, friend.lng]}
                                icon={icon}
                                key={index}
                            >
                                <Popup>
                                    {friend.nickname}
                                    <br/>
                                    {friend.timezone}
                                </Popup>
                            </Marker>)
                    })
                    : <></>
                }
            </MapContainer>

              {/*  {showLocation ?
                    <Marker
                    position={currentCoords}
                    icon={icon}>
                    <Popup>
                        Lithial
                        <br/>
                        Easily customizable.
                    </Popup>
                </Marker>
                    : <></>
                }*/}
{/*
                <FriendMarkers/>
*/}
{/*
            </Map>
*/}
        </div>
    );
};

export default MapRenderer;