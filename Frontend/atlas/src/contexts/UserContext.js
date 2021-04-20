import React, {useContext, useState} from 'react';
const UserContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}
export const UserProvider = ({children}) => {
    const [nickname, setNickname] = useState('');
    const [picture, setPicture] = useState('');
    const [showLocation, setShowLocation] = useState(false);
    const [friendCode, setFriendCode] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [currentCoords, setCurrentCoords] = useState([lat,lng]);
    const [timezone, setTimezone] = useState('');
    const [userLoaded, setUserLoaded] = useState(false);
    const [recentChange, setRecentChange] = useState(true);
    const [updateLocation, setUpdateLocation] = useState(false);

    const UserModel = React.useMemo(() => ({
            nickname, setNickname,
            picture,setPicture,
            showLocation,setShowLocation,
            friendCode,setFriendCode,
            country,setCountry,
            lat,setLat,
            lng,setLng,
            currentCoords,setCurrentCoords,
            timezone,setTimezone,
            userLoaded,setUserLoaded,
            recentChange,setRecentChange,
            updateLocation, setUpdateLocation,
    }),[nickname,picture,showLocation,friendCode,country,lat,lng,currentCoords,timezone,userLoaded,recentChange,updateLocation])

    return (
        <UserContext.Provider value={UserModel}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;
