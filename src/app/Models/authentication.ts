export interface authResponse<T=any>{
    status:any;
    loginUser:any;
    data:{
        token:string
        user:any
    }
    response:any
    auth:any
}