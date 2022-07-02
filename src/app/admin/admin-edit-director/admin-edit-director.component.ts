import { Director } from './../../models/director.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirectorService } from 'src/app/services/director.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-director',
  templateUrl: './admin-edit-director.component.html',
  styleUrls: ['./admin-edit-director.component.scss']
})
export class AdminEditDirectorComponent implements OnInit {

  director:Director = {
    id: '',
    name: '',
  }

  tempDirector:Director = {
    id: '',
    name: '',
  }

  constructor(
    private router: Router,
    private directorService: DirectorService,
    private toastr: ToastrService,
    private auth: AuthService,
  ) { 

    this.directorService.getDirector.subscribe(d => this.tempDirector = d);

  }

  ngOnInit(): void {
  }

  navigateToDirectorList(){
    this.router.navigate(['/admin-director']);
  }

  editDirectorForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  });

  editDirector(){
    this.director.name = this.editDirectorForm.get('name')?.value || '';

    this.requestEditDirector(this.director);
  }

  requestEditDirector(director: Director){
    this.directorService.updateDirector(this.tempDirector.id ,director)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully updated.", director.name);
          this.router.navigate(['/admin-director'])
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
