import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { addAddress, deleteAddress, listAddresses, updateUser } from "../controllers/users";
import { errorHandler } from "../error-handler";
import { validateRequest } from "../middlewares/validateRequest";
import { AddressSchema, updateUserSchema } from "../schema/users";

const usersRoutes: Router = Router();

usersRoutes.post('/address',authMiddleware, validateRequest(AddressSchema), errorHandler(addAddress));
usersRoutes.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get('/address', [authMiddleware], errorHandler(listAddresses));
usersRoutes.put('/address', authMiddleware, validateRequest(updateUserSchema), errorHandler(updateUser));

export default usersRoutes;