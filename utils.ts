import * as fs from "fs";
import { Account } from "./models/Account";
import { CargoHandlePoint } from "./models/CargoHandlePoint";

export function writeToJson(fileName: string, obj: Object) {
    fs.writeFile(fileName, JSON.stringify(obj, null, 4), "utf-8", (err) => {
        if (err) console.log(err);
    });
}

export function prettyPrint(obj: Object) {
    console.log(JSON.stringify(obj, null, 2));
}

export function addPointsAccounts(
    pointsList: CargoHandlePoint[],
    cargoPoint: CargoHandlePoint,
    admin: Account,
    employees: Account[],
    accounts: Account[]
) {
    pointsList.push(cargoPoint);
    accounts.push(admin);
    accounts = [...accounts, ...employees];
}
