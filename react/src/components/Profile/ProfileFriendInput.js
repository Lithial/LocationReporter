import React, {useState} from 'react';
import {Input} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useAuth0} from "@auth0/auth0-react";
import {CreateFriendRequest} from "../../api/FriendCalls";
import {useUser} from "../../contexts/UserContext";
import {useErrors} from "../../contexts/ErrorContext";

const ProfileFriendInput = () => {
    const {getAccessTokenSilently} = useAuth0();
    const [codeValue, setCodeValue] = useState("");
    const [userData, dispatch] = useUser();
    const [errorMessage, setErrorMessage] = useErrors();

    const handleSubmit = (e) => {
        e.preventDefault();

        CreateFriendRequest(getAccessTokenSilently,codeValue)
            .then(data => {
                console.log("Creating new friend: ", data);
                if(data.status === 400){
                    setErrorMessage(data?.msg)

                    return;
                }
                dispatch({
                    type: "UNLOAD_FRIENDS",
                })
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