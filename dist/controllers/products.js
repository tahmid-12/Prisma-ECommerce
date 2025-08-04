"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.listProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const prisma_1 = require("../prisma/prisma");
const createProduct = async (req, res) => {
    const product = await prisma_1.prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(","),
        }
    });
    res.json(product);
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => { };
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => { };
exports.deleteProduct = deleteProduct;
const listProducts = async (req, res) => { };
exports.listProducts = listProducts;
const getProductById = async (req, res) => { };
exports.getProductById = getProductById;
