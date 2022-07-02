import { Amount } from './../models/amount.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmountService {

  readonly amountURL = "https://documentrequestapp.azurewebsites.net/api/amount/";

  amount: Amount = {
    id: '',
    number: ''
  }

  constructor(
    private http: HttpClient
  ) { }

  //GET amounts
  getAmounts(): Observable<Amount[]>{
    return this.http.get<Amount[]>(this.amountURL);
  }

  //ADD amount
  addAmount(amount: Amount): Observable<Amount>{
    amount.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Amount>(this.amountURL, amount);
  }

  //edit amount
  updateAmount(id: string, amount: Amount): Observable<Amount>{
    amount.id = '00000000-0000-0000-0000-000000000000';
    return this.http.put<Amount>(this.amountURL + id, amount);
  }

  //remove amount
  removeAmount(id: string): Observable<Amount>{
    return this.http.delete<Amount>(this.amountURL + id);
  }

  private _amount = new BehaviorSubject<Amount>(this.amount);
  getAmount = this._amount.asObservable();

  setAmount(amount: any){
    this._amount.next(amount);
  }
}
