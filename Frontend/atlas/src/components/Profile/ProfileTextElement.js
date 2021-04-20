import React from 'react';
import {Typography} from "@material-ui/core";

const ProfileTextElement = (props) => {

    return (
        <Typography variant={"body1"}>
            {
                props.text + props.value
            }
        </Typography>
    );
};

export default ProfileTextElement;