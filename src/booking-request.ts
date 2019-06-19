export class Booking {
    pet: Pet;
    pieces: number = 1;
    weight: Unit;
    isCreatAvailable: boolean;
    createType: string;
    createWeight: string;
    dimensions: Dimension;
    flight: Flight;
}
export class Pet {
    type: string;
    name: string;
    bread: string;
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
    date: Date;
    carrier: string;
    number: string;
    suffix: string;

}
export class Airport {
    code: string;
    name: string;
}