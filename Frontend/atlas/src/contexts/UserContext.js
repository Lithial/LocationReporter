import React, {useContext, useEffect, useState} from 'react';
import UserModel from "../models/UserModel";
import {Location} from "../models/LocationModel"
const UserContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}
export const UserProvider = ({children}) => {
    const [user,setUser] = useState(
        localStorage.getItem("user") ||
        new UserModel("","",new Location("","","","",""),"", '')
    );
    console.log("user:", user);

    useEffect(() =>{
        localStorage.setItem('user', user);
    },[user]);

    return (
        <UserContext.Provider value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;
