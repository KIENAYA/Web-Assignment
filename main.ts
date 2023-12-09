import express from "express";
import mongoose from "mongoose";
import customerRouter from "./routes/customer";
import authRouter from "./routes/login";
import { SetupProtectedRoute } from "./routes/middleware";
import ordersRouter from "./routes/orders";
import pointsRouter from "./routes/points";
import { OrderModel } from "./models/Order";
import { CargoHandlePointModel } from "./models/CargoHandlePoint";
//import { Account } from "./routes/login";
const app = express();
app.use(express.json());
app.use("/orders", ordersRouter);
app.use("/points", pointsRouter);
SetupProtectedRoute(app);
app.use(authRouter);
app.use("/customer", customerRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
main().catch((err) => console.log(err));
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
    //console.log(await CargoModel.getCargoById("bYfqV9ABs0izaHbvxF1aq"));
    //console.log(await CargoModel.getCargoFromOrder("jlZ699DK_DSJejDmxybw8"));
    console.log(await CargoHandlePointModel.getPointAdmin());
}
