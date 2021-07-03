import {API_BASE_URL, API_USERS_ENDPOINT, API_LOCATION_ENDPOINT, DEV_MODE} from "../config/Config";

/*******************************************************************/
/*User functions*/
/*******************************************************************/
//CREATE USER
export async function CreateUser(getAccessTokenSilently,userData ) {
    try {
        const token = await getAccessTokenSilently();
        let res = await fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(userData)
        })
        return res.json();
    } catch (error) {
        console.log("Create User Error: ", error)
    }
}
//READ USER
export async function GetUser(getAccessTokenSilently) {
    try {
        if(DEV_MODE) {
            console.log("Retrieving user Data");
            console.log("ApiEndpoint", `${API_BASE_URL}/${API_USERS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        let res = await fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return res.json();
    } catch (error) {
        console.log("Get User Error: ", error)
    }
}

//UPDATE USER
export async function UpdateUser(getAccessTokenSilently,userData) {
    try {
        const token = await getAccessTokenSilently();
        let res = await fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}/discord`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(userData)
        })
            return res.json();

    } catch (error) {
        console.log("Update User Error: ", error)
    }
}

//DELETE USER
export async function DeleteUser(getAccessTokenSilently){
    try {
        if(DEV_MODE){
            console.log("Deleting User")
            console.log(`${API_BASE_URL}/${API_USERS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        let res = await fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            mode: 'cors', // no-cors, *cors, same-origin
        })
        return res.json()
    }catch(error){
        console.log("Delete User Error: ", error)
    }
}
/*******************************************************************/
/*Location functions*/
/*******************************************************************/
//UPDATE LOCATION
export async function UpdateLocation(getAccessTokenSilently, locationData){
    try{
        const token = await getAccessTokenSilently();
        if(DEV_MODE){
            console.log("Location Data:", locationData)
        }
        let res = await fetch(`${API_BASE_URL}/${API_LOCATION_ENDPOINT}`,{
            method:"PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify({
                country: locationData.country,
                lat: locationData.lat,
                lng:locationData.lng,
                timezone:locationData.timezone,
                showLocation:locationData.showLocation,
            })
        })
        return res.json();
    }
    catch (error){
        console.log(error)
    }
}

//UPDATE SHOW LOCATION
export async function UpdateShowLocation(getAccessTokenSilently, showLocation){
    try{
        const token = await getAccessTokenSilently();
        if(DEV_MODE){
            console.log("Set Show Location:", showLocation)
        }
        let res = await fetch(`${API_BASE_URL}/${API_LOCATION_ENDPOINT}/show`,{
            method:"PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify({
                showLocation:showLocation,
            })
        })
        return res.json();
    }
    catch (error){
        console.log(error)
    }
}




