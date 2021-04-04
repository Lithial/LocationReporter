import React, {useState} from "react"
import { render } from "react-dom"
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HeaderBar from "../components/HeaderBar";
import { Avatar, Button, Paper } from "@material-ui/core";


export default function Login(){

    return(
        <Container>
            <HeaderBar />
            <Paper variant="outlined">
                <img src="https://media.discordapp.net/attachments/563680566634086400/828195905701281802/110243264-stock-vector-africa-on-planet-earth-view-from-space-with-continents-outlines-abstract-back.png" />
            </Paper>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Button>
                Discord
            </Button>
        </Container>
    )
}