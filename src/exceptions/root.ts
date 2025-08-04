
export class HttpException extends Error{
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    errors: any;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 404,
    USER_ALREADY_EXISTS = 409,
    INCORRECT_PASSWORD = 401,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_EXCEPTION = 500,
    UNAUTHORIZED = 401,
    PRODUCT_NOT_FOUND = 404,
    INVALID_PRODUCT_ID = 400,
}