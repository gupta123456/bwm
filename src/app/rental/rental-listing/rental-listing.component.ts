
import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'bwm-rental-listing',
  templateUrl: './rental-listing.component.html',
  styleUrls: ['./rental-listing.component.scss']
})
export class RentalListingComponent implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService,private service:NgxSpinnerService) {}

  ngOnInit() {
    this.service.show();
    this.rentalService.getRentals()
      .subscribe((rentals: Rental[]) => {
        this.service.hide();
        this.rentals = rentals;
    });
  }
}
