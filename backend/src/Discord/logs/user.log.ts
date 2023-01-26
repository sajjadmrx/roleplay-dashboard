// import { MessageEmbed } from "discord.js";
// import moment from "moment";
// import { PaymentType } from "../../shared/enums/paymnet.enum";
// import { getNowDateJalali } from "../../helpers/server.helper";
// import { ICharacter } from "../../shared/interfaces/Character.interface";
// import { IPayment } from "../../shared/interfaces/Payment.interface";
// import { User } from "../../shared/interfaces/User.interface";
// import { IVehicle } from "../../shared/interfaces/vehicles.interface";
//
// export class UserLogs {
//   static get embed(): MessageEmbed {
//     return new MessageEmbed();
//   }
//
//   static get embedSuccessPayment(): MessageEmbed {
//     const embed = new MessageEmbed()
//       .setTitle(`✅ خرید با موفقیت انجام شد`)
//       .setColor("#00ff00");
//     // .setFooter(`⚠️ ` + process.env.NODE_ENV + ' Mode')
//     return embed;
//   }
//
//   static successPayment(payment: IPayment, message: string = ""): MessageEmbed {
//     const embed = UserLogs.embed
//       .setTitle(`✅ خرید با موفقیت انجام شد`)
//       .addField("🆔 کد خرید", `> ${payment.order_id}`)
//       .addField("💰 مبلغ", `> ${payment.price.toLocaleString()}`)
//       .addField("📅 تاریخ", `> ${getNowDateJalali()}`)
//       .addField("📩 توضیحات", `> ${payment.description}`)
//       .setColor("#00ff00");
//     if (message) embed.setDescription(`> ${message}`);
//     return embed;
//   }
//
//   static failedPayment(
//     payment: IPayment,
//     user: User,
//     character: ICharacter | null,
//     message: string = "مشکلی در سرور رخ داد"
//   ): MessageEmbed {
//     const embed = new MessageEmbed()
//       .setTitle("خطا در خرید شما ")
//       .setDescription(
//         `
//             > ** ${message} **
//             ---
//             > درصورت نیاز با بخش پشتیبانی تماس بگیرید. 🎧
//         `
//       )
//       .addField(
//         "👤 مشخصات اکانت",
//         `> ID:${user.steamId} \n > name:\`${user.displayName}\` `
//       )
//       .addField(
//         "📟 مشخصات خرید",
//         `> ID:\`${
//           payment.order_id
//         }\` \n > price:\`${payment.price.toLocaleString()}\` \n > description:\`${
//           payment.description
//         }\` `
//       )
//       .addField("📩 توضیحات", `> ${message}`)
//       .setColor("#ff0000");
//     if (character)
//       embed.addField(
//         "🔗 کاراکتر",
//         `> ID:${character.id} \n > name:\`${character.getFullName()}\` `
//       );
//
//     // if (payment.type == PaymentType.vehicle && character) {
//     //     //  payment = await payment.populate('vehicle')
//     //     const vehicle = payment.vehicle as IVehicle
//
//     //     embed.addField('مشخصات وسیله', `> name: ${vehicle.name} \n`)
//     //         .setThumbnail(vehicle.getThumbnailUrl())
//     //         .addField('مشخصات بازیکن ', `> id: \`${character.id}\` \n > name: ${character.getFullName()} `)
//
//     // }
//     // else if (payment.type == PaymentType.vip && character) {
//     //     embed.addField('خریده ', " > عضویت ویژه")
//     //         .addField('ماه', `> ${payment.vipMonth}`)
//     // }
//
//     // else if (payment.type == PaymentType.character) {
//     //     embed.addField('خرید در', '> بازیکن  اضافه')
//     // }
//
//     return embed;
//   }
//
//   static savedNotificationOptions(user: User): MessageEmbed {
//     const embed = UserLogs.embed
//       .setTitle("📝 تنظیمات اطلاع رسانی ذخیره شد")
//       .setDescription(
//         `
//             > ** از این پس اطلاع رسانی های مربوطه به همین چنل برای شما ارسال خواهد شد ✅. **`
//       )
//       .setColor("#00ff00")
//       .setFooter(`📅 ${getNowDateJalali()}`);
//
//     return embed;
//   }
//
//   static async successGift() {}
//
//   static async failedGift() {}
//
//   static successReciveVehicleGift(
//     vehicle: IVehicle,
//     user: User,
//     character: ICharacter
//   ): MessageEmbed {
//     const embed = UserLogs.embed;
//     embed
//       .setTitle("🎁 شما یک هدیه دریافت کردید")
//       .setDescription(
//         `
//         > ** یک وسیله جدید برای شما دریافت شد. **
//         > ** نام وسیله: ** \`${vehicle.name}\`
//         > ** نوع وسیله: ** \`${vehicle.getCateGoryName()}\`
//       `
//       )
//       .setThumbnail(vehicle.getThumbnailUrl())
//       .addField(
//         "🔗 از طرف",
//         `> ID:${character.id} \n > name:\`${character.getFullName()}\` `
//       )
//       .setColor("#00ff00");
//     return embed;
//   }
// }
