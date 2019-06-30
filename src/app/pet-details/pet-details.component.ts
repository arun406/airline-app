import { Component, OnInit, Input } from '@angular/core';
import { Pet, Document } from '../booking-request';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {

  @Input()
  pet: Pet;
  avatar: string = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  @Input()
  documents: Document[];

  constructor() {
  }

  ngOnInit() {
    console.log(' documents : ' + this.documents.length);
    if(this.pet){
      console.log(this.pet);
    }
  }

}
