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
exports.sendMessage = void 0;
const Message_1 = require("../model/Message");
const MessageRoom_model_1 = require("../model/MessageRoom.model");
const User_model_1 = require("../model/User.model");
const sendMessage = (io, socket) => {
    socket.on('MESSAGE:SEND_MESSAGE', (roomId, userId, message, frendId) => __awaiter(void 0, void 0, void 0, function* () {
        const messageBd = yield Message_1.MessageModel.create({ text: message, user: userId, roomId });
        yield MessageRoom_model_1.MessageRoomModel.updateOne({ _id: roomId }, { $push: { messages: messageBd._id } });
        const roomDb = yield MessageRoom_model_1.MessageRoomModel.findById(roomId).populate('messages');
        const frend = yield User_model_1.UserModel.findById(frendId);
        if (frend === null || frend === void 0 ? void 0 : frend.online) {
            io.to(frendId).emit('MESSAGE:ADD_NOTIFICATIOM_NEW_MESSAGE', roomId);
        }
        else {
            yield User_model_1.UserModel.updateOne({ _id: frendId }, { $push: { unreadMessages: messageBd._id } });
        }
        io.to(roomId).emit('MESSAGE:ACCEPT_MESSAGE', roomDb === null || roomDb === void 0 ? void 0 : roomDb.messages);
    }));
};
exports.sendMessage = sendMessage;
