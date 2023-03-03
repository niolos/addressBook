import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,map,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../Models/address';
import { IApiResponse } from '../Models/apiResponse.interface';


@Injectable({
  providedIn: 'root'

})
export class AddressService {
  decodedToken:any
  dectoken:string=""
  private REST_API_URL = environment.API_URL+'/api/v1/common'
  private USERS_API = environment.API_URL+'/api/v1/web/users'

  private HTTP_HEADER = {
    headers: new HttpHeaders({'content-type': 'application/json'})
   }

  constructor(private http: HttpClient) { }

  getAddress(id:string):Observable<IApiResponse<Address>[]|any>{
    return this.http.get<IApiResponse<Address>[]>(`${this.USERS_API}/${id}/addresses`,this.HTTP_HEADER).pipe(
      tap(address=>{
        // console.log(`Recieved Addresses =`,JSON.stringify(address))
      }),
      catchError(error => of([]))
    )
  }

  // createNewAddress(address:Partial<Address>):Observable<IApiResponse<Address>>{
  //  return this.http.post<IApiResponse<Address>>(`${this.REST_API_URL}/addresses?platform=web`, address).pipe(
  //   tap(newAddress =>{
  //     console.log(`This Address = ${newAddress}`);
  //   }),
  //   catchError(error => of())
  //   )
  // }



  createNewAddress(address:Partial<Address>):Observable<IApiResponse<Address|null>>{
    console.log("address dets", address)
    return this.http.post<IApiResponse<Address|null>>(`${this.REST_API_URL}/addresses?platform=web`, address, this.HTTP_HEADER).pipe(
     tap(newAddress =>{
       console.log(`This address = ${newAddress}`);
     }),
     catchError(error => of({
      status: error.status,
      message: error.error.message,
      data: null,
      error: error.error.message,
     }))
     
     
    )

  }

  getAddressbyId(id: string):Observable<IApiResponse<Address| any>>{
    
    return this.http.get<IApiResponse<Address>>(`${this.REST_API_URL}/addresses/${id}?platform=web`).pipe(
      tap(address=>{
        console.log(`Found address = ${address}`)
      }),
      catchError(error => {
        console.log(error);
        return of({
        status: error.status,
        message: error.error.message,
        data: null,
        error: error.error.message,
        
       })})
        
      )
  }

  updateAddress(id:string, address:Partial<Address>):Observable<IApiResponse<Address | null>>{
    console.log(address, "ADDRESS FOR THIS!!!")
    let token:string|null= localStorage.getItem("token")
    if(token){
      this.decodedToken=JSON.parse(atob(token.split(".")[1]))
      console.log("decoded token",this.decodedToken)
    }
    address.user_id = this.decodedToken.id;
   
    
    
    return this.http.put<IApiResponse<Address>>(`${this.REST_API_URL}/addresses/${id}?platform=web`, address, this.HTTP_HEADER).pipe(
      tap(updateAddress=>{ 
        console.log(`Updated Address = ${updateAddress}`);
      }),
      // catchError(error => of(new Address()))
      catchError(error => {
        console.log(error);
        return of({
        status: error.status,
        message: error.error.message,
        data: null,
        error: error.error.error,
        
       })}),
    )
  }

  deleteAddress(id:string){
    return this.http.delete<Address>(`${this.REST_API_URL}/addresses/${id}/destroy?platform=web`, this.HTTP_HEADER).pipe(
      tap(deleteAddress=>{
        console.log(`deleted Address = ${deleteAddress.address_1}`);
      }),
      catchError(error=> of(new Address()))
    )
  }

}
