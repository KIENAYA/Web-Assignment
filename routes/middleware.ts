import { Express, NextFunction, Router } from "express";
import express from "express";
import { expressjwt, Request as JWTRequest } from "express-jwt";
import { secretKey } from "./login";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { Role } from "../models/Role";

interface CustomRequest extends Request {
    id: string;
    role: Role;
}

async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error();
        }

        jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                throw new Error();
            }
            const user = decoded as CustomRequest;
            res.locals.id = user.id;
            console.log(user.id);
            res.locals.role = user.role;
            console.log(user.role);
        });

        next();
    } catch (err) {
        res.status(401).send("Please authenticate");
    }
}

export function SetupProtectedRoute(app: Express) {
    app.use("/protected", auth);
}
