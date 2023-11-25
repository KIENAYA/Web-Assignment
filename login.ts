import express, { Request, Response } from 'express';
import mongoose, { Schema, connect, model } from "mongoose";
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
    username: string;
    password: string;
}
const app = express();
const PORT = 3000;
const secretKey = 'your-secret-key';
app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
async function main() {
    await connect('mongodb+srv://Kienaya:kienki7up@cluster0.nsaauqc.mongodb.net/DeliveryData');
 }
main().catch(err => console.log(err));
const accountSchema = new Schema<User>({
      username: {type: String, require: true},
      password: {type: String, require: true}
});
const Account = model<User>('accounts', accountSchema);
app.post('/user/signup', async(req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { username: req.body.username, password: hashedPassword}
        const check = await Account.findOne({username: req.body.username})
        if(check == null) {
          Account.create(user)
          res.send('Signup Success')
        } else {
          res.send('Username exist')
        }
      } catch {
        console.log('invalid signup');
        res.status(500).send();
      }
})
app.post('/user/login', async (req: Request, res: Response) => {
    const user = await Account.findOne({username: req.body.username})
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      
      } else {
        res.send('Not Allowed')
      }
      const token = jwt.sign({user}, secretKey, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch {
      res.status(500).send()
    }
  });
  
