import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useUser} from "../contexts/UserContext";
import {Box, Grid, LinearProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ProfilePicture from "../components/Profile/ProfilePicture";
import ProfileTextElement from "../components/Profile/ProfileTextElement";
import ProfileFriendInput from "../components/Profile/ProfileFriendInput";
import {UpdateFriendCode} from "../api/FriendCalls";
import {DeleteUser, UpdateLocation, UpdateShowLocation} from "../api/UserCalls";
import ProfileFriendCard from "../components/Profile/ProfileFriendCard";
import {useErrors} from "../contexts/ErrorContext";
import LocationFinder from "../components/LocationFinder/LocationFinder";
import ProfileLocationCards from "../components/Profile/ProfileLocationCards";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ProfileTextElementWithCopy from "../components/Profile/ProfileTextElementWithCopy";

const useStyles = makeStyles(theme => ({
    root: {
        /*margin: "5% 20%"*/
        margin: 0,
        display: "flex",
        flexWrap: "wrap"
    },
    left: {
        flexGrow: 1,
        flexBasis: "300px",
        marginLeft: "auto",
        padding: "2rem",

    },
    right:{
        flexGrow: 1,
        marginRight: "2rem",
        marginTop: "2rem",
        padding: "2rem",
        height: "100vh",
        border: "1px solid black",
        borderRadius: "10px",
    },
    columns: {
      display: "flex",
      flexWrap: "wrap",
    },
    column: {
        flexGrow: 1,
        flexBasis: "calc(calc(600px - 100%) * 999)",
        margin: "2rem",
        padding: "2rem",
        border: "1px solid black",
        borderRadius: "10px",
        height: "90%",
    },
    user:{
   /*     border: "1px solid black",
        borderRadius: "10px",*/
    },
     friends:{
     }

}));
const Profile = () => {
    const classes = useStyles();
    const [userData, dispatch] = useUser();
    const {getAccessTokenSilently, logout} = useAuth0();
    const [errorMessage, setErrorMessage] = useErrors();

    const deleteUser = async () => {
        await DeleteUser(getAccessTokenSilently)
            .then(() => logout({returnTo: window.location.origin}))

    }

    const getNewFriendCode = async () => {
        try {
            dispatch({
                type: "UNLOAD_USER",
            });
            await UpdateFriendCode(getAccessTokenSilently)
                .then(data => {
                    dispatch({
                        type: "SET_FRIEND_CODE",
                        payload: data.friendCode,
                    })
                });

        } catch (error) {
            console.log(error)
        }
    }

    const flipShowLocation = async () => {
        dispatch({
            type: "UNLOAD_USER",
        })
        dispatch({
            type: "FLIP_SHOW_LOCATION",
        })
    }
    const toggleShowLocation = async () => {
        try {
            await flipShowLocation()
                .then(() =>{
                    if(userData.user.showLocation){
                        dispatch({
                            type: "UNLOAD_LOCATION",
                        })
                    }
                    else if(!userData.user.showLocation){
                        dispatch({
                            type: "LOCATION_LOADED",
                        })
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }
    if (!userData?.userLoaded) {
        return (
            <div>
                <LinearProgress/>
            </div>
        )
    }


    return (
        <Box className={classes.columns}>
            <div className={classes.column}>
                <div className={classes.user}>
                        <ProfilePicture/>
                        <ProfileTextElement value={userData.user.nickname} text={"Nickname: "}/>
                        <ProfileTextElementWithCopy value={userData.user.friendCode} text={"Current Friend Code: "}/>
                        <ProfileLocationCards/>
                        <ProfileTextElement value={userData.user.showLocation ? "True" : " False"} text={"Allow Fetch Location: "}/>
                </div>
                <Button onClick={toggleShowLocation}>{"Show Location"}</Button>
                <Button onClick={deleteUser}>{"Delete Account"}</Button>
                <Button onClick={getNewFriendCode}>{"New Code"}</Button>
                <ProfileFriendInput/>
            </div>
            <div className={classes.column}>
                {userData.friendsLoaded ? <ProfileFriendCard/> : <LinearProgress/>}
                <LocationFinder getAccessTokenSilently={getAccessTokenSilently} userData={userData} dispatch={dispatch} setErrorMessage={setErrorMessage}/>
            </div>
        </Box>
    );
};

export default Profile;