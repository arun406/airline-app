
import { BookingService } from './../booking.service';
import { PnrService } from './../pnr.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Booking, Flight, Airport, Pet } from './../booking-request';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Create {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  IMAGE_UPLOAD_URL: string = "http://localhost:8080/bread";

  formGroup: FormGroup;
  pnr: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  enableSpinner = false;
  spinnermode = 'indeterminate';

  booking: Booking;
  createTypes: Create[] = [
    { value: '100 Series', viewValue: '30 (L) x 70 (W) x 30 (H) cm' },
    { value: '200 Series', viewValue: '30 (L) x 70 (W) x 30 (H) cm' },
    { value: '300 Series', viewValue: '30 (L) x 70 (W) x 30 (H) cm' },
    { value: '400 Series', viewValue: '30 (L) x 70 (W) x 30 (H) cm' },
    { value: '500 Series', viewValue: '30 (L) x 70 (W) x 30 (H) cm' },
    { value: '600 Series', viewValue: '30 (L) x 70 (W) x 30 (H) cm' }
  ];
  constructor(private httpClient: HttpClient, private router: Router, private formBuilder: FormBuilder, private pnrService: PnrService, private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.booking = new Booking();
    this.booking.Flight = new Flight();
    this.booking.Flight.to = new Airport();
    this.booking.Flight.from = new Airport();
    this.booking.Pet = new Pet();
    this.formGroup = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      attachment: '',
      Pet: this.formBuilder.group({
        type: 'Dog',
        name: '',
        breed: '',
        age: this.formBuilder.group({
          months: null,
          years: null
        }),
        weight: this.formBuilder.group({
          code: 'K',
          value: null
        })
      }),
      Pieces: 1,
      Weight: null,
      IsCreateAvailable: false,
      CreateType: '',
      CreateWeight: null,
      Dimensions: this.formBuilder.group({
        length: null,
        width: null,
        height: null,
        unit: this.formBuilder.group({
          unit: 'cm',
          value: null
        })
      }),
      Flight: this.formBuilder.group({
        from: this.formBuilder.group({
          code: null,
          name: ''
        }),
        to: this.formBuilder.group({
          code: null,
          name: ''
        }),
        date: '',
        carrier: '',
        number: '',
        suffix: ''
      }),
      Services: this.formBuilder.group({
        feeding: true,
        insurance: true,
        temperature: true
      })
    });
  }
  onSubmit(post) {


    this.booking = post;
    this.booking['@type'] = 'AirwayBill';
    this.booking['@id'] = undefined;
    this.booking['Url'] = undefined;
    this.booking['AirwayBillNumber'] = '901-1211212';
    this.booking['Date'] = new Date().toISOString
    // this.booking['ProductCode'] = 'GCR';
    // this.booking['ServiceCode'] = 'A';
    // this.booking['OriginDestination'] = 'LHR-JFK';
    this.booking['Shipper'] = 'Mr. Hellen Petri';
    this.booking['Consignee'] = 'Mr. Hellen Petri';
    // this.booking['TotalPieceCount'] = 1;
    // this.booking['ToatalULDCount'] = 1;
    // this.booking['TotalNetWeight'] = { value: 12, unit: 'K' };
    // this.booking['TotalTareWeight'] = { value: 15, unit: 'K' };;
    // this.booking['TotalGrossWet'] = { value: 15, unit: 'K' };
    // this.booking['TotalVolue'] = 0.5;
    // this.booking['TotalChargeAmount'] = { value: 100, unit: 'EUR' };
    // this.booking['attachment'] = undefined;
    // this.booking['pet'] = undefined;
    // this.booking['flight'] = undefined;
    this.booking.Pet.name = this.name;


    const formData = new FormData();
    formData.append('file', this.formGroup.get('attachment').value);
    formData.append('lo', JSON.stringify(this.booking));

    this.httpClient.post<any>("http://localhost:8080/companies/finnair/los", formData).subscribe(
      (res) => {
        console.log(res.loId);
        const loId = res.loId;
        this.router.navigate(['success', loId]);
      },
      (err) => console.log(err)
    );
  }

  public fetchReservation(breed: string) {
    this.booking.Pet.breed = breed;
    console.log('Breed : ' + this.booking.Pet.breed);
    this.pnrService.getPNRDetails('ord_00009jw0z8RxG5zDHtwofB').subscribe((response: any) => {
      console.log('Success')
      console.log(response.data);
      this.setValuesToForm(response.data, breed);
    }, (error) => { console.log(error) });
  }

  public setValuesToForm(data, breed) {
    const slice = data.slices[0];
    this.booking.Flight.to.code = slice.destination.iata_code;
    this.booking.Flight.to.name = slice.destination.name;
    this.booking.Flight.from.code = slice.origin.iata_code;
    this.booking.Flight.from.name = slice.origin.name;

    const segment = slice.segments[0];
    this.booking.Flight.carrier = segment.marketing_carrier.iata_code;
    this.booking.Flight.number = segment.marketing_carrier_flight_number;
    this.booking.Flight.date = new Date(segment.departure_datetime);

    this.formGroup.patchValue({
      flight: {
        from: {
          code: this.booking.Flight.from.code,
          name: this.booking.Flight.from.name
        },
        to: {
          code: this.booking.Flight.to.code,
          name: this.booking.Flight.to.name
        },
        date: this.booking.Flight.date,
        carrier: this.booking.Flight.carrier,
        number: this.booking.Flight.number,
        suffix: this.booking.Flight.suffix
      },
      pet: {
        breed: this.booking.Pet.breed,
        name: this.name
      }
    });
  }
  selectedFile: File;
  url: string;

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.booking.Pet.breed = undefined;
      this.selectedFile = event.target.files[0];
      this.formGroup.get('attachment').setValue(this.selectedFile);
      this.enableSpinner = true;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      var breed;
      this.pnrService.getBreed(this.IMAGE_UPLOAD_URL, this.selectedFile).subscribe(
        (response) => {
          console.log(response);
          breed = JSON.parse(JSON.stringify(response)).bread;
          console.log('Breed :::: ' + breed);
          this.fetchReservation(breed);
        },
        (error) => { console.log(error); });


    }
  }
}
