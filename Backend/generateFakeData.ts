import { faker } from "@faker-js/faker";
import {
    MAX_DAYS_TO_RECEIVE,
    MAX_NUMBER_OF_EMPLOYEES_PER_ASSEMBLY_POINT,
    MAX_NUMBER_OF_EMPLOYEES_PER_TRANSACTION_POINT,
    MAX_TRANSACTION_POINT_PER_ASSEMBLY_POINT,
    MIN_TRANSACTION_POINT_PER_ASSEMBLY_POINT,
    NUMBER_OF_ADMIN,
    NUMBER_OF_CUSTOMER,
    NUMBER_OF_ORDERS,
} from "./constant";
import { CitiesDetailList } from "./data/city";
import { Account, createRandomAdminAccounts } from "./models/Account";
import { Cargo } from "./models/Cargo";
import {
    CargoHandlePoint,
    CreateRandomPointAndAllAccounts,
} from "./models/CargoHandlePoint";
import { createRandomCustomers } from "./models/Customer";
import { createRandomOrders } from "./models/Order";
import { Role } from "./models/Role";
import { addPointsAccounts, writeToJson } from "./utils";

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + MAX_DAYS_TO_RECEIVE);

let cargoList = new Array<Cargo>();
let assemblyPoints = new Array<CargoHandlePoint>();
let transactionPoints = new Array<CargoHandlePoint>();
export let accounts = new Array<Account>(
    ...createRandomAdminAccounts(NUMBER_OF_ADMIN)
);

const customers = createRandomCustomers(NUMBER_OF_CUSTOMER);

for (const city of CitiesDetailList) {
    const [point, admin, employees] = CreateRandomPointAndAllAccounts(
        Role.AssemblyAdmin,
        `Điểm tập kết ${city.center}`,
        MAX_NUMBER_OF_EMPLOYEES_PER_ASSEMBLY_POINT
    );

    addPointsAccounts(assemblyPoints, point, admin, employees, accounts);

    const numberOfTransactionPoints = faker.helpers.rangeToNumber({
        min: MIN_TRANSACTION_POINT_PER_ASSEMBLY_POINT,
        max: MAX_TRANSACTION_POINT_PER_ASSEMBLY_POINT,
    });

    for (let i = 0; i != numberOfTransactionPoints; i++) {
        addPointsAccounts(
            transactionPoints,
            ...CreateRandomPointAndAllAccounts(
                Role.TransactionAdmin,
                `Điểm giao dịch ${city.center}-${faker.string.alphanumeric({
                    length: 3,
                    casing: "upper",
                })}`,
                MAX_NUMBER_OF_EMPLOYEES_PER_TRANSACTION_POINT,
                point._id
            ),
            accounts
        );
    }
}

let points = assemblyPoints.concat(transactionPoints);

const orders = createRandomOrders(
    NUMBER_OF_ORDERS,
    transactionPoints.map((point) => point._id),
    customers,
    currentDate,
    cargoList
);

writeToJson("fakeData/orders.json", orders);
writeToJson("fakeData/accounts.json", accounts);
writeToJson("fakeData/customers.json", customers);
writeToJson("fakeData/points.json", points);
writeToJson("fakeData/cargo.json", cargoList);
