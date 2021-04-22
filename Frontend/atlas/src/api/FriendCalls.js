
import {API_BASE_URL, API_FRIENDS_ENDPOINT} from "../config/Config";

async function PostFriendRequest (getAccessTokenSilently,friendCode, callback) {
    try {
        console.log("Retrieving user Data");
        const token = await getAccessTokenSilently();
        console.log("ApiEndpoint",`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`)
        const response = fetch(`${API_BASE_URL}/${API_FRIENDS_ENDPOINT}`,
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
        console.log(error)
    }

}

export default PostFriendRequest;

