import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Forgot } from '../models/forgot.model';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgot: Forgot = {
    email: ''
  }

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  forgotForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  get Email(): FormControl{
    return this.forgotForm.get('email') as FormControl;
  }

  forgotPassword(){
    this.forgot.email = this.forgotForm.get('email')?.value || '';
    this.auth.requestForgotPassword(this.forgot);
  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }
}
