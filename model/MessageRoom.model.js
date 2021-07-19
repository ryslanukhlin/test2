"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoomModel = void 0;
const mongoose_1 = require("mongoose");
const MessageRoomSchema = new mongoose_1.Schema({
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' }],
});
exports.MessageRoomModel = mongoose_1.model('MessageRoom', MessageRoomSchema);
