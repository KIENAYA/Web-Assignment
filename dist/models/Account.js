"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCustomerAccount = exports.createRandomAdminAccounts = exports.createRandomAccount = void 0;
const faker_1 = require("@faker-js/faker");
const Role_1 = require("./Role");
const Person_1 = require("./person/Person");
function createRandomAccount(role) {
    const person = (0, Person_1.CreateRandomPerson)();
    return {
        _id: faker_1.faker.string.uuid(),
        username: faker_1.faker.internet.userName({
            firstName: person.firstname,
            lastName: person.lastname,
        }),
        password: faker_1.faker.internet.password(),
        role,
    };
}
exports.createRandomAccount = createRandomAccount;
function createRandomAdminAccounts(numberOfAccount) {
    return Array.from({ length: numberOfAccount }, () => createRandomAccount(Role_1.Role.Admin));
}
exports.createRandomAdminAccounts = createRandomAdminAccounts;
function createRandomCustomerAccount(firstName, lastName) {
    return {
        _id: faker_1.faker.string.uuid(),
        username: faker_1.faker.internet.userName({ firstName, lastName }),
        password: faker_1.faker.internet.password(),
        role: Role_1.Role.Customer,
    };
}
exports.createRandomCustomerAccount = createRandomCustomerAccount;
