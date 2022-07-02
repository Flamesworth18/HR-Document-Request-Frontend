import { Request } from '../models/request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  readonly requestURL = "https://documentrequestapp.azurewebsites.net/api/requests/";

  request: Request = {
    id: '',
    firstName: '',
    lastName: '',
    purpose: '',
    sex: '',
    rank: '',
    document: '',
    status: '',
    dateCreated: ''
  }

  constructor(
    private http: HttpClient
  ) { }

  //GET request
  getRequests(): Observable<Request[]>{
    return this.http.get<Request[]>(this.requestURL)
  }

  //ADD request
  addRequest(request: Request): Observable<Request>{
    request.id = '00000000-0000-0000-0000-000000000000';
    request.status = "Pending";

    return this.http.post<Request>(this.requestURL, request);
  }

  //edit request
  updateClientRequest(id: string, request: Request): Observable<Request>{
    request.id = '00000000-0000-0000-0000-000000000000';
    request.status = "Pending";
    return this.http.put<Request>(this.requestURL + id, request);
  }

  //edit request
  updateAdminRequest(id: string, request: Request): Observable<Request>{
    request.id = '00000000-0000-0000-0000-000000000000';
    return this.http.put<Request>(this.requestURL + id, request);
  }

  //remove request
  removeRequest(id: string): Observable<Request>{
    return this.http.delete<Request>(this.requestURL + id);
  }

  private _request = new BehaviorSubject<Request>(this.request);
  getRequest = this._request.asObservable();

  setRequest(request: any){
    this._request.next(request);
  }
}
