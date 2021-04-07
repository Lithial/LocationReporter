import React, { Component } from 'react';
import { UserContext } from '../contexts/UserContext';

class LocationFinder extends Component{
    static contextType = UserContext //how to user the context

    success(position, context){
        context.currentLocation = {"lat": position.coords.latitude, "lng": position.coords.longitude};
    }
    componentDidMount(){
        const { showLocation, currentLocation } = this.context;
        navigator.geolocation.getCurrentPosition((position) => this.success(position, this.context));
    }
    render(){     
        return(
            <div></div>
        );
    }
}

export default LocationFinder;