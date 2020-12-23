import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentService} from './shared/payment.service';
import {PaymentComponent} from './payment.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PaymentComponent
  ],
  declarations: [
    PaymentComponent
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
