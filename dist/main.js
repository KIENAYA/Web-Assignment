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
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("./models/Order");
const mongoose = require('mongoose');
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect('mongodb+srv://Kienaya:kienki7up@cluster0.nsaauqc.mongodb.net/DeliveryData');
        const gd = "gd-XWAgL4aMaWCgub5N__2Js";
        const gd1 = "gd-jWRNVAyVH4zjH4QGdLZfP";
        console.log(yield Order_1.OrderModel.getAllOrderSentFromPoint(gd));
        console.log(yield Order_1.OrderModel.getAllOrderReceiveFromPoint(gd1));
    });
}
