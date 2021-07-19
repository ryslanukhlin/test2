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
exports.setAvatarUser = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const User_model_1 = require("../model/User.model");
const setAvatarUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileExist = req.file.originalname.split('.').pop();
        const folderPatch = path_1.default.resolve(__dirname, '..', 'static/avatar/');
        if (!fs_1.default.existsSync(folderPatch)) {
            fs_1.default.mkdirSync(folderPatch, { recursive: true });
        }
        const fileName = uuid_1.v1() + '.' + fileExist;
        fs_1.default.writeFileSync(path_1.default.resolve(folderPatch, fileName), req.file.buffer);
        const user = res.locals.user;
        yield User_model_1.UserModel.updateOne({ _id: user._id }, { $set: { avatar: fileName } });
        const updateUser = yield User_model_1.UserModel.findById(user._id)
            .populate('requestFrends')
            .populate('frends')
            .populate('applicationFrends')
            .populate({ path: 'rooms', populate: { path: 'users' } })
            .populate('unreadMessages');
        return res.status(200).json(updateUser);
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.setAvatarUser = setAvatarUser;
