import { faker } from "@faker-js/faker";
import { Account, AccountIdType, createRandomAccount } from "./Account";
import { Role } from "./Role";
import { Schema, model } from "mongoose";
export class CargoHandlePointModel {
    private static pointsSchema : Schema <CargoHandlePoint> = new Schema<CargoHandlePoint>({
        _id: String,
        name: String,
        type: String,
        pointAdmin: String,
        pointEmployees: [String],
        associatedAssemblyPoint: String,
    });
    private static _model = model('points', this.pointsSchema);
    public static async getPointIds() {
        return CargoHandlePointModel._model.find({},{_id: 1});
    }
    public static async getPointById(id: String) {
        return CargoHandlePointModel._model.findOne({_id: id});
    }
    public static async getAffiliatedTransactionPointID(id: String) {
        return CargoHandlePointModel._model.find({associatedAssemblyPoint: id},{_id: 1});
    }
    public static async getPointEmployees(id: String) {
        return (await CargoHandlePointModel._model.findOne({_id: id})).pointEmployees;
    }
    public static async getPointEmployeeById(id: String) {
        return CargoHandlePointModel._model.find({pointEmployees: id})
    }

    public static async getPointName(id: String) {
        return (await CargoHandlePointModel.getPointById(id)).name;
    }

    public static async getPointAdmin() {
        return CargoHandlePointModel._model.find({}).select("name pointAdmin");
    }

    public static async addEmployees(id: String, employeeId: String) {
        return CargoHandlePointModel._model.findByIdAndUpdate(id, {$push: {pointEmployees: employeeId}});
    }

    public static async getPointIdFromAdmin(id: String) {
        return (await CargoHandlePointModel._model.findOne({pointAdmin: id})).id;
    }
}
export enum TypeOfCargoHandlePoint {
    Transaction,
    Assembly,
}

export type CargoHandlePointIdType = String;

export interface CargoHandlePoint {
    _id: CargoHandlePointIdType;
    name: String;
    type: TypeOfCargoHandlePoint;
    pointAdmin: String;
    pointEmployees: String[];
    associatedAssemblyPoint?: CargoHandlePointIdType;
}

export function CreateRandomPointAndAllAccounts(
    adminRole: Role,
    dutyArea: String,
    employeeNumber: number,
    associatedAssemblyPoint?: CargoHandlePointIdType
): [CargoHandlePoint, Account, Account[]] {
    const [_id, employeeRole, type] =
        adminRole == Role.AssemblyAdmin
            ? [
                  `tk-${faker.string.nanoid()}`,
                  Role.AssemblyPointEmployee,
                  TypeOfCargoHandlePoint.Assembly,
              ]
            : [
                  `gd-${faker.string.nanoid()}`,
                  Role.TransactionPointEmployee,
                  TypeOfCargoHandlePoint.Transaction,
              ];

    const admin = createRandomAccount(adminRole);

    const employees = Array.from(
        {
            length: faker.helpers.rangeToNumber({
                min: 3,
                max: employeeNumber,
            }),
        },
        () => createRandomAccount(employeeRole)
    );

    const pointEmployees = employees.map((emp) => emp._id);

    return [
        {
            _id,
            type,
            name: dutyArea,
            pointAdmin: admin._id,
            pointEmployees,
            associatedAssemblyPoint,
        },
        admin,
        employees,
    ];
}
