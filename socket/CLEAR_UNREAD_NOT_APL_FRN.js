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
exports.clearUnreadNotificationAplicationFrends = void 0;
const User_model_1 = require("../model/User.model");
const clearUnreadNotificationAplicationFrends = (io, socket) => {
    socket.on('USER:CLEAR_UREAD_NOTIFICATION_APLICATION_FRENDS', (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield User_model_1.UserModel.updateOne({ _id: userId }, { $set: { unreadNotificationAplicationFrends: [] } });
    }));
};
exports.clearUnreadNotificationAplicationFrends = clearUnreadNotificationAplicationFrends;
