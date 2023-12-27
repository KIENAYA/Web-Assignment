import express, { Request, Response } from 'express';
import { AccountModel } from '../models/Account';
import { CargoHandlePointModel } from '../models/CargoHandlePoint';

const employeeRouter = express.Router();

//Lấy ra danh sách nhân viên(tài khoản và profile) tại điểm có id:..
employeeRouter.get('/:id/employees', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const employee = await CargoHandlePointModel.getPointEmployees(id);
        res.json(employee);
    } catch(err) {
        res.status(404).json({err: 'Cannot find Employee'});
    }
})

//lấy ra profile của tài khoản có id
employeeRouter.get('/:id/profile', async(req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const employee = await AccountModel.getProfileById(id);
        res.json(employee)
    } catch(error) {
        res.status(404)
    }
})

//Xóa tài khoản
employeeRouter.delete('/:id', async(req: Request, res: Response) =>{
    try {
        const id = req.params.id;
        const Ok = await AccountModel.removeAccount(id);
    
            res.json({deleted: Ok});
      } catch (err) {
        res.status(500);
      }
})


//lấy ra id của điểm từ id của nhân viên
employeeRouter.get('/:id/point', async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const point = await CargoHandlePointModel.getPointIdFromAdmin(id);
        res.json(point);
    } catch(err) {
        res.status(404);
        console.log(err)
    }
})
export default employeeRouter;