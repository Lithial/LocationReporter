import {useAuth0} from "@auth0/auth0-react";
import {useUser} from "../../contexts/UserContext";
import GetUser from "../../api/UserCalls";
import {LocationModel} from "../../models/LocationModel";
import UserModel from "../../models/UserModel";
import {useEffect} from "react";
import {useCurrentLocation} from "../../contexts/LocationContext";
import {useShowLocation} from "../../contexts/ShowLocationContext";
import {useAddress} from "../../contexts/AddressContext";

function Auth(){
    const { user } = useAuth0();
    const { name } = user || {}
    const { picture } = user || {};
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userModel, setUserModel, isUserLoading, setUserLoading] = useUser();
    const [currentLocation, setCurrentLocation] = useCurrentLocation();
    const [showLocation, toggleShowLocation] = useShowLocation();
    const [addressData, setAddressData] = useAddress();

    const GetUserFunction = () => {
        GetUser(getAccessTokenSilently,(data =>
            {
                let locationData = new LocationModel('','','','');
                let userData = new UserModel('','','', showLocation,'')
                if(data!==null && isAuthenticated){
                    console.log("data:", data)
                    userData.nickname = user.name || "";
                    userData.picture = user.picture || "";
                    userData.showLocation = data.showLocation || showLocation;
                    userData.friendCode = data.friendCode;
                    locationData.country = data.country;
                    locationData.lat = data.lat;
                    locationData.lng = data.lng;
                    locationData.timezone = data.timezone;
                    userData.location = locationData;
                    setUserModel(userData);
                    if(!showLocation && userData.showLocation){
                        toggleShowLocation();
                    }
                    if(!locationData.lat || !locationData.timezone){
                        setAddressData(locationData);
                    }
                    if(locationData.lat && locationData.lng){
                        setCurrentLocation([locationData.lat , locationData.lng])
                    }
                    setUserLoading(false);
                }
                else if(isAuthenticated){
                    userData.nickname = user.name || "";
                    userData.picture = user.picture || "";
                    userData.showLocation = false;
                    userData.friendCode = "";
                    setUserModel(userData)
                }
                else{
                    console.log("No authentication to create user from");
                }
            }
        ));
    };

    useEffect(()=>{
        GetUserFunction()
    },[])

    return (
        <div>

        </div>
    )
}
export default Auth;