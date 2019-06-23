export class Booking {
    Pet: Pet;
    Pieces: number = 1;
    Weight: Unit;
    IsCreatAvailable: boolean;
    CreateType: string;
    CreateWeight: string;
    Dimensions: Dimension;
    public Flight: Flight;
    Shipper: string;
    Consignee: string;
    DocumentList: string[]
}
export class Pet {
    type: string;
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
    date: Date;
    carrier: string;
    number: string;
    suffix: string;

}
export class Airport {
    code: string;
    name: string;
}