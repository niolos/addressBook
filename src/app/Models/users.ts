export class Users{
    _id: string;
    fName: String;
    lName: String;
    email: String;
    cell: Number;
    home: Number;

    constructor(_id?:string, fName?:String, lName?: String, email?: String, cell?: Number, home?:Number){
        this._id = _id!,
        this.fName = fName!,
        this.lName = lName!,
        this.email = email!,
        this.cell = cell!;
        this.home = home!;
    }
}