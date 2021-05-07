import {useAuth0} from "@auth0/auth0-react";
import {useUser} from "../../contexts/UserContext";
import {GetUser, CreateUser, UpdateUser} from "../../api/UserCalls";
import {useMemo} from "react";
import {DEV_MODE} from "../../config/Config";
import React from "react";
import {GetFriends} from "../../api/FriendCalls";

function Auth() {
    const {user} = useAuth0();
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [userData, dispatch] = useUser();

    const GetFriendsFunction = async () => {
        if(DEV_MODE){
            console.log("Getting friends list");
        }
        await GetFriends(getAccessTokenSilently)
            .then(data => {
                if(data) {
                    if (DEV_MODE) {
                        console.log("Friend Data:", data);
                    }
                    dispatch({
                        type: "CREATE_FRIENDS",
                        payload: data,
                    })
                }
            });
    }

    const GetUserFunction = async () => {
        if (DEV_MODE) {
            console.log("Getting user info!");
        }
        await GetUser(getAccessTokenSilently)
            .then(data => {
                return data
            })
            .then(data => {
                if (DEV_MODE) {
                    console.log("Initial User Data:", data);
                    console.log("Status", data.status);
                    console.log("Is Authenticated:", isAuthenticated);
                }
                if (data.status !== "404" && isAuthenticated) {
                    if (DEV_MODE) {
                        console.log("data:", data)
                        console.log("Auth User Show Location:", data.showlocation)
                    }
                    dispatch(
                        {
                            type: "UPDATE_USER",
                            payload: {
                                nickname: user.name,
                                picture: user.picture,
                                showLocation: JSON.parse(data.showlocation),
                                friendCode: data.currentfriendcode,
                                country: data.country !== "undefined" ? data.country : "",
                                lat: data.lat !== "undefined" ? data.lat : "",
                                lng: data.lng !== "undefined" ? data.lng : "",
                                currentCoords: (data.lat !== "undefined" && data.lng !== "undefined") ? [data.lat, data.lng] : "",
                                timezone: data.timezone !== "undefined" ? data.timezone : "",
                            }
                        });
                    if (data.nickname !== user.nickname || data.picture !== user.picture) {
                        if (DEV_MODE) {
                            console.log("Updating info from discord")
                        }
                        UpdateUserFunction({
                            nickname: user.nickname,
                            picture: user.picture,
                        })
                    }
                    if (isAuthenticated && data.status === "404") {
                        if (DEV_MODE) {
                            console.log("Creating user from nothing")
                        }
                        let data = {
                            nickname: user.name,
                            picture: user.picture,
                        }
                        CreateUserFunction(data);
                    }
                    dispatch({
                        type: "USER_LOADED",
                    });
                } else {
                    console.log("No authentication to create user from");
                    if (isAuthenticated && data.status === "404") {
                        if (DEV_MODE) {
                            console.log("Creating user from nothing")
                        }
                        let data = {
                            nickname: user.name,
                            picture: user.picture,
                        }
                        CreateUserFunction(data);
                    }

                }
                dispatch({
                    type: "USER_LOADED",
                });
            })
    }
    const CreateUserFunction = (userData) => {
        if (DEV_MODE) {
            console.log("Creating User");
            console.log("User data:", userData);
        }
        CreateUser(getAccessTokenSilently, userData)
            .then(data => {
                if (data != null) {
                    console.log("Returned new data: ", data)
                    dispatch({
                        type: "UPDATE_USER",
                        payload: {
                            nickname: data.nickname,
                            picture: data.picture,
                            friendCode: data.currentFriendCode
                        }
                    });
                }
            })
    }
    const UpdateUserFunction = (userData) => {
        if (DEV_MODE) {
            console.log("Updating User discord props");
            console.log("User data:", userData);
        }
        UpdateUser(getAccessTokenSilently, userData, (data => {
            if (data != null) {
                console.log("Updating user information")
            }
        })).then(r => console.log("User updated probably"))
    }
    useMemo(async () => {
        if (isAuthenticated) {
            await GetUserFunction()
                .then(async () => await GetFriendsFunction());
        }


    }, [])

    return (
        <>

        </>
    )
}

export default Auth;