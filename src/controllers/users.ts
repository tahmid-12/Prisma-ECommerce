import { Request, Response } from "express";
import { prismaClient } from "../prisma/prisma";

export const addAddress = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: user.id,
    },
  });
  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {};

export const listAddresses = async (req: Request, res: Response) => {};
