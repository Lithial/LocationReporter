import {useAuth0} from "@auth0/auth0-react";
import {useUser} from "../../contexts/UserContext";
import {GetUser, GetFriends, CreateUser, UpdateUser} from "../../api/UserCalls";
import {useMemo} from "react";
import {DEV_MODE} from "../../config/Config";
import React from "react";

function Auth(){
    const { user } = useAuth0();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const {
        userLoaded,
        setNickname,
        setPicture,
        setShowLocation,
        setFriendCode,
        setCountry,
        setLat,
        setLng,
        setCurrentCoords,
        setTimezone,
        setUserLoaded,
        setRecentChange,
        setFriends,
        setFriendsLoaded,
} = useUser();

    const GetFriendsFunction = () => {
        if(DEV_MODE){
            console.log("Getting friends list");
        }
        GetFriends(getAccessTokenSilently, (data => {
            if(data != null){
                if(DEV_MODE){
                    console.log("Friend Data:", data);
                }
                setFriends(data);
                setFriendsLoaded(true);
            }
        }))
    }

    const GetUserFunction = () => {
        if(DEV_MODE){
            console.log("Getting user info!");
        }
        GetUser(getAccessTokenSilently,(data =>
            {
                if(DEV_MODE){
                    console.log(data);
                }
                if(data.status !== "404" && isAuthenticated && !userLoaded){
                    if(DEV_MODE) {
                        console.log("data:", data)
                        console.log("Auth User Show Location:", data.showlocation)
                    }
                    setShowLocation(JSON.parse(data.showlocation));
                    setNickname(user.name);
                    setPicture(user.picture);
                    setFriendCode(data.currentfriendcode);
                    if(!data.country){
                        setCountry("")
                        setLat(0);
                        setLng(0);
                        setTimezone("");
                        setCurrentCoords([0,0]);
                    }else{
                        setCountry(data.country);
                        setLat(data.lat);
                        setLng(data.lng);
                        setTimezone(data.timezone);
                        setCurrentCoords([data.lat,data.lng]);
                    }
                    setUserLoaded(true);
                    if(data.nickname !== user.nickname ||  data.picture !== user.picture)
                    {
                        UpdateUserFunction({
                            nickname: user.nickname,
                            picture: user.picture,
                        })
                    }
                }
                else if(isAuthenticated && data.status === "404"){
                    setNickname(user.name);
                    setPicture(user.picture);
                    setShowLocation(JSON.parse('false'));
                    setCountry("")
                    setLat(0);
                    setLng(0);
                    setCurrentCoords([0,0]);
                    setTimezone("")
                    CreateUserFunction({
                        nickname: user.nickname,
                        picture: user.picture});
                }
                else{
                    console.log("No authentication to create user from");
                }
                setRecentChange(Date.now());
                console.log("FINAL COORDS: ", data.lat, data.lng)
            }
        ));
    };
    const CreateUserFunction = (userData) => {
        if(DEV_MODE) {
            console.log("Creating User");
            console.log("User data:", userData);
        }
        CreateUser(getAccessTokenSilently,userData, (data => {
            if(data != null){
                setFriendCode(data.currentFriendCode);
                setUserLoaded(true);
            }
        }))
    }
    const UpdateUserFunction = (userData) => {
        if(DEV_MODE) {
            console.log("Updating User discord props");
            console.log("User data:", userData);
        }
        UpdateUser(getAccessTokenSilently,userData, (data => {
            if(data != null){
                setUserLoaded(true);
            }
        }))
    }
    useMemo(()=>{
        if(isAuthenticated){
            GetUserFunction();
        }
        GetFriendsFunction();
    },[])

    return (
        <>

        </>
    )
}
export default Auth;