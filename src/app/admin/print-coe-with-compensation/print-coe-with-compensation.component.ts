import { StatusService } from './../../services/status.service';
import { RankService } from './../../services/rank.service';
import { Amount } from 'src/app/models/amount.model';
import { AmountService } from './../../services/amount.service';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Director } from 'src/app/models/director.model';
import { Print } from 'src/app/models/print.model';
import { Purpose } from 'src/app/models/purpose.model';
import { DirectorService } from 'src/app/services/director.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PrintService } from 'src/app/services/print.service';
import { PurposeService } from 'src/app/services/purpose.service';
import Swal from 'sweetalert2';
import { Rank } from 'src/app/models/rank.model';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-print-coe-with-compensation',
  templateUrl: './print-coe-with-compensation.component.html',
  styleUrls: ['./print-coe-with-compensation.component.scss']
})
export class PrintCoeWithCompensationComponent implements OnInit {

  datePipe: DatePipe = new DatePipe('en-US');

  p:Print = {
    firstName: '',
    lastName: '',
    rank: '',
    sex: ''
  }

  genderIdentifier:string = "";

  fromDate: string = '';
  toDate: string = '';
  day: any;
  monthYear: any;

  purposes: Purpose[] = [];
  directors: Director[] = [];
  amounts: Amount[] = [];
  ranks: Rank[] = [];
  statuses: Status[] = [];

  constructor(
    private printService: PrintService,
    private router: Router,
    public loader: LoaderService,
    private purposeService: PurposeService,
    private directorService: DirectorService,
    private amountService: AmountService,
    private cdr: ChangeDetectorRef,
    private rankService:RankService,
    private statusService: StatusService
  ) {

    this.printService.printData.subscribe(p => this.p = p);
    this.getGender();
    this.getCurrentDate();

   }

  async ngOnInit() {
    this.getPurposes();
    this.getDirectors();
    this.getAmounts();
    this.getRanks();
    this.getStatuses();
  }

  ngOnDestroy(): void {
    sessionStorage.setItem('printing', JSON.stringify(false));
    this.printService.isPrint(false)
  }

  getPurposes(){
    this.purposeService.getPurposes()
    .subscribe(
      res => {
        this.purposes = res;
        this.cdr.detectChanges();
      }
    )
  }

  getDirectors(){
    this.directorService.getDirectors()
    .subscribe(
      res => {
        this.directors = res;
      }
    )
  }

  getAmounts(){
    this.amountService.getAmounts()
    .subscribe(
      res => {
        this.amounts = res;
      }
    )
  }

  getRanks(){
    this.rankService.getRanks()
    .subscribe(
      res => {
        this.ranks = res;
      }
    )
  }
  
  getStatuses(){
    this.statusService.getStatuses()
    .subscribe(
      res => {
        this.statuses = res;
      }
    )
  }

  print(){
    if(this.fromDate === '' || this.toDate === '' || this.p.firstName === ''){
      Swal.fire({
        icon: 'error',
        title: 'Print Denied',
        text: 'Inputs are not specified!',
      })
    }
    else{
      window.print();
    }
  }

  back(){
    sessionStorage.setItem('printing', JSON.stringify(false));
    this.router.navigate(['/admin-accepted-request'])
  }

  getGender(){

    if(this.p.sex.toUpperCase() === "MALE"){
      this.genderIdentifier =  "His";
    }
    else if(this.p.sex.toUpperCase() === "FEMALE"){
      this.genderIdentifier = "Her";
    }
  }

  getFromDate(){
    var d;
    if(this.fromDate !== ''){
      var date = new Date(this.fromDate);
      d = this.datePipe.transform(date, 'EEEE, MMMM d, y');
    }

    return d
  }

  getToDate(){
    var d;
    if(this.toDate !== ''){
      var date = new Date(this.toDate);
      d = this.datePipe.transform(date, 'EEEE, MMMM d, y');
    }

    return d
  }

  getCurrentDate(){
    var currDate = new Date();
    this.day = this.datePipe.transform(currDate, 'd');
    this.monthYear = this.datePipe.transform(currDate, 'MMMM y');
    
    if(this.day === '1'){
      this.day = this.day + 'st'
    }
    else if(this.day === '2'){
      this.day = this.day + 'nd';
    }
    else if(this.day === '3'){
      this.day = this.day + 'rd';
    }
    else{
      this.day = this.day + 'th';
    }
  }

}
