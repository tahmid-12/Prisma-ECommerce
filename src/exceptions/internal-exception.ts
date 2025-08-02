import { ErrorCode } from "./root";
import { HttpException } from "./root";

export class InternalException extends HttpException {

    constructor(message: string, errors: any, errorCode: ErrorCode) {
        super(message, errorCode, 500, errors);
    }
}