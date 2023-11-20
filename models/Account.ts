import { faker } from "@faker-js/faker";
import { Role } from "./Role";
import { CreateRandomPerson } from "./person/Person";

export interface Account {
    _id: string;
    username: string;
    password: string;
    role: Role;
}

export type AccountIdType = Account["_id"];

export function createRandomAccount(role: Role): Account {
    const person = CreateRandomPerson();
    return {
        _id: faker.string.uuid(),
        username: faker.internet.userName({
            firstName: person.firstname,
            lastName: person.lastname,
        }),
        password: faker.internet.password(),
        role,
    };
}

export function createRandomAdminAccounts(numberOfAccount: number): Account[] {
    return Array.from({ length: numberOfAccount }, () =>
        createRandomAccount(Role.Admin)
    );
}

export function createRandomCustomerAccount(
    firstName: string,
    lastName: string
): Account {
    return {
        _id: faker.string.uuid(),
        username: faker.internet.userName({ firstName, lastName }),
        password: faker.internet.password(),
        role: Role.Customer,
    };
}
