// import { FilterQuery } from "mongoose";
// import {
//   Character,
//   ICharacter,
// } from "../shared/interfaces/Character.interface";
//
// import { CharacterRepository } from "../repositories/character.repository";
// import { Request, Response } from "express";
// import { jsonWrapper } from "../utils/jsonWrapper";
// import { getResponseMessage } from "../enums/messages.enums";
// import { PlayerRepository } from "../repositories/player.repository";
// import { UsersRepository } from "../modules/users/users.repository";
// import { sendWEbhookEmbed } from "../Discord/methods.discord";
// import { AdminLogs } from "../Discord/logs.discord";
// import { Injectable } from "@nestjs/common";
//
// @Injectable()
// export class CharacterService {
//   constructor(
//     private characterRepository: CharacterRepository,
//     private playerRepository: PlayerRepository,
//     private userRepository: UsersRepository
//   ) {}
//
//   async getCharacters(req: Request, res: Response) {
//     try {
//       const steamHex: string = req.currentUser.steamHex;
//       const characters: ICharacter[] =
//         await this.playerRepository.findCharacterBySteamHex(steamHex);
//       return jsonWrapper(getResponseMessage("OK"), { characters });
//     } catch (e) {
//       res.status(500);
//       return jsonWrapper(getResponseMessage("SERVER_ERROR"));
//     }
//   }
//
//   async getCharacterById(req: Request, res: Response): Promise<object> {
//     try {
//       const currentCharacter = req.currentCharacter;
//       const licenses = await this.characterRepository.findLicenses(
//         currentCharacter.id.toString()
//       );
//       const vehicles = await this.characterRepository.getVehicles(
//         currentCharacter.id.toString()
//       );
//
//       return jsonWrapper(getResponseMessage("OK"), {
//         character: req.currentCharacter,
//         licenses,
//         vehicles,
//       });
//     } catch (error) {
//       res.status(500);
//       return jsonWrapper(getResponseMessage("SERVER_ERROR"));
//     }
//   }
//
//   async getGang(req: Request, res: Response): Promise<void> {
//     try {
//       const gangName = req.currentCharacter.gang;
//       // if (gangName == 'nogang')
//       //     return resolve([])
//       const gangs: any[] = await this.characterRepository.getGang(gangName);
//       const gang = gangs[0] || [];
//       res.json(
//         jsonWrapper(getResponseMessage("OK"), {
//           gang,
//         })
//       );
//     } catch (error) {
//       res.status(500);
//     }
//   }
//
//   async getJailLogs(req: Request, res: Response): Promise<object> {
//     try {
//       const currentCharacter = req.currentCharacter;
//       const jails = await this.characterRepository.getJails(
//         String(currentCharacter.id)
//       );
//       return jsonWrapper(getResponseMessage("OK"), { jails });
//     } catch (e) {
//       res.status(500);
//       return {};
//     }
//   }
//
//   async getGift(req: Request, res: Response) {
//     try {
//       const user = req.currentUser;
//       let character = user.gifts.find(
//         (a) => a.characterId == req.currentCharacter.id.toString()
//       );
//       let canUseGift: boolean = false;
//       // every 1 days
//       let nextUse = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1);
//       //! 1000 - 5000
//       let money = Math.floor(Math.random() * (5000 - 1000) + 1000);
//
//       let responseItem = {
//         code: getResponseMessage("OK"),
//         money: 0,
//         nextGift: nextUse,
//       };
//       //random false or true
//       let isOk = Math.random() >= 0.5;
//       let msg = "NO GIFT";
//       let giftCharacter = {
//         characterId: req.currentCharacter.id.toString(),
//         nextGift: nextUse,
//         lastGift: new Date(),
//       };
//
//       if (!character) {
//         character = giftCharacter;
//         canUseGift = true;
//       } else {
//         if (character.nextGift < new Date()) {
//           canUseGift = true;
//         } else {
//           canUseGift = false;
//           responseItem.code = getResponseMessage("GIFT_NOT_READY");
//           responseItem.nextGift = character.nextGift;
//         }
//       }
//
//       if (canUseGift) {
//         let hasGift = user.gifts.find(
//           (a) => a.characterId == req.currentCharacter.id.toString()
//         );
//
//         if (hasGift) {
//           user.gifts.forEach((gift, index) => {
//             if (gift.characterId == req.currentCharacter.id.toString()) {
//               user.gifts[index] = giftCharacter;
//             }
//           });
//         } else {
//           user.gifts.push(giftCharacter);
//         }
//
//         if (isOk) {
//           responseItem.money = money;
//           // await characterService.addMoney(req.currentCharacter.id.toString(), money)
//           await this.userRepository.updateBySteamId(user.steamId, {
//             gifts: user.gifts,
//           });
//           msg = "GIFT OK";
//           try {
//             const embed = await AdminLogs.gift(
//               req.currentUser,
//               req.currentCharacter,
//               money
//             );
//             await sendWEbhookEmbed(embed, "GIFT_LOG");
//           } catch (error) {}
//         } else {
//           responseItem.money = 0;
//           canUseGift = false;
//           responseItem.code = getResponseMessage("GIFT_BREAKING");
//           await this.userRepository.updateBySteamId(user.steamId, {
//             gifts: user.gifts,
//           });
//           msg = "BREAK | " + isOk;
//         }
//       }
//
//       return jsonWrapper(responseItem.code, responseItem);
//       //    createSystemLogger(this.logType(req, `canUseGift: ${canUseGift}  | ${msg} `), LoggerTypesEnum.INFO)
//     } catch (error: any) {
//       return jsonWrapper(getResponseMessage("SERVER_ERROR"), {});
//       // createSystemLogger(this.logType(req, error.stack), LoggerTypesEnum.ERROR)
//     }
//   }
// }
