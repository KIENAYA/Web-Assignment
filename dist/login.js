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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRouter = express_1.default.Router();
const secretKey = 'your-secret-key';
authRouter.use(body_parser_1.default.json());
const accountSchema = new mongoose_1.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true }
});
const Account = (0, mongoose_1.model)('accounts', accountSchema);
authRouter.post('/user/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const user = { username: req.body.username, password: hashedPassword };
        const check = yield Account.findOne({ username: req.body.username });
        if (check == null) {
            Account.create(user);
            res.send('Signup Success');
        }
        else {
            res.send('Username exist');
        }
    }
    catch (_a) {
        console.log('invalid signup');
        res.status(500).send();
    }
}));
authRouter.post('/user/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Account.findOne({ username: req.body.username });
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (yield bcrypt_1.default.compare(req.body.password, user.password)) {
            res.send('Success');
        }
        else {
            res.send('Not Allowed');
        }
        const token = jsonwebtoken_1.default.sign({ user }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    }
    catch (_b) {
        res.status(500).send();
    }
}));
exports.default = authRouter;
