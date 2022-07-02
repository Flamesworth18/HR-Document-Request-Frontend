import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Purpose } from 'src/app/models/purpose.model';
import { PurposeService } from 'src/app/services/purpose.service';

@Component({
  selector: 'app-admin-create-purpose',
  templateUrl: './admin-create-purpose.component.html',
  styleUrls: ['./admin-create-purpose.component.scss']
})
export class AdminCreatePurposeComponent implements OnInit {

  purpose: Purpose = {
    id: '',
    name: '',
  }

  constructor(
    private router: Router,
    private purposeService: PurposeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  navigateToPurposeList(){
    this.router.navigate(['/admin-purpose']);
  }

  createPurposeForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  createPurpose(){
    this.purpose.name = this.createPurposeForm.get('name')?.value || '';

    this.createAnotherPurpose(this.purpose);
  }

  createAnotherPurpose(purpose: Purpose){
    this.purposeService.addPurpose(purpose)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been created succesfully", purpose.name);
          this.router.navigate(['/admin-purpose']);
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
