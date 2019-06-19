export interface Context {
    vocab: string;
}

export interface Carriage {
    NoCarriageValue: string;
    Amount: string;
}

export interface Customs {
    NoCustomsValue: string;
    Amount: string;
}

export interface Insurance {
    NoInsuranceValue: string;
    Amount: string;
}

export interface ChargeDeclaration {
    WeightValuationChargePaymen: string;
    OtherChargesPayment: string;
    Carriage: Carriage;
    Customs: Customs;
    Insurance: Insurance;
}

export interface ChargeDescription {
    Code: string;
    SubCode: string;
    Description: string;
    LocationIndicator: string;
}

export interface SpecialService {
    Description: string;
    DateTime: string;
}

export interface ChargePayment {
    ByTime: string;
    ByItemQuantity: string;
    Amount: string;
    DueParty: string;
    PrepaidCollectIndicator: string;
}

export interface OtherCharge {
    ChargeDescription: ChargeDescription;
    SpecialService: SpecialService;
    ChargePayment: ChargePayment;
}

export interface Prepaid {
    TotalWeightCharges: string;
    TotalValuationCharges: string;
    TotalTaxes: string;
    TotalOtherChargesDueAgent: string;
    TotalOtherChargesDueCarrier: string;
    TotalPrepaidCharges: string;
}

export interface InDestinationCurrency {
    TotalCharges: string;
    CollectionCharge: string;
    GrandTotalCollectCharges: string;
}

export interface Collect {
    TotalWeightCharges: string;
    TotalValuationCharges: string;
    TotalTaxes: string;
    TotalOtherChargesDueAgent: string;
    TotalOtherChargesDueCarrier: string;
    TotalCollectCharges: string;
    InDestinationCurrency: InDestinationCurrency;
}

export interface ChargeSummary {
    Prepaid: Prepaid;
    Collect: Collect;
}

export interface ShipperSignature {
    SignatoryName: string;
    SignatoryCompany: string;
    Date: string;
    Signature: string;
    Location: string;
}

export interface CarrierSignature {
    SignatoryName: string;
    SignatoryCompany: string;
    Date: string;
    Signature: string;
    Location: string;
}

export interface AirwayBill {
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
    Insurance: string;
    ChargeDeclaration: ChargeDeclaration;
    OtherCharge: OtherCharge[];
    ChargeSummary: ChargeSummary;
    ShipperSignature: ShipperSignature;
    CarrierSignature: CarrierSignature;
    TotalPieceCount: string;
    TotalSLAC: string;
    TotalULDCount: string;
    TotalNetWeight: string;
    TotalTareWeight: string;
    TotalGrossWeight: string;
    TotalChargeableWeight: string;
    TotalVolume: string;
    TotalChargeAmount: string;
}

