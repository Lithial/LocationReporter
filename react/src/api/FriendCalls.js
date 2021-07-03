
import {API_BASE_URL, API_FRIENDS_ENDPOINT, DEV_MODE} from "../config/Config";

/*******************************************************************/
/*FRIEND functions*/
/*******************************************************************/
//CREATE FRIEND
export async function CreateFriendRequest (getAccessTokenSilently, friendCode) {
    try {
        if(DEV_MODE) {
            console.log("Retrieving user Data");
            console.log("ApiEndpoint",`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        let res = await fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors', // no-cors, *cors, same-origin
                body: JSON.stringify({
                    friendCode:friendCode
                })
            }
        )
            return res.json()
    } catch (error) {
        console.log("Post Friend Error: ", error)
    }
}

//GET ALL FRIENDS
export async function GetFriends(getAccessTokenSilently) {
    try {
        if(DEV_MODE) {
            console.log("ApiEndpoint", `${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        let res = await fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`,
            {
                'headers': {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
        return res.json();
    } catch (error) {
        console.log("Get Friends Error: ", error)
    }
}

//UPDATE FRIEND CODE
export async function UpdateFriendCode(getAccessTokenSilently){
    try {
        const token = await getAccessTokenSilently();
        let res = await fetch(`${API_BASE_URL}/code`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors', // no-cors, *cors, same-origin
        })
        return res.json()
    } catch (error) {
        console.log("Update Friend Code Error: ", error)
    }
}

//DELETE FRIEND
export async function DeleteFriend(getAccessTokenSilently,friendId){
    try {
        if(DEV_MODE){
            console.log("Deleting User")
            console.log(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
            console.log("Deleting this Id from Friends List: ", friendId)
        }
        const token = await getAccessTokenSilently();
        let res = await fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`, {
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
        return res.json();
    }catch(error){
        console.log(error);
    }
}

