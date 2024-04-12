import { Car } from "./car.model";
import { Customer } from "./customer.model";

export interface Sale {
    saleId: number,
    car: Car,
    customer: Customer,
    salePrice: number,
    saleDate: Date,
    editable: Boolean
    clicked: Boolean
    originalIndex: number
}
