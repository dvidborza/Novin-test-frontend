export default class UserRequest {
    id: Number;
    username: String;
    name: String;
    roles: Array<String>

    constructor(id: Number, username: String, name: String, roles: Array<String>) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.roles = roles;
    }
}