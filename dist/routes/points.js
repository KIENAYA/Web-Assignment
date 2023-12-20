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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CargoHandlePoint_1 = require("../models/CargoHandlePoint");
const Account_1 = require("../models/Account");
const Order_1 = require("../models/Order");
const pointsRouter = express_1.default.Router();
//Lấy ra danh sách nhân viên tại điểm có id là ...
pointsRouter.get('/employees/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const employee = yield CargoHandlePoint_1.CargoHandlePointModel.getPointEmployeeById(id);
        res.json(employee);
    }
    catch (err) {
        res.status(404).json({ err: 'Cannot find Employee' });
    }
}));
//Lấy ra đơn hàng gửi thành công tại điểm giao dịch
pointsRouter.get('/complete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getCompleteOrder(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find TransactionPoint' });
    }
}));
//Lấy ra đơn hàng gửi thất bại tại điểm giao dịch
pointsRouter.get('/fail/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getFailedOrder(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find TransactionPoint' });
    }
}));
//lấy ra đơn hàng nhận tại điểm giao dịch đã confirm với id của điểm giao dịch đó
pointsRouter.get('/TPReceiveConfirmed/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getAllOrderReceiveFromTransactionPointConfirmed(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find TransactionPoint' });
    }
}));
//lấy ra đơn hàng tại điểm giao dịch chưa confirm với id của điểm giao dịch đó
pointsRouter.get('/TPReceiveUnConfirmed/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getAllOrderReceiveFromTransactionPointUnconfirmed(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find TransactionPoint' });
    }
}));
//lấy ra đơn hàng đã gửi tại điểm giao dịch với id của điểm giao dịch đó
pointsRouter.get('/TPSent/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getAllOrderSentFromTransactionPointSent(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find TransactionPoint' });
    }
}));
//lấy ra đơn hàng chưa gửi tại điểm giao dịch với id của điểm giao dịch đó
pointsRouter.get('/TPUnSent/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getAllOrderSentFromTransactionPointUnSent(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find TransactionPoint' });
    }
}));
//lấy ra đơn hàng nhận tại điểm tập kết nguồn chưa confirm với id của điểm tập kết đó
pointsRouter.get('/APReceiveFromTPUnconfirm/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getAllOrderReceiveFromTransactionPointToAssemblePointUnconfimed(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find AssemblePoint' });
    }
}));
//lấy ra đơn hàng nhận tại điểm tập kết nguồn đã confirm với id của điểm tập kết đó
pointsRouter.get('/APReceiveFromTPconfirm/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getAllOrderReceiveFromTransactionPointAssemblePointConfimed(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find AssemblePoint' });
    }
}));
//lấy ra đơn hàng đã nhận tại điểm tập kết đích chưa confirm với id của điểm tập kết đó
pointsRouter.get('/APReceiveFromAPUnconfirm/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getAllOrderReceiveFromAssemblePointUnconfirmed(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find AssemblePoint' });
    }
}));
//lấy ra đơn hàng tại điểm tập kết đích chưa confirm với id của điểm tập kết đó
pointsRouter.get('/APReceiveFromAPConfirm/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield Order_1.OrderModel.getAllOrderReceiveFromAssemblePointConfirmed(id);
        res.json(orders);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find AssemblePoint' });
    }
}));
//Xóa tài khoản
pointsRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const Ok = yield Account_1.AccountModel.removeAccount(id);
        res.json({ deleted: Ok });
    }
    catch (err) {
        res.status(500);
    }
}));
//Xác nhận đơn hàng
pointsRouter.patch('/ConfirmOrders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield Order_1.OrderModel.ConfirmOrder(id);
        console.log(order);
        res.json("Confirmed Orders");
    }
    catch (err) {
        res.status(417);
    }
}));
//Lấy danh sách các điểm 
pointsRouter.get('/points', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield CargoHandlePoint_1.CargoHandlePointModel.getPoint());
    }
    catch (err) {
        res.status(500);
    }
}));
//lấy tài khoản trưởng điểm,  tại điểm có id:...
pointsRouter.get('/points/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        res.json(yield Account_1.AccountModel.getPointAdminAccount(id));
    }
    catch (err) {
        res.status(404);
    }
}));
//lấy ra đơn hàng gửi tại điểm có id:...(dùng cho admin)
pointsRouter.get('/points/:id/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        res.json(yield Order_1.OrderModel.getOrderSendAtPoint(id));
    }
    catch (err) {
        res.status(404);
    }
}));
//lấy ra đơn hàng nhận tại điểm có id:...(dùng cho admin)
pointsRouter.get('/points/:id/receive', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        res.json(yield Order_1.OrderModel.getOrderReceiveAtPoint(id));
    }
    catch (err) {
        res.status(404);
    }
}));
exports.default = pointsRouter;
