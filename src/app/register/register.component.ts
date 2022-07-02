import { RankService } from './../services/rank.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Register } from '../models/register.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rank } from '../models/rank.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: Register = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    rank: '',
    sex: '',
  }

  termsAccepted:boolean = false;

  ranks: Rank[] = []; 

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private rankService: RankService
  ) { }

  ngOnInit(): void {
    this.getRanks();
  }

  getRanks(){
    this.rankService.getRanks()
    .subscribe(
      res => {
        this.ranks = res;
      }
    )
  }

  registerForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    userName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rank: new FormControl(null, [Validators.required]),
    sex: new FormControl(null, [Validators.required])
  });

  registerSubmitted(){
    this.register.firstName = this.registerForm.get('firstName')?.value || '';
    this.register.lastName = this.registerForm.get('lastName')?.value || '';
    this.register.email = this.registerForm.get('email')?.value || '';
    this.register.userName = this.registerForm.get('userName')?.value || '';
    this.register.password = this.registerForm.get('password')?.value || '';
    this.register.confirmPassword = this.registerForm.get('confirmPassword')?.value || '';
    this.register.rank = this.registerForm.get('rank')?.value || '';
    this.register.sex = this.registerForm.get('sex')?.value || '';

    console.log(this.register)
    if(this.termsAccepted){
      this.auth.registerRequest(this.register);
    }else{
      this.toastr.error("Check Accept Terms!", "Request Error");
    }
  }

  get FirstName(): FormControl{
    return this.registerForm.get('firstName') as FormControl;
  }

  get LastName(): FormControl{
    return this.registerForm.get('lastName') as FormControl;
  }

  get Email(): FormControl{
    return this.registerForm.get('email') as FormControl;
  }

  get Username(): FormControl{
    return this.registerForm.get('userName') as FormControl;
  }

  get Password(): FormControl{
    return this.registerForm.get('password') as FormControl;
  }

  get ConfirmPassword(): FormControl{
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  get Rank(): FormControl{
    return this.registerForm.get('rank') as FormControl;
  }

  get Sex(): FormControl{
    return this.registerForm.get('sex') as FormControl;
  }

  confirmPassword(){
    var password = this.registerForm.get('password')?.value;
    var confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password !== confirmPassword ? true: false;
  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }

  acceptTerms(){
    this.termsAccepted = !this.termsAccepted;
  }

  rankEmpty(){
    var r = this.registerForm.get('rank')?.value || '';
    return r !== ''? false : true;
  }

  sexEmpty(){
    var s = this.registerForm.get('sex')?.value || '';
    return s !== ''? false : true;
  }
}
