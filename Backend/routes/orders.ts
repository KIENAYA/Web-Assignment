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

//lấy ra đơn hàng gửi theo tháng tại điểm giao dịch
ordersRouter.get('/ordersSendTP', async(req: Request, res: Response) => {
    const id = req.query.id as String;
    const month = req.query.month as unknown as number;
    try {
        const cargos = await OrderModel.statisticOrderSentAtTP(id, month);
        res.json(cargos);
    } catch(error) {
        res.status(404).json({error: 'Cannot find Cargo'});
    }
})

//lấy ra đơn hàng nhận theo tháng tại điểm giao dịch
ordersRouter.get('/ordersReceivetp', async(req: Request, res: Response) => {
    const id = req.query.id as String;
    const month = req.query.month as unknown as number;
    try {
        const cargos = await OrderModel.statisticOrderReceivAtTP(id, month);
        res.json(cargos);
    } catch(error) {
        res.status(404).json({error: 'Cannot find Cargo'});
    }
})

//lấy ra đơn hàng đi theo tháng tại điểm giao dịch
ordersRouter.get('/ordersReceivetp', async(req: Request, res: Response) => {
    const id = req.query.id as String;
    const month = req.query.month as unknown as number;
    try {
        const cargos = await OrderModel.statisticOrderAtAP2(id, month);
        res.json(cargos);
    } catch(error) {
        res.status(404).json({error: 'Cannot find Cargo'});
    }
})

//lấy ra đơn hàng đến theo tháng tại điểm giao dịch
ordersRouter.get('/ordersReceivetp', async(req: Request, res: Response) => {
    const id = req.query.id as String;
    const month = req.query.month as unknown as number;
    try {
        const cargos = await OrderModel.statisticOrderAtAP1(id, month);
        res.json(cargos);
    } catch(error) {
        res.status(404).json({error: 'Cannot find Cargo'});
    }
})
export default ordersRouter;
