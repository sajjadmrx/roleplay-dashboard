import mongoose, { Schema, PaginateModel } from "mongoose";
import { Permissions } from "../shared/enums/permissions.enums";
import { User } from "../shared/interfaces/User.interface";
import { IVehicle } from "../shared/interfaces/vehicles.interface";

import { customAlphabet } from "nanoid";
import { IPayment } from "../shared/interfaces/Payment.interface";
import { PaymentStatus, PaymentType } from "../shared/enums/paymnet.enum";

const nanoid = customAlphabet("1234567890", 10);
import mongoosePaginate from "mongoose-paginate-v2";

const paymentSchema = new Schema<IPayment>(
  {
    order_id: { type: Number, required: true },
    paymentId: { type: String, unique: true },
    user: { type: String, required: true }, // steam Hex
    characterId: { type: Number, required: false },
    vehicle: { type: String, required: false },
    price: { type: Number, required: true },
    type: { type: Number, required: true },
    status: { type: Number, required: true, defautl: PaymentStatus.Pending },
    vipMonth: { type: Number, required: false },
    useGift: { type: Boolean, required: false, default: false },
    targetSteamHex: { type: String, required: false },
    targetCharacterId: { type: String, required: false },
    description: {
      type: String,
      required: false,
      default: "چیزی ثبت نشده است",
    },
    phoneNumber: { type: String, required: false, dafault: null },
  },
  { timestamps: true }
);

paymentSchema.plugin(mongoosePaginate);

paymentSchema.methods.getTypeName = function () {
  switch (this.type) {
    case PaymentType.vip:
      return "VIP";
    case PaymentType.vehicle:
      return "Vehicle";
    case PaymentType.character:
      return "Character";
    case PaymentType.donate:
      return "donate";
  }
};
const paymentModel = mongoose.model<IPayment, PaginateModel<IPayment>>(
  "payment",
  paymentSchema
);

export default paymentModel;
