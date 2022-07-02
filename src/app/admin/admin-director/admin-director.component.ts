import { Director } from './../../models/director.model';
import { Component, OnInit } from '@angular/core';
import { DirectorService } from 'src/app/services/director.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-director',
  templateUrl: './admin-director.component.html',
  styleUrls: ['./admin-director.component.scss']
})
export class AdminDirectorComponent implements OnInit {

  directors:Director[] = []

  Director: Director = {
    id: '',
    name: ''
  }

  constructor(
    private directorService: DirectorService,
    public loader: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDirectors();
  }

  //GET directors
  getDirectors(){
    this.directorService.getDirectors()
    .subscribe(
      res => {
        this.directors = res;
      }
    )
  }

  //POST director
  addDirector(){
    this.router.navigate(['/admin-create-director']);
  }

  //PUT director
  editDirector(Director: Director){
    this.directorService.setDirector(Director);
    this.router.navigate(['/admin-edit-director']);
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
        this.deleteDirector(id);
      }
    })
  }

  //DELETE director
  deleteDirector(id: string){
    this.directorService.removeDirector(id)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully deleted.", "Director");
          this.getDirectors();
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
