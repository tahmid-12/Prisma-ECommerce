import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    
    const user = (req as any).user;

    if(user.role == 'ADMIN'){
        next();
    }else{
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
}

export default adminMiddleware;