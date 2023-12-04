import express, { Request, Response } from 'express';
import mongoose, { Schema, connect, model } from "mongoose";
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AccountModel, Account } from '../models/Account';
import { auth } from './middleware';
interface User {
    username: string;
    password: string;
}
const authRouter = express.Router()
export const secretKey = 'your-secret-key';
authRouter.use(bodyParser.json());

/*authRouter.post('/signup', async(req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { username: req.body.username, password: hashedPassword}
        const check = await AccountModel.IsUsernamExist(req.body.username)
        if(!check) {
          AccountModel.create(user);
          res.send('Signup Success')
        } else {
          res.send('Username exist')
        }
      } catch {
        console.log('invalid signup');
        res.status(500).send();
      }
})*/
authRouter.post('/login', async (req: Request, res: Response) => {
    const user = await AccountModel.CheckCredential(req.body.username);
    if (user === null) {
      return res.status(401);
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({userId:user.id, Role:user.role}, secretKey, { expiresIn: 3600 });
        res.json({ message: 'Login successful', token });
      }
    } catch {
      res.status(500).send()
    }
  });
  
export default authRouter;
