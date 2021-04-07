import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../assets/css/Map.css'
import mapIcon from '../assets/venue_location_icon.svg'
import L from 'leaflet';
import { UserContext } from '../contexts/UserContext';
import { Button } from '@material-ui/core';
import LocationFinder from './LocationFinder';


const icon = L.icon({
    iconUrl: mapIcon,
    iconSize: [64, 64],
  })   
    
export class MapRenderer extends Component{
    static contextType = UserContext //how to user the context

    constructor(props){
        super(props);
        this.state = {
            zoom: 12,
            currentLocation: ""
        }
    }
    

    render(){
    const { showLocation, currentLocation } = this.context;
    console.log("Context:", currentLocation);
        return(
            <div>
                <MapContainer center={currentLocation} zoom={3} scrollWheelZoom={false}>
                <TileLayer 
                subdomains={['mt0','mt1','mt2','mt3']}attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>             
                <Marker 
                position={currentLocation} 
                icon={icon}>
            <Popup>
                Lithial
                <br /> 
                Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
        </div>
        );
        }
        
    
}
export default MapRenderer;