import React, {useEffect, useState} from 'react';
import {useUser} from "../../contexts/UserContext";
import ProfileTextElement from "./ProfileTextElement";
import {DEV_MODE} from "../../config/Config";
import Button from "@material-ui/core/Button";
import {useAuth0} from "@auth0/auth0-react";
import {DeleteFriend} from "../../api/FriendCalls";

const ProfileFriendCard = () => {
    const [userData, dispatch] = useUser();
    const {getAccessTokenSilently} = useAuth0();
    const [updateList, setUpdateList] = useState(Date.now());

    const deleteFriendFromDatabase = async (friendId) =>{
        try {
            if(DEV_MODE){
                console.log("Friend To Delete: ", friendId);
            }
            dispatch({
                type: "UNLOAD_FRIENDS"
            })
            await DeleteFriend(getAccessTokenSilently, friendId)
                .then(data => {
                    console.log("Friend Deleted: ")
                    dispatch({
                        type: "REMOVE_FRIEND",
                        payload: friendId
                    })
                })
        }
        catch (error) {
            console.log(error)
        }

    }

    if(userData?.friends){
        if(DEV_MODE){
            console.log("Look i have friends");
        }
        //todo make pretty grid item
        return (
            userData.friends.map(friend => {
                return (
                    <div key={friend.nickname}>
                        <ProfileTextElement text={"Name:"} value={friend.nickname}/>
                        <ProfileTextElement text={"Country:"} value={friend.country}/>
                        <ProfileTextElement text={"Timezone:"} value={friend.country}/>
                        <Button onClick={() => deleteFriendFromDatabase(friend.userid)}>Remove Friend</Button>
                    </div>
                )
            })
        );
    }
    return (
        <>
        </>
        )

};

export default ProfileFriendCard;
