
import {API_BASE_URL, API_FRIENDS_ENDPOINT, DEV_MODE} from "../config/Config";

async function PostFriendRequest (getAccessTokenSilently,friendCode, callback) {
    try {
        if(DEV_MODE) {
            console.log("Retrieving user Data");
            console.log("ApiEndpoint",`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
        }
        const token = await getAccessTokenSilently();
        fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`,
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
            .then(res => res.json())
            .then(data =>{
                callback(data)
            })
    } catch (error) {
        console.log("Post Friend Error: ", error)
    }

}

export default PostFriendRequest;

