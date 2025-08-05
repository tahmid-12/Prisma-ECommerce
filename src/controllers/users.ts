import { Request, Response } from "express";
import { prismaClient } from "../prisma/prisma";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Address } from "@prisma/client";

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

export const deleteAddress = async (req: Request, res: Response) => {
  const addressId = parseInt(req.params.id, 10);

  const address = await prismaClient.address.findUnique({
    where: { id: addressId },
  });

  if (!address) {
    return res.status(404).json({
      error: new NotFoundException(
        "Address Not Found",
        ErrorCode.ADDRESS_NOT_FOUND
      ).message,
    });
  }

  await prismaClient.address.delete({
    where: { id: addressId },
  });

  res.json({ success: true });
};

export const listAddresses = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const addresses = await prismaClient.address.findMany({
    where: {
      userId: user.id,
    },
  });
  res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const validatedData = req.body;
  let shippingAddress: Address;
  let billingAddress: Address;

  if (validatedData.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Address Not Founnd",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
  }

  if (validatedData.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Address Not Founnd",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
  }

  const updateUser = await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: validatedData,
  });

  res.json(updateUser);
};
