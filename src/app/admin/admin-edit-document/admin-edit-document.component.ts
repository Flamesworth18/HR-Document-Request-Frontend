import { DocumentService } from './../../services/document.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from 'src/app/models/document.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-document',
  templateUrl: './admin-edit-document.component.html',
  styleUrls: ['./admin-edit-document.component.scss']
})
export class AdminEditDocumentComponent implements OnInit {

  document:Document = {
    id: '',
    name: '',
  }

  tempDocument:Document = {
    id: '',
    name: '',
  }

  constructor(
    private router: Router,
    private documentService: DocumentService,
    private toastr: ToastrService,
    private auth: AuthService,
  ) { 

    this.documentService.getDocument.subscribe(d => this.tempDocument = d);

  }

  ngOnInit(): void {
  }

  navigateToDocumentList(){
    this.router.navigate(['/admin-document']);
  }

  editDocumentForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  });

  editDocument(){
    this.document.name = this.editDocumentForm.get('name')?.value || '';

    this.requestEditDocument(this.document);
  }

  requestEditDocument(document: Document){
    this.documentService.updateDocument(this.tempDocument.id ,document)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully updated.", document.name);
          this.router.navigate(['/admin-document'])
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
