import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { catchError,map,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../Models/address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private REST_API_URL = environment.API_URL+'/address'

  private HTTP_HEADER = {
    headers: new HttpHeaders({'content-type': 'application/json'})
   }

  constructor(private http: HttpClient) { }

  getAddress():Observable<Address[]>{
    return this.http.get<Address[]>(this.REST_API_URL,this.HTTP_HEADER).pipe(
      tap(address=>{
        console.log(`Recieved Addresses = ,  ${address}`)
      }),
      catchError(error => of([]))
    )
  }

  createNewAddress(address:Address):Observable<Address>{
   return this.http.post<Address>(`${this.REST_API_URL}/create`, address, this.HTTP_HEADER).pipe(
    tap(newAddress =>{
      console.log(`This Address = ${Address}`);
    }),
    catchError(error => of(new Address()))
   )
  }

  getAddressbyId(id: string):Observable<Address| any>{
    return this.http.get<Address>(`${this.REST_API_URL}/find/${id}`).pipe(
      tap(address=>{
        console.log(`Found User = ${Address}`)
      }),
      catchError(error=> of(new Address()))
    )
  }

  updateAddress(id:string, address:Address):Observable<Address>{
    return this.http.put<Address>(`${this.REST_API_URL}/update/${id}`, address, this.HTTP_HEADER).pipe(
      tap(updateAddress=>{
        console.log(`Updated Address = ${updateAddress}`);
      }),
      catchError(error => of(new Address()))
    )
  }

  deleteAddress(id:string){
    return this.http.delete<Address>(`${this.REST_API_URL}/delete/${id}`, this.HTTP_HEADER).pipe(
      tap(deleteAddress=>{
        console.log(`deleted Address = ${deleteAddress.address1}`);
      }),
      catchError(error=> of(new Address()))
    )
  }

}
