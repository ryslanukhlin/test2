"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    text: { type: String, require: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    roomId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'MessageRoom' },
});
exports.MessageModel = mongoose_1.model('Message', MessageSchema);
