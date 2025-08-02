"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const root_1 = require("./exceptions/root");
const internal_exception_1 = require("./exceptions/internal-exception");
const errorHandler = (method) => {
    return async (req, res, next) => {
        try {
            await method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof root_1.HttpException) {
                exception = error;
            }
            else {
                exception = new internal_exception_1.InternalException("Something went wrong", error, root_1.ErrorCode.INTERNAL_EXCEPTION);
            }
            next(exception);
        }
    };
};
exports.errorHandler = errorHandler;
