import {API_BASE_URL, API_FRIENDS_ENDPOINT, API_USERS_ENDPOINT, DEV_MODE} from "../config/Config";

export async function CreateUser(getAccessTokenSilently,userData, callback ) {
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:3002/user`, {
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
        console.log(error)
    }
}

export async function GetUser(getAccessTokenSilently, callback) {
    try {
        if(DEV_MODE) {
            console.log("Retrieving user Data");
            console.log("ApiEndpoint", `${API_BASE_URL}/${API_USERS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        const response = fetch(`${API_BASE_URL}/${API_USERS_ENDPOINT}`,
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
        console.log(error)
    }
}

export async function GetFriends(getAccessTokenSilently, callback) {
    try {
        if(DEV_MODE) {
            console.log("Retrieving user Data");
            console.log("ApiEndpoint", `${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        const response = fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`,
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
        console.log(error)
    }
}

