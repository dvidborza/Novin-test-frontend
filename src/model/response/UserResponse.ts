export default class UserResponse {
    id: Number;
    name: String;
    username: String;
    roles: Array<String>;
    lastLogIn: Date;

    constructor(id: Number, name: String, username: String,  roles: Array<String>, lastLogIn: Date) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.roles = roles;
        this.lastLogIn = lastLogIn;
    }
}