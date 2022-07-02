import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../models/document.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  readonly typeURL = "https://localhost:7018/api/documents/";

  document: Document = {
    id: '',
    name: ''
  }

  constructor(
    private http: HttpClient
  ) { }

  //GET document types
  getDocuments(): Observable<Document[]>{
    return this.http.get<Document[]>(this.typeURL);
  }

  //ADD document type
  addDocument(document: Document): Observable<Document>{
    document.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Document>(this.typeURL, document);
  }

  //edit document type
  updateDocument(id: string, document: Document): Observable<Document>{
    document.id = '00000000-0000-0000-0000-000000000000';
    return this.http.put<Document>(this.typeURL + id, document);
  }

  //remove document type
  removeDocument(id: string): Observable<Document>{
    return this.http.delete<Document>(this.typeURL + id);
  }

  private _document = new BehaviorSubject<Document>(this.document);
  getDocument = this._document.asObservable();

  setDocument(document: any){
    this._document.next(document);
  }
}
