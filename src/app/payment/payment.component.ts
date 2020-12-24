import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {environment} from '../../environments/environment';
@Component({
  selector: 'bwm-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  stripe :any;
  elements:any;
  @ViewChild('cardNumber') cardNumRef: ElementRef;
  @ViewChild('cardExp') cardExpRef: ElementRef;
  @ViewChild('cardCvc') cardCvcRef: ElementRef;
  @Output() paymentConfirmed = new EventEmitter();
  isValidatingCard:boolean = false;
  token:any;
  error:any;
  
  constructor() {
    this.stripe = Stripe(environment.STRIPE_PK);
    this.elements = this.stripe.elements();
   }

  ngOnInit(): void {
  }



}

const style = {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '40px',
    fontWeight: 300,
    fontFamily: 'Helvetica Neue',
    fontSize: '15px',

    '::placeholder': {
      color: '#CFD7E0',
    },
  },
};
