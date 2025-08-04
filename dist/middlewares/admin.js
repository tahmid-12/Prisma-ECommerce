"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorized_1 = require("../exceptions/unauthorized");
const root_1 = require("../exceptions/root");
const adminMiddleware = async (req, _res, next) => {
    const user = req.user;
    if (user.role == 'ADMIN') {
        next();
    }
    else {
        return next(new unauthorized_1.UnauthorizedException('Unauthorized', root_1.ErrorCode.UNAUTHORIZED));
    }
};
exports.default = adminMiddleware;
