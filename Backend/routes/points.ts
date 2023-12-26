import express, { Request, Response } from 'express';
import { CargoHandlePoint, CargoHandlePointModel } from '../models/CargoHandlePoint';
import { AccountModel } from '../models/Account';
import { OrderModel } from '../models/Order';
const pointsRouter = express.Router();

//Lấy ra các đơn hàng chuyển thành công tại điểm giao dịch có id là ...
pointsRouter.get('/:id/complete', async(req: Request, res: Response) => {
    const id = req.params.id
    try {
        const order = await OrderModel.getCompleteOrder(id);
        res.json(order);
    } catch(err) {
        res.status(500);
    }
})

//Trả lại đơn hàng lỗi về điểm giao dịch
pointsRouter.get('/:id/return', async(req: Request, res: Response) => {
    const id = req.params.id
    try {
        const order = await OrderModel.ReturnOrder(id);
        res.json(order);
    } catch(err) {
        res.status(500);
    }
})

//Lấy ra các đơn hàng chuyển thất bại tại điểm giao dịch có id là ...
pointsRouter.get('/:id/fail', async(req: Request, res: Response) => {
    const id = req.params.id
    try {
        const order = await OrderModel.getFailedOrder(id);
        res.json(order);
    } catch(err) {
        res.status(500);
    }
})

//lấy ra đơn hàng nhận tại điểm giao dịch đã confirm với id của điểm giao dịch đó
pointsRouter.get('/:id/receive_cf', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointConfirmed(id);
        res.json(orders);
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
})

//lấy ra đơn hàng tại điểm giao dịch chưa confirm với id của điểm giao dịch đó 
pointsRouter.get('/:id/receive_ucf', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointUnconfirmed(id);
        res.json(orders);
        
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
})

//lấy ra đơn hàng cần gửi tại điểm giao dịch với id của điểm giao dịch đó
pointsRouter.get('/:id/send',  async(req: Request, res: Response)=> {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderSentFromTransactionPointSent(id);
        res.json(orders);
    } catch(error) {
        res.status(404).json({error: 'Cannot find Order' })

    }
})

//lấy ra đơn hàng điểm tập kết nhận từ điểm giao dịch chưa confirm
pointsRouter.get('/:id/receive/type1_ucf', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointToAssemblePointUnconfimed(id);
        res.json(orders);
    
    } catch(error) {
        res.status(404).json({error: 'Cannot find AssemblePoint'});
    }
})

//lấy ra đơn hàng điểm tập kết nhận từ điểm giao dịch đã confirm
pointsRouter.get('/:id/receive/type1_cf', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointAssemblePointConfimed(id);
        res.json(orders);
    
    } catch(error) {
        res.status(404).json({error: 'Cannot find AssemblePoint'});
    }
})

//lấy ra đơn hàng điểm tập kết nhận từ điểm tập kết chưa confirm
pointsRouter.get('/:id/receive/type2_ucf', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromAssemblePointUnconfirmed(id);
        res.json(orders);
    
    } catch(error) {
        res.status(404).json({error: 'Cannot find AssemblePoint'});
}})

//lấy ra đơn hàng tại điểm tập kết nhận từ điểm tập kết đã confirm
pointsRouter.get('/:id/receive/type2_cf', async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const orders = await OrderModel.getAllOrderReceiveFromAssemblePointConfirmed(id);
            res.json(orders);
        
        } catch(error) {
            res.status(404).json({error: 'Cannot find AssemblePoint'});
}})

//Chuyển đơn hàng 
pointsRouter.patch('/:id/transfer', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const order = await OrderModel.TransferOrder(id);
        console.log(order);
        res.json("Chuyển hàng thành công")
    } catch(err) {
        res.status(417);
    }
})

//Xác nhận đơn hàng
pointsRouter.patch('/:id/confirm', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const order = await OrderModel.ConfirmOrder(id);
        console.log(order);
        res.json("Confirmed Orders")
    } catch(err) {
        res.status(417);
    }
})

//Trưởng điểm của tài khoản admin
pointsRouter.get('/pointAdmin', async(req: Request, res: Response) => {
    try {
        res.json(await CargoHandlePointModel.getPointAdmin());
    } catch(err) {
        res.status(500);
    }
})
export default pointsRouter;