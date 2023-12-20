import express from "express";
import mongoose from "mongoose";
import customerRouter from "./routes/customer";
import authRouter from "./routes/login";
import { SetupProtectedRoute } from "./routes/middleware";
import ordersRouter from "./routes/orders";
import pointsRouter from "./routes/points";
import { OrderModel } from "./models/Order";
import { CargoHandlePointModel } from "./models/CargoHandlePoint";
import cors from 'cors';
//import { Account } from "./routes/login";

const app = express();
app.use(cors);
const allowedOrigins = ['http://localhost:1000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());
app.use(ordersRouter);
app.use(pointsRouter);
SetupProtectedRoute(app);
app.use(authRouter);
app.use(customerRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(
        "mongodb+srv://Kienaya:kienki7up@cluster0.nsaauqc.mongodb.net/DeliveryData"
    );
   console.log(await OrderModel.getOrderStage("k8F4ncSOSizJlglbmgSiT"));
}
