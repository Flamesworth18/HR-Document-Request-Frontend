import { Request } from '../../models/request.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-denied-requests',
  templateUrl: './admin-denied-requests.component.html',
  styleUrls: ['./admin-denied-requests.component.scss']
})
export class AdminDeniedRequestsComponent implements OnInit {

  requests: Request[] = []
  documents: Document[] = [];

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.getRequests();
  }

  back(){
    this.router.navigate(['/admin-request']);
  }

  getRequests(){
    this.requestService.getRequests()
    .subscribe(
      res => {
        this.requests = res;
        this.cdr.detectChanges();
      }
    )
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
        this.deleteRequest(id);
      }
    })
  }

  deleteRequest(id: string){
    this.requestService.removeRequest(id)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("is deleted successfully","User Request")
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

  retrieveRequest(request: Request){
    request.status = "Pending";
    this.requestService.updateAdminRequest(request.id, request)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been retrieved.","Request");
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
