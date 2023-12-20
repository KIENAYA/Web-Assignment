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
exports.SetupProtectedRoute = void 0;
const login_1 = require("./login");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token) {
                throw new Error();
            }
            jsonwebtoken_1.default.verify(token, login_1.secretKey, function (err, decoded) {
                if (err) {
                    throw new Error();
                }
                const user = decoded;
                res.locals.id = user.id;
                console.log(user.id);
                res.locals.role = user.role;
                console.log(user.role);
            });
            next();
        }
        catch (err) {
            res.status(401).send("Please authenticate");
        }
    });
}
function SetupProtectedRoute(app) {
    app.use("/protected", auth);
}
exports.SetupProtectedRoute = SetupProtectedRoute;
