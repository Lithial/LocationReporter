import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css'
import styles from "./MapRenderer.module.scss"
import { render } from '@testing-library/react';

type MapProps = {
    currentLocation: { lat: 52.52437, lng: 13.41053 },
    zoom: 12,
}
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
        <MapContainer center={currentLocation} zoom={12} scrollWheelZoom={false}>
        <TileLayer subdomains={['mt0','mt1','mt2','mt3']}attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                   url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        />
{/*     <Marker position={currentLocation}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
</MapContainer>
    )
    }
}