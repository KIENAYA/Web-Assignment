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
exports.CreateRandomPointAndAllAccounts = exports.TypeOfCargoHandlePoint = exports.CargoHandlePointModel = void 0;
const faker_1 = require("@faker-js/faker");
const Account_1 = require("./Account");
const Role_1 = require("./Role");
const mongoose_1 = require("mongoose");
class CargoHandlePointModel {
    static getPointIds() {
        return __awaiter(this, void 0, void 0, function* () {
            return _a._model.find({}, { _id: 1 });
        });
    }
}
exports.CargoHandlePointModel = CargoHandlePointModel;
_a = CargoHandlePointModel;
CargoHandlePointModel.pointsSchema = new mongoose_1.Schema({
    _id: String,
    name: String,
    type: String,
    pointAdmin: String,
    pointEmployees: String,
    associatedAssemblyPoint: String,
});
CargoHandlePointModel._model = (0, mongoose_1.model)('points', _a.pointsSchema);
var TypeOfCargoHandlePoint;
(function (TypeOfCargoHandlePoint) {
    TypeOfCargoHandlePoint[TypeOfCargoHandlePoint["Transaction"] = 0] = "Transaction";
    TypeOfCargoHandlePoint[TypeOfCargoHandlePoint["Assembly"] = 1] = "Assembly";
})(TypeOfCargoHandlePoint || (exports.TypeOfCargoHandlePoint = TypeOfCargoHandlePoint = {}));
function CreateRandomPointAndAllAccounts(adminRole, dutyArea, employeeNumber, associatedAssemblyPoint) {
    const [_id, employeeRole, type] = adminRole == Role_1.Role.AssemblyAdmin
        ? [
            `tk-${faker_1.faker.string.nanoid()}`,
            Role_1.Role.AssemblyPointEmployee,
            TypeOfCargoHandlePoint.Assembly,
        ]
        : [
            `gd-${faker_1.faker.string.nanoid()}`,
            Role_1.Role.TransactionPointEmployee,
            TypeOfCargoHandlePoint.Transaction,
        ];
    const admin = (0, Account_1.createRandomAccount)(adminRole);
    const employees = Array.from({
        length: faker_1.faker.helpers.rangeToNumber({
            min: 3,
            max: employeeNumber,
        }),
    }, () => (0, Account_1.createRandomAccount)(employeeRole));
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
exports.CreateRandomPointAndAllAccounts = CreateRandomPointAndAllAccounts;
