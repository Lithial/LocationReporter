import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


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
    }
}));
const ProfileTextElement = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.profileText}>
            <Typography className={classes.spacing} variant={"body1"}>{props.text}</Typography>
            <Typography className={classes.leftText} variant={"body1"}>{props.value}</Typography>
        </div>);
};

export default ProfileTextElement;