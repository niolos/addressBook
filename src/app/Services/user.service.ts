import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,map,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../Models/users';
import { IApiResponse } from '../Models/apiResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  decodedToken:any
  // private REST_API_URL = environment.API_URL+'/users'
  private REST_API_URL = environment.API_URL+'/api/v1/common';
  // http://localhost:5000/api/v1/common/users?platform=web

  constructor(private http: HttpClient) { }

  private HTTP_HEADER = {
    headers: new HttpHeaders({'content-type': 'application/json'})

   }

  private HTTP_FormData = {
    headers: new HttpHeaders({'content-type': 'application/form-data'}),

   }
  


  getUser():Observable<Users[]>{
    return this.http.get<Users[]>(this.REST_API_URL,this.HTTP_HEADER).pipe(
      tap(users=>{
        // console.log(`Recieved Users =,  ${users}`)
      }),
      catchError(error => of([]))
    )
  }
  
  // createNewUser(user:Users):Observable<Users>{
  //  return this.http.post<Users>(`${this.REST_API_URL}/users?platform=web`, user, this.HTTP_HEADER).pipe(
  //   tap(newUser =>{
  //     console.log(`This User = ${newUser}`);
  //   }),
  //   catchError(error => of(new Users()))
  //  )

   createNewUser(user:any ):Observable<IApiResponse<Users|null>>{

    
    return this.http.post<IApiResponse<Users|null>>(`${this.REST_API_URL}/users?platform=web`, user).pipe(

     tap(newUser =>{
      //  console.log(`This User = ${newUser}`);
       
     }),
     catchError(error => {
      console.log(error);
      return of({
      status: error.status,
      message: error.error,
      data: null,
      error: error.error.error,
      
     })})
      
    )
    

  }
  //Update User Profile
  updateUser(id:string, user: any):Observable<IApiResponse<Users|null>>{
    return this.http.patch<IApiResponse<Users|null>>(`${this.REST_API_URL}/users/${id}?platform=web`, user).pipe(
      tap(updateUser=>{
        console.log(`Updated Users = ${updateUser}` );
      }),
      // catchError(error => of(new Users()))
      catchError(error => {
      console.log(error);
      return of({
        status: error.status,
        message: error.error.message,
        data: error,
        error: error.error.message,
      })})
    )
  }
  
  uploadPic(file:File):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file,);
      
    // Make http post request over api
    // with formData as req
    return this.http.post("http://localhost:5000/api/v1/common/users?platform=web", formData)
}

getImageBase64(user: string): Promise<string> {
  return new Promise((resolve, reject) => {
    this.http.get(user, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    }, (error) => {
      reject(error);
    });
  });
}
  makeRequest(user:Users):Observable<IApiResponse<Users>> {
    return this.http.post<IApiResponse<Users>>(`${this.REST_API_URL}/users?platform=web`, user, this.HTTP_HEADER).pipe(
      tap(newUser =>{
        // console.log(`This User = ${newUser}`);
      }),
      catchError(error => of())

      
      
     )
  }

 
  getUserId(id: string):Observable<IApiResponse<Users>>{
    return this.http.get<IApiResponse<Users>>(`${this.REST_API_URL}/users/${id}?platform=web`).pipe(
      tap(user=>{
        // console.log(`Found User = ${user}`)
      }),
      catchError(error=> of())
    )
  }

  // updateUser(id:string, user:Users):Observable<Users>{
  //   return this.http.patch<Users>(`${this.REST_API_URL}/users/${id}?platform=web`, user, this.HTTP_HEADER).pipe(
  //     tap(updateUser=>{
  //       console.log(`Updated Users = ${updateUser}`);
  //     }),
  //     catchError(error => of(new Users()))
  //   )
  // }

  deleteUsers(id:string){
    return this.http.delete<Users>(`${this.REST_API_URL}/delete/${id}`, this.HTTP_HEADER).pipe(
      tap(deleteUsers=>{
        // console.log(`deleted User = ${deleteUsers.first_name}`);
      }),
      catchError(error=> of(new Users()))

    )
  }


  getProfile(){
    let token:string|null= localStorage.getItem("token")
    if(token){
      this.decodedToken=JSON.parse(atob(token.split(".")[1]))
      // console.log("decoded token",this.decodedToken)
    }
  }
 
//Service for SIDE NAV and User profile.



}

