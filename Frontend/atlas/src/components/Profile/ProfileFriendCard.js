import React, {useEffect, useState} from 'react';
import {useUser} from "../../contexts/UserContext";
import ProfileTextElement from "./ProfileTextElement";
import {DEV_MODE} from "../../config/Config";
import Button from "@material-ui/core/Button";
import {useAuth0} from "@auth0/auth0-react";
import {DeleteFriend} from "../../api/UserCalls";

const ProfileFriendCard = () => {
    const {friends} = useUser();
    const {getAccessTokenSilently} = useAuth0();
    const [updateList, setUpdateList] = useState(Date.now());

    const deleteFriend = async (friendId) =>{
        if(DEV_MODE){
            console.log("Friend To Delete: ", friendId);
        }
        try {
            await DeleteFriend(getAccessTokenSilently, friendId, function(){
                console.log("Friend Deleted")
                setUpdateList(Date.now());
            })

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{

    },[updateList]);

    if(friends.length !== 0){
        if(DEV_MODE){
            console.log("Look i have friends");
        }
        //todo make pretty grid item
        return (
            friends.map(friend => {
                return (
                    <div key={friend.nickname}>
                        <ProfileTextElement text={"Name:"} value={friend.nickname}/>
                        <ProfileTextElement text={"Country:"} value={friend.country}/>
                        <ProfileTextElement text={"Timezone:"} value={friend.country}/>
                        <Button onClick={() => deleteFriend(friend.userid)}>Remove Friend</Button>
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