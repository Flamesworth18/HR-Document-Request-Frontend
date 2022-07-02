import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create-document',
  templateUrl: './admin-create-document.component.html',
  styleUrls: ['./admin-create-document.component.scss']
})
export class AdminCreateDocumentComponent implements OnInit {

  document: Document = {
    id: '',
    name: '',
  }

  constructor(
    private router: Router,
    private documentService: DocumentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  navigateToUserList(){
    this.router.navigate(['/admin-document']);
  }

  createDocumentForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  createDocument(){
    this.document.name = this.createDocumentForm.get('name')?.value || '';

    this.createAnotherDocument(this.document);
  }

  createAnotherDocument(document: Document){
    this.documentService.addDocument(document)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been created succesfully", document.name);
          this.router.navigate(['/admin-document']);
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
