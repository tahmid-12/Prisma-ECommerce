import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import usersRoutes from "./users";
import cartRoutes from "./cart";

const rootRoutes: Router = Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/products",productRoutes);
rootRoutes.use("/users", usersRoutes);
rootRoutes.use("/cart", cartRoutes);

export default rootRoutes;