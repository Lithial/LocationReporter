import React, {useContext, useEffect, useState} from 'react';
import UserModel from "../models/UserModel";
import {LocationModel} from "../models/LocationModel"
const UserContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}
export const UserProvider = ({children}) => {
    const [user,setUser] = useState(
        localStorage.getItem("user") ||
        new UserModel("","",new LocationModel("","","","",""),"", '')
    );
    const [userLoaded, setUserLoaded] = useState(true);

    return (
        <UserContext.Provider value={[user,setUser,userLoaded,setUserLoaded]}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;
