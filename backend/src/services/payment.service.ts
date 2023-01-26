// import fs from "fs";
// import path from "path";
//
// import { Request, Response } from "express";
// import {
//   IUpdateCharacter,
//   IUpdateVip,
// } from "../shared/interfaces/IBody.interface";
// import paymentUtil from "../utils/payment.util";
// import { PaymentStatus, PaymentType } from "../shared/enums/paymnet.enum";
//
// import { discountHandler } from "../utils/discountHandler.util";
// import { PaymentRepository } from "../repositories/payment.repository";
// import { PlayerRepository } from "../repositories/player.repository";
// import { getResponseMessage } from "../shared/enums/messages.enums";
//
// export class PaymentService {
//   constructor(
//     private paymentRepository: PaymentRepository,
//     private playerRepository: PlayerRepository
//   ) {}
//
//   async createVip(req: Request, res: Response): Promise<object> {
//     try {
//       const monthInput = req.body.month;
//       if (!monthInput)
//         return jsonWrapper(getResponseMessage("MONTH_IS_NOT_VALID"));
//
//       const pathFile = path.resolve("./json/" + "vip" + ".json");
//       const json = fs.readFileSync(pathFile, "utf8");
//       const jsonData = JSON.parse(json) as [IUpdateVip];
//       // update json file
//       const month = jsonData.find((v) => v.month == monthInput);
//       if (!month || !month.isEnabled)
//         return jsonWrapper(getResponseMessage("MONTH_IS_NOT_VALID"));
//
//       const price: number = discountHandler(
//         month.discount as number,
//         month.price as number
//       );
//
//       const order_id = (await this.paymentRepository.getCount()) + 1;
//
//       const result = await paymentUtil.create({
//         order_id: order_id,
//         amount: price,
//         callback:
//           process.env.APP_URL +
//           `/callbacks/payment/vip/${req.currentCharacter.id}`,
//         des: `خرید عضویت ویژه ${month.month} ماهه
//                 IRWorldrp.ir
//                 `,
//       });
//
//       const link = result.data?.link;
//       if (!link || typeof link !== "string" || !link.includes("https://")) {
//         // this.log.error(this.logType(req, `payment link is not valid`));
//         return jsonWrapper(getResponseMessage("ERROR_REDIRECT_PAYMENT"));
//       }
//
//       const paymentId = result.data?.id;
//
//       await this.paymentRepository.create({
//         order_id,
//         user: req.currentUser.steamHex,
//         characterId: req.currentCharacter.id,
//         paymentId,
//         type: PaymentType.vip,
//         status: PaymentStatus.Pending,
//         price: price,
//         vipMonth: Number(month.month),
//         targetCharacterId: undefined,
//         targetSteamHex: undefined,
//         useGift: false,
//       });
//       return jsonWrapper(getResponseMessage("OK"), link);
//     } catch (e) {
//       return jsonWrapper(getResponseMessage("SERVER_ERROR"));
//     }
//   }
//
//   async createCharacter(req: Request, res: Response): Promise<object> {
//     try {
//       const pathFile = path.resolve("./json/" + "character" + ".json");
//       const jsonData: IUpdateCharacter = JSON.parse(
//         fs.readFileSync(pathFile, "utf8")
//       ) as any;
//       if (!jsonData.isEnabled) {
//         return jsonWrapper(getResponseMessage("CHARACTER_IS_NOT_ENABLED"));
//       }
//
//       const characters = await this.playerRepository.findCharacterBySteamHex(
//         req.currentUser.steamHex
//       );
//       const max = parseInt(jsonData.MAX_CHARACTER_REACHED as string);
//       const MAX_CHARACTER_REACHED = characters.length >= max;
//       if (MAX_CHARACTER_REACHED) {
//         return jsonWrapper(getResponseMessage("MAX_CHARACTER_REACHED"));
//       }
//       const price = discountHandler(
//         jsonData.discount as number,
//         jsonData.price as number
//       );
//
//       const order_id = (await this.paymentRepository.getCount()) + 1;
//
//       const result = await paymentUtil.create({
//         order_id: order_id,
//         amount: price,
//         callback: process.env.APP_URL + `/callbacks/payment/character`,
//         des: `خرید بازیکن  اضافه
//                 IRWorldrp.ir`,
//       });
//       const link = result.data?.link;
//       if (!link || typeof link !== "string" || !link.includes("https://")) {
//         return jsonWrapper(getResponseMessage("ERROR_REDIRECT_PAYMENT"));
//       }
//
//       const paymentId = result.data?.id;
//
//       await this.paymentRepository.create({
//         order_id,
//         user: req.currentUser.steamHex,
//         paymentId,
//         type: PaymentType.character,
//         status: PaymentStatus.Pending,
//         targetCharacterId: undefined,
//         targetSteamHex: undefined,
//         characterId: undefined,
//         price: price,
//         useGift: false,
//       });
//       return jsonWrapper(getResponseMessage("OK"), link);
//     } catch (error: any) {
//       return jsonWrapper(getResponseMessage("SERVER_ERROR"));
//     }
//   }
// }
