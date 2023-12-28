import { Customer, CustomerIdType } from './Customer';
export enum TypeOfCargoHandlePoint {
  Transaction,
  Assembly,
}

export interface CargoHandlePoint {
  _id: string;
  name: String;
  type: TypeOfCargoHandlePoint;
  pointAdmin: String;
  pointEmployees: String[];
  associatedAssemblyPoint?: string;
}

export type OrderIdType = string;

export interface Order {
  _id: OrderIdType;
  cargoList: String[];
  sentPoint: string;
  sentCustomer: CustomerIdType;
  sentDate: string;
  receivePoint: string;
  receiveCustomer: CustomerIdType;
  receivedDate: string;
  currentLocation: string;
  cost: number;
}

export enum PossibleCurrentLocation {
  AtSentPoint,
  AtSentAssemblyPoint,
  AtReceiveAssemblyPoint,
  AtReceivePoint,
  AtReceivedUser,
}

const PossibleCurrentLocationWithWeight: Array<{
  value: PossibleCurrentLocation;
  weight: number;
}> = [
  { value: PossibleCurrentLocation.AtSentPoint, weight: 2 },
  { value: PossibleCurrentLocation.AtSentAssemblyPoint, weight: 4 },
  { value: PossibleCurrentLocation.AtReceivePoint, weight: 8 },
  { value: PossibleCurrentLocation.AtReceiveAssemblyPoint, weight: 10 },
  { value: PossibleCurrentLocation.AtReceivedUser, weight: 100 },
];
