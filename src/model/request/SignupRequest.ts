export default class SignupRequest {
    username: String;
    name: String;
    password: String;
    roles: Array<String>

    constructor(username: String, name: String, password: String, roles: Array<String>) {
        this.username = username;
        this.name = name;
        this.roles = roles;
        this.password = password;
    }
}