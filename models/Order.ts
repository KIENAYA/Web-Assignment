import { faker } from "@faker-js/faker";
import {
    CargoHandlePointIdType,
    CargoHandlePointModel,
} from "./CargoHandlePoint";
import {
    Customer,
    CustomerIdType,
    assignReceiveOrderToCustomer,
    assingSentOrderToCustomer,
} from "./Customer";
import { Cargo, CargoIdType, CargoModel, CreateRandomCargo } from "./Cargo";
import { MAX_CARGO_QUANTITY, MIN_CARGO_QUANTITY } from "../constant";
import { Schema, model } from "mongoose";
interface myObject {
    _id: String;
}
export class OrderModel {
    private static ordersSchema: Schema<Order> = new Schema<Order>({
        _id: String,
        cargoList: [String],
        sentPoint: String,
        sentCustomer: String,
        sentDate: Date,
        receivePoint: String,
        receiveCustomer: String,
        receivedDate: Date,
        cost: String,
    });
    private static _model = model("orders", this.ordersSchema);
    public static async getAll() {
        return OrderModel._model.find();
    }
    public static async getSentPoints() {
        return OrderModel._model.find({}, { sentPoint: 1 });
    }
    public static async getAllOrderSentFromTransactionPoint(id: String) {
        return OrderModel._model.find({ sentPoint: id });
    }
    public static async getAllOrderReceiveFromTransactionPoint(id: String) {
        return OrderModel._model.find({ receivePoint: id });
    }
    public static async getAllOrderReceiveFromAssemblePoint(id: String) {
        const inputArray: myObject[] =
            await CargoHandlePointModel.getAffiliatedTransactionPointID(id);
        const idArray: String[] = inputArray.map((obj) => obj._id);
        const orders = new Array();
        for (id of idArray) {
            var order = await this.getAllOrderReceiveFromTransactionPoint(id);
            if (order.length > 0) {
                orders.push(order);
            }
        }
        return orders;
    }
    public static async getAllOrderSentFromAssemblePoint(id: String) {
        const inputArray: myObject[] =
            await CargoHandlePointModel.getAffiliatedTransactionPointID(id);
        const idArray: String[] = inputArray.map((obj) => obj._id);
        const orders = new Array();
        for (id of idArray) {
            var order = await this.getAllOrderSentFromTransactionPoint(id);
            if (order.length > 0) {
                orders.push(order);
            }
        }
        return orders;
    }

    public static async getCargoList(id: String) {
        return OrderModel._model.findOne({});
    }
}

export type OrderIdType = string;

export interface Order {
    _id: OrderIdType;
    cargoList: String[];
    sentPoint: CargoHandlePointIdType;
    sentCustomer: CustomerIdType;
    sentDate: Date;
    receivePoint: CargoHandlePointIdType;
    receiveCustomer: CustomerIdType;
    receivedDate: Date;
    currentLocation: PossibleCurrentLocation;
    cost: number;
}

export enum PossibleCurrentLocation {
    AtSentPoint,
    AtSentAssemblyPoint,
    AtReceivePoint,
    AtReceiveAssemblyPoint,
    AtReceivedUser,
}

const PossibleCurrentLocationWithWeight: Array<{
    value: PossibleCurrentLocation;
    weight: number;
}> = [
    { value: PossibleCurrentLocation.AtSentPoint, weight: 2 },
    { value: PossibleCurrentLocation.AtSentAssemblyPoint, weight: 4 },
    { value: PossibleCurrentLocation.AtReceivePoint, weight: 8 },
    { value: PossibleCurrentLocation.AtReceiveAssemblyPoint, weight: 10 },
    { value: PossibleCurrentLocation.AtReceivedUser, weight: 100 },
];

function createRandomOrder(
    cargoHandlePoints: CargoHandlePointIdType[],
    customers: CustomerIdType[],
    maxReceiveDate: Date,
    cargoList: Cargo[]
): Order {
    const [sentPoint, receivePoint] = faker.helpers.arrayElements(
        cargoHandlePoints,
        2
    );

    const [sentCustomer, receiveCustomer] = faker.helpers.arrayElements(
        customers,
        2
    );

    const sentDate = faker.date.past();

    const receivedDate = faker.date.between({
        from: sentDate,
        to: maxReceiveDate,
    });

    const cargoNumber = faker.helpers.rangeToNumber({ min: 1, max: 4 });
    const currentOrderCargoList = Array.from({ length: cargoNumber }, () =>
        CreateRandomCargo(MIN_CARGO_QUANTITY, MAX_CARGO_QUANTITY)
    );
    cargoList.push(...currentOrderCargoList);

    return {
        _id: faker.string.nanoid(),
        cargoList: currentOrderCargoList.map((cargo) => cargo._id),
        sentPoint,
        sentCustomer,
        sentDate,
        receivePoint,
        receiveCustomer,
        receivedDate,
        currentLocation: faker.helpers.weightedArrayElement(
            PossibleCurrentLocationWithWeight
        ),
        cost: 0,
    };
}

export function createRandomOrders(
    numberOfOrders: number,
    cargoHandlePoints: CargoHandlePointIdType[],
    customers: Customer[],
    maxReceiveDate: Date,
    cargoList: Cargo[]
): Order[] {
    return Array.from({ length: numberOfOrders }, () => {
        const order = createRandomOrder(
            cargoHandlePoints,
            customers.map((customer) => customer.profile.ssn),
            maxReceiveDate,
            cargoList
        );

        assingSentOrderToCustomer(customers, order.sentCustomer, order._id);
        assignReceiveOrderToCustomer(
            customers,
            order.receiveCustomer,
            order._id
        );

        return order;
    });
}
