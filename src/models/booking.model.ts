import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      }
    }
  }
})

class Booking {
  @prop()
  population: number;

  @prop()
  service: string;

}

const BookingModel = getModelForClass(Booking);
export { BookingModel, Booking };
