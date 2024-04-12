import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { SaleListComponent } from './sale-list/sale-list.component';


const routes: Routes = [
  {path: 'create-sale', component: SaleFormComponent},
  {path: 'view-sale', component: SaleListComponent},
  {path: '', redirectTo: 'create-sale', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
