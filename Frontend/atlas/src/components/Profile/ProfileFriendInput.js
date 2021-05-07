import React, {useState} from 'react';
import {Input} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useAuth0} from "@auth0/auth0-react";
import {CreateFriendRequest} from "../../api/FriendCalls";
import {useUser} from "../../contexts/UserContext";

const ProfileFriendInput = () => {
    const {getAccessTokenSilently} = useAuth0();
    const [codeValue, setCodeValue] = useState("");
    const [userData, dispatch] = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: "UNLOAD_FRIENDS",
        })
        CreateFriendRequest(getAccessTokenSilently,codeValue)
            .then(data => {
                console.log("Creating new friend: ", data);
                dispatch({
                    type: "CREATE_NEW_FRIENDS",
                    payload: data,
                })
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Input placeholder="Insert Friend Code" value={codeValue} inputProps={{ 'aria-label': 'description' }} onChange={e => setCodeValue(e.target.value)} />
            <Button type={"submit"}>Add Friend</Button>
            </form>
        </div>
    );
};

export default ProfileFriendInput;