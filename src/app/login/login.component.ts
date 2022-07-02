import { LoaderService } from './../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login = {
    userName: '',
    password: ''
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private loader: LoaderService
  ) { 

    localStorage.clear();
    auth.isUserLoggedIn();
    auth.isAdminLoggedIn();

  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  loginSubmitted(){

    this.login.userName = this.loginForm.get('userName')?.value || '';
    this.login.password = this.loginForm.get('password')?.value || '';

    this.auth.loginRequest(this.login);
  }

  get Username(): FormControl{
    return this.loginForm.get('userName') as FormControl;
  }

  get Password(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  navigateToRegister(){
    this.router.navigate(['/register'])
  }

  navigateToForgot(){
    this.router.navigate(['/forgot'])
  }
}
