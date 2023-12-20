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
const pointsRouter = express_1.default.Router();
pointsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield CargoHandlePoint_1.CargoHandlePointModel.getPointEmployees();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
pointsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const employee = yield Account_1.AccountModel.getAccountById(id);
        res.json(employee);
    }
    catch (err) {
        res.status(404).json({ err: 'Cannot find Employee' });
    }
}));
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
exports.default = pointsRouter;
