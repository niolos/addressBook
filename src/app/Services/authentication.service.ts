import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Models/users';
import { authResponse } from '../Models/authentication';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,map,tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private REST_API_URL = environment.API_URL+'/api/v1/common/login';


  private HTTP_HEADER={
    headers: new HttpHeaders({'content-type':'application/json'})
  }

  constructor(private http:HttpClient) { }

  checkLogin(formData:any): Observable<authResponse<Users>>{
    return this.http.post<authResponse<Users>>("http://localhost:5000/api/v1/common/login?platform=web", formData)
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
