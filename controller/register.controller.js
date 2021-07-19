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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const express_validator_1 = require("express-validator");
const User_model_1 = require("../model/User.model");
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        const customError = {};
        errors.array().map((err) => {
            customError[err.param] = err.msg;
        });
        if (!errors.isEmpty()) {
            return res.status(403).json({ errors: customError, validErr: true });
        }
        const bodyParam = req.body;
        const User = new User_model_1.UserModel(Object.assign({}, bodyParam));
        yield User.save();
        return res.status(201).json({ error: false });
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
});
exports.registerController = registerController;
