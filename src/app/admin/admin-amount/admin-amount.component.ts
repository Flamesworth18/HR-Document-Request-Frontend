import { AmountService } from './../../services/amount.service';
import { Amount } from './../../models/amount.model';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-amount',
  templateUrl: './admin-amount.component.html',
  styleUrls: ['./admin-amount.component.scss']
})
export class AdminAmountComponent implements OnInit {

  amounts:Amount[] = []

  amount: Amount = {
    id: '',
    number: ''
  }

  constructor(
    private amountService: AmountService,
    public loader: LoaderService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAmounts();
  }

  //GET amounts
  getAmounts(){
    this.amountService.getAmounts()
    .subscribe(
      res => {
        this.amounts = res;
      }
    )
  }

  //POST amount
  createAmount(){
    this.router.navigate(['/admin-create-amount']);
  }

  //PUT amount
  editAmount(amount: Amount){
    this.amountService.setAmount(amount);
    this.router.navigate(['/admin-edit-amount']);
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
        this.deleteAmount(id);
      }
    })
  }

  //DELETE amount
  deleteAmount(id: string){
    this.amountService.removeAmount(id)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully deleted.", "Amount");
          this.getAmounts();
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
