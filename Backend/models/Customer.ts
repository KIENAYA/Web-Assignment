import { Account, createRandomCustomerAccount } from "./Account";
import { OrderIdType } from "./Order";
import { CreateRandomPerson, Person } from "./person/Person";

export type CustomerIdType = Person["ssn"];
export type CustomersList = Customer[];

export interface Customer {
    profile: Person;
    account: Account;
    sentOrdersList: OrderIdType[];
    receiveOrdersList: OrderIdType[];
}

export function assingSentOrderToCustomer(
    customers: CustomersList,
    customerId: CustomerIdType,
    orderId: OrderIdType
) {
    const customer = customers.find(
        (customer) => customer.profile.ssn === customerId
    );
    if (customer != undefined) customer.sentOrdersList.push(orderId);
}

export function assignReceiveOrderToCustomer(
    customers: CustomersList,
    customerId: CustomerIdType,
    orderId: OrderIdType
) {
    const customer = customers.find(
        (customer) => customer.profile.ssn === customerId
    );
    // console.log(customer);
    if (customer != undefined) customer.receiveOrdersList.push(orderId);
}

function createRandomCustomer(): Customer {
    const profile = CreateRandomPerson();
    const account = createRandomCustomerAccount(
        profile.firstname,
        profile.lastname
    );

    return {
        profile,
        account,
        sentOrdersList: new Array<OrderIdType>(),
        receiveOrdersList: new Array<OrderIdType>(),
    };
}

export function createRandomCustomers(customerNumber: number): Customer[] {
    return Array.from({ length: customerNumber }, () => createRandomCustomer());
}
