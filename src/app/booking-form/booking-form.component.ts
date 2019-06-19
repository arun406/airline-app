import { PnrService } from './../pnr.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Booking, Flight, Airport } from 'src/booking-request';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  pnr: string = '';
  booking: Booking;

  constructor(private formBuilder: FormBuilder, private pnrService: PnrService
  ) { }

  ngOnInit() {
    this.booking = new Booking();
    this.booking.flight = new Flight();
    this.booking.flight.to = new Airport();
    this.booking.flight.from = new Airport();

    this.formGroup = this.createForm();
    this.pnrService.getPNRDetails('ord_00009jw0z8RxG5zDHtwofB').subscribe((response: any) => {
      console.log(response.data);
      const slice = response.data.slices[0];
      this.booking.flight.to.code = slice.destination.iata_code;
      this.booking.flight.to.name = slice.destination.name;
      this.booking.flight.from.code = slice.origin.iata_code;
      this.booking.flight.from.name = slice.origin.name;

      const segment = slice.segments[0];
      this.booking.flight.carrier = segment.marketing_carrier.iata_code;
      this.booking.flight.number = segment.marketing_carrier_flight_number;
      this.booking.flight.date = segment.departure_datetime;

      console.log(this.booking);
      this.formGroup.patchValue({
        flight: {
          from: {
            code: this.booking.flight.from.code,
            name: this.booking.flight.from.name
          },
          to: {
            code: this.booking.flight.to.code,
            name: this.booking.flight.to.name
          },
          date: this.booking.flight.date,
          carrier: this.booking.flight.carrier,
          number: this.booking.flight.number,
          suffix: this.booking.flight.suffix
        }
      });
    });



    console.log(this.formGroup.value);
    // this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // this.formGroup = this.formBuilder.group({
    //   'name': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
    //   'type': [null, Validators.required],
    //   'bread': [null, [Validators.required, this.checkPassword]],
    //   'age': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    //   'weight': [null, []],
    //   'validate': ''
    // });

    return this.formBuilder.group({
      pet: this.formBuilder.group({
        type: 'dog',
        name: '',
        bread: '',
        age: this.formBuilder.group({
          months: null,
          years: null
        }),
        weight: this.formBuilder.group({
          code: 'K',
          value: null
        })
      }),
      pieces: 1,
      weight: null,
      isCreateAvailable: false,
      createType: '',
      createWeight: null,
      dimensions: this.formBuilder.group({
        length: null,
        width: null,
        height: null,
        unit: this.formBuilder.group({
          unit: 'cm',
          value: null
        })
      }),
      flight: this.formBuilder.group({
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
      })
    });


  }

  // setChangeValidate() {
  //   this.formGroup.get('validate').valueChanges.subscribe(
  //     (validate) => {
  //       if (validate == '1') {
  //         this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
  //         this.titleAlert = "You need to specify at least 3 characters";
  //       } else {
  //         this.formGroup.get('name').setValidators(Validators.required);
  //       }
  //       this.formGroup.get('name').updateValueAndValidity();
  //     }
  //   )
  // }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(post) {
    this.booking = post;
    console.log(this.booking);
  }

  getPNR() {
    console.log(this.pnr);
  }
}
