import React, {useContext, useState} from 'react';
import {Location} from "../models/LocationModel";

const AddressContext = React.createContext();

export function useAddress(){
    return useContext(AddressContext);
}
export const AddressProvider = ({children}) => {
        const [addressData,setAddressData] = useState(new Location(" "," "," "," "," "));

    return (
        <AddressContext.Provider value={[addressData,setAddressData]}>
            {children}
        </AddressContext.Provider>
    )
};

export default AddressProvider;
