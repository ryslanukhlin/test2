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
exports.authMiddelware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../model/User.model");
const authMiddelware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (token == null)
            return res.sendStatus(401);
        const id = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const user = yield User_model_1.UserModel.findById(id)
            .populate('requestFrends')
            .populate('frends')
            .populate('applicationFrends')
            .populate({ path: 'rooms', populate: { path: 'users' } })
            .populate('unreadMessages');
        if (user == null)
            return res.sendStatus(403);
        res.locals.user = user;
        next();
    }
    catch (err) {
        return res.sendStatus(401);
    }
});
exports.authMiddelware = authMiddelware;
