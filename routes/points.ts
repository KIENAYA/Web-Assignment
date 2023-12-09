import express, { Request, Response } from 'express';
import { CargoHandlePoint, CargoHandlePointModel } from '../models/CargoHandlePoint';
import { AccountModel } from '../models/Account';
import { OrderModel } from '../models/Order';
const pointsRouter = express.Router();
pointsRouter.get('/', async(req: Request, res: Response) => {
    try {
        const employees = await CargoHandlePointModel.getPointEmployees();
        res.json(employees);
    }
    catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    } 
})
pointsRouter.get('/employees/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const employee = await AccountModel.getAccountById(id);
    
        res.json(employee);
    } catch(err) {
        res.status(404).json({err: 'Cannot find Employee'});
    }
})
pointsRouter.get('/TPReceiveConfirmed/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointConfirmed(id);
        res.json(orders);
        
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
})

pointsRouter.get('/TPReceiveUnConfirmed/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromTransactionPointUnconfirmed(id);
        res.json(orders);
        
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
})

pointsRouter.get('/TPSent/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderSentFromTransactionPointSent(id);
        res.json(orders);
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
}) 

pointsRouter.get('TPUnSent/:id',  async(req: Request, res: Response)=> {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderSentFromTransactionPointUnSent(id);
        res.json(orders);
    } catch(error) {
        res.status(404).json({error: 'Cannot find TransactionPoint' })

    }
})
/*pointsRouter.get('/APSent/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderReceiveFromAssemblePoint(id);
        res.json(orders);
    
    } catch(error) {
        res.status(404).json({error: 'Cannot find AssemblePoint'});
    }
})*/
pointsRouter.get('/APReceive/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orders = await OrderModel.getAllOrderSentFromAssemblePoint(id);
        res.json(orders);
    
    } catch(error) {
        res.status(404).json({error: 'Cannot find AssemblePoint'});
    }
})
pointsRouter.delete('/:id', async(req: Request, res: Response) =>{
    try {
        const id = req.params.id;
        const Ok = await AccountModel.removeAccount(id);
    
            res.json({deleted: Ok});
      } catch (err) {
        res.status(500);
      }
})
pointsRouter.patch('/DeliveryOrder/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const order = await OrderModel.ConfirmOrder(id);
        console.log(order);
        res.json("Confirmed Orders")
    } catch(err) {
        res.status(417);
    }
})

pointsRouter.get('/PointAdmin', async(req: Request, res: Response) => {
    try {
        res.json(await CargoHandlePointModel.getPointAdmin());
    } catch(err) {
        res.status(500);
    }
})
export default pointsRouter;