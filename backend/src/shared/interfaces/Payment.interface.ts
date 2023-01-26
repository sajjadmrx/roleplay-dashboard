import { Document, Schema } from "mongoose";
import { PaymentType, PaymentStatus } from "../enums/paymnet.enum";
import { IPhoneNumber } from "./phone-number.interface";
import { User } from "./User.interface";
import { IVehicle } from "./vehicles.interface";

export interface IPayment {
  id: string;
  order_id: number;
  paymentId: string;
  user: string | User;
  characterId: number | undefined;
  type: PaymentType;
  price: number;
  vehicle?: string; // vehicleId
  phoneNumber?: string;
  status: PaymentStatus;
  vipMonth?: number;
  description?: string;
  useGift: boolean;
  targetSteamHex: string | undefined;
  targetCharacterId: string | undefined;
  createdAt: Date;
  updatedAt: Date;

  getTypeName(): string;
}

export interface PaymentCreateInput
  extends Omit<IPayment, "id" | "createdAt" | "updatedAt" | "getTypeName"> {}

export interface PaymentUpdateInput extends Partial<PaymentCreateInput> {}

export interface IPaymentCreateParams {
  order_id: number;
  amount: number;
  callback: string;
  des: string;
}

export interface IPaymentVerifyParams {
  id: string; // paymentId
  order_id: number;
}
