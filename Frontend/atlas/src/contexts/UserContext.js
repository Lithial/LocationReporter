import React, {useReducer, useContext, useState} from 'react';

const UserContext = React.createContext("");

export function useUser(){
    return useContext(UserContext);
}

const initialState = {
    user: {
        nickname: "",
        picture: "",
        showLocation: false,
        country: "",
        lat: "",
        lng: "",
        currentCoords: [0, 0],
        timezone: "",
        friendCode: "",
    },
    friends: [],
    userLoaded: false,
    friendsLoaded: false,
    locationLoaded: false,
    error: null,
}
const userReducer = (state, action) => {
    switch (action.type){

        case "UPDATE_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
                userLoaded: true,
            };
        case "CREATE_FRIENDS":
            return {
                ...state,
                friends: [...action.payload],
                friendsLoaded: true,
            };
        case "USER_LOADED":
            return {
                ...state,
                userLoaded: true
            };
        case "UNLOAD_USER":
            return {
                ...state,
                userLoaded: false
            };

        case "FRIENDS_LOADED":
            return {
                ...state,
                friendsLoaded: true
            };
        case "UNLOAD_FRIENDS":
            return {
                ...state,
                friendsLoaded: false
            };
        case "LOCATION_LOADED":
            return {
                ...state,
                locationLoaded: true
            };
        case "UNLOAD_LOCATION":
            return {
                ...state,
                locationLoaded: false
            };

        case "CREATE_NEW_FRIENDS":
            return {
                ...state,
                friends: [...state.friends, action.payload],
                friendsLoaded: true
            };
        case "REMOVE_FRIEND":
            return {
                ...state,
                friends: state.friends?.filter(friend => friend.userid !== action.payload),
                friendsLoaded: true
            };

        case "SET_FRIEND_CODE":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
                userLoaded: true
            };

        case "FLIP_SHOW_LOCATION":
            return {
                ...state,
                user: {
                    ...state.user,
                    showLocation: !state.user.showLocation
                },
                userLoaded: true
            };

        default:
            console.log("This action type doesnt exist: ", action)
    }
}
export const UserProvider = props => {
    const init = initialState => initialState;
    const [userData, dispatch] = useReducer(userReducer, initialState, init);

    return (
        <UserContext.Provider value={[userData, dispatch]}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserProvider;
