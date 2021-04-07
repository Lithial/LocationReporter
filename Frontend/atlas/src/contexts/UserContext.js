import {Component, createContext, useContext} from "react";

export const UserContext = createContext();

class UserContextProvider extends Component{
    state = {
        showLocation: true,
        currentLocation: {lat:"", lng:""}
    }
    render(){
        return( 
        <UserContext.Provider value={{...this.state}}>
            {this.props.children} {/*render whats wrapped in this class */}
        </UserContext.Provider> 
        );
    }
}
export default UserContextProvider;