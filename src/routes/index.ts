import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import usersRoutes from "./users";
import cartRoutes from "./cart";
import orderRoutes from "./orders";

const rootRoutes: Router = Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/products",productRoutes);
rootRoutes.use("/users", usersRoutes);
rootRoutes.use("/cart", cartRoutes);
rootRoutes.use("/order", orderRoutes);

export default rootRoutes;