// import { MessageEmbed } from "discord.js";
// import { Request } from "express";
// import { PaymentType } from "../../shared/enums/paymnet.enum";
// import { getNowDateJalali } from "../../helpers/server.helper";
// import { ICharacter } from "../../shared/interfaces/Character.interface";
// import { IResponseGetIdentity } from "../../shared/interfaces/discord.interface";
// import { IPayment } from "../../shared/interfaces/Payment.interface";
// import { User } from "../../shared/interfaces/User.interface";
// import { IVehicle } from "../../shared/interfaces/vehicles.interface";
// import detailsUtil from "../../utils/details.util";
// import { UtilsAuthorizationDiscord } from "../auth.discord";
// import { IPhoneNumber } from "../../shared/interfaces/phone-number.interface";
//
// export class AdminLogs {
//   static buySuccessVehicle(
//     payment: IPayment,
//     vehicle: IVehicle,
//     user: User,
//     character: ICharacter
//   ): MessageEmbed {
//     const message = "";
//     const embed = new MessageEmbed()
//       .setTitle("پرداختی ماشین")
//       .setDescription(
//         `${user.displayName} **successfully bought** ${vehicle.name}`
//       )
//       .addField(
//         "مشخصات ماشین",
//         `> name: ${vehicle.name} \n > nameServer: ${
//           vehicle.nameServer
//         } \n > Price:${vehicle.getPriceWithDiscount()}`
//       )
//       .addField(
//         "مشخصات بازیکن ",
//         `> firstName: ${character.firstname} \n > lastname:${character.lastname} \n > CharId:${character.id}`
//       )
//       .addField(
//         "مشخصات کاربر استیم",
//         `> disply:${user.displayName} \n > steamHex:\`${user.steamHex}\` `
//       )
//       .addField(
//         "مشخصات پرداخت",
//         `> token: \`${
//           payment.id
//         }\` \n > price:${payment.price.toLocaleString()}`
//       )
//       .setThumbnail(vehicle.getThumbnailUrl())
//       .setColor("RANDOM")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//     if (payment.useGift) {
//       embed.addField(
//         " به عنوان هدیه",
//         "> هدیه به عنوان ماشین به شخص دیگری استفاده شد"
//       );
//       embed.addField(
//         "TARGET",
//         `> CharId: \`${payment.targetCharacterId}\` | SteamHex: \`${payment.targetSteamHex}\` `
//       );
//     }
//
//     return embed;
//
//     //  this.destroy()
//   }
//
//   static shop_Error(
//     payment: IPayment,
//     user: User,
//     character: ICharacter | null,
//     message: string = "مشکل از درگاه بانکی"
//   ): MessageEmbed {
//     const embed = new MessageEmbed()
//       .setTitle("خطا در ذخیره سازی")
//       .setDescription(
//         `${user.displayName} **failed to buy** \n
//                         ERROR:
//
//                         ` +
//           "```" +
//           message +
//           "```"
//       )
//
//       .addField(
//         "مشخصات استیم",
//         `> disply:${user.displayName} \n > steamHex:\`${user.steamHex}\` \n > steamId:${user.steamId}`
//       )
//       .addField(
//         "مشخصات پرداخت",
//         `> token: \`${
//           payment.id
//         }\` \n > price:${payment.price.toLocaleString()}`
//       )
//       .setColor("#ff0000")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//
//     if (payment.type == PaymentType.vehicle && character) {
//       //  payment = await payment.populate('vehicle')
//       // const vehicle = payment.vehicle as IVehicle
//       embed.addField("خرید", "ماشین");
//       // embed.addField('مشخصات ماشین', `> name: ${vehicle.name} \n > HASh: ${vehicle.nameServer} \n }`)
//       //     .setThumbnail(vehicle.getThumbnailUrl())
//       //     .addField('مشخصات بازیکن ', `> id: \`${character.id}\` \n > firstName: ${character.firstname} \n > lastname:${character.lastname} `)
//     } else if (payment.type == PaymentType.vip && character) {
//       embed
//         .addField("خریده ", " > عضویت ویژه")
//         .addField("ماه", `> ${payment.vipMonth}`);
//     } else if (payment.type == PaymentType.character) {
//       embed.addField("خرید در", "> بازیکن  اضافه");
//     }
//
//     return embed;
//   }
//
//   static paymentError(
//     payment: IPayment,
//     user: User,
//     message: string = "مشکل از درگاه بانکی",
//     status: number = 0
//   ): MessageEmbed {
//     const embed = new MessageEmbed()
//       .setTitle("پرداختی")
//       .setDescription(
//         `در هنگام پرداخت مشکلی بوجود آمده است.
//                         دلیل: **${message}**
//                     `
//       )
//       .addField(
//         "مشخصات پرداخت",
//         `> token: \`${
//           payment.id
//         }\` \n > price:${payment.price.toLocaleString()}`
//       )
//       .addField("نوع پرداخت", `> ${payment.getTypeName()}`)
//       .addField(
//         "مشخصات کاربر استیم",
//         `> disply:${user.displayName} \n > steamHex:\`${user.steamHex}\` `
//       )
//       .addField("کد خطا", `> ${status}`)
//       .setColor("#ff0000")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//
//     return embed;
//   }
//
//   static buySuccessVip(
//     payment: IPayment,
//     user: User,
//     character: ICharacter
//   ): MessageEmbed {
//     // await this.run()
//     const embed = new MessageEmbed()
//       .setTitle("پرداختی VIP")
//       .setDescription(`${user.displayName} **successfully bought** VIP`)
//       .addField(
//         "مشخصات بازیکن ",
//         `> firstName: ${character.firstname} \n > lastname:${character.lastname} \n > CharId:${character.id}`
//       )
//       .addField(
//         "مشخصات کاربر استیم",
//         `> disply:${user.displayName} \n > steamHex:\`${user.steamHex}\` `
//       )
//       .addField(
//         "مشخصات پرداخت",
//         `> token: \`${
//           payment.id
//         }\` \n > price:${payment.price.toLocaleString()}`
//       )
//       .addField("ماه", "> " + payment.vipMonth?.toString())
//       .setColor("#00ff00")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//     embed.setColor("#00ff00");
//     return embed;
//   }
//
//   static buyCharacter(payment: IPayment, user: User): MessageEmbed {
//     const message = "";
//     const embed = new MessageEmbed()
//       .setTitle("پرداختی بازیکن ")
//       .setDescription(`${user.displayName} **successfully bought** بازیکن `)
//       //.addField('مشخصات بازیکن ', `> firstName: ${payment.character.firstname} \n > lastname:${payment.character.lastname} \n > CharId:${payment.character.id}`)
//       .addField(
//         "مشخصات کاربر استیم",
//         `> disply:${user.displayName} \n > steamHex:\`${user.steamHex}\` `
//       )
//       .addField(
//         "مشخصات پرداخت",
//         `> token: \`${
//           payment.id
//         }\` \n > price: ${payment.price.toLocaleString()}`
//       )
//       //  .setThumbnail(payment.character.getThumbnailUrl())
//       .setColor("RANDOM")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//     // const result = await this.sendLog(embed, channels.CHARACTER)
//     embed.setColor("#00ff00");
//     return embed;
//     // this.destroy()
//   }
//
//   static async login(user: User, req: Request): Promise<MessageEmbed> {
//     try {
//       const ua = detailsUtil.getInfoRequest(req);
//       const ipInfo = await detailsUtil.info_ip(req);
//       ua.ip = ipInfo;
//
//       const embed = new MessageEmbed()
//         .addField("user", `> ${user.displayName}`, true)
//         .addField("HEX", `> ${user.steamHex}`, true)
//         .addField("ID", `> ${user.steamId}`, true)
//         //       .addField('Email', `> ${profile.email}`, true)
//         //     .addField('User ID', `> ${profile.id}`)
//         //    .addField('verified', `> ${profile.verified}`, true)
//         //  .addField('accesToken', `> ||${profile.accesToken}||`)
//         .addField("browser", `> ${ua.browser?.name}`, true)
//         .addField(
//           "os",
//           `> name: \`${ua.os?.name}\`|version:\`${ua.os?.version}\` `,
//           true
//         );
//       if (user.steamId == "76561199154035460") {
//         embed.addField("ip", `> -----------------------------------`, true);
//       } else
//         embed
//           .addField(
//             "Ip info",
//             "```fix" +
//               `
//                     ${Object.values(ipInfo)
//                       .map((item) => `${item}`)
//                       .join("\n")}
//                     ` +
//               "```"
//           )
//           .setThumbnail(user.avatar);
//       embed.setColor("#00ff00");
//       return embed;
//     } catch (error) {
//       throw error;
//     }
//   }
//
//   static addVehicle(vehicle: IVehicle): MessageEmbed {
//     // await this.run()
//     const embed = new MessageEmbed();
//     embed
//       .setImage(vehicle.getThumbnailUrl())
//       .addField("نام", "> " + vehicle.name)
//       .addField("نوع", "> " + vehicle.category)
//       .addField("قیمت", "> " + vehicle.price.toLocaleString())
//       .addField("درصد تخفیف", `> ${vehicle.discount}%`)
//
//       .addField("امکان تست دارد؟", "> " + vehicle.isTest)
//       .addField("پیشنهاد ویژه", "> " + vehicle.isSuggested)
//       .addField("منشتر شده ؟", "> " + vehicle.isPublished)
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//     if (vehicle.discount > 0) {
//       embed.addField(
//         "قیمت پس از تخفیف",
//         vehicle.getPriceWithDiscount().toLocaleString()
//       );
//     }
//
//     return embed;
//
//     // this.destroy()
//   }
//
//   static donate(
//     payment: IPayment,
//     user: User,
//     character: ICharacter
//   ): MessageEmbed {
//     const embed = new MessageEmbed()
//       .setTitle("حمایـت جدید")
//       .setDescription(` **توضیحات** : \n\n > **${payment.description}**`)
//       .addField(
//         "مشخصات بازیکن ",
//         `> firstName: ${character.firstname} \n > lastname:${character.lastname} \n > CharId:${character.id}`
//       )
//       .addField(
//         "مشخصات کاربر استیم",
//         `> disply:${user.displayName} \n > steamHex:\`${user.steamHex}\` `
//       )
//       .addField(
//         "مشخصات پرداخت",
//         `> token: \`${
//           payment.id
//         }\` \n > price:${payment.price.toLocaleString()} ريال`
//       )
//       .setColor("#00ff00")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//
//     return embed;
//   }
//
//   static gift(user: User, character: ICharacter, money: number): MessageEmbed {
//     const account = character.getAccounts();
//     const embed = new MessageEmbed()
//       .setTitle("🎁 Gift")
//       .setDescription(` **description** : \n > **${user.displayName}**`)
//       .addField(
//         "👤 Steam",
//         `> disply:${user.displayName} \n > steamHex:\`${user.steamHex}\` `
//       )
//       .addField(
//         "👤 Character",
//         `> ID:${character.id} \n > name:\`${character.getFullName()}\` `
//       )
//       .addField("💰 Amount", `> ${money.toLocaleString()}`)
//       .addField("OLD BANK", `> ${account.bank.toLocaleString()}`)
//       .addField("NEW BANK", `> ${(account.bank + money).toLocaleString()}`)
//       .setColor("#105efc")
//       .setThumbnail("https://app.irworld.xyz/img/logo.png")
//       .setFooter("📅 " + getNowDateJalali() + " - IRWORLD ")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//     return embed;
//   }
//
//   static linkDiscord(user: User, Identify: IResponseGetIdentity) {
//     const embed = new MessageEmbed()
//       .setTitle("🔗 new Connection")
//       .addField(
//         "👤 Steam",
//         `> disply: ${user.displayName} \n > steamHex:\`${user.steamHex}\` `
//       )
//       .addField(
//         "🔗 Discord",
//         `> username: ${Identify.getFullUsername()} | <@${
//           Identify.id
//         }> \n > discordId:\`${Identify.id}\` `
//       )
//       .addField("Access Token", `> token: \`${Identify.access_token}\` `)
//       .setThumbnail(
//         UtilsAuthorizationDiscord.getAvatarUrl(Identify.id, Identify.avatar)
//       )
//       .setColor("#00ff00")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//     if (Identify.email) {
//       embed.addField("Email", `> email: \`${Identify.email}\` `);
//     }
//
//     return embed;
//   }
//
//   static buyPhoneNumber(
//     payment: IPayment,
//     phoneNumber: IPhoneNumber,
//     user: User,
//     character: ICharacter
//   ): MessageEmbed {
//     const embed = new MessageEmbed()
//       .setTitle("📱 خرید شماره")
//       .setDescription(` **description** : \n > **${payment.description}**`)
//       .addField(
//         "👤 Steam",
//         `> disply:${user.displayName} \n > steamHex:\`${user.steamHex}\` `
//       )
//       .addField(
//         "👤 Character",
//         `> ID:${character.id} \n > name:\`${character.getFullName()}\` `
//       )
//       .addField("📞 Phone Number", `> ${phoneNumber.number}`)
//       .addField("payment", `> ${payment.order_id} | ${payment.paymentId}`)
//       .addField("💰 Amount", `> ${payment.price.toLocaleString()}`)
//       .setColor("#00ff00")
//       .setFooter(`⚠️ ` + process.env.NODE_ENV + " Mode");
//     return embed;
//   }
// }
