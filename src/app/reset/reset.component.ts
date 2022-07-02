import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reset } from '../models/reset.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  reset: Reset = {
    token: '',
    password: '',
    confirmPassword: '',
  }

  token: string = '';

  show:boolean = false;
  
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('password-token') || '';
  }

  resetForm = new FormGroup({
    token: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  resetSubmitted(){
    this.reset.token = this.resetForm.get('token')?.value || '';
    this.reset.password = this.resetForm.get('password')?.value || '';
    this.reset.confirmPassword = this.resetForm.get('confirmPassword')?.value || '';

    this.auth.requestResetPassword(this.reset);
  }

  get Token(): FormControl{
    return this.resetForm.get('token') as FormControl;
  }

  get Password(): FormControl{
    return this.resetForm.get('password') as FormControl;
  }

  get ConfirmPassword(): FormControl{
    return this.resetForm.get('confirmPassword') as FormControl;
  }

  confirmPassword(){
    var password = this.resetForm.get('password')?.value;
    var confirmPassword = this.resetForm.get('confirmPassword')?.value;
    return password !== confirmPassword ? true: false;
  }
}
