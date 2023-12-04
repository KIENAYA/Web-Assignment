import { Express, NextFunction, Router } from "express";
import express from "express";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { secretKey } from "./login";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

// or ES6
// import { expressjwt, ExpressJwtRequest } from "express-jwt";
const protectedRoute = express.Router();
export interface CustomRequest extends Request {
  token: string | JwtPayload;
 }
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
 
    if (!token) {
      throw new Error();
    }
 
    const decoded = jwt.verify(token, secretKey);
    (req as CustomRequest).token = decoded;
 
    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
 };
 protectedRoute.get('/protected', auth, (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route' });
});
export default protectedRoute;