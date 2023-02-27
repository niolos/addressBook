import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,map,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parish } from '../Models/parish';
import { IApiResponse } from '../Models/apiResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class ParishesService {

  private REST_API_URL = environment.API_URL+'/api/v1/common/parishes?platform=web'

  private HTTP_HEADER = {
    headers: new HttpHeaders({'content-type': 'application/json'})
   }

  constructor(private http: HttpClient) { }

  getParishes():Observable<IApiResponse<Parish[]>>{
    return this.http.get<IApiResponse<Parish[]>>(this.REST_API_URL,this.HTTP_HEADER).pipe(
      tap(parishes=>{
        console.log(`Recieved Parishes = ,  ${parishes}`)
      }),
      catchError(error => of())
    )
  }
}
