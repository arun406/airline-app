import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PnrService } from '../pnr.service';
import { BookingService } from '../booking.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../AppSettings';

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
  form = {
    passenger: {
      pnr: 'QWERT',
      name: 'Muthukkumar/MuthuMR',
      email: 'muthu.vadivelu@accelya.com',
      phone: '971526462705'
    },
    pet: {
      name: '',
      breed: '',
      age: {
        months: 0,
        years: 0
      },
      weight: {
        code: 'K',
        value: 0
      },
      crateType: ''
    },
    services: {
      feeding: true,
      temperatureTracking: true,
      travelInsurance: true
    },
    flight: {
      from: {
        code: '',
        name: ''
      },
      to: {
        code: '',
        name: ''
      },
      date: new Date(),
      carrier: '',
      number: '',
      suffix: '',
      arrival_date: new Date()
    }
  }


  selectedFile: File;
  url: string;

  constructor(private httpClient: HttpClient, private router: Router, private pnrService: PnrService, private bookingService: BookingService
  ) { }

  ngOnInit() {
  }



  public fetchReservation(breed: string) {
    this.pnrService.getPNRDetails('ord_00009jw0z8RxG5zDHtwofB').subscribe((response: any) => {
      console.log('Success')
      console.log(response.data);


      const segment = response.data.slices[0].segments[0];
      this.setFlight(segment);
      this.setPassengerInfo();

    }, (error) => { console.log(error) });
  }

  public setPassengerInfo() {

  }
  public setFlight(segment: any) {
    this.form.flight.number = segment.marketing_carrier_flight_number;
    this.form.flight.carrier = segment.marketing_carrier.iata_code;

    this.form.flight.from.code = segment.origin.iata_code;
    this.form.flight.from.name = segment.origin.city.name;

    this.form.flight.to.code = segment.destination.iata_code;
    this.form.flight.to.name = segment.destination.city.name;
    this.form.flight.date = segment.departure_datetime;
    this.form.flight.arrival_date = segment.arrival_datetime;
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      var breed;
      this.pnrService.getBreed(AppSettings.IMAGE_UPLOAD_URL, this.selectedFile).subscribe(
        (response) => {
          console.log(response);
          this.form.pet.breed = JSON.parse(JSON.stringify(response)).bread;
          console.log('Breed :::: ' + this.form.pet.breed);
          this.fetchReservation(breed);
        },
        (error) => { console.log(error); });
    }
  }

  public setCrate(): void {
    this.form.pet.crateType = '21 x 16 x 15 in. (53 x 40.6 x 38 cm)';
  }

  fileToUpload: File = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  /**
   *
   */
  onSubmit() {

    console.log(" Form : " + JSON.stringify(this.form));
    console.log(" file :1: " + this.fileToUpload);
    console.log(" file :2: " + this.selectedFile);

    // const navigationExtras: NavigationExtras = {state: {id: '123', message: 'Booking created successfully'}};
    // this.router.navigate(['success'], navigationExtras);


    const formData = new FormData();
    const booking = this.form;

    if (this.form.passenger.phone) {
      this.form.passenger.phone = this.form.passenger.phone.replace("+", "");
    }
    console.log("Phone: " + this.form.passenger.phone);
    formData.append('files', this.selectedFile, this.selectedFile.name);
    if (this.fileToUpload != null) {
      formData.append('files', this.selectedFile, this.fileToUpload.name);
    }
    formData.append('booking', new Blob([JSON.stringify(booking)], {
      type: "application/json"
    }));
    this.httpClient.post<any>(AppSettings.BOOKING_ENDPOINT, formData).subscribe(
      (res) => {
        console.log(res);
        const navigationExtras: NavigationExtras = { state: { id: res.id, message: 'Booking created successfully. Your booking reference number is : ' + res.id } };
        this.router.navigate(['success'], navigationExtras);
      },
      (err) => console.log(err)
    );

  }
}
