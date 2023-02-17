import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AsyncronousValidatorService {

  constructor() { }

  
}
export function passwordLengthValidator(minLength: number): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const password = control.value;
    if (!password) {
      return of(null); // return null if the password field is empty
    }

    // simulate an asynchronous operation to check password length
    return of(password).pipe(
      map((password: string) => {
        if (password.length < minLength) {
          return { passwordTooShort: true };
        } else {
          return null;
        }
      })
    );
  };
}


// asyncValidatorFn, in reatcive forms just palce this after you placed validator required field (.reuqired one) and after this just place what you want.
// This allows it to return the promise needed. From services if there await used in the backend.

export function asyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return new Observable((observer) => {
    setTimeout(() => {
      if (control.value === 'invalid') {
        observer.next({ asyncInvalid: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 2000);
  });
}

export const asyncValidatorFn: ValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  return asyncValidator(control);

  

};


