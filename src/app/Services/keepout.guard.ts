import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeepoutGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate():boolean{
    if(!localStorage.getItem('token')){
      this.router.navigate(['/'])
      return false
    }
    return true
  }
  
}
