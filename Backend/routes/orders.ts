import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/Order';
import { CargoHandlePoint } from '../models/CargoHandlePoint';
import { CargoModel } from '../models/Cargo';
const ordersRouter = express.Router();


//Lấy ra hàng hóa co trong đơn hàng id
ordersRouter.get('/cargo/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const cargos = await CargoModel.getCargoFromOrder(id);
        res.json(cargos);
    } catch(error) {
        res.status(404).json({error: 'Cannot find Cargo'});
    }
})
export default ordersRouter;
