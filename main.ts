import { Schema } from "mongoose";
import { CargoHandlePoint, CargoHandlePointModel } from "./models/CargoHandlePoint";
import { Order, OrderModel } from "./models/Order";
import ordersRouter from "./routes/orders";
import pointsRouter from "./routes/points";
import express from 'express'
import { AccountModel } from "./models/Account";

const app = express();
app.use(express.json())
app.use('/orders', ordersRouter);
app.use('/points', pointsRouter);
const PORT = 3000;
/*app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/
const mongoose = require('mongoose');
main().catch(err => console.log(err));
interface myObject {
  _id: String;
}

async function main() {
  await mongoose.connect('mongodb+srv://Kienaya:kienki7up@cluster0.nsaauqc.mongodb.net/DeliveryData');
  const gd = "gd-XWAgL4aMaWCgub5N__2Js";
  const gd1 = "gd-jWRNVAyVH4zjH4QGdLZfP";
  const tk = "tk-cs817Ao7SM_Mt8tl44zdE";
  const id = "138590ea-dfce-4351-82c6-ad0c8f4941f2";
  //console.log(await OrderModel.getAllOrderSentFromPoint(gd));
  //console.log(await OrderModel.getAllOrderReceiveFromPoint(gd1));
  //console.log(await CargoHandlePointModel.getAffiliatedTransactionPointID(tk));
  const inputArray: myObject[] = await CargoHandlePointModel.getAffiliatedTransactionPointID(tk);
  const idArray: String[] = inputArray.map(obj => obj._id);
  //console.log(idArray);
  for(const id of idArray) {
    console.log(await OrderModel.getAllOrderReceiveFromPoint(id));
  }
  
  await AccountModel.removeAccount(id);

}
