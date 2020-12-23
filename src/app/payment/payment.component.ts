import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
@Component({
  selector: 'bwm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  stripe :any;
  elements:any;
  constructor() {
    this.stripe = Stripe('pk_test_JixX22raoOQ5BjGOdwYKsMSp00rHGQcczR');
    this.elements = this.stripe.elements(environment.STRIPE_PK);
   }

  ngOnInit(): void {
  }

}
