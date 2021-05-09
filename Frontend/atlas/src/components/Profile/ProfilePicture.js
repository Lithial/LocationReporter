import React from 'react';
import {useUser} from "../../contexts/UserContext";
import {Avatar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    avatar: {
        width: "100px",
        height: "100px",
        margin: "auto",
        marginTop: "2rem",
    },
}));

const ProfilePicture = () => {
    const classes = useStyles();
    const [userData, dispatch] = useUser();
    return (
            <Avatar className={classes.avatar} src={userData.user.picture} alt="Profile Picture"/>
    );

}

export default ProfilePicture;