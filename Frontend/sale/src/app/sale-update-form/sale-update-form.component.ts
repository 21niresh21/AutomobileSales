import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sale } from '../models/sale.model';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-sale-update-form',
  templateUrl: './sale-update-form.component.html',
  styleUrls: ['./sale-update-form.component.css']
})
export class SaleUpdateFormComponent implements OnInit {

  salePresent: boolean = true
  childSale: Sale
  constructor(private backend: BackendService) { }

  ngOnInit() {
  }

  saleUpdateForm = new FormGroup({
    id: new FormControl(),
    saleDate: new FormControl(),
    salePrice: new FormControl(),
    car: new FormControl(),
    customer: new FormControl(),
    // car: new FormControl()
  })

  fetchDetails() {
    // console.log(this.saleUpdateForm.value);
    
    this.backend.getBySaleId(this.saleUpdateForm.value.id).subscribe(
      (sale) => {
        this.salePresent = true
        console.log(sale);
        this.childSale = sale;
        this.saleUpdateForm.get('salePrice').patchValue(sale.salePrice)
        const tempDate = new Date(sale.saleDate).toISOString().split('T')[0]
        this.saleUpdateForm.get('saleDate').patchValue(tempDate)
      },
      (err) => {
        this.salePresent = false
        console.log('no sale with that id')
      }
    )
  }

}
