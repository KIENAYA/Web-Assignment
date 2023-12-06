import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AccountModel } from "../models/Account";
import { Role } from "../models/Role";

const authRouter = express.Router();
export const secretKey = "your-secret-key";
authRouter.use(bodyParser.json());

async function createUserHandler(req: Request, res: Response) {
    const newUserUsername = req.body.username;
    const check = await AccountModel.IsUsernamExist(newUserUsername);

    if (check) {
        res.status(409).send("Username exist");
        return;
    }

    if (req.body.password.length < 8) {
        res.status(400).send("Password must be at least 8 characters");
        return;
    }

    const newUser = {
        _id: faker.string.uuid(),
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.body.role,
    };
    console.log(newUser);
    await AccountModel.create(newUser);
}

authRouter.post("/signup", createUserHandler);

authRouter.post(
    "/protected/signup",
    async (req: Request, res: Response, next: NextFunction) => {
        const newUserRole = req.body.role;
        console.log(newUserRole);
        if (
            newUserRole === Role.AssemblyAdmin ||
            (newUserRole === Role.TransactionAdmin &&
                res.locals.role !== Role.AssemblyAdmin)
        ) {
            res.status(401).send("Unauthorized");
            return;
        }

        if (
            newUserRole === Role.AssemblyPointEmployee &&
            res.locals.role !== Role.AssemblyAdmin
        ) {
            res.status(401).send("Unauthorized");
            return;
        }

        if (
            newUserRole === Role.TransactionPointEmployee &&
            res.locals.role !== Role.TransactionAdmin
        ) {
            res.status(401).send("Unauthorized");
            return;
        }

        next();
    },
    createUserHandler
);

authRouter.post("/login", async (req: Request, res: Response) => {
    const user = await AccountModel.CheckCredential(req.body.username);
    if (user === null) {
        return res.status(401);
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign(
                { id: user.id, role: user.role },
                secretKey,
                { expiresIn: 3600 }
            );
            res.json({ message: "Login successful", token });
        }
    } catch {
        res.status(500).send();
    }
});

export default authRouter;
