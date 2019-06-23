export class Context {
    vocab: string;
}

export class Carriage {
    NoCarriageValue: string;
    Amount: string;
}

export class Customs {
    NoCustomsValue: string;
    Amount: string;
}

export class Insurance {
    NoInsuranceValue: string;
    Amount: string;
}

export class ChargeDeclaration {
    WeightValuationChargePaymen: string;
    OtherChargesPayment: string;
    Carriage: Carriage;
    Customs: Customs;
    Insurance: Insurance;
}

export class ChargeDescription {
    Code: string;
    SubCode: string;
    Description: string;
    LocationIndicator: string;
}

export class SpecialService {
    Description: string;
    DateTime: string;
}

export class ChargePayment {
    ByTime: string;
    ByItemQuantity: string;
    Amount: string;
    DueParty: string;
    PrepaidCollectIndicator: string;
}

export class OtherCharge {
    ChargeDescription: ChargeDescription;
    SpecialService: SpecialService;
    ChargePayment: ChargePayment;
}

export class Prepaid {
    TotalWeightCharges: string;
    TotalValuationCharges: string;
    TotalTaxes: string;
    TotalOtherChargesDueAgent: string;
    TotalOtherChargesDueCarrier: string;
    TotalPrepaidCharges: string;
}

export class InDestinationCurrency {
    TotalCharges: string;
    CollectionCharge: string;
    GrandTotalCollectCharges: string;
}

export class Collect {
    TotalWeightCharges: string;
    TotalValuationCharges: string;
    TotalTaxes: string;
    TotalOtherChargesDueAgent: string;
    TotalOtherChargesDueCarrier: string;
    TotalCollectCharges: string;
    InDestinationCurrency: InDestinationCurrency;
}

export class ChargeSummary {
    Prepaid: Prepaid;
    Collect: Collect;
}

export class ShipperSignature {
    SignatoryName: string;
    SignatoryCompany: string;
    Date: string;
    Signature: string;
    Location: string;
}

export class CarrierSignature {
    SignatoryName: string;
    SignatoryCompany: string;
    Date: string;
    Signature: string;
    Location: string;
}

export class AirwayBill {
    context: Context;
    id?: any;
    type: string;
    url: string;
    AirWaybillNumber: string;
    Date: string;
    LoadTypeCode: string;
    FlagConsolDirectLC: string;
    AccountInformationCode: string;
    AccountInformationDescription: string;
    PaymentMethodCode: string;
    ServiceCode: string;
    AirlineProductIdentifier: string;
    AirlineProductName: string;
    ExternalReference: string;
    OriginDestination: string;
    Shipper: string;
    Consignee: string;
    FreightForwarder: string;
    OtherParty: string;
    Carrier: string;
    Routing: string;
    WaybillLine: string;
    WaybillLineTotals: string;
    Handling: string;
    CustomsInformation: string;
    SecurityInformation: string;
    Insurance: number;
    ChargeDeclaration: ChargeDeclaration;
    OtherCharge: OtherCharge[];
    ChargeSummary: ChargeSummary;
    ShipperSignature: ShipperSignature;
    CarrierSignature: CarrierSignature;
    TotalPieceCount: number;
    TotalSLAC: number;
    TotalULDCount: number;
    TotalNetWeight: number;
    TotalTareWeight: number;
    TotalGrossWeight: number;
    TotalChargeableWeight: number;
    TotalVolume: number;
    TotalChargeAmount: number;
}

