import { StatusService } from './../../services/status.service';
import { RankService } from './../../services/rank.service';
import { DirectorService } from '../../services/director.service';
import { PurposeService } from '../../services/purpose.service';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Print } from 'src/app/models/print.model';
import { PrintService } from 'src/app/services/print.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Purpose } from 'src/app/models/purpose.model';
import { LoaderService } from 'src/app/services/loader.service';
import { Director } from 'src/app/models/director.model';
import { Rank } from 'src/app/models/rank.model';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-print',
  templateUrl: './print-coe.component.html',
  styleUrls: ['./print-coe.component.scss']
})
export class PrintCOEComponent implements OnInit {

  startedDatePipe: DatePipe = new DatePipe('en-US');
  currentDatePipe: DatePipe = new DatePipe('en-US');

  p:Print = {
    firstName: '',
    lastName: '',
    rank: '',
    sex: ''
  }

  genderIdentifier:string = "";

  date: string = '';
  day: any;
  monthYear: any;

  purposes: Purpose[] = [];
  directors: Director[] = [];
  ranks: Rank[] = [];
  statuses: Status[] = [];

  constructor(
    private printService: PrintService,
    private router: Router,
    public loader: LoaderService,
    private purposeService: PurposeService,
    private directorService: DirectorService,
    private cdr: ChangeDetectorRef,
    private rankService: RankService,
    private statusService: StatusService
  ) {

    this.printService.printData.subscribe(p => this.p = p);
    this.getGender();
    this.getCurrentDate();

   }

  async ngOnInit() {
    this.getPurposes();
    this.getDirectors();
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
    if(this.date === '' || this.p.firstName === ''){
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

  getStartedDate(){
    var d;
    if(this.date !== ''){
      var date = new Date(this.date);
      d = this.startedDatePipe.transform(date, 'EEEE, MMMM d, y');
    }

    return d
  }

  getCurrentDate(){
    var currDate = new Date();
    this.day = this.currentDatePipe.transform(currDate, 'd');
    this.monthYear = this.currentDatePipe.transform(currDate, 'MMMM y');
    
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

