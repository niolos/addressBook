import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,map,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../Models/users';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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


  getUser():Observable<Users[]>{
    return this.http.get<Users[]>(this.REST_API_URL,this.HTTP_HEADER).pipe(
      tap(users=>{
        console.log(`Recieved Users =,  ${users}`)
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

   createNewUser(user:Users):Observable<IApiResponse<Users|null>>{
    return this.http.post<IApiResponse<Users|null>>(`${this.REST_API_URL}/users?platform=web`, user, this.HTTP_HEADER).pipe(

     tap(newUser =>{
       console.log(`This User = ${newUser}`);
     }),
     catchError(error => of({
      status: error.status,
      message: error.error.message,
      data: null,
      error: error.error.message,
     }))
     
     
    )

  }

  makeRequest(user:Users):Observable<IApiResponse<Users>> {
    return this.http.post<IApiResponse<Users>>(`${this.REST_API_URL}/users?platform=web`, user, this.HTTP_HEADER).pipe(
      tap(newUser =>{
        console.log(`This User = ${newUser}`);
      }),
      catchError(error => of())

      
      
     )
  }

 
  getUserId(id: string):Observable<IApiResponse<Users>>{
    return this.http.get<IApiResponse<Users>>(`${this.REST_API_URL}/users/${id}?platform=web`).pipe(
      tap(user=>{
        console.log(`Found User = ${user}`)
      }),
      catchError(error=> of())
    )
  }

  updateUser(id:string, user:Users):Observable<Users>{
    return this.http.put<Users>(`${this.REST_API_URL}/users/${id}?platform=web`, user, this.HTTP_HEADER).pipe(
      tap(updateUser=>{
        console.log(`Updated Users = ${updateUser}`);
      }),
      catchError(error => of(new Users()))
    )
  }

  deleteUsers(id:string){
    return this.http.delete<Users>(`${this.REST_API_URL}/delete/${id}`, this.HTTP_HEADER).pipe(
      tap(deleteUsers=>{
        console.log(`deleted User = ${deleteUsers.first_name}`);
      }),
      catchError(error=> of(new Users()))
    )
  }


  getProfile(){
    let token:string|null= localStorage.getItem("token")
    if(token){
      this.decodedToken=JSON.parse(atob(token.split(".")[1]))
      console.log("decoded token",this.decodedToken)
    }
  }
 


}

