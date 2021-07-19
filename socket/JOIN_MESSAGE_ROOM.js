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
exports.joinMessageRoom = void 0;
const MessageRoom_model_1 = require("../model/MessageRoom.model");
const User_model_1 = require("../model/User.model");
const joinMessageRoom = (io, socket) => {
    socket.on('MESSAGE:JOIN_MESSAGE_ROOM', (roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(roomId);
        const roomDb = yield MessageRoom_model_1.MessageRoomModel.findById(roomId).populate('messages');
        io.to(roomId).emit('MESSAGE:GET_MESSAGES', roomDb === null || roomDb === void 0 ? void 0 : roomDb.messages);
        const user = yield User_model_1.UserModel.findById(userId).populate('unreadMessages');
        const clearUnderMessages = user === null || user === void 0 ? void 0 : user.unreadMessages.filter((item) => item.roomId != roomId);
        yield User_model_1.UserModel.updateOne({ _id: userId }, { $set: { unreadMessages: clearUnderMessages } });
    }));
};
exports.joinMessageRoom = joinMessageRoom;
