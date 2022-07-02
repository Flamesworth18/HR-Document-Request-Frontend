import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCount } from '../models/requestCount.model';

@Injectable({
  providedIn: 'root'
})
export class RequestCountService {

  readonly requestCountURL = "https://localhost:7018/api/requestcount/";

  constructor(
    private http: HttpClient
  ) { }

  getTotals(): Observable<RequestCount>{
    return this.http.get<RequestCount>(this.requestCountURL)
  }
}
