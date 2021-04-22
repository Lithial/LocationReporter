
import {API_BASE_URL, API_FRIENDS_ENDPOINT, API_LOCATION_ENDPOINT, API_USERS_ENDPOINT} from "../config/Config";

export async function GetUser (getAccessTokenSilently, callback) {
    try {
        console.log("Retrieving user Data");
        const token = await getAccessTokenSilently();
        console.log("ApiEndpoint",`${API_BASE_URL}/${API_USERS_ENDPOINT}`)
        const response = fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}`,
            {
                 headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res => res.json())
            .then(data =>{
                callback(data)
            })
    } catch (error) {
        console.log(error)
    }
}

export async function GetFriends (getAccessTokenSilently, callback) {
    try {
        console.log("Retrieving user Data");
        const token = await getAccessTokenSilently();
        console.log("ApiEndpoint",`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
        const response = fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                callback(data)
            })
    } catch (error) {
        console.log(error)
    }
}

