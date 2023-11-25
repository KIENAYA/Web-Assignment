import express, { Request, Response } from 'express';
import { CargoHandlePoint, CargoHandlePointModel } from '../models/CargoHandlePoint';
import { AccountModel } from '../models/Account';
import { ok } from 'assert';
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
pointsRouter.get('/:id', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const employee = await AccountModel.getAccountById(id);
    
        res.json(employee);
    } catch(err) {
        res.status(404).json({err: 'Cannot find Employee'});
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

export default pointsRouter;