import React, { useEffect,useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapRenderer.css"
import mapIcon from "../../assets/venue_location_icon.svg"
import L from "leaflet";
import {useCurrentLocation} from "../../contexts/LocationContext"

/*These imports need to be in this order for the map to load properly*/

const MapRenderer = () => {
    const [currentLocation,setCurrentLocation] = useCurrentLocation();
    const [zoom,setZoom] = useState(3);
    const [centrePosition,setCentrePosition] = useState([5, 176])

    const icon = L.icon({
        iconUrl: mapIcon,
        iconSize: [64, 64],
    });

    useEffect(() =>{

    },[currentLocation]);

    return (
        <div>
            <MapContainer center={centrePosition} zoom={zoom}
                          scrollWheelZoom={true} >
                <TileLayer
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                <Marker
                    position={currentLocation}
                    icon={icon}>
                    <Popup>
                        Lithial
                        <br/>
                        Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapRenderer;