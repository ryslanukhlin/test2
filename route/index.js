"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_route_1 = __importDefault(require("./Auth.route"));
const User_router_1 = __importDefault(require("./User.router"));
const globalRouter = [Auth_route_1.default, User_router_1.default];
exports.default = globalRouter;
