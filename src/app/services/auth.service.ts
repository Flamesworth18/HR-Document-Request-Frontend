import { Logout } from './../models/logout.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { Forgot } from '../models/forgot.model';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { Reset } from '../models/reset.model';
import { UserToken } from '../models/usertoken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly accountURL = "https://localhost:7018/api/Accounts/";
  readonly token_name:string = "token";
  readonly refresh_token_name:string = "refreshToken"

  tokenresp: any;

  userToken: UserToken = {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    role: '',
    rank: '',
    sex: '',
  }

  role: any;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private jwt: JwtHelperService,
    private toastr: ToastrService,
    ) {

      let token = localStorage.getItem("token");
      if(token != null){
        let decode = this.jwt.decodeToken(token);
        let role = decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        if(role === 'User'){
          this._isUser.next(true);
          this._isAdmin.next(false);
        }else if(role === 'Administrator'){
          this._isAdmin.next(true);
          this._isUser.next(false);
        }else{
          this._isUser.next(false);
          this._isAdmin.next(false);
        }
      } 

    }

  get user(){
    return this.userToken || '';
  }

  get token(){
    return localStorage.getItem(this.token_name) || '';
  }

  //create user
  registerUser(request: Register){
    return this.http.post(this.accountURL + 'register', request, {
      responseType: 'text'
    });
  }

  registerRequest(request: Register){
    this.registerUser(request).subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success('Account has been registered.', 'Congratulations!');
          this.router.navigate(['/login']);
        }, 3000);
      },
      err => {
        console.log(err);
        setTimeout(() => {
          this.toastr.error('Request Invalid!');
        }, 3000);
      }
    );
  }

  //login user
  loginUser(request: Login){
    return this.http.post(this.accountURL + 'login', request, {
      responseType: 'text',
    });
  }

  //request for login
  loginRequest(request: Login){
    this.loginUser(request).subscribe(
      response => {
          var decodedToken = this.jwt.decodeToken(JSON.stringify(response));
          
          this.userToken.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          this.userToken.firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
          this.userToken.lastName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
          this.userToken.userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
          this.userToken.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          this.userToken.sex = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender'];

          localStorage.setItem(this.token_name, response);

          if(this.userToken.role === 'User'){

            setTimeout(() => {
              this.router.navigate(['/home']);
              
              this._isUser.next(true);
              this._isAdmin.next(false);
            }, 3000);
          }else if(this.userToken.role === 'Administrator'){
            
            setTimeout(() => {
              this.router.navigate(['/dashboard']);

              this._isAdmin.next(true);
              this._isUser.next(false);
            }, 3000);
          }
      },
      error => {
        setTimeout(() => {
          this.toastr.error('Invalid username or password');
        }, 3000);
      }
    );    
  }
  
  //logout user
  logoutUser(request: Logout){
    return this.http.post(this.accountURL + 'logout', request, {
      responseType: 'text',
    });
  }

  //request for logout
  logoutRequest(request: Logout){
    this.logoutUser(request)
    .subscribe(
      res => {
        setTimeout(() => {
          
          localStorage.clear();
          this._isUser.next(false);
          this._isAdmin.next(false);
          this.router.navigateByUrl('/login');

        }, 3000);
      },
      err => {
        console.log(this.userToken.id);
        setTimeout(() => {
          this.toastr.error("Request Failed!");
        }, 3000);
      }
    )
  }

  sessionExpired(){
    this.toastr.error("Session Expired!");      
    localStorage.clear();
    this._isUser.next(false);
    this._isAdmin.next(false);
    this.router.navigateByUrl('/login');
  }

  //get user role
  GetRolebyToken(token: any) {
    const decodedToken = this.jwt.decodeToken(JSON.stringify(token));
    this.userToken.firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    this.userToken.lastName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
    this.userToken.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userToken.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userToken.sex = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender'];

    return this.userToken.role;
  }

  private _isUser = new BehaviorSubject<boolean>(false);
  isUser = this._isUser.asObservable();

  isUserLoggedIn(){
    this._isUser.next(false);
  }

  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin = this._isAdmin.asObservable();

  isAdminLoggedIn(){
    this._isAdmin.next(false);
  }

  //forgot user password
  forgotPassword(email: Forgot){
    return this.http.post(this.accountURL + 'forgot-password', email,  {
      responseType: 'text',
    });
  }

  //request forgot user password
  requestForgotPassword(email: Forgot){
    this.forgotPassword(email)
    .subscribe(
      res => {
        sessionStorage.setItem('password-token', res);

        setTimeout(() => {
          this.router.navigate(['/reset']);
        }, 3000);

      },
      err => {
        console.log(err)
        setTimeout(() => {
          this.toastr.error("is invalid", 'Email');
        }, 3000);
      }
    )
  }

  resetPassword(reset: Reset){
    return this.http.post(this.accountURL +'reset-password', reset, {
      responseType: 'text',
    })
  }

  requestResetPassword(reset: Reset){
    this.resetPassword(reset)
    .subscribe(
      res => {
        
        setTimeout(() => {
          Swal.fire({
            title: "Congratulations!",
            text: "Your password has been reset successfully",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Login",
          }).then((result) => {
            if(result.value){
              this.router.navigate(['/login'])
            }
          })
        }, 3000);

        sessionStorage.setItem('password-token', '')
      },
      err => {
        this.toastr.error("Request Timeout");
      }
    )
  }
}
