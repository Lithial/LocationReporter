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
                    if(data.status === "400"){
                        dispatch({
                            type: "FRIENDS_LOADED"
                        })
                    }
                    if(data.status === "200"){
                        console.log("Friend Deleted: ")
                        dispatch({
                            type: "REMOVE_FRIEND",
                            payload: friendId
                        })
                    }

                })
                .catch(() => {
                    console.error("Error Loading Friends")
                })


        }
        catch (error) {
            console.log(error)
        }

    }
    if(!userData?.friends){
        return (
            <div>

            </div>
        )
    }

    //todo make pretty grid item
    return (
        userData.friends.map((friend, index) => {
            return (
                <div key={index}>
                    <ProfileTextElement text={"Name:"} value={friend.nickname}/>
                    <ProfileTextElement text={"Country:"} value={friend.country}/>
                    <ProfileTextElement text={"Timezone:"} value={friend.timezone}/>
                    <Button onClick={() => deleteFriendFromDatabase(friend.userid)}>Remove Friend</Button>
                    {index !== userData.friends.length -1 ? <hr/> : null}
                </div>
            )
        })
    );
};

export default ProfileFriendCard;
