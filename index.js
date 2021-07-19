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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("./route"));
const ADD_FREND_REQUEST_1 = require("./socket/ADD_FREND_REQUEST");
const JOIN_USER_1 = require("./socket/JOIN_USER");
const LEAVE_USER_1 = require("./socket/LEAVE_USER");
const ADD_FREND_1 = require("./socket/ADD_FREND");
const JOIN_MESSAGE_ROOM_1 = require("./socket/JOIN_MESSAGE_ROOM");
const SEND_MESSAGE_1 = require("./socket/SEND_MESSAGE");
const disconnect_1 = require("./socket/disconnect");
const leaveMessageRoom_1 = require("./socket/leaveMessageRoom");
const CLEAR_UNREAD_NOT_APL_FRN_1 = require("./socket/CLEAR_UNREAD_NOT_APL_FRN");
const CLEAR_NEW_NOT_FRENDS_1 = require("./socket/CLEAR_NEW_NOT_FRENDS");
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
app.use(express_1.default.static(path_1.default.resolve(__dirname + '/static')));
dotenv_1.default.config();
app.use(body_parser_1.json());
app.use(cors_1.default({ origin: '*' }));
app.use([...route_1.default]);
const PORT = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    io.on('connection', (socket) => {
        const metaData = { userId: null };
        JOIN_USER_1.joinUser(io, socket, metaData);
        LEAVE_USER_1.leaveUser(io, socket);
        ADD_FREND_REQUEST_1.addFrendRequest(io, socket);
        ADD_FREND_1.addFrend(io, socket);
        CLEAR_UNREAD_NOT_APL_FRN_1.clearUnreadNotificationAplicationFrends(io, socket);
        CLEAR_NEW_NOT_FRENDS_1.clearNewNotificationFrends(io, socket);
        JOIN_MESSAGE_ROOM_1.joinMessageRoom(io, socket);
        leaveMessageRoom_1.leaveMessageRoom(io, socket);
        SEND_MESSAGE_1.sendMessage(io, socket);
        disconnect_1.disconect(io, socket, metaData);
    });
    httpServer.listen(PORT, () => {
        console.log(`server start has been http://localhost:${PORT}`);
    });
});
start();
