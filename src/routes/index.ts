import { Router } from "express";
import Container from "typedi";

import { AccountController } from "../controllers";
import { authorizationMiddleware } from "../middleware/checkJwt";
import { validationMiddleware } from "../middleware/validation";

import Booking from "./bookings.route"
import { SigninDto, SignupDto } from "../types";

const accountController = Container.get(AccountController);
const router = Router();

router.use('/bookings',authorizationMiddleware, Booking)

router.post("/login", validationMiddleware(SigninDto, "body"), accountController.login);
router.post("/signup", validationMiddleware(SignupDto, "body"), accountController.register);




export default router;
