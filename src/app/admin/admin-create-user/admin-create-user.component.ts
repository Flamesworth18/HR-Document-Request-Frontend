import { RankService } from './../../services/rank.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUpdateUser } from 'src/app/models/create-update-user.model';
import { Rank } from 'src/app/models/rank.model';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.scss']
})
export class AdminCreateUserComponent implements OnInit {

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

  ranks:Rank[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
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

  navigateToUserList(){
    this.router.navigate(['/admin-user']);
  }

  createUserForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    sex: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
  });

  createUser(){
    this.user.firstName = this.createUserForm.get('firstname')?.value || '';
    this.user.lastName = this.createUserForm.get('lastname')?.value || '';
    this.user.email = this.createUserForm.get('email')?.value || '';
    this.user.userName = this.createUserForm.get('username')?.value || '';
    this.user.password = this.createUserForm.get('password')?.value || '';
    this.user.sex = this.createUserForm.get('sex')?.value || '';
    this.user.role = this.createUserForm.get('role')?.value || '';

    this.requestCreateUser(this.user);
  }

  requestCreateUser(user: CreateUpdateUser){
    this.userService.addUser(user)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully created.", user.firstName);
          this.router.navigate(['/admin-user']);
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
    return this.createUserForm.get('firstname') as FormControl;
  }

  get LastName(): FormControl{
    return this.createUserForm.get('lastname') as FormControl;
  }

  get Email(): FormControl{
    return this.createUserForm.get('email') as FormControl;
  }

  get Username(): FormControl{
    return this.createUserForm.get('username') as FormControl;
  }

  get Password(): FormControl{
    return this.createUserForm.get('password') as FormControl;
  }

  get Sex(): FormControl{
    return this.createUserForm.get('sex') as FormControl;
  }

  get Role(): FormControl{
    return this.createUserForm.get('role') as FormControl;
  }
}
