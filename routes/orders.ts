import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/Order';
import { CargoHandlePoint } from '../models/CargoHandlePoint';

const ordersRouter = express.Router();
ordersRouter.get('/', async(req: Request, res: Response) => {
    try{
        const orders = await OrderModel.getAll();
        
        res.json(orders); 
    } catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
})
ordersRouter.get('/orderReceivedInTP/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromPoint(id);
        res.json(orders);
        
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
}) 
ordersRouter.get('/orderSentInTP/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderSentFromPoint(id);
        res.json(orders);
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
}) 
export default ordersRouter;
