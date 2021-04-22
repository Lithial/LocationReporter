import React, {useState} from 'react';
import {Input} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useAuth0} from "@auth0/auth0-react";
import PostFriendRequest from "../../api/FriendCalls";

const ProfileFriendInput = () => {
    const {getAccessTokenSilently} = useAuth0();
    const [codeValue, setCodeValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`submitting ${codeValue}`);
        PostFriendRequest(getAccessTokenSilently,codeValue,function (data) {
            console.log(data)
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