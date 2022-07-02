import { Purpose } from './../../models/purpose.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurposeService } from 'src/app/services/purpose.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-purpose',
  templateUrl: './admin-edit-purpose.component.html',
  styleUrls: ['./admin-edit-purpose.component.scss']
})
export class AdminEditPurposeComponent implements OnInit {

  purpose:Purpose = {
    id: '',
    name: '',
  }

  tempPurpose:Purpose = {
    id: '',
    name: '',
  }

  constructor(
    private router: Router,
    private purposeService: PurposeService,
    private toastr: ToastrService,
    private auth: AuthService,
  ) { 

    this.purposeService.getpurpose.subscribe(p => this.tempPurpose = p);

  }

  ngOnInit(): void {
  }

  navigateToPurposeList(){
    this.router.navigate(['/admin-purpose']);
  }

  editPurposeForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  });

  editPurpose(){
    this.purpose.name = this.editPurposeForm.get('name')?.value || '';

    this.requestEditPurpose(this.purpose);
  }

  requestEditPurpose(purpose: Purpose){
    this.purposeService.updatePurpose(this.tempPurpose.id ,purpose)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully updated.", purpose.name);
          this.router.navigate(['/admin-purpose'])
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
