"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const getUser = (req, res) => {
    const user = res.locals.user;
    return res.status(200).json(user);
};
exports.getUser = getUser;
