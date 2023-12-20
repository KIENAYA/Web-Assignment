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
const Order_1 = require("../models/Order");
const Cargo_1 = require("../models/Cargo");
const ordersRouter = express_1.default.Router();
//Lấy tất cả đơn hàng dành cho tài khoản admin
ordersRouter.get('/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.OrderModel.getAll();
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//Lấy ra hàng hóa co trong đơn hàng id
ordersRouter.get('/orders/cargo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const cargos = yield Cargo_1.CargoModel.getCargoFromOrder(id);
        res.json(cargos);
    }
    catch (error) {
        res.status(404).json({ error: 'Cannot find Cargo' });
    }
}));
exports.default = ordersRouter;
