"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorized_1 = require("../exceptions/unauthorized");
const root_1 = require("../exceptions/root");
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = require("../secret");
const prisma_1 = require("../prisma/prisma");
const authMiddleware = async (req, _res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new unauthorized_1.UnauthorizedException('Unauthorized', root_1.ErrorCode.UNAUTHORIZED));
    }
    try {
        const payload = jwt.verify(token, secret_1.JWT_SECRET);
        const user = await prisma_1.prismaClient.user.findFirst({
            where: { id: payload.userId }
        });
        if (!user) {
            return next(new unauthorized_1.UnauthorizedException('User not found', root_1.ErrorCode.UNAUTHORIZED));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new unauthorized_1.UnauthorizedException('User not found', root_1.ErrorCode.UNAUTHORIZED));
    }
};
exports.default = authMiddleware;
