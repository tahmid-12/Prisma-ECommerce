import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { addAddress, deleteAddress, listAddresses } from "../controllers/users";
import { errorHandler } from "../error-handler";
import { validateRequest } from "../middlewares/validateRequest";
import { AddressSchema } from "../schema/users";

const usersRoutes: Router = Router();

usersRoutes.post('/address',authMiddleware, validateRequest(AddressSchema), errorHandler(addAddress));
usersRoutes.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get('/addresses', [authMiddleware], errorHandler(listAddresses));

export default usersRoutes;