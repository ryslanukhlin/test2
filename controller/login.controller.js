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
exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../model/User.model");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginForm = req.body;
        const user = yield User_model_1.UserModel.findOne({ email: loginForm.email });
        if (!user)
            return res.status(401).json({ error: true });
        if (user.password !== loginForm.password)
            return res.status(401).json({ error: true });
        const token = jsonwebtoken_1.default.sign(user.id, process.env.SECRET_KEY);
        return res.status(200).json({ error: false, token });
    }
    catch (err) {
        return res.status(500).json({ error: true });
    }
});
exports.loginController = loginController;
