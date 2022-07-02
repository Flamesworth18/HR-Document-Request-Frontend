import { RankService } from './../../services/rank.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rank } from 'src/app/models/rank.model';

@Component({
  selector: 'app-admin-create-rank',
  templateUrl: './admin-create-rank.component.html',
  styleUrls: ['./admin-create-rank.component.scss']
})
export class AdminCreateRankComponent implements OnInit {

  rank:Rank = {
    id: '',
    name: ''
  }

  constructor(
    private router: Router,
    private rankService: RankService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  navigateToRankList(){
    this.router.navigate(['/admin-rank']);
  }

  createRankForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  createRank(){
    this.rank.name = this.createRankForm.get('name')?.value || '';

    this.createAnotherRank(this.rank);
  }

  createAnotherRank(rank: Rank){
    this.rankService.addRank(rank)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been created succesfully", rank.name);
          this.router.navigate(['/admin-rank']);
        }, 3000);
      },
      err => {
        setTimeout(() => {
          this.toastr.error("An error occured!")
        }, 3000);
      }
    )
  }
}
