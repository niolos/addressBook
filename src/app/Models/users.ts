export class Users{
    _id: string;
    first_name: String;
    last_name: String;
    email: String;
    password: String;
    profile_image: String;
    mobile_number: String;
    home_number: String;

    constructor(_id?:string, first_name?:String, last_name?: String, email?: String, mobile_number?: String, home_number?:String, password?:String, profile_image?: String){
        this._id = _id!,
        this.first_name = first_name!,
        this.last_name = last_name!,
        this.email = email!,
        this.mobile_number = mobile_number!;
        this.home_number = home_number!;
        this.password = password!;
        this.profile_image = profile_image!;
    }
}


export interface userResponse<T>{
    status: number;
    message: string;
    data: T;
    error?: string;

}
