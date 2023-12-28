import { Account } from "./Account";
import { OrderIdType } from "./Order";
import {  Person } from "./person/Person";

export type CustomerIdType = Person["ssn"];
export type CustomersList = Customer[];

export interface Customer {
    profile: Person;
    account: Account;
    sentOrdersList: OrderIdType[];
    receiveOrdersList: OrderIdType[];
}










































