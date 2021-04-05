import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css'
import L from 'leaflet';
import mapIcon from '../assets/venue_location_icon.svg'


type MapProps = {
    currentLocation: { lat: 52.52437, lng: 13.41053 },
    zoom: 12,
}
const icon = L.icon({
  iconUrl: mapIcon,
  iconSize: [64, 64],
})
export default class MapRenderer extends Component<any,MapProps>{
 constructor(props:MapProps){
     super(props);
     this.state = {
        currentLocation: { lat: 52.52437, lng: 13.41053 },
        zoom: 12,
      }
    }

    render(){  
    const { currentLocation, zoom} = this.state; 
    return(
        <MapContainer center={currentLocation} zoom={3} scrollWheelZoom={false}>
        <TileLayer subdomains={['mt0','mt1','mt2','mt3']}attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                   url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        />
        <Marker position={currentLocation} icon={icon}>
          <Popup>
            Lithial<br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    )
    }
}