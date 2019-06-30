export class Booking {
  pet: Pet;
  pieces: number = 1;
  weight: Unit;
  isCreatAvailable: boolean;
  createType: string;
  dimensions: Dimension;
  flight: Flight;
  shipper: string;
  consignee: string;
  documents: Document[];
  media: Document[];
  passenger: Passenger;
  id: string;
  steps: Step[];
  services: Service;
}

export class Service {
  feeding: boolean;
  temperatureTracking: boolean;
  travelInsurance: boolean;
}
export class Passenger {
  pnr: string;
  name: string;
  email: string;
  phone: string;
}
export class Document {
  name: string;
  url: string;
}
export class Pet {
  type: string = 'Dog';
  name: string;
  breed: string;
  age: Age;
  weight: Unit;
}
export class Age {
  months: number;
  years: number;
}
export class Unit {
  code: string;
  value: number;
}
export class Dimension {
  length: number;
  width: number;
  height: number;
  unit: string;
}
export class Flight {
  from: Airport;
  to: Airport;
  date: string;
  carrier: string;
  number: string;
  suffix: string;

}
export class Airport {
  code: string;
  name: string;
}

export interface Step {
  code: string;
  stepIcon: string;
  description: string;
  noOfAttachements: number;
  documents: Attachment[];
  media: Attachment[];
  timestamp: Date;
  status: string;
  remarks:string;
}

export interface Attachment {
  name: string;
  url: string;
}
