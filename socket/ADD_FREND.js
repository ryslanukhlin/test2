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
exports.addFrend = void 0;
const MessageRoom_model_1 = require("../model/MessageRoom.model");
const User_model_1 = require("../model/User.model");
const addFrend = (io, socket) => {
    socket.on('USER:ADD_FREND', (userId, frendId) => __awaiter(void 0, void 0, void 0, function* () {
        const room = yield MessageRoom_model_1.MessageRoomModel.create({ users: [userId, frendId] });
        yield User_model_1.UserModel.updateOne({ _id: userId }, { $push: { frends: frendId, rooms: room._id }, $unset: { applicationFrends: frendId } });
        yield User_model_1.UserModel.updateOne({ _id: frendId }, { $push: { frends: userId, rooms: room._id }, $unset: { requestFrends: userId } });
        const user = yield User_model_1.UserModel.findById(userId)
            .populate('requestFrends')
            .populate('frends')
            .populate('applicationFrends')
            .populate({ path: 'rooms', populate: { path: 'users' } })
            .populate('unreadMessages');
        const frend = yield User_model_1.UserModel.findById(frendId);
        if (frend === null || frend === void 0 ? void 0 : frend.online) {
            io.to(frendId).emit('USER:USER:ADD_FREND_SUCCESS', user);
        }
        else {
            yield User_model_1.UserModel.updateOne({ _id: frendId }, { $push: { newNotificationFrends: userId } });
        }
        io.to(userId).emit('USER:ADD_FREND_SUCCESS');
    }));
};
exports.addFrend = addFrend;
