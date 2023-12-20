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
const CargoHandlePoint_1 = require("./models/CargoHandlePoint");
const Order_1 = require("./models/Order");
const orders_1 = __importDefault(require("./routes/orders"));
const points_1 = __importDefault(require("./routes/points"));
const express_1 = __importDefault(require("express"));
const Account_1 = require("./models/Account");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/orders', orders_1.default);
app.use('/points', points_1.default);
const PORT = 3000;
/*app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/
const mongoose = require('mongoose');
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect('mongodb+srv://Kienaya:kienki7up@cluster0.nsaauqc.mongodb.net/DeliveryData');
        const gd = "gd-XWAgL4aMaWCgub5N__2Js";
        const gd1 = "gd-jWRNVAyVH4zjH4QGdLZfP";
        const tk = "tk-cs817Ao7SM_Mt8tl44zdE";
        const id = "138590ea-dfce-4351-82c6-ad0c8f4941f2";
        //console.log(await OrderModel.getAllOrderSentFromPoint(gd));
        //console.log(await OrderModel.getAllOrderReceiveFromPoint(gd1));
        //console.log(await CargoHandlePointModel.getAffiliatedTransactionPointID(tk));
        const inputArray = yield CargoHandlePoint_1.CargoHandlePointModel.getAffiliatedTransactionPointID(tk);
        const idArray = inputArray.map(obj => obj._id);
        //console.log(idArray);
        for (const id of idArray) {
            console.log(yield Order_1.OrderModel.getAllOrderReceiveFromPoint(id));
        }
        yield Account_1.AccountModel.removeAccount(id);
    });
}
