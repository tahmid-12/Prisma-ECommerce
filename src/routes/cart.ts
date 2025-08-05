import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { addItemsToCart, changeQuantity, deleteItemsFromCart, getQuantity } from "../controllers/cart";
import { validateRequest } from "../middlewares/validateRequest";
import { ChangeQuantityScheme } from "../schema/cart";

const cartRoutes: Router = Router();

cartRoutes.post("/", authMiddleware, errorHandler(addItemsToCart));
cartRoutes.delete("/delete/:id", authMiddleware, errorHandler(deleteItemsFromCart));
cartRoutes.put("/update/:id", authMiddleware, validateRequest(ChangeQuantityScheme), errorHandler(changeQuantity));
cartRoutes.get("/", authMiddleware, errorHandler(getQuantity));

export default cartRoutes;