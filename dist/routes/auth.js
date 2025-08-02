"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validateRequest_1 = require("../middlewares/validateRequest");
const users_1 = require("../schema/users");
const error_handler_1 = require("../error-handler");
const auth_2 = __importDefault(require("../middlewares/auth"));
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, validateRequest_1.validateRequest)(users_1.SingUpSchema), (0, error_handler_1.errorHandler)(auth_1.signUp));
authRoutes.post("/login", (0, error_handler_1.errorHandler)(auth_1.login));
authRoutes.get("/me", [auth_2.default], (0, error_handler_1.errorHandler)(auth_1.me));
exports.default = authRoutes;
