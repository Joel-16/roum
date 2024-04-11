import { Router } from "express";
import Container from "typedi";

import { BookingController } from "../controllers";
import { validationMiddleware } from "../middleware";
import { ParamDto, BookingDto } from "../types";

const bookingController = Container.get(BookingController);
const router = Router();

router.get("/", bookingController.getAllBookings);
router.post("/", validationMiddleware(BookingDto, "body"), bookingController.createBooking);
router.get("/:id",  validationMiddleware(ParamDto, "params"),bookingController.getBooking);
router.patch("/:id", validationMiddleware(BookingDto, "body", true) , validationMiddleware(ParamDto, "params"),bookingController.editBooking);
router.delete("/:id", validationMiddleware(ParamDto, "params"), bookingController.deleteBooking);

export default router;
