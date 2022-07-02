import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  currentRole: any;
  
  readonly token_name:string = "token";

  constructor(
    private jwt: JwtHelperService, 
    private router: Router,
    private service: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem(this.token_name);

      if(token != null && !this.jwt.isTokenExpired(token)){
        this.currentRole = this.service.GetRolebyToken(token);
        if(this.currentRole === 'User'){
          return true;
        }else{
          this.router.navigate(['']);
          this.service.isUserLoggedIn();
          return false;
        }
      }
      this.router.navigate(['']);
      this.service.isUserLoggedIn();
      return false;

  }
  
}
