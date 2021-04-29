import {API_BASE_URL, API_FRIENDS_ENDPOINT, API_USERS_ENDPOINT, API_LOCATION_ENDPOINT, DEV_MODE} from "../config/Config";

//todo there are endpoints in here that need to be configurated
export async function UpdateFriendCode(getAccessTokenSilently,callback){
    try {
        const token = await getAccessTokenSilently();
        await fetch(`${API_BASE_URL}/code`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors', // no-cors, *cors, same-origin
        })
            .then(res => res.json())
            .then(data => {
                callback(data);
            })

    } catch (error) {
        console.log("Update Friend Code Error: ", error)
    }
}
export async function DeleteUser(getAccessTokenSilently, callback){
    try {
        if(DEV_MODE){
            console.log("Deleting User")
            console.log(`${API_BASE_URL}/${API_USERS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        await fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            mode: 'cors', // no-cors, *cors, same-origin
        })
            .then(res => res.json())
            .then(data =>{
                callback(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }catch(error){
        console.log("Delete User Error: ", error)
    }
}
export async function DeleteFriend(getAccessTokenSilently,friendId, callback){
    try {
        if(DEV_MODE){
            console.log("Deleting User")
            console.log(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
            console.log("Deleting this Id from Friends List: ", friendId)
        }
        const token = await getAccessTokenSilently();
        await fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                friendId:friendId
            }),
            mode: 'cors', // no-cors, *cors, same-origin
        })
            .then(res => res.json())
            .then(data =>{
                console.log("Delete Response:", data);
                callback(data);
            })
            .catch((error) => {
                console.log("Delete Friend Error: ", error)
            });
    }catch(error){
        console.log(error);
    }
}
export async function UpdateLocation(getAccessTokenSilently, locationData, callback){
    try{
        const token = await getAccessTokenSilently();
        if(DEV_MODE){
            console.log("Location Data:", locationData)
        }
        await fetch(`${API_BASE_URL}/${API_LOCATION_ENDPOINT}`,{
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
            .then(res => res.json())
            .then(data =>{
                callback(data);
            })
            .catch((error) => {
                console.log("Update Location Error: ", error)
            });
    }
    catch (error){
        console.log(error)
    }
}
export async function UpdateShowLocation(getAccessTokenSilently, showLocation, callback){
    try{
        const token = await getAccessTokenSilently();
        if(DEV_MODE){
            console.log("Set Show Location:", showLocation)
        }
        await fetch(`${API_BASE_URL}/${API_LOCATION_ENDPOINT}/show`,{
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
            .then(res => res.json())
            .then(data =>{
                callback(data)
            })
            .catch((error) => {
                console.log("Update Show Location Error: ", error)
            });
    }
    catch (error){
        console.log(error)
    }
}
export async function CreateUser(getAccessTokenSilently,userData, callback ) {
    try {
        const token = await getAccessTokenSilently();
        await fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(userData)
        }).then(res => res.json())
            .then(data => {
                if(DEV_MODE) {
                    console.log("Create response data:", data)
                }
                callback(data)
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.log("Create User Error: ", error)
    }
}

export async function GetUser(getAccessTokenSilently, callback) {
    try {
        if(DEV_MODE) {
            console.log("Retrieving user Data");
            console.log("ApiEndpoint", `${API_BASE_URL}/${API_USERS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            callback(data)
        })
        .catch((error) => {
            console.error(error);
        });
    } catch (error) {
        console.log("Get User Error: ", error)
    }
}

export async function GetFriends(getAccessTokenSilently, callback) {
    try {
        if(DEV_MODE) {
            console.log("Retrieving user Data");
            console.log("ApiEndpoint", `${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`,
            {
                'headers': {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                callback(data)
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.log("Get Friends Error: ", error)
    }
}
export async function UpdateUser(getAccessTokenSilently,userData, callback ) {
    try {
        const token = await getAccessTokenSilently();
        await fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}/discord`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors', // no-cors, *cors, same-origin
            body: JSON.stringify(userData)
        }).then(res => res.json())
            .then(data => {
                if(DEV_MODE) {
                    console.log("Update response data:", data)
                }
                callback(data)
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.log("Update User Error: ", error)
    }
}
