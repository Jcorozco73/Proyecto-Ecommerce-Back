import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  Router,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    public AuthService: AuthService,
    public router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
      if(
        !this.AuthService.user || !this.AuthService.token){
        this.router.navigate(['auth/login'])
        return false

        }
       let token = this.AuthService.token

        let payload = (JSON.parse(atob(token.split('.')[1]))).exp
        if(Math.floor((new Date).getTime() / 1000) >= payload){
          this.AuthService.logout()
          return false

        }

        return true
  }

  }



