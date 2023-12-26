import express from "express";
import mongoose from "mongoose";
import customerRouter from "./routes/customer";
import authRouter from "./routes/login";
import { SetupProtectedRoute } from "./routes/middleware";
import ordersRouter from "./routes/orders";
import pointsRouter from "./routes/points";
import { OrderModel } from "./models/Order";
import { CargoHandlePointModel } from "./models/CargoHandlePoint";
import cors, { CorsOptions } from 'cors';
import { AccountModel } from "./models/Account";
import employeeRouter from "./routes/employee";
//import { Account } from "./routes/login";

const app = express();
const allowedOrigins = ['http://localhost:5173'];

const options: CorsOptions = {
  origin: allowedOrigins
};
app.use(express.json());
app.use(ordersRouter);
app.use(pointsRouter);
SetupProtectedRoute(app);
app.use(authRouter);
app.use(customerRouter);
app.use(employeeRouter)
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(
        "mongodb+srv://Kienaya:kienki7up@cluster0.nsaauqc.mongodb.net/DeliveryData"
    );
    
}
