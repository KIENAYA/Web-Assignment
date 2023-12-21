import express, { Request, Response } from 'express';
import { AccountModel } from '../models/Account';

const employeeRouter = express.Router();
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

export default employeeRouter;