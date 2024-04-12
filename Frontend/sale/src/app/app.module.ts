import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleUpdateFormComponent } from './sale-update-form/sale-update-form.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { DatePipe } from '@angular/common';
import { SaleNavComponent } from './sale-nav/sale-nav.component';
import { ToastComponent } from './toast/toast.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    SaleFormComponent,
    SaleUpdateFormComponent,
    SaleListComponent,
    SaleNavComponent,
    ToastComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe, ToastComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
