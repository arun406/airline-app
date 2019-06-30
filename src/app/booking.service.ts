import { AppSettings } from './AppSettings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from 'src/app/booking-request';
import { AirwayBill, Context } from './airwaybill';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  airwayBill: AirwayBill;
  constructor(private httpClient: HttpClient) { }

  createBooking(booking: Booking) {
    
  }

  getBooking(id: string) {
  }
}
