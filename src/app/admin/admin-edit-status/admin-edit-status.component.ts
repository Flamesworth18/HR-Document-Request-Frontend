import { StatusService } from './../../services/status.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/models/status.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-status',
  templateUrl: './admin-edit-status.component.html',
  styleUrls: ['./admin-edit-status.component.scss']
})
export class AdminEditStatusComponent implements OnInit {

  status:Status = {
    id: '',
    name: '',
  }

  tempStatus:Status = {
    id: '',
    name: '',
  }

  constructor(
    private router: Router,
    private statusService: StatusService,
    private toastr: ToastrService,
    private auth: AuthService,
  ) {

    this.statusService.getStatus.subscribe(r => this.tempStatus = r);

   }

  ngOnInit(): void {
  }

  navigateToStatusList(){
    this.router.navigate(['/admin-status']);
  }

  editStatusForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  });

  editStatus(){
    this.status.name = this.editStatusForm.get('name')?.value || '';

    this.requestEditStatus(this.status);
  }

  requestEditStatus(status: Status){
    this.statusService.updateStatus(this.tempStatus.id ,status)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully updated.", status.name);
          this.router.navigate(['/admin-status'])
        }, 3000);
      },
      err => {
        console.log(status)
        setTimeout(() => {
          this.toastr.error("An error occured");
        }, 3000);
      }
    )
  }

}
