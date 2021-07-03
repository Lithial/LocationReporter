import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Avatar, Button, Menu, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ExitToApp as ExitToAppIcon, Person as PersonIcon, Public as PublicIcon} from "@material-ui/icons";
import {Link} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        color: "white"
    },
    links: {
        textDecoration: "none",
        color: "#000000DE"
    }
}));

export const LoginButton = () => {
    const styles = useStyles();
    const { loginWithRedirect } = useAuth0();
    return (
        <Button
            className={styles.root}
            onClick={() => loginWithRedirect()} >
        Log in
        </Button>
    );
};

export function UserMenu() {
    const [anchor, setAnchor] = React.useState(null);
    const { logout, user } = useAuth0();
    const styles = useStyles();

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    }

    const handleClose = () => {
        setAnchor(null);
    }

    return (
        <div>
            <Button aria-controls={"user-menu"} aria-haspopup={"true"} onClick={handleClick}>
                <Avatar alt={user.name} src={user.picture} />
            </Button>
            <Menu
                id={"user-menu"}
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={handleClose}
            >
                <Link className={styles.links} to="/">
                    <MenuItem onClick={handleClose}>
                        <PublicIcon/>Map
                    </MenuItem>
                </Link>
                <Link className={styles.links} to="/profile">
                    <MenuItem onClick={handleClose}>
                        <PersonIcon/> Profile
                    </MenuItem>
                </Link>
                <MenuItem onClick={() => {
                    logout({returnTo: window.location.origin})
                    handleClose()
                }}>
                    <ExitToAppIcon/> Logout
                </MenuItem>
            </Menu>
        </div>
    );
}