import axios from "axios";
import {
  IPaymentCreateParams,
  IPaymentVerifyParams,
} from "../shared/interfaces/Payment.interface";

class payment {
  createUrl = "https://api.idpay.ir/v1.1/payment";
  verifyUrl = "https://api.idpay.ir/v1.1/payment/verify";

  async request(
    url: string,
    data: IPaymentCreateParams | IPaymentVerifyParams
  ): Promise<any> {
    return await axios.post(url, data, { headers: this.getHeader() });
  }

  async create(data: IPaymentCreateParams): Promise<any> {
    return await this.request(this.createUrl, data);
  }

  verify(items: IPaymentVerifyParams): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await this.request(this.verifyUrl, items);
        //  resolve(results.data)
        const { data } = results;
        if (data.status == 100) {
          resolve(true);
        } else throw new Error(results.data.message);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  getHeader() {
    let headers = {
      "Content-Type": "application/json",
      "X-API-KEY": String(process.env.IDPAY_API_KEY),
      // "X-SANDBOX": "1",
    };

    return headers;
  }
}

export default new payment();
