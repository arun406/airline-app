import { Pet } from './../booking-request';
import { AppSettings } from './../AppSettings';
import { HttpClient } from '@angular/common/http';
import { BookingService } from './../booking.service';
import { Booking, Pet, Flight, Dimension, Airport } from 'src/app/booking-request';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.css']
})
export class TrackingPageComponent implements OnInit {

  isLinear = false;
  booking: Booking;
  flags = {
    ordered: true,
    confirmed: false,
    documented: false,
    accepted: false,
    boarded: false,
    departed: false
  }


  orderId: string = '';
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.booking = new Booking();
    this.booking.DocumentList = [];
    this.route.paramMap.subscribe(params => {
      this.orderId = this.route.snapshot.params.id;
      console.log('Order Id : ' + this.orderId);
      this.httpClient.get(AppSettings.AIRLINE_SERVER + "/" + this.orderId).subscribe(
        (success) => {
          console.log(success);
          this.booking = new Booking();
          this.booking.Pet = success.logisticsObject.Pet;
          this.booking.Flight = success.logisticsObject.Flight;
          this.booking.Flight.from = new Airport();
          this.booking.Flight.to = new Airport();
          this.booking.Dimensions = new Dimension();
          this.booking.DocumentList = success.logisticsObject.DocumentList;

          console.log(this.booking);
        },
        (error) => { console.log(error); }
      )
    });



  }

}
