import { Component, OnInit, Input } from '@angular/core';
import { Service } from  '../booking-request';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  @Input()
  services: Service;
  constructor() { }

  ngOnInit() {
    console.log(' Service: ' + this.services);
  }

}
