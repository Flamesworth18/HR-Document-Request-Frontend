import { PurposeService } from './../../services/purpose.service';
import { Purpose } from './../../models/purpose.model';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-purpose',
  templateUrl: './admin-purpose.component.html',
  styleUrls: ['./admin-purpose.component.scss']
})
export class AdminPurposeComponent implements OnInit {

  purposes:Purpose[] = []

  document: Purpose = {
    id: '',
    name: ''
  }

  constructor(
    private purposeService: PurposeService,
    public loader: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPurpose();
  }

  //GET purposes
  getPurpose(){
    this.purposeService.getPurposes()
    .subscribe(
      res => {
        this.purposes = res;
      }
    )
  }

  //POST purpose
  createPurpose(){
    this.router.navigate(['/admin-create-purpose']);
  }

  //PUT purpose
  editPurpose(purpose: Purpose){
    this.purposeService.setPurpose(purpose);
    this.router.navigate(['/admin-edit-purpose']);
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
        this.deletePurpose(id);
      }
    })
  }

  //DELETE purpose
  deletePurpose(id: string){
    this.purposeService.removePurpose(id)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully deleted.", "Purpose");
          this.getPurpose();
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
