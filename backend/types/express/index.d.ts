import { Player } from "../../src/shared/interfaces/player.interface";
import { IPayment } from "../../src/shared/interfaces/Payment.interface";
import { User } from "../../src/shared/interfaces/User.interface";

declare global {
  namespace Express {
    interface Request {
      player: Player;
      user: User;
      currentPayment: IPayment;
    }
  }
}
