import { DocumentService } from './../../services/document.service';
import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/models/document.model';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-document',
  templateUrl: './admin-document.component.html',
  styleUrls: ['./admin-document.component.scss']
})
export class AdminDocumentComponent implements OnInit {

  documents:Document[] = []

  document: Document = {
    id: '',
    name: ''
  }

  constructor(
    private documentService: DocumentService,
    public loader: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  //GET documents
  getDocuments(){
    this.documentService.getDocuments()
    .subscribe(
      res => {
        this.documents = res;
      }
    )
  }

  //POST document
  createDocument(){
    this.router.navigate(['/admin-create-document']);
  }

  //PUT document
  editDocument(document: Document){
    this.documentService.setDocument(document);
    this.router.navigate(['/admin-edit-document']);
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
        this.deleteDocument(id);
      }
    })
  }

  //DELETE document
  deleteDocument(id: string){
    this.documentService.removeDocument(id)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully deleted.", "Document");
          this.getDocuments();
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
