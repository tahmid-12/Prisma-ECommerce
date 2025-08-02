"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validation_1 = require("../exceptions/validation");
const root_1 = require("../exceptions/root");
const validateRequest = (schema) => (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return next(new validation_1.UnprocessableEntity(result.error.issues, "Validation Failed", root_1.ErrorCode.UNPROCESSABLE_ENTITY));
    }
    req.body = result.data;
    next();
};
exports.validateRequest = validateRequest;
