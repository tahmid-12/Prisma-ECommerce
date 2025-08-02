import { Router } from "express";
import { login,me,signUp } from "../controllers/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { SingUpSchema } from "../schema/users";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", validateRequest(SingUpSchema), errorHandler(signUp));
authRoutes.post("/login", errorHandler(login));
authRoutes.get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;