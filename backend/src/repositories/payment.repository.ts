import { PaymentStatus } from "../shared/enums/paymnet.enum";
import {
  IPayment,
  PaymentCreateInput,
  PaymentUpdateInput,
} from "../shared/interfaces/Payment.interface";
import paymentModel from "../models/payment.model";
import { repository } from "./repository";

export class PaymentRepository extends repository<typeof paymentModel> {
  async create(input: PaymentCreateInput): Promise<IPayment> {
    return this.rep.create(input);
  }

  async findByOrder_id(orderId: string): Promise<IPayment | null> {
    return this.rep.findOne({ order_id: orderId });
  }

  async findByPaymentId(payId: string): Promise<IPayment | null> {
    return this.rep.findOne({ paymentId: payId });
  }

  async updateByPaymentId(
    payId: string,
    input: PaymentUpdateInput
  ): Promise<boolean> {
    const result = await this.rep.updateOne(
      { paymentId: payId },
      { $set: { ...input } }
    );
    return result.modifiedCount > 0;
  }

  async getCount(): Promise<number> {
    return this.rep.countDocuments();
  }

  async getSuccessUserCount(steamHex: string): Promise<number> {
    return this.rep.countDocuments({
      user: steamHex,
      status: PaymentStatus.Success,
    });
  }
}
