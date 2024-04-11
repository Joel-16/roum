import { Ref, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Booking } from "./booking.model";

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

class Account {
  @prop()
  firstname: string;

  @prop()
  lastname: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, select: false })
  password: string;

  @prop({ ref: () => Booking })
  bookings: Ref<Booking>[];

}

const AccountModel = getModelForClass(Account);
export { AccountModel as Account };
