import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {useUser} from "../../contexts/UserContext";


const useStyles = makeStyles(theme => ({
    profileText: {
        margin: "0.5rem",
        display: "flex",
        flexDirection: "row",
    },
    spacing:{
        marginRight: "1rem",
    },
    leftText: {
        textAlign: "right",
        flexGrow: 1,
    },
    iconSizing: {
        width: "10px",
        height: "10px",
        paddingLeft: "2rem",
    }

}));
const ProfileTextElement = (props) => {
    const classes = useStyles();
    const [userData, dispatch] = useUser();

    const copyFriendCodeToClipboard = () =>{
        navigator.clipboard.writeText(userData.user.friendCode).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
    return (
        <div className={classes.profileText}>
            <Typography className={classes.spacing} variant={"body1"}>{props.text}</Typography>
            <Typography className={classes.leftText} variant={"body1"}>{props.value}</Typography>
            <IconButton className={classes.iconSizing} onClick={copyFriendCodeToClipboard}> <FileCopyIcon/></IconButton>

        </div>);
};

export default ProfileTextElement;