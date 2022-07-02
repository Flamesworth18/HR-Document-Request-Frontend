import { RankService } from './../../services/rank.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rank } from 'src/app/models/rank.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-rank',
  templateUrl: './admin-edit-rank.component.html',
  styleUrls: ['./admin-edit-rank.component.scss']
})
export class AdminEditRankComponent implements OnInit {

  rank:Rank = {
    id: '',
    name: '',
  }

  tempRank:Rank = {
    id: '',
    name: '',
  }

  constructor(
    private router: Router,
    private rankService: RankService,
    private toastr: ToastrService,
    private auth: AuthService,
  ) {

    this.rankService.getRank.subscribe(r => this.tempRank = r);

   }

  ngOnInit(): void {
  }

  navigateToRankList(){
    this.router.navigate(['/admin-rank']);
  }

  editRankForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  });

  editRank(){
    this.rank.name = this.editRankForm.get('name')?.value || '';

    this.requestEditRank(this.rank);
  }

  requestEditRank(rank: Rank){
    this.rankService.updateRank(this.tempRank.id ,rank)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully updated.", rank.name);
          this.router.navigate(['/admin-rank'])
        }, 3000);
      },
      err => {
        console.log(rank)
        setTimeout(() => {
          this.toastr.error("An error occured");
        }, 3000);
      }
    )
  }
}
