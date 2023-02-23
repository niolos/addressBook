import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, of, Subscriber, throwError } from 'rxjs';


@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor(private auth:AuthenticationService, private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   let authService = this.injector.get(AuthenticationService)
   console.log(authService.getToken())
   let tokenRequest = request.clone({
    setHeaders:{
      Authorization:`Bearer ${authService.getToken()}`
    }
   })
   return next.handle(tokenRequest)
  }
}
