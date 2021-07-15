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
                dispatch({
                    type: "UNLOAD_FRIENDS",
                })
                if(data.status === 400){
                    setErrorMessage(data?.msg)
                    dispatch({
                        type: "FRIENDS_LOADED",
                    })
                    return;
                }
                if(data.status === 200){
                    let filterCheck = userData.friends.filter(friend => friend.userid === data.data.userid).length;
                    if(filterCheck !== 0)
                    {
                        setErrorMessage("Friend already exists");
                        dispatch({
                            type: "FRIENDS_LOADED",
                        })
                        return
                    }
                    dispatch({
                        type: "CREATE_NEW_FRIENDS",
                        payload: data.data,
                    })
                }
            })
        setCodeValue("");
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