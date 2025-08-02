"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingUpSchema = void 0;
const zod_1 = require("zod");
exports.SingUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long")
});
