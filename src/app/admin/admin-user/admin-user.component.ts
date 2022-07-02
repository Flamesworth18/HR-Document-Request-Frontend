import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoaderService } from './../../services/loader.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  users:User[] = [];

  user:User = {
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

  constructor(
    private userService:UserService,
    public loader: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  //GET all users
  getUsers(){
    this.userService.getUsers()
    .subscribe(
      res => {
        this.users = res;
      }
    )
  }

  //POST user
  createUser(){
    this.router.navigate(['/admin-create-user']);
  }

  //PUT user
  editUser(user: User){
    this.userService.setUser(user);
    this.router.navigate(['/admin-edit-user'])
  }

  confirmDelete(id: string){
    Swal.fire({
      title: "Are you sure you want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if(result.value){
        this.deleteUser(id);
      }
    })
  }

  //DELETE user
  deleteUser(id: string){
    this.userService.removeUser(id)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully deleted.", "User");
          this.getUsers();
        }, 3000);
      },
      err => {
        setTimeout(() => {
          this.toastr.error("An error occured");
        }, 3000);
      }
    )

  }
}
