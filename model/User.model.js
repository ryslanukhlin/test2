"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    avatar: { type: String },
    nicname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    applicationFrends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    requestFrends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    frends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    rooms: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'MessageRoom' }],
    unreadMessages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' }],
    unreadNotificationAplicationFrends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    newNotificationFrends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    online: { type: Boolean, default: false },
});
exports.UserModel = mongoose_1.model('User', UserSchema);
