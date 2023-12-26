import { ICargo } from "./Items.type";

export interface IOrder{
    id: string,
    cargoList: ICargo[],
    sendDate: string,
    sendPoint: string,
    sender: string,
    receiveDate: string,
    receiver:string,
    receivePoint: string,
    status:OrderStatus,
    currentLocation:string,
    price: number
} 
export enum OrderStatus{
    confirmed,
    unconfirmed,
    canceled
}