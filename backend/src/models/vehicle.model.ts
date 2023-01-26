import mongoose, { Schema } from "mongoose";
import { Permissions } from "../shared/enums/permissions.enums";
import { User } from "../shared/interfaces/User.interface";
import { IVehicle } from "../shared/interfaces/vehicles.interface";

const vehiclesSchema = new Schema<IVehicle>(
  {
    vehicles_id: { type: String, unique: true },
    name: { type: String, required: true },
    nameServer: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    category: { type: Number, required: true },
    images: { type: [{ type: String }], required: true },
    video: { type: String, required: false },
    canGift: { type: Boolean, required: false, default: false },
    //   targetCharacterId: { type: String, required: false },

    isPublished: { type: Boolean, default: false },
    isTest: { type: Boolean, default: false },
    isSuggested: { type: Boolean, default: false },
    isOffer: { type: Boolean, default: false },
  },
  { timestamps: true }
);
vehiclesSchema.methods.getPriceWithDiscount = function (): number {
  if (this.discount > 0) {
    const discountPrice = this.price - this.price * (this.discount / 100);
    return discountPrice;
  }

  return this.price;
};
vehiclesSchema.methods.getThumbnailUrl = function (): string {
  return process.env.APP_URL + this.images[0];
};

vehiclesSchema.methods.getCategoryName = function (): string {
  switch (this.category) {
    case 1:
      return "🚗 Car";
    case 2:
      return "🚁 Helicopter";
    case 3:
      return "🏍️ Motorcycle";
    case 4:
      return "🛳️ Ship";
    case 5:
      return "🚲 bicycle";
    default:
      return "🚗 Car";
  }
};
const vehiclesModel = mongoose.model("Vehicles", vehiclesSchema);

export default vehiclesModel;
