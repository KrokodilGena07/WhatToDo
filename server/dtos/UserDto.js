export class UserDto {
    constructor(model) {
        this.id = model.id;
        this.username = model.username;
        this.email = model.email;
        this.isActivated = model.isActivated;
    }
}