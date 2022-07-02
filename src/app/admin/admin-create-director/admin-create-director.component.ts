import { Director } from './../../models/director.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirectorService } from 'src/app/services/director.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create-director',
  templateUrl: './admin-create-director.component.html',
  styleUrls: ['./admin-create-director.component.scss']
})
export class AdminCreateDirectorComponent implements OnInit {

  director: Director = {
    id: '',
    name: '',
  }

  constructor(
    private router: Router,
    private directorService: DirectorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  navigateToDirectorList(){
    this.router.navigate(['/admin-director']);
  }

  addDirectorForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  addDirector(){
    this.director.name = this.addDirectorForm.get('name')?.value || '';

    this.addAnotherDirector(this.director);
  }

  addAnotherDirector(director: Director){
    this.directorService.addDirector(director)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been created succesfully", director.name);
          this.router.navigate(['/admin-director']);
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
