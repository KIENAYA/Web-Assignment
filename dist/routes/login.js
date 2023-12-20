"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Account_1 = require("../models/Account");
const Role_1 = require("../models/Role");
const CargoHandlePoint_1 = require("../models/CargoHandlePoint");
const authRouter = express_1.default.Router();
exports.secretKey = "your-secret-key";
authRouter.use(body_parser_1.default.json());
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUserUsername = req.body.username;
        const check = yield Account_1.AccountModel.IsUsernamExist(newUserUsername);
        if (check) {
            res.status(409).send("Username exist");
            return;
        }
        if (req.body.password.length < 8) {
            res.status(400).send("Password must be at least 8 characters");
            return;
        }
        const newUser = {
            _id: faker_1.faker.string.uuid(),
            username: req.body.username,
            password: yield bcrypt_1.default.hash(req.body.password, 10),
            role: req.body.role,
        };
        console.log(newUser);
        const pointId = yield CargoHandlePoint_1.CargoHandlePointModel.getPointIdFromAdmin(res.locals.id);
        yield Account_1.AccountModel.create(newUser);
        yield CargoHandlePoint_1.CargoHandlePointModel.addEmployees(pointId, newUser._id);
        res.status(200).send("Complete SignUp!");
    });
}
authRouter.post("/signup", createUserHandler);
authRouter.post("/protected/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserRole = req.body.role;
    console.log(newUserRole);
    if (newUserRole === Role_1.Role.AssemblyAdmin ||
        (newUserRole === Role_1.Role.TransactionAdmin &&
            res.locals.role !== Role_1.Role.AssemblyAdmin)) {
        res.status(401).send("Unauthorized");
        return;
    }
    if (newUserRole === Role_1.Role.AssemblyPointEmployee &&
        res.locals.role !== Role_1.Role.AssemblyAdmin) {
        res.status(401).send("Unauthorized");
        return;
    }
    if (newUserRole === Role_1.Role.TransactionPointEmployee &&
        res.locals.role !== Role_1.Role.TransactionAdmin) {
        res.status(401).send("Unauthorized");
        return;
    }
    next();
}), createUserHandler);
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield Account_1.AccountModel.CheckCredential(req.body.username);
    if (user === null) {
        return res.status(401);
    }
    try {
        if (yield bcrypt_1.default.compare(req.body.password, user.password)) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, exports.secretKey, { expiresIn: 3600 });
            res.json({ username: user.username, role: user.role, token });
        }
    }
    catch (_a) {
        res.status(500).send();
    }
}));
exports.default = authRouter;
