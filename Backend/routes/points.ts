import express, { Request, Response } from 'express';
import { CargoHandlePoint, CargoHandlePointModel } from '../models/CargoHandlePoint';
import { AccountModel } from '../models/Account';
import { OrderModel } from '../models/Order';
const pointsRouter = express.Router();
//Lấy ra tất cả nhân viên
pointsRouter.get('/', async(req: Request, res: Response) => {
    try {
        const employees = await CargoHandlePointModel.getPointEmployees();
        res.json(employees);
    }
    catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    } 
})

//Lấy ra danh sách nhân viên tại điểm có id là ...
pointsRouter.get('/employees/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const employee = await AccountModel.getAccountById(id);
    
        res.json(employee);
    } catch(err) {
        res.status(404).json({err: 'Cannot find Employee'});
    }
})

//lấy ra đơn hàng nhận tại điểm giao dịch đã confirm với id của điểm giao dịch đó
pointsRouter.get('/TPReceiveConfirmed/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointConfirmed(id);
        res.json(orders);
        
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
})

//lấy ra đơn hàng tại điểm giao dịch chưa confirm với id của điểm giao dịch đó
pointsRouter.get('/TPReceiveUnConfirmed/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointUnconfirmed(id);
        res.json(orders);
        
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
})

//lấy ra đơn hàng đã gửi tại điểm giao dịch với id của điểm giao dịch đó
pointsRouter.get('/TPSent/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderSentFromTransactionPointSent(id);
        res.json(orders);
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
}) 

//lấy ra đơn hàng chưa gửi tại điểm giao dịch với id của điểm giao dịch đó
pointsRouter.get('TPUnSent/:id',  async(req: Request, res: Response)=> {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderSentFromTransactionPointUnSent(id);
        res.json(orders);
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
})

//lấy ra đơn hàng nhận tại điểm tập kết nguồn chưa confirm với id của điểm tập kết đó
pointsRouter.get('/APReceiveFromTPUnconfirm/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointToAssemblePointUnconfimed(id);
        res.json(orders);
    
    } catch(error) {
        res.status(404).json({error: 'Cannot find AssemblePoint'});
    }
})

//lấy ra đơn hàng nhận tại điểm tập kết nguồn đã confirm với id của điểm tập kết đó
pointsRouter.get('/APReceiveFromTPconfirm/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointAssemblePointConfimed(id);
        res.json(orders);
    
    } catch(error) {
        res.status(404).json({error: 'Cannot find AssemblePoint'});
    }
})

//lấy ra đơn hàng đã nhận tại điểm tập kết đích chưa confirm với id của điểm tập kết đó
pointsRouter.get('/APReceiveFromAPUnconfirm/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromAssemblePointUnconfirmed(id);
        res.json(orders);
    
    } catch(error) {
        res.status(404).json({error: 'Cannot find AssemblePoint'});
}})

//lấy ra đơn hàng tại điểm tập kết đích chưa confirm với id của điểm tập kết đó
pointsRouter.get('/APReceiveFromAPConfirm/:id', async(req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const orders = await OrderModel.getAllOrderReceiveFromAssemblePointConfirmed(id);
            res.json(orders);
        
        } catch(error) {
            res.status(404).json({error: 'Cannot find AssemblePoint'});
}})

//Xóa tài khoản
pointsRouter.delete('/:id', async(req: Request, res: Response) =>{
    try {
        const id = req.params.id;
        const Ok = await AccountModel.removeAccount(id);
    
            res.json({deleted: Ok});
      } catch (err) {
        res.status(500);
      }
})

//Xác nhận đơn hàng
pointsRouter.patch('/ConfirmOrders/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const order = await OrderModel.ConfirmOrder(id);
        console.log(order);
        res.json("Confirmed Orders")
    } catch(err) {
        res.status(417);
    }
})

//Trưởng điểm
pointsRouter.get('/PointAdmin', async(req: Request, res: Response) => {
    try {
        res.json(await CargoHandlePointModel.getPointAdmin());
    } catch(err) {
        res.status(500);
    }
})
export default pointsRouter;