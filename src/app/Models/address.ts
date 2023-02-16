export class Address{
    _id: string;
    address1: String;
    address2: String;
    city: String;
    parish: String;

    constructor(_id?: string, address1?: String, address2?: String, city?: String, parish?: String){
        this._id = _id!;
        this.address1 = address1!;
        this.address2 = address2!;
        this.city = city!;
        this.parish = parish!;
    }
}