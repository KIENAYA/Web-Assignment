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
exports.createRandomOrders = exports.PossibleCurrentLocation = exports.OrderModel = void 0;
const faker_1 = require("@faker-js/faker");
const Customer_1 = require("./Customer");
const Cargo_1 = require("./Cargo");
const constant_1 = require("../constant");
const mongoose_1 = require("mongoose");
class OrderModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return _a._model.find();
        });
    }
    static getSentPoints() {
        return __awaiter(this, void 0, void 0, function* () {
            return _a._model.find({}, { sentPoint: 1 });
        });
    }
    static getAllOrderSentFromPoint(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return _a._model.find({ sentPoint: id });
        });
    }
    static getAllOrderReceiveFromPoint(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return _a._model.find({ receivePoint: id });
        });
    }
}
exports.OrderModel = OrderModel;
_a = OrderModel;
OrderModel.ordersSchema = new mongoose_1.Schema({
    _id: String,
    cargoList: String,
    sentPoint: String,
    sentCustomer: String,
    sentDate: Date,
    receivePoint: String,
    receiveCustomer: String,
    receivedDate: Date,
    cost: String,
});
OrderModel._model = (0, mongoose_1.model)("orders", _a.ordersSchema);
var PossibleCurrentLocation;
(function (PossibleCurrentLocation) {
    PossibleCurrentLocation[PossibleCurrentLocation["AtSentPoint"] = 0] = "AtSentPoint";
    PossibleCurrentLocation[PossibleCurrentLocation["AtSentAssemblyPoint"] = 1] = "AtSentAssemblyPoint";
    PossibleCurrentLocation[PossibleCurrentLocation["AtReceivePoint"] = 2] = "AtReceivePoint";
    PossibleCurrentLocation[PossibleCurrentLocation["AtReceiveAssemblyPoint"] = 3] = "AtReceiveAssemblyPoint";
    PossibleCurrentLocation[PossibleCurrentLocation["AtReceivedUser"] = 4] = "AtReceivedUser";
})(PossibleCurrentLocation || (exports.PossibleCurrentLocation = PossibleCurrentLocation = {}));
const PossibleCurrentLocationWithWeight = [
    { value: PossibleCurrentLocation.AtSentPoint, weight: 2 },
    { value: PossibleCurrentLocation.AtSentAssemblyPoint, weight: 4 },
    { value: PossibleCurrentLocation.AtReceivePoint, weight: 8 },
    { value: PossibleCurrentLocation.AtReceiveAssemblyPoint, weight: 10 },
    { value: PossibleCurrentLocation.AtReceivedUser, weight: 100 },
];
function createRandomOrder(cargoHandlePoints, customers, maxReceiveDate, cargoList) {
    const [sentPoint, receivePoint] = faker_1.faker.helpers.arrayElements(cargoHandlePoints, 2);
    const [sentCustomer, receiveCustomer] = faker_1.faker.helpers.arrayElements(customers, 2);
    const sentDate = faker_1.faker.date.past();
    const receivedDate = faker_1.faker.date.between({
        from: sentDate,
        to: maxReceiveDate,
    });
    const cargoNumber = faker_1.faker.helpers.rangeToNumber({ min: 1, max: 4 });
    const currentOrderCargoList = Array.from({ length: cargoNumber }, () => (0, Cargo_1.CreateRandomCargo)(constant_1.MIN_CARGO_QUANTITY, constant_1.MAX_CARGO_QUANTITY));
    cargoList.push(...currentOrderCargoList);
    return {
        _id: faker_1.faker.string.nanoid(),
        cargoList: currentOrderCargoList.map((cargo) => cargo._id),
        sentPoint,
        sentCustomer,
        sentDate,
        receivePoint,
        receiveCustomer,
        receivedDate,
        currentLocation: faker_1.faker.helpers.weightedArrayElement(PossibleCurrentLocationWithWeight),
        cost: 0,
    };
}
function createRandomOrders(numberOfOrders, cargoHandlePoints, customers, maxReceiveDate, cargoList) {
    return Array.from({ length: numberOfOrders }, () => {
        const order = createRandomOrder(cargoHandlePoints, customers.map((customer) => customer.profile.ssn), maxReceiveDate, cargoList);
        (0, Customer_1.assingSentOrderToCustomer)(customers, order.sentCustomer, order._id);
        (0, Customer_1.assignReceiveOrderToCustomer)(customers, order.receiveCustomer, order._id);
        return order;
    });
}
exports.createRandomOrders = createRandomOrders;
