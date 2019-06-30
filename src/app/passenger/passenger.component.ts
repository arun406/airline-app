import { Component, OnInit,Input } from '@angular/core';
import { Passenger } from '../booking-request';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {

  @Input()
  passenger: Passenger;

  constructor() { }

  ngOnInit() {
  }

}
