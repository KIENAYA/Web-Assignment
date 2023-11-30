import { Schema } from "mongoose";
import {
    CargoHandlePoint,
    CargoHandlePointModel,
} from "./models/CargoHandlePoint";
import { Order, OrderModel } from "./models/Order";
import ordersRouter from "./routes/orders";
import pointsRouter from "./routes/points";
import express from "express";
import { AccountModel } from "./models/Account";
import mongoose from "mongoose";
import { CargoModel } from "./models/Cargo";
// const app = express();
// app.use(express.json())
// app.use('/orders', ordersRouter);
// app.use('/points', pointsRouter);
const PORT = 3000;
/*app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/
main().catch((err) => console.log(err));
interface myObject {
    _id: String;
}
interface newObject {
  _id: String;
}
async function main() {
    await mongoose.connect(
        "mongodb+srv://Kienaya:kienki7up@cluster0.nsaauqc.mongodb.net/DeliveryData"
    );
    const gd = "gd-XWAgL4aMaWCgub5N__2Js";
    const gd1 = "gd-jWRNVAyVH4zjH4QGdLZfP";
    const tk = "tk-K9rwd8ogWh_GVHC8jcCoq";
    const id = "138590ea-dfce-4351-82c6-ad0c8f4941f2";
    //console.log(await OrderModel.getAllOrderSentFromPoint(gd));
    //console.log(await OrderModel.getAllOrderReceiveFromPoint(gd1));
    //console.log(await CargoHandlePointModel.getAffiliatedTransactionPointID(tk));
    /*const inputArray: myObject[] = await CargoHandlePointModel.getAffiliatedTransactionPointID(tk);
  const idArray: String[] = inputArray.map(obj => obj._id);
  const orders = new Array();
  for(const id of idArray) {
    const order = await OrderModel.getAllOrderReceiveFromTransactionPoint(id);
    if(order.length > 0) {
      orders.push(order);
    }
  }
  console.log(orders);*/
  console.log(await CargoModel.getCargoById("QeSlgFEOquBwpVdf3IAac"));
  const cargoArray = (await OrderModel.getCargoList("avRgF73O3P6IYbto2TOVJ")).cargoList;
  const cargos = new Array();
        for(const id in cargoArray) {
            const cargo = await CargoModel.getCargoById(id);
            console.log(cargo);
            if(cargo !== undefined) {
                cargos.push(cargo);
            }
        }
  console.log(cargos);
}
