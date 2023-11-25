"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCustomerAccount = exports.createRandomAdminAccounts = exports.createRandomAccount = exports.AccountModel = void 0;
const faker_1 = require("@faker-js/faker");
const Role_1 = require("./Role");
const Person_1 = require("./person/Person");
const mongoose_1 = require("mongoose");
class AccountModel {
    static removeAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield _a._model.deleteOne({ _id: id });
            return ((res.deletedCount === 1) ? true : false);
        });
    }
    static getAccountById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return _a._model.findOne({ _id: id }).select("username");
        });
    }
}
exports.AccountModel = AccountModel;
_a = AccountModel;
AccountModel.accountSchema = new mongoose_1.Schema({
    _id: String,
    username: String,
    password: String,
    role: String
});
AccountModel._model = (0, mongoose_1.model)('accounts', _a.accountSchema);
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
