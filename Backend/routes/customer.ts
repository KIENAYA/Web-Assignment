import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/Order';
import { CargoHandlePoint } from '../models/CargoHandlePoint';
import { CargoModel } from '../models/Cargo';
const customerRouter =  express.Router();
customerRouter.get('/customer/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const stage = await OrderModel.getOrderStage(id);
        res.json(stage);
    } catch(err) {
        res.status(500);
    }
})
export default customerRouter;