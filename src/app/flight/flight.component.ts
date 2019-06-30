import { Component, OnInit, Input  } from '@angular/core';
import { Flight } from  '../booking-request';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  @Input()
  flight: Flight;

  constructor() { }

  ngOnInit() {
  }

}
