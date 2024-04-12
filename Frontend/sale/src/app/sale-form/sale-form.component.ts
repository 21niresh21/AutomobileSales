import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Car } from '../models/car.model';
import { Customer } from '../models/customer.model';
import { Sale } from '../models/sale.model';
import { BackendService } from '../services/backend.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {

  showMsg: boolean = false
  @Input() sale: any
  cars: Car[]
  customers: Customer[]
  sales: Sale[]
  constructor(private backend: BackendService) { }

  ngOnInit() {

    this.backend.getAllSale().subscribe(
      (sales) => this.sales = sales
    )

    this.backend.getAllCar().subscribe(
      (cars) => this.cars = cars
    )

    this.backend.getAllCustomer().subscribe(
      (customers) => this.customers = customers
    )

    this.saleForm.valueChanges.subscribe((formData) => {
      const customerControl = this.saleForm.get('customer');
      customerControl.valueChanges.pipe(debounceTime(700)).subscribe(
        (data) => {
          //this.invalidCustomer = false
          if(data == null || data == '')return
          const customer = this.customers.find((c) => c.customerName == data)
          if(customer == undefined){
            this.invalidCustomer = true
          } else{
            this.invalidCustomer = false
          }
        }
      )

      const carControl = this.saleForm.get('car');
      carControl.valueChanges.pipe(debounceTime(700)).subscribe(
        (data) => {
          if(data == null || data == '')return
          const car = this.cars.find((c) => c.brand == data)
          if(car == undefined){
            this.invalidCar = true
          } else{
            this.invalidCar = false
          }
        }
      )
      
    })
    

  }

  removeErrorCustomer(){
    this.invalidCustomer = false
  }

  removeErrorCar(){
    this.invalidCar = false
  }


  saleForm = new FormGroup({
    salePrice: new FormControl(),
    saleDate: new FormControl(),
    customer: new FormControl(),
    car: new FormControl()
  })

   submit(salePostData: any) {

    this.backend.postSale(salePostData).subscribe(
      () => {this.saleForm.reset();
        this.showMsg=true
        setTimeout(() => {
          this.showMsg=false
        }, 3000);
        
      }
    )
  }

  invalidCustomer: boolean = false
  invalidCar: boolean = false
  invalidPrice: boolean = false
  invalidPriceMsg: string
  validate() {
    let flag: boolean = true
    let salePostData = this.saleForm.value

    const oneCustomer = this.customers.find(
      (customer) => customer.customerName === salePostData.customer
      )
      const oneCar = this.cars.find((car) => car.brand === salePostData.car)
      console.log(oneCustomer);
      
    if(oneCustomer == undefined) {
      this.invalidCustomer = true
      flag = false
    }
    if(oneCar == undefined) {
      this.invalidCar = true
      flag = false
    }
    if(salePostData.salePrice == null){
      this.invalidPriceMsg = 'Entered price is not a number'
      this.invalidPrice = true
      flag = false
    }
    if(salePostData.salePrice < 0){
      this.invalidPriceMsg = 'Price cannot be negative'
      this.invalidPrice = true
      flag = false
    }
    if(flag == false){
      return
    }

    salePostData.customer = {customerId: oneCustomer.customerId}
    

    
    salePostData.car = {id: oneCar.id}

    this.submit(salePostData)
  }

  
}
