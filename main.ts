import { Schema } from "mongoose";
import { CargoHandlePoint, CargoHandlePointModel } from "./models/CargoHandlePoint";
import { Order, OrderModel } from "./models/Order";
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://Kienaya:kienki7up@cluster0.nsaauqc.mongodb.net/DeliveryData');
  const gd = "gd-XWAgL4aMaWCgub5N__2Js";
  const gd1 = "gd-jWRNVAyVH4zjH4QGdLZfP";
  console.log(await OrderModel.getAllOrderSentFromPoint(gd));
  console.log(await OrderModel.getAllOrderReceiveFromPoint(gd1));
}
