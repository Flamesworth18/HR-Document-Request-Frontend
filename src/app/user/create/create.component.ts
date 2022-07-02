import { UserService } from './../../services/user.service';
import { PurposeService } from './../../services/purpose.service';
import { Purpose } from './../../models/purpose.model';
import { AuthService } from './../../services/auth.service';
import { Document } from 'src/app/models/document.model';
import { DocumentService } from '../../services/document.service';
import { ToastrService } from 'ngx-toastr';
import { Request } from '../../models/request.model';
import { RequestService } from './../../services/request.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  request: Request = {
    id: '',
    firstName: '',
    lastName: '',
    purpose: '',
    sex: '',
    rank: '',
    document: '',
    status: '',
    dateCreated: ''
  }

  documents: Document[] = [];
  purposes: Purpose[] = [];

  constructor(
    private router: Router,
    private requestService: RequestService,
    private toastr: ToastrService,
    private documentService: DocumentService,
    private purposeService: PurposeService,
    private auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getDocuments();
    this.getPurposes();
  }

  getDocuments(){
    this.documentService.getDocuments()
    .subscribe(
      res => {
        this.documents = res
      }
    )
  }

  getPurposes(){
    this.purposeService.getPurposes()
    .subscribe(
      res => {
        this.purposes = res;
      }
    )
  }
  
  navigateToRequestPage(){
    this.router.navigate(['/request']);
  }

  requestForm = new FormGroup({
    purpose: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required])
  });

  createRequest(){
    this.request.purpose = this.requestForm.get('purpose')?.value || '';
    this.request.document = this.requestForm.get('type')?.value || '';

    this.requestRequest(this.request);
  }

  requestRequest(request: Request){
    request.firstName = this.auth.user.firstName;
    request.lastName = this.auth.user.lastName;
    request.sex = this.auth.user.sex;
    request.rank = this.auth.user.rank;

    this.userService.addUserRequest(this.auth.user.id, request)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been sent","Your request");
          this.router.navigate(['/request']);
        }, 3000);
      },
      err => {
        console.log(err)
        setTimeout(() => {
          this.toastr.error("An error has occured!");
        }, 3000);
      }
    )
  }
}
