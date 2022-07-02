import { PrintService } from 'src/app/services/print.service';
import { AuthService } from './../../services/auth.service';
import { Document } from '../../models/document.model';
import { DocumentService } from '../../services/document.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/models/request.model';
import { Print } from 'src/app/models/print.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

  requests: Request[] = []
  documents: Document[] = [];

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(){
    this.requestService.getRequests()
    .subscribe(
      res => {
        this.requests = res;
      }
    )
  }
  
  acceptedRequests(){
    this.router.navigate(['/admin-accepted-request']);
  }

  deniedRequests(){
    this.router.navigate(['/admin-denied-request']);
  }

  acceptRequest(request: Request){
    request.status = "Accepted";
    this.requestService.updateAdminRequest(request.id, request)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been accepted successfully.","Request");
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

  confirmRejectRequest(request: Request){
    Swal.fire({
      title: "Are you sure you want to deny this request?",
      text: "This request will be moved in the denied list!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deny request",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if(result.value){
        this.deniedRequest(request);
      }
    })
  }

  deniedRequest(request: Request){
    request.status = "Denied";
    this.requestService.updateAdminRequest(request.id, request)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been denied.","Request");
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
}
