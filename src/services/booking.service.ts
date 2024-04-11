import { NextFunction } from "express";
import { Service } from "typedi";

import { Account, BookingModel as Booking } from "../models";
import { CustomError } from "../utils/response/custom-error/CustomError";
import { BookingDto } from "../types";

@Service()
export class BookingService {
  constructor(
    private readonly account = Account,
    private readonly booking = Booking,
  ) {}

  async createBooking(id: string, payload: BookingDto, next: NextFunction) {
    const status = await this.booking.findOne({ service: payload.service });
    if (status) {
      next(new CustomError(401, "Selected service has already been booked"));
    }
    const booking = await this.booking.create({
      population: payload.population,
      service: payload.service
    });
    const user = await this.account.findById(id)
    user.bookings.push(booking)
    user.save()
    return booking;
  }

  async getAllBookings(id: string, query?: any) {
    const account = await this.account.findById(id).populate({
      path: 'bookings',
      options: { sort: { createdAt: -1 } }
    }).exec();
    return account.bookings
  }

  async getBooking(id: string): Promise<BookingDto> {
    const booking = await this.booking.findById(id );
    return booking
  }

  async editBooking(id: string, payload: Partial<BookingDto>, next: NextFunction):Promise<BookingDto> {
    let booking = await this.booking.findOne({ _id: id });
    if (!booking) {
      next(new CustomError(400, "booking doesn't exist, Select a valid booking"));
    }

    await this.booking.updateOne(
      { _id: id },
      {
        population: payload.population,
        service: payload.service
      }
    );
    return await this.booking.findById(id);
  }

  async deleteBooking(id: string, next: NextFunction) {
    let booking = await this.booking.findById(id);
    if (!booking) {
      next(new CustomError(400, "booking doesn't exist, Please select a valid booking"));
    }

    await this.booking.deleteOne({_id:id})
    return {message: "Booking deleted successfully"};
  }
}
