import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../prisma/prisma";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";


export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (user) {
    return next(
      new BadRequestException(
        "User already Exists!",
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (!user) {
    return next(new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND));
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestException('Incorrect Password', ErrorCode.INCORRECT_PASSWORD);
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.send({
    user,
    token,
  });
};

export const me = async (req: Request, res: Response) => {
  res.json((req as any).user);
};