export default class BillDto {
    id: number | null;
    buyersName: String;
    comment: String;
    itemName: String;
    createdDate: Date;
    dueDate: Date;
    price: Number

    constructor(id: number | null, buyersName: String, comment: String, itemName: String, createdDate: Date, dueDate: Date, price: Number) {
        this.id = id
        this.buyersName = buyersName;
        this.comment = comment;
        this.itemName = itemName;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.price = price;
    }
}