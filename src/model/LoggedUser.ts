export default class LoggedUser {
    username: String;
    id: Number;
    roles: Array<String>;
    lastLogIn: Date

    constructor(username: String, id: Number, roles: Array<String>, lastLogIn: Date) {
        this.username = username;
        this.id = id;
        this.roles = roles;
        this.lastLogIn = lastLogIn;
    }
}