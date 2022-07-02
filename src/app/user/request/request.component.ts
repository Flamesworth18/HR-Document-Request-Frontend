import { RequestService } from 'src/app/services/request.service';
import { UserService } from './../../services/user.service';
import { LoaderService } from './../../services/loader.service';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  requests: Request[] = []
  
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public loader: LoaderService,
    private userService: UserService,
    private auth: AuthService,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.getRequests();
  }
  
  getRequests(){
    this.userService.getUserRequests(this.auth.user.id)
    .subscribe(
      res => {
        this.requests = res;
      }
    )
  }

  confirmDelete(request: Request){
    Swal.fire({
      title: "Are you sure you want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if(result.value){
        this.deleteRequest(request);
      }
    })
  }

  deleteRequest(request: Request){
    this.userService.removeUserRequest(this.auth.user.id, request)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("is deleted successfully","Your Request")
          this.getRequests();
        }, 3000);
      },
      err => {
        setTimeout(() => {
          this.toastr.success("An error occured!");
        }, 3000);
      }
    )
  }

  createRequest(){
    this.router.navigate(['/create']);
  }

  editRequest(request: Request){
    this.requestService.setRequest(request);
    this.router.navigate(['/edit']);
  }
}
