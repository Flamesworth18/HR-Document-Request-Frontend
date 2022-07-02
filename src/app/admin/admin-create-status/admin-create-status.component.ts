import { StatusService } from './../../services/status.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/models/status.model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create-status',
  templateUrl: './admin-create-status.component.html',
  styleUrls: ['./admin-create-status.component.scss']
})
export class AdminCreateStatusComponent implements OnInit {

  status:Status = {
    id: '',
    name: ''
  }

  constructor(
    private router: Router,
    private statusService: StatusService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  navigateToStatusList(){
    this.router.navigate(['/admin-status']);
  }

  createStatusForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  createStatus(){
    this.status.name = this.createStatusForm.get('name')?.value || '';

    this.createAnotherStatus(this.status);
  }

  createAnotherStatus(status: Status){
    this.statusService.addStatus(status)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been created succesfully", status.name);
          this.router.navigate(['/admin-status']);
        }, 3000);
      },
      err => {
        setTimeout(() => {
          this.toastr.error("An error occured!")
        }, 3000);
      }
    )
  }

}
