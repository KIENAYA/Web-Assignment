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
        currentLocation: Number,
        confirm: Boolean,
        cost: String,
    });
    private static _model = model("orders", this.ordersSchema);
    public static async getAll() {
        return OrderModel._model.find();
    }
    
    public static async getOrderById(id: String) {
        return OrderModel._model.findOne({_id: id});
    }

    public static async ConvertOrder() {
        
    }

   

    //lấy đơn hàng cần gửi tại điểm giao dịch
    public static async getAllOrderSentFromTransactionPointSent(id: String) {
        return OrderModel._model.find({ sentPoint: id, currentLocation: {$eq: 0}});
    }
    
    //lấy đơn hàng nhận được tại điểm giao dịch đã confirm
    public static async getAllOrderReceiveFromTransactionPointConfirmed(id: String) {
        return OrderModel._model.find({ receivePoint: id, currentLocation: {$eq: 3}, confirm: true});
    }
    
    //lấy đơn hàng nhận được tại điểm giao dịch chưa confirm
    public static async getAllOrderReceiveFromTransactionPointUnconfirmed(id: String) {
        return OrderModel._model.find({receivePoint:id, currentLocation:{$eq: 3}, confirm: false});
    }
    
    //lấy ra các đơn hàng gửi từ điểm gd nguồn đến điểm tk nguồn chưa confirm
    public static async getAllOrderFromTPToAPUnconfirmed(id: String) {
        return OrderModel._model.find({sentPoint: id, currentLocation: {$eq: 1}, confirm: false});
    }
    
    //lấy đơn hàng nhận được tại điểm tập kết nguồn chưa confirm
    public static async getAllOrderReceiveFromTransactionPointToAssemblePointUnconfimed(id: String) {
        const inputArray: myObject[] = await CargoHandlePointModel.getAffiliatedTransactionPointID(id);
        const idArray: String[] = inputArray.map((obj) => obj._id);
        const orders = new Array();
        for (id of idArray) {
            var order = await this.getAllOrderFromTPToAPUnconfirmed(id);
            if (order.length > 0) {
                orders.push(order);
            }
        }
        return orders;
    }
    
    //lấy ra các đơn hàng gửi từ điểm gd nguồn đến điểm tk nguồn đã confirm
    public static async getAllOrderFromTPToAPConfirmed(id: String) {
        return OrderModel._model.find({sentPoint: id, currentLocation: {$eq: 1}, confirm: true})
    }

    //lấy ra các đơn hàng nhận tại điểm tk nguồn đã confirm
    public static async getAllOrderReceiveFromTransactionPointAssemblePointConfimed(id: String) {
        const inputArray: myObject[] = await CargoHandlePointModel.getAffiliatedTransactionPointID(id);
        const idArray: String[] = inputArray.map((obj) => obj._id);
        const orders = new Array();
        for (id of idArray) {
            var order = await this.getAllOrderFromTPToAPConfirmed(id);
            if (order.length > 0) {
                orders.push(order);
            }
        }
        return orders;
    }


    //lấy ra các đơn hàng gửi từ tk nguồn đến tk đích chưa confirm
    public static async getAllOrderFromAPtoAPUnconfirmed(id: String) {
        return OrderModel._model.find({receivePoint: id, currentLocation: {$eq: 2}, confirm: false})
    }
    
    //lấy ra các đơn hàng gửi từ tk nguồn đến tk đích đã confirm
    public static async getAllOrderFromAPtoAPConfirmed(id: String) {
        return OrderModel._model.find({receivePoint:id, currentLocation: {$eq: 2}, confirm: true})
    }


    //lấy ra các đơn hàng nhận được tại tk đích chưa confirm
    public static async getAllOrderReceiveFromAssemblePointUnconfirmed(id: String) {
        const inputArray: myObject[] = await CargoHandlePointModel.getAffiliatedTransactionPointID(id);
        const idArray: String[] = inputArray.map((obj) => obj._id);
        const orders = new Array();
        for (id of idArray) {
            var order = await this.getAllOrderFromAPtoAPUnconfirmed(id);
            if (order.length > 0) {
                orders.push(order);
            }
        }
        return orders;
    }
    
    //lấy ra các đơn hàng nhận được tại tk đích đã confirm
    public static async getAllOrderReceiveFromAssemblePointConfirmed(id: String) {
        const inputArray: myObject[] = await CargoHandlePointModel.getAffiliatedTransactionPointID(id);
        const idArray: String[] = inputArray.map((obj) => obj._id);
        const orders = new Array();
        for (id of idArray) {
            var order = await this.getAllOrderFromAPtoAPConfirmed(id);
            if (order.length > 0) {
                orders.push(order);
            }
        }
        return orders;
    }
    
    //lấy ra danh sách hàng hóa có trong đơn hàng
    public static async getCargoList(id: String) {
        return (await OrderModel._model.findOne({_id: id})).cargoList;
    }
    

    //lấy ra trạng thái của đơn hàng(currentLocation)
    public static async getOrderStage(id: String) {
        const cur = (await OrderModel.getOrderById(id)).currentLocation;
        if(cur === 0) {
            const res = (await OrderModel.getOrderById(id)).sentPoint;
            return CargoHandlePointModel.getPointName(res);
        }
        else if (cur === 1) {
            const sentPoint = (await OrderModel.getOrderById(id)).sentPoint;
            const res = (await CargoHandlePointModel.getPointById(sentPoint)).associatedAssemblyPoint;
            return CargoHandlePointModel.getPointName(res);
        } else if (cur === 2) {
            const receivePoint = (await OrderModel.getOrderById(id)).receivePoint;
            const res =  (await CargoHandlePointModel.getPointById(receivePoint)).associatedAssemblyPoint;
            return CargoHandlePointModel.getPointName(res);
        } else if (cur === 3) {
            const res = (await OrderModel.getOrderById(id)).receivePoint;
            return CargoHandlePointModel.getPointName(res);
        }
        else return ("Done");
    }
    //Chuyển đơn hàng
    public static async TransferOrder(id: String) {
        return OrderModel._model.findOneAndUpdate({_id: id},{ $inc: { currentLocation: 1 }, $set: {confirm: false} },
            { new: true });
    }
    //Xác nhận đơn hàng
    public static async ConfirmOrder(id: String) {
        return OrderModel._model.findOneAndUpdate({_id: id},{ $set: { confirm: true } },
            { new: true });
    }

    //lấy ra các đơn hàng bị fail(hiển thị tại điểm gd)
    public static async getFailedOrder(id: String) {
        return OrderModel._model.find({receivePoint: id, currentLocation:{$ne: PossibleCurrentLocation.AtReceivedUser}, receivedDate: {$lt: new Date()}});
    }

    //lấy ra các đơn hàng thành công(hiện thị tại điểm gd)
    public static async getCompleteOrder(id: String) {
        return OrderModel._model.find({receivePoint: id, currentLocation: PossibleCurrentLocation.AtReceivedUser, receivedDate: {$gte: new Date()}});
    }
    
    //Trả lại đơn hàng bị lỗi 
    public static async ReturnOrder(id: String) {
        return OrderModel._model.findOneAndUpdate({_id: id}, {$set: {currentLocation: 0}}, {new: true});
    }

    //thống kê hàng gửi tại điểm giao dịch theo tháng
    public static async statisticOrderSentAtTP(id: String, month: number) {
        const startOfMonth = new Date(2023,month-1,2,0,0,0,0);
        const endOfMonth = new Date(2023,month,2,0,0,0,0);
        return OrderModel._model.find({sentPoint: id, sentDate: {
            $gte: startOfMonth,
            $lt: endOfMonth
        }});
    }
    
    //thống kê đơn hàng nhận tại điểm giao dịch theo tháng
    public static async statisticOrderReceivAtTP(id: String, month: number) {
        const startOfMonth = new Date(2023,month-1,2,0,0,0,0);
        const endOfMonth = new Date(2023,month,2,0,0,0,0);
        return OrderModel._model.find({receivePoint: id, sentDate: {
            $gte: startOfMonth,
            $lt: endOfMonth
        }});
    }

    //thống kê hàng đến tại điểm tập kết theo tháng
    public static async statisticOrderAtAP1(id: String, month: number) {
        const inputArray: myObject[] = await CargoHandlePointModel.getAffiliatedTransactionPointID(id);
        const idArray: String[] = inputArray.map((obj) => obj._id);
        const orders = new Array();
        for (id of idArray) {
            var order = await this.statisticOrderSentAtTP(id, month);
            if (order.length > 0) {
                orders.push(order);
            }
        }
        return orders;
    }

    //thống kê hàng đi tại điểm tập kết theo tháng
    public static async statisticOrderAtAP2(id: String, month: number) {
        const inputArray: myObject[] = await CargoHandlePointModel.getAffiliatedTransactionPointID(id);
        const idArray: String[] = inputArray.map((obj) => obj._id);
        const orders = new Array();
        for (id of idArray) {
            var order = await this.statisticOrderReceivAtTP(id, month);
            if (order.length > 0) {
                orders.push(order);
            }
        }
        return orders;
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
    confirm: boolean;
    cost: number;
}

export enum PossibleCurrentLocation {
    AtSentPoint,
    AtSentAssemblyPoint,
    AtReceiveAssemblyPoint,
    AtReceivePoint,
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
        confirm: true,
        cost: cargoList.length*200000,
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
