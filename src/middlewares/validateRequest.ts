import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { UnprocessableEntity } from "../exceptions/validation";
import { ErrorCode } from "../exceptions/root";

export const validateRequest = (schema: ZodType<any, any, any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new UnprocessableEntity(result.error.issues, "Validation Failed", ErrorCode.UNPROCESSABLE_ENTITY)
      );
    }
    req.body = result.data;
    next();
};