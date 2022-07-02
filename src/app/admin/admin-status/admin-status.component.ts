import { StatusService } from './../../services/status.service';
import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status.model';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-status',
  templateUrl: './admin-status.component.html',
  styleUrls: ['./admin-status.component.scss']
})
export class AdminStatusComponent implements OnInit {

  statuses: Status[] = [];
  status: Status = {
    id: '',
    name: ''
  }

  constructor(
    private statusService: StatusService,
    public loader: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getStatuses();
  }

  //GET ranks
  getStatuses(){
    this.statusService.getStatuses()
    .subscribe(
      res => {
        this.statuses = res;
      }
    )
  }

  //POST status
  createStatus(){
    this.router.navigate(['/admin-create-status']);
  }

  //PUT status
  editStatus(status: Status){
    this.statusService.setStatus(status);
    this.router.navigate(['/admin-edit-status']);
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
        this.deleteStatus(id);
      }
    })
  }

  //DELETE status
  deleteStatus(id: string){
    this.statusService.removeStatus(id)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully deleted.", "Status");
          this.getStatuses();
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
