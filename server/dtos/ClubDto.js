export class ClubDto {
    constructor(model) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.source = model.source;
        this.phone = model.phone;
        this.ownerId = model.ownerId;
        this.price = model.price;
        this.connect = model.connect;
        this.city = model.city;
        this.category = model.category;
        this.image = model.image ?
            'data:image/png;base64,' + Buffer.from(model.image).toString('base64')
            :
            null;
    }
}