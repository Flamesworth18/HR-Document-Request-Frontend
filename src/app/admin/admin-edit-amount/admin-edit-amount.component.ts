import { AmountService } from './../../services/amount.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Amount } from 'src/app/models/amount.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-amount',
  templateUrl: './admin-edit-amount.component.html',
  styleUrls: ['./admin-edit-amount.component.scss']
})
export class AdminEditAmountComponent implements OnInit {

  amount:Amount = {
    id: '',
    number: '',
  }

  tempAmount:Amount = {
    id: '',
    number: '',
  }

  constructor(
    private router: Router,
    private amountService: AmountService,
    private toastr: ToastrService,
    private auth: AuthService,
  ) { 

    this.amountService.getAmount.subscribe(a => this.tempAmount = a);

  }

  ngOnInit(): void {
  }

  navigateToAmountList(){
    this.router.navigate(['/admin-amount']);
  }

  editAmountForm = new FormGroup({
    number: new FormControl(null, [Validators.required])
  });

  editAmount(){
    this.amount.number = this.editAmountForm.get('number')?.value || '';

    this.requestEditAmount(this.amount);
  }

  requestEditAmount(amount: Amount){
    this.amountService.updateAmount(this.tempAmount.id ,amount)
    .subscribe(
      res => {
        setTimeout(() => {
          this.toastr.success("has been successfully updated.", amount.number);
          this.router.navigate(['/admin-amount'])
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
