import { Request, Response } from "express";
import { prismaClient } from "../prisma/prisma";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (req: Request, res: Response) => {
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: product,
    });

    res.json(updatedProduct);
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const deleteProduct = async (req: Request, res: Response) => {};

export const listProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const [products, total] = await Promise.all([
    prismaClient.product.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prismaClient.product.count(),
  ]);

  res.json({
    products,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await prismaClient.product.findFirstOrThrow({
      where: {
        id,
      },
    });
    res.json(product);
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};
