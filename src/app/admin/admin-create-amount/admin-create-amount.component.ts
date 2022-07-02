import { AmountService } from './../../services/amount.service';
import { Amount } from './../../models/amount.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-create-amount',
  templateUrl: './admin-create-amount.component.html',
  styleUrls: ['./admin-create-amount.component.scss']
})
export class AdminCreateAmountComponent implements OnInit {

  amount: Amount = {
    id: '',
    number: '',
  }

  constructor(
    private router: Router,
    private amountService: AmountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  navigateToAmountList(){
    this.router.navigate(['/admin-amount']);
  }

  addAmountForm = new FormGroup({
    number: new FormControl(null, [Validators.required]),
  });

  addAmount(){
    this.amount.number = this.addAmountForm.get('number')?.value || '';

    this.addAnotherAmount(this.amount);
  }

  addAnotherAmount(amount: Amount){
    this.amountService.addAmount(amount)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been created succesfully", amount.number);
          this.router.navigate(['/admin-amount']);
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
