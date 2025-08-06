import { Request, Response } from "express";
import { prismaClient } from "../prisma/prisma";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;

  return await prismaClient.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
    if (cartItems.length === 0) {
      return res.json({
        messaage: "Cart is Empty",
      });
    }
    const price = cartItems.reduce((prev, current) => {
      return prev + current.quantity * Number(current.product.price);
    }, 0);
    const address = await tx.address.findFirst({
      where: {
        id: user.defaultShippingAddress,
      },
      select: {
        lineOne: true,
        lineTwo: true,
        city: true,
        country: true,
        pinCode: true,
      },
    });
    const order = await tx.order.create({
      data: {
        userId: user.id,
        netAmount: price,
        address: address ? JSON.stringify(address) : "",
        products: {
          create: cartItems.map((cart) => {
            return {
              productId: cart.productId,
              quantity: cart.quantity,
            };
          }),
        },
      },
    });

    const orderEvent = await tx.orderEvent.create({
      data: {
        orderId: order.id,
      },
    });
    await tx.cartItem.deleteMany({
      where: {
        userId: user.id,
      },
    });
    return res.json(order);
  });
};

export const listOrder = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const [orders, total] = await Promise.all([
    prismaClient.order.findMany({
      where: {
        userId: user.id,
      },
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prismaClient.order.count(),
  ]);

  res.json({
    orders,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            status: "CANCELLED"
        }
    })
    res.json(order)
  } catch (err) {
    throw new NotFoundException("Order Not Found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.findFirstOrThrow({
      where: {
        id: Number(req.params.id),
      },
      include: {
        products: true,
        events: true,
      },
    });
    res.json(order);
  } catch (err) {
    throw new NotFoundException("Order Not Found", ErrorCode.ORDER_NOT_FOUND);
  }
};
