export default class User{
    constructor(name, password, email, token, nickname, currentLocation, isLoadingLocation) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.token = token;
        this.nickname = nickname;
        this.currentLocation = currentLocation;
    }
}