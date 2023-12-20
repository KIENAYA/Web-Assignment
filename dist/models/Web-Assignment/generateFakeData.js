"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accounts = void 0;
const faker_1 = require("@faker-js/faker");
const constant_1 = require("./constant");
const city_1 = require("./data/city");
const Account_1 = require("./models/Account");
const CargoHandlePoint_1 = require("./models/CargoHandlePoint");
const Customer_1 = require("./models/Customer");
const Order_1 = require("./models/Order");
const Role_1 = require("./models/Role");
const utils_1 = require("./utils");
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + constant_1.MAX_DAYS_TO_RECEIVE);
let cargoList = new Array();
let assemblyPoints = new Array();
let transactionPoints = new Array();
exports.accounts = new Array(...(0, Account_1.createRandomAdminAccounts)(constant_1.NUMBER_OF_ADMIN));
const customers = (0, Customer_1.createRandomCustomers)(constant_1.NUMBER_OF_CUSTOMER);
for (const city of city_1.CitiesDetailList) {
    const [point, admin, employees] = (0, CargoHandlePoint_1.CreateRandomPointAndAllAccounts)(Role_1.Role.AssemblyAdmin, `Điểm tập kết ${city.center}`, constant_1.MAX_NUMBER_OF_EMPLOYEES_PER_ASSEMBLY_POINT);
    (0, utils_1.addPointsAccounts)(assemblyPoints, point, admin, employees, exports.accounts);
    const numberOfTransactionPoints = faker_1.faker.helpers.rangeToNumber({
        min: constant_1.MIN_TRANSACTION_POINT_PER_ASSEMBLY_POINT,
        max: constant_1.MAX_TRANSACTION_POINT_PER_ASSEMBLY_POINT,
    });
    for (let i = 0; i != numberOfTransactionPoints; i++) {
        (0, utils_1.addPointsAccounts)(transactionPoints, ...(0, CargoHandlePoint_1.CreateRandomPointAndAllAccounts)(Role_1.Role.TransactionAdmin, `Điểm giao dịch ${city.center}-${faker_1.faker.string.alphanumeric({
            length: 3,
            casing: "upper",
        })}`, constant_1.MAX_NUMBER_OF_EMPLOYEES_PER_TRANSACTION_POINT, point._id), exports.accounts);
    }
}
let points = assemblyPoints.concat(transactionPoints);
const orders = (0, Order_1.createRandomOrders)(constant_1.NUMBER_OF_ORDERS, transactionPoints.map((point) => point._id), customers, currentDate, cargoList);
(0, utils_1.writeToJson)("fakeData/orders.json", orders);
(0, utils_1.writeToJson)("fakeData/accounts.json", exports.accounts);
(0, utils_1.writeToJson)("fakeData/customers.json", customers);
(0, utils_1.writeToJson)("fakeData/points.json", points);
(0, utils_1.writeToJson)("fakeData/cargo.json", cargoList);
