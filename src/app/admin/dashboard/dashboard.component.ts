import { RequestCountService } from './../../services/request-count.service';
import { Component, OnInit } from '@angular/core';
import { RequestCount } from 'src/app/models/requestCount.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  requestCount: RequestCount = {
    id: '',
    totalCount: 0,
    todayCount: 0
  }

  constructor(
    private requestCountService: RequestCountService
  ) { }

  ngOnInit(): void {
    this.getTotalRequests();
  }

  getTotalRequests(){
    this.requestCountService.getTotals()
    .subscribe(
      res => {
        this.requestCount = res;
      }
    )
  }

}
