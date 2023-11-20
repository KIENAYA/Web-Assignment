"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCustomers = exports.assignReceiveOrderToCustomer = exports.assingSentOrderToCustomer = void 0;
const Account_1 = require("./Account");
const Person_1 = require("./person/Person");
function assingSentOrderToCustomer(customers, customerId, orderId) {
    const customer = customers.find((customer) => customer.profile.ssn === customerId);
    if (customer != undefined)
        customer.sentOrdersList.push(orderId);
}
exports.assingSentOrderToCustomer = assingSentOrderToCustomer;
function assignReceiveOrderToCustomer(customers, customerId, orderId) {
    const customer = customers.find((customer) => customer.profile.ssn === customerId);
    // console.log(customer);
    if (customer != undefined)
        customer.receiveOrdersList.push(orderId);
}
exports.assignReceiveOrderToCustomer = assignReceiveOrderToCustomer;
function createRandomCustomer() {
    const profile = (0, Person_1.CreateRandomPerson)();
    const account = (0, Account_1.createRandomCustomerAccount)(profile.firstname, profile.lastname);
    return {
        profile,
        account,
        sentOrdersList: new Array(),
        receiveOrdersList: new Array(),
    };
}
function createRandomCustomers(customerNumber) {
    return Array.from({ length: customerNumber }, () => createRandomCustomer());
}
exports.createRandomCustomers = createRandomCustomers;
