import { Flight, Pet, Airport, Unit, Age } from './../booking-request';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../booking-request';
import { AppSettings } from  '../AppSettings';


export interface Status {
  code: string;
  description: string;
  stepIcon: string;
}
@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.css']
})
export class TrackingPageComponent implements OnInit {
  statusList: Status[] = [{
    code: 'BKGCFM',
    description: 'Confirmation',
    stepIcon: 'calendar-check'
  },
  {
    code: 'DOCACC',
    description: 'Document Verification',
    stepIcon: 'copy'
  },
  {
    code: 'ANCCFM',
    description: 'Ancillary Confirmation',
    stepIcon: 'check-circle'
  },
  {
    code: 'DRPREM',
    description: 'Drop Reminder',
    stepIcon: 'clock'
  },
  {
    code: 'ANCTMP',
    description: 'Temperature notification',
    stepIcon: 'temperature-high'
  },
  {
    code: 'ANCFEED',
    description: 'Feeding',
    stepIcon: 'concierge-bell'
  },
  {
    code: 'MFST',
    description: 'Manifest',
    stepIcon: 'shuttle-van'
  },
  {
    code: 'FLTDEP',
    description: 'Departure',
    stepIcon: 'plane-departure'
  }
  ];
  orderId: string = '';
  booking: Booking;


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = this.route.snapshot.params.id;
      console.log('Order Id : ' + this.orderId);
      if (this.orderId) {
        this.getBooking();
      }
    });
  }

  public getBooking() {
    console.log('Order Id : ' + this.orderId);
    this.httpClient.get(AppSettings.BOOKING_ENDPOINT + "/" + this.orderId).subscribe(
      (res: Booking) => {
        const result = res;
        this.booking = result;
        console.log(' Booking Fetched : ' + JSON.stringify(this.booking));
      },
      (error) => { console.log(error); }
    );
  }

}
