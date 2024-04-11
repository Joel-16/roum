import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { BookingService } from "../services";

@Service()
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookingService.createBooking(req.jwtPayload.id, req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookingService.getAllBookings(req.jwtPayload.id, req.query);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.bookingService.getBooking(id);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  editBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.bookingService.editBooking(id, req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.bookingService.deleteBooking(id, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

}
