import { Purpose } from './../models/purpose.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurposeService {

  readonly purposeURL = "https://localhost:7018/api/purpose/";

  purpose: Purpose = {
    id: '',
    name: ''
  }

  constructor(private http: HttpClient) { }

  //GET purposes
  getPurposes(): Observable<Purpose[]>{
    return this.http.get<Purpose[]>(this.purposeURL);
  }

  //ADD purpose
  addPurpose(purpose: Purpose): Observable<Purpose>{
    purpose.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Purpose>(this.purposeURL, purpose);
  }

  //edit purpose
  updatePurpose(id: string, purpose: Purpose): Observable<Purpose>{
    purpose.id = '00000000-0000-0000-0000-000000000000';
    return this.http.put<Purpose>(this.purposeURL + id, purpose);
  }

  //remove purpose
  removePurpose(id: string): Observable<Purpose>{
    return this.http.delete<Purpose>(this.purposeURL + id);
  }

  private _purpose = new BehaviorSubject<Purpose>(this.purpose);
  getpurpose = this._purpose.asObservable();

  setPurpose(purpose: any){
    this._purpose.next(purpose);
  }
}
