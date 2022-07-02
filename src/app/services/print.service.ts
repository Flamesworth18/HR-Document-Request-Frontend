import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Print } from '../models/print.model';
import { Purpose } from '../models/purpose.model';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  print:Print = {
    firstName: '',
    lastName: '',
    rank: '',
    sex: ''
  }

  p:boolean = false;

  constructor() { }

  private _printData = new BehaviorSubject<Print>(this.print);
  printData = this._printData.asObservable();

  setPrintData(value: Print){
    this._printData.next(value);
  }

  private _isPrinting = new BehaviorSubject<boolean>(this.p);
  isPrinting = this._isPrinting.asObservable();

  isPrint(value: boolean){
    this._isPrinting.next(value);
  }

}
