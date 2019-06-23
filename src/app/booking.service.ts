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
    console.log(" in service");
    console.log(booking);

    this.airwayBill = new AirwayBill();
    this.airwayBill.Carrier = booking.flight.carrier;
    this.airwayBill.Date = new Date().toISOString();
    this.airwayBill.Consignee = booking.consignee;
    this.airwayBill.Shipper = booking.shipper;
    this.airwayBill.TotalPieceCount = booking.pieces;
    this.airwayBill.TotalNetWeight = booking.pet.weight.value;
    // this.airwayBill.TotalVolume = booking.dimensions
    this.airwayBill.type = "AirwayBill";
    this.airwayBill.ServiceCode = "PET";
    this.airwayBill.AirlineProductIdentifier = "PET";
    this.airwayBill.AirlineProductName = "Pet Booking product";
    this.airwayBill.OriginDestination = booking.flight.from.code + "-" + booking.flight.to.code;
    this.airwayBill.FreightForwarder = null;
    this.airwayBill.OtherParty = null;
    this.airwayBill.context = new Context();
    this.airwayBill.context.vocab = "http://cargo.iata.org#";
    this.airwayBill.AirWaybillNumber = "888-98988121";
    this.airwayBill.PaymentMethodCode = "CC";
    this.airwayBill.CustomsInformation = null;
    this.airwayBill.SecurityInformation = null;
    this.airwayBill.Insurance = null;
    const formData = new FormData();
    // formData.append("file")

    return this.httpClient.post(AppSettings.CARRIER_ENDPOINT, this.airwayBill);
  }

  getBooking(id: string) {
    return this.httpClient.get(AppSettings.CARRIER_ENDPOINT + "/" + id);
  }
}
