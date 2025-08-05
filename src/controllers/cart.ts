import { Request, Response } from "express";
import { prismaClient } from "../prisma/prisma";
import { NotFoundException } from "../exceptions/not-found";
import { Product } from "@prisma/client";
import { ErrorCode } from "../exceptions/root";

export const addItemsToCart = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const validatedData = req.body;
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (err) {
    throw new NotFoundException(
      "producy Not Found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  const cart = await prismaClient.cartItem.create({
    data: {
      userId: user.id,
      productId: product.id,
      quantity: validatedData.quantity,
    },
  });
  res.json(cart);
};

export const deleteItemsFromCart = async (req: Request, res: Response) => {
  const user = (req as any).user;

  await prismaClient.cartItem.delete({
    where: {
      id: parseInt(req.params.id),
      userId: user.id,
    },
  });
  res.json({
    success: true,
  });
};

export const changeQuantity = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const validatedData = req.body;

  const updateCartQuantity = await prismaClient.cartItem.update({
    where: {
      id: parseInt(req.params.id),
      userId: user.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });

  res.json(updateCartQuantity);
};

export const getQuantity = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const [cartItems, total] = await Promise.all([
    prismaClient.cartItem.findMany({
      skip,
      take: pageSize,
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prismaClient.cartItem.count(),
  ]);

  res.json({
    cartItems,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
};
