// import { ICharacter } from "../interfaces/Character.interface";
// import { User } from "../interfaces/User.interface";
// import moment from "moment/moment";
// import { PlayerRepository } from "../repositories/player.repository";
//
// class paymentCallBackService {
//   constructor(private playerRepository: PlayerRepository) {}
//
//   setVip(character: ICharacter, user: User, month: number): Promise<boolean> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const currentVipTime = character.viptime;
//         const isVip = moment(currentVipTime).isAfter(moment());
//         let vipTime = isVip ? new Date(currentVipTime) : new Date();
//         vipTime.setMonth(vipTime.getMonth() + month);
//
//         //  const x = await this.query(`UPDATE \`users\` SET \`viptime\` = ? WHERE id = ?`, [vipTime, character.id])
//         // if (x.affectedRows > 0) {
//         //     resolve(true)
//
//         // }
//         // else
//         //     throw new Error('خطا در ثبت vip')
//         const result = await prisma.users.updateMany({
//           where: {
//             id: character.id,
//           },
//           data: {
//             viptime: vipTime,
//           },
//         });
//
//         if (result.count > 0) {
//           resolve(true);
//         } else throw new Error("خطا در ثبت vip");
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
//
//   insertCharacter(user: User): Promise<boolean> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         if (process.env.NODE_ENV == "developer") return resolve(true);
//         let query = `INSERT INTO character_slots (steamhex, slots) VALUES ("${user.steamHex}", 2)`;
//         const slot = await this.playerRepository.getSlotsCharacters(
//           user.steamHex
//         ); //this.getSlotsCharacters(user.steamHex)
//         let slots = slot;
//
//         if (slots == 0) {
//           slots = 1;
//         } else {
//           slots += 1;
//           query = `UPDATE character_slots SET slots = ${slots} WHERE steamhex = "${user.steamHex}"`;
//         }
//
//         //   const resulTDB = await this.query(query)
//         // if (resulTDB.affectedRows > 0) {
//         //     resolve(true)
//         // } else
//         //     throw new Error('خطا در ثبت اطلاعات')
//         // const result = await prisma.character_slots.upsert({
//         //     where: {
//         //         steamhex: user.steamHex
//         //     },
//         //     update: {
//         //         slots: slots
//         //     },
//         //     create: {
//         //         steamhex: user.steamHex,
//         //         slots: slots
//         //     }
//         // })
//
//         // insert with Query
//
//         const resultInsert = await prisma.$queryRawUnsafe(query);
//
//         if (resultInsert) {
//           resolve(true);
//         } else throw new Error("خطا در ثبت اطلاعات");
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
// }
