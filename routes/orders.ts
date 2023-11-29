import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/Order';
import { CargoHandlePoint } from '../models/CargoHandlePoint';
import { CargoModel } from '../models/Cargo';
const ordersRouter = express.Router();
ordersRouter.get('/admin', async(req: Request, res: Response) => {
    try{
        const orders = await OrderModel.getAll();
        
        res.json(orders); 
    } catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
})
/*ordersRouter.get('/cargo/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const cargos = await CargoModel.getCargo(id);
        res.json(cargos);
    } catch(error) {
        res.status(404).json({error: 'Cannot find Cargo'});
    }
})*/
export default ordersRouter;
