import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from 'src/app/booking-request';
import { AirwayBill } from './airwaybill';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  airwayBill: AirwayBill;
  constructor(private httpClient: HttpClient) { }

  createBooking(booking: Booking) {
    console.log(booking);
    this.airwayBill = new AirwayBill();
  }
}
