export default class LoginResponse {
    token: String;
    type: String;
    refreshToken: String;
    id: Number;
    username: String;
    roles: Array<String>;
    lastLogIn: Date;

    constructor(token: String, type: String, refreshToken: String, username: String, id: Number,  roles: Array<String>, lastLogIn: Date) {
        this.username = username;
        this.token = token;
        this.type = type;
        this.refreshToken = refreshToken;
        this.id = id;
        this.roles = roles;
        this.lastLogIn = lastLogIn;
    }
}