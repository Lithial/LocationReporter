import React from "react";
import MapRenderer from "../components/MapRenderer"
import LocationFinder from "../components/LocationFinder"
import UserContextProvider, { UserContext } from "../contexts/UserContext";
export default function Home(){

    return (
        <div>
        <UserContextProvider>
            <LocationFinder />
            <MapRenderer />
         </UserContextProvider>
        </div>
    )
}