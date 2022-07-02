import { Status } from './../models/status.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  readonly statusURL = "https://documentrequestapp.azurewebsites.net/api/status/";

  status: Status = {
    id: '',
    name: ''
  }

  constructor(private http: HttpClient) { }

  //GET statuses
  getStatuses(): Observable<Status[]>{
    return this.http.get<Status[]>(this.statusURL);
  }

  //ADD status
  addStatus(status: Status): Observable<Status>{
    status.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Status>(this.statusURL, status);
  }

  //edit status
  updateStatus(id: string, status: Status): Observable<Status>{
    status.id = '00000000-0000-0000-0000-000000000000';
    return this.http.put<Status>(this.statusURL + id, status);
  }

  //remove status
  removeStatus(id: string): Observable<Status>{
    return this.http.delete<Status>(this.statusURL + id);
  }

  private _status = new BehaviorSubject<Status>(this.status);
  getStatus = this._status.asObservable();

  setStatus(status: any){
    this._status.next(status);
  }
}
