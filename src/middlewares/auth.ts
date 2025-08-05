import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { prismaClient } from "../prisma/prisma";

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return next(new UnauthorizedException('Unauthorized',ErrorCode.UNAUTHORIZED));
    }

    try{
        const payload: {userId: number} = jwt.verify(token, JWT_SECRET) as any;

        const user = await prismaClient.user.findFirst({
            where: { id: payload.userId }
        });

        // console.log("USER IN MIDDLEWARE",  user?.id)

        if(!user){
            return next(new UnauthorizedException('User not found', ErrorCode.UNAUTHORIZED));
        }

        (req as any).user = user;
        next();

    }catch(error) {
        return next(new UnauthorizedException('User not found', ErrorCode.UNAUTHORIZED));
    }
}

export default authMiddleware;