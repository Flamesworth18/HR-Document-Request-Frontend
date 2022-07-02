import { RankService } from './../../services/rank.service';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CreateUpdateUser } from 'src/app/models/create-update-user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Rank } from 'src/app/models/rank.model';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss']
})
export class AdminEditUserComponent implements OnInit {

  user: CreateUpdateUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    sex: '',
    role: ''
  }

  tempUser:User = {
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    userName:'',
    dateStarted:'',
    passwordHash:'',
    passwordSalt:'',
    passwordResetToken:'',
    passwordTokenExpires:new Date(),
    sex:'',
    role:'',
    numberOfRequests: 0
  }

  ranks: Rank[] = []; 

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private auth: AuthService,
    private rankService: RankService
  ) { 

    this.userService.getUser.subscribe(user => this.tempUser = user);

  }

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

  navigateToUserList(){
    this.router.navigate(['/admin-user']);
  }

  editUserForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    sex: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
  });

  editUser(){
    this.user.firstName = this.editUserForm.get('firstname')?.value || '';
    this.user.lastName = this.editUserForm.get('lastname')?.value || '';
    this.user.email = this.editUserForm.get('email')?.value || '';
    this.user.userName = this.editUserForm.get('username')?.value || '';
    this.user.password = this.editUserForm.get('password')?.value || '';
    this.user.sex = this.editUserForm.get('sex')?.value || '';
    this.user.role = this.editUserForm.get('role')?.value || '';

    this.requestEditUser(this.user);
  }

  requestEditUser(user: CreateUpdateUser){
    this.userService.updateUser(this.tempUser.id ,user)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully updated.", user.firstName);
          this.router.navigate(['/admin-user'])
        }, 3000);
      },
      err => {
        setTimeout(() => {
          this.toastr.error("An error occured");
        }, 3000);
      }
    )
  }

  get FirstName(): FormControl{
    return this.editUserForm.get('firstname') as FormControl;
  }

  get LastName(): FormControl{
    return this.editUserForm.get('lastname') as FormControl;
  }

  get Email(): FormControl{
    return this.editUserForm.get('email') as FormControl;
  }

  get Username(): FormControl{
    return this.editUserForm.get('username') as FormControl;
  }

  get Password(): FormControl{
    return this.editUserForm.get('password') as FormControl;
  }

  get Sex(): FormControl{
    return this.editUserForm.get('sex') as FormControl;
  }

  get Role(): FormControl{
    return this.editUserForm.get('role') as FormControl;
  }
}
