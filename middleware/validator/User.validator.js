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
exports.UserCreateCheckSchema = void 0;
const express_validator_1 = require("express-validator");
const User_model_1 = require("../../model/User.model");
exports.UserCreateCheckSchema = express_validator_1.checkSchema({
    nicname: {
        isString: {
            errorMessage: 'неправильный никнейм',
        },
        isLength: {
            errorMessage: 'никнейм должен быть не меньше 3 букв',
            options: { min: 3 },
        },
    },
    email: {
        isEmail: true,
        errorMessage: 'неправильная почта',
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield User_model_1.UserModel.findOne({ email: value });
                if (user)
                    throw Error('Данный адрес почты был зарегестрирован');
                else
                    return true;
            }),
        },
    },
    password: {
        isString: {
            errorMessage: 'неправильный пароль',
        },
        isLength: {
            errorMessage: 'Пароль должен быть не меньше 7 букв',
            options: { min: 7 },
        },
    },
    repeatPassword: {
        custom: {
            options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
                if (value !== req.body.password)
                    throw Error('Пароли не совпадают');
                else
                    return true;
            }),
        },
    },
});
