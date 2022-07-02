import { RankService } from './../../services/rank.service';
import { Component, OnInit } from '@angular/core';
import { Rank } from 'src/app/models/rank.model';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-rank',
  templateUrl: './admin-rank.component.html',
  styleUrls: ['./admin-rank.component.scss']
})
export class AdminRankComponent implements OnInit {

  ranks: Rank[] = [];
  rank: Rank = {
    id: '',
    name: ''
  }

  constructor(
    private rankService: RankService,
    public loader: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getRanks();
  }

  //GET ranks
  getRanks(){
    this.rankService.getRanks()
    .subscribe(
      res => {
        this.ranks = res;
      }
    )
  }

  //POST rank
  createRank(){
    this.router.navigate(['/admin-create-rank']);
  }

  //PUT rank
  editRank(rank: Rank){
    this.rankService.setRank(rank);
    this.router.navigate(['/admin-edit-rank']);
  }

  confirmDelete(id: string){
    Swal.fire({
      title: "Are you sure you want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if(result.value){
        this.deleteRank(id);
      }
    })
  }

  //DELETE document
  deleteRank(id: string){
    this.rankService.removeRank(id)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully deleted.", "Rank");
          this.getRanks();
        }, 3000);
      },
      err => {
        setTimeout(() => {
          this.toastr.error("An error occured");
        }, 3000);
      }
    )
  }

}
