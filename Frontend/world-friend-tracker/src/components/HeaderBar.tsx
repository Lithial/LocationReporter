import classes from "*.module.css";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { blue, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor:grey[800],
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: grey[800],
      color: grey[600],
    },
  }),
);

export default function(){
    const classes = useStyles();
    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                Atlas
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

