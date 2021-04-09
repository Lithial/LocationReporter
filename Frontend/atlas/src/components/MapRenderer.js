import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../assets/css/Map.css'
import mapIcon from '../assets/venue_location_icon.svg'
import L from 'leaflet';

const icon = L.icon({
    iconUrl: mapIcon,
    iconSize: [64, 64],
  })   
    
export class MapRenderer extends Component{

    constructor(props){
        super(props);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.state = {
            zoom: 1,
            currentLocation: [0,0]
        }
    }
    componentDidMount(){
    this.handleLocationChange()
    }
    handleLocationChange() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState ({
                currentLocation: [
                    position.coords.latitude,
                    position.coords.longitude
                ]
            })
        })
    }

    render()
    {
        return (
            <div>
                <MapContainer center={this.state.currentLocation} zoom={this.state.zoom}
                              scrollWheelZoom={false}>
                    <TileLayer
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"/>
                    <Marker
                        position={this.state.currentLocation}
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
    }
}
export default MapRenderer;