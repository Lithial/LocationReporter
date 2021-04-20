import React, {useEffect} from 'react';
import {useErrors} from "../contexts/ErrorContext";

const TimezoneFinder = () => {
    const [errorMessage, setErrorMessage] = useErrors();


  /*  useEffect(()=>{
      /!*  console.log("Fetching timezone");
        console.log("address:", addressData)
        if(addressData) {
            let d = new Date().toLocaleString("en-US", {timeZone: addressData.timeZone})
            console.log("time:", d)
        }*!/
        console.log("rebuilding address data")
    },[addressData])*/
    return (
        <div>

        </div>
    );
};

export default TimezoneFinder;