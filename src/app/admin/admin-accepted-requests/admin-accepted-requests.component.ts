import { DocumentEnum } from './../../enums/document.enum';
import { PurposeService } from './../../services/purpose.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Print } from 'src/app/models/print.model';
import { Purpose } from 'src/app/models/purpose.model';
import { Request } from 'src/app/models/request.model';
import { AuthService } from 'src/app/services/auth.service';
import { PrintService } from 'src/app/services/print.service';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-accepted-requests',
  templateUrl: './admin-accepted-requests.component.html',
  styleUrls: ['./admin-accepted-requests.component.scss']
})
export class AdminAcceptedRequestsComponent implements OnInit {

  requests: Request[] = []
  documents: Document[] = [];

  print: Print = {
    firstName: '',
    lastName: '',
    rank: '',
    sex: ''
  }

  constructor(
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private printService: PrintService,
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

  printRequest(request: Request){
    this.print.firstName = request.firstName;
    this.print.lastName = request.lastName;
    this.print.rank = this.auth.user.rank;
    this.print.sex = this.auth.user.sex;

    this.printService.setPrintData(this.print);

    sessionStorage.setItem('printing', JSON.stringify(true));
    this.printService.isPrint(true);

    var docType = request.document.replace(/\s/g, "");

    
    console.log(DocumentEnum.CertificateofEmployment)

    if(docType === DocumentEnum.CertificateofEmployment){
      this.router.navigate(['/admin-print-ceo']);
    }
    else if (docType === DocumentEnum.CertificateofEmploymentwithCompensation){
      this.router.navigate(['/admin-print-ceo-with-compensation']);
    }
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
