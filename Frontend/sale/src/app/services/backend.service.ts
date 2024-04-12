import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { Customer } from '../models/customer.model';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  port: number;
  constructor(private http: HttpClient) { 
    this.port = 5050;
  }

  getAllSale(): Observable<Sale[]>{
    return this.http.get<Sale[]>(`http://localhost:${this.port}/sales`)
  }

  getAllCar(): Observable<Car[]>{
    return this.http.get<Car[]>(`http://localhost:${this.port}/cars`)
  }

  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`http://localhost:${this.port}/customers`)
  }

  getBySaleId(id: number): Observable<Sale>{
    return this.http.get<Sale>(`http://localhost:${this.port}/sales/${id}`)
  }

  postSale(saleJSON: Sale): Observable<Sale>{
    return this.http.post<Sale>(`http://localhost:${this.port}/sales`, saleJSON)
  }

  updateSale(id: number, saleJSON: Sale): Observable<Sale>{
    return this.http.patch<Sale>(`http://localhost:${this.port}/sales/${id}`, saleJSON)
  }

  deleteSale(id: number): Observable<string>{
    return this.http.delete<string>(`http://localhost:${this.port}/sales/${id}`)
  }
}
