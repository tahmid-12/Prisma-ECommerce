"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const secret_1 = require("./secret");
const routes_1 = __importDefault(require("./routes"));
const errors_1 = require("./middlewares/errors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use(errors_1.errorMiddleware);
app.listen(secret_1.PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
