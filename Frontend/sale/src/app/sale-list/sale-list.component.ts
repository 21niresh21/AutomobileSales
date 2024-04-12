import { Component, OnInit } from '@angular/core';
import { Sale } from '../models/sale.model';
import { BackendService } from '../services/backend.service';
import { DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { Customer } from '../models/customer.model';
import { Car } from '../models/car.model';
import { ToastComponent } from '../toast/toast.component';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css'],
  animations: [
    trigger('shuffleRows', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(-20%)' }),
        animate('0.5s linear', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class SaleListComponent implements OnInit {
  state: string = '';
  sales: Sale[];
  customers: Customer[];
  cars: Car[];
  constructor(private backend: BackendService, 
    private datePipe: DatePipe,
    private toast: ToastComponent) { }

  ngOnInit() {
    this.backend.getAllSale().subscribe(
      (sales) => {
        this.sales = sales.map((sale, index) => ({ ...sale, originalIndex: index }));
        this.sales.map((sale) => sale.editable = false)
      }
    )

    this.backend.getAllCustomer().subscribe(
      (customers) => this.customers = customers
    )

    this.backend.getAllCar().subscribe(
      (cars) => this.cars = cars
    )

  }

  trackBySaleId(index: number, sale: Sale): number {
    return sale.saleId; // Track sales by their saleId
  }

  validateCar(value: string) {
    this.invalidCar = false
  }

  validateCustomer(value: string) {
    this.invalidCustomer = false
  }

  validatePrice(value: string) {
    this.invalidPrice = false
  }

  showToast: boolean = false;
  toastTitle: string;
  toastMessage: string;
  deletedSale: Sale;
  onDelete(sale: Sale): void {
    this.deletedSale = sale;
    this.showToast = true;
    this.toastTitle = 'Sale Deleted';
    this.toastMessage = `Sale with ID ${sale.saleId} deleted`;
    this.sales = this.sales.filter((s)=>s.saleId != sale.saleId)
    setTimeout(() => {
      this.showToast = false;
      console.log('badd');
      if(this.clickedUndo == false) {
        this.deleteSale(sale.saleId);
      }
      
    }, 5000); // Hide toast after 5 seconds (adjust as needed)
  }

  clickedUndo: boolean = false
  undoDelete(): void {
    // Implement logic to undo the delete action
    // For example, add the deleted sale back to the list
    this.clickedUndo = true
    this.sales.push(this.deletedSale);
    this.showToast = false;
  }

  deleteSale(id: number) {
    this.sales = this.sales.filter(
      (sale) => sale.saleId !== id
    )
    this.backend.deleteSale(id).subscribe(
      (response) => console.log(response)
    )
  }

  editable: boolean = false
  tempSale: Sale;
  editSale(sale: Sale) {
    sale.editable = true
    console.log('after click')
    console.log(sale);
    
    this.tempSale = JSON.parse(JSON.stringify(sale))  
    console.log(this.tempSale)
  }

  cancelEdit(sale: Sale) {
    sale.editable = false
    console.log(this.tempSale);
    this.tempSale.editable = false
    const saleID = this.sales.findIndex((s)=>s.saleId==this.tempSale.saleId)
    this.sales[saleID] = this.tempSale
    console.log(this.sales);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  invalidPrice: boolean = false
  invalidPriceMsg: string
  invalidCustomer: boolean = false
  invalidCar: boolean = false
  updateSale(sale: Sale) {
    console.log(sale);
    let flag: boolean = true
    let customer = this.customers.find((c) => c.customerName == sale.customer.customerName)
    let car = this.cars.find((car) => car.brand === sale.car.brand)
    if(customer == undefined) {
      this.invalidCustomer = true
    }
    if(car == undefined) {
      this.invalidCar = true
      flag = false
    }
    if(sale.salePrice == null){
      this.invalidPriceMsg = 'Invalid entry'
      this.invalidPrice = true
      flag = false
    }
    if(sale.salePrice < 0){
      this.invalidPriceMsg = 'Price cannot be negative'
      this.invalidPrice = true
      flag = false
    }
    
    if(!flag){
      return
    }
    sale.car.id = car.id
    sale.customer.customerId = customer.customerId
    this.backend.updateSale(sale.saleId, sale).subscribe(
      () => {
        console.log('updated')
        sale.editable = false
      }
    )
    
  }

  updateSaleDate(sale: Sale, dateString: string): void {
    // Convert the string date to a Date object
    const date = new Date(dateString);
    // Update selectedDate
    sale.saleDate = date;
  }

  saleIdSort: number = 1
  carSort: number = 1
  customerSort: number = 1
  dateSort: number = 1
  priceSort: number = 1
  isSorting: boolean = false
  sortCounter: number = 0;
  animateRows: boolean = false
  sortBySaleId(): void {
    // this.state = (this.sortCounter++ % 2 === 0) ? 'in' : 'out';
    this.animateRows = true;
    
    this.saleIdSort = this.saleIdSort==1?2:1
    
    this.isSorting = true
    this.sales.forEach((sale, index) => sale.originalIndex = index);
    setTimeout(() => {
      this.isSorting = false;
      // this.animateRows = !this.animateRows
    }, 2000);
    if(this.saleIdSort == 1)this.sales.sort((a, b) => a.saleId - b.saleId);
    else this.sales.sort((a, b) => b.saleId - a.saleId);
     // Trigger animation4
     
    // setTimeout(() => , 600);
  }

  sortByCar(): void {
    
    this.carSort = this.carSort==1?2:1
    this.isSorting = true
    setTimeout(() => {
      this.isSorting = false;
    }, 600);
    
    if(this.carSort == 1)this.sales.sort((a, b) => a.car.brand.localeCompare(b.car.brand));
    else this.sales.sort((a, b) => b.car.brand.localeCompare(a.car.brand));
    this.animateRows = !this.animateRows;
  }

  sortByCustomer(): void {
    this.animateRows = !this.animateRows;
    this.customerSort = this.customerSort==1?2:1
    this.isSorting = true
    setTimeout(() => {
      this.isSorting = false;
    }, 600);
    if(this.customerSort == 1)this.sales.sort((a, b) => a.customer.customerName.localeCompare(b.customer.customerName));
    else this.sales.sort((a, b) => b.customer.customerName.localeCompare(a.customer.customerName));
    
  }

  sortByDate(): void {
    this.animateRows = !this.animateRows;
    this.dateSort = this.dateSort==1?2:1
    this.isSorting = true
    setTimeout(() => {
      this.isSorting = false;
    }, 600);
    if(this.dateSort == 1)this.sales.sort((a, b) => new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime());
    else this.sales.sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());
    
  }

  sortByPrice(): void {
    this.animateRows = !this.animateRows;
    this.priceSort = this.priceSort==1?2:1
    this.isSorting = true
    setTimeout(() => {
      this.isSorting = false;
    }, 600);
    if(this.priceSort == 1) this.sales.sort((a, b) => a.salePrice - b.salePrice);
    else this.sales.sort((a, b) => b.salePrice - a.salePrice);

  }
}
