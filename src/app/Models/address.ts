export class Address{
    _id: string;
    address_1: String;
    address_2: String;
    city: String;
    parish: String;
    user_id:string;

    constructor(_id?: string, address_1?: String, address_2?: String, city?: String, parish?: String, user_id?:string){
        this._id = _id!;
        this.address_1 = address_1!;
        this.address_2 = address_2!;
        this.city = city!;
        this.parish = parish!;
        this.user_id = user_id!;
    }
}