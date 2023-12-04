import { faker } from "@faker-js/faker";
import { Role } from "./Role";
import { CreateRandomPerson } from "./person/Person";
import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

export interface Account {
    _id: string;
    username: string;
    password: string;
    role: Role;
}
export class AccountModel {
    private static accountSchema : Schema <Account> = new Schema <Account>({
    _id: String,
    username: String,
    password: String,
    role: String
    })
    private static _model = model('accounts', this.accountSchema);

    public static async IsUsernamExist(_username: string) {
        return AccountModel._model.exists({username: _username});
    }

    public static async CheckCredential(_username: string) {
        return AccountModel._model.findOne({username: _username}).select("username password role");
        
    }
    public static async removeAccount(id: string) {
        const res = await AccountModel._model.deleteOne({_id : id});
        return ((res.deletedCount === 1) ? true : false);
    }
    public static async getAccountById(id: string) {
        return AccountModel._model.findOne({_id : id}).select("username");
    }
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
