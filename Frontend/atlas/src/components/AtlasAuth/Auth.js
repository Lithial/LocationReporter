import {useAuth0} from "@auth0/auth0-react";
import {useUser} from "../../contexts/UserContext";
import {GetUser, GetFriends} from "../../api/UserCalls";
import {useMemo} from "react";

function Auth(){
    const { user } = useAuth0();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const {
        userLoaded,
        setNickname,
        setPicture,
        setShowLocation,
        setFriendCode,
        setCountry,
        setLat,
        setLng,
        setCurrentCoords,
        setTimezone,
        setUserLoaded,
        setRecentChange,
        setFriends,
} = useUser();

    const GetFriendsFunction = () => {
        console.log("Getting friends list");
        GetFriends(getAccessTokenSilently, (data => {
            if(data != null){
                console.log("Friend Data:", data);
            }
        }))
    }

    const GetUserFunction = () => {
        console.log("Getting user info!");
        GetUser(getAccessTokenSilently,(data =>
            {
                if(data!==null && isAuthenticated && !userLoaded){
                    console.log("data:", data)
                    setNickname(user.name);
                    setPicture(user.picture);
                    console.log("Auth User Show Location:", data.showlocation)
                    setShowLocation(JSON.parse(data.showlocation));
                    setFriendCode(data.currentfriendcode);
                    setCountry(data.country);
                    setLat(data.lat);
                    setLng(data.lng);
                    setTimezone(data.timezone);
                    setCurrentCoords([data.lat,data.lng]);
                    setUserLoaded(true);
                }
                else if(isAuthenticated){
                    setNickname(user.name);
                    setPicture(user.picture);
                    setShowLocation(user.showLocation);
                }
                else{
                    console.log("No authentication to create user from");
                }
                setRecentChange(Date.now());
            }
        ));
    };

    useMemo(()=>{
        GetUserFunction();
        GetFriendsFunction();
    },[])

    return (
        <div>

        </div>
    )
}
export default Auth;